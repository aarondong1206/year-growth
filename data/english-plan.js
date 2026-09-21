(function(root){
'use strict';
const plan=root.YEAR_PLAN;if(!plan)throw new Error('YEAR_PLAN must load before english-plan.js');
const weeks=[
 {
  "id": "week-1",
  "number": 1,
  "start": "2026-09-21",
  "end": "2026-09-27",
  "title": "听力基础前半段、听音辨音与基础词汇恢复"
 },
 {
  "id": "week-2",
  "number": 2,
  "start": "2026-09-28",
  "end": "2026-10-04",
  "title": "听力基础后半段、听力技巧"
 },
 {
  "id": "week-3",
  "number": 3,
  "start": "2026-10-05",
  "end": "2026-10-11",
  "title": "六级听力技巧、分词状语、定语从句"
 },
 {
  "id": "week-4",
  "number": 4,
  "start": "2026-10-12",
  "end": "2026-10-18",
  "title": "段落匹配、仔细阅读、选词填空"
 },
 {
  "id": "week-5",
  "number": 5,
  "start": "2026-10-19",
  "end": "2026-10-25",
  "title": "写作首段与主体、翻译基础策略"
 },
 {
  "id": "week-6",
  "number": 6,
  "start": "2026-10-26",
  "end": "2026-11-01",
  "title": "六级核心技巧整合、词汇与长难句回收"
 },
 {
  "id": "week-7",
  "number": 7,
  "start": "2026-11-02",
  "end": "2026-11-07",
  "title": "补齐核心课、综合复盘与首次诊断"
 }
];
const tasks=[
 {id:'english-course:cet6-001-01-2026-六级全程2班-02-课程-01-视频-01-六级核心技巧-01-词汇-前缀',courseId:'cet6-001-01-2026-六级全程2班-02-课程-01-视频-01-六级核心技巧-01-词汇-前缀',title:"【词汇】前缀",category:'vocabulary',due:'2026-09-27',minutes:70,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-002-01-2026-六级全程2班-02-课程-01-视频-01-六级核心技巧-02-词汇-后缀',courseId:'cet6-002-01-2026-六级全程2班-02-课程-01-视频-01-六级核心技巧-02-词汇-后缀',title:"【词汇】后缀",category:'vocabulary',due:'2026-09-27',minutes:42,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-003-01-2026-六级全程2班-02-课程-01-视频-01-六级核心技巧-03-词汇-词根',courseId:'cet6-003-01-2026-六级全程2班-02-课程-01-视频-01-六级核心技巧-03-词汇-词根',title:"【词汇】词根",category:'vocabulary',due:'2026-09-27',minutes:64,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-013-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-01-词汇-前缀',courseId:'cet6-013-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-01-词汇-前缀',title:"【词汇】前缀",category:'vocabulary',due:'2026-09-27',minutes:70,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-014-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-02-词汇-词根',courseId:'cet6-014-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-02-词汇-词根',title:"【词汇】词根",category:'vocabulary',due:'2026-09-27',minutes:64,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-015-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-03-词汇-后缀',courseId:'cet6-015-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-03-词汇-后缀',title:"【词汇】后缀",category:'vocabulary',due:'2026-09-27',minutes:42,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:listening-basic-1',courseId:'listening-basic-1',title:"四级听力基础包1",category:'listening',due:'2026-09-27',minutes:72,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:listening-basic-2',courseId:'listening-basic-2',title:"四级听力基础包2",category:'listening',due:'2026-09-27',minutes:42,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:listening-basic-3',courseId:'listening-basic-3',title:"四级听力基础包3",category:'listening',due:'2026-09-27',minutes:66,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:listening-basic-4',courseId:'listening-basic-4',title:"四级听力基础包4",category:'listening',due:'2026-09-27',minutes:62,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:listening-basic-5',courseId:'listening-basic-5',title:"四级听力基础包5",category:'listening',due:'2026-09-27',minutes:62,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-100-02-活动赠课-四六级听力基础包-02-课程-01-视频-01-听力基础包-10-四级听力基础包10',courseId:'cet6-100-02-活动赠课-四六级听力基础包-02-课程-01-视频-01-听力基础包-10-四级听力基础包10',title:"四级听力基础包10",category:'listening',due:'2026-09-27',minutes:79,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-102-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-01-六级真题核心句1',courseId:'cet6-102-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-01-六级真题核心句1',title:"六级真题核心句1",category:'listening',due:'2026-09-27',minutes:101,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-103-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-02-六级真题核心句2',courseId:'cet6-103-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-02-六级真题核心句2',title:"六级真题核心句2",category:'listening',due:'2026-09-27',minutes:23,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-104-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-03-六级真题核心句3',courseId:'cet6-104-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-03-六级真题核心句3',title:"六级真题核心句3",category:'listening',due:'2026-09-27',minutes:22,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-105-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-04-六级真题核心句4',courseId:'cet6-105-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-04-六级真题核心句4',title:"六级真题核心句4",category:'listening',due:'2026-09-27',minutes:27,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-106-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-05-六级真题核心句5',courseId:'cet6-106-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-05-六级真题核心句5',title:"六级真题核心句5",category:'listening',due:'2026-09-27',minutes:21,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-111-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-10-六级真题核心句10',courseId:'cet6-111-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-10-六级真题核心句10',title:"六级真题核心句10",category:'listening',due:'2026-09-27',minutes:24,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-112-02-活动赠课-四六级听力基础包-02-课程-02-伴学-01-伴学-四级听力基础包1-02-伴学视频',courseId:'cet6-112-02-活动赠课-四六级听力基础包-02-课程-02-伴学-01-伴学-四级听力基础包1-02-伴学视频',title:"01 [伴学]四级听力基础包1 02 伴学视频",category:'companion',due:'2026-09-27',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-113-02-活动赠课-四六级听力基础包-02-课程-02-伴学-01-伴学-四级听力基础包1-04-伴学视频',courseId:'cet6-113-02-活动赠课-四六级听力基础包-02-课程-02-伴学-01-伴学-四级听力基础包1-04-伴学视频',title:"01 [伴学]四级听力基础包1 04 伴学视频",category:'companion',due:'2026-09-27',minutes:2,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-114-02-活动赠课-四六级听力基础包-02-课程-02-伴学-02-伴学-四级听力基础包2-02-伴学视频',courseId:'cet6-114-02-活动赠课-四六级听力基础包-02-课程-02-伴学-02-伴学-四级听力基础包2-02-伴学视频',title:"02 [伴学]四级听力基础包2 02 伴学视频",category:'companion',due:'2026-09-27',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-115-02-活动赠课-四六级听力基础包-02-课程-02-伴学-02-伴学-四级听力基础包2-04-伴学视频',courseId:'cet6-115-02-活动赠课-四六级听力基础包-02-课程-02-伴学-02-伴学-四级听力基础包2-04-伴学视频',title:"02 [伴学]四级听力基础包2 04 伴学视频",category:'companion',due:'2026-09-27',minutes:2,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-116-02-活动赠课-四六级听力基础包-02-课程-02-伴学-03-伴学-四级听力基础包3-02-伴学视频',courseId:'cet6-116-02-活动赠课-四六级听力基础包-02-课程-02-伴学-03-伴学-四级听力基础包3-02-伴学视频',title:"03 [伴学]四级听力基础包3 02 伴学视频",category:'companion',due:'2026-09-27',minutes:2,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-117-02-活动赠课-四六级听力基础包-02-课程-02-伴学-03-伴学-四级听力基础包3-04-伴学视频',courseId:'cet6-117-02-活动赠课-四六级听力基础包-02-课程-02-伴学-03-伴学-四级听力基础包3-04-伴学视频',title:"03 [伴学]四级听力基础包3 04 伴学视频",category:'companion',due:'2026-09-27',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-118-02-活动赠课-四六级听力基础包-02-课程-02-伴学-04-伴学-四级听力基础包4-02-伴学视频',courseId:'cet6-118-02-活动赠课-四六级听力基础包-02-课程-02-伴学-04-伴学-四级听力基础包4-02-伴学视频',title:"04 [伴学]四级听力基础包4 02 伴学视频",category:'companion',due:'2026-09-27',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-119-02-活动赠课-四六级听力基础包-02-课程-02-伴学-04-伴学-四级听力基础包4-04-伴学视频',courseId:'cet6-119-02-活动赠课-四六级听力基础包-02-课程-02-伴学-04-伴学-四级听力基础包4-04-伴学视频',title:"04 [伴学]四级听力基础包4 04 伴学视频",category:'companion',due:'2026-09-27',minutes:2,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:listening-basic-6',courseId:'listening-basic-6',title:"四级听力基础包6",category:'listening',due:'2026-10-04',minutes:62,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:listening-basic-7',courseId:'listening-basic-7',title:"四级听力基础包7",category:'listening',due:'2026-10-04',minutes:63,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:listening-basic-8',courseId:'listening-basic-8',title:"四级听力基础包8",category:'listening',due:'2026-10-04',minutes:74,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-099-02-活动赠课-四六级听力基础包-02-课程-01-视频-01-听力基础包-09-四级听力基础包9',courseId:'cet6-099-02-活动赠课-四六级听力基础包-02-课程-01-视频-01-听力基础包-09-四级听力基础包9',title:"四级听力基础包9",category:'listening',due:'2026-10-04',minutes:73,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-107-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-06-六级真题核心句6',courseId:'cet6-107-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-06-六级真题核心句6',title:"六级真题核心句6",category:'listening',due:'2026-10-04',minutes:21,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-108-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-07-六级真题核心句7',courseId:'cet6-108-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-07-六级真题核心句7',title:"六级真题核心句7",category:'listening',due:'2026-10-04',minutes:20,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-109-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-08-六级真题核心句8',courseId:'cet6-109-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-08-六级真题核心句8',title:"六级真题核心句8",category:'listening',due:'2026-10-04',minutes:29,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-110-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-09-六级真题核心句9',courseId:'cet6-110-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-09-六级真题核心句9',title:"六级真题核心句9",category:'listening',due:'2026-10-04',minutes:21,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:grammar-participle',courseId:'grammar-participle',title:"【语法】分词状语",category:'grammar',due:'2026-10-11',minutes:114,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:grammar-relative',courseId:'grammar-relative',title:"【语法】定语从句",category:'grammar',due:'2026-10-11',minutes:125,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:listening-tip-1',courseId:'listening-tip-1',title:".【听力】技巧与例题（1)",category:'listening',due:'2026-10-11',minutes:91,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:listening-tip-2',courseId:'listening-tip-2',title:".【听力】技巧与例题（2)",category:'listening',due:'2026-10-11',minutes:91,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-067-01-2026-六级全程2班-02-课程-01-视频-10-六级口语考试-口语课-01-口语-口语1',courseId:'cet6-067-01-2026-六级全程2班-02-课程-01-视频-10-六级口语考试-口语课-01-口语-口语1',title:"【口语】口语1",category:'oral',due:'2026-10-11',minutes:62,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-068-01-2026-六级全程2班-02-课程-01-视频-10-六级口语考试-口语课-02-口语-口语2',courseId:'cet6-068-01-2026-六级全程2班-02-课程-01-视频-10-六级口语考试-口语课-02-口语-口语2',title:"【口语】口语2",category:'oral',due:'2026-10-11',minutes:60,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-069-01-2026-六级全程2班-02-课程-01-视频-10-六级口语考试-口语课-03-口语-口语3',courseId:'cet6-069-01-2026-六级全程2班-02-课程-01-视频-10-六级口语考试-口语课-03-口语-口语3',title:"【口语】口语3",category:'oral',due:'2026-10-11',minutes:61,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-077-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-41-口语伴学口语1-41-1-伴学视频',courseId:'cet6-077-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-41-口语伴学口语1-41-1-伴学视频',title:"41 口语伴学口语1 [41.1]--伴学视频",category:'oral',due:'2026-10-11',minutes:16,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-078-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-41-口语伴学口语1-41-2-伴学视频',courseId:'cet6-078-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-41-口语伴学口语1-41-2-伴学视频',title:"41 口语伴学口语1 [41.2]--伴学视频",category:'oral',due:'2026-10-11',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-079-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-42-口语伴学口语2-42-1-伴学视频',courseId:'cet6-079-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-42-口语伴学口语2-42-1-伴学视频',title:"42 口语伴学口语2 [42.1]--伴学视频",category:'oral',due:'2026-10-11',minutes:2,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-080-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-1-伴学视频',courseId:'cet6-080-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-1-伴学视频',title:"43 口语伴学口语3 [43.1]--伴学视频",category:'oral',due:'2026-10-11',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-081-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-2-伴学视频',courseId:'cet6-081-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-2-伴学视频',title:"43 口语伴学口语3 [43.2]--伴学视频",category:'oral',due:'2026-10-11',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-082-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-3-伴学视频',courseId:'cet6-082-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-3-伴学视频',title:"43 口语伴学口语3 [43.3]--伴学视频",category:'oral',due:'2026-10-11',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-083-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-4-伴学视频',courseId:'cet6-083-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-4-伴学视频',title:"43 口语伴学口语3 [43.4]--伴学视频",category:'oral',due:'2026-10-11',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-084-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-5-伴学视频',courseId:'cet6-084-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-5-伴学视频',title:"43 口语伴学口语3 [43.5]--伴学视频",category:'oral',due:'2026-10-11',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-085-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-6-伴学视频',courseId:'cet6-085-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-6-伴学视频',title:"43 口语伴学口语3 [43.6]--伴学视频",category:'oral',due:'2026-10-11',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-086-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-7-伴学视频',courseId:'cet6-086-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-7-伴学视频',title:"43 口语伴学口语3 [43.7]--伴学视频",category:'oral',due:'2026-10-11',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-087-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-8-伴学视频',courseId:'cet6-087-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-8-伴学视频',title:"43 口语伴学口语3 [43.8]--伴学视频",category:'oral',due:'2026-10-11',minutes:2,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-088-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-9-伴学视频-1',courseId:'cet6-088-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-9-伴学视频-1',title:"43 口语伴学口语3 [43.9]--伴学视频 (1)",category:'oral',due:'2026-10-11',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:reading-matching',courseId:'reading-matching',title:"【阅读】段落匹配技巧精讲",category:'reading',due:'2026-10-18',minutes:118,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:reading-careful',courseId:'reading-careful',title:".【阅读】仔细阅读",category:'reading',due:'2026-10-18',minutes:131,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:reading-cloze',courseId:'reading-cloze',title:".【阅读】选词填空技巧精讲",category:'reading',due:'2026-10-18',minutes:102,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:translation-strategy',courseId:'translation-strategy',title:".【六级翻译】翻译备考攻略1",category:'translation',due:'2026-10-25',minutes:93,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:writing-first',courseId:'writing-first',title:".六级全程班【写作】第一段写作",category:'writing',due:'2026-10-25',minutes:108,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-070-01-2026-六级全程2班-02-课程-01-视频-10-六级口语考试-口语课-04-口语-口语4',courseId:'cet6-070-01-2026-六级全程2班-02-课程-01-视频-10-六级口语考试-口语课-04-口语-口语4',title:"【口语】口语4",category:'oral',due:'2026-10-25',minutes:60,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-089-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-44-口语伴学口语4-44-1-伴学视频',courseId:'cet6-089-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-44-口语伴学口语4-44-1-伴学视频',title:"44 口语伴学口语4 [44.1]--伴学视频",category:'oral',due:'2026-10-25',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-090-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-44-口语伴学口语4-44-2-伴学视频',courseId:'cet6-090-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-44-口语伴学口语4-44-2-伴学视频',title:"44 口语伴学口语4 [44.2]--伴学视频",category:'oral',due:'2026-10-25',minutes:1,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-016-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-04-六级词汇-词汇方法论',courseId:'cet6-016-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-04-六级词汇-词汇方法论',title:"【六级词汇】词汇方法论",category:'vocabulary',due:'2026-11-01',minutes:93,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-017-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-05-六级词汇-六级核心词汇-1',courseId:'cet6-017-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-05-六级词汇-六级核心词汇-1',title:"【六级词汇】六级核心词汇 1",category:'vocabulary',due:'2026-11-01',minutes:97,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-018-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-06-六级词汇-六级核心词汇-2',courseId:'cet6-018-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-06-六级词汇-六级核心词汇-2',title:"【六级词汇】六级核心词汇 2",category:'vocabulary',due:'2026-11-01',minutes:92,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-019-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-07-六级词汇-六级核心词汇3',courseId:'cet6-019-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-07-六级词汇-六级核心词汇3',title:".【六级词汇】六级核心词汇3",category:'vocabulary',due:'2026-11-01',minutes:92,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-020-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-08-六级词汇-六级核心词汇4',courseId:'cet6-020-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-08-六级词汇-六级核心词汇4',title:".【六级词汇】六级核心词汇4",category:'vocabulary',due:'2026-11-01',minutes:91,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-021-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-09-六级词汇-六级核心词汇5',courseId:'cet6-021-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-09-六级词汇-六级核心词汇5',title:".【六级词汇】六级核心词汇5",category:'vocabulary',due:'2026-11-01',minutes:99,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-022-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-10-六级词汇-六级核心词汇6',courseId:'cet6-022-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-10-六级词汇-六级核心词汇6',title:"【六级词汇】六级核心词汇6",category:'vocabulary',due:'2026-11-01',minutes:98,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-023-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-11-六级词汇-六级核心词汇7',courseId:'cet6-023-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-11-六级词汇-六级核心词汇7',title:".【六级词汇】六级核心词汇7",category:'vocabulary',due:'2026-11-01',minutes:44,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-024-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-12-六级词汇-六级核心词汇8',courseId:'cet6-024-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-12-六级词汇-六级核心词汇8',title:".【六级词汇】六级核心词汇8",category:'vocabulary',due:'2026-11-01',minutes:98,priority:'core',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'},
 {id:'english-course:cet6-101-02-活动赠课-四六级听力基础包-02-课程-01-视频-02-基础包伴学-01-作业彩蛋-怎样调音频语速',courseId:'cet6-101-02-活动赠课-四六级听力基础包-02-课程-01-视频-02-基础包伴学-01-作业彩蛋-怎样调音频语速',title:"[作业彩蛋] 怎样调音频语速",category:'companion',due:'2026-11-01',minutes:9,priority:'optional',kind:'task',detail:'完成视频后在“视频网课”中打卡；统计采用视频原始时长。'}
];
const weekRows=[
 {id:'week-1',number:1,start:'2026-09-21',end:'2026-09-27',title:"听力基础前半段、听音辨音与基础词汇恢复",courseIds:['cet6-001-01-2026-六级全程2班-02-课程-01-视频-01-六级核心技巧-01-词汇-前缀','cet6-002-01-2026-六级全程2班-02-课程-01-视频-01-六级核心技巧-02-词汇-后缀','cet6-003-01-2026-六级全程2班-02-课程-01-视频-01-六级核心技巧-03-词汇-词根','cet6-013-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-01-词汇-前缀','cet6-014-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-02-词汇-词根','cet6-015-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-03-词汇-后缀','listening-basic-1','listening-basic-2','listening-basic-3','listening-basic-4','listening-basic-5','cet6-100-02-活动赠课-四六级听力基础包-02-课程-01-视频-01-听力基础包-10-四级听力基础包10','cet6-102-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-01-六级真题核心句1','cet6-103-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-02-六级真题核心句2','cet6-104-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-03-六级真题核心句3','cet6-105-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-04-六级真题核心句4','cet6-106-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-05-六级真题核心句5','cet6-111-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-10-六级真题核心句10','cet6-112-02-活动赠课-四六级听力基础包-02-课程-02-伴学-01-伴学-四级听力基础包1-02-伴学视频','cet6-113-02-活动赠课-四六级听力基础包-02-课程-02-伴学-01-伴学-四级听力基础包1-04-伴学视频','cet6-114-02-活动赠课-四六级听力基础包-02-课程-02-伴学-02-伴学-四级听力基础包2-02-伴学视频','cet6-115-02-活动赠课-四六级听力基础包-02-课程-02-伴学-02-伴学-四级听力基础包2-04-伴学视频','cet6-116-02-活动赠课-四六级听力基础包-02-课程-02-伴学-03-伴学-四级听力基础包3-02-伴学视频','cet6-117-02-活动赠课-四六级听力基础包-02-课程-02-伴学-03-伴学-四级听力基础包3-04-伴学视频','cet6-118-02-活动赠课-四六级听力基础包-02-课程-02-伴学-04-伴学-四级听力基础包4-02-伴学视频','cet6-119-02-活动赠课-四六级听力基础包-02-课程-02-伴学-04-伴学-四级听力基础包4-04-伴学视频']} ,
 {id:'week-2',number:2,start:'2026-09-28',end:'2026-10-04',title:"听力基础后半段、听力技巧",courseIds:['listening-basic-6','listening-basic-7','listening-basic-8','cet6-099-02-活动赠课-四六级听力基础包-02-课程-01-视频-01-听力基础包-09-四级听力基础包9','cet6-107-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-06-六级真题核心句6','cet6-108-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-07-六级真题核心句7','cet6-109-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-08-六级真题核心句8','cet6-110-02-活动赠课-四六级听力基础包-02-课程-01-视频-03-听力基础包-09-六级真题核心句9']} ,
 {id:'week-3',number:3,start:'2026-10-05',end:'2026-10-11',title:"六级听力技巧、分词状语、定语从句",courseIds:['grammar-participle','grammar-relative','listening-tip-1','listening-tip-2','cet6-067-01-2026-六级全程2班-02-课程-01-视频-10-六级口语考试-口语课-01-口语-口语1','cet6-068-01-2026-六级全程2班-02-课程-01-视频-10-六级口语考试-口语课-02-口语-口语2','cet6-069-01-2026-六级全程2班-02-课程-01-视频-10-六级口语考试-口语课-03-口语-口语3','cet6-077-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-41-口语伴学口语1-41-1-伴学视频','cet6-078-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-41-口语伴学口语1-41-2-伴学视频','cet6-079-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-42-口语伴学口语2-42-1-伴学视频','cet6-080-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-1-伴学视频','cet6-081-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-2-伴学视频','cet6-082-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-3-伴学视频','cet6-083-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-4-伴学视频','cet6-084-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-5-伴学视频','cet6-085-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-6-伴学视频','cet6-086-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-7-伴学视频','cet6-087-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-8-伴学视频','cet6-088-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-43-口语伴学口语3-43-9-伴学视频-1']} ,
 {id:'week-4',number:4,start:'2026-10-12',end:'2026-10-18',title:"段落匹配、仔细阅读、选词填空",courseIds:['reading-matching','reading-careful','reading-cloze']} ,
 {id:'week-5',number:5,start:'2026-10-19',end:'2026-10-25',title:"写作首段与主体、翻译基础策略",courseIds:['translation-strategy','writing-first','cet6-070-01-2026-六级全程2班-02-课程-01-视频-10-六级口语考试-口语课-04-口语-口语4','cet6-089-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-44-口语伴学口语4-44-1-伴学视频','cet6-090-01-2026-六级全程2班-02-课程-02-伴学-新建文件夹-44-口语伴学口语4-44-2-伴学视频']} ,
 {id:'week-6',number:6,start:'2026-10-26',end:'2026-11-01',title:"六级核心技巧整合、词汇与长难句回收",courseIds:['cet6-016-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-04-六级词汇-词汇方法论','cet6-017-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-05-六级词汇-六级核心词汇-1','cet6-018-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-06-六级词汇-六级核心词汇-2','cet6-019-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-07-六级词汇-六级核心词汇3','cet6-020-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-08-六级词汇-六级核心词汇4','cet6-021-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-09-六级词汇-六级核心词汇5','cet6-022-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-10-六级词汇-六级核心词汇6','cet6-023-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-11-六级词汇-六级核心词汇7','cet6-024-01-2026-六级全程2班-02-课程-01-视频-02-六级词汇课-12-六级词汇-六级核心词汇8','cet6-101-02-活动赠课-四六级听力基础包-02-课程-01-视频-02-基础包伴学-01-作业彩蛋-怎样调音频语速']} ,
 {id:'week-7',number:7,start:'2026-11-02',end:'2026-11-07',title:"补齐核心课、综合复盘与首次诊断",courseIds:[]} 
];
const byCourseId=Object.fromEntries(tasks.map(task=>[task.courseId,task]));
const planWeeks=weekRows.map(row=>({...row,items:row.courseIds.map(id=>byCourseId[id]),minutes:row.courseIds.reduce((sum,id)=>sum+byCourseId[id].minutes,0),coreMinutes:row.courseIds.reduce((sum,id)=>sum+(byCourseId[id].priority==='core'?byCourseId[id].minutes:0),0),optionalMinutes:row.courseIds.reduce((sum,id)=>sum+(byCourseId[id].priority==='optional'?byCourseId[id].minutes:0),0)}));
const papers=[
 ['paper-1','2026-11-07','恢复后首次诊断'],['paper-2','2026-11-10','弱项验证'],['paper-3','2026-11-14','完整训练'],['paper-4','2026-11-18','完整训练'],['paper-5','2026-11-22','中期模拟'],
 ['paper-6','2026-11-26','中期模拟'],['paper-7','2026-11-29','冲刺训练'],['paper-8','2026-12-02','冲刺训练'],['paper-9','2026-12-05','考前模拟'],['paper-10','2026-12-08','最终模拟'],
].map(([id,date,purpose])=>({id,date,purpose}));
const english={
 baseline:{summary:'大学英语四级约430分通过；2024年考研英语二57分；之后一年多未持续接触英语。',risk:'当前首要问题是语言状态生疏。先完成基础恢复，再用真题诊断，避免把生疏误判为稳定能力。'},
 target:{score:'425+',mockBuffer:'440–460',weeklyHours:'10–14',totalHours:125,coreHours:52},
 phases:[
  {id:'foundation',start:'2026-09-21',end:'2026-11-06',title:'基础恢复',weeks:'9/21—11/6',outcome:'完成核心网课并恢复每日词汇节奏。'},
  {id:'papers',start:'2026-11-07',end:'2026-11-28',title:'真题检测',weeks:'11/7—11/28',outcome:'先诊断，再按弱项完成六套完整训练。'},
  {id:'final',start:'2026-11-29',end:'2026-12-12',title:'冲刺与减量',weeks:'11/29—12/12',outcome:'完成最后四套真题，固定策略并在考前减量。'},
 ],
 materials:[
  {title:'119个本地视频',status:'全量登记',use:'9月21日至11月7日分周展示；核心必修影响主线进度，选修可随时补看。'},
  {title:'墨墨背单词',status:'每日主线',use:'每天45分钟，复习优先，按近7天效率动态调整。'},
  {title:'10套完整真题',status:'11月启用',use:'11月7日开始，每套必须完成限时作答和订正。'},
 ],
 weeks:planWeeks,papers,tasks,
};
root.ENGLISH_PLAN=english;plan.tasks.english=tasks;
plan.resources.english=[
 {title:'六级考试官方信息与题型',url:'https://cet.neea.edu.cn/html1/report/16123/201-1.htm',note:'官方结构：写作15%、听力35%、阅读35%、翻译15%。'},
 {title:'本地资料核对结果',note:'已发现119个视频；真题讲解和模考已登记，但需要完成对应试卷后再看。'},
 {title:'纸质与电子真题',note:'纸质版近三年真题优先；缺少的试卷从有权访问的来源补齐。'},
];
})(typeof window!=='undefined'?window:globalThis);
