import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import ProductCatalog from "@/components/ProductCatalog";
import TrustStats from "@/components/TrustStats";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Products />
      <ProductCatalog />
      <TrustStats />
      <Footer />
    </main>
  );
}
