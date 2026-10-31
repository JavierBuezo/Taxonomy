export const VERSION=1;
export function emptySession(){return {placements:{},attempts:0,checked:false,assisted:false,completed:false,mode:'learn'};}
export function place(session,activity,slot,label){
 if(!activity.items.some(i=>i.id===slot)||!activity.items.some(i=>i.id===label))return session;
 const placements={...session.placements};
 const previousSlot=Object.keys(placements).find(k=>placements[k]===label);
 const displaced=placements[slot];
 if(previousSlot)delete placements[previousSlot];
 if(previousSlot&&previousSlot!==slot&&displaced&&displaced!==label)placements[previousSlot]=displaced;
 placements[slot]=label;
 return {...session,placements,checked:false,completed:false};
}
export function grade(session,activity){
 const statuses=Object.fromEntries(activity.items.map(i=>[i.id,!session.placements[i.id]?'empty':session.placements[i.id]===i.id?'correct':'wrong']));
 const correct=Object.values(statuses).filter(x=>x==='correct').length;
 return {statuses,correct,total:activity.items.length,complete:correct===activity.items.length};
}
export function check(session,activity){const g=grade(session,activity);return {...session,checked:true,attempts:session.attempts+1,completed:g.complete};}
export function retryErrors(session,activity){return {...session,placements:Object.fromEntries(Object.entries(session.placements).filter(([slot,label])=>slot===label)),checked:false,completed:false};}
export function solution(session,activity){return {...session,placements:Object.fromEntries(activity.items.map(i=>[i.id,i.id])),checked:true,assisted:true,completed:true};}
export function hydrate(raw,activities){
 const clean={active:activities[0].id,theme:'dark',sessions:{}};
 if(!raw||raw.version!==VERSION)return clean;
 if(activities.some(a=>a.id===raw.active))clean.active=raw.active;
 if(raw.theme==='light')clean.theme='light';
 for(const a of activities){const s=raw.sessions?.[a.id];if(!s||typeof s!=='object')continue;
  const used=new Set(),placements={};
  for(const i of a.items){let label=s.placements?.[i.id];if(typeof label==='string'&&a.items.some(j=>j.id===label)&&!used.has(label)){placements[i.id]=label;used.add(label)}}
  const candidate={...emptySession(),placements,attempts:Number.isSafeInteger(s.attempts)&&s.attempts>=0?Math.min(s.attempts,999999):0,checked:s.checked===true,assisted:s.assisted===true,mode:s.mode==='recall'?'recall':'learn'};
  candidate.completed=candidate.checked&&grade(candidate,a).complete;
  clean.sessions[a.id]=candidate;
 }
 return clean;
}
export function shuffled(items,random=Math.random){const result=[...items];for(let i=result.length-1;i>0;i--){let j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
