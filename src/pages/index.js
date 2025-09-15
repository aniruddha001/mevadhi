import { useState } from "react";
import Headers from "../components/Header"
import Footer from "@/components/Footer";
import Blogcontent from "@/components/Blogcontent";
import Categories from "@/components/Blogcategories";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <Headers />
      <Categories onCategorySelect={setSelectedCategory} />
      <Blogcontent category={selectedCategory} />
      <Footer />
    </>
  );
}
