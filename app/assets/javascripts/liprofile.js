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
	this.oneTimeButton = document.getElementById('onetime');
	this.recurSelect = document.getElementById('recurselect');
	this.wrapdiv = document.getElementById('contactprofile');
	this.wrapdiv.style.zIndex = 3;
	this.wrapdiv.style.overflow = "hidden";
	this.reposition();
}

LIProfile.prototype.setConnections = function(profile) {
    this.publicURL = profile.publicURL;
	this.pictureURL = profile.picURL;
	this.name = profile.name;
	this.location = profile.location;
	this.title = profile.title;
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
	this.titleTag.style.top = "15px";
	this.titleTag.style.left= "60px";
	this.titleTag.style.fontSize = "11px";
	
	this.locationTag.style.position = "absolute";
	this.locationTag.style.bottom = "2px";
	this.locationTag.style.left= "60px";
	this.locationTag.style.fontSize = "11px";
	
	this.oneTimeButton.style.position = "absolute";
	this.oneTimeButton.style.top = "1px";
	this.oneTimeButton.style.left = "1px";
	this.oneTimeButton.style.width = "123px";
	this.oneTimeButton.style.height = "30px";

	this.recurSelect.style.position = "absolute";
	this.recurSelect.style.top = "1px";
	this.recurSelect.style.left = "125px";
	this.recurSelect.style.width = "123px";
	this.recurSelect.style.height = "20px";

}

LIProfile.prototype.removeAll = function(){
	this.wrapdiv.style.opacity = 0;
	while (this.wrapdiv.childNodes.length > 0)
		this.wrapdiv.removeChild(this.wrapdiv.childNodes[0]);
}
