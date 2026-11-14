/* AEVUM | contact page: topic chips, 10-digit phone, send via send-mail.php, thank-you popup */
const cf=$("#cf"),ok=$("#ok"),pop=$("#thanks"),popOk=$("#thanks-ok"),send=cf.querySelector("[type=submit]"),ph=cf.elements.phone,topic=cf.elements.topic;

/* topic chips feed the hidden "topic" field */
const chips=$$("#topics .chip"),pick=b=>{chips.forEach(x=>x.classList.toggle("on",x==b));topic.value=b.textContent};
chips.forEach(b=>b.onclick=()=>pick(b));

/* phone: digits only, max 10 (a pasted +91 / 0 prefix is dropped) */
const digits=s=>{let d=s.replace(/\D/g,"");if(d.length>10)d=d.replace(/^(91|0)/,"");return d.slice(0,10)};
ph.addEventListener("input",()=>{const d=digits(ph.value);if(ph.value!==d)ph.value=d});
ph.addEventListener("paste",e=>{e.preventDefault();ph.value=digits((e.clipboardData||window.clipboardData).getData("text"))});

/* thank-you popup */
let back=null;
const openPop=()=>{back=document.activeElement;pop.hidden=false;document.body.classList.add("mopen");popOk.focus()};
const closePop=()=>{pop.hidden=true;document.body.classList.remove("mopen");if(location.search)history.replaceState(null,"",location.pathname);if(back&&back.focus)back.focus()};
popOk.onclick=closePop;
addEventListener("keydown",e=>{if(pop.hidden)return;if(e.key=="Escape")closePop();if(e.key=="Tab"){e.preventDefault();popOk.focus()}});
if(/[?&]sent=1/.test(location.search))openPop()   /* arrived back here after a plain form post */

/* send in the background, then show the popup */
cf.onsubmit=async e=>{
 e.preventDefault();ok.textContent="";send.disabled=true;
 try{
  const r=await fetch(cf.action,{method:"POST",body:new FormData(cf),headers:{"X-Requested-With":"fetch",Accept:"application/json"}});
  const raw=await r.text();let j={};try{j=JSON.parse(raw)}catch(_){}
  if(r.ok&&j.ok){cf.reset();pick(chips[0]);openPop()}
  else{
   /* no JSON back = send-mail.php did not run (not uploaded, or this server has no PHP) */
   if(!("ok" in j))console.error("AEVUM contact form: send-mail.php did not run. HTTP "+r.status+" from "+r.url+"\n"+raw.slice(0,300));
   ok.textContent=j.error||"Sorry, we could not send your message (server replied "+r.status+": send-mail.php is not running here, it needs a PHP server). Please write to designs@kesardesigns.com."}
 }catch(_){ok.textContent="Could not reach the server. Please check your connection and try again."}
 send.disabled=false};
