/* VGrow portfolio data - the only file you edit to update the site.
   Add a copy of any {...} block to add a project; delete one to remove it.
   Titles, categories, descriptions and images below are placeholders:
   replace them with your real work. Full instructions: README.md */

const SITE = {
  name: "VGrow",

  // Contact - replace the placeholders:
  email: "YOUR_EMAIL",             // e.g. "hello@vgrow.studio"
  whatsapp: "YOUR_WHATSAPP_NUMBER", // digits only with country code, e.g. "919876543210"
  instagram: "YOUR_INSTAGRAM_URL",  // e.g. "https://www.instagram.com/yourhandle"
};

/* Thumbnails - "Selected Thumbnail Work".
   image: put a file in assets/thumbnails/ and use "assets/thumbnails/yourfile.jpg",
   or paste any public Cloudinary image URL. */

const thumbnails = [
  { title: "Tech Review - Channel Series", category: "YouTube Thumbnail",
    description: "High-contrast composition with a clear focal point and readable text hierarchy.",
    image: "assets/thumbnails/thumb-01.svg" },
  { title: "Gaming Highlights", category: "YouTube Thumbnail",
    description: "Bold colour blocking and expressive crop built for feed visibility.",
    image: "assets/thumbnails/thumb-02.svg" },
  { title: "Finance Explainer", category: "YouTube Thumbnail",
    description: "Clean, trustworthy layout with strong typographic hierarchy.",
    image: "assets/thumbnails/thumb-03.svg" },
  { title: "Podcast Episode Cover", category: "Thumbnail Design",
    description: "Consistent episodic design system for a recurring show format.",
    image: "assets/thumbnails/thumb-04.svg" },
  { title: "Vlog Series Key Art", category: "Thumbnail Design",
    description: "Story-driven key art designed as a recognisable series style.",
    image: "assets/thumbnails/thumb-05.svg" },
  { title: "Tutorial - Before / After", category: "YouTube Thumbnail",
    description: "Split composition that promises a clear transformation.",
    image: "assets/thumbnails/thumb-06.svg" },
  { title: "Product Launch Teaser", category: "Social Content",
    description: "Minimal launch visual designed to stop the scroll.",
    image: "assets/thumbnails/thumb-07.svg" },
  { title: "Documentary Style Cover", category: "Thumbnail Design",
    description: "Editorial, cinematic treatment for long-form storytelling.",
    image: "assets/thumbnails/thumb-08.svg" },
];

/* Videos - "Video Work".
   HOW TO USE YOUR CLOUDINARY VIDEOS:
   1. Upload the video to Cloudinary.
   2. Copy its public delivery URL, like:
      https://res.cloudinary.com/<your-cloud>/video/upload/v1234567890/xyz123.mp4
      (public URL only - never paste API keys or secrets here)
   3. Paste it into the "video" field of an item below.
   4. Poster: paste an image URL into "poster", or let Cloudinary grab a frame:
      change the URL extension to .jpg and add so_2 for the frame at second 2.
   5. Update title, category, description.
   The clips below are temporary public samples - replace them before
   sharing the site with clients. */

const videos = [
  { title: "Short-Form Sample Edit", category: "Short-Form Editing",
    description: "Vertical edit with paced cuts, captions and motion kept tight for social feeds.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "assets/posters/poster-01.svg" },
  { title: "Long-Form Sample Edit", category: "Long-Form Editing",
    description: "Structured YouTube edit focused on storytelling, pacing and clean presentation.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "assets/posters/poster-02.svg" },
  { title: "Social Media Sample Edit", category: "Social Media Editing",
    description: "Fast, platform-ready content designed to hold attention in the feed.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: "assets/posters/poster-03.svg" },
  { title: "Storytelling Sample Edit", category: "Content-Focused Editing",
    description: "Narrative-first edit where every cut supports the story being told.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: "assets/posters/poster-04.svg" },
];
