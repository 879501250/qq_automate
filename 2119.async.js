"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[2119],{42119:function(Ui,oi,m){m.d(oi,{Z:function(){return Li}});var c=m(67294),ri=m(64894),li=m(62208),ai=m(93967),L=m.n(ai),R=m(87462),U=m(1413),b=m(4942),Y=m(91),Q=m(15105),ci=["className","prefixCls","style","active","status","iconPrefix","icon","wrapperStyle","stepNumber","disabled","description","title","subTitle","progressDot","stepIcon","tailContent","icons","stepIndex","onStepClick","onClick","render"];function J(i){return typeof i=="string"}function si(i){var t,e=i.className,n=i.prefixCls,o=i.style,r=i.active,a=i.status,S=i.iconPrefix,s=i.icon,g=i.wrapperStyle,u=i.stepNumber,h=i.disabled,x=i.description,w=i.title,T=i.subTitle,f=i.progressDot,N=i.stepIcon,E=i.tailContent,d=i.icons,H=i.stepIndex,v=i.onStepClick,z=i.onClick,P=i.render,X=(0,Y.Z)(i,ci),j=!!v&&!h,C={};j&&(C.role="button",C.tabIndex=0,C.onClick=function(y){z==null||z(y),v(H)},C.onKeyDown=function(y){var $=y.which;($===Q.Z.ENTER||$===Q.Z.SPACE)&&v(H)});var Z=function(){var $,p,W=L()("".concat(n,"-icon"),"".concat(S,"icon"),($={},(0,b.Z)($,"".concat(S,"icon-").concat(s),s&&J(s)),(0,b.Z)($,"".concat(S,"icon-check"),!s&&a==="finish"&&(d&&!d.finish||!d)),(0,b.Z)($,"".concat(S,"icon-cross"),!s&&a==="error"&&(d&&!d.error||!d)),$)),A=c.createElement("span",{className:"".concat(n,"-icon-dot")});return f?typeof f=="function"?p=c.createElement("span",{className:"".concat(n,"-icon")},f(A,{index:u-1,status:a,title:w,description:x})):p=c.createElement("span",{className:"".concat(n,"-icon")},A):s&&!J(s)?p=c.createElement("span",{className:"".concat(n,"-icon")},s):d&&d.finish&&a==="finish"?p=c.createElement("span",{className:"".concat(n,"-icon")},d.finish):d&&d.error&&a==="error"?p=c.createElement("span",{className:"".concat(n,"-icon")},d.error):s||a==="finish"||a==="error"?p=c.createElement("span",{className:W}):p=c.createElement("span",{className:"".concat(n,"-icon")},u),N&&(p=N({index:u-1,status:a,title:w,description:x,node:p})),p},O=a||"wait",M=L()("".concat(n,"-item"),"".concat(n,"-item-").concat(O),e,(t={},(0,b.Z)(t,"".concat(n,"-item-custom"),s),(0,b.Z)(t,"".concat(n,"-item-active"),r),(0,b.Z)(t,"".concat(n,"-item-disabled"),h===!0),t)),q=(0,U.Z)({},o),D=c.createElement("div",(0,R.Z)({},X,{className:M,style:q}),c.createElement("div",(0,R.Z)({onClick:z},C,{className:"".concat(n,"-item-container")}),c.createElement("div",{className:"".concat(n,"-item-tail")},E),c.createElement("div",{className:"".concat(n,"-item-icon")},Z()),c.createElement("div",{className:"".concat(n,"-item-content")},c.createElement("div",{className:"".concat(n,"-item-title")},w,T&&c.createElement("div",{title:typeof T=="string"?T:void 0,className:"".concat(n,"-item-subtitle")},T)),x&&c.createElement("div",{className:"".concat(n,"-item-description")},x))));return P&&(D=P(D)||null),D}var _=si,di=["prefixCls","style","className","children","direction","type","labelPlacement","iconPrefix","status","size","current","progressDot","stepIcon","initial","icons","onChange","itemRender","items"];function k(i){var t,e=i.prefixCls,n=e===void 0?"rc-steps":e,o=i.style,r=o===void 0?{}:o,a=i.className,S=i.children,s=i.direction,g=s===void 0?"horizontal":s,u=i.type,h=u===void 0?"default":u,x=i.labelPlacement,w=x===void 0?"horizontal":x,T=i.iconPrefix,f=T===void 0?"rc":T,N=i.status,E=N===void 0?"process":N,d=i.size,H=i.current,v=H===void 0?0:H,z=i.progressDot,P=z===void 0?!1:z,X=i.stepIcon,j=i.initial,C=j===void 0?0:j,Z=i.icons,O=i.onChange,M=i.itemRender,q=i.items,D=q===void 0?[]:q,y=(0,Y.Z)(i,di),$=h==="navigation",p=h==="inline",W=p||P,A=p?"horizontal":g,ei=p?void 0:d,Ri=W?"vertical":w,Gi=L()(n,"".concat(n,"-").concat(A),a,(t={},(0,b.Z)(t,"".concat(n,"-").concat(ei),ei),(0,b.Z)(t,"".concat(n,"-label-").concat(Ri),A==="horizontal"),(0,b.Z)(t,"".concat(n,"-dot"),!!W),(0,b.Z)(t,"".concat(n,"-navigation"),$),(0,b.Z)(t,"".concat(n,"-inline"),p),t)),Fi=function(F){O&&v!==F&&O(F)},Ki=function(F,ni){var I=(0,U.Z)({},F),B=C+ni;return E==="error"&&ni===v-1&&(I.className="".concat(n,"-next-error")),I.status||(B===v?I.status=E:B<v?I.status="finish":I.status="wait"),p&&(I.icon=void 0,I.subTitle=void 0),!I.render&&M&&(I.render=function(Vi){return M(I,Vi)}),c.createElement(_,(0,R.Z)({},I,{active:B===v,stepNumber:B+1,stepIndex:B,key:B,prefixCls:n,iconPrefix:f,wrapperStyle:r,progressDot:W,stepIcon:X,icons:Z,onStepClick:O&&Fi}))};return c.createElement("div",(0,R.Z)({className:Gi,style:r},y),D.filter(function(V){return V}).map(Ki))}k.Step=_;var mi=k,ii=mi,gi=m(53124),pi=m(98675),$i=m(25378),ui=m(38703),Si=m(83062),l=m(59394),K=m(14747),hi=m(83559),fi=m(83262),bi=i=>{const{componentCls:t,customIconTop:e,customIconSize:n,customIconFontSize:o}=i;return{[`${t}-item-custom`]:{[`> ${t}-item-container > ${t}-item-icon`]:{height:"auto",background:"none",border:0,[`> ${t}-icon`]:{top:e,width:n,height:n,fontSize:o,lineHeight:`${(0,l.bf)(n)}`}}},[`&:not(${t}-vertical)`]:{[`${t}-item-custom`]:{[`${t}-item-icon`]:{width:"auto",background:"none"}}}}},vi=i=>{const{componentCls:t}=i,e=`${t}-item`;return{[`${t}-horizontal`]:{[`${e}-tail`]:{transform:"translateY(-50%)"}}}},Ci=i=>{const{componentCls:t,inlineDotSize:e,inlineTitleColor:n,inlineTailColor:o}=i,r=i.calc(i.paddingXS).add(i.lineWidth).equal(),a={[`${t}-item-container ${t}-item-content ${t}-item-title`]:{color:n}};return{[`&${t}-inline`]:{width:"auto",display:"inline-flex",[`${t}-item`]:{flex:"none","&-container":{padding:`${(0,l.bf)(r)} ${(0,l.bf)(i.paddingXXS)} 0`,margin:`0 ${(0,l.bf)(i.calc(i.marginXXS).div(2).equal())}`,borderRadius:i.borderRadiusSM,cursor:"pointer",transition:`background-color ${i.motionDurationMid}`,"&:hover":{background:i.controlItemBgHover},"&[role='button']:hover":{opacity:1}},"&-icon":{width:e,height:e,marginInlineStart:`calc(50% - ${(0,l.bf)(i.calc(e).div(2).equal())})`,[`> ${t}-icon`]:{top:0},[`${t}-icon-dot`]:{borderRadius:i.calc(i.fontSizeSM).div(4).equal(),"&::after":{display:"none"}}},"&-content":{width:"auto",marginTop:i.calc(i.marginXS).sub(i.lineWidth).equal()},"&-title":{color:n,fontSize:i.fontSizeSM,lineHeight:i.lineHeightSM,fontWeight:"normal",marginBottom:i.calc(i.marginXXS).div(2).equal()},"&-description":{display:"none"},"&-tail":{marginInlineStart:0,top:i.calc(e).div(2).add(r).equal(),transform:"translateY(-50%)","&:after":{width:"100%",height:i.lineWidth,borderRadius:0,marginInlineStart:0,background:o}},[`&:first-child ${t}-item-tail`]:{width:"50%",marginInlineStart:"50%"},[`&:last-child ${t}-item-tail`]:{display:"block",width:"50%"},"&-wait":Object.assign({[`${t}-item-icon ${t}-icon ${t}-icon-dot`]:{backgroundColor:i.colorBorderBg,border:`${(0,l.bf)(i.lineWidth)} ${i.lineType} ${o}`}},a),"&-finish":Object.assign({[`${t}-item-tail::after`]:{backgroundColor:o},[`${t}-item-icon ${t}-icon ${t}-icon-dot`]:{backgroundColor:o,border:`${(0,l.bf)(i.lineWidth)} ${i.lineType} ${o}`}},a),"&-error":a,"&-active, &-process":Object.assign({[`${t}-item-icon`]:{width:e,height:e,marginInlineStart:`calc(50% - ${(0,l.bf)(i.calc(e).div(2).equal())})`,top:0}},a),[`&:not(${t}-item-active) > ${t}-item-container[role='button']:hover`]:{[`${t}-item-title`]:{color:n}}}}}},yi=i=>{const{componentCls:t,iconSize:e,lineHeight:n,iconSizeSM:o}=i;return{[`&${t}-label-vertical`]:{[`${t}-item`]:{overflow:"visible","&-tail":{marginInlineStart:i.calc(e).div(2).add(i.controlHeightLG).equal(),padding:`0 ${(0,l.bf)(i.paddingLG)}`},"&-content":{display:"block",width:i.calc(e).div(2).add(i.controlHeightLG).mul(2).equal(),marginTop:i.marginSM,textAlign:"center"},"&-icon":{display:"inline-block",marginInlineStart:i.controlHeightLG},"&-title":{paddingInlineEnd:0,paddingInlineStart:0,"&::after":{display:"none"}},"&-subtitle":{display:"block",marginBottom:i.marginXXS,marginInlineStart:0,lineHeight:n}},[`&${t}-small:not(${t}-dot)`]:{[`${t}-item`]:{"&-icon":{marginInlineStart:i.calc(e).sub(o).div(2).add(i.controlHeightLG).equal()}}}}}},Ii=i=>{const{componentCls:t,navContentMaxWidth:e,navArrowColor:n,stepsNavActiveColor:o,motionDurationSlow:r}=i;return{[`&${t}-navigation`]:{paddingTop:i.paddingSM,[`&${t}-small`]:{[`${t}-item`]:{"&-container":{marginInlineStart:i.calc(i.marginSM).mul(-1).equal()}}},[`${t}-item`]:{overflow:"visible",textAlign:"center","&-container":{display:"inline-block",height:"100%",marginInlineStart:i.calc(i.margin).mul(-1).equal(),paddingBottom:i.paddingSM,textAlign:"start",transition:`opacity ${r}`,[`${t}-item-content`]:{maxWidth:e},[`${t}-item-title`]:Object.assign(Object.assign({maxWidth:"100%",paddingInlineEnd:0},K.vS),{"&::after":{display:"none"}})},[`&:not(${t}-item-active)`]:{[`${t}-item-container[role='button']`]:{cursor:"pointer","&:hover":{opacity:.85}}},"&:last-child":{flex:1,"&::after":{display:"none"}},"&::after":{position:"absolute",top:`calc(50% - ${(0,l.bf)(i.calc(i.paddingSM).div(2).equal())})`,insetInlineStart:"100%",display:"inline-block",width:i.fontSizeIcon,height:i.fontSizeIcon,borderTop:`${(0,l.bf)(i.lineWidth)} ${i.lineType} ${n}`,borderBottom:"none",borderInlineStart:"none",borderInlineEnd:`${(0,l.bf)(i.lineWidth)} ${i.lineType} ${n}`,transform:"translateY(-50%) translateX(-50%) rotate(45deg)",content:'""'},"&::before":{position:"absolute",bottom:0,insetInlineStart:"50%",display:"inline-block",width:0,height:i.lineWidthBold,backgroundColor:o,transition:`width ${r}, inset-inline-start ${r}`,transitionTimingFunction:"ease-out",content:'""'}},[`${t}-item${t}-item-active::before`]:{insetInlineStart:0,width:"100%"}},[`&${t}-navigation${t}-vertical`]:{[`> ${t}-item`]:{marginInlineEnd:0,"&::before":{display:"none"},[`&${t}-item-active::before`]:{top:0,insetInlineEnd:0,insetInlineStart:"unset",display:"block",width:i.calc(i.lineWidth).mul(3).equal(),height:`calc(100% - ${(0,l.bf)(i.marginLG)})`},"&::after":{position:"relative",insetInlineStart:"50%",display:"block",width:i.calc(i.controlHeight).mul(.25).equal(),height:i.calc(i.controlHeight).mul(.25).equal(),marginBottom:i.marginXS,textAlign:"center",transform:"translateY(-50%) translateX(-50%) rotate(135deg)"},"&:last-child":{"&::after":{display:"none"}},[`> ${t}-item-container > ${t}-item-tail`]:{visibility:"hidden"}}},[`&${t}-navigation${t}-horizontal`]:{[`> ${t}-item > ${t}-item-container > ${t}-item-tail`]:{visibility:"hidden"}}}},xi=i=>{const{antCls:t,componentCls:e,iconSize:n,iconSizeSM:o,processIconColor:r,marginXXS:a,lineWidthBold:S,lineWidth:s,paddingXXS:g}=i,u=i.calc(n).add(i.calc(S).mul(4).equal()).equal(),h=i.calc(o).add(i.calc(i.lineWidth).mul(4).equal()).equal();return{[`&${e}-with-progress`]:{[`${e}-item`]:{paddingTop:g,[`&-process ${e}-item-container ${e}-item-icon ${e}-icon`]:{color:r}},[`&${e}-vertical > ${e}-item `]:{paddingInlineStart:g,[`> ${e}-item-container > ${e}-item-tail`]:{top:a,insetInlineStart:i.calc(n).div(2).sub(s).add(g).equal()}},[`&, &${e}-small`]:{[`&${e}-horizontal ${e}-item:first-child`]:{paddingBottom:g,paddingInlineStart:g}},[`&${e}-small${e}-vertical > ${e}-item > ${e}-item-container > ${e}-item-tail`]:{insetInlineStart:i.calc(o).div(2).sub(s).add(g).equal()},[`&${e}-label-vertical ${e}-item ${e}-item-tail`]:{top:i.calc(n).div(2).add(g).equal()},[`${e}-item-icon`]:{position:"relative",[`${t}-progress`]:{position:"absolute",insetInlineStart:"50%",top:"50%",transform:"translate(-50%, -50%)","&-inner":{width:`${(0,l.bf)(u)} !important`,height:`${(0,l.bf)(u)} !important`}}},[`&${e}-small`]:{[`&${e}-label-vertical ${e}-item ${e}-item-tail`]:{top:i.calc(o).div(2).add(g).equal()},[`${e}-item-icon ${t}-progress-inner`]:{width:`${(0,l.bf)(h)} !important`,height:`${(0,l.bf)(h)} !important`}}}}},Ti=i=>{const{componentCls:t,descriptionMaxWidth:e,lineHeight:n,dotCurrentSize:o,dotSize:r,motionDurationSlow:a}=i;return{[`&${t}-dot, &${t}-dot${t}-small`]:{[`${t}-item`]:{"&-title":{lineHeight:n},"&-tail":{top:i.calc(i.dotSize).sub(i.calc(i.lineWidth).mul(3).equal()).div(2).equal(),width:"100%",marginTop:0,marginBottom:0,marginInline:`${(0,l.bf)(i.calc(e).div(2).equal())} 0`,padding:0,"&::after":{width:`calc(100% - ${(0,l.bf)(i.calc(i.marginSM).mul(2).equal())})`,height:i.calc(i.lineWidth).mul(3).equal(),marginInlineStart:i.marginSM}},"&-icon":{width:r,height:r,marginInlineStart:i.calc(i.descriptionMaxWidth).sub(r).div(2).equal(),paddingInlineEnd:0,lineHeight:`${(0,l.bf)(r)}`,background:"transparent",border:0,[`${t}-icon-dot`]:{position:"relative",float:"left",width:"100%",height:"100%",borderRadius:100,transition:`all ${a}`,"&::after":{position:"absolute",top:i.calc(i.marginSM).mul(-1).equal(),insetInlineStart:i.calc(r).sub(i.calc(i.controlHeightLG).mul(1.5).equal()).div(2).equal(),width:i.calc(i.controlHeightLG).mul(1.5).equal(),height:i.controlHeight,background:"transparent",content:'""'}}},"&-content":{width:e},[`&-process ${t}-item-icon`]:{position:"relative",top:i.calc(r).sub(o).div(2).equal(),width:o,height:o,lineHeight:`${(0,l.bf)(o)}`,background:"none",marginInlineStart:i.calc(i.descriptionMaxWidth).sub(o).div(2).equal()},[`&-process ${t}-icon`]:{[`&:first-child ${t}-icon-dot`]:{insetInlineStart:0}}}},[`&${t}-vertical${t}-dot`]:{[`${t}-item-icon`]:{marginTop:i.calc(i.controlHeight).sub(r).div(2).equal(),marginInlineStart:0,background:"none"},[`${t}-item-process ${t}-item-icon`]:{marginTop:i.calc(i.controlHeight).sub(o).div(2).equal(),top:0,insetInlineStart:i.calc(r).sub(o).div(2).equal(),marginInlineStart:0},[`${t}-item > ${t}-item-container > ${t}-item-tail`]:{top:i.calc(i.controlHeight).sub(r).div(2).equal(),insetInlineStart:0,margin:0,padding:`${(0,l.bf)(i.calc(r).add(i.paddingXS).equal())} 0 ${(0,l.bf)(i.paddingXS)}`,"&::after":{marginInlineStart:i.calc(r).sub(i.lineWidth).div(2).equal()}},[`&${t}-small`]:{[`${t}-item-icon`]:{marginTop:i.calc(i.controlHeightSM).sub(r).div(2).equal()},[`${t}-item-process ${t}-item-icon`]:{marginTop:i.calc(i.controlHeightSM).sub(o).div(2).equal()},[`${t}-item > ${t}-item-container > ${t}-item-tail`]:{top:i.calc(i.controlHeightSM).sub(r).div(2).equal()}},[`${t}-item:first-child ${t}-icon-dot`]:{insetInlineStart:0},[`${t}-item-content`]:{width:"inherit"}}}},zi=i=>{const{componentCls:t}=i;return{[`&${t}-rtl`]:{direction:"rtl",[`${t}-item`]:{"&-subtitle":{float:"left"}},[`&${t}-navigation`]:{[`${t}-item::after`]:{transform:"rotate(-45deg)"}},[`&${t}-vertical`]:{[`> ${t}-item`]:{"&::after":{transform:"rotate(225deg)"},[`${t}-item-icon`]:{float:"right"}}},[`&${t}-dot`]:{[`${t}-item-icon ${t}-icon-dot, &${t}-small ${t}-item-icon ${t}-icon-dot`]:{float:"right"}}}}},wi=i=>{const{componentCls:t,iconSizeSM:e,fontSizeSM:n,fontSize:o,colorTextDescription:r}=i;return{[`&${t}-small`]:{[`&${t}-horizontal:not(${t}-label-vertical) ${t}-item`]:{paddingInlineStart:i.paddingSM,"&:first-child":{paddingInlineStart:0}},[`${t}-item-icon`]:{width:e,height:e,marginTop:0,marginBottom:0,marginInline:`0 ${(0,l.bf)(i.marginXS)}`,fontSize:n,lineHeight:`${(0,l.bf)(e)}`,textAlign:"center",borderRadius:e},[`${t}-item-title`]:{paddingInlineEnd:i.paddingSM,fontSize:o,lineHeight:`${(0,l.bf)(e)}`,"&::after":{top:i.calc(e).div(2).equal()}},[`${t}-item-description`]:{color:r,fontSize:o},[`${t}-item-tail`]:{top:i.calc(e).div(2).sub(i.paddingXXS).equal()},[`${t}-item-custom ${t}-item-icon`]:{width:"inherit",height:"inherit",lineHeight:"inherit",background:"none",border:0,borderRadius:0,[`> ${t}-icon`]:{fontSize:e,lineHeight:`${(0,l.bf)(e)}`,transform:"none"}}}}},Ni=i=>{const{componentCls:t,iconSizeSM:e,iconSize:n}=i;return{[`&${t}-vertical`]:{display:"flex",flexDirection:"column",[`> ${t}-item`]:{display:"block",flex:"1 0 auto",paddingInlineStart:0,overflow:"visible",[`${t}-item-icon`]:{float:"left",marginInlineEnd:i.margin},[`${t}-item-content`]:{display:"block",minHeight:i.calc(i.controlHeight).mul(1.5).equal(),overflow:"hidden"},[`${t}-item-title`]:{lineHeight:`${(0,l.bf)(n)}`},[`${t}-item-description`]:{paddingBottom:i.paddingSM}},[`> ${t}-item > ${t}-item-container > ${t}-item-tail`]:{position:"absolute",top:0,insetInlineStart:i.calc(n).div(2).sub(i.lineWidth).equal(),width:i.lineWidth,height:"100%",padding:`${(0,l.bf)(i.calc(i.marginXXS).mul(1.5).add(n).equal())} 0 ${(0,l.bf)(i.calc(i.marginXXS).mul(1.5).equal())}`,"&::after":{width:i.lineWidth,height:"100%"}},[`> ${t}-item:not(:last-child) > ${t}-item-container > ${t}-item-tail`]:{display:"block"},[` > ${t}-item > ${t}-item-container > ${t}-item-content > ${t}-item-title`]:{"&::after":{display:"none"}},[`&${t}-small ${t}-item-container`]:{[`${t}-item-tail`]:{position:"absolute",top:0,insetInlineStart:i.calc(e).div(2).sub(i.lineWidth).equal(),padding:`${(0,l.bf)(i.calc(i.marginXXS).mul(1.5).add(e).equal())} 0 ${(0,l.bf)(i.calc(i.marginXXS).mul(1.5).equal())}`},[`${t}-item-title`]:{lineHeight:`${(0,l.bf)(e)}`}}}}};const Ei="wait",Hi="process",Pi="finish",Oi="error",G=(i,t)=>{const e=`${t.componentCls}-item`,n=`${i}IconColor`,o=`${i}TitleColor`,r=`${i}DescriptionColor`,a=`${i}TailColor`,S=`${i}IconBgColor`,s=`${i}IconBorderColor`,g=`${i}DotColor`;return{[`${e}-${i} ${e}-icon`]:{backgroundColor:t[S],borderColor:t[s],[`> ${t.componentCls}-icon`]:{color:t[n],[`${t.componentCls}-icon-dot`]:{background:t[g]}}},[`${e}-${i}${e}-custom ${e}-icon`]:{[`> ${t.componentCls}-icon`]:{color:t[g]}},[`${e}-${i} > ${e}-container > ${e}-content > ${e}-title`]:{color:t[o],"&::after":{backgroundColor:t[a]}},[`${e}-${i} > ${e}-container > ${e}-content > ${e}-description`]:{color:t[r]},[`${e}-${i} > ${e}-container > ${e}-tail::after`]:{backgroundColor:t[a]}}},Di=i=>{const{componentCls:t,motionDurationSlow:e}=i,n=`${t}-item`,o=`${n}-icon`;return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({[n]:{position:"relative",display:"inline-block",flex:1,overflow:"hidden",verticalAlign:"top","&:last-child":{flex:"none",[`> ${n}-container > ${n}-tail, > ${n}-container >  ${n}-content > ${n}-title::after`]:{display:"none"}}},[`${n}-container`]:{outline:"none","&:focus-visible":{[o]:Object.assign({},(0,K.oN)(i))}},[`${o}, ${n}-content`]:{display:"inline-block",verticalAlign:"top"},[o]:{width:i.iconSize,height:i.iconSize,marginTop:0,marginBottom:0,marginInlineStart:0,marginInlineEnd:i.marginXS,fontSize:i.iconFontSize,fontFamily:i.fontFamily,lineHeight:`${(0,l.bf)(i.iconSize)}`,textAlign:"center",borderRadius:i.iconSize,border:`${(0,l.bf)(i.lineWidth)} ${i.lineType} transparent`,transition:`background-color ${e}, border-color ${e}`,[`${t}-icon`]:{position:"relative",top:i.iconTop,color:i.colorPrimary,lineHeight:1}},[`${n}-tail`]:{position:"absolute",top:i.calc(i.iconSize).div(2).equal(),insetInlineStart:0,width:"100%","&::after":{display:"inline-block",width:"100%",height:i.lineWidth,background:i.colorSplit,borderRadius:i.lineWidth,transition:`background ${e}`,content:'""'}},[`${n}-title`]:{position:"relative",display:"inline-block",paddingInlineEnd:i.padding,color:i.colorText,fontSize:i.fontSizeLG,lineHeight:`${(0,l.bf)(i.titleLineHeight)}`,"&::after":{position:"absolute",top:i.calc(i.titleLineHeight).div(2).equal(),insetInlineStart:"100%",display:"block",width:9999,height:i.lineWidth,background:i.processTailColor,content:'""'}},[`${n}-subtitle`]:{display:"inline",marginInlineStart:i.marginXS,color:i.colorTextDescription,fontWeight:"normal",fontSize:i.fontSize},[`${n}-description`]:{color:i.colorTextDescription,fontSize:i.fontSize}},G(Ei,i)),G(Hi,i)),{[`${n}-process > ${n}-container > ${n}-title`]:{fontWeight:i.fontWeightStrong}}),G(Pi,i)),G(Oi,i)),{[`${n}${t}-next-error > ${t}-item-title::after`]:{background:i.colorError},[`${n}-disabled`]:{cursor:"not-allowed"}})},Wi=i=>{const{componentCls:t,motionDurationSlow:e}=i;return{[`& ${t}-item`]:{[`&:not(${t}-item-active)`]:{[`& > ${t}-item-container[role='button']`]:{cursor:"pointer",[`${t}-item`]:{[`&-title, &-subtitle, &-description, &-icon ${t}-icon`]:{transition:`color ${e}`}},"&:hover":{[`${t}-item`]:{"&-title, &-subtitle, &-description":{color:i.colorPrimary}}}},[`&:not(${t}-item-process)`]:{[`& > ${t}-item-container[role='button']:hover`]:{[`${t}-item`]:{"&-icon":{borderColor:i.colorPrimary,[`${t}-icon`]:{color:i.colorPrimary}}}}}}},[`&${t}-horizontal:not(${t}-label-vertical)`]:{[`${t}-item`]:{paddingInlineStart:i.padding,whiteSpace:"nowrap","&:first-child":{paddingInlineStart:0},[`&:last-child ${t}-item-title`]:{paddingInlineEnd:0},"&-tail":{display:"none"},"&-description":{maxWidth:i.descriptionMaxWidth,whiteSpace:"normal"}}}}},ji=i=>{const{componentCls:t}=i;return{[t]:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},(0,K.Wf)(i)),{display:"flex",width:"100%",fontSize:0,textAlign:"initial"}),Di(i)),Wi(i)),bi(i)),wi(i)),Ni(i)),vi(i)),yi(i)),Ti(i)),Ii(i)),zi(i)),xi(i)),Ci(i))}},Mi=i=>({titleLineHeight:i.controlHeight,customIconSize:i.controlHeight,customIconTop:0,customIconFontSize:i.controlHeightSM,iconSize:i.controlHeight,iconTop:-.5,iconFontSize:i.fontSize,iconSizeSM:i.fontSizeHeading3,dotSize:i.controlHeight/4,dotCurrentSize:i.controlHeightLG/4,navArrowColor:i.colorTextDisabled,navContentMaxWidth:"auto",descriptionMaxWidth:140,waitIconColor:i.wireframe?i.colorTextDisabled:i.colorTextLabel,waitIconBgColor:i.wireframe?i.colorBgContainer:i.colorFillContent,waitIconBorderColor:i.wireframe?i.colorTextDisabled:"transparent",finishIconBgColor:i.wireframe?i.colorBgContainer:i.controlItemBgActive,finishIconBorderColor:i.wireframe?i.colorPrimary:i.controlItemBgActive});var qi=(0,hi.I$)("Steps",i=>{const{colorTextDisabled:t,controlHeightLG:e,colorTextLightSolid:n,colorText:o,colorPrimary:r,colorTextDescription:a,colorTextQuaternary:S,colorError:s,colorBorderSecondary:g,colorSplit:u}=i,h=(0,fi.IX)(i,{processIconColor:n,processTitleColor:o,processDescriptionColor:o,processIconBgColor:r,processIconBorderColor:r,processDotColor:r,processTailColor:u,waitTitleColor:a,waitDescriptionColor:a,waitTailColor:u,waitDotColor:t,finishIconColor:r,finishTitleColor:o,finishDescriptionColor:a,finishTailColor:r,finishDotColor:r,errorIconColor:n,errorTitleColor:s,errorDescriptionColor:s,errorTailColor:u,errorIconBgColor:s,errorIconBorderColor:s,errorDotColor:s,stepsNavActiveColor:r,stepsProgressSize:e,inlineDotSize:6,inlineTitleColor:S,inlineTailColor:g});return[ji(h)]},Mi),Bi=m(50344);function Xi(i){return i.filter(t=>t)}function Zi(i,t){if(i)return i;const e=(0,Bi.Z)(t).map(n=>{if(c.isValidElement(n)){const{props:o}=n;return Object.assign({},o)}return null});return Xi(e)}var Ai=function(i,t){var e={};for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&t.indexOf(n)<0&&(e[n]=i[n]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(i);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(i,n[o])&&(e[n[o]]=i[n[o]]);return e};const ti=i=>{const{percent:t,size:e,className:n,rootClassName:o,direction:r,items:a,responsive:S=!0,current:s=0,children:g,style:u}=i,h=Ai(i,["percent","size","className","rootClassName","direction","items","responsive","current","children","style"]),{xs:x}=(0,$i.Z)(S),{getPrefixCls:w,direction:T,steps:f}=c.useContext(gi.E_),N=c.useMemo(()=>S&&x?"vertical":r,[x,r]),E=(0,pi.Z)(e),d=w("steps",i.prefixCls),[H,v,z]=qi(d),P=i.type==="inline",X=w("",i.iconPrefix),j=Zi(a,g),C=P?void 0:t,Z=Object.assign(Object.assign({},f==null?void 0:f.style),u),O=L()(f==null?void 0:f.className,{[`${d}-rtl`]:T==="rtl",[`${d}-with-progress`]:C!==void 0},n,o,v,z),M={finish:c.createElement(ri.Z,{className:`${d}-finish-icon`}),error:c.createElement(li.Z,{className:`${d}-error-icon`})},q=y=>{let{node:$,status:p}=y;if(p==="process"&&C!==void 0){const W=E==="small"?32:40;return c.createElement("div",{className:`${d}-progress-icon`},c.createElement(ui.Z,{type:"circle",percent:C,size:W,strokeWidth:4,format:()=>null}),$)}return $},D=(y,$)=>y.description?c.createElement(Si.Z,{title:y.description},$):$;return H(c.createElement(ii,Object.assign({icons:M},h,{style:Z,current:s,size:E,items:j,itemRender:P?D:void 0,stepIcon:q,direction:N,prefixCls:d,iconPrefix:X,className:O})))};ti.Step=ii.Step;var Li=ti}}]);
