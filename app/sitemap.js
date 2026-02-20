import { supabase } from "@/lib/supabase";

export default async function sitemap() {
  const baseUrl = "https://unknwnquotes.com";

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  let dynamicPages = [];
  try {
    const { data } = await supabase
      .from("quotes")
      .select("genre, category, language")
      .limit(5000);

    if (data) {
      const combos = new Set(
        data
          .filter((d) => d.genre)
          .map((d) => `${d.genre}/${d.category}/${d.language}`)
      );
      dynamicPages = [...combos].map((combo) => ({
        url: `${baseUrl}/quotes/${combo}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      }));
    }
  } catch (err) {
    console.error("Sitemap generation error:", err);
  }

  return [...staticPages, ...dynamicPages];
}
