/* ============================================================
   VGrow â€” Portfolio Data
   ============================================================
   This is the ONLY file you need to edit to update your
   portfolio. Add a new object to a list, save, done.
   No page redesign needed â€” the website rebuilds itself.

   QUICK START
   ----------
   1. Add a thumbnail  -> copy an object in `thumbnails`
   2. Add a video      -> copy an object in `videos`
   3. Remove an item   -> delete its object
   4. Update contact   -> edit the `SITE` block below

   NOTE: The items shipped below are PLACEHOLDERS that show
   the intended layout. Replace their titles, categories,
   descriptions and image/video URLs with your real work.
   ============================================================ */

const SITE = {
  name: "VGrow",

  // --- CONTACT (replace the placeholders) -------------------
  // Email: used for the "Email Me" mailto: button.
  email: "YOUR_EMAIL", // e.g. "hello@vgrow.studio"

  // WhatsApp: digits only, country code first, no +, spaces or dashes.
  // Becomes a wa.me link automatically.
  whatsapp: "YOUR_WHATSAPP_NUMBER", // e.g. "919876543210"

  // Instagram: full URL of your profile.
  instagram: "YOUR_INSTAGRAM_URL", // e.g. "https://www.instagram.com/yourhandle"
};

/* ------------------------------------------------------------
   THUMBNAILS â€” "Selected Thumbnail Work"
   ------------------------------------------------------------
   To add one:  copy any {...} block, paste it in, change the
   values. To use a real image, put the file in
   assets/thumbnails/ and reference it like
   "assets/thumbnails/my-thumb.jpg" â€” or paste any public
   Cloudinary image URL directly into `image`.
   ------------------------------------------------------------ */
const thumbnails = [
  {
    title: "Tech Review â€” Channel Series",
    category: "YouTube Thumbnail",
    description: "High-contrast composition with a clear focal point and readable text hierarchy.",
    image: "assets/thumbnails/thumb-01.svg",
  },
  {
    title: "Gaming Highlights",
    category: "YouTube Thumbnail",
    description: "Bold colour blocking and expressive crop built for feed visibility.",
    image: "assets/thumbnails/thumb-02.svg",
  },
  {
    title: "Finance Explainer",
    category: "YouTube Thumbnail",
    description: "Clean, trustworthy layout with strong typographic hierarchy.",
    image: "assets/thumbnails/thumb-03.svg",
  },
  {
    title: "Podcast Episode Cover",
    category: "Thumbnail Design",
    description: "Consistent episodic design system for a recurring show format.",
    image: "assets/thumbnails/thumb-04.svg",
  },
  {
    title: "Vlog Series Key Art",
    category: "Thumbnail Design",
    description: "Story-driven key art designed as a recognisable series style.",
    image: "assets/thumbnails/thumb-05.svg",
  },
  {
    title: "Tutorial â€” Before / After",
    category: "YouTube Thumbnail",
    description: "Split composition that promises a clear transformation.",
    image: "assets/thumbnails/thumb-06.svg",
  },
  {
    title: "Product Launch Teaser",
    category: "Social Content",
    description: "Minimal launch visual designed to stop the scroll.",
    image: "assets/thumbnails/thum-07.svg",
  },
  {
    title: "Documentary Style Cover",
    category: "Thumbnail Design",
    description: "Editorial, cinematic treatment for long-form storytelling.",
    image: "assets/thumbnails/thum-08.svg",
  },
];

/* -----------------------------------------------------------
   VIDEOS â€” "Video Work"
   ---------KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKBˆÕÈÈQHÓÕQST–H’QSÈ
HÚÛHÚ[Ùˆ\Èš[JN‚‚ˆKˆ\ØY[İ\ˆšY[ÈÈÛİY[˜\K‚ˆ‹ˆÜ[ˆ][ˆHÛİY[˜\HYYXHXœ˜\K[™ÛÜH]ÂˆX›XÈSU‘T–HT“ˆ]ÛÚÜÈZÙN‚ˆÎ‹ËÜ™\Ë˜ÛİY[˜\K˜ÛÛKÏ[İ\‹XÛİY[˜[YO‹İšY[Ëİ\ØYİŒLŒÍMÎLŞ^ŒLŒË›\ˆ
Û›HHX›XÈT“\È™YYY8 %™]™\ˆ\İHTHÙ^\ÂˆÜˆÙXÜ™]È\™KŠBˆËˆ\İH][ÈHšY[ØšY[™[İË‚ˆˆÈHØ[YH›ÜˆHÜİ\ˆ[XYÙHT“
Hİ[œ˜[YBˆÚİÛˆ™Y›Ü™HHšY[È^\ÊH[™\İH][ÂˆÜİ\˜ˆ\ˆÛİY[˜\HØ[ˆÙ[™\˜]HÜİ\œÂˆ]]ÛX]XØ[HHÚ[™Ú[™ÈHT“^[œÚ[ÛˆÈšœËˆK™Ëˆ‹‹‹İšY[Ëİ\ØYÜÛ×Ì‹Ş^ŒLŒËšœÈÚ]™\ÈHœ˜[YBˆœ›ÛHÙXÛÛ™‹‚ˆKˆ\]H]KØ]YÛÜH[™\ØÜš\[Û‹‚‚ˆH›İ\ˆšY[ÜÈ™[İÈ\ÙH[\Ü˜\HX›XÈĞSTHÛ\ÈÛÂˆH^Y\ˆÛÜšÜÈİ]ÙˆH›Ş8 %™\XÙH[HÚ][İ\‚ˆİÛˆÛİY[˜\HT“È™Y›Ü™HÚ\š[™ÈHÚ]HÚ]ÛY[Ë‚ˆKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKH
‹Â˜ÛÛœİšY[ÜÈHÂˆÂˆ]Nˆ”ÚÜQ›Ü›HØ[\HY]‹ˆØ]YÛÜNˆ”ÚÜQ›Ü›HY][™È‹ˆ\ØÜš\[Ûˆ•™\XØ[Y]Ú]XÙYİ]ËØ\[ÛœÈ[™[İ[ÛˆÙ\YÚ›ÜˆÛØÚX[™YYËˆ‹ˆšY[ÎˆšÎ‹ËÜİÜ˜YÙK™ÛÛÙÛX\\Ë˜ÛÛKÙİ‹]šY[ÜËXXÚÙ]ÜØ[\KÑ›ÜšYÙÙ\›^™\Ë›\‹ˆÜİ\ˆ˜\ÜÙ]ËÜÜİ\œËÜÜİ\‹LKœİ™È‹ˆKˆÂˆ]Nˆ“Û™ËQ›Ü›HØ[\HY]‹ˆØ]YÛÜNˆ“Û™ËQ›Ü›HY][™È‹ˆ\ØÜš\[Ûˆ”İXİ\™Y[İUX™HY]›Øİ\ÙYÛˆİÜ][[™ËXÚ[™È[™ÛX[ˆ™\Ù[][Û‹ˆ‹ˆšY[ÎˆšÎ‹ËÜİÜ˜YÙK™ÛÛÙÛX\\Ë˜ÛÛKÙİ‹]šY[ÜËXXÚÙ]ÜØ[\KÑ›ÜšYÙÙ\‘\ØØ\\Ë›\‹ˆÜİ\ˆ˜\ÜÙ]ËÜÜİ\œËÜÜİ\‹L‹œİ™È‹ˆKˆÂˆ]Nˆ”ÛØÚX[YYXHØ[\HY]‹ˆØ]YÛÜNˆ”ÛØÚX[YYXHY][™È‹ˆ\ØÜš\[Ûˆ‘˜\İ]›Ü›K\™XYHÛÛ[\ÚYÛ™YÈÛ][[Ûˆ[ˆH™YYˆ‹ˆšY[ÎˆšÎ‹ËÜİÜ˜YÙK™ÛÛÙÛX\\Ë˜ÛÛKÙİ‹]šY[ÜËXXÚÙ]ÜØ[\KÑ›ÜšYÙÙ\‘[‹›\‹ˆÜİ\ˆ˜\ÜÙ]ËÜÜİ\œËÜÜİ\‹LËœİ™È‹ˆKˆÂˆ]Nˆ”İÜ][[™ÈØ[\HY]‹ˆØ]YÛÜNˆÛÛ[Q›Øİ\ÙYY][™È‹ˆ\ØÜš\[Ûˆ“˜\œ˜]]™KYš\œİY]Ú\™H]™\Hİ]İ\ÜÈHİÜH™Z[™ÈÛˆ‹ˆšY[ÎˆšÎ‹ËÜİÜ˜YÙK™ÛÛÙÛX\\Ë˜ÛÛKÙİ‹]šY[ÜËXXÚÙ]ÜØ[\KÑ›ÜšYÙÙ\’›Ş\šY\Ë›\‹ˆÜİ\ˆ˜\ÜÙ]ËÜÜİ\œËÜÜİ\‹Lœİ™È‹ˆK—NÂ