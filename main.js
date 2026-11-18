const W3F_KEY='5579317f-4da0-48aa-879b-155a52c38d63'; // optional: paste your Web3Forms key to receive booking requests directly by email (leave as is to open Gmail instead)
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
$$('.y').forEach(e=>e.textContent=new Date().getFullYear());
addEventListener('error',e=>{const t=e.target;if(t&&t.tagName==='IMG'&&t.closest('.thumb'))t.remove()},true);
/* nav */
const mb=$('.menu'),ul=$('.right ul');
mb.onclick=()=>{const o=ul.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
ul.onclick=e=>{if(e.target.closest('a,button')){ul.classList.remove('open');mb.setAttribute('aria-expanded',false)}};
const here=(location.pathname.split('/').pop()||'index').replace('.html','');
$$('.right a.l[data-page]').forEach(a=>{if(a.dataset.page===here)a.setAttribute('aria-current','page')});
/* hero bars */
const bars=$('#bars');
if(bars){const N=innerWidth<600?22:38;
 for(let k=0;k<N;k++){const t=k/(N-1),h=14+t*70+Math.sin(k*1.9)*9+Math.cos(k*.7)*5;
  bars.insertAdjacentHTML('beforeend',`<i style="height:${Math.max(10,Math.min(80,h))}%;animation-delay:${k*35}ms"><b></b></i>`)}
 const bb=$$('b',bars),hero=$('.hero');let mx=null;
 hero.addEventListener('mousemove',e=>mx=e.clientX);
 hero.addEventListener('mouseleave',()=>mx=null);
 if(!reduced){const tick=t=>{const w=innerWidth;
   bb.forEach((b,k)=>{let s=1+.12*Math.sin(t/650-k*.4);
    if(mx!==null){const x=(k+.5)/bb.length*w,d=(mx-x)/(w*.1);s+=.25*Math.exp(-d*d)}
    b.style.transform=`scaleY(${s.toFixed(3)})`});
   requestAnimationFrame(tick)};requestAnimationFrame(tick)}}
/* scroll progress, stacked website cards, tilt frames */
const prog=document.createElement('div');prog.className='prog';document.body.appendChild(prog);
const shows=$$('.show');let tk=false;
const onScroll=()=>{tk=false;const h=document.documentElement.scrollHeight-innerHeight;prog.style.width=(h>0?scrollY/h*100:0)+'%';
 shows.forEach((s,i)=>{const r=s.getBoundingClientRect(),fr=$('.frame',s),inn=$('.show-in',s),n=shows[i+1];
  fr.style.setProperty('--t',reduced?0:clamp((r.top-innerHeight*.28)/(innerHeight*.55),0,1).toFixed(3));
  if(n&&innerWidth>900&&!reduced){const p=clamp((innerHeight*.85-n.getBoundingClientRect().top)/(innerHeight*.5),0,1);inn.style.setProperty('--s',(1-.05*p).toFixed(3));inn.style.setProperty('--b',(1-.4*p).toFixed(3))}})};
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(onScroll)}},{passive:true});addEventListener('resize',onScroll);onScroll();
/* 3D tilt on cards */
if(matchMedia('(hover:hover)').matches&&!reduced)$$('.card.work,.tiles .card,.svc2 .card,.door').forEach(c=>{c.classList.add('tilt');
 c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty('--ry',(x*8).toFixed(2)+'deg');c.style.setProperty('--rx',(-y*8).toFixed(2)+'deg')});
 c.addEventListener('mouseleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})});
/* card glow */
$$('.grid,.team').forEach(g=>g.addEventListener('mousemove',e=>{const c=e.target.closest('.card');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}));
/* portfolio filter */
$$('.tabs button').forEach(b=>b.onclick=()=>{$$('.tabs button').forEach(x=>x.classList.toggle('on',x===b));
 $$('.pg').forEach(g=>g.hidden=!(b.dataset.f==='all'||g.dataset.c===b.dataset.f))});
/* lightbox + gallery (portfolio page) */
const lb=$('#lb');
if(lb){
 const lc=$('#lbc'),lt=$('#lbt'),pv=$('.pv',lb),nx=$('.nx',lb);let list=[],idx=0;
 const render=()=>{const it=list[idx];lc.innerHTML=it.v?`<video src="${it.src}" controls autoplay playsinline></video>`:`<img src="${it.src}" alt="${it.cap||''}">`;lt.textContent=it.cap||'';pv.hidden=nx.hidden=list.length<2};
 const open=(l,i)=>{list=l;idx=i;render();if(!lb.open)lb.showModal()};
 const step=d=>{idx=(idx+d+list.length)%list.length;render()};
 pv.onclick=()=>step(-1);nx.onclick=()=>step(1);
 lb.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
 lb.addEventListener('close',()=>lc.innerHTML='');
 lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});
 $('[data-close]',lb).onclick=()=>lb.close();
 const web=$$('.zoom').map(b=>({src:b.dataset.img,cap:b.dataset.cap}));
 $$('.zoom').forEach((b,i)=>b.onclick=()=>open(web,i));
 const vg=$('#vgrid'),cg=$('#cgrid');
 if(vg&&typeof VIDEOS!=='undefined'&&VIDEOS.length){
  $('#vempty')?.remove();
  vg.innerHTML=VIDEOS.map((v,i)=>`<button class="vc" data-i="${i}" aria-label="Play ${v.title}"><video src="${v.src}#t=0.6" preload="metadata" muted loop playsinline></video>${v.ai===false?'':'<small class="aib">AI Generated</small>'}<span class="pl">▶</span><b>${v.title}</b></button>`).join('');
  const vl=VIDEOS.map(v=>({v:1,src:v.src,cap:v.title}));
  $$('.vc',vg).forEach((b,i)=>{const v=$('video',b);
   b.onmouseenter=()=>v.play().catch(()=>{});b.onmouseleave=()=>{v.pause();v.currentTime=.6};
   b.onclick=()=>open(vl,i)});
  const rw=vg.parentNode;$('.rp',rw).onclick=()=>vg.scrollBy({left:-vg.clientWidth*.8,behavior:'smooth'});$('.rn',rw).onclick=()=>vg.scrollBy({left:vg.clientWidth*.8,behavior:'smooth'})}
 else $('.rb',document)&&$$('.rb').forEach(b=>b.remove());
 if(cg&&typeof CREATIVES!=='undefined'&&CREATIVES.length){
  $('#cempty')?.remove();
  const chips=$('#cchips'),cats=[...new Set(CREATIVES.map(c=>c.cat).filter(Boolean))];let cur=CREATIVES;
  const draw=cat=>{cur=CREATIVES.filter(c=>cat==='All'||c.cat===cat);
   cg.innerHTML=cur.map((c,i)=>`<button class="cc" data-i="${i}"><img src="${c.src}" alt="${c.title||'Creative work'}" loading="lazy">${c.title?`<span>${c.title}</span>`:''}</button>`).join('')};
  draw('All');
  if(cats.length>1){chips.innerHTML=['All',...cats].map((c,i)=>`<button class="${i?'':'on'}" data-c="${c}">${c}</button>`).join('');
   chips.onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('button',chips).forEach(x=>x.classList.toggle('on',x===b));draw(b.dataset.c)}}
  cg.onclick=e=>{const b=e.target.closest('.cc');if(!b)return;open(cur.map(c=>({src:c.src,cap:c.title})),+b.dataset.i)}}}
/* portfolio counters built from real data */
const ps=$('#pstats');
if(ps){const items=[[$$('.show').length,'Websites'],[typeof VIDEOS!=='undefined'?VIDEOS.length:0,'Videos'],[typeof CREATIVES!=='undefined'?CREATIVES.length:0,'Creative Designs']].filter(x=>x[0]>0);
 ps.innerHTML=items.map(([n,l])=>`<div><b data-count="${n}">${n}</b><span>${l}</span></div>`).join('')}
/* count-up numbers */
if('IntersectionObserver' in window){
 const run=b=>{const n=+b.dataset.count;if(reduced){b.textContent=n;return}let t0;const f=t=>{t0??=t;const p=Math.min(1,(t-t0)/1200);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
 const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){run(e.target);co.unobserve(e.target)}}));
 $$('[data-count]').forEach(b=>{b.textContent='0';co.observe(b)});
 /* scroll reveal (only for things below the first screen) */
 if(!reduced){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  $$('main section h2,main .dia,main .lead,main .abt,main .card,main .stats>div,main .why>div,main .tabs,main .cta,main .lnk,main .empty,main .chips,main .marq').forEach(el=>{
   if(el.closest('.hero')||el.getBoundingClientRect().top<innerHeight*.9)return;
   el.classList.add('rv');el.style.setProperty('--d',Math.min([...el.parentNode.children].indexOf(el)%4,3)*90+'ms');io.observe(el)})}}
/* background network and gold cursor */
(()=>{const c=document.createElement('canvas');c.id='net';c.setAttribute('aria-hidden','true');document.body.prepend(c);
 const x=c.getContext('2d'),dpr=Math.min(devicePixelRatio||1,2),N=[],m={x:-999,y:-999};let W=0,H=0,run=false;
 const size=()=>{W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
  const n=Math.max(26,Math.min(Math.round(W*H/17000),64));
  while(N.length<n)N.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.32,vy:(Math.random()-.5)*.32,r:Math.random()*1.4+.7});N.length=n};
 const draw=()=>{x.clearRect(0,0,W,H);
  for(let i=0;i<N.length;i++){const a=N[i];if(!reduced){a.x+=a.vx;a.y+=a.vy}
   if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
   const dx=a.x-m.x,dy=a.y-m.y,d=dx*dx+dy*dy;if(d<9000){a.x+=dx*.012;a.y+=dy*.012}
   x.beginPath();x.arc(a.x,a.y,a.r,0,6.283);x.fillStyle='rgba(217,176,90,.62)';x.fill();
   for(let j=i+1;j<N.length;j++){const b=N[j],ex=a.x-b.x,ey=a.y-b.y,q=ex*ex+ey*ey;
    if(q<17000){x.strokeStyle=`rgba(217,176,90,${.18*(1-q/17000)})`;x.lineWidth=1;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
   if(d<30000){x.strokeStyle=`rgba(217,176,90,${.45*(1-d/30000)})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(m.x,m.y);x.stroke()}}
  if(!document.hidden&&!reduced)requestAnimationFrame(draw);else run=false};
 const go=()=>{if(!run){run=true;requestAnimationFrame(draw)}};
 size();go();addEventListener('resize',size);
 addEventListener('pointermove',e=>{m.x=e.clientX;m.y=e.clientY});
 document.documentElement.addEventListener('mouseleave',()=>m.x=m.y=-999);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)go()})})();
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduced){
 const cu=document.createElement('div');cu.className='cur';document.body.append(cu);document.body.classList.add('has-cur');
 let cx=0,cy=0,tx=0,ty=0;
 addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;cu.style.opacity=1});
 document.documentElement.addEventListener('mouseleave',()=>cu.style.opacity=0);
 const mv=()=>{cx+=(tx-cx)*.3;cy+=(ty-cy)*.3;cu.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(mv)};mv();
 document.addEventListener('pointerover',e=>cu.classList.toggle('link',!!(e.target.closest&&e.target.closest('a,button,input,select,textarea,label'))))}

/* whatsapp magnet, process timeline, client feedback */
(()=>{const wa=$('.wafab');
 if(wa&&matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduced){const R=140;
  let x=0,y=0,s=1,vx=0,vy=0,vs=0,tx=0,ty=0,ts=1,on=false;
  const frame=()=>{const k=.14,d=.78;vx=(vx+(tx-x)*k)*d;vy=(vy+(ty-y)*k)*d;vs=(vs+(ts-s)*k)*d;x+=vx;y+=vy;s+=vs;
   wa.style.setProperty('--mx',x.toFixed(2)+'px');wa.style.setProperty('--my',y.toFixed(2)+'px');wa.style.setProperty('--ms',s.toFixed(3));
   if(Math.abs(tx-x)+Math.abs(ty-y)+Math.abs(ts-s)+Math.abs(vx)+Math.abs(vy)>.01)requestAnimationFrame(frame);else on=false};
  const kick=()=>{if(!on){on=true;requestAnimationFrame(frame)}};
  wa.style.transition='none';
  addEventListener('pointermove',e=>{const r=wa.getBoundingClientRect(),cx=r.left+r.width/2-x,cy=r.top+r.height/2-y,dx=e.clientX-cx,dy=e.clientY-cy;
   if(Math.hypot(dx,dy)<R){tx=dx*.5;ty=dy*.5;ts=1.14}else{tx=0;ty=0;ts=1}kick()})}
 const tl=$('.tl');
 if(tl){const st=$$('.st8',tl),upd=()=>{const r=tl.getBoundingClientRect(),p=clamp((innerHeight*.75-r.top)/(r.height+innerHeight*.1),0,1);
   tl.style.setProperty('--p',reduced?1:p.toFixed(3));st.forEach((s,i)=>s.classList.toggle('on',reduced||p>=(i+.3)/st.length))};
  addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd()}
 /* CLIENT FEEDBACK: edit, add or remove reviews here (n = name, s = stars out of 5, t = text) */
 const REVIEWS=[
  {n:'Ibrahim Butt',s:5,t:'Built a fast, modern website with solid SEO that noticeably boosted our search rankings and organic traffic.'},
  {n:'Numaan Meer',s:5,t:'Top-notch product photography and video production that instantly elevated our brand\u2019s ad performance.'},
  {n:'Junaid Safdar',s:5,t:'Smart digital marketing strategies and ad campaigns that delivered consistent leads and strong ROI.'},
  {n:'Ali Khan',s:4.8,t:'Clean, creative graphic design that captured our brand identity right on the first go.'},
  {n:'Ahmad Niazi',s:5,t:'Engaging content creation and seamless digital management that genuinely grew our online presence.'}];
 const stage=$('#stage'),dots=$('#dots');
 if(stage&&dots){const cards=[],dEls=[];let cur=0,timer=null;const SPEED=5000;
  const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
  REVIEWS.forEach((v,i)=>{const c=el('div','rcard');c.appendChild(el('div','rq','\u201C'));
   const st=el('div','rst'),sw=el('span','rstars'),fi=el('i',null,'\u2605\u2605\u2605\u2605\u2605');sw.style.setProperty('--p',(v.s/5*100)+'%');sw.appendChild(fi);st.appendChild(sw);st.appendChild(el('b','rnum',Number(v.s).toFixed(1)));
   c.appendChild(st);c.appendChild(el('p',null,v.t));
   const w=el('div','rwho');w.appendChild(el('div','rav',v.n.split(' ').filter((q,j,a)=>j===0||j===a.length-1).map(q=>q[0]).join('').toUpperCase()));
   const nm=el('div');nm.appendChild(el('b',null,v.n));nm.appendChild(el('small',null,'Client'));w.appendChild(nm);c.appendChild(w);stage.appendChild(c);cards.push(c);
   const d=el('button');d.type='button';d.setAttribute('aria-label','Show review '+(i+1));d.onclick=()=>{show(i);restart()};dots.appendChild(d);dEls.push(d)});
  const show=i=>{cur=i;const n=cards.length;cards.forEach((c,k)=>{const d=(k-i+n)%n;c.className='rcard'+(d===0?' p0':d===1?' pp1':d===n-1?' pm1':'')});dEls.forEach((d,k)=>d.className=k===i?'on':'')};
  const restart=()=>{clearInterval(timer);if(!reduced)timer=setInterval(()=>show((cur+1)%cards.length),SPEED)};
  show(0);restart();$('#prv').onclick=()=>{show((cur-1+cards.length)%cards.length);restart()};$('#nxt').onclick=()=>{show((cur+1)%cards.length);restart()};
  const cr=$('#car');cr.addEventListener('pointerenter',()=>clearInterval(timer));cr.addEventListener('pointerleave',restart)}})();

/* meeting booking box, built here so every page gets the same one */
(()=>{
 /* ---- EDIT HERE ---- */
 const SLOTS=['10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM']; // times a client can pick (Pakistan time)
 const CLOSED_DAYS=[0];      // days that cannot be booked: 0 = Sunday, 1 = Monday ... 6 = Saturday ([] = open every day)
 const MIN_AHEAD=1,MONTHS_AHEAD=12; // earliest = tomorrow, latest = last day of the month 12 months from now (moves forward by itself)
 const SERVICES=['Website Development','SEO','Graphic Designing','Digital Marketing','Meta / Google Ads','Product Shoots','Video Production','More than one service'];
 const BUDGETS=['Not sure yet','Rs. 50,000 – 100,000','Rs. 100,000 – 250,000','Rs. 250,000 – 500,000','Rs. 500,000 – 1,000,000 (10 lakh)'];
 const MODES=['Phone or WhatsApp call','Video call (Google Meet)','Visit our office in Lahore'];
 const WA_NUM='923155553257',MAIL_TO='Puridigitalservices@gmail.com';
 /* ------------------- */
 const W3F_ON=W3F_KEY&&W3F_KEY!=='YOUR_WEB3FORMS_ACCESS_KEY';
 const opt=a=>a.map(x=>`<option>${x}</option>`).join('');
 const dlg=document.createElement('dialog');dlg.id='dlg';dlg.className='bk';dlg.setAttribute('aria-labelledby','bkt');
 dlg.innerHTML=`<div class="bkw"><aside class="bka"><img src="assets/logo-full.png" alt=""><h3>Let’s plan your project</h3><ol><li><b>1</b><span>Pick a day and time</span></li><li><b>2</b><span>Share a few details</span></li><li><b>3</b><span>We confirm your meeting</span></li></ol></aside>
<div class="bkm"><button class="x" type="button" data-bk-close aria-label="Close">✕</button>
<div class="bkh"><h3 id="bkt">Book a meeting</h3><div class="bkp"><span class="on" data-p="1">1. Day and time</span><span data-p="2">2. Your details</span></div></div>
<div class="bkb">
<section data-s="1"><div class="cal"><div class="calh"><button type="button" id="cprev" aria-label="Previous month">‹</button><b id="ctitle"></b><button type="button" id="cnext" aria-label="Next month">›</button></div><div class="calw"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div><div class="cald" id="cdays"></div></div>
<p class="calnote" id="calnote"></p><p class="bkl">Time <small>(Pakistan time)</small></p><div class="slots" id="cslots"></div></section>
<section data-s="2" hidden><div class="sum"><span id="bksum"></span><button type="button" id="bkchg">Change</button></div>
<div class="bkfields"><div class="row"><label>Full name<input id="bn" autocomplete="name" placeholder="Your name"></label><label>WhatsApp or phone<input id="bp" autocomplete="tel" inputmode="tel" placeholder="0300 0000000"></label></div>
<div class="row"><label>Email<input id="be" type="email" autocomplete="email" placeholder="you@company.com (optional)"></label><label>Service needed<select id="bs">${opt(SERVICES)}</select></label></div>
<div class="row"><label>Budget (PKR)<select id="bbud">${opt(BUDGETS)}</select></label><label>How would you like to meet?<select id="bm">${opt(MODES)}</select></label></div>
<label>About your project<textarea id="bnote" placeholder="Tell us briefly what you need (optional)"></textarea></label></div><p class="err" id="bkerr" role="alert"></p></section>
<section data-s="3" hidden class="bkdone"><div class="tick">✓</div><h3 id="dtitle"></h3><p class="lead" id="dtext"></p></section>
</div>
<div class="bkf"><div data-f="1"><button class="btn" type="button" id="bknext" disabled>Continue</button></div>
<div data-f="2" hidden><button class="btn o" type="button" id="bkback">Back</button><span class="bkgo"><button class="btn o" type="button" id="bkmail"><svg class="i" aria-hidden="true"><use href="#mail"/></svg>Send by email</button><button class="btn" type="button" id="bkwa"><svg class="i b" aria-hidden="true"><use href="#wa"/></svg>Send on WhatsApp</button></span></div>
<div data-f="3" hidden><button class="btn" type="button" data-bk-close>Close</button></div></div>
</div></div>`;
 document.body.appendChild(dlg);
 const $d=s=>dlg.querySelector(s),$$d=s=>[...dlg.querySelectorAll(s)];
 const day0=d=>{d=new Date(d);d.setHours(0,0,0,0);return d};
 const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
 const today=day0(new Date()),minD=addDays(today,MIN_AHEAD),maxD=new Date(today.getFullYear(),today.getMonth()+MONTHS_AHEAD+1,0);
 const fmt=d=>d.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 let view=new Date(minD.getFullYear(),minD.getMonth(),1),sel={date:null,time:null},step=1;
 const same=(a,b)=>a&&b&&a.getTime()===b.getTime();
 const ok=d=>d>=minD&&d<=maxD&&!CLOSED_DAYS.includes(d.getDay());
 /* calendar */
 const drawCal=()=>{$d('#ctitle').textContent=view.toLocaleDateString('en-GB',{month:'long',year:'numeric'});
  const first=new Date(view.getFullYear(),view.getMonth(),1),n=new Date(view.getFullYear(),view.getMonth()+1,0).getDate(),off=(first.getDay()+6)%7,g=$d('#cdays');g.innerHTML='';
  for(let i=0;i<off;i++)g.appendChild(document.createElement('i'));
  for(let k=1;k<=n;k++){const d=new Date(view.getFullYear(),view.getMonth(),k),b=document.createElement('button');b.type='button';b.textContent=k;b.disabled=!ok(d);
   if(same(d,today))b.classList.add('today');if(same(d,sel.date)){b.classList.add('sel');b.setAttribute('aria-pressed','true')}
   b.onclick=()=>{sel.date=d;drawCal();upd()};g.appendChild(b)}
  $d('#cprev').disabled=view<=new Date(minD.getFullYear(),minD.getMonth(),1);$d('#cnext').disabled=view>=new Date(maxD.getFullYear(),maxD.getMonth(),1)};
 $d('#cprev').onclick=()=>{view=new Date(view.getFullYear(),view.getMonth()-1,1);drawCal()};
 $d('#cnext').onclick=()=>{view=new Date(view.getFullYear(),view.getMonth()+1,1);drawCal()};
 const sl=$d('#cslots');SLOTS.forEach(t=>{const b=document.createElement('button');b.type='button';b.textContent=t;b.onclick=()=>{sel.time=t;upd()};sl.appendChild(b)});
 const upd=()=>{$$d('#cslots button').forEach(b=>b.classList.toggle('on',b.textContent===sel.time));$d('#bknext').disabled=!(sel.date&&sel.time)};
 /* steps */
 const go=n=>{step=n;$$d('[data-s]').forEach(s=>s.hidden=+s.dataset.s!==n);$$d('[data-f]').forEach(s=>s.hidden=+s.dataset.f!==n);
  $$d('.bkp span').forEach(s=>s.classList.toggle('on',+s.dataset.p===n));$d('.bkp').hidden=n===3;
  if(n===2)$d('#bksum').textContent=fmt(sel.date)+' at '+sel.time;$d('.bkb').scrollTop=0;
  if(n===2)setTimeout(()=>$d('#bn').focus({preventScroll:true}),50)};
 $d('#bknext').onclick=()=>go(2);$d('#bkchg').onclick=()=>go(1);$d('#bkback').onclick=()=>go(1);
 /* message builders */
 const info=()=>{const v=id=>$d(id).value.trim();return{name:v('#bn'),phone:v('#bp'),email:v('#be'),service:v('#bs'),budget:v('#bbud'),mode:v('#bm'),note:v('#bnote'),date:fmt(sel.date),time:sel.time}};
 const emailBody=i=>{const L=['Dear Puri Digital Services Team,','','I would like to book a meeting to discuss my project.','','MEETING DETAILS','Date: '+i.date,'Time: '+i.time+' (Pakistan time)','Meeting type: '+i.mode,'','MY DETAILS','Name: '+i.name,'Phone / WhatsApp: '+i.phone];
  if(i.email)L.push('Email: '+i.email);L.push('Service needed: '+i.service,'Estimated budget: '+i.budget);
  if(i.note)L.push('','ABOUT MY PROJECT',i.note);
  L.push('','Please confirm whether this time suits you.','','Kind regards,',i.name);return L.join('\n')};
 const waBody=i=>['Hello Puri Digital Services,','','I would like to book a meeting to discuss my project.','','Date: '+i.date,'Time: '+i.time+' (Pakistan time)','Meeting type: '+i.mode,'','Name: '+i.name,'Phone: '+i.phone,'Service: '+i.service,'Budget: '+i.budget,i.note&&'About my project: '+i.note,'','Kindly confirm if this time suits you. Thank you.'].filter(x=>x!==false&&x!==undefined).join('\n');
 const valid=()=>{const i=info(),er=$d('#bkerr');er.textContent='';
  if(!i.name){er.textContent='Please enter your name.';$d('#bn').focus();return null}
  if(i.phone.replace(/\D/g,'').length<9){er.textContent='Please enter a valid WhatsApp or phone number.';$d('#bp').focus();return null}
  if(i.email&&!/^\S+@\S+\.\S+$/.test(i.email)){er.textContent='Please check your email address.';$d('#be').focus();return null}
  return i};
 const done=(t,x)=>{$d('#dtitle').textContent=t;$d('#dtext').textContent=x;go(3);sel={date:null,time:null};upd();drawCal();['#bn','#bp','#be','#bnote'].forEach(s=>$d(s).value='')};
 $d('#bkwa').onclick=()=>{const i=valid();if(!i)return;window.open('https://wa.me/'+WA_NUM+'?text='+encodeURIComponent(waBody(i)),'_blank','noopener');
  done('Almost done','WhatsApp opened with your message. Please press Send there, and we will confirm '+i.date+' at '+i.time+' shortly.')};
 $d('#bkmail').onclick=async()=>{const i=valid();if(!i)return;const subj='Meeting Request – '+i.name+' – '+i.date+', '+i.time,body=emailBody(i),b=$d('#bkmail');
  if(W3F_ON){b.disabled=true;try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:W3F_KEY,subject:subj,from_name:'Puri Digital Services Website',name:i.name,email:i.email||'no-email@provided.local',phone:i.phone,message:body})});
    const j=await r.json();if(!j.success)throw 0;done('Request received','Thank you, '+i.name+'. We will confirm '+i.date+' at '+i.time+' by WhatsApp or email.')}
   catch(_){$d('#bkerr').textContent='Could not send. Please try WhatsApp instead.'}b.disabled=false;return}
  const mob=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent),q='&su='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  if(mob)location.href='mailto:'+MAIL_TO+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  else window.open('https://mail.google.com/mail/?view=cm&fs=1&to='+MAIL_TO+q,'_blank','noopener');
  done('Almost done','Your email is ready in the window that opened. Please press Send there, and we will confirm '+i.date+' at '+i.time+' shortly.')};
 /* open / close */
 const open=()=>{if(step===3)go(1);if(!dlg.open)dlg.showModal()};
 document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('[data-open]');if(a){e.preventDefault();open()}});
 $$d('[data-bk-close]').forEach(b=>b.onclick=()=>dlg.close());
 dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
 const DAYNAMES=['Sundays','Mondays','Tuesdays','Wednesdays','Thursdays','Fridays','Saturdays'];
 $d('#calnote').textContent=CLOSED_DAYS.length?'Greyed out days are not available ('+CLOSED_DAYS.map(d=>DAYNAMES[d]).join(', ')+' are closed).':'';
 drawCal();upd();go(1);if(location.hash==='#book')open();
})();

/* call button: phones open the dialer, computers show the number (there is no dialer on a laptop) */
(()=>{if(matchMedia('(pointer:coarse)').matches||/Android|iPhone|iPad|iPod/i.test(navigator.userAgent))return;
 const links=$$('a[href^="tel:"]');if(!links.length)return;
 const box=document.createElement('div');box.className='toast';box.setAttribute('role','status');document.body.appendChild(box);let t;
 links.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();
  const n=a.getAttribute('href').slice(4),shown=n.replace(/^(\+92)(\d{3})(\d+)$/,'$1 $2 $3');
  const show=txt=>{box.textContent=txt;box.classList.add('on');clearTimeout(t);t=setTimeout(()=>box.classList.remove('on'),5000)};
  show('Call us on '+shown);
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(shown).then(()=>show('Call us on '+shown+' (number copied)'),()=>{})}))})();
