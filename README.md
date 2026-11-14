# AEVUM website

Static website for AEVUM, 925 sterling silver watches for women (Kesar Watch Designs Pvt. Limited).
No build step: open `index.html` in a browser (internet needed once for Google Fonts) or upload the folder to any static host.

## Structure

```
aevum-website/
  index.html        home, catalogue, About Us and product pages
  contact.html      Contact Us page
  send-mail.php     PHP handler: emails the Contact Us form to customer care
  retailers.html    Find a retailer page (India map and store list)
  css/styles.css    all styling
  js/data.js        content: watches, prices, About copy, media paths  <- edit this
  js/retailers-data.js  retailers list and India outline  <- edit this
  js/common.js      shared helpers
  js/app.js         home page: catalogue, filters, product pages, About
  js/contact.js     contact form
  js/retailers.js   retailer map, list and search
  assets/
    images/         logo.png, watch.jpg (add more photos here)
    video/          optional hero video
```

## Common edits (all in `js/data.js`)

- **Watch photo:** `WATCH_IMG` (currently `assets/images/watch.jpg`).
- **Hero background:** `HERO_BG` (currently `assets/images/hero.jpg`), an image or an mp4/webm path. A cream wash behind the text keeps it readable on any photo or video.
- **About Us backgrounds:** `ABOUT_IMGS`, a list of image paths.
- **Watches and prices:** the `W` list.
- **Retailers (`js/retailers-data.js`):** add `[place or city, address overview, longitude, latitude, Google Maps link]` to `R`. Each is shown as "Aevum <place or city>" with a View on map button that opens the link; pins are placed on the India map by coordinates (nearby retailers share one pin).

Within `index.html`, sections and product pages use hash links: `#home`, `#watches`, `#about`, `#product-aewt-02` ...
Contact and retailers are separate pages (`contact.html`, `retailers.html`); old `#contact` and `#retailers` links redirect to them.

## Contact form (needs PHP hosting)

`contact.html` is a normal page. Its form posts to `send-mail.php`, which emails the message to customer care. Only `send-mail.php` needs PHP (7.4+) and a working `mail()` on the host; a static host (GitHub Pages, plain file hosting) cannot send it.
Settings are at the top of `send-mail.php`: `TO_EMAIL` (`designs@kesardesigns.com`) and `FROM_EMAIL` (the sender; use an address on the hosting domain so mail is not marked as spam).
The phone number is optional but must be exactly 10 digits (checked in the browser and again on the server).
Test locally with `php -S localhost:8000` in this folder, then open `http://localhost:8000/contact.html`.
