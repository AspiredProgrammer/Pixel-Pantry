import Image from "next/image";
import LandingPage from "@/components/landingPage";
import SearchBar from "@/components/searchBar";

export default function Home() {
  return (
      <div className="min-h-screen">

          <LandingPage/>
          <div className="container mx-auto px-4 pb-8">
              <SearchBar size="lg" className="mb-8"/>
          </div>
      </div>
  );
}
