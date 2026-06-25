import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://deertnadairy.com";
  const lastModified = new Date();

  // Define static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Define product pages dynamically
  const productNames = [
    "جبنة مغلية حلوة",
    "جبنة مغلية نابلسية",
    "جبنة عكاوي",
    "جبنة مبسترة",
    "جبنة بالمستكة",
    "جبنة اريش",
    "شنكليش",
    "جبنة مشللة",
    "فيتا",
    "لبنة طرية",
    "لبنة جامدة",
    "لبنة جرشية",
    "لبنة بالزيت كرات - زعتر",
    "لبنة بالزيت كرات - شطة",
    "لبنة بالزيت كرات - سادة",
    "جبنة حلوم",
    "حلوم براغي",
    "لبن بقري",
  ];

  const productRoutes = productNames.map((name) => {
    // Generate a clean URL slug from the Arabic name (or map it)
    // For simplicity, using encodeURIComponent, though ideally you'd map these to english slugs
    // Ex: "جبنة عكاوي" -> "%D8%AC%D8%A8%D9%86%D8%A9-%D8%B9%D9%83%D8%A7%D9%88%D9%8A"
    const slug = name.replace(/\s+/g, "-");
    
    return {
      url: `${baseUrl}/products/${encodeURIComponent(slug)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...productRoutes];
}
