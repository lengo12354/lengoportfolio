import React, { useEffect, useRef } from "react";

export default function LightWave({
    baseColor = "#9333ea", // matching their purple theme (violet-600)
    accentColor = "#4c1d95", // violet-900
    opacity = 0.95,
    backgroundColor = "#0a0118", // dark purple bg
    speed = 1.0,
    intensity = 1.0,
    waveScale = 8.0,
    interactive = true,
    style
}) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const pointerRef = useRef({ x: 0, y: 0, tX: 0, tY: 0 });
    const baseColorRef = useRef([0.1, 0.2, 0.8]);
    const accentColorRef = useRef([0, 0.06, 0.4]);
    const propsRef = useRef({ speed, intensity, waveScale, interactive });

    const parseColorToVec3 = colorStr => {
        if (!colorStr) return [0, 0, 0];
        if (colorStr.startsWith("#")) {
            let hex = colorStr.slice(1);
            if (hex.length === 3 || hex.length === 4) {
                hex = hex.split("").map(char => char + char).join("");
            }
            const r = parseInt(hex.slice(0, 2), 16) / 255 || 0;
            const g = parseInt(hex.slice(2, 4), 16) / 255 || 0;
            const b = parseInt(hex.slice(4, 6), 16) / 255 || 0;
            return [r, g, b];
        }
        return [0.1, 0.2, 0.8];
    };

    useEffect(() => {
        baseColorRef.current = parseColorToVec3(baseColor);
        accentColorRef.current = parseColorToVec3(accentColor);
    }, [baseColor, accentColor]);

    useEffect(() => {
        propsRef.current = { speed, intensity, waveScale, interactive };
    }, [speed, intensity, waveScale, interactive]);

    const vertexShaderSource = `
        precision mediump float;
        varying vec2 vUv;
        attribute vec2 a_position;
        void main() {
            vUv = .5 * (a_position + 1.);
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_ratio;
        uniform vec2 u_pointer_position;
        uniform float u_scroll_progress;
        uniform vec3 u_base_color;
        uniform vec3 u_accent_color;
        uniform float u_speed;
        uniform float u_intensity;
        uniform float u_wave_scale;
        uniform float u_interactive;

        vec2 rotate(vec2 uv, float th) {
            return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
        }

        float neuro_shape(vec2 uv, float t, float p) {
            vec2 sine_acc = vec2(0.);
            vec2 res = vec2(0.);
            float scale = u_wave_scale; 
            for (int j = 0; j < 15; j++) {
                uv = rotate(uv, 1.);
                sine_acc = rotate(sine_acc, 1.);
                vec2 layer = uv * scale + float(j) + sine_acc - t;
                sine_acc += sin(layer) + 2.4 * p;
                res += (.5 + .5 * cos(layer)) / scale;
                scale *= (1.2);
            }
            return res.x + res.y;
        }

        void main() {
            vec2 uv = .5 * vUv;
            uv.x *= u_ratio;

            vec2 pointer = vUv - u_pointer_position;
            pointer.x *= u_ratio;
            float p = clamp(length(pointer), 0., 1.);
            p = .5 * pow(1. - p, 2.);

            p *= u_interactive; 

            float t = .001 * u_time * u_speed;
            vec3 color = vec3(0.);

            float noise = neuro_shape(uv, t, p);
            noise = 1.2 * pow(noise, 3.);
            // Removed pow(noise, 10.) to prevent sharp heartbeat-like flashes
            noise = max(.0, noise - .5);
            noise *= (1. - length(vUv - .5));

            noise *= u_intensity; 

            color = u_base_color;
            color += u_accent_color * sin(3.0 * u_scroll_progress + 1.5);
            color = color * noise;

            gl_FragColor = vec4(color, noise);
        }
    `;

    const createShader = (gl, src, type) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Shader compile error:", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };

    const createProgram = (gl, vs, fs) => {
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program link error:", gl.getProgramInfoLog(program));
            return null;
        }
        return program;
    };

    const getUniforms = (gl, program) => {
        const uniforms = {};
        const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < count; i++) {
            const name = gl.getActiveUniform(program, i).name;
            uniforms[name] = gl.getUniformLocation(program, name);
        }
        return uniforms;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!gl) {
            console.error("WebGL not supported.");
            return;
        }

        const vs = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
        const fs = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
        const program = createProgram(gl, vs, fs);
        if (!program) return;

        const uniforms = getUniforms(gl, program);
        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        const buf = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.useProgram(program);

        const pos = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(pos);
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

        const resizeObserver = new ResizeObserver(entries => {
            if (!entries || entries.length === 0) return;
            const { width, height } = entries[0].contentRect;
            if (width === 0 || height === 0) return;
            const dpr = Math.min(window.devicePixelRatio, 2);
            const w = width * dpr;
            const h = height * dpr;
            canvas.width = w;
            canvas.height = h;
            gl.uniform1f(uniforms.u_ratio, w / h);
            gl.viewport(0, 0, w, h);
        });

        resizeObserver.observe(container);

        const render = () => {
            if (canvas.width > 0 && canvas.height > 0) {
                const pointer = pointerRef.current;
                pointer.x += (pointer.tX - pointer.x) * 0.2;
                pointer.y += (pointer.tY - pointer.y) * 0.2;

                const currentTime = performance.now();
                gl.uniform1f(uniforms.u_time, currentTime);

                const clientW = container.clientWidth || 1;
                const clientH = container.clientHeight || 1;
                gl.uniform2f(uniforms.u_pointer_position, pointer.x / clientW, 1 - pointer.y / clientH);
                gl.uniform1f(uniforms.u_scroll_progress, window.pageYOffset / (2 * window.innerHeight));
                
                gl.uniform3f(uniforms.u_base_color, baseColorRef.current[0], baseColorRef.current[1], baseColorRef.current[2]);
                gl.uniform3f(uniforms.u_accent_color, accentColorRef.current[0], accentColorRef.current[1], accentColorRef.current[2]);
                
                gl.uniform1f(uniforms.u_speed, propsRef.current.speed);
                gl.uniform1f(uniforms.u_intensity, propsRef.current.intensity);
                gl.uniform1f(uniforms.u_wave_scale, propsRef.current.waveScale);
                gl.uniform1f(uniforms.u_interactive, propsRef.current.interactive ? 1 : 0);
                
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            }
            animationRef.current = requestAnimationFrame(render);
        };

        render();

        const onPointer = e => {
            const rect = container.getBoundingClientRect();
            pointerRef.current.tX = e.clientX - rect.left;
            pointerRef.current.tY = e.clientY - rect.top;
        };

        const onTouch = e => {
            const rect = container.getBoundingClientRect();
            pointerRef.current.tX = e.touches[0].clientX - rect.left;
            pointerRef.current.tY = e.touches[0].clientY - rect.top;
        };

        container.addEventListener("pointermove", onPointer);
        container.addEventListener("touchmove", onTouch);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            resizeObserver.disconnect();
            container.removeEventListener("pointermove", onPointer);
            container.removeEventListener("touchmove", onTouch);
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            style={{ 
                position: "absolute", 
                top: 0,
                left: 0,
                width: "100%", 
                height: "100%", 
                overflow: "hidden", 
                backgroundColor: backgroundColor, 
                zIndex: 0,
                ...style 
            }}
        >
            <canvas 
                ref={canvasRef} 
                style={{ 
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    width: "100%", 
                    height: "100%", 
                    opacity: opacity 
                }} 
            />
        </div>
    );
}
