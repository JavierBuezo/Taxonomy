import test from 'node:test';
import assert from 'node:assert/strict';
import {activities} from '../activities.js';
import {diagramSvg} from '../diagrams.js';
import {VERSION,emptySession,place,grade,check,retryErrors,solution,hydrate,shuffled} from '../model.js';
for(const a of activities){
 test(`${a.id}: every destination accepts its answer and completion persists`,()=>{let s=emptySession();for(const i of a.items)s=place(s,a,i.id,i.id);assert.equal(grade(s,a).complete,true);s=check(s,a);assert.equal(s.completed,true);assert.equal(s.attempts,1);assert.equal(s.assisted,false);let h=hydrate(JSON.parse(JSON.stringify({version:VERSION,active:a.id,sessions:{[a.id]:s}})),activities);assert.deepEqual(h.sessions[a.id],s);});
 test(`${a.id}: swapped answers fail, retry preserves correct placements`,()=>{let s=emptySession(),[a1,b1,c1]=a.items;s=place(s,a,a1.id,b1.id);s=place(s,a,b1.id,a1.id);s=place(s,a,c1.id,c1.id);s=check(s,a);assert.equal(grade(s,a).correct,1);assert.equal(grade(s,a).statuses[a1.id],'wrong');s=retryErrors(s,a);assert.deepEqual(s.placements,{[c1.id]:c1.id});assert.equal(s.checked,false);});
 test(`${a.id}: content and artwork are complete`,()=>{assert.equal(new Set(a.items.map(i=>i.id)).size,a.items.length);assert.ok(a.items.length>=4);for(const i of a.items){assert.ok(i.description.length>20);assert.ok(i.x>=225&&i.x<=680);assert.ok(i.y>=100&&i.y<=600);assert.ok(['left','right'].includes(i.side));}assert.ok(diagramSvg(a.diagram).includes('viewBox="0 0 900 640"'));assert.ok(!diagramSvg(a.diagram).includes('undefined'));});
}
const a=activities[0];
test('occupied destinations swap without duplication',()=>{let s=emptySession();s=place(s,a,'hoja','hoja');s=place(s,a,'tallo','tallo');s=place(s,a,'hoja','tallo');assert.deepEqual(s.placements,{tallo:'hoja',hoja:'tallo'});assert.equal(Object.values(s.placements).length,new Set(Object.values(s.placements)).size);});
test('moving to an empty destination frees previous destination',()=>{let s=place(emptySession(),a,'hoja','hoja');s=place(s,a,'tallo','hoja');assert.deepEqual(s.placements,{tallo:'hoja'});});
test('unplaced label replaces occupied target and displaced label becomes available',()=>{let s=place(emptySession(),a,'hoja','hoja');s=place(s,a,'hoja','tallo');assert.deepEqual(s.placements,{hoja:'tallo'});});
test('invalid placements do not mutate the session',()=>{let s=emptySession();assert.equal(place(s,a,'bad','hoja'),s);assert.equal(place(s,a,'hoja','bad'),s);assert.deepEqual(s,emptySession());});
test('empty and partial checks cannot complete an activity',()=>{assert.equal(check(emptySession(),a).completed,false);assert.equal(grade(emptySession(),a).correct,0);let s=place(emptySession(),a,'hoja','hoja');assert.equal(check(s,a).completed,false);});
test('solution is explicitly assisted and survives retry',()=>{let s=solution(emptySession(),a);assert.equal(s.completed,true);assert.equal(s.assisted,true);s=retryErrors(s,a);assert.equal(s.assisted,true);});
test('fresh reset sessions have no answer or help contamination',()=>{let old=solution(emptySession(),a);assert.ok(old.assisted);let next=emptySession();assert.equal(next.assisted,false);assert.deepEqual(next.placements,{});});
test('corrupt, foreign and unsupported stored data are safe',()=>{for(const raw of [null,{},'bad',{version:7},{version:1,active:'unknown',sessions:{planta:{placements:{hoja:'hoja',tallo:'hoja',bad:'bad'},attempts:-3,checked:true,completed:true}}}]){let h=hydrate(raw,activities);assert.equal(h.active,'planta');assert.ok(Object.values(h.sessions.planta?.placements??{}).every(x=>a.items.some(i=>i.id===x)));assert.equal(h.sessions.planta?.completed??false,false);}});
test('activity sessions stay independent',()=>{let h=hydrate({version:VERSION,active:a.id,sessions:{[a.id]:solution(emptySession(),a)}},activities);assert.equal(h.sessions[a.id].completed,true);assert.equal(h.sessions.flor,undefined);});
test('shuffle preserves labels and does not mutate source',()=>{const source=a.items.map(i=>i.id),copy=[...source],out=shuffled(source,()=>0);assert.deepEqual(source,copy);assert.deepEqual([...out].sort(),[...copy].sort());assert.notDeepEqual(out,copy);});
test('all ids and titles are unique',()=>{assert.equal(new Set(activities.map(a=>a.id)).size,activities.length);assert.equal(new Set(activities.map(a=>a.title)).size,activities.length);});

test("editing a completed activity clears completion until rechecked",()=>{let s=solution(emptySession(),a);s=place(s,a,"hoja","tallo");assert.equal(s.completed,false);assert.equal(s.checked,false);assert.equal(grade(s,a).complete,false);});
