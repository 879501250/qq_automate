"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[533],{2007:function(gt,D,e){e.r(D),e.d(D,{default:function(){return ft}});var $=e(35099),N=e(92688),L=e(65337),R=e(88372),B=e(47915),x=e(55054),p=e(71230),u=e(15746),v=e(4393),C=e(38703),P=e(92077),F=e.n(P),G=e(19632),S=e.n(G),H=e(5574),E=e.n(H),I=e(64183),m=e(67294),z=e(89914),O=(0,z.kc)(function(){return{activeChart:{position:"relative"},activeChartGrid:{p:{position:"absolute",top:"80px"},"p:last-child":{top:"115px"}},activeChartLegend:{position:"relative",height:"20px",marginTop:"8px",fontSize:"0",lineHeight:"20px",span:{display:"inline-block",width:"33.33%",fontSize:"12px",textAlign:"center"},"span:first-child":{textAlign:"left"},"span:last-child":{textAlign:"right"}},dashedLine:{position:"relative",top:"-70px",left:"-3px",height:"1px"},line:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",backgroundImage:"linear-gradient(to right, transparent 50%, #e9e9e9 50%)",backgroundSize:"6px"},"dashedLine:last-child":{top:"-36px"}}}),W=O,t=e(85893);function J(i){return i*1<10?"0".concat(i):i}function K(){for(var i=[],n=0;n<24;n+=1)i.push({x:"".concat(J(n),":00"),y:Math.floor(Math.random()*200)+n*50});return i}var Q=function(){var n,s,d,o,r=(0,m.useRef)(null),l=(0,m.useRef)(null),c=W(),h=c.styles,f=(0,m.useState)([]),A=E()(f,2),a=A[0],g=A[1],xt=function mt(){l.current=requestAnimationFrame(function(){r.current=window.setTimeout(function(){g(K()),mt()},2e3)})};return(0,m.useEffect)(function(){return xt(),function(){clearTimeout(r.current),l.current&&cancelAnimationFrame(l.current)}},[]),(0,t.jsxs)("div",{className:h.activeChart,children:[(0,t.jsx)(x.Z,{title:"\u76EE\u6807\u8BC4\u4F30",value:"\u6709\u671B\u8FBE\u5230\u9884\u671F"}),(0,t.jsx)("div",{style:{marginTop:32},children:(0,t.jsx)(I.Z,{padding:[0,0,0,0],xField:"x",axis:!1,yField:"y",height:84,style:{fill:"linear-gradient(-90deg, white 0%, #6294FA 100%)",fillOpacity:.6},data:a})}),a&&(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:h.activeChartGrid,children:[(0,t.jsxs)("p",{children:[((n=S()(a).sort()[a.length-1])===null||n===void 0?void 0:n.y)+200," \u4EBF\u5143"]}),(0,t.jsxs)("p",{children:[(s=S()(a).sort()[Math.floor(a.length/2)])===null||s===void 0?void 0:s.y," \u4EBF\u5143"]})]}),(0,t.jsx)("div",{className:h.dashedLine,children:(0,t.jsx)("div",{className:h.line})}),(0,t.jsx)("div",{className:h.dashedLine,children:(0,t.jsx)("div",{className:h.line})})]}),a&&(0,t.jsxs)("div",{className:h.activeChartLegend,children:[(0,t.jsx)("span",{children:"00:00"}),(0,t.jsx)("span",{children:(d=a[Math.floor(a.length/2)])===null||d===void 0?void 0:d.x}),(0,t.jsx)("span",{children:(o=a[a.length-1])===null||o===void 0?void 0:o.x})]})]})},U=Q,V=e(15009),y=e.n(V),X=e(99289),M=e.n(X),Y=e(12444),b=e.n(Y),w=e(72004),k=e.n(w),q=e(25098),_=e.n(q),tt=e(31996),et=e.n(tt),at=e(26037),nt=e.n(at),st=e(9783),T=e.n(st),lt=e(83832),j=e(41371),rt=["#eff3ff","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],it=function(i){et()(s,i);var n=nt()(s);function s(){var d;b()(this,s);for(var o=arguments.length,r=new Array(o),l=0;l<o;l++)r[l]=arguments[l];return d=n.call.apply(n,[this].concat(r)),T()(_()(d),"state",{data:null,grid:null,loading:!1}),d}return k()(s,[{key:"componentDidMount",value:function(){var d=M()(y()().mark(function r(){var l,c,h,f;return y()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Promise.all([fetch("https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json").then(function(g){return g.json()}),fetch("https://gw.alipayobjects.com/os/bmw-prod/8990e8b4-c58e-419b-afb9-8ea3daff2dd1.json").then(function(g){return g.json()})]);case 2:l=a.sent,c=E()(l,2),h=c[0],f=c[1],this.setState({data:h,grid:f,loading:!0});case 7:case"end":return a.stop()}},r,this)}));function o(){return d.apply(this,arguments)}return o}()},{key:"render",value:function(){var o=this.state,r=o.data,l=o.grid,c=o.loading;return c===!1?(0,t.jsx)(lt.S,{}):(0,t.jsxs)(j.JE,{map:{center:[110.19382669582967,50.258134],pitch:0,style:"blank",zoom:1},style:{position:"relative",width:"100%",height:"452px"},children:[l&&(0,t.jsx)(j.zP,{source:{data:l,transforms:[{type:"hexagon",size:8e5,field:"capacity",method:"sum"}]},color:{values:"#ddd"},shape:{values:"hexagon"},style:{coverage:.7,opacity:.8}},"1"),r&&[(0,t.jsx)(j.ns,{options:{autoFit:!0},source:{data:r},scale:{values:{color:{field:"cum_conf",type:"quantile"},size:{field:"cum_conf",type:"log"}}},color:{field:"cum_conf",values:rt},shape:{values:"circle"},active:{option:{color:"#0c2c84"}},size:{field:"cum_conf",values:[0,30]},style:{opacity:.8}},"2"),(0,t.jsx)(j.ns,{source:{data:r},color:{values:"#fff"},shape:{field:"Short_Name_ZH",values:"text"},filter:{field:"cum_conf",values:function(f){return f>2e3}},size:{values:12},style:{opacity:1,strokeOpacity:1,strokeWidth:0}},"5")]]})}}]),s}(m.Component);function ot(){return Z.apply(this,arguments)}function Z(){return Z=M()(y()().mark(function i(){return y()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.abrupt("return",(0,B.request)("/api/tags"));case 1:case"end":return s.stop()}},i)})),Z.apply(this,arguments)}var dt=(0,z.kc)(function(i){var n=i.token;return{mapChart:T()({height:"452px",paddingTop:"24px",img:{display:"inline-block",maxWidth:"100%",maxHeight:"437px"}},"@media screen and (max-width: ".concat(n.screenLG,"px)"),{height:"auto"})}}),ut=dt,ct=x.Z.Countdown,ht=Date.now()+1e3*60*60*24*2+1e3*30,vt=function(){var n=ut(),s=n.styles,d=(0,B.useRequest)(ot),o=d.loading,r=d.data,l=((r==null?void 0:r.list)||[]).map(function(c){return{id:+Date.now(),word:c.name,weight:c.value}});return(0,t.jsx)(R.f,{children:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(p.Z,{gutter:24,children:[(0,t.jsx)(u.Z,{xl:18,lg:24,md:24,sm:24,xs:24,style:{marginBottom:24},children:(0,t.jsxs)(v.Z,{title:"\u6D3B\u52A8\u5B9E\u65F6\u4EA4\u6613\u60C5\u51B5",bordered:!1,children:[(0,t.jsxs)(p.Z,{children:[(0,t.jsx)(u.Z,{md:6,sm:12,xs:24,children:(0,t.jsx)(x.Z,{title:"\u4ECA\u65E5\u4EA4\u6613\u603B\u989D",suffix:"\u5143",value:F()(124543233).format("0,0")})}),(0,t.jsx)(u.Z,{md:6,sm:12,xs:24,children:(0,t.jsx)(x.Z,{title:"\u9500\u552E\u76EE\u6807\u5B8C\u6210\u7387",value:"92%"})}),(0,t.jsx)(u.Z,{md:6,sm:12,xs:24,children:(0,t.jsx)(ct,{title:"\u6D3B\u52A8\u5269\u4F59\u65F6\u95F4",value:ht,format:"HH:mm:ss:SSS"})}),(0,t.jsx)(u.Z,{md:6,sm:12,xs:24,children:(0,t.jsx)(x.Z,{title:"\u6BCF\u79D2\u4EA4\u6613\u603B\u989D",suffix:"\u5143",value:F()(234).format("0,0")})})]}),(0,t.jsx)("div",{className:s.mapChart,children:(0,t.jsx)(it,{})})]})}),(0,t.jsxs)(u.Z,{xl:6,lg:24,md:24,sm:24,xs:24,children:[(0,t.jsx)(v.Z,{title:"\u6D3B\u52A8\u60C5\u51B5\u9884\u6D4B",style:{marginBottom:24},bordered:!1,children:(0,t.jsx)(U,{})}),(0,t.jsx)(v.Z,{title:"\u5238\u6838\u6548\u7387",style:{marginBottom:24},bodyStyle:{textAlign:"center"},bordered:!1,children:(0,t.jsx)($.Z,{height:180,data:{target:80,total:100,name:"score",thresholds:[20,40,60,80,100]},padding:-16,style:{textContent:function(){return"\u4F18"}},meta:{color:{range:["#6395FA","#62DAAB","#657798","#F7C128","#1F8718"]}}})})]})]}),(0,t.jsxs)(p.Z,{gutter:24,children:[(0,t.jsx)(u.Z,{xl:12,lg:24,sm:24,xs:24,style:{marginBottom:24},children:(0,t.jsx)(v.Z,{title:"\u5404\u54C1\u7C7B\u5360\u6BD4",bordered:!1,children:(0,t.jsxs)(p.Z,{style:{padding:"16px 0"},children:[(0,t.jsx)(u.Z,{span:8,children:(0,t.jsx)(C.Z,{type:"dashboard",percent:75})}),(0,t.jsx)(u.Z,{span:8,children:(0,t.jsx)(C.Z,{type:"dashboard",percent:48})}),(0,t.jsx)(u.Z,{span:8,children:(0,t.jsx)(C.Z,{type:"dashboard",percent:33})})]})})}),(0,t.jsx)(u.Z,{xl:6,lg:12,sm:24,xs:24,style:{marginBottom:24},children:(0,t.jsx)(v.Z,{title:"\u70ED\u95E8\u641C\u7D22",loading:o,bordered:!1,bodyStyle:{overflow:"hidden"},children:(0,t.jsx)(N.Z,{data:l,height:162,textField:"word",colorField:"word",layout:{spiral:"rectangular",fontSize:[10,20]}})})}),(0,t.jsx)(u.Z,{xl:6,lg:12,sm:24,xs:24,style:{marginBottom:24},children:(0,t.jsx)(v.Z,{title:"\u8D44\u6E90\u5269\u4F59",bodyStyle:{textAlign:"center",fontSize:0},bordered:!1,children:(0,t.jsx)(L.Z,{height:160,percent:.35})})})]})]})})},ft=vt}}]);
