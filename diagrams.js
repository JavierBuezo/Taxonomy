// Atlas vectorial original: geometría y texturas celulares, sin imágenes generadas.
const P=(d,fill='none',stroke='#55684e',w=1.4,extra='')=>`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" ${extra}/>`;
const E=(x,y,rx,ry,fill,stroke='#7e8969',w=1.2,extra='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" ${extra}/>`;
const C=(x,y,r,fill,stroke='none',w=1)=>E(x,y,r,r,fill,stroke,w);
const R=(x,y,w,h,fill,stroke='#7e8969',rx=3)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`;
const G=(s,attrs='')=>`<g ${attrs}>${s}</g>`;
const pt=(cx,cy,r,a)=>[cx+r*Math.cos(a),cy+r*Math.sin(a)];
function chloroplast(x,y,angle=0,size=1){return G(`${E(0,0,3.2,5.2,'#4e8550','#3d7044',.6)}${P('M -1 -3 L 1 -3 M -1 0 L 1 0 M -1 3 L 1 3','none','#abc779',.65)}`,`transform="translate(${x} ${y}) rotate(${angle}) scale(${size})"`);}
function vessel(x,y,r){return C(x,y,r,'#cf927e','#a76e60',1.5)+C(x,y,r*.69,'#fff3db','#bf8d78',1)+P(`M ${x-r*.35} ${y-r*.15} Q ${x-r*.15} ${y-r*.55} ${x+r*.2} ${y-r*.4}`,'none','#fff9ed',1.5);}
// Shared-vertex hexagons form a contiguous cellular mesh; clipping defines tissue domains.
function tissue(cx,cy,r,size,fill,wall,clip){let s='';for(let col=-Math.ceil(r/size);col<=Math.ceil(r/size);col++)for(let row=-Math.ceil(r/size);row<=Math.ceil(r/size);row++){let x=cx+col*1.5*size,y=cy+(row+(Math.abs(col)%2)/2)*Math.sqrt(3)*size;if(Math.hypot(x-cx,y-cy)>r+size)continue;let points=Array.from({length:6},(_,k)=>{let a=k*Math.PI/3,px=x+size*Math.cos(a),py=y+size*Math.sin(a);return [px+Math.sin(py*.13+px*.04)*1.2,py+Math.sin(px*.11)*1.2].join(',')}).join(' ');s+=`<polygon points="${points}" fill="${fill}" stroke="${wall}" stroke-width="1.1"/>`;if((col+row)%4===0)s+=C(x+3,y+1,1.8,wall,'none');}return G(s,`clip-path="url(#${clip})"`);}
function ringCells(cx,cy,inner,outer,n,fill,wall,bands=false){let s='';for(let i=0;i<n;i++){let a=i*2*Math.PI/n,b=(i+1)*2*Math.PI/n,p=pt(cx,cy,inner,a),q=pt(cx,cy,outer,a),u=pt(cx,cy,outer,b),v=pt(cx,cy,inner,b);s+=P(`M ${p} L ${q} A ${outer} ${outer} 0 0 1 ${u} L ${v} A ${inner} ${inner} 0 0 0 ${p} Z`,fill,wall,1.1);if(bands){let l=pt(cx,cy,inner+3,a),h=pt(cx,cy,outer-3,a);s+=P(`M ${l} L ${h}`,'none','#895032',3)}}return s;}
const defs=`
<linearGradient id="leaf-green" x1="0" y1="0" x2="1" y2=".7"><stop stop-color="#c2d18a"/><stop offset=".5" stop-color="#86a260"/><stop offset="1" stop-color="#527b48"/></linearGradient>
<linearGradient id="stem-green"><stop stop-color="#496d42"/><stop offset=".45" stop-color="#aec17a"/><stop offset="1" stop-color="#547c45"/></linearGradient>
<linearGradient id="petal-rose" x1="0" y1="0" x2="1" y2=".3"><stop stop-color="#f8e3da"/><stop offset=".5" stop-color="#e4b3b2"/><stop offset="1" stop-color="#c78791"/></linearGradient>
<linearGradient id="petal-back"><stop stop-color="#f7e7d8"/><stop offset="1" stop-color="#e6c3bc"/></linearGradient>
<linearGradient id="root-brown"><stop stop-color="#d6bc86"/><stop offset=".5" stop-color="#ac8659"/><stop offset="1" stop-color="#e4cca1"/></linearGradient>
<linearGradient id="palisade"><stop stop-color="#e0e9b7"/><stop offset="1" stop-color="#a3bf79"/></linearGradient>
<pattern id="wall-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M 0 0 L 0 5" stroke="#cf9b8b" stroke-width="1"/></pattern>`;
function blade(d,vein){return P(d,'url(#leaf-green)','#4d7046',1.6)+P(vein,'none','#d2dc9b',1.5);}
function plant(){let s='';s+=P('M 240 444 Q 449 435 668 444 L 668 612 L 240 612 Z','#eee6d4','none');s+=P('M 239 443 Q 449 435 669 443','none','#a7a28b',1.2);
s+=P('M 445 442 C 452 467 441 510 445 548 Q 448 579 439 603 C 440 564 431 538 434 509 Q 441 466 434 442 Z','url(#root-brown)','#987750',1);
const roots=['M 443 465 C 406 469 394 494 370 510 Q 349 525 324 525','M 441 487 C 482 482 509 505 528 532 Q 547 552 570 551','M 439 515 C 410 520 397 549 374 562','M 442 542 Q 485 539 508 578','M 439 568 Q 414 567 406 589'];
roots.forEach((d,i)=>{s+=P(d,'none','#ad895d',4-i*.55);});
s+=P('M 376 505 Q 357 493 343 502 M 351 520 L 337 537 M 510 513 Q 534 507 547 514 M 532 537 L 524 558 M 397 542 L 378 542 M 491 558 L 501 546','none','#b79a72',1.4);
for(let i=0;i<32;i++){let y=465+i*3.8,x=438+Math.sin(i*.8)*3;s+=P(`M ${x} ${y} l ${i%2?9:-10} 4`,'none','#c3a97e',.7)}
s+=P('M 435 441 Q 444 309 444 137 L 451 137 Q 451 308 448 441 Z','url(#stem-green)','#476a43',1.3);
s+=P('M 444 277 Q 422 264 390 257 M 447 335 Q 488 325 515 309','none','#759352',6);
s+=blade('M 391 258 C 344 261 298 238 278 187 C 329 178 378 204 391 258 Z','M 391 258 Q 337 223 283 190');
s+=P('M 367 242 L 356 210 M 346 229 L 334 199 M 347 229 L 316 229 M 369 243 L 340 246','none','#b8ca83',.9);
s+=blade('M 512 310 C 530 254 579 244 622 250 C 598 303 553 326 512 310 Z','M 514 308 Q 566 280 616 252');
s+=P('M 540 294 L 547 270 M 561 282 L 574 260 M 542 294 L 571 299 M 566 280 L 592 281','none','#c0cf8f',.9);
s+=P('M 448 207 Q 463 190 473 181','none','#718f50',4)+blade('M 473 184 Q 463 143 506 121 Q 526 164 473 184 Z','M 475 181 L 505 127');
s+=P('M 439 278 Q 421 269 430 246 Q 443 253 439 278 Z','#94af65','#4f7146',1.4)+P('M 439 275 L 431 251','none','#d5dfad',1);
s+=P('M 437 278 L 450 279','none','#446340',2);
for(let i=0;i<5;i++)s+=G(P('M 0 0 C -24 -12 -31 -40 -9 -49 C 12 -56 29 -37 15 -15 Z','url(#petal-rose)','#b28688',1.2),`transform="translate(449 111) rotate(${i*72})"`);
s+=C(449,111,12,'#d6af57','#a88a46',1);for(let i=0;i<13;i++){let a=i*2.4,r=3+Math.sqrt(i)*2;s+=C(449+Math.cos(a)*r,111+Math.sin(a)*r,1.2,'#9a7a38');}
return s;}
function flower(){let s=P('M 442 550 L 440 452 L 460 452 L 458 550 Z','url(#stem-green)','#59774d',1.6);
s+=P('M 421 438 C 343 418 273 330 263 228 C 255 166 302 134 334 158 C 385 199 400 318 421 438 Z','url(#petal-rose)','#b7898d',1.7);
s+=P('M 481 438 C 558 414 628 330 635 225 C 643 166 597 136 566 160 C 516 201 501 315 481 438 Z','url(#petal-rose)','#b7898d',1.7);
s+=P('M 434 405 C 378 324 350 199 391 151 Q 431 133 450 332 Q 470 132 510 152 C 551 204 519 325 469 405 Z','url(#petal-back)','#c39d95',1.3);
for(let i=0;i<6;i++){s+=P(`M 418 426 Q ${301+i*12} ${284+i*5} ${282+i*9} ${185-i*2}`,'none','#bb8991',.7,'opacity=".5"');s+=P(`M 483 426 Q ${596-i*9} ${283+i*6} ${618-i*9} ${184-i*2}`,'none','#bb8991',.7,'opacity=".5"');}
s+=P('M 425 445 Q 379 350 361 246 M 480 442 Q 524 350 535 310 L 550 242','none','#beaa69',5);
function anther(x,y,rot){let a=E(-7,0,8,29,'#e0b85c','#a68a45',1.3)+E(7,0,8,29,'#efd17c','#a68a45',1.3)+P('M 0 -24 L 0 24','none','#a3884b',1.1);for(let i=0;i<18;i++)a+=C((i%2?7:-7)+Math.sin(i*3)*2,-20+(i%9)*5,1.1,'#b48f43');return G(a,`transform="translate(${x} ${y}) rotate(${rot})"`)}
s+=anther(355,222,-16)+anther(556,222,16);
s+=P('M 441 355 L 442 184 Q 450 178 458 184 L 459 355 Z','#c3cf98','#6d895d',1.6)+P('M 448 189 L 448 354 M 452 189 L 452 354','none','#f3edcd',1.6);
s+=P('M 427 173 Q 430 160 442 165 Q 450 152 459 165 Q 474 159 475 174 Q 450 188 427 173 Z','#b6c78d','#718c5d',1.5);
for(let i=0;i<10;i++)s+=E(431+i*4.3,169+Math.sin(i)*2,1.5,3.5,'#8caa6b','none');
s+=P('M 435 446 Q 347 454 294 390 Q 357 387 435 446 Z','url(#leaf-green)','#5a794a',1.7)+P('M 465 446 Q 555 454 607 390 Q 546 389 465 446 Z','url(#leaf-green)','#5a794a',1.7);
s+=P('M 426 439 L 308 395 M 475 439 L 593 395','none','#c0d08b',1);
const ov='M 439 342 C 407 347 393 376 397 414 C 400 454 424 466 450 466 C 480 466 503 449 504 410 C 507 374 490 347 459 342 Z';
s+=P(ov,'#d8b49d','#8f8164',2)+P(ov,'url(#wall-hatch)','none');
s+=P('M 441 356 C 416 363 408 383 409 413 Q 409 451 450 454 Q 491 450 492 410 C 493 384 484 361 458 355 Z','#f3edcf','#a6a37c',1.2);
s+=P('M 447 355 L 447 449 L 453 449 L 453 355','#a7b67a','#879a63',.9);
for(let row=0;row<3;row++){let y=378+row*23;for(const side of [-1,1]){let x=450+side*23;s+=P(`M ${450+side*3} ${y+5} Q ${450+side*11} ${y+9} ${x} ${y}`,'none','#95a169',1.8);s+=G(P('M -9 -5 C -16 -1 -12 10 -2 11 Q 12 8 10 -2 Q 6 -13 -1 -6 Q -3 -1 -9 -5 Z','#d4d4a0','#8e9c66',1.1)+E(0,2,4,5,'#f5edc4','#b1b57d',.6),`transform="translate(${x} ${y}) rotate(${side*18})"`)}}
s+=P('M 425 461 Q 450 474 477 461','none','#5d7c4c',3);
return s;}
const leafOutline='M 450 105 C 408 160 300 180 300 292 C 300 386 362 445 450 467 C 536 443 605 379 605 292 C 605 190 481 158 450 105 Z';
function leaf(){let s=`<defs><clipPath id="leaf-clip">${P(leafOutline,'white','none')}</clipPath></defs>`;
s+=P('M 444 463 Q 450 509 445 556 L 457 556 Q 453 508 456 463 Z','url(#stem-green)','#5e7c4b',1.3)+P(leafOutline,'url(#leaf-green)','#466d44',2);
s+=G(Array.from({length:19},(_,i)=>P(`M ${295+i*17} 166 Q ${306+i*17} 321 ${300+i*17} 458`,'none','#a8bd7c',.45,'opacity=".35"')).join(''),'clip-path="url(#leaf-clip)"');
let veins='';
veins+=P('M 450 108 C 456 251 445 374 450 467','none','#d6df9f',5)+P('M 451 116 Q 450 321 450 462','none','#718f4c',1.1);
const ys=[193,238,283,329,375,418];for(let i=0;i<ys.length;i++){let y=ys[i],edge=335+Math.abs(i-2.5)*14;for(const sign of [-1,1]){let end=450+sign*(450-edge);let d=`M 450 ${y+36} Q ${450+sign*56} ${y-1} ${end} ${y-24}`;veins+=P(d,'none','#c7d690',1.65);for(let j=1;j<4;j++){let x=450+sign*(j*19),yy=y+36-j*13;veins+=P(`M ${x} ${yy} Q ${x+sign*4} ${yy-18} ${x+sign*15} ${yy-35}`,'none','#a5be76',.8)}}}
veins+=P('M 450 359 Q 489 322 542 300','none','#c7d690',1.65);
s+=G(veins,'clip-path="url(#leaf-clip)"');
return s;}
// Voronoi cells with rounded corners leave lacunae at cell junctions.
function spongyCells(){
 const seeds=[];for(let row=0;row<3;row++)for(let col=0;col<7;col++)seeds.push([252+col*63+Math.sin(col*2+row*3)*11,310+row*48+Math.cos(col+row)*8]);
 let out='';for(const [sx,sy] of seeds){let poly=[[240,294],[662,294],[662,456],[240,456]];
  for(const [ox,oy] of seeds){if(sx===ox&&sy===oy)continue;const nx=ox-sx,ny=oy-sy,k=(ox*ox+oy*oy-sx*sx-sy*sy)/2,next=[];
   for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],da=a[0]*nx+a[1]*ny-k,db=b[0]*nx+b[1]*ny-k;if(da<=0)next.push(a);if((da<=0)!==(db<=0)){let t=da/(da-db);next.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);}}poly=next;if(!poly.length)break;
  }
  if(poly.length<3)continue;let d='';for(let i=0;i<poly.length;i++){let v=poly[i],p=poly[(i+poly.length-1)%poly.length],n=poly[(i+1)%poly.length],cut=.32,a=[v[0]+(p[0]-v[0])*cut,v[1]+(p[1]-v[1])*cut],b=[v[0]+(n[0]-v[0])*cut,v[1]+(n[1]-v[1])*cut];d+=`${i?'L':'M'} ${a} Q ${[v[0]+(sx-v[0])*.55,v[1]+(sy-v[1])*.55]} ${b} `;}out+=P(d+'Z','#cbdca4','#7c9960',1.3);
  poly.forEach((v,i)=>{let x=sx+(v[0]-sx)*.4,y=sy+(v[1]-sy)*.4;out+=chloroplast(x,y,i*53,.68)});out+=E(sx+3,sy+2,4,3,'#b5a194','#8c9273',.6);
 }
 return out;
}
function leafSection(){let s='<defs><clipPath id="leaf-panel"><rect x="240" y="145" width="422" height="354"/></clipPath><mask id="outside-bundle"><rect x="240" y="145" width="422" height="354" fill="white"/><ellipse cx="510" cy="355" rx="62" ry="66" fill="black"/><ellipse cx="372" cy="442" rx="21" ry="22" fill="black"/></mask></defs>';
s+=P('M 240 158 Q 345 149 450 156 Q 562 150 662 158 L 662 164 Q 561 156 450 163 Q 346 155 240 164 Z','#ccb578','#aa965d',1);
for(let i=0;i<14;i++){let x=240+i*30.2,y=164+Math.sin(i*.9)*3;s+=P(`M ${x} ${y} q 14 -4 30 0 l 1 35 q -15 5 -30 0 Z`,'#f3dfb1','#b59f75',1.4)+E(x+17,y+24,2.8,2,'#c4ac83','none');}
let pal='';for(let i=0;i<16;i++){let x=242+i*26.1,y=203+Math.sin(i*1.7)*3,bottom=294+Math.sin(i*1.2)*9;pal+=P(`M ${x} ${y+5} Q ${x+11} ${y-6} ${x+23} ${y+4} L ${x+23} ${bottom-8} Q ${x+12} ${bottom+7} ${x} ${bottom-5} Z`,'url(#palisade)','#6d8f54',1.25);for(let j=0;j<7;j++)pal+=chloroplast(x+(j%2?18:5),y+13+j*10,(j%2?15:-18),.72);pal+=E(x+13,y+60,3.7,5,'#a99a8b','#8a8873',.6);}
s+=G(pal,'clip-path="url(#leaf-panel)"');
s+=G(G(spongyCells(),'mask="url(#outside-bundle)"'),'clip-path="url(#leaf-panel)"');
s+=ringCells(510,355,53,65,18,'#e8d9a5','#aa9d73');s+=E(510,355,52,53,'#e4dfb7','#aa9d73');
for(const [x,y,r] of [[492,327,11],[516,319,12],[533,338,10],[506,343,9],[485,348,7]])s+=vessel(x,y,r);
for(let row=0;row<3;row++)for(let col=0;col<4;col++){let x=490+col*12+(row%2)*4,y=369+row*12;s+=P(`M ${x-5} ${y-5} l 8 -2 l 4 7 l -4 7 l -9 -2 Z`,'#b8d1c9','#698e89',1);if(col%2===0)s+=C(x,y,1.7,'#759893');}
for(let i=0;i<14;i++){let x=240+i*30.2;if(i===4)continue;s+=P(`M ${x} 458 q 14 -4 30 0 l 0 29 q -16 4 -30 0 Z`,'#f0dcb0','#b59f75',1.3);}
s+=P('M 360 458 Q 346 472 360 488 Q 371 486 369 476 L 369 467 Q 367 460 360 458 Z','#9cbd77','#6c8d57',1.4)+P('M 384 458 Q 398 472 384 488 Q 373 486 375 476 L 375 467 Q 377 460 384 458 Z','#9cbd77','#6c8d57',1.4);
s+=P('M 240 491 L 355 491 M 390 491 L 662 491','none','#c9b47b',3);
return s;}
function stem(){let s='<defs><clipPath id="stem-all"><circle cx="450" cy="335" r="207"/></clipPath><clipPath id="stem-cortex"><path d="M 657 335 A 207 207 0 1 1 243 335 A 207 207 0 1 1 657 335 M 615 335 A 165 165 0 1 0 285 335 A 165 165 0 1 0 615 335" clip-rule="evenodd"/></clipPath></defs>';
s+=C(450,335,218,'#e9ddae','#7d865c',2);
s+=tissue(450,335,208,18,'#f3e5bc','#c0ae7d','stem-all');s+=tissue(450,335,208,12,'#c8d39f','#8eaa71','stem-cortex');
s+=ringCells(450,335,207,218,64,'#e7c997','#a49066');
for(let i=0;i<8;i++){let b=P('M -27 -168 Q 0 -181 27 -168 L 24 -144 L -24 -144 Z','#acc9bb','#6c9283',1.4);
for(let row=0;row<3;row++)for(let col=0;col<5;col++){let x=-20+col*9+(row%2?2:0),y=-166+row*8;b+=R(x-4,y-3,8,7,col%2?'#d3e1c7':'#bcd1bc','#7f9e8c',2);}
b+=P('M -25 -142 L 25 -142 L 24 -130 L -24 -130 Z','#b8b386','#8c8960',1);
for(let row=0;row<3;row++)for(let col=0;col<6;col++)b+=R(-25+col*8.4,-141+row*3.5,8.4,3.5,'#e4d8a5','#999366',0);
b+=P('M -24 -129 L 24 -129 Q 24 -110 12 -89 L 0 -79 L -13 -90 Q -23 -111 -24 -129 Z','#d7a08b','#aa7464',1.5);
for(const [x,y,r] of [[-12,-119,8.5],[10,-118,10],[0,-100,7],[-8,-88,3],[4,-85,2.7]])b+=vessel(x,y,r);
s+=G(b,`transform="translate(450 335) rotate(${i*45})"`);}
s+=P('M 259 237 A 214 214 0 0 1 463 121','none','#fff9e8',2.5,'opacity=".7"');return s;}
function root(){let s='<defs><clipPath id="root-cortex"><path d="M 657 335 A 207 207 0 1 1 243 335 A 207 207 0 1 1 657 335 M 590 335 A 140 140 0 1 0 310 335 A 140 140 0 1 0 590 335" clip-rule="evenodd"/></clipPath><clipPath id="root-core"><circle cx="450" cy="335" r="112"/></clipPath></defs>';
s+=C(450,335,218,'#eee1b6','#9e926c',2);s+=tissue(450,335,208,17,'#f1e7c2','#baaf84','root-cortex');s+=ringCells(450,335,207,218,60,'#e9d6ad','#a69470');
s+=P('M 619 197 C 640 192 646 170 666 160 Q 681 155 680 142 Q 673 154 664 154 C 642 160 637 185 613 189 Z','#e9d6ad','#a69470',1.2);
s+=P('M 253 252 Q 224 246 225 222 Q 229 241 257 245 Z','#e9d6ad','#a69470',1.2)+P('M 650 408 Q 677 424 673 448 Q 669 426 647 417 Z','#e9d6ad','#a69470',1.2);
s+=ringCells(450,335,125,140,36,'#ddc18a','#a18c60',true);s+=ringCells(450,335,112,124,38,'#bacbb4','#7e9882');s+=tissue(450,335,113,11,'#e4deb4','#b3ad7e','root-core');
const cross='M 450 244 Q 470 268 468 312 Q 510 309 541 335 Q 510 359 468 358 Q 470 400 450 426 Q 429 399 432 358 Q 390 362 359 335 Q 391 310 432 312 Q 429 271 450 244 Z';
s+=P(cross,'#cf9c85','#a57060',1.5);
for(let dir=0;dir<4;dir++){let v='';for(const [x,y,r] of [[0,-66,5],[0,-48,8],[-7,-25,10],[9,-20,8]])v+=vessel(x,y,r);s+=G(v,`transform="translate(450 335) rotate(${dir*90})"`);}s+=vessel(450,335,13);
for(let i=0;i<4;i++){let a=Math.PI/4+i*Math.PI/2,[x,y]=pt(450,335,58,a),g=E(x,y,19,19,'#b9cfc2','#73958a',1.3);for(let r=0;r<3;r++)for(let c=0;c<3;c++){let xx=x-10+c*10,yy=y-10+r*10;g+=P(`M ${xx-4} ${yy-3} l 6 -2 l 4 6 l -5 5 l -6 -3 Z`,'#d6e2cc','#7b9b8b',.8);}s+=g;}
return s;}
const diagrams={plant,flower,leaf,leafSection,stem,root};
export function diagramSvg(name){if(!diagrams[name])throw Error(`Unknown diagram: ${name}`);return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 640" aria-hidden="true"><defs>${defs}</defs><rect width="900" height="640" fill="#faf7ee"/>${diagrams[name]()}</svg>`;}
