// liprofile.js
// LinkedIn profile widget
// By Calvin Park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function LIProfile() {
	//this.initialize();
	//this.testBuild();
	this.profTag = document.getElementById('linkImage');
	this.nameTag = document.getElementById('linkName');
	this.locationTag = document.getElementById('linkLocation');
	this.titleTag = document.getElementById('linkTitle');
	this.closeButton = document.getElementById('close');
	this.trackButton = document.getElementById('track');
	this.touchButton = document.getElementById('touch');
	this.wrapdiv = document.getElementById('contactprofile');
	this.wrapdiv.style.zIndex = 3;
	this.reposition();
}

LIProfile.prototype.setConnections = function(profile) {
    this.publicURL = profile.publicURL;
	this.pictureURL = profile.picURL;
	this.name = profile.name;
	this.location = profile.location;
	this.title = profile.title;
	if (profile.type === 1){
		this.closeButton.style.background = "#777";
		this.trackButton.style.background = "#222";
		this.touchButton.style.background = "#222";
	}
	else if (profile.type === 2){
		this.closeButton.style.background = "#222";
		this.trackButton.style.background = "#777";
		this.touchButton.style.background = "#222";
	}
	else if (profile.type === 3){
		this.closeButton.style.background = "#222";
		this.trackButton.style.background = "#222";
		this.touchButton.style.background = "#777";
	}
	this.buildDiv();
}

LIProfile.prototype.testBuild = function(){
	var wrapdiv = document.getElementById('contactprofile');
	this.profTag = document.createElement('image');
	this.profTag.setAttribute('src',"tempme.png");
	this.nameTag = document.createElement('h3');
	this.nameTag.textContent =  "" ;
	this.locationTag = document.createElement('h4');
	this.locationTag.textContent = "";
	this.titleTag = document.createElement('h5');
	this.titleTag.textContent = "";
}

LIProfile.prototype.buildDiv = function(){
	this.profTag.src = this.pictureURL;
	this.nameTag.textContent = this.name;
	this.locationTag.textContent = this.location;
	this.titleTag.textContent = this.title;
	
}

LIProfile.prototype.reposition = function(){
	this.profTag.style.position = "absolute";
	this.profTag.style.top = "1px";
	this.profTag.style.left = "1px";
	this.profTag.style.width = "58px";
	this.profTag.style.height = "58px";
	
	this.nameTag.style.position = "absolute";
	this.nameTag.style.top = "0px";
	this.nameTag.style.left= "60px";
	this.nameTag.style.color = "#FFF";
	
	this.titleTag.style.position = "absolute";
	this.titleTag.style.top = "90px";
	this.titleTag.style.left= "5px";
	this.titleTag.style.fontSize = "11px";
	
	this.locationTag.style.position = "absolute";
	this.locationTag.style.top = "115px";
	this.locationTag.style.left= "5px";
	this.locationTag.style.fontSize = "11px";
	
	this.closeButton.style.position = "absolute";
	this.closeButton.style.top = "60px";
	this.closeButton.style.left = "1px";
	this.closeButton.style.width = "80px";
	this.closeButton.style.height = "20px";

	this.trackButton.style.position = "absolute";
	this.trackButton.style.top = "60px";
	this.trackButton.style.left = "82px";
	this.trackButton.style.width = "80px";
	this.trackButton.style.height = "20px";

	this.touchButton.style.position = "absolute";
	this.touchButton.style.top = "60px";
	this.touchButton.style.left = "164px";
	this.touchButton.style.width = "80px";
	this.touchButton.style.height = "20px";
}

LIProfile.prototype.removeAll = function(){
	this.wrapdiv.style.opacity = 0;
	while (this.wrapdiv.childNodes.length > 0)
		this.wrapdiv.removeChild(this.wrapdiv.childNodes[0]);
}
