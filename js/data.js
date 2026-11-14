/* AEVUM | site content. Edit this file to change watches, retailers, About copy and media. */

/* Media: paths are relative to index.html */
const WATCH_IMGS={
"AEWT-02":"assets/images/awet-02 925 silver watch.webp",
"AEWT-03":"assets/images/awet-03 925 silver watch.webp",
"AEWT-06":"assets/images/awet-06 925 silver watch.webp",
"AEWT-07":"assets/images/awet-07 925 silver watch.webp",
"AEWT-10":"assets/images/aewt-10 925 silver watch.webp",
"AEWT-11":"assets/images/awet-11 925 silver watch.webp",
"AEWT-12":"assets/images/awet-12 925 silver watch.webp",
"AEWT-13":"assets/images/awet-13 925 silver watch.webp",
"AEWT-19":"assets/images/awet-19 925 silver watch.webp",
"AEWT-22":"assets/images/awet-22 925 silver watch.webp",
"AEWT-23":"assets/images/awet-23 925 silver watch.webp",
"AEWT-24":"assets/images/awet-24 925 silver watch.webp"
};
const HERO_BG="assets/images/hero.webp";   // hero image or video, e.g. "assets/video/hero.mp4"
const ABOUT_IMGS=["assets/images/Aboutus-1.webp","assets/images/Aboutus-2.webp","assets/images/Aboutus-3.webp","assets/images/Aboutus-4.webp","assets/images/Aboutus-5.webp"]; // one per chapter, in order

/* Watches: [style ref, MRP, dial, case dia mm, strap mm, case height mm, gross wt g, net wt g, dial colour, stone colour, shape r/s/o] */
const W=[
["AEWT-02",27299,"Lacquered","26.00","11.90 x 7.00","7.45","32.970","29.00","#12307a","#2a8a4a","r"],
["AEWT-03",29799,"Lacquered","27.00","12.00","7.45","36.26","32.31","#4a2a86","#8b4fb8","r"],
["AEWT-06",25999,"Mother of Pearl","26 / 28","11.90 x 9.00","7.65","31.27","27.91","#f4f1ec","#f0b429","s"],
["AEWT-07",28499,"Malachite inspired","26","12.0 x 7.0","7.45","34.54","31.09","#0f4d3a","#0f6b4b","r"],
["AEWT-10",26499,"Mother of Pearl","26","9.5","7.45","31.87","28.17","#f4f1ec","#f08fb0","r"],
["AEWT-11",25899,"Mother of Pearl","27.0 / 22.2","Kada","7.65","31.15","27.67","#f4f1ec","#d3144a","o"],
["AEWT-12",25899,"Mother of Pearl with diamond","27.5 / 22.8","7.8 / 6.6","7.65","32.15","28.66","#f4f1ec","#1c1c1c","o"],
["AEWT-13",23699,"Mother of Pearl","27.20 / 22.00","12.20 / 7.70","7.65","28.32","24.82","#f4f1ec","#1565d8","o"],
["AEWT-19",27299,"Mother of Pearl","27.0 / 22.2","8.80","7.65","33.04","29.61","#f4f1ec","#6b8a1f","o"],
["AEWT-22",27399,"Shimmer painted","26.00","11.00","7.45","33.15","29.16","#b8402f","#d6d6d6","r"],
["AEWT-23",30199,"Special in-house flower dial","26.00","11.50 / 7.5","7.95","36.84","30.63","#f1dc8a","#222","r"],
["AEWT-24",26199,"Mother of Pearl","26","11.00 x 8","7.45","31.59","27.87","#f4f1ec","#1fa83a","r"]
].map(a=>({id:a[0],price:a[1],dial:a[2],dia:a[3],strap:a[4],h:a[5],gw:a[6],nw:a[7],dc:a[8],sc:a[9],sh:a[10],
 grp:a[2]=="Mother of Pearl"?"Mother of Pearl":a[2]=="Lacquered"?"Lacquered":"Specialty"}));


/* About Us chapters: [label, heading, text] */
const AB=[["Where it began","We wanted to capture time","We didn’t set out to just build another watch brand. We wanted to capture time in its most precious form."],
["The name","Named for eternity","Named after the Latin word for eternity, AEVUM was born out of a simple belief: true luxury isn’t about fleeting trends; it’s about enduring grace."],
["The woman we saw","She commands a room","We noticed that the modern woman, the one who commands a room, writes her own rules, and shines effortlessly, deserved timepieces crafted from something more meaningful than standard steel. She deserves real, breathing precious metals."],
["The craft","Fine jewellery meets horology","By transforming BIS Hallmarked 925 sterling silver and brilliant cut stones into everyday statement pieces, we bridge the gap between fine jewellery and high horology. Handcrafted with care, our watches aren’t just here to tell you the hours; they are here to mark your moments of triumph."],
["Her moment","Ready to win","Crafted for the woman ready to win, conquer and captivate. AEVUM brings the rare brilliance of 925 sterling silver directly to your wrist, blending heirloom quality craftsmanship with modern audacity."]];
