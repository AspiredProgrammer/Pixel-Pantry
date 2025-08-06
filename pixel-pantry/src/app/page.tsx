import Image from "next/image";
import LandingPage from "@/components/landingPage";
// import NavBar from "@/components/NavBar";
// import Footer from "@/components/Footer";
import SearchBar from "@/components/searchBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-4 pt-8 pb-4">
        <SearchBar size="lg" className="mb-8" />
      </div>
      <LandingPage />
    </div>
  );
}
