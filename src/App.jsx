import React from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

function App() {
  return (
    <ReactLenis root>
      <div className=" min-h-screen text-white selection:bg-violet-500/30">
        <Navbar />
        <main>
          <Hero />
          <About />
          <section>
            <Stats />
          </section>
          <Gallery />
          <Testimonials />
          <Contact />
        </main>
      </div>
    </ReactLenis>
  );
}

export default App;
