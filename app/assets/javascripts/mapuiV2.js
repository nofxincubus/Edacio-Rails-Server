//Contact Circle UI by CALVIN PARK
//Questions email me
//use it all you want just be nice and mention me in your website

function MapUI(w, h,csvg){
	this.svg = csvg;
	this.width = w;
	this.height = h;
	this.currentId = 0;
	this.dv = 0;
	this.damping = 0.95;
	this.updown = 1;
	this.layerlevel = 0;
	this.sizeConstraint = 0.4;
	this.circleRadius = h*this.sizeConstraint;
	this.centerx = w/2 - 10;
	this.centery = this.circleRadius + 80;
	this.stable = true;
	this.selectedNode = 0;
	this.innerStart = 0;
	this.loadTopNodes();
	this.initialize();
	this.dragged = false;
	this.lines =[];
	this.doCircle = false;
	this.tutorial = true;
	this.xlinkns = "http://www.w3.org/1999/xlink";
	//Tutorial stuff
	this.tutpic1 = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	this.tutpic1.setAttributeNS(this.xlinkns, 'xlink:href', "/assets/buildyournetwork.png");
	this.tutpic1.setAttribute('width',400);
	this.tutpic1.setAttribute('height',130);	
	this.tutpic1.setAttribute('x',170);
	this.tutpic1.setAttribute('y',this.centery-100);
	this.tutpic1.setAttribute("opacity",1);
	this.tutpic2 = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	this.tutpic2.setAttributeNS(this.xlinkns, 'xlink:href', "/assets/AddCustomCategories.png");
	this.tutpic2.setAttribute('width',265);
	this.tutpic2.setAttribute('height',265);
	this.tutpic2.setAttribute('x',350);
	this.tutpic2.setAttribute('y',20);
	this.tutpic2.setAttribute("opacity",1);
	this.tutpic3 = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	this.tutpic3.setAttributeNS(this.xlinkns, 'xlink:href', "/assets/SetupRecurringNotifications.png");
	this.tutpic3.setAttribute('width',200);
	this.tutpic3.setAttribute('height',100);	
	this.tutpic3.setAttribute('x',w-250-220);
	this.tutpic3.setAttribute('y',100);
	this.tutpic3.setAttribute("opacity",0);
	this.tutpic4 = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	this.tutpic4.setAttributeNS(this.xlinkns, 'xlink:href', "/assets/AddPrivateNotes.png");
	this.tutpic4.setAttribute('width',200);
	this.tutpic4.setAttribute('height',100);
	this.tutpic4.setAttribute('x',w-250-220);
	this.tutpic4.setAttribute('y',185);
	this.tutpic4.setAttribute("opacity",0);

	this.menu = new JoshuaMenu(200,window.innerHeight-55,0,40);
	this.oldmenu = new DivMenu(window.innerWidth-250,30,40,200);
}

MapUI.prototype.drawTutorial = function(svg){
	if (this.tutorial){
		svg.appendChild(this.tutpic1);
		svg.appendChild(this.tutpic2);
		svg.appendChild(this.tutpic3);
		svg.appendChild(this.tutpic4);
	}
}

MapUI.prototype.setTutorial = function(){
	if (this.tutorial){
		this.tutpic1.setAttribute("opacity",0);
		this.tutpic2.setAttribute("opacity",0);
		this.tutpic3.setAttribute("opacity",0);
		this.tutpic4.setAttribute("opacity",0);
	} else {
		this.tutpic1.setAttribute("opacity",1);
		this.tutpic2.setAttribute("opacity",1);
		this.tutpic3.setAttribute("opacity",1);
		this.tutpic4.setAttribute("opacity",1);
	}
}


MapUI.prototype.increaseSize = function(){
	this.sizeConstraint +=0.005;
	this.width += 5;
	this.circleRadius = this.width*this.sizeConstraint;
	this.centerx = this.width*0.5 - 10;
	this.centery = this.circleRadius + 50;
	this.topFocus.increaseSize();
	//this.topFocus.increaseSize();
	this.drawAll();
}

MapUI.prototype.decreaseSize = function(){
	this.sizeConstraint -=0.005;
	this.width -= 5;
	this.circleRadius = this.width*this.sizeConstraint;
	this.centerx = this.width*0.5 - 10;
	this.centery = this.circleRadius + 50;
	this.topFocus.decreaseSize();
	//this.topFocus.decreaseSize();
	this.drawAll();
}

MapUI.prototype.changeCircle = function(){
	if (this.doCircle)
		this.doCircle = false;
	else
		this.doCircle = true;
	this.drawAll();
}

MapUI.prototype.loadTopNodes = function(){
	//Linkedin Load for your own shit but temporarily
	var x = new connectionProfile(0,0,"/assets/tempme.png","Your Name","Mr. Incredible at somewhere in some awesome job in USA","Ann Arbor, MI", "Working like Crazy and doing other shizzles and hizzles and bizzles","");
	x.setMe();
	this.topFocus = new Focus(x,0);
	this.currentFocus = this.topFocus;
	this.selectedNode = this.currentFocus;
	this.selectedNode.isSelected();
}
MapUI.prototype.resetTopNodes = function(profile){
	//Linkedin Load for your own shit but temporarily
	profile.setMe();
	var newFoc = new Focus(profile,0);
	if (this.topFocus.children.length > 0)
		newFoc.children = this.topFocus.children;
	if (this.topFocus.profile.notes.length > 0)
		newFoc.profile.notes = this.topFocus.profile.notes;
	if (this.topFocus.profile.permanantTag.length > 0)
		newFoc.profile.permanantTag = this.topFocus.profile.permanantTag;
	if (this.topFocus.profile.pastChallenges.length > 0)
	newFoc.profile.pastChallenges = this.topFocus.profile.pastChallenges;
	this.topFocus = newFoc;
	this.currentFocus = this.topFocus;
	this.selectedNode = this.currentFocus;
	this.selectedNode.isSelected();
	this.drawAll(this.svg);
}

MapUI.prototype.initialize = function(){
	
	this.mainCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	this.mainCircle.setAttribute("stroke", "#9966FF");
	this.mainCircle.setAttribute("fill", "none");
	this.mainCircle.setAttribute("stroke-width", "3");
	this.mainCircle.setAttribute('opacity',"1");
	this.mainCircle.setAttribute('r', this.circleRadius);
	this.mainCircle.setAttribute('cx', this.centerx);
	this.mainCircle.setAttribute('cy', this.centery);
	
	this.parentLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
};

//Draw the MAP UI
MapUI.prototype.drawAll = function(svg) {
	this.removeAll(svg);
	
	this.reposition();
	if (this.tutorial){
		if (selectedNode != 0){
			this.tutpic3.setAttribute("opacity",1);
			this.tutpic4.setAttribute("opacity",1);
		} else {
			this.tutpic3.setAttribute("opacity",0);
			this.tutpic4.setAttribute("opacity",0);
		}
	}	
	//Add the circle or lines
	if (this.doCircle)
		svg.appendChild(this.mainCircle);
	else {
		for (var i = 0;i < this.lines.length;i ++)
			svg.appendChild(this.lines[i]);
	}

	if (this.currentFocus.parent != 0)
	{
		svg.appendChild(this.parentLine);
		svg.appendChild(this.currentFocus.parent.getPoint());
	}
	var i = 0;
	this.currentFocus.dragOut();
	svg.appendChild(this.currentFocus.getPoint());
	while (i < this.currentFocus.children.length){
		this.currentFocus.children[i].dragOver();
		svg.appendChild(this.currentFocus.children[i].getPoint());
		i++;
	}
	
};

//Reve the MAP UI
MapUI.prototype.removeAll = function(svg) {
	var thresh = 5;
	while (svg.childNodes.length > thresh ){
		svg.removeChild(svg.lastChild);
	}
	
};


MapUI.prototype.importNodes = function(json) {
	//Get Data but for now simulate
	this.numNodes = 1;	
};

MapUI.prototype.getMousePos = function(x,y){
	i =0;
	while (i < this.currentFocus.children.length){
		this.currentFocus.children[i].dropBoxTest(x,y);
		i++;
	}
};

MapUI.prototype.reposition = function() {
	this.lines = [];
	//set Radius
	this.mainCircle.setAttribute('cx', this.centerx);
	this.mainCircle.setAttribute('cy', this.centery);
	this.mainCircle.setAttribute('r', this.circleRadius);
	//set transparency shizzle

	var ciropac = 1-Math.abs(this.circleRadius - 200)/200;
	this.mainCircle.setAttribute('opacity',ciropac);
	this.currentFocus.setXY(this.centerx, this.centery);
	
	if (this.currentFocus.parent != 0)
	{
		//var parentX = this.centerx - this.circleRadius+60;
		var parentX = this.centerx - this.circleRadius*0.8;
		var parentY = this.centery - this.circleRadius*0.8;
		this.currentFocus.parent.setXY(parentX, parentY);
		this.parentLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		this.parentLine.setAttribute("stroke", "#9966FF");
		this.parentLine.setAttribute("fill", "none");
		this.parentLine.setAttribute("stroke-width", "3");
		this.parentLine.setAttribute('opacity',"1");
		this.parentLine.setAttribute('x1',this.centerx);
		this.parentLine.setAttribute('y1',this.centery);
		this.parentLine.setAttribute('x2',parentX);
		this.parentLine.setAttribute('y2',parentY);
	}

	var mpi = Math.PI/180;
	//fill the circle
	var innercount = this.currentFocus.children.length;
	var innerAngle = 360/innercount;
	var innerIncrement = innerAngle * mpi;
	var innerS = this.innerStart;
	for (var i = 0; i < this.currentFocus.children.length;i ++){
		var cr;
		cr = this.circleRadius;
		innerS += innerIncrement;
		var xp;
		/*
		if (this.selectedNode === 0)
			xp = this.centerx + 1.2*Math.sin(innerS) * cr;
		else
			xp = this.centerx + 1.2*Math.sin(innerS)*Math.sin(innerS) * cr;*/
		xp = this.centerx + 0.8*Math.sin(innerS) * cr;
		var yp = this.centery + 0.8*Math.cos(innerS) * cr;
		this.currentFocus.children[i].setXY(xp,yp);
		var line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
		line.setAttribute("stroke", "#9966FF");
		line.setAttribute("fill", "none");
		line.setAttribute("stroke-width", "3");
		line.setAttribute('opacity',"1");
		line.setAttribute("z-index",0);
		line.setAttribute('x1',this.centerx);
		line.setAttribute('y1',this.centery);
		line.setAttribute('x2',xp);
		line.setAttribute('y2',yp);
		this.lines.push(line);
	}
	
	
};


MapUI.prototype.zoomIterate=function(){
	/*
	if(this.stable)
		return this.stable;
	
	else {
	this.dv = this.dv * this.damping;
	
	var cirR = this.circleRadius;
	var outR = this.circleRadius + 200;
	cirR +=  this.dv;
	outR = cirR + 200;

	if (cirR <= 0){
		this.circleRadius = outR;
		this.outerRadius = 400;
	}
	else if (cirR >= 200) {
		if (this.layerlevel === 0){
			this.stable === true;
			return this.stable;
		} else {
			this.outerRadius = cirR;
			this.circleRadius = 0;
		}
	}
	else {
		this.circleRadius = cirR;
		this.outerRadius = outR;
	}
	
		
	if (Math.abs(this.dv) < 0.1)
		this.stable = true;
	else 
		this.stable = false;
	return this.stable;
	}
	*/
}

MapUI.prototype.spinIterate=function(){
	if(this.stable)
		return this.stable;
	
	else {
	this.dv = this.dv * this.damping;
	
	
	if (this.innerStart < 0)
		this.innerStart +=2*Math.PI;
	else if (this.innerStart > 2*Math.PI)
		this.innerStart -= 2*Math.PI;
	else{
		this.innerStart += this.dv;
		for (var i = 0;i < this.currentFocus.children.length;i++)
			this.currentFocus.children[i].innerStart = 2*this.innerStart;
	}
		
	if (Math.abs(this.dv) < 0.1*Math.PI/180)
		this.stable = true;
	else 
		this.stable = false;
	return this.stable;
	}
};

MapUI.prototype.topNodeTest = function(a,b) {
	for (var i = 0;i < this.currentFocus.children.length;i++)
		if (this.currentFocus.children[i].distance(a,b) < this.currentFocus.width*1.2)
			return i;
	return -1;
}

MapUI.prototype.parentTest = function(a,b) {
	if (this.currentFocus.parent != 0){
		if (this.currentFocus.parent.distance(a,b) < this.currentFocus.width*1.2) {
			return true;
		}
	}
	return false;
}
MapUI.prototype.currentTest = function(a,b) {
		if (this.currentFocus.distance(a,b) < this.currentFocus.width*1.2) {
			return true;
		}
	return false;
}

MapUI.prototype.moveAll = function(b,a){
	
}

MapUI.prototype.SetDragged=function(b,a){
	var ba;
	if (this.topNodeTest(b,a) != -1) {
		if ( this.currentFocus.children[this.topNodeTest(b,a)].children.length > 0){
			this.currentFocus = this.currentFocus.children[this.topNodeTest(b,a)];
			if (this.selectedNode !== 0)
				this.selectedNode.deSelect();
			this.selectedNode = this.currentFocus;
			this.selectedNode.isSelected();
			this.dragged = true;
			this.startDragX = b;
			this.startDragY = a;
		}
		else {
			if (this.selectedNode !== 0)
				this.selectedNode.deSelect();
			this.selectedNode = this.currentFocus.children[this.topNodeTest(b,a)];
			this.selectedNode.isSelected();
			this.dragged = true;
			this.startDragX = b;
			this.startDragY = a;
		}
	} else if (this.parentTest(b,a)){
		this.currentFocus = this.currentFocus.parent;
		if (this.selectedNode != 0)
				this.selectedNode.deSelect();
		this.selectedNode = this.currentFocus;
		this.selectedNode.isSelected();
	} else if (this.currentTest(b,a)){
		if (this.selectedNode != 0)
				this.selectedNode.deSelect();
		this.selectedNode = this.currentFocus;
		this.selectedNode.isSelected();
	}
	else {
		if (this.selectedNode != 0){
			this.selectedNode.deSelect();
			this.selectedNode = 0;
			}
	}
	this.drawAll(this.svg);
	return this.selectedNode;
};

MapUI.prototype.MoveDragged=function(b,a){
	if(this.dragged) {
		this.selectedNode.setXY(b,a);
	}
};
MapUI.prototype.StopDragging=function(b,a){
	if(this.dragged) {
		if (b < 250) {
			for (var i = 0;i < this.currentFocus.children.length;i++)
				if (this.currentFocus.children[i] === this.selectedNode){
					$.ajax({type:"DELETE",url:'/connections/' + this.selectedNode.profile.id, dataType: "connections", data: 
							  {}, 
								success: function(resp) {
									alert(resp['response']);
           	 }});
					this.currentFocus.children.splice(i,1);
					if (this.currentFocus.children.length === 0 && this.currentFocus != this.topFocus)
						this.currentFocus = this.currentFocus.parent;
					this.dragged = false;
					return true;
				}
		} else {
			for (var i = 0;i < this.currentFocus.children.length;i++)
				if (this.currentFocus.children[i] === this.selectedNode){
					var tNT = this.topNodeTest(b,a);
					if (tNT != -1 && tNT != i) {
							this.selectedNode.parent = this.currentFocus.children[tNT];
							this.currentFocus.children[tNT].children.push(this.selectedNode)
							this.currentFocus.children.splice(i,1);
					}
					else {
						break;
					}
				}		
			
			this.selectedNode.setXY(this.startDragX,this.startDragY);
			this.dragged = false;
			return false;
		}	
	}
	this.dragged = false;
	return false;
};


MapUI.prototype.dropNode = function(b,a, selected, firstindex){
	var inserted = false;
		for (var i = 0;i < this.currentFocus.children.length;i++){
			if (this.currentFocus.children[i].distance(b,a) < this.currentFocus.width*1.2){
				var menuIconIndex = Math.abs(selected) + Math.abs(firstindex);
				var foci = 0;
				if (menuIconIndex < 6){
					var nodeName = prompt("Please type in the name of the node", this.menu.profileList[menuIconIndex].name);
					if (nodeName!=null && nodeName!="")	{
						var newProf = new connectionProfile(0,0,this.menu.profileList[menuIconIndex].picURL,nodeName,"","", "","");
						foci = new Focus(newProf,this.currentFocus.children[i]);
					}
					else 
						foci = 0;
				} else {
					this.menu.profileList[menuIconIndex].setID();
					foci = new Focus(this.menu.profileList[menuIconIndex],this.currentFocus.children[i]);
					this.currentId++;
				}
				if (foci != 0){
					$.ajax({type:"POST",url:'/connections', dataType: "json", data: 
							  {"connection":{"linkid":foci.profile.linkid,
								"picurl":foci.profile.picURL,
								"name":foci.profile.name,
								"linkid":foci.profile.linkid,
								"title":foci.profile.title,
								"location":foci.profile.location,
								"linkurl":foci.profile.publicURL,
								"status":foci.profile.currentStatus,
								"tags":foci.profile.permanantTag,
								"priority":foci.profile.priority,
								"parent_id":this.currentFocus.children[i].profile.id,
								"last_contacted":0}}, 
								success: function(resp) {
					 				eoifjdkjfelfiejfkjdf = resp['response'];
									selectedNode.setID(parseInt(eoifjdkjfelfiejfkjdf));
									eoifjdkjfelfiejfkjdf = -100;
            }});
					this.currentFocus.children[i].children.push(foci);
					if (selectedNode != 0)
						selectedNode.deSelect();
					selectedNode = foci;
					selectedNode.isSelected();
					displayConnectionInfo();
					inserted = true;
				}
				
			}
		}
		var dis = this.currentFocus.distance(b,a);
		if (dis < this.currentFocus.width*1.2) {
			var menuIconIndex = Math.abs(selected) + Math.abs(firstindex);
				var foci = 0;
				if (menuIconIndex < 6){
					var nodeName = prompt("Please type in the name of the node", this.menu.profileList[menuIconIndex].name);
					if (nodeName!=null && nodeName!="")	{
						var newProf = new connectionProfile(this.currentId,0,this.menu.profileList[menuIconIndex].picURL,nodeName,"","", "","");
						this.currentId++;
						foci = new Focus(newProf,this.currentFocus);
					}
					else 
						foci = 0;
				} else {
					this.menu.profileList[menuIconIndex].setID(this.currentId);
					foci = new Focus(this.menu.profileList[menuIconIndex],this.currentFocus);
					this.currentId++;
				}
			if (foci != 0){
				
				$.ajax({type:"POST",url:'/connections', dataType: "json", data: 
							  {"connection":{"linkid":foci.profile.linkid,
								"picurl":foci.profile.picURL,
								"name":foci.profile.name,
								"linkid":foci.profile.linkid,
								"title":foci.profile.title,
								"location":foci.profile.location,
								"linkurl":foci.profile.publicURL,
								"status":foci.profile.currentStatus,
								"tags":foci.profile.permanantTag,
								"priority":foci.profile.priority,
								"parent_id":this.currentFocus.profile.id,
								"last_contacted":0}}, 
								success: function(resp) {
					 				eoifjdkjfelfiejfkjdf = resp['response'];
									selectedNode.setID(parseInt(eoifjdkjfelfiejfkjdf));
									eoifjdkjfelfiejfkjdf = -100;
            } });

				this.currentFocus.children.push(foci);	
				if (selectedNode != 0)
					selectedNode.deSelect();
				selectedNode = foci;
				selectedNode.isSelected();
				displayConnectionInfo();
				this.inserted = true;	
			}
		}
}





