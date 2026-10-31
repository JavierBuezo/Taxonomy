const path=(d,fill,stroke='#385b48',width=2,extra='')=>`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const ellipse=(x,y,rx,ry,fill,stroke='#52775c',extra='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="2" ${extra}/>`;
const circle=(x,y,r,fill,stroke='none',extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
const rect=(x,y,w,h,fill,rx=5,stroke='#82936c')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
const chloros=(cx,cy,n=5,rx=13,ry=25)=>Array.from({length:n},(_,i)=>ellipse(cx+Math.cos(i*2.4)*rx,cy+Math.sin(i*2.4)*ry,3,5,'#59865c','none')).join('');
function plant(){return `
${path('M 447 440 Q 444 320 450 138','none','#5d8053',13)}
${path('M 447 289 Q 407 259 379 256 M 448 337 Q 499 307 519 302','none','#638856',7)}
${path('M 385 259 Q 302 265 275 180 Q 370 168 385 259','#8ca66b')}
${path('M 517 303 Q 592 319 626 239 Q 540 217 517 303','#75945b')}
${path('M 450 193 Q 479 153 510 141 Q 528 202 450 229','#a6b77b')}
${path('M 378 252 L 298 198 M 522 297 L 605 253 M 459 213 L 497 158','none','#4e7648',2)}
${path('M 446 287 Q 424 273 434 260 Q 449 267 446 287','#b2c17d')}
${ellipse(450,104,28,24,'#d7ae8c','#957957')}
${Array.from({length:6},(_,i)=>{const a=i*Math.PI/3;return ellipse(450+Math.cos(a)*28,104+Math.sin(a)*28,15,24,'#ede4bd','#bdad7a',`transform="rotate(${i*60+90} ${450+Math.cos(a)*28} ${104+Math.sin(a)*28})"`)}).join('')}
${circle(450,104,14,'#d8b858','#9f8548')}
${path('M 225 441 Q 448 432 676 441','none','#b5a28a',2)}
${path('M 446 443 Q 457 516 440 582','none','#a78462',12)}
${path('M 450 477 Q 401 481 378 523 Q 365 541 341 550 M 451 498 Q 490 491 523 528 L 555 554 M 446 537 Q 407 535 400 571 M 446 552 Q 473 552 488 579','none','#aa896b',5)}
${path('M 380 520 L 351 516 M 523 528 L 548 526 M 398 546 L 380 567','none','#b59578',2)}
${Array.from({length:18},(_,i)=>circle(245+i*23,460+(i%4)*27,1.7,'#cab8a0')).join('')}
`}
function flower(){return `
${path('M 450 554 L 450 455','none','#6f8c5c',16)}
${path('M 434 451 Q 309 448 273 366 Q 359 366 434 451','#a0b17a')}
${path('M 465 452 Q 585 442 626 368 Q 548 371 465 452','#92a46a')}
${path('M 422 418 Q 277 377 270 230 Q 266 157 320 146 Q 369 165 422 418','#dca9ac','#ab7c87')}
${path('M 476 418 Q 624 380 631 230 Q 633 154 579 147 Q 528 165 476 418','#e6b8b5','#ab7c87')}
${path('M 427 375 Q 352 240 388 169 Q 435 139 450 328 Q 465 135 514 166 Q 546 234 475 375','#edcebf','#b58a87')}
${path('M 426 429 Q 376 365 360 244 M 474 429 Q 530 355 547 241','none','#b29c5c',7)}
${ellipse(353,227,13,31,'#d9b458','#a88c42','transform="rotate(-20 353 227)"')}
${ellipse(554,224,13,31,'#d9b458','#a88c42','transform="rotate(20 554 224)"')}
${path('M 350 206 L 361 244 M 560 205 L 547 245','none','#b89a4a',2)}
${path('M 442 345 L 442 185 Q 450 176 458 185 L 458 345','#b6c790','#657f56')}
${ellipse(450,174,24,10,'#97b47e','#657f56')}
${path('M 442 340 Q 396 353 404 413 Q 406 449 450 456 Q 495 449 496 413 Q 503 354 458 340 Z','#b0bf80','#5f7d50',3)}
${path('M 447 351 L 447 443 M 453 351 L 453 443','none','#65835b',2)}
${[378,397,417].map((y,i)=>ellipse(i%2?432:469,y,9,6,'#ede0a3','#9c995c')).join('')}
${path('M 421 452 Q 450 473 480 452','none','#688352',5)}
`}
function leaf(){return `
${path('M 450 108 C 422 164 314 183 315 290 C 311 390 394 446 450 460 C 504 443 588 390 585 290 C 586 188 475 160 450 108 Z','#9bb27b','#52744e',3)}
${path('M 450 111 Q 457 308 450 460 L 450 553','none','#4e754c',6)}
${[210,260,310,360,405].map((y,i)=>path(`M 450 ${y+55} Q ${395-i*3} ${y+13} ${350+(i-2)**2*10} ${y-5} M 450 ${y+55} Q ${505+i*3} ${y+13} ${550-(i-2)**2*10} ${y-5}`,'none','#608655',2)).join('')}
${path('M 448 526 L 444 526','none','#78965c',8)}
`}
function leafSection(){let s='';
s+=rect(246,153,408,13,'#d8bc77',3,'#b19354');
for(let i=0;i<12;i++)s+=rect(246+i*34,167,34,32,'#e7d8a5',5);
for(let i=0;i<17;i++){let x=248+i*24;s+=rect(x,202,23,89,'#a7bd83',10,'#69875b')+chloros(x+12,245,7,6,32)}
for(let row=0;row<3;row++)for(let i=0;i<7;i++){let x=264+i*60+(row%2)*18,y=326+row*44;if(x>410&&x<505&&y<400)continue;s+=ellipse(x,y,22+(i%2)*5,15+(i%3)*3,'#c0cca0','#7f986b',`transform="rotate(${(i%3-1)*24} ${x} ${y})"`)+chloros(x,y,3,12,7)}
s+=ellipse(456,339,61,64,'#e5d6a1','#8b9d6b');
for(let row=0;row<2;row++)for(let col=0;col<3;col++)s+=circle(433+col*22,306+row*22,9,'#b7d6d3','#668f90','stroke-width="2"');
for(let row=0;row<2;row++)for(let col=0;col<4;col++)s+=circle(433+col*16,352+row*14,6,'#d7a3a1','#a7797c');
for(let i=0;i<12;i++){let x=246+i*34;if(x>345&&x<400)continue;s+=rect(x,453,34,32,'#e7d8a5',5)}
s+=path('M 351 455 Q 333 470 352 484 Q 364 476 359 459 Z','#8ba875')+path('M 390 455 Q 410 470 391 484 Q 378 476 383 459 Z','#8ba875');
s+=path('M 246 489 L 345 489 M 399 489 L 654 489','none','#bca267',5);
return s}
function stem(){let s=circle(450,335,215,'#dcd5a1','#8c9867','stroke-width="3"')+circle(450,335,204,'#bac79a','#71855d')+circle(450,335,172,'#d3d8b0','#9aa77d')+circle(450,335,110,'#ece2bb','#9faa7c');
for(let i=0;i<10;i++){let a=i*Math.PI/5,x=450+Math.cos(a)*200,y=335+Math.sin(a)*200;s+=ellipse(x,y,10,6,'#dcd5a1','#889970',`transform="rotate(${i*36+90} ${x} ${y})"`)}
for(let i=0;i<12;i++){let a=i*Math.PI/6,deg=i*30;let inner=`${ellipse(0,-156,20,20,'#cea1a1','#9d777a')}${rect(-22,-140,44,5,'#879c63',2,'#607e4e')}${ellipse(0,-118,24,18,'#a7ccca','#668e8b')}${circle(-10,-122,6,'#d6e8df','#6d9891')}${circle(8,-114,8,'#d6e8df','#6d9891')}`;s+=`<g transform="translate(450 335) rotate(${deg})">${inner}</g>`}
for(let i=0;i<24;i++){let a=i*2.4,r=20+Math.sqrt(i)*15;s+=ellipse(450+Math.cos(a)*r,335+Math.sin(a)*r,12,10,'none','#c4c69b')}
return s}
function root(){let s=circle(450,335,215,'#e7d6a3','#8f976b','stroke-width="3"')+circle(450,335,204,'#e1dbb5','#a2ab80');
for(let j=0;j<3;j++){let r=150+j*21,n=30+j*3;for(let i=0;i<n;i++){let a=i*2*Math.PI/n;s+=ellipse(450+Math.cos(a)*r,335+Math.sin(a)*r,12,9,'#ddd8ac','#b3b18c',`transform="rotate(${a*180/Math.PI} ${450+Math.cos(a)*r} ${335+Math.sin(a)*r})"`)}}
s+=circle(450,335,131,'#c0b38a','#8f8a57','stroke-width="3"')+circle(450,335,120,'#c8cda0','#789063','stroke-width="2"')+circle(450,335,109,'#e8dfb6','#8fa477','stroke-width="2"');
for(let i=0;i<28;i++){let a=i*Math.PI/14;s+=path(`M ${450+Math.cos(a)*121} ${335+Math.sin(a)*121} L ${450+Math.cos(a)*131} ${335+Math.sin(a)*131}`,'none','#8c815a',2)}
s+=path('M 450 243 Q 478 284 469 316 Q 500 308 542 335 Q 500 362 469 354 Q 478 385 450 427 Q 422 385 431 354 Q 400 362 358 335 Q 400 308 431 316 Q 422 284 450 243 Z','#a7cccb','#648f8e',2);
for(let i=0;i<4;i++){let a=Math.PI/4+i*Math.PI/2,x=450+Math.cos(a)*56,y=335+Math.sin(a)*56;s+=ellipse(x,y,15,15,'#cfa0a0','#986d76');for(let j=0;j<4;j++)s+=circle(x+(j%2)*9-4,y+Math.floor(j/2)*9-4,4,'#dfb5ae','#ae8487')}
for(let i=0;i<5;i++)s+=circle(450,270+i*32,8,'#d7e7df','#67908e');
s+=path('M 622 208 Q 644 202 648 214 Q 664 217 680 186','none','#8f976b',7)+path('M 270 217 Q 238 198 227 176 M 634 445 Q 663 462 673 486','none','#8f976b',6);
return s}
function stoma(){let s='';
const cells=['M 244 150 Q 315 125 365 170 L 350 226 Q 296 258 242 229 Z','M 365 170 Q 410 132 459 162 Q 478 208 450 226 L 350 226 Z','M 459 162 Q 540 132 600 163 L 655 214 Q 607 259 549 233 L 450 226 Z','M 242 229 Q 296 258 326 288 Q 318 347 252 361 L 233 302 Z','M 549 233 Q 607 259 655 214 L 666 323 Q 628 364 573 339 Z','M 252 361 Q 315 354 345 400 L 325 466 Q 260 476 239 434 Z','M 345 400 L 450 418 L 467 485 Q 389 516 325 466 Z','M 450 418 Q 510 390 573 339 Q 629 359 659 414 L 613 484 Q 525 510 467 485 Z'];
s+=cells.map(d=>path(d,'#e0d9ad','#9da67e',3)).join('');
s+=path('M 427 222 C 330 225 324 420 427 439 Q 449 434 433 408 C 389 378 389 280 433 251 Q 449 229 427 222 Z','#adc38b','#617f56',3);
s+=path('M 473 222 C 570 225 576 420 473 439 Q 451 434 467 408 C 511 378 511 280 467 251 Q 451 229 473 222 Z','#adc38b','#617f56',3);
s+=ellipse(450,330,15,74,'#f6f0dc','#617f56');
for(const x of [383,517])for(let i=0;i<5;i++)s+=ellipse(x+(i%2)*6,265+i*32,6,9,'#648b59','none');
s+=ellipse(512,282,7,10,'#648b59','none')+circle(372,338,9,'#b9a0a3','#9d8286')+circle(528,338,9,'#b9a0a3','#9d8286');return s}
function seed(){return `
${path('M 400 190 C 290 144 253 224 266 330 C 268 444 353 491 413 444 Q 383 406 405 363 Q 428 324 409 290 Q 388 244 400 190 Z','#b68b66','#8a6e54',3)}
${path('M 396 203 C 304 166 270 239 283 330 C 285 429 351 469 395 439 Q 369 397 390 358 Q 412 326 393 290 Q 377 247 396 203 Z','#e3cd8a','#ac995f',2)}
${path('M 489 192 C 603 151 647 238 626 346 C 614 444 537 484 482 438 Q 512 397 493 359 Q 472 321 489 286 Q 506 243 489 192 Z','#e6d296','#a99868',3)}
${path('M 406 290 Q 443 310 476 291 M 445 305 Q 444 358 450 384 Q 451 415 434 441','none','#94a06a',13)}
${path('M 447 304 Q 426 269 428 238 Q 454 245 447 280 Q 452 246 473 234 Q 477 268 447 304','#91aa71','#678652',2)}
${path('M 447 382 Q 445 422 434 441','none','#d2c28c',9)}
${path('M 535 223 Q 609 273 584 369 M 323 216 Q 286 288 318 381','none','#c5af76',2)}
`}
const diagrams={plant,flower,leaf,leafSection,stem,root,stoma,seed};
export function diagramSvg(name){if(!diagrams[name])throw Error(`Unknown diagram: ${name}`);return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 640" aria-hidden="true"><defs><pattern id="paper" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.7" fill="#9a9d80" opacity="0.16"/></pattern></defs><rect width="900" height="640" fill="#f5f1e5"/><rect width="900" height="640" fill="url(#paper)"/>${diagrams[name]()}</svg>`}
