import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Recent from "@/components/Recent";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Recent />
      <Contact />
      <Footer />
    </div>
  );
}
