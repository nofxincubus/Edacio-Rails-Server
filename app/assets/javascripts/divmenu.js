// LinkedIn Drap and Drop Menu
// By Calvin park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function DivMenu(w, h, x, y ) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.nodeSize = 0.8;
	this.firstindex = 0;
	this.nodeType = "image";
	
	this.frameDiv = document.createElement('div');
	this.frameDiv.setAttribute('style','position:absolute; top:' + this.x + "px; left:" + this.y + 'px; background:url(/assets/smallmenuback.png); width:' + w + 'px; height:' + (h) + 'px;z-index:0' );
	this.frameDiv.style.mozBoxShadow = "3px 3px 4px #808080"
	this.frameDiv.style.boxShadow = "3px 3px 4px #808080"
	this.frameDiv.style.webkitBoxShadow = "3px 3px 4px #808080"
	
	document.body.appendChild(this.frameDiv);
	//document.body.appendChild(this.up);
	//document.body.appendChild(this.down);
	
	this.profileList = [];
	this.nodes = [];
	this.initialize();
	//this.positionAll(w,h,x,y);
}

DivMenu.prototype.positionAll = function (w,h,x,y){

	this.remove.setAttribute('x', this.x+15);
	this.remove.setAttribute('y', this.height+this.y+5);
	this.remove.setAttribute('rx', 10);
	this.remove.setAttribute('ry', 10);
	this.remove.setAttribute('width', this.width-30);
	this.remove.setAttribute('height', 40);
	this.removeText.setAttribute('x', this.x+15+(this.width-30)*0.5);
	this.removeText.setAttribute('y', this.height+this.y+5+23);
	
	this.resetGrid();
}

DivMenu.prototype.initialize = function() {
	
	//Standard Nodes
	/*
	Company
	Investors
	Developers
	Designers
	*/
	
	this.profileList.push(new connectionProfile(0,0,"/assets/company.png","Institution","","","",""));
	this.profileList.push(new connectionProfile(0,0,"/assets/investor.png","Investor","","","",""));
	this.profileList.push(new connectionProfile(0,0,"/assets/artist.png","Designer","","","",""));
	this.profileList.push(new connectionProfile(0,0,"/assets/programmer.png","Programmer","","","",""));
	this.profileList.push(new connectionProfile(0,0,"/assets/blankcontact.png","New Category","","","",""));
	this.profileList.push(new connectionProfile(0,0,"/assets/blankcategory.png","New Contact","","","",""));
	
	this.resetGrid();
}

DivMenu.prototype.addIndex = function(){
	if (this.firstindex + this.nodex*this.nodey < this.profileList.length)
		this.firstindex += this.nodex*this.nodey;
	this.resetGrid();
}
DivMenu.prototype.subIndex = function(){
	if (this.firstindex - this.nodex*this.nodey >= 0)
		this.firstindex -= this.nodex*this.nodey;
	this.resetGrid();
}

DivMenu.prototype.getMenu = function(){
	this.resetGrid();
	return this.group;
}

DivMenu.prototype.clickTest = function(a,b){
	
	var wid = this.nodeSize * this.width/this.nodex;
	var hei = this.nodeSize * this.height/this.nodey;
	if (a > this.x && a < this.width+this.x && b > this.y && b < this.height+this.y){
		for (var i = 0;i < this.nodes.length;i++){
			var x1 = Math.abs(this.nodes[i].getAttribute("x")) + wid*0.5;
			var y1 = Math.abs(this.nodes[i].getAttribute("y")) + hei*0.5;
			var distance = Math.sqrt((x1-a)*(x1-a) + (y1-b)*(y1-b));
			if (distance < hei*0.5) {
				this.selected = i;
				this.selectedX = this.nodes[i].getAttribute("x");
				this.selectedY = this.nodes[i].getAttribute("y");
				return true;
			}
		}
	}
	this.selected = -1;
	return false;
}

DivMenu.prototype.nodeTest = function(a,b){
	if (this.selected != -1){
		var wid = this.nodeSize * this.width/this.nodex;
		var hei = this.nodeSize * this.height/this.nodey;
		this.nodes[this.selected].setAttribute('x', (a - wid*0.5));
		this.nodes[this.selected].setAttribute('y', (b - hei*0.5));
		return true;
	}
	return false;
}



DivMenu.prototype.addLinked = function(pl){
	for (var i = 0;i < pl.length;i++){
		this.profileList.push(pl[i]);
	}
	this.resetGrid();
}

DivMenu.prototype.removeNodes = function(){
	while (this.frameDiv.childNodes.length > 0)
		this.frameDiv.removeChild(this.frameDiv.childNodes[0]);
	document.body.removeChild(this.frameDiv);
}


DivMenu.prototype.resetGrid=function(){
	this.removeNodes();
	document.body.appendChild(this.frameDiv);
	//Need to modify for 
	if (this.width > 500)
		this.nodex = 9;
	else if (this.width > 200)
		this.nodex = 4;
	else
		this.nodex = 1;
		
	if (this.height > 500)
		this.nodey = 9;
	else if (this.height > 200)
		this.nodey = 7;
	else
		this.nodey = 1;
	
	var wid = this.nodeSize * this.width/this.nodex;
	var wborder = (1 - this.nodeSize) * 0.5 * this.width/this.nodex
	var hei = this.nodeSize * this.height/this.nodey;
	var hborder = (1 - this.nodeSize) * 0.5 * this.height/this.nodey;
	var wc = this.width/this.nodex;
	var hc = this.height/this.nodey;
	var k = this.firstindex;
	for (j = 0;j < this.nodey;j++) {
	for (i = 0; i < this.nodex;i++){
			var pl = this.profileList.length;
			if (pl === 0)
				pl = this.nodex*this.nodey;
			if (k < pl){
				var newImg = document.createElement('img');
				newImg.setAttribute('src',this.profileList[k].picURL);
				newImg.setAttribute('draggable','true');
				

				var length;
					//change to pics here PICS
					//add text for people's names
					if (0.8*wid < 0.8*hei) {
						newImg.setAttribute('WIDTH',wid);
						newImg.setAttribute('HEIGHT',wid);
						length = wid;
						var xup = (wc)*i + 3;
						var yup = (hc)*j +  hc*0.5 - 0.5*wid;
						var styleText = 'position:absolute; top:' + yup + "px; left:" +xup + 'px; z-index:5;cursor:pointer';
						newImg.setAttribute('style',styleText);
					} else {
						newImg.setAttribute('WIDTH',hei);
						newImg.setAttribute('HEIGHT',hei);
						length = hei;
						var xup = (this.width/this.nodex)*i +  0.5*wc - 0.5*hei;
						var yup = (this.height/this.nodey)*j +  hborder;
						var styleText = 'position:absolute; top:' + yup + "px; left:" +xup + 'px; z-index:5;cursor:pointer';
						newImg.setAttribute('style',styleText);
					}
				rn=Math.floor(Math.random()*11)/10;
				xx = (wc)*i + this.x + wborder + wid*0.5 + rn*5;
				yy = (hc)*j + this.y + hc*0.5 +rn*5;
				newImg.setAttribute('ondragstart','onDragEvent(event)');
				newImg.id = "divmenuitem" + k;
				newImg.setAttribute('onmouseover', "evt.target.style.width = '50px';evt.target.style.height = '50px';");
				newImg.setAttribute('onmouseout',"evt.target.style.width = '"+ length + "px';evt.target.style.height = '"+ length + "px';");
				this.frameDiv.appendChild(newImg);
				k++;
			}
		}
	}
}



