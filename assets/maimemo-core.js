(function(root){
'use strict';
const VERSION=1,DEFAULT_MINUTES=45,MAX_MINUTES=60;
const isObject=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
const validDate=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value;
const finiteInt=value=>Number.isInteger(value)&&value>=0;
const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
const median=values=>{const sorted=[...values].sort((a,b)=>a-b),middle=Math.floor(sorted.length/2);return sorted.length%2?sorted[middle]:(sorted[middle-1]+sorted[middle])/2;};
const dateAdd=(date,days)=>{const value=new Date(date+'T00:00:00Z');value.setUTCDate(value.getUTCDate()+days);return value.toISOString().slice(0,10);};

function ensure(state){
 if(!isObject(state.settings))state.settings={};
 if(!isObject(state.settings.maimemo)||state.settings.maimemo.version!==VERSION)state.settings.maimemo={version:VERSION,daily:{},recommendations:{}};
 const data=state.settings.maimemo;
 if(!isObject(data.daily))data.daily={};
 if(!isObject(data.recommendations))data.recommendations={};
 return data;
}

function validateRecord(record){
 if(!isObject(record)||!finiteInt(record.finished)||!finiteInt(record.total)||record.finished>record.total||!finiteInt(record.studyMinutes)||record.studyMinutes>1440||!finiteInt(record.newFinished)||!finiteInt(record.reviewFinished)||record.newFinished+record.reviewFinished>record.finished||typeof record.completed!=='boolean'||typeof record.syncedAt!=='string'||!record.syncedAt||Number.isNaN(Date.parse(record.syncedAt)))throw Error('墨墨每日记录无效。');
}

function validateState(state){
 const data=state.settings?.maimemo;if(data===undefined)return;
 if(!isObject(data)||data.version!==VERSION||!isObject(data.daily)||!isObject(data.recommendations))throw Error('墨墨学习记录无效。');
 for(const [date,record] of Object.entries(data.daily)){if(!validDate(date))throw Error('墨墨学习日期无效。');validateRecord(record);}
 for(const [date,item] of Object.entries(data.recommendations)){
  if(!validDate(date)||!isObject(item)||!['calibrating','green','yellow','red'].includes(item.status)||!finiteInt(item.targetMinutes)||item.targetMinutes>MAX_MINUTES||!finiteInt(item.recommendedTotal)||!finiteInt(item.tomorrowDue)||!finiteInt(item.advanceCount)||typeof item.reason!=='string')throw Error('墨墨动态建议无效。');
  if(item.executed!==undefined&&(!isObject(item.executed)||!finiteInt(item.executed.requested)||!finiteInt(item.executed.advanced)||typeof item.executed.at!=='string'||Number.isNaN(Date.parse(item.executed.at))))throw Error('墨墨提前复习记录无效。');
 }
}

function saveDaily(state,date,input){
 if(!validDate(date))throw Error('墨墨学习日期无效。');
 const record={
  finished:Math.round(Number(input.finished)),total:Math.round(Number(input.total)),studyMinutes:Math.round(Number(input.studyMinutes)),
  newFinished:Math.round(Number(input.newFinished)),reviewFinished:Math.round(Number(input.reviewFinished)),
  completed:Number(input.total)>0&&Number(input.finished)>=Number(input.total),syncedAt:String(input.syncedAt||new Date().toISOString())
 };
 validateRecord(record);ensure(state).daily[date]=record;
 const logId='maimemo-'+date;
 state.logs=state.logs.filter(log=>log.id!==logId);
 if(record.studyMinutes>0)state.logs.push({id:logId,taskId:'maimemo-vocab',date,minutes:record.studyMinutes});
 return record;
}

function windowRecords(daily,date,days=7){
 const start=dateAdd(date,-days+1);
 return Object.entries(daily).filter(([day])=>day>=start&&day<=date).sort(([a],[b])=>a.localeCompare(b)).map(([,record])=>record);
}

function stage(date){
 if(date>='2026-12-06')return 'final';
 if(date>='2026-11-29')return 'consolidate';
 if(date>='2026-11-15')return 'recent';
 return 'build';
}

function recommend(daily,forecast,date){
 if(!validDate(date))throw Error('建议日期无效。');
 const records=windowRecords(daily,date),valid=records.filter(record=>record.finished>0&&record.studyMinutes>0);
 const tomorrow=dateAdd(date,1),days=Array.isArray(forecast?.days)?forecast.days:[];
 const tomorrowDue=Math.max(0,Math.round(Number(days.find(item=>item.date===tomorrow)?.count||0)));
 const futureTotal=days.filter(item=>item.date>date&&item.date<=dateAdd(date,7)).reduce((sum,item)=>sum+Math.max(0,Math.round(Number(item.count)||0)),0);
 const current=daily[date]||{finished:0,total:0,studyMinutes:0,completed:false};
 const currentStage=stage(date),targetMinutes=date==='2026-12-11'?20:currentStage==='final'?30:DEFAULT_MINUTES;
 if(valid.length<3){return {status:'calibrating',targetMinutes,recommendedTotal:Math.max(tomorrowDue,current.total||tomorrowDue),tomorrowDue,advanceCount:0,speedSeconds:null,capacity45:null,capacity60:null,completionRate:null,averageMinutes:null,reason:`还需${3-valid.length}个有效学习日完成速度校准；当前保持墨墨原学习量。`};}
 const sample=valid.slice(-7),speedSeconds=median(sample.map(record=>record.studyMinutes*60/record.finished));
 const capacity45=Math.max(1,Math.floor(DEFAULT_MINUTES*60/speedSeconds)),capacity60=Math.max(capacity45,Math.floor(MAX_MINUTES*60/speedSeconds));
 const denominator=records.reduce((sum,record)=>sum+record.total,0),completionRate=denominator?records.reduce((sum,record)=>sum+record.finished,0)/denominator:0;
 const averageMinutes=sample.reduce((sum,record)=>sum+record.studyMinutes,0)/sample.length;
 const attempted=records.filter(record=>record.total>0),lastTwo=attempted.slice(-2),twoIncomplete=lastTwo.length===2&&lastTwo.every(record=>!record.completed);
 const estimatedTodayMinutes=current.total?current.total*speedSeconds/60:0;
 let status=completionRate<.75||twoIncomplete||estimatedTodayMinutes>MAX_MINUTES?'red':completionRate>=.9&&averageMinutes<=DEFAULT_MINUTES?'green':'yellow';
 if(currentStage==='final'&&status==='green')status='yellow';
 const raw=tomorrowDue+Math.max(0,Math.floor((capacity45-tomorrowDue)*.7));
 const change=currentStage==='recent'?.10:.15,baseline=Math.max(1,current.total||tomorrowDue||raw);
 let recommendedTotal=Math.max(tomorrowDue,clamp(raw,Math.floor(baseline*(1-change)),Math.ceil(baseline*(1+change))));
 if(status==='red'||currentStage==='consolidate'||currentStage==='final')recommendedTotal=tomorrowDue;
 if(status==='yellow')recommendedTotal=Math.max(tomorrowDue,Math.min(baseline,recommendedTotal));
 let advanceCount=0;
 if(status==='green'&&current.completed&&current.studyMinutes<DEFAULT_MINUTES&&currentStage!=='final')advanceCount=Math.min(40,futureTotal,Math.max(0,Math.floor((DEFAULT_MINUTES-current.studyMinutes)*60/speedSeconds*.7)));
 const reasons={green:'近7日完成稳定，可在保留30%缓冲后小幅推进。',yellow:'当前效率适合保持节奏，先完成复习，不安排额外加量。',red:'检测到未完成、超时或任务积压，暂停新增并优先清空复习。'};
 if(currentStage==='consolidate')reasons[status]+=' 已进入巩固期，不再扩大新词量。';
 if(currentStage==='final')reasons[status]+=' 已进入考前减量期，只完成当天复习。';
 return {status,targetMinutes,recommendedTotal,tomorrowDue,advanceCount,speedSeconds:Math.round(speedSeconds*10)/10,capacity45,capacity60,completionRate:Math.round(completionRate*1000)/1000,averageMinutes:Math.round(averageMinutes*10)/10,reason:reasons[status]};
}

function streak(daily,date){let count=0;for(let day=date;daily[day]?.completed;day=dateAdd(day,-1))count++;return count;}
function weekStats(daily,date){const start=dateAdd(date,-new Date(date+'T00:00:00Z').getUTCDay()),records=Object.entries(daily).filter(([day])=>day>=start&&day<=dateAdd(start,6)).map(([,record])=>record);return {minutes:records.reduce((sum,r)=>sum+r.studyMinutes,0),days:records.filter(r=>r.completed).length,newWords:records.reduce((sum,r)=>sum+r.newFinished,0),reviews:records.reduce((sum,r)=>sum+r.reviewFinished,0),average:records.length?Math.round(records.reduce((sum,r)=>sum+r.studyMinutes,0)/records.length):0};}

const api={VERSION,DEFAULT_MINUTES,MAX_MINUTES,ensure,validateState,saveDaily,recommend,streak,weekStats,dateAdd,stage};
if(typeof module!=='undefined')module.exports=api;root.MaimemoCore=api;
})(typeof window!=='undefined'?window:globalThis);
