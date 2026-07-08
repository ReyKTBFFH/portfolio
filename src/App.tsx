import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Platform from "./sections/Platform";
import CaseStudies from "./sections/CaseStudies";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-base text-ink">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Platform />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
