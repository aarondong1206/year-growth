(function(root){
'use strict';
const VERSION=3,PAPER_COUNT=10;
const FOUNDATION={start:'2026-09-21',end:'2026-11-06',diagnosticDate:'2026-11-07'};
const isObject=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
const validDate=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value+'T00:00:00Z'))&&new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value;
const integer=(value,min,max)=>Number.isInteger(value)&&value>=min&&value<=max;
const paperId=index=>`paper-${index}`;

function defaultPaper(index){
 return {title:index===1?'首次诊断卷':`第 ${index} 套真题`,source:'paper',status:'not_started',completedOn:null,scores:{},notes:''};
}

function ensure(state,catalog=[]){
 if(!isObject(state.settings))state.settings={};
 const previous=state.settings.englishTraining;
 if(!isObject(previous)){
  state.settings.englishTraining={version:VERSION,diagnostic:{},courses:{},papers:{},paperOrder:Array.from({length:PAPER_COUNT},(_,i)=>paperId(i+1)),foundationRound:{...FOUNDATION},courseLinks:{},legacyPurgedAt:null};
 }else if(previous.version<VERSION){
  state.settings.englishTraining={version:VERSION,diagnostic:isObject(previous.diagnostic)?previous.diagnostic:{},courses:isObject(previous.courses)?previous.courses:{},papers:isObject(previous.papers)?previous.papers:{},paperOrder:Array.isArray(previous.paperOrder)?previous.paperOrder:Array.from({length:PAPER_COUNT},(_,i)=>paperId(i+1)),foundationRound:{...FOUNDATION},courseLinks:isObject(previous.courseLinks)?previous.courseLinks:{},legacyPurgedAt:previous.legacyPurgedAt||null};
 }
 const data=state.settings.englishTraining;
 if(!isObject(data.diagnostic))data.diagnostic={};
 if(!isObject(data.courses))data.courses={};
 if(!isObject(data.papers))data.papers={};
 if(!isObject(data.courseLinks))data.courseLinks={};
 if(!Array.isArray(data.paperOrder)||data.paperOrder.length!==PAPER_COUNT)data.paperOrder=Array.from({length:PAPER_COUNT},(_,i)=>paperId(i+1));
 if(!isObject(data.foundationRound))data.foundationRound={...FOUNDATION};
 data.foundationRound={...FOUNDATION};
 if(data.legacyPurgedAt===undefined)data.legacyPurgedAt=null;
 for(let index=1;index<=PAPER_COUNT;index++){
  const id=paperId(index);
  if(!isObject(data.papers[id]))data.papers[id]=defaultPaper(index);
 }
 const legacyByPath=new Map(Object.entries(data.courses).map(([id,value])=>[value?.path||id,value]));
 for(const course of catalog){
  const current=isObject(data.courses[course.id])?data.courses[course.id]:(isObject(legacyByPath.get(course.path))?legacyByPath.get(course.path):{});
  const linkedPaper=course.paperId||data.courseLinks[course.id]||null;
  data.courses[course.id]={unlocked:!course.lockedUntilPaper,done:!!current.done,completedOn:current.completedOn||null,path:course.path};
  if(linkedPaper)data.courseLinks[course.id]=linkedPaper;
 }
 return data;
}

function purgeLegacy(state){
 const data=ensure(state);
 if(data.legacyPurgedAt)return false;
 state.tasks={};state.courses={};state.practice=[];state.notes='';state.customTasks=[];
 state.logs=state.logs.filter(log=>log.id?.startsWith('maimemo-')||log.id?.startsWith('english-course:'));
 data.legacyPurgedAt=new Date().toISOString();
 const first=data.papers['paper-1'];
 if(first?.status!=='completed')data.diagnostic={};
 return true;
}

function validateDiagnostic(diagnostic){
 if(!isObject(diagnostic))throw Error('六级诊断记录无效。');
 if(!Object.keys(diagnostic).length)return;
 const ranges={listening:[0,25],cloze:[0,10],matching:[0,10],careful:[0,10],writing:[0,3],translation:[0,3],longSentenceErrors:[0,99]};
 for(const [key,[min,max]] of Object.entries(ranges))if(!integer(diagnostic[key],min,max))throw Error('六级诊断分数无效。');
 if(diagnostic.retestListening!==null&&diagnostic.retestListening!==undefined&&!integer(diagnostic.retestListening,0,25))throw Error('六级听力复测分数无效。');
 if(typeof diagnostic.updatedAt!=='string'||Number.isNaN(Date.parse(diagnostic.updatedAt)))throw Error('六级诊断时间无效。');
}

function validateState(state){
 const data=state.settings?.englishTraining;
 if(data===undefined)return;
 if(!isObject(data)||![1,2,VERSION].includes(data.version)||!isObject(data.diagnostic)||!isObject(data.courses)||!isObject(data.papers)||!Array.isArray(data.paperOrder))throw Error('六级训练记录无效。');
 validateDiagnostic(data.diagnostic);
 for(const course of Object.values(data.courses)){
  if(!isObject(course)||typeof course.unlocked!=='boolean'||typeof course.done!=='boolean'||(course.completedOn!==null&&!validDate(course.completedOn)))throw Error('六级网课记录无效。');
 }
 const ids=Array.from({length:PAPER_COUNT},(_,i)=>paperId(i+1));
 if(data.paperOrder.length!==PAPER_COUNT||new Set(data.paperOrder).size!==PAPER_COUNT||data.paperOrder.some(id=>!ids.includes(id)))throw Error('六级真题顺序无效。');
 for(const id of ids){
  const paper=data.papers[id];
  if(!isObject(paper)||typeof paper.title!=='string'||paper.title.length>100||!['paper','local','download'].includes(paper.source)||!['not_started','answered','correcting','completed'].includes(paper.status)||typeof paper.notes!=='string'||paper.notes.length>2000||!isObject(paper.scores))throw Error('六级真题记录无效。');
  if(paper.completedOn!==null&&!validDate(paper.completedOn))throw Error('六级真题完成日期无效。');
  if(paper.answeredOn!==undefined&&paper.answeredOn!==null&&!validDate(paper.answeredOn))throw Error('六级真题作答日期无效。');
  if(paper.correctedOn!==undefined&&paper.correctedOn!==null&&!validDate(paper.correctedOn))throw Error('六级真题订正日期无效。');
  if(paper.status==='completed'&&(!paper.answeredOn||!paper.correctedOn))throw Error('真题必须完成限时作答和订正后才能标记完成。');
  const scoreRanges={listening:[0,25],cloze:[0,10],matching:[0,10],careful:[0,10],writing:[0,3],translation:[0,3]};
  scoreRanges.longSentenceErrors=[0,99];
  for(const [key,value] of Object.entries(paper.scores))if(!scoreRanges[key]||!integer(value,scoreRanges[key][0],scoreRanges[key][1]))throw Error('六级真题分项成绩无效。');
 }
 if(data.version===VERSION){
  if(!isObject(data.foundationRound)||data.foundationRound.start!==FOUNDATION.start||data.foundationRound.end!==FOUNDATION.end||data.foundationRound.diagnosticDate!==FOUNDATION.diagnosticDate)throw Error('六级基础轮次记录无效。');
  if(!isObject(data.courseLinks))throw Error('六级真题讲解关联记录无效。');
  if(data.legacyPurgedAt!==null&&(typeof data.legacyPurgedAt!=='string'||Number.isNaN(Date.parse(data.legacyPurgedAt))))throw Error('六级迁移记录无效。');
 }
}

function applyDiagnostic(state,input,catalog=[]){
 const data=ensure(state,catalog);
 const diagnostic={
  listening:Number(input.listening),cloze:Number(input.cloze),matching:Number(input.matching),careful:Number(input.careful),
  writing:Number(input.writing),translation:Number(input.translation),longSentenceErrors:Number(input.longSentenceErrors),
  retestListening:input.retestListening===''||input.retestListening===null||input.retestListening===undefined?null:Number(input.retestListening),updatedAt:String(input.updatedAt||new Date().toISOString())
 };
 validateDiagnostic(diagnostic);
 const keys=new Set();
 if(diagnostic.listening<12){keys.add('listening-basic-1-4');keys.add('listening-tip-1');}
 else if(diagnostic.listening<=16){keys.add('listening-tip-1');keys.add('listening-tip-2');}
 if(diagnostic.retestListening!==null&&diagnostic.retestListening<14)keys.add('listening-basic-5-8');
 if(diagnostic.matching<7)keys.add('reading-matching');
 if(diagnostic.careful<6)keys.add('reading-careful');
 if(diagnostic.cloze<5)keys.add('reading-cloze');
 if(diagnostic.longSentenceErrors>=3){keys.add('grammar-participle');keys.add('grammar-relative');}
 if(diagnostic.writing<=1)keys.add('writing-first');
 if(diagnostic.translation<=1)keys.add('translation-strategy');
 for(const course of catalog)data.courses[course.id].unlocked=true;
 data.diagnostic=diagnostic;
 return data;
}

function syncDiagnosticFromFirstPaper(state,catalog=[]){
 const data=ensure(state,catalog),paper=data.papers['paper-1'],scores=paper.scores||{};
 if(paper.status!=='completed'){data.diagnostic={};return null;}
 const required=['listening','cloze','matching','careful','writing','translation','longSentenceErrors'];
 if(required.some(key=>!Number.isInteger(scores[key])))throw Error('首次诊断卷完成前，请填写全部分项成绩和长难句错误数。');
 data.diagnostic={...Object.fromEntries(required.map(key=>[key,scores[key]])),retestListening:null,updatedAt:new Date().toISOString()};
 validateDiagnostic(data.diagnostic);
 return data.diagnostic;
}

function diagnosticFocus(diagnostic){
 if(!isObject(diagnostic)||!Object.keys(diagnostic).length)return [];
 const items=[];
 if(diagnostic.listening<17)items.push('听力：继续精听错题，优先辨音、连读和核心句');
 if(diagnostic.cloze<6)items.push('选词填空：先判断词性，再根据上下文排除');
 if(diagnostic.matching<7)items.push('段落匹配：强化关键词同义替换和段落定位');
 if(diagnostic.careful<6)items.push('仔细阅读：限时定位原文依据，逐项排除干扰');
 if(diagnostic.writing<=1)items.push('写作：固定三段结构，减少不稳定表达');
 if(diagnostic.translation<=1)items.push('翻译：先拆主干，再检查时态、单复数和拼写');
 if(diagnostic.longSentenceErrors>=3)items.push('长难句：复盘分词结构和定语从句');
 return items.length?items:['基础恢复效果稳定，后续以整卷节奏和错题复盘为主'];
}

function setCourseDone(state,catalog,id,checked,date){
 const data=ensure(state,catalog),course=catalog.find(item=>item.id===id);
 if(!course)throw Error('未找到这节网课。');
 if(isCourseLocked(data,course)&&!data.courses[id].done)throw Error('这节课程需要刷完对应试卷后再看。');
 if(typeof checked!=='boolean'||!validDate(date))throw Error('网课打卡信息无效。');
 const logId=`english-course:${id}`;
 state.logs=state.logs.filter(log=>log.id!==logId);
 data.courses[id].done=checked;
 data.courses[id].completedOn=checked?date:null;
 if(checked)state.logs.push({id:logId,taskId:logId,date,minutes:Math.ceil(course.durationSeconds/60)});
 return data.courses[id];
}

function isPaperComplete(data,id){const paper=data.papers?.[id];return !!paper&&paper.status==='completed'&&!!paper.answeredOn&&!!paper.correctedOn;}
function isCourseLocked(data,course){
 if(!course?.lockedUntilPaper)return false;
 const id=data.courseLinks?.[course.id]||course.paperId;
 return !id||!isPaperComplete(data,id);
}
function courseStats(data,catalog){
 const completed=catalog.filter(course=>data.courses[course.id]?.done);
 const core=catalog.filter(course=>course.priority==='core');
 const coreDone=core.filter(course=>data.courses[course.id]?.done);
 const watchable=catalog.filter(course=>!isCourseLocked(data,course)||data.courses[course.id]?.done);
 const watchableDone=watchable.filter(course=>data.courses[course.id]?.done);
 const locked=catalog.filter(course=>isCourseLocked(data,course)&&!data.courses[course.id]?.done);
 const totalSeconds=watchable.reduce((sum,course)=>sum+course.durationSeconds,0),doneSeconds=watchableDone.reduce((sum,course)=>sum+course.durationSeconds,0);
 const coreSeconds=core.reduce((sum,course)=>sum+course.durationSeconds,0),coreDoneSeconds=coreDone.reduce((sum,course)=>sum+course.durationSeconds,0);
 return {total:catalog.length,completed:completed.length,watchable:watchable.length,watchableCompleted:watchableDone.length,locked:locked.length,core:core.length,coreCompleted:coreDone.length,totalSeconds,doneSeconds,coreSeconds,coreDoneSeconds,percent:totalSeconds?Math.round(doneSeconds/totalSeconds*100):0,corePercent:coreSeconds?Math.round(coreDoneSeconds/coreSeconds*100):0};
}

function setCoursePaperLink(state,catalog,courseId,paperIdValue){
 const data=ensure(state,catalog),course=catalog.find(item=>item.id===courseId);
 if(!course)throw Error('未找到这节网课。');
 if(paperIdValue&&!data.papers[paperIdValue])throw Error('未找到关联试卷。');
 if(paperIdValue)data.courseLinks[courseId]=paperIdValue;else delete data.courseLinks[courseId];
 return data.courseLinks[courseId]||null;
}

function paperStats(data){
 const values=data.paperOrder.map(id=>data.papers[id]);
 const completed=values.filter(paper=>paper.status==='completed').length;
 return {completed,total:PAPER_COUNT,percent:Math.round(completed/PAPER_COUNT*100)};
}

function vocabularyStats(state,endDate='2026-12-11'){
 const daily=state.settings?.maimemo?.daily||{},entries=Object.entries(daily).filter(([date])=>date<=endDate),start='2026-09-21';
 const planned=Math.max(1,Math.floor((new Date(endDate+'T00:00:00Z')-new Date(start+'T00:00:00Z'))/86400000)+1);
 const valid=entries.filter(([,record])=>record.finished>0&&record.studyMinutes>0),last7=entries.sort(([a],[b])=>a.localeCompare(b)).slice(-7);
 const total=last7.reduce((sum,[,record])=>sum+record.total,0),finished=last7.reduce((sum,[,record])=>sum+record.finished,0);
 return {days:valid.length,planned,percent:Math.min(100,Math.round(valid.length/planned*100)),newWords:entries.reduce((sum,[,r])=>sum+r.newFinished,0),reviews:entries.reduce((sum,[,r])=>sum+r.reviewFinished,0),minutes:entries.reduce((sum,[,r])=>sum+r.studyMinutes,0),completionRate:total?Math.round(finished/total*100):0};
}

function dayMinutes(state,date){return state.logs.filter(log=>log.date===date&&(log.id?.startsWith('english-course:')||log.id===`maimemo-${date}`)).reduce((sum,log)=>sum+log.minutes,0);}

function movePaper(state,id,direction){
 const data=ensure(state),index=data.paperOrder.indexOf(id),next=index+direction;
 if(index<0||next<0||next>=data.paperOrder.length)return false;
 [data.paperOrder[index],data.paperOrder[next]]=[data.paperOrder[next],data.paperOrder[index]];
 return true;
}

const api={VERSION,PAPER_COUNT,FOUNDATION,ensure,purgeLegacy,validateState,applyDiagnostic,syncDiagnosticFromFirstPaper,diagnosticFocus,setCourseDone,isPaperComplete,isCourseLocked,setCoursePaperLink,courseStats,paperStats,vocabularyStats,dayMinutes,movePaper};
if(typeof module!=='undefined')module.exports=api;root.EnglishTrainingCore=api;
})(typeof window!=='undefined'?window:globalThis);
