import{g as ge,h as Jt,u as ve,d as In,i as Kt,j as Qt,o as j,c as en,e as U,a as tn,k as B,H as me,l as mt,P as ye,n as yt,p as _e,q as Se,M as we,s as kn,t as _t,F as Gn,v as St,x as wt,y as Et,z as jn,A as Ee,B as Me,_ as pt,S as Mt,C as Re,D as Te,E as Rt,G as Tt,I as Nt,J as Ne,K as Ce,L as Pe,N as $e,O as Ae,w as vn,T as Ct,r as Pt,Q as $t,b as De}from"./index-DBXq9XSb.js";const Ie={timeline:{containerId:"timeline_container",containerWidth:"",containerHeight:220,activeFlag:0,offset:0,flagWidth:120,init:!1,rulerNum:6,rulerMarkers:[{time:null,position:null}]},flags:[{time:"2024-01-01",location:[-74,40.6],title:"特朗普",content:"纽约州法院取消特朗普前私人律师朱利安尼的律师资格",img:"https://mediabluk.cnr.cn/record/img/cnr/CNRCDP/2023/0609/a9597944f437430fbee597cab4c9bf7e10.jpg",row:1},{time:"2024-03-01",location:[0,51],title:"伦敦",content:"伦敦股市连续三日大涨",img:"https://pic.uhzcdn.com/onlinetips/cdn/2017/05/1-3.jpg",row:2},{time:"2024-06-01",location:[103,1],title:"中日防长",img:"https://p1.itc.cn/images01/20210618/18d5e60acfba401c9d24d808a1eb9fd6.jpeg",content:"日中防长于新加坡举行会谈",row:"middle"},{time:"2024-06-10",location:[2.45,49],title:"巴黎抗议",content:"极右翼首轮投票领先，巴黎、里昂爆发抗议活动",img:"https://gocity.com.cn/upload/image/20230918/102826656.jpg",row:null},{time:"2024-06-25",location:[139.6,35.6],title:"东京选情",content:"选情调查：东京都知事选举小池百合子暂时领先",img:"https://media.istockphoto.com/id/1623820103/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E6%9D%B1%E4%BA%AC%E3%81%AE%E8%A1%97%E4%B8%A6%E3%81%BF%E7%A9%BA%E6%92%AE.webp?s=2048x2048&w=is&k=20&c=wWZ6HivZ4fTAngwRO0I6fC1PgHXnHIN0mAniUAbWlyk=",row:null},{time:"2024-07-03",title:"北京入境",content:"上半年北京口岸入境外国人同比增两倍多",location:[116,39],img:"https://q7.itc.cn/q_70/images01/20240604/74cecbb1f3794f2bbac29af8d84deded.jpeg",row:null}]},Le="/assets/icon-BjmIwxff.jpg",Cn=24*60*60*1e3;class ke{constructor(){this.flagLayer={top:null,middle:null,bottom:null},this.dateMap={}}render(n){let i=n.timeline;this.time2Date(n);const e=document.getElementById(`${i.containerId}`);i.containerWidth=e.offsetWidth,i.containerHeight=i.containerHeight,i.offset=0,i.offsetOld=0,i.flagHeight=i.containerHeight*.95*.65/3,i.flagMargin=i.containerHeight*.9*.35/4,this.flagLayer.middle=i.flagMargin*2+i.flagHeight,this.flagLayer.top=i.flagMargin,this.flagLayer.bottom=i.flagMargin*3+i.flagHeight*2,this.renderFlags(n)}renderFlags(n){let i=n.timeline,e=n.flags;i.ruler?this.ruler=i.ruler:(this.ruler=this.calRuler(e,i.containerWidth*.5-i.flagWidth),i.ruler=this.ruler),this.setRows(e,i),this.renderRulerMarkers(n)}time2Date(n){n.flags.forEach(e=>{e.time=new Date(e.time)})}renderRulerMarkers(n){var i=n.timeline,e=n.flags;this.sortFlags(e),this.genRulerMarkerTime(i,e)}genRulerMarkerTime(n,i){this.dateMap={};var e=this.calInterval(i[0].time,i[i.length-1].time);const r=this.calBaseDay(n,i),o=e/((n.rulerNum-1)/2);var l=n.rulerMarkers;for(let c=0;c<n.rulerNum;c++){let g={time:null,position:null,content:null};l[c]=g,l[c].time=new Date,l[c].time.setTime(r.getTime()+c*o*Cn),l[c].position=this.time2Position(l[c].time,i,n);const{content:d,timeType:a}=this.time2Display(l[c].time);l[c].content=d,l[c].timeType=a}}time2Display(n){let i=n.getFullYear(),e=n.getMonth()+1,r=n.getDate(),o="",l="";return i<0&&(o="BC",i=-i),this.dateMap[i]?(o+=`${e}月${r}日`,l="month"):(this.dateMap[i]=!0,o+=`${i}年${e}月${r}日`,l="year"),{content:o,timeType:l}}calBaseDay(n,i){const e=this.calInterval(i[0].time,i[i.length-1].time),r=new Date;return r.setTime(i[0].time.getTime()-e*Cn),r}time2Position(n,i,e){const r=i[0].time,o=(n.getTime()-r.getTime())/Cn;return e.containerWidth*.5+o*this.ruler}setRows(n,i){n[0].time,n.forEach((e,r,o)=>{e.position=this.time2Position(e.time,o,i),r>0&&this.calInterval(o[r-1].time,e.time)*this.ruler<i.flagWidth?r>1&&this.calInterval(o[r-2].time,e.time)*this.ruler<i.flagWidth?e.row=this.restRow(o[r-1].row,o[r-2].row):e.row=this.nextRow(o[r-1].row):e.row="middle",e.layer=this.flagLayer[e.row]})}restRow(n,i){var e=["middle","top","bottom"];let r=3-e.indexOf(n)-e.indexOf(i);return e[r]}nextRow(n){var i=["middle","top","bottom"];let e=(i.indexOf(n)+1)%3;return i[e]}positionFlags(n){let i=n.timeline,e=n.flags,r=e[0].position-e[i.activeFlag].position;i.offsetOld=i.offset,i.offset=r}sortFlags(n){return n.sort((i,e)=>this.calTime(i.time)-this.calTime(e.time)),n}calInterval(n,i){const e=new Date(n),o=new Date(i).getTime()-e.getTime();return Math.ceil(o/Cn)}calTime(n){return this.calInterval("0001-01-01",n)}calRuler(n,i){return this.sortFlags(n),i/this.calInterval(n[0].time,n[n.length-1].time)}}let Jn=[],Mn,Kn;const Fe=async()=>{try{Kn=await navigator.mediaDevices.getDisplayMedia({preferCurrentTab:!0,displaySurface:"browser",video:{cursor:"always",frameRate:{ideal:120}},videoBitsPerSecond:16e7,audio:!0}),Mn=new ge(Kn,{mimeType:"video/webm;codecs=vp9",videoBitsPerSecond:64e6,timeslice:100}),Mn.ondataavailable=t=>{console.log("recording!!!"),console.log(t.data),Jn.push(t.data)},Mn.start()}catch(t){console.log("recording error!!!"),console.error(t)}},ze=async()=>{Mn.stop(),await new Promise(e=>Mn.onstop=e);const t=new Blob(Jn,{type:"video/webm"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download="recording.webm",i.click(),Kn.getTracks().forEach(e=>e.stop()),URL.revokeObjectURL(n),Jn=[]},ht=t=>(Ee("data-v-7da99d2e"),t=t(),Me(),t),Oe={id:"timeline_container"},Be={id:"toolbox"},He=ht(()=>U("div",{class:"baseline_v"},null,-1)),We=ht(()=>U("div",{class:"baseline_h"},null,-1)),Ue={class:"flagwraper"},Ye=["onClick"],qe=["src"],Ve={class:"content"},Xe=ht(()=>U("div",{class:"pole"},[U("div",{class:"poleheader"}),U("div",{class:"polefooter"})],-1)),Ze=5250,Ge=Jt({__name:"Timeline",setup(t){const n=ve(),i=Ie,e=i.flags,r=i.timeline,o=In(!0),l=Kt();In(1);let c=In(!1);const g=new ke;Qt(()=>{d()});const d=()=>{g.render(i),o.value=!o.value},a=y=>{s(y),o.value=!o.value;const v=e[y];l.commit("updateLocation",v.location),l.commit("updateContent",{content:v.content,img:v.img})},s=y=>{r.activeFlag=y,g.positionFlags(i),r.init=!0},u=async y=>{y==="magnify"?(i.timeline.ruler*=1.5,i.timeline.rulerNum*=1.5):y==="reduce"?(i.timeline.ruler/=1.5,i.timeline.rulerNum/=1.5):y==="home"?n.replace({name:"news"}):y=="play"?(c.value=!0,await Fe(),f(0)):y=="stop"&&(await ze(),c.value=!1),d()},f=y=>{let v=2e3+Ze;console.log(y),a(y),setTimeout(()=>{console.log(y),y+=1,y!=e.length?f(y):u("stop")},v)},p=y=>{y.clientX},w=y=>{},m=()=>{};return(y,v)=>{const E=wt("TimelineFlag"),_=wt("TimelineDrag");return j(),en("div",Oe,[U("div",Be,[tn(B(me),{style:{fontSize:"20px"},onClick:v[0]||(v[0]=S=>u("home"))}),B(c)?yt("",!0):(j(),mt(B(ye),{key:0,style:{fontSize:"20px"},onClick:v[1]||(v[1]=S=>u("play"))})),B(c)?(j(),mt(B(_e),{key:1,style:{fontSize:"20px"},onClick:v[2]||(v[2]=S=>u("stop"))})):yt("",!0),tn(B(Se),{style:{fontSize:"20px"},onClick:v[3]||(v[3]=S=>u("magnify"))}),tn(B(we),{style:{fontSize:"20px"},onClick:v[4]||(v[4]=S=>u("reduce"))})]),He,We,kn((j(),en("div",{class:"dragable_container",style:_t({left:B(r).offset+"px"}),onMousedown:p,onMousemove:w,onMouseup:m},[U("div",Ue,[(j(!0),en(Gn,null,St(B(e),(S,M)=>kn((j(),en("div",{key:M,class:"timeflag",onClick:$=>a(M)},[U("div",{class:Et(["marker",{marker_active:M==B(r).activeFlag}])},[U("img",{class:"icon",src:B(Le)},null,8,qe),U("div",Ve,jn(S.title),1)],2),Xe],8,Ye)),[[E,{flag:S,timeline:B(r),refreshFlag:o.value}]])),128)),(j(!0),en(Gn,null,St(B(r).rulerMarkers,(S,M)=>(j(),en("div",{key:M,class:Et(["rulermarker",{year_type:S.timeType=="year"}]),style:_t({left:S.position+"px"})},jn(S.content),7))),128))])],36)),[[_,{timeline:B(r),refreshFlag:o.value}]])])}}}),je=pt(Ge,[["__scopeId","data-v-7da99d2e"]]);class ln{constructor(){this._partials=new Float64Array(32),this._n=0}add(n){const i=this._partials;let e=0;for(let r=0;r<this._n&&r<32;r++){const o=i[r],l=n+o,c=Math.abs(n)<Math.abs(o)?n-(l-o):o-(l-n);c&&(i[e++]=c),n=l}return i[e]=n,this._n=e+1,this}valueOf(){const n=this._partials;let i=this._n,e,r,o,l=0;if(i>0){for(l=n[--i];i>0&&(e=l,r=n[--i],l=e+r,o=r-(l-e),!o););i>0&&(o<0&&n[i-1]<0||o>0&&n[i-1]>0)&&(r=o*2,e=l+r,r==e-l&&(l=e))}return l}}function*Je(t){for(const n of t)yield*n}function xt(t){return Array.from(Je(t))}function Ke(t){return typeof t=="string"?new Mt([[document.querySelector(t)]],[document.documentElement]):new Mt([[t]],Re)}function Qe(t,n){n||(n=[]);var i=t?Math.min(n.length,t.length):0,e=n.slice(),r;return function(o){for(r=0;r<i;++r)e[r]=t[r]*(1-o)+n[r]*o;return e}}function xe(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function be(t,n){var i=n?n.length:0,e=t?Math.min(i,t.length):0,r=new Array(e),o=new Array(i),l;for(l=0;l<e;++l)r[l]=dt(t[l],n[l]);for(;l<i;++l)o[l]=n[l];return function(c){for(l=0;l<e;++l)o[l]=r[l](c);return o}}function ni(t,n){var i=new Date;return t=+t,n=+n,function(e){return i.setTime(t*(1-e)+n*e),i}}function ti(t,n){var i={},e={},r;(t===null||typeof t!="object")&&(t={}),(n===null||typeof n!="object")&&(n={});for(r in n)r in t?i[r]=dt(t[r],n[r]):e[r]=n[r];return function(o){for(r in i)e[r]=i[r](o);return e}}function dt(t,n){var i=typeof n,e;return n==null||i==="boolean"?Te(n):(i==="number"?Rt:i==="string"?(e=Tt(n))?(n=e,Nt):Ne:n instanceof Tt?Nt:n instanceof Date?ni:xe(n)?Qe:Array.isArray(n)?be:typeof n.valueOf!="function"&&typeof n.toString!="function"||isNaN(n)?ti:Rt)(t,n)}function ei(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);if(!(t.status===204||t.status===205))return t.json()}function ii(t,n){return fetch(t,n).then(ei)}var D=1e-6,ri=1e-12,N=Math.PI,X=N/2,At=N/4,G=N*2,b=180/N,Y=N/180,F=Math.abs,oi=Math.atan,pn=Math.atan2,k=Math.cos,L=Math.sin,li=Math.sign||function(t){return t>0?1:t<0?-1:0},rn=Math.sqrt;function ai(t){return t>1?0:t<-1?N:Math.acos(t)}function an(t){return t>1?X:t<-1?-X:Math.asin(t)}function Z(){}function Fn(t,n){t&&It.hasOwnProperty(t.type)&&It[t.type](t,n)}var Dt={Feature:function(t,n){Fn(t.geometry,n)},FeatureCollection:function(t,n){for(var i=t.features,e=-1,r=i.length;++e<r;)Fn(i[e].geometry,n)}},It={Sphere:function(t,n){n.sphere()},Point:function(t,n){t=t.coordinates,n.point(t[0],t[1],t[2])},MultiPoint:function(t,n){for(var i=t.coordinates,e=-1,r=i.length;++e<r;)t=i[e],n.point(t[0],t[1],t[2])},LineString:function(t,n){Qn(t.coordinates,n,0)},MultiLineString:function(t,n){for(var i=t.coordinates,e=-1,r=i.length;++e<r;)Qn(i[e],n,0)},Polygon:function(t,n){Lt(t.coordinates,n)},MultiPolygon:function(t,n){for(var i=t.coordinates,e=-1,r=i.length;++e<r;)Lt(i[e],n)},GeometryCollection:function(t,n){for(var i=t.geometries,e=-1,r=i.length;++e<r;)Fn(i[e],n)}};function Qn(t,n,i){var e=-1,r=t.length-i,o;for(n.lineStart();++e<r;)o=t[e],n.point(o[0],o[1],o[2]);n.lineEnd()}function Lt(t,n){var i=-1,e=t.length;for(n.polygonStart();++i<e;)Qn(t[i],n,1);n.polygonEnd()}function sn(t,n){t&&Dt.hasOwnProperty(t.type)?Dt[t.type](t,n):Fn(t,n)}function xn(t){return[pn(t[1],t[0]),an(t[2])]}function hn(t){var n=t[0],i=t[1],e=k(i);return[e*k(n),e*L(n),L(i)]}function Pn(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function zn(t,n){return[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]]}function qn(t,n){t[0]+=n[0],t[1]+=n[1],t[2]+=n[2]}function $n(t,n){return[t[0]*n,t[1]*n,t[2]*n]}function bn(t){var n=rn(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=n,t[1]/=n,t[2]/=n}function nt(t,n){function i(e,r){return e=t(e,r),n(e[0],e[1])}return t.invert&&n.invert&&(i.invert=function(e,r){return e=n.invert(e,r),e&&t.invert(e[0],e[1])}),i}function tt(t,n){return F(t)>N&&(t-=Math.round(t/G)*G),[t,n]}tt.invert=tt;function ci(t,n,i){return(t%=G)?n||i?nt(Ft(t),zt(n,i)):Ft(t):n||i?zt(n,i):tt}function kt(t){return function(n,i){return n+=t,F(n)>N&&(n-=Math.round(n/G)*G),[n,i]}}function Ft(t){var n=kt(t);return n.invert=kt(-t),n}function zt(t,n){var i=k(t),e=L(t),r=k(n),o=L(n);function l(c,g){var d=k(g),a=k(c)*d,s=L(c)*d,u=L(g),f=u*i+a*e;return[pn(s*r-f*o,a*i-u*e),an(f*r+s*o)]}return l.invert=function(c,g){var d=k(g),a=k(c)*d,s=L(c)*d,u=L(g),f=u*r-s*o;return[pn(s*r+u*o,a*i+f*e),an(f*i-a*e)]},l}function ui(t,n,i,e,r,o){if(i){var l=k(n),c=L(n),g=e*i;r==null?(r=n+e*G,o=n-g/2):(r=Ot(l,r),o=Ot(l,o),(e>0?r<o:r>o)&&(r+=e*G));for(var d,a=r;e>0?a>o:a<o;a-=g)d=xn([l,-c*k(a),-c*L(a)]),t.point(d[0],d[1])}}function Ot(t,n){n=hn(n),n[0]-=t,bn(n);var i=ai(-n[1]);return((-n[2]<0?-i:i)+G-D)%G}function bt(){var t=[],n;return{point:function(i,e,r){n.push([i,e,r])},lineStart:function(){t.push(n=[])},lineEnd:Z,rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))},result:function(){var i=t;return t=[],n=null,i}}}function Ln(t,n){return F(t[0]-n[0])<D&&F(t[1]-n[1])<D}function An(t,n,i,e){this.x=t,this.z=n,this.o=i,this.e=e,this.v=!1,this.n=this.p=null}function ne(t,n,i,e,r){var o=[],l=[],c,g;if(t.forEach(function(p){if(!((w=p.length-1)<=0)){var w,m=p[0],y=p[w],v;if(Ln(m,y)){if(!m[2]&&!y[2]){for(r.lineStart(),c=0;c<w;++c)r.point((m=p[c])[0],m[1]);r.lineEnd();return}y[0]+=2*D}o.push(v=new An(m,p,null,!0)),l.push(v.o=new An(m,null,v,!1)),o.push(v=new An(y,p,null,!1)),l.push(v.o=new An(y,null,v,!0))}}),!!o.length){for(l.sort(n),Bt(o),Bt(l),c=0,g=l.length;c<g;++c)l[c].e=i=!i;for(var d=o[0],a,s;;){for(var u=d,f=!0;u.v;)if((u=u.n)===d)return;a=u.z,r.lineStart();do{if(u.v=u.o.v=!0,u.e){if(f)for(c=0,g=a.length;c<g;++c)r.point((s=a[c])[0],s[1]);else e(u.x,u.n.x,1,r);u=u.n}else{if(f)for(a=u.p.z,c=a.length-1;c>=0;--c)r.point((s=a[c])[0],s[1]);else e(u.x,u.p.x,-1,r);u=u.p}u=u.o,a=u.z,f=!f}while(!u.v);r.lineEnd()}}}function Bt(t){if(n=t.length){for(var n,i=0,e=t[0],r;++i<n;)e.n=r=t[i],r.p=e,e=r;e.n=r=t[0],r.p=e}}function Vn(t){return F(t[0])<=N?t[0]:li(t[0])*((F(t[0])+N)%G-N)}function si(t,n){var i=Vn(n),e=n[1],r=L(e),o=[L(i),-k(i),0],l=0,c=0,g=new ln;r===1?e=X+D:r===-1&&(e=-X-D);for(var d=0,a=t.length;d<a;++d)if(u=(s=t[d]).length)for(var s,u,f=s[u-1],p=Vn(f),w=f[1]/2+At,m=L(w),y=k(w),v=0;v<u;++v,p=_,m=M,y=$,f=E){var E=s[v],_=Vn(E),S=E[1]/2+At,M=L(S),$=k(S),C=_-p,P=C>=0?1:-1,I=P*C,R=I>N,H=m*M;if(g.add(pn(H*P*L(I),y*$+H*k(I))),l+=R?C+P*G:C,R^p>=i^_>=i){var z=zn(hn(f),hn(E));bn(z);var A=zn(o,z);bn(A);var h=(R^C>=0?-1:1)*an(A[2]);(e>h||e===h&&(z[0]||z[1]))&&(c+=R^C>=0?1:-1)}}return(l<-D||l<D&&g<-ri)^c&1}function te(t,n,i,e){return function(r){var o=n(r),l=bt(),c=n(l),g=!1,d,a,s,u={point:f,lineStart:w,lineEnd:m,polygonStart:function(){u.point=y,u.lineStart=v,u.lineEnd=E,a=[],d=[]},polygonEnd:function(){u.point=f,u.lineStart=w,u.lineEnd=m,a=xt(a);var _=si(d,e);a.length?(g||(r.polygonStart(),g=!0),ne(a,pi,_,i,r)):_&&(g||(r.polygonStart(),g=!0),r.lineStart(),i(null,null,1,r),r.lineEnd()),g&&(r.polygonEnd(),g=!1),a=d=null},sphere:function(){r.polygonStart(),r.lineStart(),i(null,null,1,r),r.lineEnd(),r.polygonEnd()}};function f(_,S){t(_,S)&&r.point(_,S)}function p(_,S){o.point(_,S)}function w(){u.point=p,o.lineStart()}function m(){u.point=f,o.lineEnd()}function y(_,S){s.push([_,S]),c.point(_,S)}function v(){c.lineStart(),s=[]}function E(){y(s[0][0],s[0][1]),c.lineEnd();var _=c.clean(),S=l.result(),M,$=S.length,C,P,I;if(s.pop(),d.push(s),s=null,!!$){if(_&1){if(P=S[0],(C=P.length-1)>0){for(g||(r.polygonStart(),g=!0),r.lineStart(),M=0;M<C;++M)r.point((I=P[M])[0],I[1]);r.lineEnd()}return}$>1&&_&2&&S.push(S.pop().concat(S.shift())),a.push(S.filter(fi))}}return u}}function fi(t){return t.length>1}function pi(t,n){return((t=t.x)[0]<0?t[1]-X-D:X-t[1])-((n=n.x)[0]<0?n[1]-X-D:X-n[1])}const Ht=te(function(){return!0},hi,gi,[-N,-X]);function hi(t){var n=NaN,i=NaN,e=NaN,r;return{lineStart:function(){t.lineStart(),r=1},point:function(o,l){var c=o>0?N:-N,g=F(o-n);F(g-N)<D?(t.point(n,i=(i+l)/2>0?X:-X),t.point(e,i),t.lineEnd(),t.lineStart(),t.point(c,i),t.point(o,i),r=0):e!==c&&g>=N&&(F(n-e)<D&&(n-=e*D),F(o-c)<D&&(o-=c*D),i=di(n,i,o,l),t.point(e,i),t.lineEnd(),t.lineStart(),t.point(c,i),r=0),t.point(n=o,i=l),e=c},lineEnd:function(){t.lineEnd(),n=i=NaN},clean:function(){return 2-r}}}function di(t,n,i,e){var r,o,l=L(t-i);return F(l)>D?oi((L(n)*(o=k(e))*L(i)-L(e)*(r=k(n))*L(t))/(r*o*l)):(n+e)/2}function gi(t,n,i,e){var r;if(t==null)r=i*X,e.point(-N,r),e.point(0,r),e.point(N,r),e.point(N,0),e.point(N,-r),e.point(0,-r),e.point(-N,-r),e.point(-N,0),e.point(-N,r);else if(F(t[0]-n[0])>D){var o=t[0]<n[0]?N:-N;r=i*o/2,e.point(-o,r),e.point(0,r),e.point(o,r)}else e.point(n[0],n[1])}function vi(t){var n=k(t),i=2*Y,e=n>0,r=F(n)>D;function o(a,s,u,f){ui(f,t,i,u,a,s)}function l(a,s){return k(a)*k(s)>n}function c(a){var s,u,f,p,w;return{lineStart:function(){p=f=!1,w=1},point:function(m,y){var v=[m,y],E,_=l(m,y),S=e?_?0:d(m,y):_?d(m+(m<0?N:-N),y):0;if(!s&&(p=f=_)&&a.lineStart(),_!==f&&(E=g(s,v),(!E||Ln(s,E)||Ln(v,E))&&(v[2]=1)),_!==f)w=0,_?(a.lineStart(),E=g(v,s),a.point(E[0],E[1])):(E=g(s,v),a.point(E[0],E[1],2),a.lineEnd()),s=E;else if(r&&s&&e^_){var M;!(S&u)&&(M=g(v,s,!0))&&(w=0,e?(a.lineStart(),a.point(M[0][0],M[0][1]),a.point(M[1][0],M[1][1]),a.lineEnd()):(a.point(M[1][0],M[1][1]),a.lineEnd(),a.lineStart(),a.point(M[0][0],M[0][1],3)))}_&&(!s||!Ln(s,v))&&a.point(v[0],v[1]),s=v,f=_,u=S},lineEnd:function(){f&&a.lineEnd(),s=null},clean:function(){return w|(p&&f)<<1}}}function g(a,s,u){var f=hn(a),p=hn(s),w=[1,0,0],m=zn(f,p),y=Pn(m,m),v=m[0],E=y-v*v;if(!E)return!u&&a;var _=n*y/E,S=-n*v/E,M=zn(w,m),$=$n(w,_),C=$n(m,S);qn($,C);var P=M,I=Pn($,P),R=Pn(P,P),H=I*I-R*(Pn($,$)-1);if(!(H<0)){var z=rn(H),A=$n(P,(-I-z)/R);if(qn(A,$),A=xn(A),!u)return A;var h=a[0],T=s[0],O=a[1],W=s[1],q;T<h&&(q=h,h=T,T=q);var gn=T-h,Q=F(gn-N)<D,on=Q||gn<D;if(!Q&&W<O&&(q=O,O=W,W=q),on?Q?O+W>0^A[1]<(F(A[0]-h)<D?O:W):O<=A[1]&&A[1]<=W:gn>N^(h<=A[0]&&A[0]<=T)){var x=$n(P,(-I+z)/R);return qn(x,$),[A,xn(x)]}}}function d(a,s){var u=e?t:N-t,f=0;return a<-u?f|=1:a>u&&(f|=2),s<-u?f|=4:s>u&&(f|=8),f}return te(l,c,o,e?[0,-t]:[-N,t-N])}function mi(t,n,i,e,r,o){var l=t[0],c=t[1],g=n[0],d=n[1],a=0,s=1,u=g-l,f=d-c,p;if(p=i-l,!(!u&&p>0)){if(p/=u,u<0){if(p<a)return;p<s&&(s=p)}else if(u>0){if(p>s)return;p>a&&(a=p)}if(p=r-l,!(!u&&p<0)){if(p/=u,u<0){if(p>s)return;p>a&&(a=p)}else if(u>0){if(p<a)return;p<s&&(s=p)}if(p=e-c,!(!f&&p>0)){if(p/=f,f<0){if(p<a)return;p<s&&(s=p)}else if(f>0){if(p>s)return;p>a&&(a=p)}if(p=o-c,!(!f&&p<0)){if(p/=f,f<0){if(p>s)return;p>a&&(a=p)}else if(f>0){if(p<a)return;p<s&&(s=p)}return a>0&&(t[0]=l+a*u,t[1]=c+a*f),s<1&&(n[0]=l+s*u,n[1]=c+s*f),!0}}}}}var yn=1e9,Dn=-yn;function yi(t,n,i,e){function r(d,a){return t<=d&&d<=i&&n<=a&&a<=e}function o(d,a,s,u){var f=0,p=0;if(d==null||(f=l(d,s))!==(p=l(a,s))||g(d,a)<0^s>0)do u.point(f===0||f===3?t:i,f>1?e:n);while((f=(f+s+4)%4)!==p);else u.point(a[0],a[1])}function l(d,a){return F(d[0]-t)<D?a>0?0:3:F(d[0]-i)<D?a>0?2:1:F(d[1]-n)<D?a>0?1:0:a>0?3:2}function c(d,a){return g(d.x,a.x)}function g(d,a){var s=l(d,1),u=l(a,1);return s!==u?s-u:s===0?a[1]-d[1]:s===1?d[0]-a[0]:s===2?d[1]-a[1]:a[0]-d[0]}return function(d){var a=d,s=bt(),u,f,p,w,m,y,v,E,_,S,M,$={point:C,lineStart:H,lineEnd:z,polygonStart:I,polygonEnd:R};function C(h,T){r(h,T)&&a.point(h,T)}function P(){for(var h=0,T=0,O=f.length;T<O;++T)for(var W=f[T],q=1,gn=W.length,Q=W[0],on,x,Nn=Q[0],un=Q[1];q<gn;++q)on=Nn,x=un,Q=W[q],Nn=Q[0],un=Q[1],x<=e?un>e&&(Nn-on)*(e-x)>(un-x)*(t-on)&&++h:un<=e&&(Nn-on)*(e-x)<(un-x)*(t-on)&&--h;return h}function I(){a=s,u=[],f=[],M=!0}function R(){var h=P(),T=M&&h,O=(u=xt(u)).length;(T||O)&&(d.polygonStart(),T&&(d.lineStart(),o(null,null,1,d),d.lineEnd()),O&&ne(u,c,h,o,d),d.polygonEnd()),a=d,u=f=p=null}function H(){$.point=A,f&&f.push(p=[]),S=!0,_=!1,v=E=NaN}function z(){u&&(A(w,m),y&&_&&s.rejoin(),u.push(s.result())),$.point=C,_&&a.lineEnd()}function A(h,T){var O=r(h,T);if(f&&p.push([h,T]),S)w=h,m=T,y=O,S=!1,O&&(a.lineStart(),a.point(h,T));else if(O&&_)a.point(h,T);else{var W=[v=Math.max(Dn,Math.min(yn,v)),E=Math.max(Dn,Math.min(yn,E))],q=[h=Math.max(Dn,Math.min(yn,h)),T=Math.max(Dn,Math.min(yn,T))];mi(W,q,t,n,i,e)?(_||(a.lineStart(),a.point(W[0],W[1])),a.point(q[0],q[1]),O||a.lineEnd(),M=!1):O&&(a.lineStart(),a.point(h,T),M=!1)}v=h,E=T,_=O}return $}}const et=t=>t;var Xn=new ln,it=new ln,ee,ie,rt,ot,nn={point:Z,lineStart:Z,lineEnd:Z,polygonStart:function(){nn.lineStart=_i,nn.lineEnd=wi},polygonEnd:function(){nn.lineStart=nn.lineEnd=nn.point=Z,Xn.add(F(it)),it=new ln},result:function(){var t=Xn/2;return Xn=new ln,t}};function _i(){nn.point=Si}function Si(t,n){nn.point=re,ee=rt=t,ie=ot=n}function re(t,n){it.add(ot*t-rt*n),rt=t,ot=n}function wi(){re(ee,ie)}var dn=1/0,On=dn,Rn=-dn,Bn=Rn,Hn={point:Ei,lineStart:Z,lineEnd:Z,polygonStart:Z,polygonEnd:Z,result:function(){var t=[[dn,On],[Rn,Bn]];return Rn=Bn=-(On=dn=1/0),t}};function Ei(t,n){t<dn&&(dn=t),t>Rn&&(Rn=t),n<On&&(On=n),n>Bn&&(Bn=n)}var lt=0,at=0,_n=0,Wn=0,Un=0,fn=0,ct=0,ut=0,Sn=0,oe,le,J,K,V={point:cn,lineStart:Wt,lineEnd:Ut,polygonStart:function(){V.lineStart=Ti,V.lineEnd=Ni},polygonEnd:function(){V.point=cn,V.lineStart=Wt,V.lineEnd=Ut},result:function(){var t=Sn?[ct/Sn,ut/Sn]:fn?[Wn/fn,Un/fn]:_n?[lt/_n,at/_n]:[NaN,NaN];return lt=at=_n=Wn=Un=fn=ct=ut=Sn=0,t}};function cn(t,n){lt+=t,at+=n,++_n}function Wt(){V.point=Mi}function Mi(t,n){V.point=Ri,cn(J=t,K=n)}function Ri(t,n){var i=t-J,e=n-K,r=rn(i*i+e*e);Wn+=r*(J+t)/2,Un+=r*(K+n)/2,fn+=r,cn(J=t,K=n)}function Ut(){V.point=cn}function Ti(){V.point=Ci}function Ni(){ae(oe,le)}function Ci(t,n){V.point=ae,cn(oe=J=t,le=K=n)}function ae(t,n){var i=t-J,e=n-K,r=rn(i*i+e*e);Wn+=r*(J+t)/2,Un+=r*(K+n)/2,fn+=r,r=K*t-J*n,ct+=r*(J+t),ut+=r*(K+n),Sn+=r*3,cn(J=t,K=n)}function ce(t){this._context=t}ce.prototype={_radius:4.5,pointRadius:function(t){return this._radius=t,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){this._line===0&&this._context.closePath(),this._point=NaN},point:function(t,n){switch(this._point){case 0:{this._context.moveTo(t,n),this._point=1;break}case 1:{this._context.lineTo(t,n);break}default:{this._context.moveTo(t+this._radius,n),this._context.arc(t,n,this._radius,0,G);break}}},result:Z};var st=new ln,Zn,ue,se,wn,En,Tn={point:Z,lineStart:function(){Tn.point=Pi},lineEnd:function(){Zn&&fe(ue,se),Tn.point=Z},polygonStart:function(){Zn=!0},polygonEnd:function(){Zn=null},result:function(){var t=+st;return st=new ln,t}};function Pi(t,n){Tn.point=fe,ue=wn=t,se=En=n}function fe(t,n){wn-=t,En-=n,st.add(rn(wn*wn+En*En)),wn=t,En=n}let Yt,Yn,qt,Vt;class Xt{constructor(n){this._append=n==null?pe:$i(n),this._radius=4.5,this._=""}pointRadius(n){return this._radius=+n,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){this._line===0&&(this._+="Z"),this._point=NaN}point(n,i){switch(this._point){case 0:{this._append`M${n},${i}`,this._point=1;break}case 1:{this._append`L${n},${i}`;break}default:{if(this._append`M${n},${i}`,this._radius!==qt||this._append!==Yn){const e=this._radius,r=this._;this._="",this._append`m0,${e}a${e},${e} 0 1,1 0,${-2*e}a${e},${e} 0 1,1 0,${2*e}z`,qt=e,Yn=this._append,Vt=this._,this._=r}this._+=Vt;break}}}result(){const n=this._;return this._="",n.length?n:null}}function pe(t){let n=1;this._+=t[0];for(const i=t.length;n<i;++n)this._+=arguments[n]+t[n]}function $i(t){const n=Math.floor(t);if(!(n>=0))throw new RangeError(`invalid digits: ${t}`);if(n>15)return pe;if(n!==Yt){const i=10**n;Yt=n,Yn=function(r){let o=1;this._+=r[0];for(const l=r.length;o<l;++o)this._+=Math.round(arguments[o]*i)/i+r[o]}}return Yn}function Ai(t,n){let i=3,e=4.5,r,o;function l(c){return c&&(typeof e=="function"&&o.pointRadius(+e.apply(this,arguments)),sn(c,r(o))),o.result()}return l.area=function(c){return sn(c,r(nn)),nn.result()},l.measure=function(c){return sn(c,r(Tn)),Tn.result()},l.bounds=function(c){return sn(c,r(Hn)),Hn.result()},l.centroid=function(c){return sn(c,r(V)),V.result()},l.projection=function(c){return arguments.length?(r=c==null?(t=null,et):(t=c).stream,l):t},l.context=function(c){return arguments.length?(o=c==null?(n=null,new Xt(i)):new ce(n=c),typeof e!="function"&&o.pointRadius(e),l):n},l.pointRadius=function(c){return arguments.length?(e=typeof c=="function"?c:(o.pointRadius(+c),+c),l):e},l.digits=function(c){if(!arguments.length)return i;if(c==null)i=null;else{const g=Math.floor(c);if(!(g>=0))throw new RangeError(`invalid digits: ${c}`);i=g}return n===null&&(o=new Xt(i)),l},l.projection(t).digits(i).context(n)}function gt(t){return function(n){var i=new ft;for(var e in t)i[e]=t[e];return i.stream=n,i}}function ft(){}ft.prototype={constructor:ft,point:function(t,n){this.stream.point(t,n)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};function vt(t,n,i){var e=t.clipExtent&&t.clipExtent();return t.scale(150).translate([0,0]),e!=null&&t.clipExtent(null),sn(i,t.stream(Hn)),n(Hn.result()),e!=null&&t.clipExtent(e),t}function he(t,n,i){return vt(t,function(e){var r=n[1][0]-n[0][0],o=n[1][1]-n[0][1],l=Math.min(r/(e[1][0]-e[0][0]),o/(e[1][1]-e[0][1])),c=+n[0][0]+(r-l*(e[1][0]+e[0][0]))/2,g=+n[0][1]+(o-l*(e[1][1]+e[0][1]))/2;t.scale(150*l).translate([c,g])},i)}function Di(t,n,i){return he(t,[[0,0],n],i)}function Ii(t,n,i){return vt(t,function(e){var r=+n,o=r/(e[1][0]-e[0][0]),l=(r-o*(e[1][0]+e[0][0]))/2,c=-o*e[0][1];t.scale(150*o).translate([l,c])},i)}function Li(t,n,i){return vt(t,function(e){var r=+n,o=r/(e[1][1]-e[0][1]),l=-o*e[0][0],c=(r-o*(e[1][1]+e[0][1]))/2;t.scale(150*o).translate([l,c])},i)}var Zt=16,ki=k(30*Y);function Gt(t,n){return+n?zi(t,n):Fi(t)}function Fi(t){return gt({point:function(n,i){n=t(n,i),this.stream.point(n[0],n[1])}})}function zi(t,n){function i(e,r,o,l,c,g,d,a,s,u,f,p,w,m){var y=d-e,v=a-r,E=y*y+v*v;if(E>4*n&&w--){var _=l+u,S=c+f,M=g+p,$=rn(_*_+S*S+M*M),C=an(M/=$),P=F(F(M)-1)<D||F(o-s)<D?(o+s)/2:pn(S,_),I=t(P,C),R=I[0],H=I[1],z=R-e,A=H-r,h=v*z-y*A;(h*h/E>n||F((y*z+v*A)/E-.5)>.3||l*u+c*f+g*p<ki)&&(i(e,r,o,l,c,g,R,H,P,_/=$,S/=$,M,w,m),m.point(R,H),i(R,H,P,_,S,M,d,a,s,u,f,p,w,m))}}return function(e){var r,o,l,c,g,d,a,s,u,f,p,w,m={point:y,lineStart:v,lineEnd:_,polygonStart:function(){e.polygonStart(),m.lineStart=S},polygonEnd:function(){e.polygonEnd(),m.lineStart=v}};function y(C,P){C=t(C,P),e.point(C[0],C[1])}function v(){s=NaN,m.point=E,e.lineStart()}function E(C,P){var I=hn([C,P]),R=t(C,P);i(s,u,a,f,p,w,s=R[0],u=R[1],a=C,f=I[0],p=I[1],w=I[2],Zt,e),e.point(s,u)}function _(){m.point=y,e.lineEnd()}function S(){v(),m.point=M,m.lineEnd=$}function M(C,P){E(r=C,P),o=s,l=u,c=f,g=p,d=w,m.point=E}function $(){i(s,u,a,f,p,w,o,l,r,c,g,d,Zt,e),m.lineEnd=_,_()}return m}}var Oi=gt({point:function(t,n){this.stream.point(t*Y,n*Y)}});function Bi(t){return gt({point:function(n,i){var e=t(n,i);return this.stream.point(e[0],e[1])}})}function Hi(t,n,i,e,r){function o(l,c){return l*=e,c*=r,[n+t*l,i-t*c]}return o.invert=function(l,c){return[(l-n)/t*e,(i-c)/t*r]},o}function jt(t,n,i,e,r,o){if(!o)return Hi(t,n,i,e,r);var l=k(o),c=L(o),g=l*t,d=c*t,a=l/t,s=c/t,u=(c*i-l*n)/t,f=(c*n+l*i)/t;function p(w,m){return w*=e,m*=r,[g*w-d*m+n,i-d*w-g*m]}return p.invert=function(w,m){return[e*(a*w-s*m+u),r*(f-s*w-a*m)]},p}function Wi(t){return Ui(function(){return t})()}function Ui(t){var n,i=150,e=480,r=250,o=0,l=0,c=0,g=0,d=0,a,s=0,u=1,f=1,p=null,w=Ht,m=null,y,v,E,_=et,S=.5,M,$,C,P,I;function R(h){return C(h[0]*Y,h[1]*Y)}function H(h){return h=C.invert(h[0],h[1]),h&&[h[0]*b,h[1]*b]}R.stream=function(h){return P&&I===h?P:P=Oi(Bi(a)(w(M(_(I=h)))))},R.preclip=function(h){return arguments.length?(w=h,p=void 0,A()):w},R.postclip=function(h){return arguments.length?(_=h,m=y=v=E=null,A()):_},R.clipAngle=function(h){return arguments.length?(w=+h?vi(p=h*Y):(p=null,Ht),A()):p*b},R.clipExtent=function(h){return arguments.length?(_=h==null?(m=y=v=E=null,et):yi(m=+h[0][0],y=+h[0][1],v=+h[1][0],E=+h[1][1]),A()):m==null?null:[[m,y],[v,E]]},R.scale=function(h){return arguments.length?(i=+h,z()):i},R.translate=function(h){return arguments.length?(e=+h[0],r=+h[1],z()):[e,r]},R.center=function(h){return arguments.length?(o=h[0]%360*Y,l=h[1]%360*Y,z()):[o*b,l*b]},R.rotate=function(h){return arguments.length?(c=h[0]%360*Y,g=h[1]%360*Y,d=h.length>2?h[2]%360*Y:0,z()):[c*b,g*b,d*b]},R.angle=function(h){return arguments.length?(s=h%360*Y,z()):s*b},R.reflectX=function(h){return arguments.length?(u=h?-1:1,z()):u<0},R.reflectY=function(h){return arguments.length?(f=h?-1:1,z()):f<0},R.precision=function(h){return arguments.length?(M=Gt($,S=h*h),A()):rn(S)},R.fitExtent=function(h,T){return he(R,h,T)},R.fitSize=function(h,T){return Di(R,h,T)},R.fitWidth=function(h,T){return Ii(R,h,T)},R.fitHeight=function(h,T){return Li(R,h,T)};function z(){var h=jt(i,0,0,u,f,s).apply(null,n(o,l)),T=jt(i,e-h[0],r-h[1],u,f,s);return a=ci(c,g,d),$=nt(n,T),C=nt(a,$),M=Gt($,S),A()}function A(){return P=I=null,R}return function(){return n=t.apply(this,arguments),R.invert=n.invert&&H,z()}}function Yi(t){return function(n,i){var e=rn(n*n+i*i),r=t(e),o=L(r),l=k(r);return[pn(n*o,e*l),an(e&&i*o/e)]}}function de(t,n){return[k(n)*L(t),L(n)]}de.invert=Yi(an);function qi(){return Wi(de).scale(249.5).clipAngle(90+D)}const mn={timeline:{},earth:{"ocean-color":"rgb(95,173,209)","land-color":"rgb(181,228,207)","country-color":"#fff","country-border":.6,background:"@/assets/background4.jpg","globe-size":800}},Vi={id:"globe-container",class:"globe-container"},Xi={id:"globe"},Zi={class:"card"},Gi=["src"],ji=Jt({__name:"Earth",setup(t){const n=Kt(),i=Ce({cardContent:"纽约州法院取消特朗普前私人律师朱利安尼的律师资格",cardImg:"https://mediabluk.cnr.cn/record/img/cnr/CNRCDP/2023/0609/a9597944f437430fbee597cab4c9bf7e10.jpg"});let e=In(!1);const r=mn.earth["ocean-color"],o=mn.earth["land-color"],l=mn.earth["country-color"],c=mn.earth["country-border"],g=mn.earth["globe-size"];Qt(()=>{const s=qi().scale(g/2-.5).translate([g/2,g/2]),u=Ai().projection(s);n.subscribe((p,w)=>{p.type==="updateContent"&&(i.cardImg=w.content.img,i.cardContent=w.content.content,console.log(i))});const f=Ke("#globe").append("svg").attr("width",g).attr("height",g).style("background-color",r).style("border-radius","50%");ii("https://raw.githubusercontent.com/epistler999/GeoLocation/master/world.json").then(p=>{f.append("g").selectAll("path").data(p.features).enter().append("path").attr("d",u).attr("fill",o).attr("stroke",l).attr("stroke-width",c),d(f,s,u,[-116,-17],[-116,-17],!1),n.subscribe((w,m)=>{if(w.type==="updateLocation"){const y=m.location[0],v=m.location[1],E=m.preLocation[0],_=m.preLocation[1];d(f,s,u,[-E,23-_],[-y,23-v])}})})});const d=(s,u,f,p,w,m=!0)=>{e.value=!1,s.select("foreignObject").remove();let y=2500;m||(y=0),s.transition().duration(y).tween("rotate",()=>{const v=dt(p,w);return function(E){u.rotate(v(E)),s.selectAll("path").attr("d",f)}}).on("end",()=>{a(s,u,f,w),setTimeout(()=>{e.value=!0},1500)})},a=(s,u,f,p)=>{const w=p[0],m=p[1],[y,v]=u([-w,23-m]);let[E,_]=u.translate();E=E-g/2,_=_-g/2;const S=40;s.append("foreignObject").attr("x",y+E-S/2).attr("y",v+_-S).attr("width",S).attr("height",S).html("<div id='marker'></div>"),s.selectAll("path").attr("d",f);const M=document.getElementById("marker"),$=Pe($e,{spin:!1,rotate:0,style:{fontSize:"40px",color:"red"}});Ae($,M)};return(s,u)=>{const f=Pt("a-card-meta"),p=Pt("a-card");return j(),en(Gn,null,[U("div",Vi,[tn(Ct,{name:"slide-fade"},{default:vn(()=>[kn(U("div",Xi,null,512),[[$t,!B(e)]])]),_:1})]),tn(Ct,{name:"slide-fade"},{default:vn(()=>[kn(U("div",Zi,[tn(p,{hoverable:"",style:{"max-width":"100%","max-height":"100%","z-index":"-1"}},{cover:vn(()=>[U("img",{alt:"example",src:i.cardImg},null,8,Gi)]),default:vn(()=>[tn(f,{title:i.cardContent},{description:vn(()=>[De(jn(i.cardContent),1)]),_:1},8,["title"])]),_:1})],512),[[$t,B(e)]])]),_:1})],64)}}}),Ji=pt(ji,[["__scopeId","data-v-b09db6ca"]]),Ki={class:"map"},Qi={__name:"Map",setup(t){return(n,i)=>(j(),en("div",Ki,[tn(je),tn(Ji)]))}},bi=pt(Qi,[["__scopeId","data-v-3838cf19"]]);export{bi as default};
