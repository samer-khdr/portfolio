import { useState, useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import GradientMesh from '../components/GradientMesh';
import aboutData from '../data/about.json';

const SITE_URL = 'https://samer-khdr.github.io/portfolio';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const title = `${aboutData.name} — ${aboutData.title}`;
  const description = aboutData.tagline;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <div className="bg-slate-950 text-slate-50 overflow-hidden relative">
        <GradientMesh />
        <Header scrolled={scrolled} />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
