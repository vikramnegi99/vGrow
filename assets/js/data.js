/* VGrow portfolio data - the only file you edit to update the site.
   Add a copy of any {...} block to add a project; delete one to remove it.
   Images and videos below are hosted on Cloudinary (public delivery URLs).
   To add more of your own: upload to Cloudinary, copy the public
   delivery URL, and paste it into the "image" / "video" field.
   Full instructions: README.md */

const SITE = {
  name: "VGrow",

  // Contact - replace the placeholders:
  email: "YOUR_EMAIL",             // e.g. "hello@vgrow.studio"
  whatsapp: "YOUR_WHATSAPP_NUMBER", // digits only with country code, e.g. "919876543210"
  instagram: "YOUR_INSTAGRAM_URL",  // e.g. "https://www.instagram.com/yourhandle"
};

/* Thumbnails - "Selected Thumbnail Work".
   Each entry shows one design. The two variant pairs below use a small
   Cloudinary crop (c_crop) to display each half of a stacked variants
   sheet as its own card - you can also just paste any image URL. */

const thumbnails = [
  { title: "10X More Clients", category: "YouTube Thumbnail",
    description: "Result-driven business thumbnail with revenue graphics and a bold benefit promise.",
    image: "https://res.cloudinary.com/acqrwkcn/image/upload/q_auto,f_auto/v1790585898/58ec5073a34d18a0bbdff159594e1f00.jpg" },
  { title: "Worst to Best - Cinematic Ranking", category: "YouTube Thumbnail",
    description: "Tier-list style ranking design with colour-coded panels and expressive portraits.",
    image: "https://res.cloudinary.com/acqrwkcn/image/upload/q_auto,f_auto/v1790585898/da52f1189de617451ad0554dc729859e.jpg" },
  { title: "Chess Opening Guide", category: "YouTube Thumbnail",
    description: "Educational chess thumbnail with metallic accent props and bold, localised text.",
    image: "https://res.cloudinary.com/acqrwkcn/image/upload/q_auto,f_auto/v1790585896/f4a9e6a7fd960bfe32d56e531a26eb8f.jpg" },
  { title: "PUBG Live - Gameplay", category: "Gaming Thumbnail",
    description: "High-energy gaming thumbnail with a bright LIVE badge and expressive subject framing.",
    image: "https://res.cloudinary.com/acqrwkcn/image/upload/c_crop,h_419,w_736,x_0,y_0/q_auto,f_auto/v1790585897/f66b09eb7d4d425facc622f2d2daba86.jpg" },
  { title: "PUBG Live - Reaction", category: "Gaming Thumbnail",
    description: "Second design of the gaming series - expressive close-up with prop detail and environment.",
    image: "https://res.cloudinary.com/acqrwkcn/image/upload/c_crop,h_419,w_736,x_0,y_420/q_auto,f_auto/v1790585897/f66b09eb7d4d425facc622f2d2daba86.jpg" },
  { title: "Upwork 2026 - Light Variant", category: "YouTube Thumbnail",
    description: "Light variant of a freelancing-update thumbnail with a clear focal point and text hierarchy.",
    image: "https://res.cloudinary.com/acqrwkcn/image/upload/c_crop,h_460,w_736,x_0,y_0/q_auto,f_auto/v1790585899/924047d72d3bc8ec15e5307d991538da.jpg" },
  { title: "Upwork 2026 - Dark Variant", category: "YouTube Thumbnail",
    description: "Dark, high-production variant of the same concept with a moody backdrop and glowing accents.",
    image: "https://res.cloudinary.com/acqrwkcn/image/upload/c_crop,h_460,w_736,x_0,y_460/q_auto,f_auto/v1790585899/924047d72d3bc8ec15e5307d991538da.jpg" },
  { title: "Thumbnail Redesign - Before / After", category: "Thumbnail Redesign",
    description: "Side-by-side redesign showing the transformation from a rough draft to a stylised final.",
    image: "https://res.cloudinary.com/acqrwkcn/image/upload/q_auto,f_auto/v1790585896/4732c4b30265695518bd67e88bf93234.jpg" },
];

/* Videos - "Video Work". Each entry is a Cloudinary-hosted video
   (public delivery URL) that plays directly inside the page.
   To add another: upload to Cloudinary, copy the public delivery URL,
   paste it into "video", and use its .jpg frame (or your own image)
   as "poster". */

const videos = [
  { title: "Creative Kings Studio", category: "Short-Form Editing",
    description: "Vertical edit with a strong hook, captions, motion graphics and B-roll around a talking-head performance.",
    video: "https://res.cloudinary.com/acqrwkcn/video/upload/v1790586190/CREATIVE_KINGS_STUDIO.mp4",
    poster: "https://res.cloudinary.com/acqrwkcn/video/upload/q_auto/v1790586190/CREATIVE_KINGS_STUDIO.jpg" },
  { title: "Orbitonmedia", category: "Social Media Editing",
    description: "Fast vertical reel with tight pacing, punch-in crops and readable captions.",
    video: "https://res.cloudinary.com/acqrwkcn/video/upload/v1790586126/Orbitonmedia.mp4",
    poster: "https://res.cloudinary.com/acqrwkcn/video/upload/q_auto/v1790586126/Orbitonmedia.jpg" },
  { title: "GDAI Shovo", category: "Content-Focused Editing",
    description: "Highlight-style edit with dynamic layouts, bold number callouts and multi-speaker framing.",
    video: "https://res.cloudinary.com/acqrwkcn/video/upload/v1790586125/GDAI_Shovo.mp4",
    poster: "https://res.cloudinary.com/acqrwkcn/video/upload/q_auto/v1790586125/GDAI_Shovo.jpg" },
];
