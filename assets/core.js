(function(root){
'use strict';
const T=typeof module!=='undefined'?require('./thesis-core.js'):root.ThesisCore;
const M=typeof module!=='undefined'?require('./maimemo-core.js'):root.MaimemoCore;
const E=typeof module!=='undefined'?require('./english-training-core.js'):root.EnglishTrainingCore;
const IDS=['loma','english','thesis','law','ai','insurance'];
const prefix='year-growth:v1:';
function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
function validDate(s){return typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!isNaN(new Date(s+'T00:00:00Z'))&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;}
function addDays(s,n){const d=new Date(s+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);}
function weekOf(date){const d=new Date(date+'T00:00:00Z');return addDays(date,-d.getUTCDay());}
function empty(){return {version:1,tasks:{},courses:{},logs:[],practice:[],notes:'',customTasks:[],settings:{}};}
function object(x){return !!x&&typeof x==='object'&&!Array.isArray(x);}
function check(s){
 if(!object(s)||s.version!==1||!object(s.tasks)||!object(s.courses)||!Array.isArray(s.logs)||!Array.isArray(s.practice)||!Array.isArray(s.customTasks)||typeof s.notes!=='string'||!object(s.settings))throw Error('备份结构或版本不兼容，原记录未更改。');
 if(s.logs.some(x=>!object(x)||!validDate(x.date)||!Number.isFinite(x.minutes)||x.minutes<0||x.minutes>1440||typeof x.taskId!=='string'))throw Error('用时记录无效。');
 for(const [id,t] of Object.entries(s.tasks)){
  if(!object(t)||id==='__proto__'||id==='constructor'||(t.due&&!validDate(t.due))||(t.completedOn!==undefined&&!validDate(t.completedOn))||(t.note!==undefined&&typeof t.note!=='string')||(t.done!==undefined&&typeof t.done!=='boolean')||(t.checks!==undefined&&(!Array.isArray(t.checks)||t.checks.length!==3||t.checks.some(x=>typeof x!=='boolean')))||(t.minutes!==undefined&&(!Number.isFinite(t.minutes)||t.minutes<0||t.minutes>10000)))throw Error('任务记录无效。');
 }
 for(const c of s.customTasks)if(!object(c)||typeof c.id!=='string'||!c.id.startsWith('custom-')||typeof c.title!=='string'||!validDate(c.due)||!Number.isFinite(c.minutes)||c.minutes<0||c.minutes>10000||typeof c.category!=='string')throw Error('自定义任务无效。');
 for(const c of Object.values(s.courses))if(!object(c)||(c.done!==undefined&&typeof c.done!=='boolean')||(c.url!==undefined&&!safeUrl(c.url)))throw Error('课程记录无效。');
 for(const p of s.practice)if(!object(p)||!validDate(p.date)||typeof p.category!=='string'||!Number.isFinite(p.total)||p.total<0||!Number.isFinite(p.correct)||p.correct<0||p.correct>p.total||!Number.isFinite(p.minutes)||p.minutes<0||p.minutes>1440||typeof p.note!=='string')throw Error('练习记录无效。');
 if(s.settings.milestones!==undefined&&(!object(s.settings.milestones)||Object.values(s.settings.milestones).some(x=>!validDate(x))))throw Error('节点日期无效。');
 if(M)M.validateState(s);
 if(E)E.validateState(s);
 if(T)T.validateState(s);
 return s;
}
function load(storage,id){const raw=storage.getItem(prefix+id);return raw?check(JSON.parse(raw)):empty();}
function save(storage,id,state){if(!IDS.includes(id))throw Error('未知项目');check(state);storage.setItem(prefix+id,JSON.stringify(state));}
function backup(storage,ids=IDS){return {format:'year-growth',version:1,exportedAt:new Date().toISOString(),modules:Object.fromEntries(ids.map(id=>[id,load(storage,id)]))};}
function restore(storage,value,only){
 if(!object(value)||value.format!=='year-growth'||value.version!==1||!object(value.modules))throw Error('这不是有效的全年提升备份。');
 const ids=Object.keys(value.modules);if(!ids.length||ids.some(id=>!IDS.includes(id)))throw Error('备份含未知项目。');
 const selected=only?[only]:ids;if(only&&!value.modules[only])throw Error('备份中没有当前项目。');
 selected.forEach(id=>check(value.modules[id]));
 const old=Object.fromEntries(selected.map(id=>[id,storage.getItem(prefix+id)]));
 try{selected.forEach(id=>save(storage,id,value.modules[id]));}catch(e){selected.forEach(id=>{if(old[id]===null)storage.removeItem(prefix+id);else storage.setItem(prefix+id,old[id]);});throw e;}
 return selected;
}
function taskDone(t,s){if(t.id?.startsWith('english-course:'))return !!s.settings?.englishTraining?.courses?.[t.id.slice(15)]?.done;const x=s.tasks[t.id]||{};if(t.completion==='checkin')return x.done??!!x.checks?.[0];return t.kind==='chapter'?Array.isArray(x.checks)&&x.checks.every(Boolean):!!x.done;}
function setChapterDone(t,s,done,date=today()){
 if(t.completion!=='checkin'||typeof done!=='boolean'||!validDate(date))throw Error('章节打卡无效。');
 const x={...s.tasks[t.id],done,updatedAt:new Date().toISOString()};
 if(done)x.completedOn=date;else delete x.completedOn;
 s.tasks[t.id]=x;
}
function effective(t,s){const x=s.tasks[t.id]||{};return {...t,due:x.due||t.due,minutes:x.minutes??t.minutes};}
function tasks(plan,id,s){if(id==='thesis'&&T)return T.tasks(plan,s);if(id==='loma')return plan.tasks.loma.filter(t=>t.kind==='chapter');return [...plan.tasks[id],...s.customTasks].map(t=>effective(t,s));}
function summary(plan,id,s,week){const list=tasks(plan,id,s);const end=addDays(week,6);const within=id==='loma'?[]:list.filter(t=>t.due>=week&&t.due<=end);return {total:list.length,done:list.filter(t=>taskDone(t,s)).length,weekTasks:within,weekDone:within.filter(t=>taskDone(t,s)).length,planned:within.reduce((n,t)=>n+t.minutes,0),actual:s.logs.filter(l=>l.date>=week&&l.date<=end).reduce((n,l)=>n+l.minutes,0),overdue:id==='loma'?0:list.filter(t=>t.due<today()&&!taskDone(t,s)).length};}
function safeUrl(s){try{const u=new URL(s);return /^https?:$/.test(u.protocol)?u.href:'';}catch{return '';}}
const api={IDS,prefix,today,validDate,addDays,weekOf,empty,check,load,save,backup,restore,taskDone,setChapterDone,effective,tasks,summary,safeUrl};
if(typeof module!=='undefined')module.exports=api;root.YearCore=api;
})(typeof window!=='undefined'?window:globalThis);
