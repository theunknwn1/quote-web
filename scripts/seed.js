// Seed script — run with: node scripts/seed.js
// Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local

const { createClient } = require("@supabase/supabase-js");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "❌ Missing env vars. Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const quotes = [
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts. – Winston Churchill",
    genre: "motivation",
    category: "success",
    language: "english",
    likes: 0,
  },
  {
    quote:
      "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    genre: "motivation",
    category: "discipline",
    language: "english",
    likes: 0,
  },
  {
    quote:
      "The only way to do great work is to love what you do. – Steve Jobs",
    genre: "motivation",
    category: "success",
    language: "english",
    likes: 0,
  },
  {
    quote:
      "Your talent determines what you can do. Your motivation determines how much you are willing to do. Your attitude determines how well you do it. – Lou Holtz",
    genre: "motivation",
    category: "mindset",
    language: "english",
    likes: 0,
  },
  {
    quote:
      "Hard work beats talent when talent doesn't work hard. – Tim Notke",
    genre: "motivation",
    category: "discipline",
    language: "english",
    likes: 0,
  },
  {
    quote:
      "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times. – Bruce Lee",
    genre: "motivation",
    category: "discipline",
    language: "english",
    likes: 0,
  },
  {
    quote:
      "The secret of getting ahead is getting started. – Mark Twain",
    genre: "motivation",
    category: "success",
    language: "english",
    likes: 0,
  },
  {
    quote:
      "Opportunities don't happen. You create them. – Chris Grosser",
    genre: "motivation",
    category: "growth",
    language: "english",
    likes: 0,
  },
  {
    quote:
      "It always seems impossible until it's done. – Nelson Mandela",
    genre: "motivation",
    category: "mindset",
    language: "english",
    likes: 0,
  },
  {
    quote:
      "Consistency is the difference between a dream and a reality. – Unknown",
    genre: "motivation",
    category: "discipline",
    language: "english",
    likes: 0,
  },
];

async function seed() {
  console.log("🌱 Seeding quotes with genre field...");

  const { data, error } = await supabase.from("quotes").insert(quotes).select();

  if (error) {
    console.error("❌ Error inserting quotes:", error.message);
    process.exit(1);
  }

  console.log(`✅ Successfully inserted ${data.length} quotes.`);
  data.forEach((q, i) => {
    console.log(
      `   ${i + 1}. [${q.genre}/${q.category}/${q.language}] ${q.quote.slice(0, 50)}...`
    );
  });
}

seed();
