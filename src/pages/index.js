import { useState } from "react";
import Headers from "../components/Header"
import Footer from "@/components/Footer";
import Content from "@/components/Content";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Headers />
      <Content />
      <Footer />
    </>
  );
}
