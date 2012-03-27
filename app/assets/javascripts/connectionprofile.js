// connectionProfile.js
// Calvin Park
// Email nofxincubus@gmail.com for questions
// Use it all you want just put on your site that you are using my stuff :)

function connectionProfile(id,linkid, picURL, name, title, location, currentStatus, publicURL){
	this.id = id;
	this.linkid = linkid;
	this.picURL = picURL;
	this.name = name;
	this.title = title;
	this.location = location;
	this.currentStatus = currentStatus;
	this.publicURL = publicURL;
	this.me = false;
	////////////////////////
	//if me is true
	this.xp = 0;
	this.credits =0;
	this.awards =0;
	this.links = 0;
	this.alerts=0;
	this.lastConnected = "0 days";
	this.lastViewed = 0;
	////////////////////////
	// 1. Stay Close
	 // 2. Keep Track
	//  3. Keep in touch
	this.priority = 999;
	//add Notes and shit
	this.notes = [];
	this.permanantTag = "";
	//this.currentChallenge
	this.pastChallenges = [];
}

connectionProfile.prototype.setID = function(id){
	this.id = id;
}


connectionProfile.prototype.appendNotes = function(notes){
	this.notes.push(notes);
}

connectionProfile.prototype.appendPermenantNotes = function(notes){
	this.permanantTag.push(notes);
}

connectionProfile.prototype.setMe = function(){
	this.me = true;
	this.updateProfile();
}

connectionProfile.prototype.getNextAppointment = function(){
	var today = new Date();
	var comparison;
	if (this.type === 1)
		comparison = 7*24*60*60*1000*0.5;
	else if (this.type === 2)
		comparison = 7*24*60*60*1000;
	else 
		comparison = 7*24*60*60*1000*4;
	today = new Date(today.getTime() + comparison)
	var newTimeString = today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate() + " 11:00:00";
	var newDate = new Date(newTimeString);
	return newDate;
}

connectionProfile.prototype.getNotify = function(){
	var x;
	if (this.lastConnected.indexOf("day") > -1)
		x = parseInt(this.lastConnected);
	else
		x = 0;
	if (x < this.priority)
		return false;
	else
		return true;
}

connectionProfile.prototype.updateTime = function(){
	
}
/*

connectionProfile.prototype.addScore = function(delta){
 this.xp += delta;
 this.updateProfile();
}
connectionProfile.prototype.clearScore = function()
{
 this.score = 0;
 addCommas(this.score);
 this.updateProfile();
}
// Add/clear credits
connectionProfile.prototype.addCredits= function(delta){
 this.credits += delta;
 this.updateProfile();
}
connectionProfile.prototype.clearCredits = function()
{
 this.credits = 0;
this.updateProfile();
}
//Add/clear rewards
connectionProfile.prototype.addAwards = function(delta){
 this.awards += delta;
 this.updateProfile();
}
connectionProfile.prototype.clearAwards = function()
{
 this.awards= 0;
 this.updateProfile();
}
*/
connectionProfile.prototype.updateProfile = function(){
	//document.getElementById('profileimage').src = this.picURL;
	if (this.name != "Your Name")
		document.getElementById('profilename').innerHTML = this.name;
	if (this.alerts === 0){
		document.getElementById('alertCounter').style.opacity = 0;
	} else{
		document.getElementById('alertCounter').style.opacity = 1;
	document.getElementById('alertCounterText').innerHTML = parseInt(this.alerts);
	}
	/*document.getElementById('credits').innerHTML = parseInt(this.credits);
	document.getElementById('awards').innerHTML = parseInt(this.awards);
	document.getElementById('links').innerHTML = parseInt(this.links);
	document.getElementById('points').innerHTML = parseInt(this.xp);*/
}
