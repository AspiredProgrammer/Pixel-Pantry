import Image from "next/image";
import LandingPage from "@/components/landingPage";
// import NavBar from "@/components/NavBar";
// import Footer from "@/components/Footer";
import SearchBar from "@/components/searchBar";

export default function Home() {
  return (
    <div className="min-h-screen wallpaper-bg">
      <div className="container mx-auto px-4 pt-8 pb-4">
        <SearchBar size="lg" className="mb-8" />
      </div>
      <LandingPage />
    </div>
  );
}
