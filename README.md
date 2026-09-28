# VGrow — Portfolio Website

A clean, premium single-page portfolio for VGrow: video editing and thumbnail design.
White background, charcoal type, one blue accent. No frameworks, no build step —
just HTML, CSS and JavaScript that you can host anywhere (GitHub Pages works great).

---

## Quick start

Open `index.html` in a browser. That's it — there is nothing to install or build.

## Update your portfolio (the only file you need to edit)

All content lives in **`assets/js/data.js`**:

| What you want to do | How |
|---|---|
| Add a thumbnail | Copy any `{ ... }` object inside `thumbnails` and paste it below |
| Add a video | Copy any `{ ... }` object inside `videos` and paste it below |
| Remove an item | Delete its object |
| Change email / WhatsApp | Edit the `SITE` block at the top |

Adding an item looks like this:

```js
{
  title: "My New Project",
  category: "YouTube Thumbnail",
  description: "Optional short description.",
  image: "assets/thumbnails/my-new-thumb.jpg",   // local file or any public URL
}
```

The page rebuilds itself from this list — no redesign needed, and there is no
limit on how many items you add.

## Using your Cloudinary videos

The videos in `assets/js/data.js` are your Cloudinary assets, embedded with
their public **delivery URLs**. To add another one:

1. Upload your video to Cloudinary.
2. In the Cloudinary Media Library, copy the public **delivery URL**:
   `https://res.cloudinary.com/<your-cloud>/video/upload/v1234567890/abc123.mp4`
3. Paste it into the `video` field of an item in `videos`.
4. For the `poster` (the still frame shown before play), use the Cloudinary
   frame image (same URL with a `.jpg` extension), or any image URL.
5. Update `title`, `category` and `description`.

Only public delivery URLs are needed. **Never put API keys or secrets in this
repository** — the site works entirely with public URLs.

## Set your contact details

In `assets/js/data.js`, replace:

```js
email:     "mrvickybusines@gmail.com",
whatsapp:  "919528097342",  // digits with country code -> wa.me link
```

The Email button becomes a `mailto:` link and WhatsApp opens a `wa.me` chat.

## Replace the placeholder images

The thumbnails in `assets/js/data.js` point to your Cloudinary images, so you
can add or replace work just by pasting new delivery URLs - the
`assets/thumbnails/` and `assets/posters/` folders only hold starter SVGs you
can ignore or delete. Images are lazy-loaded, optimised (`q_auto,f_auto`), and
never distorted (16:9 grid cards). If you later remove the local SVG files,
also remove them from `data.js`.

## Deploy on GitHub Pages

1. Push these files to your repository (e.g. the default `main` branch).
2. In GitHub: **Settings → Pages → Source: Deploy from a branch**, select
   `main` / root.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

## Structure

```
index.html               the whole page
assets/
  css/style.css          design system (edit colors/typography here)
  js/data.js             ⭐ your content — thumbnails, videos, contact info
  js/main.js             rendering + lightbox + custom video player
  thumbnails/            thumbnail images (placeholder SVGs included)
  posters/               video poster frames (placeholder SVGs included)
```

## Notes on the player & lightbox

- Videos play inline (HTML5, no YouTube embeds), with play/pause, seek,
  volume, fullscreen and a progress bar; nothing autoplays with sound.
- Tapping anywhere on a video toggles play; controls appear on interaction.
- Keyboard support: `Space/K` play-pause, `←/→` seek, `M` mute, `F` fullscreen.
- Thumbnail lightbox: `←/→` navigate, `Esc` closes, zoom button (or double-click)
  zooms 2× and you can drag to pan.
