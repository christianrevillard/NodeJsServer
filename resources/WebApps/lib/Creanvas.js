var f=f||{};f.a=f.a||{};window.CreJs=f;f.Creanvas=f.a;(function(){var a=f.n=f.n||{};a.p=function(e,h,g){var c=this;this.t=e;this.u=h;this.V=g||0;this.eb=function(a,e,b,g){a.lineWidth=5;a.strokeStyle=g;a.beginPath();a.moveTo(e,b);a.lineTo(e+100*c.t,b+100*c.u);a.stroke();a.lineWidth=1;a.strokeStyle="#000"};this.ya=function(d){return{O:a.na(c,d.O),q:a.na(c,d.q),Ea:a.na(c,d.Ea)}}};Object.defineProperty(a.p.prototype,"x",{get:function(){return this.t},set:function(a){this.t=a}});Object.defineProperty(a.p.prototype,"y",{get:function(){return this.u},set:function(a){this.u=
a}});Object.defineProperty(a.p.prototype,"z",{get:function(){return this.V},set:function(a){this.V=a}});a.Ra=function(e,h,g,c){e=g-e;h=c-h;c=Math.sqrt(e*e+h*h);return{O:new a.p(e/c,h/c,0),q:new a.p(-h/c,e/c,0),Ea:new a.p(0,0,0)}};a.gb=function(a,h,g,c,d){a.lineWidth=5;a.strokeStyle=d;a.beginPath();a.moveTo(h,g);a.lineTo(h+100*c.O.t,g+100*c.O.u);a.moveTo(h,g);a.lineTo(h+50*c.q.t,g+50*c.q.u);a.stroke();a.lineWidth=1;a.strokeStyle="#000"};a.fb=function(a,h,g,c,d,m,b){a.lineWidth=5;a.strokeStyle=b;a.beginPath();
a.moveTo(h,g);a.lineTo(h+100*d*c.O.t,g+100*d*c.O.u);a.lineTo(h+100*d*c.O.t+100*m*c.q.t,g+100*d*c.O.u+100*m*c.q.u);a.stroke();a.lineWidth=1;a.strokeStyle="#000"};a.na=function(a,h){return a.t*h.t+a.u*h.u};a.fa=function(e,h){return new a.p(e.u*h.V-e.V*h.u,e.V*h.t-e.t*h.V,e.t*h.u-e.u*h.t)};f.Core=f.n;f.n.Vector=f.n.p})();f.a.Fa=function(a){function e(){return a.elements.filter(function(a){return a.s})}function h(a,d,g){var b,e,k,l,r,p;b=g.bb;l=new f.n.p(g.x-a.i,g.y-a.j);r=f.n.fa(l,b.q).z;p=new f.n.p(g.x-d.i,g.y-d.j);g=f.n.fa(p,b.q).z;var h=f.n.fa(l,b.q),q=f.n.fa(p,b.q);e=new f.n.p(a.b.e.x,a.b.e.y);k=new f.n.p(d.b.e.x,d.b.e.y);a.r&&(e.x+=l.x*a.r.x,e.y+=l.y*a.r.y);d.r&&(k.x+=p.x*d.r.x,k.y+=p.y*d.r.y);l=a.s.sa*d.s.sa*2*(k.ya(b).q-e.ya(b).q+d.b.H*q.z-a.b.H*h.z)/(1/d.s.L+1/a.s.L+q.z*q.z/d.ca()+h.z*h.z/a.ca());a.b.e.x+=
l/a.s.L*b.q.x;a.b.e.y+=l/a.s.L*b.q.y;d.b.e.x-=l/d.s.L*b.q.x;d.b.e.y-=l/d.s.L*b.q.y;a.b.H+=l*r/a.ca();d.b.H-=l*g/d.ca()}function g(a,d){var g,b,e,k,l,r,p;k=a.xa();l=d.xa();g=Math.max(k.left,l.left)-1;b=Math.min(k.right,l.right)+1;e=Math.max(k.top,l.top)-1;k=Math.min(k.bottom,l.bottom)+1;if(!(0>=b-g||0>=k-e)){g=a.k.getImageData(0,0,a.c,a.g);a.k.scale(1/(a.h||1),1/(a.l||1));a.k.rotate(-(a.f||0));a.k.translate(d.i-a.i,d.j-a.j);a.k.rotate(d.f||0);a.k.scale(d.h||1,d.l||1);a.k.globalCompositeOperation="destination-out";
a.k.drawImage(d.R.canvas,0,0,d.c,d.g,-d.w,-d.A,d.c,d.g);a.k.scale(1/(d.h||1),1/(d.l||1));a.k.rotate(-d.f||0);a.k.translate(-d.i+a.i,-d.j+a.j);a.k.rotate(a.f||0);a.k.scale(a.h||1,a.l||1);r=a.k.getImageData(0,0,a.c,a.g);a.k.globalCompositeOperation="source-over";a.k.putImageData(g,0,0);p=[];a.ua.forEach(function(b){90>r.data[b.y*a.c*4+4*b.x+3]&&p.push(b)});if(2>p.length)return null;var h;e=b=0;g=p.length-1;for(k=1;k<p.length;k++)for(l=k+1;l<p.length;l++){h=p[k].x-p[l].x;var q=p[k].y-p[l].y;h=Math.sqrt(h*
h+q*q);h>b&&(b=h,e=k,g=l)}b=a.ba(p[e].x-a.w,p[e].y-a.A);g=a.ba(p[g].x-a.w,p[g].y-a.A);return b.x==g.x&&b.y==g.y?null:{x:Math.round((b.x+g.x)/2),y:Math.round((b.y+g.y)/2),bb:f.n.Ra(b.x,b.y,g.x,g.y)}}}this.Za=function(a){var d=e(),m,b,n;m=a.wa();d=d.filter(function(b){var g;if(b.F===a.F||!(b.b.e.x||b.b.e.y||a.b.e.x||a.b.e.y||b.r||a.r))return!1;g=b.wa();return Math.sqrt((m.x-g.x)*(m.x-g.x)+(m.y-g.y)*(m.y-g.y))>a.za()+b.za()?!1:!0});if(0==d.length)return!0;b=null;d.forEach(function(d){b||(b=g(a,d))&&
(n=d)});if(!b)return!0;h(a,n,b);a.m.J("collision",{element:n,Ka:b});n.m.J("collision",{element:a,Ka:b});return!1}};f.a.Ga=function(a){var e,h,g,c,d,m,b,n;c=this;e=a.canvas;b=a.timeScale||1;n=a.meterPerPoint||1;a.lb?(m=Date.now(),this.getTime=function(){return(Date.now()-m)*b}):(d=0,setInterval(function(){d+=10*b},10),this.getTime=function(){return d});this.P=function(b){a.log&&a.log(b)};c.D=e.getContext("2d");c.D.setTransform(1,0,0,1,0,0);c.D.scale(1/n,1/n);h=!0;isDrawing=!1;g=a.refreshTime||50;this.oa=function(a,b){var g=!1;c.elements.filter(function(b){return b.Ja(a)}).sort(function(a,b){return b.T||0-a.T||
0}).forEach(function(c){!g&&c.Ta(b.x,b.y)&&(c.m.J(a,b),g=!0)})};this.Da=function(a,b){c.elements.forEach(function(c){c.I==b.I&&c.m.J(a,b)})};this.ma=function(a,b){e.addEventListener(a,function(a){setTimeout(function(){if(a.changedTouches)for(var g=0;g<a.changedTouches.length;g++){var d=a.changedTouches[g].identifier,e=c.U(a.changedTouches[g]);e.I=d;c.oa(b,e)}else g=c.U(a),g.I=-1,c.oa(b,g)})})};this.ea=function(a,b){e.addEventListener(a,function(a){setTimeout(function(){if(a.changedTouches)for(var g=
0;g<a.changedTouches.length;g++){var d=a.changedTouches[g].identifier,e=c.U(a.changedTouches[g]);e.I=d;c.Da(b,e)}else g=c.U(a),g.I=-1,c.Da(b,g)})})};this.m=new f.W.ha;this.ma("click","click");this.ma("mousedown","pointerDown");this.ma("touchstart","pointerDown");this.ea("mousemove","pointerMove");this.ea("touchmove","pointerMove");this.ea("mouseup","pointerUp");this.ea("touchend","pointerUp");this.$a=function(){c.m.J("deactivate");c.elements=[]};this.M=function(){h=!0};this.U=function(a){var b=e.getBoundingClientRect();
c.P("ClientXY: ("+a.clientX+","+a.clientY+")");b={x:Math.round((a.clientX-b.left)*e.width/b.width*n),y:Math.round((a.clientY-b.top)*e.height/b.height*n)};c.P("canvasXY: ("+b.x+","+b.y+")");"click"==a.type&&c.P("Click on ! canvasXY: ("+b.x+","+b.y+")");return b};c.elements=[];this.add=function(){var a=[].slice.call(arguments),b=a.filter(function(a){return a&&"name"==a[0]})[0]||["name","Unknown"],g=a.filter(function(a){return a&&"image"==a[0]})[0],d=a.filter(function(a){return a&&"position"==a[0]})[0],
b=new f.a.Ia(c,b,g,d),a=a.filter(function(a){return a&&"name"!=a[0]&&"position"!=a[0]&&"image"!=a[0]});0<a.length&&f.a.d&&b.qa.apply(b,a);c.elements.push(b);return b};c.P("Adding background");this.add(["name","background"],["image",{width:e.width,height:e.height,translate:{dx:0,dy:0},draw:a.drawBackground||function(b){b.fillStyle=a.backgroundStyle||"#FFF";b.fillRect(0,0,this.c,this.g)}}],["position",{z:-Infinity}]);setInterval(function(){h&&!isDrawing?(isDrawing=!0,c.elements.sort(function(a,b){return(a.T||
0)-(b.T||0)}).forEach(function(a){c.D.translate(a.i,a.j);c.D.rotate(a.f||0);c.D.scale(a.h||1,a.l||1);c.D.drawImage(a.Q.canvas,0,0,a.c,a.g,-a.w,-a.A,a.c,a.g);c.D.scale(1/(a.h||1),1/a.l||1);c.D.rotate(-(a.f||0));c.D.translate(-a.i,-a.j)}),isDrawing=!1):c.P("No redraw")},g);this.addElement=this.add;this.redraw=this.M;this.stop=this.$a};f.a.Controller=f.a.Ga;(function(){function a(a,c){a.i=c.x||0;a.j=c.y||0;a.T=c.z||0;a.f=c.angle||0}function e(a,c){a.c=c.width;a.g=c.height;var d=c.translate||{dx:c.width/2,dy:c.height/2};a.w=d.dx;a.A=d.dy;d=a.o.D.canvas.ownerDocument.createElement("canvas");a.Q=d.getContext("2d");a.h=c.scaleX||1;a.l=c.scaleY||1;if(c.rawImage)a.X=c.rawImage,a.Q.putImageData(a.X,0,0);else{var e=c.draw;d.width=a.c;d.height=a.g;a.Q.beginPath();a.Q.translate(a.w,a.A);e.call(a,a.Q);a.X=a.Q.getImageData(0,0,a.c,a.g)}}function h(a,c){a.aa=c;a.F=
f.ga.ia()}f.a.Ia=function(g,c,d,m){var b=this;b.o=g;var n=[],k=[];h(b,c[1]);e(b,d[1]);a(b,m[1]);k.push(c);k.push(d);k.push(m);b.m=new f.W.ha;b.isPointInPath=function(a){a=b.o.U(a);return b.o.kb.isPointInPath(b,draw,a)};b.Ta=function(a,c){var d=Math.round(a-b.i+b.w),g=Math.round(c-b.j+b.A);return 0<=d&&d<=b.c&&0<=g&&g<=b.g&&0<b.X.data[4*g*b.c+4*d+3]};b.ra=function(a){var c=a?k.filter(function(b){return a.every(function(a){return a!=b[0]})}):k;return b.o.add.apply(b.o,c)};b.Ya=function(a){(a=f.a.d[a])&&
a.Aa&&a.Aa(b)};b.Ja=function(a){return"click"==a||"pointerDown"==a||b.m.Sa(a)};b.La=function(){b.o.m.removeEventListener({v:b.F});b.Q=null};b.o.m.C({eventId:"deactivate",listenerId:b.F,handleEvent:function(){b.La()}});b.M=function(){b.o.M()};b.ba=function(a,c){return{x:Math.round(b.i+a*b.h*Math.cos(b.f)-c*b.l*Math.sin(b.f)),y:Math.round(b.j+a*b.h*Math.sin(b.f)+c*b.l*Math.cos(b.f))}};b.hb=function(a,c){return{x:b.i+a*b.h*Math.cos(b.f)-c*b.l*Math.sin(b.f),y:b.j+a*b.h*Math.sin(b.f)+c*b.l*Math.cos(b.f)}};
b.ib=function(a,c){return{x:Math.round(((a-b.i)*Math.cos(b.f)+(c-b.j)*Math.sin(b.f))/b.h),y:Math.round(((c-b.j)*Math.cos(b.f)-(a-b.i)*Math.sin(b.f))/b.l)}};b.wa=function(){return b.ba(-b.w+b.c/2,-b.A+b.g/2)};var l=[];l.push({x:-b.w,y:-b.A});l.push({x:-b.w+b.c,y:-b.A});l.push({x:-b.w+b.c,y:-b.A+b.g});l.push({x:-b.w,y:-b.A+b.g});b.Pa=function(){return l.map(function(a){return b.ba(a.x,a.y)})};b.Oa=function(){var a=b.i+""+b.j+""+b.f+""+b.h+""+b.h;if(n.getClientCorners&&n.getClientCorners.key==a)return n.getClientCorners.value;
var c=b.Pa();n.getClientCorners={key:a,value:c};return c};b.Qa=function(){var a=b.Oa();return{top:a.reduce(function(a,b){return Math.min(a,b.y)},Infinity),bottom:a.reduce(function(a,b){return Math.max(a,b.y)},-Infinity),left:a.reduce(function(a,b){return Math.min(a,b.x)},Infinity),right:a.reduce(function(a,b){return Math.max(a,b.x)},-Infinity)}};b.xa=function(){var a=b.i+""+b.j+""+b.f+""+b.h+""+b.h;if(n.getClientRect&&n.getClientRect.key==a)return n.getClientRect.value;var c=b.Qa();n.getClientRect=
{key:a,value:c};return c};b.qa=function(){var a=this,b=[].slice.apply(arguments);k=k.concat(b);b.forEach(function(b){a.ka(b[0],b[1])})};b.ka=function(a,b){var c=f.a.d[a];c&&c.N(this,b)};Object.defineProperty(b,"name",{get:function(){return this.aa},set:function(a){this.aa=a}});Object.defineProperty(b,"width",{get:function(){return this.c},set:function(a){this.c=a}});Object.defineProperty(b,"height",{get:function(){return this.g},set:function(a){this.g=a}});Object.defineProperty(b,"scaleX",{get:function(){return this.h},
set:function(a){this.h=a}});Object.defineProperty(b,"scaleY",{get:function(){return this.l},set:function(a){this.l=a}});Object.defineProperty(b,"x",{get:function(){return this.i},set:function(a){this.i=a}});Object.defineProperty(b,"y",{get:function(){return this.j},set:function(a){this.j=a}});Object.defineProperty(b,"z",{get:function(){return this.T},set:function(a){this.T=a}});Object.defineProperty(b,"angle",{get:function(){return this.f},set:function(a){this.f=a}});Object.defineProperty(b,"id",
{get:function(){return this.F}});Object.defineProperty(b,"image",{get:function(){return this.X}});Object.defineProperty(b,"events",{get:function(){return this.m}});b.clone=b.ra;b.applyDecorator=b.ka;b.applyDecorators=b.qa;b.removeDecorator=b.Ya}})();f=f||{};f.a=f.a||{};f.a.d=f.a.d||[];f.a.d.clickable={N:function(a,e){var h=e.onclick;a.Xa=function(g){h.call(a,g);a.M()};a.m.C({G:"click",handleEvent:a.Xa})}};f=f||{};f.a=f.a||{};f.a.d=f.a.d||[];f.a.d.customTimer={N:function(a,e){setInterval(function(){e.action.call(a)},e.time)}};f=f||{};f.a=f.a||{};f.a.d=f.a.d||[];f.a.d.droppable={N:function(a,e){var h=e.dropZone;a.Va=!0;a.va=h;Object.defineProperty(a,"dropZone",{get:function(){return this.va},set:function(a){this.va=a}})}};f=f||{};f.a=f.a||{};f.a.d=f.a.d||[];f.a.d.dropzone={N:function(a,e){var h=e.availableSpots,g=e.dropX,c=e.dropY;a.$=[];a.m.C({B:"dropzone",G:"drop",handleEvent:function(d){0>=h||(h--,d.K.x=g||a.i,d.K.y=c||a.j,d.K.S=a,a.$.push(d.K),d.K.m.J("dropped",{S:a,K:d.K}),a.m.J("droppedIn",{S:a,K:d.K}),a.M())},v:a.F});a.Ma=function(c){c.S=null;h++;a.$.splice(a.$.indexOf(c),1);a.M()};Object.defineProperty(a,"droppedElements",{get:function(){return this.$}})}};f=f||{};f.a=f.a||{};f.a.d=f.a.d||[];f.a.d.duplicable={N:function(a,e){var h=e.isBlocked,g=e.generatorCount||Infinity,c=!1;a.m.C({B:"duplicable",G:"pointerDown",handleEvent:function(d){0<=d.I&&(c=!0);if(!(c&&0>d.I||h&&h()||0>=g)){g--;var e=a.ra(["duplicable"]);e.aa+=" (duplicate)";e.ka("movable",{Ua:h});e.Ca(d);a.M()}},v:a.F})},Aa:function(a){a.m.removeEventListener({B:"duplicable",v:a.F})}};f.a.d=f.a.d||[];f.a.elementDecorators=f.a.d;f=f||{};f.a=f.a||{};f.a.d=f.a.d||[];
f.a.d.movable={N:function(a,e){var h=!1,g=this.I=null,c=e.Ua;a.Ca=function(c){h=!0;a.I=c.I;g={x:c.x,y:c.y};a.S&&(a.S.Ma(a),a.S=null)};a.Wa=function(c){h=!1;g=null;a.Va&&a.o.oa("drop",{x:c.x,y:c.y,K:a})};a.m.C({B:"movable",G:"pointerDown",handleEvent:function(d){c&&c()||a.Ca(d)},v:a.F});var d=!1;a.m.C({B:"movable",G:"pointerMove",handleEvent:function(e){!h||c&&c()||(d||(d=!0),a.i+=e.x-g.x,a.j+=e.y-g.y,g={x:e.x,y:e.y},a.M())},v:a.F});a.m.C({B:"movable",G:"pointerUp",handleEvent:function(e){!h||c&&c()||
(a.o.U(e),a.i+=e.x-g.x,a.j+=e.y-g.y,a.Wa(e),a.I=null,d=!1,a.M())},v:a.F})}};f=f||{};f.a=f.a||{};f.a.d=f.a.d||[];
f.a.d.moving={type:"moving",N:function(a,e){var h,g,c,d,m,b=e.vx,n=e.vy,k=e.ax,l=e.ay,r=e.rotationSpeed,p,s,q;a.b=a.b||{};a.b.e=new f.n.p(b||0,n||0);a.b.Y=new f.n.p(k||0,l||0);a.b.H=r||0;p=a.o.getTime();setInterval(function(){s=a.o.getTime();q=s-p;if(!(1>q)&&(p=s,a.b.e.x+=a.b.Y.x*q,a.b.e.y+=a.b.Y.y*q,0!=a.b.e.x||0!=a.b.e.y||0!=a.b.H||a.r&&(0!=a.r.x||0!=a.r.y))){h=a.i;g=a.j;c=a.f;d=a.h;m=a.l;a.i+=a.b.e.x*q;a.j+=a.b.e.y*q;a.f+=a.b.H*q;a.r&&(a.h+=a.r.x*q,a.l+=a.r.y*q);var b=!0;a.da&&a.da.forEach(function(c){b&&
(c.call(a)||(b=!1))});b||(a.i=h,a.j=g,a.f=c,a.h=d,a.l=m)}},20);Object.defineProperty(a,"moving",{get:function(){return this.b},set:function(a){this.b=a}});Object.defineProperty(a.b,"speed",{get:function(){return this.e},set:function(a){this.e=a}});Object.defineProperty(a.b,"acceleration",{get:function(){return this.Y},set:function(a){this.Y=a}});Object.defineProperty(a.b,"rotationSpeed",{get:function(){return this.H},set:function(a){this.H=a}});Object.defineProperty(a,"scaleSpeed",{get:function(){return this.r},
set:function(a){this.r=a}})}};f=f||{};f.a=f.a||{};f.a.d=f.a.d||[];
f.a.d.solid={N:function(a,e){var h=[];a.s={};a.s.L=e.mass||1;var g=e.onCollision,c=e.coefficient;a.o.ta=a.o.ta||new f.a.Fa(a.o);a.s.sa=c||0===c?c:1;a.b=a.b||{e:new f.n.p(0,0),Y:new f.n.p(0,0),H:0};a.m.C({G:"collision",handleEvent:function(b){g&&g.call(a,b)}});a.da=this.da||[];a.da.push(function(){return a.o.ta.Za(a)});a.ca=function(){return a.s.L/12*(a.c*a.h*a.c*a.h+a.g*a.l*a.g*a.l)};a.Na=function(){return Math.sqrt(a.c*a.c*a.h*a.h+a.g*a.g*a.l*a.l)/2};a.za=function(){var b=a.c+""+a.g+""+a.h+""+a.l;
if(h.getRadius&&h.getRadius.key==b)return h.getRadius.ab;var c=a.Na();h.geRadius={jb:b,ab:c};return c};var d=a.o.D.canvas,c=d.ownerDocument.createElement("canvas"),d=d.ownerDocument.createElement("canvas");c.width=d.width=a.c;c.height=d.height=a.g;a.R=d.getContext("2d");a.R.putImageData(a.X,0,0);a.R.globalCompositeOperation="source-atop";a.R.fillStyle="#000";a.R.fillRect(0,0,a.c,a.g);a.k=c.getContext("2d");a.k.globalCompositeOperation="source-over";a.k.drawImage(a.R.canvas,0,0);c=a.k.getImageData(0,
0,a.c,a.g);d=a.k.createImageData(a.c,a.g);a.ua=[];for(var m=0;m<a.c;m++)for(var b=0;b<a.g;b++)if(!(200>c.data[b*a.c*4+4*m+3])){for(var n=!1,k=-1;2>k;k++)for(var l=-1;2>l;l++)if(0>b+k||0>m+l||b+k>a.g-1||m+k>a.c-1||100>c.data[(b+k)*a.c*4+4*(m+l)+3])n=!0,l=k=2;a.k.putImageData(d,0,0);n&&(a.ua.push({x:m,y:b}),d.data[b*a.c*4+4*m]=0,d.data[b*a.c*4+4*m+1]=0,d.data[b*a.c*4+4*m+2]=0,d.data[b*a.c*4+4*m+3]=255)}a.k.putImageData(d,0,0);a.k.translate(a.w,a.A);Object.defineProperty(a,"solid",{get:function(){return this.s},
set:function(a){this.s=a}});Object.defineProperty(a.s,"mass",{get:function(){return this.L},set:function(a){this.L=a}})}};(function(){var a=f.W=f.W||{},e;a.pa=function(a){this.G=a;e=f.ga;var g=[];this.J=function(c,d){e.ia();var m=g.length;g.forEach(function(b){b.cb=a;setTimeout(function(){b.handleEvent(c);m--;0==m&&d&&d()})})};this.C=function(a){a.handleEvent=a.handleEvent||a.handleEvent;a.Z=a.Z||a.rank;a.v=a.v||a.listenerId;a.B=a.B||a.eventGroupType;var d=e.ia();g.push({la:d,handleEvent:a.handleEvent,Z:a.Z,v:a.v,B:a.B});g=g.sort(function(a,b){return(a.Z||Infinity)-(b.Z||Infinity)});return d};this.removeEventListener=
function(a){g=g.filter(function(d){return Boolean(a.la)&&d.la!=a.la||Boolean(a.v)&&d.v!=a.v||Boolean(a.B)&&d.B!=a.B})}};f.Creevents=a;a.Event=a.pa})();(function(){var a=f.W=f.W||{};a.ha=function(){var e={},h=[];this.Sa=function(a){return void 0!=e[a]};this.C=function(g){var c=g.G||g.eventId;e[c]||(h.push(c),e[c]=new a.pa(c));return e[c].C(g)};this.J=function(a,c,d){e[a]&&(c&&(c.G=a),e[a].J(c,d))};this.removeEventListener=function(a){e[a.G]?e[a.G].removeEventListener(a):h.forEach(function(c){e[c].removeEventListener(a)})};this.addEventListener=this.C};a.EventContainer=a.ha})();(function(){var a=f.ga=f.ga||{};a.ia=function(){var e=Date.now().toString(16),e=a.Ba("x",15-e.length)+e;return("xxxxxxxx-xxxx-4xxx-y"+e.slice(0,3)+"-"+e.slice(3)).replace(/[xy]/g,function(a){var e=16*Math.random()|0;return("x"==a?e:e&3|8).toString(16)})};a.Ba=function(e,h){return 0>=h?"":e+a.Ba(e,h-1)}})();(function(){var a=f.Ha=f.Ha||{};a.ja=function(){this.P=function(a){console.log(a)}};f.Crelog=a;a.Logger=a.ja;a.ja.log=a.ja.P})();
