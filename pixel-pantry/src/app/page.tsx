import Image from "next/image";
import LandingPage from "@/components/landingPage";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/searchBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <SearchBar/>
      <LandingPage />
      <Footer />
    </div>
  );
}
