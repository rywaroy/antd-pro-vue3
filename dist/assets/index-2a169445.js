import{g as p,s as q,o as A,n as N,h as B,r as u,a as k,c as L,w as z,e as T,u as o,b as g,i as D,f as Q,j as R,k as V,l as I}from"./index-1188125c.js";function j(e,m,v={}){const{defaultQueryParam:h={},formatQueryParam:w=t=>t,formatReturnData:_=t=>t.data,params:b=p({}),manual:f=!1}=v,a=m(),{queryParam:i,dataSource:y,pagination:r,advanced:c}=q(a),l=p(!1),s=()=>{a.setAdvanced(!c.value)},n=()=>{l.value=!0,e(w({...i.value,current:r.value.current,pageSize:r.value.pageSize,...b.value})).then(t=>{const{list:d,total:P}=_(t);a.setData(d),a.setTotal(P),l.value=!1}).catch(()=>{l.value=!1})},S=()=>{a.setCurrent(1),n()},x=()=>{a.setQueryParam({...h}),a.setCurrent(1),n()},C=t=>{a.setCurrent(t.current),a.setPageSize(t.pageSize),n()};return A(()=>{f||n()}),{queryParam:i,advanced:c,dataSource:y,pagination:r,loading:l,toggleAdvanced:s,search:S,reset:x,getDataList:n,handleTableChange:C}}const O=N({id:"storeTable",state:()=>({queryParam:{},dataSource:[],pagination:{hideOnSinglePage:!0,pageSize:10,total:0,current:1},advanced:!1}),actions:{setData(e){this.dataSource=e},setTotal(e){this.pagination.total=e},setCurrent(e){this.pagination.current=e},setPageSize(e){this.pagination.pageSize=e},setQueryParam(e){this.queryParam=e},setAdvanced(e){this.advanced=e}}}),E={class:"table-page-wrapper"},F=g("div",{class:"table-page-toolbar"},[g("div",{class:"table-title"},"数据持久化表格")],-1),M={key:1},G=g("a",null,"订阅报警",-1),J=Object.assign({name:"StoreList"},{__name:"index",setup(e){const m=p({}),v=p([{type:"input",label:"规则编号",value:"id"},{type:"select",label:"使用状态",value:"status",options:[{label:"全部",value:"0"},{label:"关闭",value:"1"},{label:"运行中",value:"2"}]},{type:"input-number",label:"调用次数",value:"callNo"},{type:"date",label:"更新日期",value:"date"},{type:"range-date",label:"时间区间",value:"rangeDate"}]),{queryParam:h,advanced:w,dataSource:_,pagination:b,loading:f,toggleAdvanced:a,search:i,reset:y,handleTableChange:r}=j(B,O,{params:m}),c=[{title:"#",key:"serial"},{title:"规则编号",dataIndex:"no"},{title:"描述",dataIndex:"description"},{title:"服务调用次数",dataIndex:"callNo"},{title:"状态",dataIndex:"status"},{title:"更新时间",dataIndex:"updatedAt"},{title:"操作",dataIndex:"action",width:"150px"}],l={onChange:(s,n)=>{console.log(s),console.log(n)},getCheckboxProps:s=>({disabled:s.id===2,name:s.name})};return(s,n)=>{const S=u("base-search-form"),x=u("a-divider"),C=u("a-table"),t=u("page-container");return k(),L(t,null,{default:z(()=>[T(S,{"form-list":v.value,"query-param":o(h),onReset:o(y),onSearch:o(i)},null,8,["form-list","query-param","onReset","onSearch"]),g("div",E,[F,T(C,{"row-key":"id",loading:o(f),"data-source":o(_),columns:c,pagination:o(b),"row-selection":l,onChange:o(r)},{bodyCell:z(({column:d,index:P})=>[d.key==="serial"?(k(),D(V,{key:0},[Q(R(P+1),1)],64)):I("",!0),d.dataIndex==="action"?(k(),D("span",M,[T(x,{type:"vertical"}),G])):I("",!0)]),_:1},8,["loading","data-source","pagination","onChange"])])]),_:1})}}});export{J as default};
