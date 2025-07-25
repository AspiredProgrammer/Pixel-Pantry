import Image from "next/image";
import LandingPage from "@/components/landingPage";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar/>
      <LandingPage />
    </div>
  );
}
