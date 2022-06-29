import{h as N,b as g,F as V,r as n,o as S,c as j,w as t,a as b,d as e,m as _,u,v as D,x as I,y as M,e as r,t as O}from"./index.2c9f003e.js";const P={class:"form-page-wrapper"},R=b("span",null," %",-1),T=r("\u516C\u5F00"),z=r("\u90E8\u5206\u516C\u5F00"),A=r("\u4E0D\u516C\u5F00"),E=r("\u540C\u4E8B\u7532"),G=r("\u540C\u4E8B\u4E59"),H=r("\u540C\u4E8B\u4E19"),J=r("\u63D0\u4EA4"),K=r("\u91CD\u7F6E"),L=N({name:"BasicForm"}),X=Object.assign(L,{setup(Q){const a=g({title:"",time:[],goal:"",standard:"",client:"",invites:"",weight:0,target:1}),w=g({title:[{required:!0,message:"\u8BF7\u8F93\u5165\u6807\u9898"}],time:[{required:!0,message:"\u8BF7\u9009\u62E9\u8D77\u6B62\u65E5\u671F"}],goal:[{required:!0,message:"\u8BF7\u8F93\u5165\u76EE\u6807\u63CF\u8FF0"}],standard:[{required:!0,message:"\u8BF7\u8F93\u5165\u8861\u91CF\u6807\u51C6"}]}),{resetFields:x,validate:h,validateInfos:i}=V.useForm(a,w),k=()=>{h().then(()=>{console.log(O(a))}).catch(c=>{console.log("error",c)})};return(c,l)=>{const d=n("a-input"),s=n("a-form-item"),U=n("a-range-picker"),v=n("a-textarea"),C=n("a-input-number"),p=n("a-radio"),F=n("a-radio-group"),m=n("a-select-option"),q=n("a-select"),f=n("a-button"),y=n("a-form"),B=n("page-container");return S(),j(B,null,{default:t(()=>[b("div",P,[e(y,{"label-col":{lg:{span:7},sm:{span:7}},"wrapper-col":{lg:{span:10},sm:{span:17}}},{default:t(()=>[e(s,_({label:"\u6807\u9898"},u(i).title),{default:t(()=>[e(d,{value:a.title,"onUpdate:value":l[0]||(l[0]=o=>a.title=o)},null,8,["value"])]),_:1},16),e(s,_({label:"\u8D77\u6B62\u65E5\u671F"},u(i).time),{default:t(()=>[e(U,{value:a.time,"onUpdate:value":l[1]||(l[1]=o=>a.time=o)},null,8,["value"])]),_:1},16),e(s,_({label:"\u76EE\u6807\u63CF\u8FF0"},u(i).goal),{default:t(()=>[e(v,{value:a.goal,"onUpdate:value":l[2]||(l[2]=o=>a.goal=o),placeholder:"\u8BF7\u8F93\u5165\u4F60\u7684\u9636\u6BB5\u6027\u5DE5\u4F5C\u76EE\u6807",rows:4},null,8,["value"])]),_:1},16),e(s,_({label:"\u8861\u91CF\u6807\u51C6"},u(i).standard),{default:t(()=>[e(v,{value:a.standard,"onUpdate:value":l[3]||(l[3]=o=>a.standard=o),placeholder:"\u8BF7\u8F93\u5165\u4F60\u7684\u9636\u6BB5\u6027\u5DE5\u4F5C\u76EE\u6807",rows:4},null,8,["value"])]),_:1},16),e(s,_({label:"\u5BA2\u6237"},u(i).client),{default:t(()=>[e(d,{value:a.client,"onUpdate:value":l[4]||(l[4]=o=>a.client=o)},null,8,["value"])]),_:1},16),e(s,_({label:"\u9080\u8BC4\u4EBA"},u(i).invites),{default:t(()=>[e(d,{value:a.invites,"onUpdate:value":l[5]||(l[5]=o=>a.invites=o)},null,8,["value"])]),_:1},16),e(s,_({label:"\u6743\u91CD"},u(i).weight),{default:t(()=>[e(C,{value:a.weight,"onUpdate:value":l[6]||(l[6]=o=>a.weight=o),min:0,max:100},null,8,["value"]),R]),_:1},16),e(s,{label:"\u76EE\u6807\u516C\u5F00"},{default:t(()=>[e(F,{value:a.target,"onUpdate:value":l[7]||(l[7]=o=>a.target=o)},{default:t(()=>[e(p,{value:1},{default:t(()=>[T]),_:1}),e(p,{value:2},{default:t(()=>[z]),_:1}),e(p,{value:3},{default:t(()=>[A]),_:1})]),_:1},8,["value"])]),_:1}),D(e(s,{label:"\xA0",colon:!1},{default:t(()=>[e(q,{mode:"multiple"},{default:t(()=>[e(m,{value:"4"},{default:t(()=>[E]),_:1}),e(m,{value:"5"},{default:t(()=>[G]),_:1}),e(m,{value:"6"},{default:t(()=>[H]),_:1})]),_:1})]),_:1},512),[[I,a.target===2]]),e(s,{label:"\xA0",colon:!1},{default:t(()=>[e(f,{type:"primary",onClick:M(k,["prevent"])},{default:t(()=>[J]),_:1},8,["onClick"]),e(f,{style:{"margin-left":"8px"},onClick:u(x)},{default:t(()=>[K]),_:1},8,["onClick"])]),_:1})]),_:1})])]),_:1})}}});export{X as default};
