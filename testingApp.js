!function(t){function s(e){if(i[e])return i[e].exports;var o=i[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,s),o.loaded=!0,o.exports}var i={};return s.m=t,s.c=i,s.p="",s(0)}([function(t,s,i){var e=(i(6),i(2),i(1)),o=i(4),h=(i(3),document.getElementById("game-canvas")),n=h.getContext("2d"),r=new e,p=new o(n,r);p.start()},function(t,s,i){function e(){this.dimX=1e3,this.dimY=800,this.player1=new o(this,[100,400],0,"#000"),this.player2=new o(this,[900,400],Math.PI,"#f00"),this.player1.setOpponent(this.player2),this.player2.setOpponent(this.player1),this.over=!1,this.map=[[300,100,50,200],[150,250,150,50],[150,500,200,50],[300,550,50,150],[450,350,100,100],[650,100,50,200],[700,250,150,50],[650,500,200,50],[650,550,50,150]],this.bullets=[]}var o=i(3);i(1),i(7);e.prototype.draw=function(t){for(t.clearRect(0,0,this.dimX,this.dimY),s=0;s<this.bullets.length;s++)this.bullets[s].draw(t);this.player1.draw(t),this.player2.draw(t);for(var s=0;s<this.map.length;s++){var i=this.map[s];t.fillStyle="#00f",t.fillRect(i[0],i[1],i[2],i[3])}},e.prototype.step=function(t){this.player1.step(),this.player2.step();for(var s=[],i=0;i<this.bullets.length;i++){var e=this.bullets[i].step(this.player1.getPos(),this.player2.getPos());"air"===e?s.push(this.bullets[i]):"player1"===e?this.player1.hit():"player2"===e&&this.player2.hit()}this.bullets=s,0!==this.player1.lives&&0!==this.player2.lives||(this.over=!0)},e.prototype.newBullet=function(t){this.bullets.push(t),console.log(t)},e.prototype.end=function(){this.over=!0},t.exports=e},function(t,s){function i(t,s){return Math.floor(Math.random()*(s-t+1))+t}var e={inherits:function(t,s){function i(){}i.prototype=s.prototype,t.prototype=new i,t.prototype.constructor=t},randomVect:function(t){var s=t*Math.random(),e=Math.sqrt(Math.pow(t,2)-Math.pow(s,2));return e*=[-1,1][i(0,1)],s*=[-1,1][i(0,1)],[s,e]},distanceBetween:function(t,s){var i=Math.abs(t[0]-s[0]),e=Math.abs(t[1]-s[1]),o=Math.sqrt(Math.pow(i,2)+Math.pow(e,2));return o}};t.exports=e},function(t,s,i){function e(t,s,i,e){this.spawnLoc=s,this.game=t,this.posX=s[0],this.posY=s[1],this.spawnDirection=i,this.direction=i,this.lives=3,this.color=e,this.speed=2.5,this.fireDelay=0}var o=(i(2),i(7));e.prototype.setOpponent=function(t){this.otherPlayer=t},e.prototype.getPos=function(){return[this.posX,this.posY]},e.prototype.draw=function(t){t.translate(this.posX,this.posY),t.rotate(this.direction+Math.PI/2),t.fillStyle=this.color,t.fillRect(-25,-25,50,50),t.fillRect(-33,-30,16,60),t.fillRect(18,-30,16,60),t.fillRect(-5,-45,10,20),t.setTransform(1,0,0,1,0,0)},e.prototype.collision=function(){var t=this.posX-this.otherPlayer.posX,s=this.posY-this.otherPlayer.posY,i=Math.sqrt(t*t+s*s);if(60>i)return!0;for(var e=this.game.map,o=0;o<e.length;o++){var h=e[o];if(this.inside([this.posX+30,this.posY+30],h)||this.inside([this.posX-30,this.posY+30],h)||this.inside([this.posX-30,this.posY-30],h)||this.inside([this.posX+30,this.posY-30],h)||this.inside([this.posX,this.posY-30],h)||this.inside([this.posX,this.posY+30],h)||this.inside([this.posX+30,this.posY],h)||this.inside([this.posX-30,this.posY],h))return!0}return!1},e.prototype.inside=function(t,s){return t[0]>s[0]&&t[0]<s[0]+s[2]&&t[1]>s[1]&&t[1]<s[1]+s[3]},e.prototype.moveForward=function(){this.posX+=Math.cos(this.direction)*this.speed,this.posY+=Math.sin(this.direction)*this.speed,this.collision()&&(this.posX-=Math.cos(this.direction)*this.speed,this.collision()&&(this.posX+=Math.cos(this.direction)*this.speed,this.posY-=Math.sin(this.direction)*this.speed,this.collision()&&(this.posY-=Math.sin(this.direction)*this.speed,this.posX-=Math.cos(this.direction)*this.speed))),this.posX<30&&(this.posX=30),this.posX>970&&(this.posX=970),this.posY<30&&(this.posY=30),this.posY>770&&(this.posY=770)},e.prototype.moveBackward=function(){var t=.5;this.posX-=Math.cos(this.direction)*(this.speed*t),this.posY-=Math.sin(this.direction)*(this.speed*t),this.collision()&&(this.posX+=Math.cos(this.direction)*(this.speed*t),this.collision()&&(this.posX-=Math.cos(this.direction)*(this.speed*t),this.posY+=Math.sin(this.direction)*(this.speed*t),this.collision()&&(this.posY+=Math.sin(this.direction)*(this.speed*t),this.posX+=Math.cos(this.direction)*(this.speed*t)))),this.posX<25&&(this.posX=25),this.posX>975&&(this.posX=975),this.posY<25&&(this.posY=25),this.posY>775&&(this.posY=775)},e.prototype.turn=function(t){this.direction+=t},e.prototype.step=function(){this.fireDelay>0&&(this.fireDelay-=20)},e.prototype.fire=function(){this.fireDelay<=0&&(this.game.newBullet(new o(this.game,[this.posX+40*Math.cos(this.direction),this.posY+40*Math.sin(this.direction)],this.direction)),console.log("posX: "+this.posX+" posY : "+this.posY),console.log(45*Math.cos(this.direction)),this.fireDelay=600)},e.prototype.hit=function(){this.lives-=1,this.posX=this.spawnLoc[0],this.posY=this.spawnLoc[1],this.direction=this.spawnDirection},t.exports=e},function(t,s,i){function e(t,s){this.game=s,this.ctx=t,this.player1=this.game.player1,this.player2=this.game.player2}var o=(i(1),i(5));e.prototype.start=function(){var t=setInterval(function(s){this.checkKey(),this.game.step(),this.game.draw(this.ctx),this.game.over&&(this.renderOver(),clearInterval(t))}.bind(this),20)},e.prototype.renderOver=function(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.game.dimX,this.game.dimY+50),this.ctx.font="50px Courier",this.ctx.fillStyle="white",0===this.game.player1.lives?this.ctx.fillText("Player 2 wins!",285,this.game.dimY/2):this.ctx.fillText("Player 1 wins!",285,this.game.dimY/2)},e.prototype.checkKey=function(){o.isPressed("w")&&this.player1.moveForward(),o.isPressed("s")&&this.player1.moveBackward(),o.isPressed("a")&&this.player1.turn(-Math.PI/32),o.isPressed("d")&&this.player1.turn(Math.PI/32),o.isPressed("z")&&this.player1.fire(),o.isPressed("i")&&this.player2.moveForward(),o.isPressed("k")&&this.player2.moveBackward(),o.isPressed("j")&&this.player2.turn(-Math.PI/32),o.isPressed("l")&&this.player2.turn(Math.PI/32),o.isPressed("n")&&this.player2.fire(),o.isPressed("q")&&this.game.end()},t.exports=e},function(t,s,i){!function(s){function i(t,s){for(var i=t.length;i--;)if(t[i]===s)return i;return-1}function e(t,s){if(t.length!=s.length)return!1;for(var i=0;i<t.length;i++)if(t[i]!==s[i])return!1;return!0}function o(t){for(Y in P)P[Y]=t[B[Y]]}function h(t){var s,e,h,n,r,a;if(s=t.keyCode,-1==i(I,s)&&I.push(s),93!=s&&224!=s||(s=91),s in P){P[s]=!0;for(h in k)k[h]==s&&(p[h]=!0)}else if(o(t),p.filter.call(this,t)&&s in w)for(a=u(),n=0;n<w[s].length;n++)if(e=w[s][n],e.scope==a||"all"==e.scope){r=e.mods.length>0;for(h in P)(!P[h]&&i(e.mods,+h)>-1||P[h]&&-1==i(e.mods,+h))&&(r=!1);(0!=e.mods.length||P[16]||P[18]||P[17]||P[91])&&!r||e.method(t,e)===!1&&(t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation&&t.stopPropagation(),t.cancelBubble&&(t.cancelBubble=!0))}}function n(t){var s,e=t.keyCode,o=i(I,e);if(o>=0&&I.splice(o,1),93!=e&&224!=e||(e=91),e in P){P[e]=!1;for(s in k)k[s]==e&&(p[s]=!1)}}function r(){for(Y in P)P[Y]=!1;for(Y in k)p[Y]=!1}function p(t,s,i){var e,o;e=v(t),void 0===i&&(i=s,s="all");for(var h=0;h<e.length;h++)o=[],t=e[h].split("+"),t.length>1&&(o=g(t),t=[t[t.length-1]]),t=t[0],t=b(t),t in w||(w[t]=[]),w[t].push({shortcut:e[h],scope:s,method:i,key:e[h],mods:o})}function a(t,s){var i,o,h,n,r,p=[];for(i=v(t),n=0;n<i.length;n++){if(o=i[n].split("+"),o.length>1&&(p=g(o)),t=o[o.length-1],t=b(t),void 0===s&&(s=u()),!w[t])return;for(h=0;h<w[t].length;h++)r=w[t][h],r.scope===s&&e(r.mods,p)&&(w[t][h]={})}}function l(t){return"string"==typeof t&&(t=b(t)),-1!=i(I,t)}function c(){return I.slice(0)}function d(t){var s=(t.target||t.srcElement).tagName;return!("INPUT"==s||"SELECT"==s||"TEXTAREA"==s)}function f(t){M=t||"all"}function u(){return M||"all"}function y(t){var s,i,e;for(s in w)for(i=w[s],e=0;e<i.length;)i[e].scope===t?i.splice(e,1):e++}function v(t){var s;return t=t.replace(/\s/g,""),s=t.split(","),""==s[s.length-1]&&(s[s.length-2]+=","),s}function g(t){for(var s=t.slice(0,t.length-1),i=0;i<s.length;i++)s[i]=k[s[i]];return s}function m(t,s,i){t.addEventListener?t.addEventListener(s,i,!1):t.attachEvent&&t.attachEvent("on"+s,function(){i(window.event)})}function X(){var t=s.key;return s.key=S,t}var Y,w={},P={16:!1,18:!1,17:!1,91:!1},M="all",k={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,command:91},x={backspace:8,tab:9,clear:12,enter:13,"return":13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,"delete":46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220},b=function(t){return x[t]||t.toUpperCase().charCodeAt(0)},I=[];for(Y=1;20>Y;Y++)x["f"+Y]=111+Y;var B={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey"};for(Y in k)p[Y]=!1;m(document,"keydown",function(t){h(t)}),m(document,"keyup",n),m(window,"focus",r);var S=s.key;s.key=p,s.key.setScope=f,s.key.getScope=u,s.key.deleteScope=y,s.key.filter=d,s.key.isPressed=l,s.key.getPressedKeyCodes=c,s.key.noConflict=X,s.key.unbind=a,t.exports=p}(this)},function(t,s,i){function e(t){this.pos=t.pos,this.vel=t.vel,this.radius=t.radius,this.color=t.color,this.game=t.game}var o=i(2);e.prototype.draw=function(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.pos[0],this.pos[1],this.radius,2*Math.PI,0,!0),t.fill(),t.lineWidth=1,t.strokeStyle="white",t.stroke()},e.prototype.move=function(){this.pos[0]+=this.vel[0],this.pos[1]+=this.vel[1]},e.prototype.wrap=function(){var t=this.game.isOutOfBounds(this.pos);"X"===t?this.vel[0]=-1*this.vel[0]:"Y"===t&&(this.vel[1]=-1*this.vel[1])},e.prototype.isCollidedWith=function(t){return o.distanceBetween(this.pos,t.pos)<this.radius+t.radius},t.exports=e},function(t,s,i){function e(t,s,i){this.game=t,this.posX=s[0],this.posY=s[1],this.direction=i,this.color="#fff",this.speed=7}i(2);e.prototype.draw=function(t){t.translate(this.posX,this.posY),t.fillStyle=this.color,t.beginPath(),t.arc(0,0,5,0,2*Math.PI),t.fill(),t.setTransform(1,0,0,1,0,0)},e.prototype.collision=function(){for(var t=this.game.map,s=0;s<t.length;s++){var i=t[s];if(this.inside([this.posX,this.posY-5],i)||this.inside([this.posX,this.posY+5],i)||this.inside([this.posX+5,this.posY],i)||this.inside([this.posX-5,this.posY],i))return!0}return!1},e.prototype.inside=function(t,s){return t[0]>s[0]&&t[0]<s[0]+s[2]&&t[1]>s[1]&&t[1]<s[1]+s[3]},e.prototype.insidePlayer=function(t,s){return t[0]>s[0]-25&&t[0]<s[0]+25&&t[1]>s[1]-25&&t[1]<s[1]+25},e.prototype.step=function(t,s){return this.posX+=Math.cos(this.direction)*this.speed,this.posY+=Math.sin(this.direction)*this.speed,this.insidePlayer([this.posX,this.posY-5],t)||this.insidePlayer([this.posX,this.posY+5],t)||this.insidePlayer([this.posX+5,this.posY],t)||this.insidePlayer([this.posX-5,this.posY],t)?"player1":this.insidePlayer([this.posX,this.posY-5],s)||this.insidePlayer([this.posX,this.posY+5],s)||this.insidePlayer([this.posX+5,this.posY],s)||this.insidePlayer([this.posX-5,this.posY],s)?"player2":this.collision()?"wall":this.posX<5?"wall":this.posX>995?"wall":this.posY<5?"wall":this.posY>795?"wall":"air"},t.exports=e}]);