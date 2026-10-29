import { ActiveSectionProvider } from "@/components/layout/ActiveSection";
import { Intro } from "@/components/layout/Intro";
import { Nav } from "@/components/layout/Nav";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Expertise } from "@/components/sections/Expertise";
import { Approach } from "@/components/sections/Approach";
import { Works } from "@/components/sections/Works";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/config/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    logo: `${site.url}/brand/og.png`,
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  };

  return (
    <ActiveSectionProvider>
      <Intro />
      <Nav />
      <ScrollProgress />
      <main id="icerik" className="flex-1">
        <Hero />
        <Manifesto />
        <Expertise />
        <Approach />
        <Works />
        <About />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </ActiveSectionProvider>
  );
}
