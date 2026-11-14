/* AEVUM | retailers page: map, list and search. Content lives in js/retailers-data.js */
/* watch being enquired about, passed from a product page as ?watch=AEWT-02&qty=1 */
const sp=new URLSearchParams(location.search),cur=/^AEWT-\d{2}$/i.test(sp.get("watch")||"")?sp.get("watch").toUpperCase():null,qty=Math.min(10,Math.max(1,parseInt(sp.get("qty"))||1));
const P=(x,y)=>[(x-68)*11.68+33,(37.3-y)*12.6+8];
const outline=IN.split("|").map(r=>"M"+r.split(" ").map(p=>P(...p.split(",").map(Number)).map(n=>n.toFixed(1)).join(",")).join("L")+"Z").join("");
function retail(){
 $("#rcr").innerHTML=`<a href="index.html">Home</a>–${cur?`<a href="index.html#product-${cur.toLowerCase()}">${cur}</a>–`:""}<b>Find a retailer</b>`;
 $("#enq").innerHTML=cur?`<span class="enq">Enquiring: ${cur} × ${qty}</span>`:"";
 /* nearby retailers (e.g. two in Bengaluru) share one pin so they do not sit on top of each other */
 const cl=[];R.forEach((r,i)=>{const c=cl.find(c=>Math.abs(R[c.i[0]][2]-r[2])<.4&&Math.abs(R[c.i[0]][3]-r[3])<.4);c?c.i.push(i):cl.push({i:[i]})});
 $("#mapsvg").innerHTML=`<path d="${outline}" fill="#f6f2de" stroke="#c99ec3" stroke-width="1.5" stroke-linejoin="round"/>`+cl.map(c=>{const r=R[c.i[0]],[x,y]=P(r[2],r[3]),n=[...new Set(c.i.map(k=>R[k][0]))].join(" · ");return `<g class="pin" data-i="${c.i.join(",")}" tabindex="0" role="button" aria-label="Aevum ${n}"><circle class="pulse" cx="${x}" cy="${y}" r="9" fill="#7a4a77"/><circle class="d" cx="${x}" cy="${y}" r="7" fill="#4a2c48" stroke="#f6f2de" stroke-width="2"/><text x="${x+14}" y="${y+4}">${n}</text></g>`}).join("");
 $$(".pin").forEach(p=>{const go=()=>pick(p.dataset.i.split(",").map(Number));p.onclick=go;p.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}}});list("")}
function list(q){
 const a=R.map((r,i)=>[r,i]).filter(([r])=>("aevum "+r[0]+" "+r[1]).toLowerCase().includes(q.trim().toLowerCase()));$("#rn").textContent=a.length;
 $("#rl").innerHTML=a.length?a.map(([r,i])=>`<div class="st" data-i="${i}"><div class="ic"><svg class="i" style="width:22px" viewBox="0 0 24 24"><path d="M12 3l2.5 6h-5zM6 12h12l2 6-8-3-8 3z" fill="currentColor" stroke="none"/></svg></div><div><h3>Aevum ${r[0]}</h3><p>${r[1]}</p><a class="btn dark mapbtn" href="${r[4]}" target="_blank" rel="noopener noreferrer" aria-label="View Aevum ${r[0]} on Google Maps"><svg class="i" style="width:15px" viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>View on map</a></div></div>`).join(""):`<p style="color:var(--soft)">No retailers found. Try another city.</p>`;
 $$(".st").forEach(s=>s.onclick=()=>pick([+s.dataset.i]))}
function pick(ids){$$(".st,.pin").forEach(e=>e.classList.toggle("on",e.dataset.i.split(",").some(n=>ids.includes(+n))));const s=$(`.st[data-i="${ids[0]}"]`);s&&s.scrollIntoView({block:"nearest",behavior:"smooth"})}
$("#rs").oninput=e=>list(e.target.value);

retail();
