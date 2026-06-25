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
            "item": "https://deiratna.com/"
          }
        ]
      },
      {
        "@type": "Product",
        "name": "منتجات ديرتنا للألبان والأجبان",
        "image": "https://deiratna.com/logo-deiratna-v2.png",
        "description": "تشكيلة واسعة من الألبان والأجبان الطازجة والشنينة من مزارع الأردن.",
        "brand": {
          "@type": "Brand",
          "name": "ديرتنا"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "JOD",
          "availability": "https://schema.org/InStoreOnly",
          "seller": {
            "@type": "Organization",
            "name": "ديرتنا"
          }
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
