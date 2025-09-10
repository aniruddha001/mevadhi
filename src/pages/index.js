import { useState } from "react";
import Headers from "../components/Header"
import Footer from "@/components/Footer";
import Blogcontent from "@/components/Blogcontent";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Headers />
      <Blogcontent />
      <Footer />
    </>
  );
}
