import Image from "next/image";
import LandingPage from "@/components/landingPage";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <NavBar />
      <LandingPage />
      <Footer />
    </div>
  );
}
