import {activities} from './activities.js';
import {diagramSvg} from './diagrams.js';
import {VERSION,emptySession,place,grade,check,retryErrors,solution,hydrate,shuffled} from './model.js';
const $=id=>document.getElementById(id);
const STORAGE='taxonomy.botanica.v1';
let saved;try{saved=JSON.parse(localStorage.getItem(STORAGE));}catch{}
let state=hydrate(saved,activities),selected=null,order=[],drag=null,suppressClick=false;
const activity=()=>activities.find(a=>a.id===state.active);
const session=()=>state.sessions[state.active]??(state.sessions[state.active]=emptySession());
function save(){try{localStorage.setItem(STORAGE,JSON.stringify({version:VERSION,...state}));}catch{$('storage-warning').hidden=false;}}
function setTheme(){document.documentElement.dataset.theme=state.theme;$('theme').textContent=state.theme==='dark'?'☼':'☾';$('theme').setAttribute('aria-label',state.theme==='dark'?'Activar tema claro':'Activar tema oscuro');}
function renderNav(){
 let group='';$('activities').innerHTML=activities.map((a,i)=>{
  const heading=a.group!==group?`<div class="nav-group">${a.group}</div>`:'';group=a.group;
  const s=state.sessions[a.id],done=s?.completed,mark=done?(s.assisted?'◐':'✓'):'';
  return `${heading}<button class="activity-nav" data-activity="${a.id}" aria-current="${a.id===state.active}" aria-label="${a.title}${done?s.assisted?', completada con solución':', completada':''}"><span class="nav-number">${String(i+1).padStart(2,'0')}</span><span class="nav-name">${a.title}</span><span class="nav-status" aria-hidden="true">${mark}</span></button>`;
 }).join('');
 const done=activities.filter(a=>state.sessions[a.id]?.completed).length;
 const helped=activities.filter(a=>state.sessions[a.id]?.completed&&state.sessions[a.id]?.assisted).length;
 $('overall-count').textContent=`${done} / ${activities.length}`;$('overall-progress').value=done;
 $('overall-note').textContent=helped?`${helped} con solución consultada (◐). Guardado en este navegador.`:'El progreso se guarda en este navegador.';
}
function positions(a){const slots={};for(const side of ['left','right']){let list=a.items.filter(i=>i.side===side).sort((x,y)=>x.y-y.y);list.forEach((item,i)=>slots[item.id]={x:side==='left'?110:790,y:list.length===1?320:100+i*440/(list.length-1)});}return slots;}
function renderDiagram(){
 const a=activity(),s=session(),g=grade(s,a),slots=positions(a);
 $('artwork').innerHTML=diagramSvg(a.diagram);
 $('leaders').innerHTML=a.items.map(i=>{let p=slots[i.id],edge=p.x+(i.side==='left'?81:-81),bend=i.side==='left'?220:680;return `<path d="M ${edge} ${p.y} L ${bend} ${p.y} L ${i.x} ${i.y}"/><circle cx="${i.x}" cy="${i.y}" r="5"/>`;}).join('');
 $('targets').innerHTML=a.items.map((item,index)=>{
  let p=slots[item.id],label=a.items.find(i=>i.id===s.placements[item.id]),status=s.checked?g.statuses[item.id]:'',icon=status==='correct'?'✓':status==='wrong'?'×':'';
  return `<button class="target ${label?'filled':''} ${status}" data-slot="${item.id}" style="left:${p.x/9}%;top:${p.y/6.4}%" aria-label="Destino ${index+1}${label?', '+label.name:', vacío'}${status==='correct'?', correcto':status==='wrong'?', revisar':''}"><span class="target-num">${String(index+1).padStart(2,'0')}</span><span>${label?label.name:'Colocar aquí'}</span>${icon?`<small aria-hidden="true">${icon}</small>`:''}</button>`;
 }).join('');
 if(selected)document.querySelectorAll('.target').forEach(t=>t.classList.add('awaiting'));
}
function renderLabels(){let a=activity(),s=session();$('label-bank').innerHTML=order.map(id=>{
 const i=a.items.find(x=>x.id===id),placed=Object.values(s.placements).includes(id);
 return `<button class="label ${placed?'placed':''} ${selected===id?'selected':''}" data-label="${id}" aria-pressed="${selected===id}" aria-describedby="definition-text"><span class="grip" aria-hidden="true">⠿</span><span class="label-text">${i.name}</span>${placed?'<span class="placed-mark" aria-label="colocada">↗</span>':''}</button>`;
 }).join('');$('placement-count').textContent=`${Object.keys(s.placements).length} / ${a.items.length}`;
 $('learn-mode').setAttribute('aria-pressed',s.mode==='learn');$('recall-mode').setAttribute('aria-pressed',s.mode==='recall');
}
function describe(id){const i=activity().items.find(i=>i.id===id),s=session();
 if(s.mode==='recall'&&!s.checked){$('definition-kicker').textContent='MODO DE MEMORIA';$('definition-title').textContent=i?.name??'Tú puedes';$('definition-text').textContent='Las descripciones aparecerán después de comprobar. Puedes volver a «Con descripciones» cuando quieras.';return;}
 $('definition-kicker').textContent=i?'OBSERVA SU ESTRUCTURA Y SU FUNCIÓN':'UNA PISTA AL PASAR EL RATÓN';$('definition-title').textContent=i?.name??'Mira de cerca';$('definition-text').textContent=i?.description??'Pasa el ratón o enfoca una etiqueta para leer su descripción. En móvil, tócala.';
}
function feedback(text,type=''){$('feedback').textContent=text;$('feedback').className='feedback '+type;}
function renderFeedback(){const s=session(),a=activity(),g=grade(s,a);$('retry').hidden=!(s.checked&&!g.complete);$('check').hidden=s.checked&&g.complete;$('next').hidden=!(s.checked&&g.complete);
 if(!s.checked){feedback('Coloca las etiquetas y comprueba lo que has aprendido.');return;}
 if(g.complete){feedback(s.assisted?`Solución consultada · ${g.total} de ${g.total}. Reinicia para practicar sin la solución.`:`¡Bien observado! ${g.total} de ${g.total} correctas · ${s.attempts===1?'primera comprobación':s.attempts+' comprobaciones'}.`,'success');}
 else {const missing=Object.values(g.statuses).filter(x=>x==='empty').length;feedback(`${g.correct} de ${g.total} correctas. ${missing?`Faltan ${missing} por colocar. `:''}Las etiquetas con × necesitan otra mirada. Puedes moverlas o pulsar «Revisar errores».`,'error');}
 const last=activities.findIndex(a=>a.id===state.active)===activities.length-1;$('next').textContent=last?'Volver a la primera →':'Siguiente actividad →';
}
function render(){const a=activity(),index=activities.indexOf(a);$('breadcrumb').textContent=`REPASO VISUAL / ${a.group.toUpperCase()} / ${String(index+1).padStart(2,'0')}`;$('activity-title').textContent=a.title;$('subtitle').textContent=a.subtitle;$('level').textContent=a.level;$('figure-caption').textContent=`FIG. ${String(index+1).padStart(2,'0')} · ${a.title}`;$('anatomy-note').textContent=a.note;renderNav();renderDiagram();renderLabels();describe(selected);renderFeedback();}
function choose(id){selected=selected===id?null:id;renderLabels();document.querySelectorAll('.target').forEach(t=>t.classList.toggle('awaiting',!!selected));describe(id);}
function move(slot,label){state.sessions[state.active]=place(session(),activity(),slot,label);selected=null;save();render();}
function switchActivity(id){if(!activities.some(a=>a.id===id))return;cancelDrag();state.active=id;selected=null;order=shuffled(activity().items.map(i=>i.id));save();render();document.querySelector('.activity-nav[aria-current=true]')?.scrollIntoView({block:'nearest',inline:'nearest'});}
function reset(){state.sessions[state.active]={...emptySession(),mode:session().mode};selected=null;order=shuffled(activity().items.map(i=>i.id));save();render();feedback('Actividad reiniciada. Las etiquetas se han mezclado.');}
$('activities').addEventListener('click',e=>{const b=e.target.closest('[data-activity]');if(b)switchActivity(b.dataset.activity);});
$('label-bank').addEventListener('click',e=>{if(suppressClick){suppressClick=false;return;}let b=e.target.closest('[data-label]');if(b){choose(b.dataset.label);document.querySelector(`[data-label="${b.dataset.label}"]`)?.focus({preventScroll:true});}});
$('label-bank').addEventListener('pointerover',e=>{const b=e.target.closest('[data-label]');if(b&&!drag)describe(b.dataset.label);});
$('label-bank').addEventListener('focusin',e=>{const b=e.target.closest('[data-label]');if(b)describe(b.dataset.label);});
$('targets').addEventListener('click',e=>{const b=e.target.closest('[data-slot]');if(!b)return;let slot=b.dataset.slot;if(selected){move(slot,selected);document.querySelector(`[data-slot="${slot}"]`)?.focus({preventScroll:true});}else if(session().placements[slot])choose(session().placements[slot]);else feedback('Selecciona primero una etiqueta o arrástrala hasta este destino.');});
$('targets').addEventListener('pointerover',e=>{const b=e.target.closest('[data-slot]');if(b&&session().placements[b.dataset.slot]&&!drag)describe(session().placements[b.dataset.slot]);});
$('targets').addEventListener('focusin',e=>{const b=e.target.closest('[data-slot]');if(b&&session().placements[b.dataset.slot])describe(session().placements[b.dataset.slot]);});
$('label-bank').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-label]');if(!b||e.button!==0)return;drag={id:b.dataset.label,x:e.clientX,y:e.clientY,pointerId:e.pointerId,active:false,button:b};b.setPointerCapture(e.pointerId);});
window.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.pointerId)return;if(!drag.active&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>6){drag.active=true;selected=drag.id;document.body.classList.add('dragging');$('drag-ghost').hidden=false;$('drag-ghost').textContent=activity().items.find(i=>i.id===drag.id).name;describe(drag.id);}if(!drag.active)return;e.preventDefault();$('drag-ghost').style.left=e.clientX+'px';$('drag-ghost').style.top=e.clientY+'px';document.querySelectorAll('.target.over').forEach(t=>t.classList.remove('over'));document.elementFromPoint(e.clientX,e.clientY)?.closest('.target')?.classList.add('over');},{passive:false});
window.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.pointerId)return;const d=drag;if(d.active){const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('.target');cancelDrag();suppressClick=true;setTimeout(()=>suppressClick=false,0);if(target)move(target.dataset.slot,d.id);else{selected=d.id;renderLabels();document.querySelectorAll('.target').forEach(t=>t.classList.add('awaiting'));feedback('Etiqueta seleccionada. Suéltala sobre un destino o pulsa uno para colocarla.');}}else drag=null;});
function cancelDrag(){if(drag?.button?.hasPointerCapture(drag.pointerId))drag.button.releasePointerCapture(drag.pointerId);drag=null;$('drag-ghost').hidden=true;document.body.classList.remove('dragging');document.querySelectorAll('.target.over').forEach(t=>t.classList.remove('over'));}
window.addEventListener('pointercancel',cancelDrag);window.addEventListener('blur',cancelDrag);
window.addEventListener('keydown',e=>{if(e.key==='Escape'){cancelDrag();selected=null;document.querySelector('.canvas-panel').classList.remove('expanded');$('expand').textContent='⤢ Ampliar';renderLabels();document.querySelectorAll('.target').forEach(t=>t.classList.remove('awaiting'));}});
$('check').onclick=()=>{state.sessions[state.active]=check(session(),activity());save();render();};
$('retry').onclick=()=>{state.sessions[state.active]=retryErrors(session(),activity());selected=null;save();render();feedback('Se conservan las respuestas correctas. Vuelve a colocar las demás.');};
$('solution').onclick=()=>{state.sessions[state.active]=solution(session(),activity());selected=null;save();render();};
$('reset').onclick=reset;
$('next').onclick=()=>{const index=activities.indexOf(activity());switchActivity(activities[(index+1)%activities.length].id);$('activity-title').scrollIntoView({block:'start',behavior:'smooth'});};
for(const [id,mode] of [['learn-mode','learn'],['recall-mode','recall']])$(id).onclick=()=>{session().mode=mode;save();renderLabels();describe(selected);};
$('theme').onclick=()=>{state.theme=state.theme==='dark'?'light':'dark';setTheme();save();};
$('expand').onclick=()=>{const panel=document.querySelector('.canvas-panel'),expanded=panel.classList.toggle('expanded');$('expand').textContent=expanded?'⤡ Reducir':'⤢ Ampliar';$('expand').setAttribute('aria-label',expanded?'Reducir lámina':'Ampliar lámina');};
function dialog(html){$('dialog-body').innerHTML=html;$('info-dialog').showModal();}
$('guide').onclick=()=>dialog(`<h2>Una mirada más atenta.</h2><p>Repasa cada lámina a tu ritmo. Puedes cambiar de actividad en cualquier momento: las etiquetas colocadas se conservan.</p><ol><li><strong>Observa.</strong> Cada número está unido por una línea al punto que debes identificar.</li><li><strong>Consulta.</strong> Pasa el ratón, enfoca con el teclado o toca una etiqueta para leer su descripción.</li><li><strong>Coloca.</strong> Arrastra el nombre al recuadro numerado. También puedes pulsar el nombre y después su destino; con teclado, usa Tab y Enter o espacio.</li><li><strong>Comprueba.</strong> ✓ indica una respuesta correcta y × una que debes revisar. «Revisar errores» conserva las correctas.</li></ol><p>Puedes volver a mover una etiqueta colocada desde la lista. Si dos etiquetas ya estaban colocadas, intercambian sus destinos.</p><p>En «De memoria» las descripciones se ocultan hasta comprobar. «Ver solución» marca la actividad como consultada (◐). «Empezar de nuevo» permite practicar otra vez.</p><p>El progreso se guarda solo en este navegador. No se envían respuestas ni datos de alumnos a un servidor.</p>`);
$('sources').onclick=()=>dialog(`<h2>Esquemas para aprender a mirar.</h2><p>Ocho actividades de organografía vegetal con ilustraciones vectoriales originales y descripciones en español. Son esquemas didácticos sin escala: los colores diferencian estructuras y no representan una tinción concreta.</p><p>Se especifica el tipo anatómico en cada actividad. La disposición de tejidos cambia con la especie, el órgano y su estado de desarrollo. En flor y semilla se muestran estructuras internas mediante una apertura esquemática.</p><p>Referencias de consulta: <a href="https://openstax.org/books/biology-2e/pages/30-1-the-plant-body" target="_blank" rel="noopener">cuerpo vegetal</a>, <a href="https://openstax.org/books/biology-2e/pages/30-2-stems" target="_blank" rel="noopener">tallos</a>, <a href="https://openstax.org/books/biology-2e/pages/30-3-roots" target="_blank" rel="noopener">raíces</a>, <a href="https://openstax.org/books/biology-2e/pages/30-4-leaves" target="_blank" rel="noopener">hojas</a> y <a href="https://openstax.org/books/biology-2e/pages/32-1-reproductive-development-and-structure" target="_blank" rel="noopener">reproducción</a>, en <em>Biology 2e</em>, OpenStax.</p><p>La selección inicial sigue los bloques de órganos y anatomía tratados en el contexto docente disponible. La numeración no pretende reproducir los guiones oficiales de prácticas. Se pueden añadir láminas o ajustar términos en el catálogo de actividades.</p><p>Taxonomy · versión 1.0 · Material de apoyo docente.</p>`);
$('sources-footer').onclick=()=>$('sources').onclick();
$('close-dialog').onclick=()=>$('info-dialog').close();$('info-dialog').addEventListener('click',e=>{if(e.target===$('info-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
document.querySelector('.brand').onclick=e=>{e.preventDefault();switchActivity(activities[0].id);};
order=shuffled(activity().items.map(i=>i.id));setTheme();render();
