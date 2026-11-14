/* AEVUM | site behaviour. Content lives in js/data.js */
function art(w,cls){
 const img=WATCH_IMGS[w.id]||WATCH_IMG;
if(img)return `<img class="wimg" src="${img}" alt="Aevum ${w.id} 925 silver watch">`;
 let l="";for(let i=0;i<7;i++){l+=`<rect x="82" y="${i*20}" width="36" height="15" rx="6" fill="url(#sil)"/><rect x="82" y="${172+i*20+20}" width="36" height="15" rx="6" fill="url(#sil)"/>`}
 const c=w.sh=="s"?`<rect x="62" y="112" width="76" height="76" rx="14" fill="url(#sil)"/><rect x="73" y="123" width="54" height="54" rx="8" fill="${w.dc}"/><rect x="73" y="123" width="54" height="54" rx="8" fill="url(#shine)"/>`
 :w.sh=="o"?`<ellipse cx="100" cy="150" rx="40" ry="52" fill="url(#sil)"/><ellipse cx="100" cy="150" rx="34" ry="46" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="1 4.6" stroke-linecap="round"/><ellipse cx="100" cy="150" rx="29" ry="41" fill="${w.dc}"/><ellipse cx="100" cy="150" rx="29" ry="41" fill="url(#shine)"/>`
 :`<circle cx="100" cy="150" r="46" fill="url(#sil)"/><circle cx="100" cy="150" r="41" fill="none" stroke="#fff" stroke-width="4.5" stroke-dasharray="1 4.6" stroke-linecap="round"/><circle cx="100" cy="150" r="34" fill="${w.dc}"/><circle cx="100" cy="150" r="34" fill="url(#shine)"/>`;
 const dark=w.dc.length&&parseInt(w.dc.slice(1,3),16)<120,hc=dark?"#f4f1ec":"#3a2a38";
 return `<svg class="wimg" viewBox="0 0 200 300" role="img" aria-label="Aevum ${w.id} 925 silver watch"><g>${l}</g>${c}
 <ellipse cx="100" cy="102" rx="11" ry="7" fill="${w.sc}"/><ellipse cx="100" cy="198" rx="11" ry="7" fill="${w.sc}"/>
 <circle cx="${w.sh=="s"?144:w.sh=="o"?144:150}" cy="150" r="5" fill="#27409b"/>
 <text x="100" y="136" font-size="6" letter-spacing="1.4" text-anchor="middle" fill="${hc}" font-family="Michroma,sans-serif">AEVUM</text>
 <path d="M100 150V124M100 150L118 160" stroke="${hc}" stroke-width="2" stroke-linecap="round"/><circle cx="100" cy="150" r="2.5" fill="${hc}"/></svg>`}
const sub=w=>`${w.id} – Quartz watch – 925 sterling silver`;

/* catalogue */
const F={dial:new Set,price:new Set};let S="f";
const band=p=>p<26000?"a":p<=28000?"b":"c";
function render(){
 let a=W.filter(w=>(!F.dial.size||F.dial.has(w.grp))&&(!F.price.size||F.price.has(band(w.price))));
 if(S=="pa")a.sort((x,y)=>x.price-y.price);if(S=="pd")a.sort((x,y)=>y.price-x.price);if(S=="n")a.sort((x,y)=>x.id.localeCompare(y.id));
 $("#count").textContent=a.length+(a.length==1?" watch":" watches");
 $("#grid").innerHTML=a.length?a.map((w,i)=>`<a class="card" style="--i:${i}" href="#product-${w.id.toLowerCase()}"><div class="shot">${art(w)}<span class="go lab">View watch</span></div><h3>Aevum 925 Silver Watch</h3><p>${w.id} · ${w.dial}</p><span class="pr">${inr(w.price)}</span></a>`).join(""):`<div class="empty">No watches match these filters.</div>`}
const SO=[["f","Featured"],["pa","Price: low to high"],["pd","Price: high to low"],["n","Name: A to Z"]],sw=$("#sortw"),tg=o=>{sw.classList.toggle("open",o);$("#sb").setAttribute("aria-expanded",o)};
$("#sm").innerHTML=SO.map((o,i)=>`<li role="option" tabindex="0" data-v="${o[0]}" style="--i:${i}" aria-selected="${o[0]==S}"><b>✦</b>${o[1]}</li>`).join("");
$("#sb").onclick=()=>tg(!sw.classList.contains("open"));
$$("#sm li").forEach(li=>{const go=()=>{S=li.dataset.v;$("#sl").textContent=S=="f"?"Sort by":li.textContent.slice(1);$$("#sm li").forEach(x=>x.setAttribute("aria-selected",x==li));tg(false);render()};li.onclick=go;li.onkeydown=e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();go()}}});
document.addEventListener("click",e=>{if(!sw.contains(e.target))tg(false)});document.addEventListener("keydown",e=>{if(e.key=="Escape")tg(false)});
$("#fb").onclick=e=>{const o=$("#panel").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",o)};
$$(".chips .chip").forEach(b=>b.onclick=()=>{const k=b.parentNode.dataset.k,v=b.dataset.v;F[k].has(v)?F[k].delete(v):F[k].add(v);b.classList.toggle("on");render()});
$("#clr").onclick=()=>{F.dial.clear();F.price.clear();$$(".chips .chip").forEach(b=>b.classList.remove("on"));render()};

/* "View watch" bar: pass the pointer position to the colour spot */
$("#grid").addEventListener("pointermove",e=>{const g=e.target.closest(".go");if(!g)return;const r=g.getBoundingClientRect();g.style.setProperty("--x",e.clientX-r.left+"px");g.style.setProperty("--y",e.clientY-r.top+"px")});

/* product page */
let qty=1,cur=null;
function product(id){
 const w=W.find(x=>x.id.toLowerCase()==id);if(!w){location.hash="home";return}cur=w;qty=1;
 $("#pcr").innerHTML=`<a href="#home">Home</a>–<a href="#watches">Our Watches</a>–<a href="#watches">Aevum 925 Silver</a>–<b>${w.id}</b>`;
 const r=(k,v)=>`<div><b>${k}</b><span>${v}</span></div>`;
 $("#pd").innerHTML=`<div class="pgal"><div class="main">${art(w)}</div></div>
 <div class="pinfo"><h1>Aevum 925 Silver Watch</h1>
 <p class="sub" id="pdesc">Quartz watch, Ø ${w.dia} mm, 925 sterling silver, ${w.id}</p><button class="rm" onclick="document.querySelector('#acc').scrollIntoView({behavior:'smooth'})">Read more</button>
 <div class="price">${inr(w.price)}</div><p class="fine">Maximum retail price (MRP), inclusive of all taxes. Retailers may stock at different prices based on their date of purchase.</p>
 <div class="qty"><span style="font-weight:600">Quantity:</span><div class="step"><button aria-label="Decrease" id="qm">−</button><output id="qv" aria-live="polite">1</output><button aria-label="Increase" id="qp">+</button></div></div>
 <a class="btn dark full" id="fr" href="retailers.html?watch=${w.id}&qty=1">Find a retailer</a>
 <ul class="perks"><li>BIS Hallmarked 925 silver</li><li>12 month warranty</li><li>3 ATM water resistant</li></ul>
 <div id="acc"><details open><summary>Case</summary><div class="specs">${r("Shape",w.sh=="s"?"Square":w.sh=="o"?"Oval":"Round")}${r("Strap / band width",w.strap+" mm")}${r("Material","925 sterling silver, rhodium coating")}${r("Case height",w.h+" mm")}${r("Glass","Toughened mineral glass")}${r("Water resistance","3 ATM")}${r("Case back","Screwed 925 silver case back")}${r("Case diameter","Ø "+w.dia+" mm")}${r("Gross weight",w.gw+" g")}${r("Net weight",w.nw+" g")}</div></details>
 <details><summary>Dial &amp; Hands</summary><div class="specs">${r("Dial",w.dial)}${r("Display","Analog")}</div></details>
 <details><summary>Movement &amp; Functions</summary><div class="specs">${r("Movement","Quartz")}${r("Warranty","12 months on the movement")}</div></details>
 <details><summary>Stones &amp; Finish</summary><div class="specs">${r("Stones","Micro-set 5A cubic zirconia crystals")}${r("Crystal","9K purity crystal")}${r("Finish","Original rhodium coating")}${r("Authenticity","Real sterling silver 925")}</div></details>
 <details><summary>Package Content</summary><div class="specs">${r("Included","1 x Aevum 925 Silver Watch "+w.id)}</div></details>
 <details><summary>Care instructions</summary><div class="specs">${r("The golden rule","Put your watch on last, after perfumes, lotions, hairsprays and makeup have settled on your skin. Chemicals can dull precious metals.")}${r("Storage","When not worn, keep it in a dry, airtight pouch or box away from direct sunlight and humidity to prevent natural silver oxidation.")}${r("Cleaning","Wipe gently with a soft, dry microfibre jewellery cloth. Avoid harsh chemical dips, ultrasonic cleaners and abrasive brushes that could harm the rhodium coating or stone settings.")}${r("Water exposure","3 ATM: safe from accidental splashes or rain. Remove before swimming, bathing or heavy water immersion.")}</div></details>
 <details><summary>Warranty &amp; authenticity</summary><div class="specs">${r("Warranty","12 months on the movement from the date of purchase. Excludes damage from accidents, improper use, negligence or not following AEVUM’s care instructions.")}${r("Certificate of authenticity","Designed with the highest quality zircon stones and AAA+ graded freshwater pearls, crafted in real sterling silver 925.")}${r("Manufactured by","Kesar Watch Designs Pvt. Limited, Bengaluru, Karnataka 560091")}${r("Country of origin","India")}</div></details></div></div>`;
 const up=d=>{qty=Math.max(1,Math.min(10,qty+d));$("#qv").textContent=qty;$("#fr").href=`retailers.html?watch=${w.id}&qty=${qty}`};$("#qm").onclick=()=>up(-1);$("#qp").onclick=()=>up(1);
}

/* routing: plain hash names, never paths */
function route(){
 const h=location.hash.slice(1)||"home";if(h=="contact"||h=="retailers"){location.replace(h+".html");return}const v=h.startsWith("product-")?"prod":"home";
 $$(".view").forEach(x=>x.classList.remove("show"));$("#v-"+v).classList.add("show");
 if(v=="prod")product(h.slice(8));
 if(v=="home"){const t=$("#"+h);t?setTimeout(()=>t.scrollIntoView(),30):0}else window.scrollTo(0,0);
 spy()}
function spy(){const home=$("#v-home").classList.contains("show");let a="";if(home)for(const s of["watches","about"]){if($("#"+s).getBoundingClientRect().top<window.innerHeight*.45)a=s}
 $$("nav a[data-s]").forEach(l=>l.classList.toggle("on",l.dataset.s==a))}
addEventListener("hashchange",route);addEventListener("scroll",spy,{passive:true});
/* hero background: set HERO_BG to a file in this folder, e.g. "assets/video/hero.mp4" or "assets/images/hero.jpg" */
const hb=$("#hbg");
if(/\.(mp4|webm)|^data:video/.test(HERO_BG))hb.innerHTML=`<video src="${HERO_BG}" autoplay muted loop playsinline></video>`;else if(HERO_BG)hb.style.cssText=`background:url(${HERO_BG}) 78% 92%/cover no-repeat;animation:none`;
if(!HERO_BG)for(let i=0;i<18;i++){const t=document.createElement("i");t.className="tw";t.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*4}s;--z:${6+Math.random()*12}px`;hb.appendChild(t)}
/* about: step by step */
/* chapter backgrounds: list image paths, e.g. ["assets/images/about1.jpg", ...] (one per chapter, or just one); empty = drawn silk scenes */
const PAL=[["#f3b9b0","#c795c1"],["#d6a3d1","#5a3358"],["#f6d9c8","#a86a9e"],["#cfa3d8","#6b476a"],["#f0b7c8","#7a4a77"],["#e8c3a8","#4a2c48"]];
let ai=-1;const ab=$("#about");
ab.classList.toggle("has-img",ABOUT_IMGS.length>0);
$("#bgs").innerHTML=AB.map((a,i)=>{const im=ABOUT_IMGS.length?ABOUT_IMGS[i%ABOUT_IMGS.length]:"";return `<div class="bgl" style="${im?`background:url(${im}) right center/cover no-repeat`:`background:radial-gradient(70% 80% at ${20+i*12}% 30%,${PAL[i][0]},transparent 65%),linear-gradient(135deg,${PAL[i][1]},#2b1429)`}">${im?"":`<svg viewBox="0 0 100 120" style="transform:rotate(${i*22-50}deg)"><use href="#star"/></svg>`}</div>`}).join("");
$("#rail").innerHTML=AB.map((a,i)=>`<li><button data-i="${i}"><i>${i+1}</i><span>${a[0]}</span></button></li>`).join("");
function step(i){if(i==ai)return;ai=i;const a=AB[i],n=AB.length;
 $$("#rail button").forEach((b,j)=>{b.classList.toggle("on",j==i);b.classList.toggle("done",j<i);b.setAttribute("aria-current",j==i)});
 $("#fl").style.height=`calc((100% - 40px) * ${i/(n-1)})`;
 $$("#bgs .bgl").forEach((l,j)=>l.className="bgl "+(j<i?"past":j==i?"on":""));
 $("#sp").innerHTML=`<div class="body"><span class="lab num">Chapter ${i+1} of ${n}</span><h3>${a[1]}</h3><p class="t">${a[2]}</p></div>`}
function sc(){const r=ab.getBoundingClientRect(),run=r.height-innerHeight;if(run<=0)return;step(Math.min(AB.length-1,Math.floor(Math.min(.9999,Math.max(0,-r.top/run))*AB.length)))}
function go(i){const r=ab.getBoundingClientRect(),run=r.height-innerHeight;scrollTo({top:scrollY+r.top+(i+.5)/AB.length*run})}
$$("#rail button").forEach(b=>b.onclick=()=>go(+b.dataset.i));
addEventListener("scroll",sc,{passive:true});addEventListener("resize",sc);
addEventListener("keydown",e=>{const r=ab.getBoundingClientRect();if(r.top>0||r.bottom<innerHeight||!$("#v-home").classList.contains("show"))return;if(e.key=="ArrowRight"&&ai<AB.length-1)go(ai+1);if(e.key=="ArrowLeft"&&ai>0)go(ai-1)});
step(0);render();route();sc();

/* gentle reveal-on-scroll for headings and cards */
$$(".val").forEach(v=>v.classList.add("rv"));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
$$(".rv").forEach(x=>io.observe(x));
/* value cards: the glow follows the cursor */
$$(".val").forEach(c=>c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();c.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");c.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%")}));