import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import ProductCatalog from "@/components/ProductCatalog";
import TrustStats from "@/components/TrustStats";
import Footer from "@/components/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "الرئيسية",
            "item": "https://deertnadairy.com/"
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": "https://deertnadairy.com/#collection",
        "url": "https://deertnadairy.com/",
        "name": "منتجات ديرتنا للألبان والأجبان",
        "description": "تشكيلة واسعة من الألبان والأجبان الطازجة والشنينة من مزارع الأردن.",
        "isPartOf": {
          "@id": "https://deertnadairy.com/#website"
        }
      }
    ]
  };

  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <Products />
      <ProductCatalog />
      <TrustStats />
      <Footer />
    </main>
  );
}
