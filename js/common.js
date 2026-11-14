/* AEVUM | shared helpers */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const inr=n=>"₹"+n.toLocaleString("en-IN")+".00";

/* back to top */
const tt=document.createElement("button");tt.className="totop";tt.setAttribute("aria-label","Back to top");tt.textContent="↑";tt.onclick=()=>scrollTo({top:0});document.body.appendChild(tt);
addEventListener("scroll",()=>tt.classList.toggle("show",scrollY>700),{passive:true});
