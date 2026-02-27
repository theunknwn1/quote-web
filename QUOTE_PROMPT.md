# AI PROMPT — Generate Quotes for unknwnquotes.com

Copy-paste the prompt below into ChatGPT, Claude, or any AI. Replace the topic/number as needed.

---

## THE PROMPT:

```
Generate [NUMBER] quotes for my quotes website. For EACH quote, provide ALL of the following fields in valid JSON format.

FIELDS REQUIRED:
1. "quote" — The full quote text (do NOT include the author in the quote text)
2. "author" — The person who said it (use "Unknown" if unsure)
3. "category" — One of: success, discipline, life, love, existence, mindset, growth, happiness
4. "genre" — One of: motivation, sad, philosophy, love, funny, inspirational
5. "language" — The language of the quote: english, tamil, hindi, spanish, french
6. "deep_meaning" — A 300–400 word paragraph (in HTML with <p> tags) explaining the deep philosophical meaning behind this quote. Make it thoughtful, analytical, and unique. Do NOT sound generic or AI-generated. Write like a skilled essayist.
7. "story" — A 400–500 word narrative (in HTML with <p> and <h3> tags) telling a real or realistic story that connects to this quote's message. Include specific details, names, settings. Make it feel like a magazine article, NOT a motivational blog post.
8. "meta_title" — An SEO-friendly page title (50-60 characters) for this quote's dedicated page
9. "meta_description" — An SEO meta description (130-155 characters) for this quote's page

RULES:
- Output ONLY valid JSON array, nothing else
- No markdown code fences, no explanations — just the JSON
- Use real, verified quotes with correct attribution
- Do not repeat quotes
- deep_meaning and story must be wrapped in HTML <p> tags
- story can also use <h3> for sub-sections
- Avoid generic motivational fluff — be specific and insightful
- Each quote should feel like it belongs on a premium editorial site

EXAMPLE OUTPUT FORMAT:
[
  {
    "quote": "We suffer more often in imagination than in reality.",
    "author": "Seneca",
    "category": "mindset",
    "genre": "philosophy",
    "language": "english",
    "deep_meaning": "<p>Seneca's observation cuts to the heart of human anxiety...</p><p>When we examine our fears closely...</p>",
    "story": "<p>In 2008, a young entrepreneur named David stood at the edge of financial ruin...</p><h3>The Turning Point</h3><p>What happened next...</p>",
    "meta_title": "Seneca on Suffering — Deep Meaning & Story",
    "meta_description": "Explore the deep meaning behind Seneca's quote about suffering and imagination. A powerful lesson in Stoic philosophy."
  }
]

NOW GENERATE [NUMBER] QUOTES ABOUT: [TOPIC]
```

---

## EXAMPLE USAGE:

"Generate 10 quotes about discipline"
"Generate 5 quotes about failure in english"
"Generate 10 motivational quotes about growth and mindset"
"Generate 5 philosophy quotes about existence"

---

## AFTER YOU GET THE JSON:

Give the JSON output to me and I will insert it directly into your Supabase database.
