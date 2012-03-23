
//MAP UI by CALVIN PARK
//Questions email me
//use it all you want just be nice and mention me in your website

//Initialize Map Interface!
requestAnimFrame = (
		function() {
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback, element) {
				window.setTimeout(callback, 1000/60);
			};
		})();

function el(s)
{
	return document.getElementById(s);
}

function initialize(){
	//site Initialization
	document.body.setAttribute("height",window.innerHeight);
	//el('footer1').setAttribute("style",'background:#6CF; height:' + window.innerHeight*0.25);
	mouseIncrease = window.innerHeight*0.05;
	//myProfile = new profile();
	
	if (getInternetExplorerVersion() === -1)
		runFancy = false;
	else
		runFancy = false;
	svg = el('svgc');
	runFancy = false;
	document.addEventListener("mousedown",	onMD, false);
	document.addEventListener("mousemove",	onMM, false);
	
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
	
	//Firefox's stupidest compatibility test
	if (/Firefox/i.test(navigator.userAgent))
		document.addEventListener(mousewheelevt, onSC, false);
	else if (document.attachEvent) //if IE (and Opera depending on user setting)
		document.attachEvent("on"+mousewheelevt, onSC);
	else if (document.addEventListener) //WC3 browsers
		document.addEventListener(mousewheelevt, onSC, false);
	
	document.addEventListener("mouseup",		onMU, false);
		
	document.addEventListener("touchstart",	onMD, false);
	document.addEventListener("touchend",	onMU, false);
	document.addEventListener("touchmove",	onMM, false);
	eoifjdkjfelfiejfkjdf = -100;
	h = window.innerHeight - 70;
	w = window.innerWidth;
	hw=w/2;
	hh = h - 300;
	svg.setAttribute("style","width:100%; height:" + h + "px;");
	mapui = new MapUI(w,h,svg);
	//mapui.addNode();
	//setfeed = new Feeddivs();
	
	actionitem = new ActionItem();
	
	//Right menu stuff
	rightAction = el('rightMenu');
	rightAction.style.height = (h + 30) + "px";
	

	liprof = new LIProfile();
	selectedNode =0;
	onEF();
	mapui.drawAll(svg);
		
}

function onSC(e){
	//for stupid firefox compatibility check.
	var evt=window.event || e //equalize event object
    var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta //delta returns +120 when wheel is scrolled up, -120 when scrolled down

	if (delta > 0)
	{
		mapui.dv -= 2*Math.PI/360;
		mapui.stable = false;
	}
	else if (delta < 0) {
		mapui.dv += 2*Math.PI/360;
		mapui.stable = false;
	}
}

function displayConnectionInfo(){
//display the linkedin info	
			if (selectedNode !== mapui.topFocus){
				addNoteList();
				var textTitle = document.getElementById('contacttitle');
				//var textArea = el('contacttextarea');
				//textArea.value = "";
				//textArea.focus();
				textTitle.textContent = "Notes about " + selectedNode.profile.name;
				var plugdiv = document.getElementById("plugview");
				plugging();
				liprof.setConnections(selectedNode.profile);
				actionitem.draw();
				if (document.getElementById('rightMenu').style.opacity < 1){
					$('#rightMenu').animate({
					opacity: 1,
					width: '250',
					}, 400, function() {
					// Animation complete.
					});
				} 
			} else {
					selectedNode.deSelect();
					if (document.getElementById('rightMenu').style.opacity > 0){
						$('#rightMenu').animate({
						opacity: 0,
						width: '0',
						}, 400, function() {
						// Animation complete.
						});
					}
				}		
}

function onMD(e){
	var xM = mouseX(e);
	var yM = mouseY(e);
	var ymHeight = mapui.height;
	if (selectedNode != 0 && xM > window.innerWidth-250){
	} else {
		selectedNode = mapui.SetDragged	(mouseX(e), mouseY(e));
		var liArray = $("#pastnotemenu li");
		if (selectedNode != 0){
			selectedNode.isSelected();
			// for Form
			//el('conID').value = selectedNode.profile.id;
			for (var i = 0;i < liArray.length;i++)
				if (parseInt(liArray[i].id) === selectedNode.profile.id)
					liArray[i].style.display = "block"
				else
					liArray[i].style.display = "none";
					
			displayConnectionInfo();
		} else {
			for (var i = 0;i < liArray.length;i++)
				liArray[i].style.display = "none";
			// for Form
			//el('conID').value = "";
			if (document.getElementById('rightMenu').style.opacity > 0){
				$('#rightMenu').animate({
					opacity: 0,
					width: '0',
					}, 400, function() {
					// Animation complete.
					});
			}
		}
	}
}

function onMM(e){mapui.MoveDragged	(mouseX(e), mouseY(e));}
function onMU(e){
	if (mapui.StopDragging (mouseX(e), mouseY(e))){
		if (document.getElementById('rightMenu').style.opacity > 0){
			$('#rightMenu').animate({
			opacity: 0,
			width: '0',
			}, 700, function() {
			// Animation complete.
			});
		}
		mapui.drawAll(svg);
	} else
		mapui.drawAll(svg);
}

function mouseX(e)
{
	var cx;
	if(e.type === "touchstart" || e.type === "touchmove") cx = e.touches.item(0).clientX;
	else cx = e.clientX;
	return (cx);
}
function mouseY(e)
{	
	var cy;
	if(e.type === "touchstart" || e.type === "touchmove")	cy = e.touches.item(0).clientY - 40;
	else cy = e.clientY - 40;
	return (cy); 
}

function myProfile(){
	//Get my Shizzles
}

function removeNode(){
	mapui.deleteSelectedNode();
	mapui.drawAll(svg);
}

function onEF()
{
	window.requestAnimFrame(onEF, svg);
	var stable = mapui.spinIterate();
	if(stable) return;
	mapui.drawAll(svg);
}

//Checking for IE
function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var browserIEVersion = -1; // Return value assumes failure.
  if (navigator.appName === 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      browserIEVersion = parseFloat( RegExp.$1 );
  }
  return browserIEVersion;
}
function checkVersion()
{
  var msg = "You're not using Internet Explorer.";
  var ver = getInternetExplorerVersion();

  if ( ver > -1 )
  {
    if ( ver >= 8.0 ) 
      msg = "You're using a recent copy of Internet Explorer."
    else
      msg = "You should upgrade your copy of Internet Explorer.";
  }
  alert( msg );
}

function addMenuIndex(){
	mapui.menu.addIndex();
}

function subMenuIndex(){
	mapui.menu.subIndex();
}

function changeMode(){
	mapui.changeCircle();
}
function increaseSize(){
	mapui.increaseSize();
}
function decreaseSize(){
	mapui.decreaseSize();
}

function drop(event){
	var findex = mapui.menu.firstindex;
	var index = parseInt(event.dataTransfer.getData("Text"));
	mapui.dropNode(mouseX(event), mouseY(event), index, findex);
	mapui.drawAll(svg);
	event.preventDefault();
	//do shit to drop here
}
function allowDrop(event)
{
	event.preventDefault();
}



function onDragEvent(event){
	var x = -1;
	for (var i = 0;i < mapui.menu.ulDiv.childNodes.length;i++)
		if (mapui.menu.ulDiv.childNodes[i] === event.target){
			x = i+5;
			event.dataTransfer.setData("Text",x);
			break;
		}
	for (var i = 0;i < mapui.oldmenu.frameDiv.childNodes.length;i++)
		if (mapui.oldmenu.frameDiv.childNodes[i] === event.target){
			x = i;
			event.dataTransfer.setData("Text",x);
			break;
		}
}

function addNotes(){
	if (selectedNode !== 0){
		var textArea = document.getElementById('textArea');
		if (textArea.value.length > 1 || textArea.value != " " || textArea.value != "  "){
			$.ajax({type:"POST",url:'/notes', dataType: "notes", data: 
							  {"note":{"connection_id":selectedNode.profile.id,
								"content":textArea.value}},
								success: function(resp) {
									
            }});
			
			/*
			var curdate = new Date();
			var month = curdate.getMonth() + 1;
			var day = curdate.getDate();
			var year = curdate.getFullYear();
			var hour = curdate.getHours();
			var minutes = curdate.getMinutes();
			var string = textArea.value +"  " + hour + ":" + minutes + " " + month + "/" + day + "/" + year;
			$("#pastnotemenu").html("<%= escape_javascript(render("shared/notes")) %>");
			*/
			//selectedNode.profile.notes.push(string);
			//addNoteList();
		}
		textArea.value = "";
		//server side code to POST on database//
	}
}

function addNoteList(){
	
	
		//jquerystuff ///////////////
		//Background color, mouseover and mouseout
	//Background color, mouseover and mouseout
	var colorOver = '#31b8da';
	var colorOut = '#1f1f1f';

	//Padding, mouseover
	var padLeft = '20px';
	var padRight = '20px';
	
	//Default Padding
	var defpadLeft = $('#pastnotemenu li p').css('paddingLeft');
	var defpadRight = $('#pastnotemenu li p').css('paddingRight');
		
	//Animate the LI on mouse over, mouse out
	$('#pastnotemenu li').mouseover(function (){
		
		//mouse over LI and look for A element for transition
		$(this).find('p')
		.animate( { paddingLeft: padLeft, paddingRight: padRight}, { queue:false, duration:100 } )
		.animate( { backgroundColor: colorOver }, { queue:false, duration:200 });

	}).mouseout(function () {
	
		//mouse oout LI and look for A element and discard the mouse over transition
		$(this).find('p')
		.animate( { paddingLeft: defpadLeft, paddingRight: defpadRight}, { queue:false, duration:100 } )
		.animate( { backgroundColor: colorOut }, { queue:false, duration:200 });
	});	
	
	//Scroll the menu on mouse move above the #sidebar layer
	$('#notelist').mousemove(function(e) {

		//Sidebar Offset, Top value
		var s_top = parseInt($('#notelist').offset().top);		
		
		//Sidebar Offset, Bottom value
		var s_bottom = parseInt($('#notelist').height());
	
		//Roughly calculate the height of the menu by multiply height of a single LI with the total of LIs
		var lengthofList = $('#pastnotemenu li').length;
		var menueleheight = $('#pastnotemenu li').height();
		var mheight = parseInt( menueleheight * lengthofList);
			
		//Calculate the top value
		//This equation is not the perfect, but it 's very close
		var mouseY = e.pageY;	
		var top_value = Math.round(( (s_top - mouseY) /(100)) * mheight *0.5);
		
		//Animate the #menu by chaging the top value
		$('#pastnotemenu').animate({top: top_value}, { queue:false, duration:500});
	});
	/////////////////////////
}

function onEventSubmit(){
	app.removeAll();
}

function onEventCancel(){
	app.removeAll();
	/*
	el('catcher').style.zIndex = 2;
	el('catcher').style.background = "#000";
	el('catcher').style.opacity = 0;
	*/
}

function coffeeEvent(){
	if (selectedNode !== 0){
		/*
		el('catcher').style.zIndex = 5;
		el('catcher').style.background = "#000";
		el('catcher').style.opacity = 0.7;
		*/
		app = new Appointment("Coffee", selectedNode, true);
		selectedNode.updateTime();
		mapui.drawAll(svg);
		plugging();
	}
}

function lunchEvent(){
	if (selectedNode !== 0){
		/*
		el('catcher').style.zIndex = 5;
		el('catcher').style.background = "#000";
		el('catcher').style.opacity = 0.7;
		*/
		app = new Appointment("Lunch", selectedNode, true);
		selectedNode.updateTime();
		mapui.drawAll(svg);
		plugging();
	}
}

function textEvent(){
	if (selectedNode !== 0){
		/*
		el('catcher').style.zIndex = 5;
		el('catcher').style.background = "#000";
		el('catcher').style.opacity = 0.7;
		*/
		app = new Appointment("Text Message", selectedNode, true);
		selectedNode.updateTime();
		mapui.drawAll(svg);
		plugging();
	}
}

function callEvent(){
	if (selectedNode !== 0){
		/*
		el('catcher').style.zIndex = 5;
		el('catcher').style.background = "#000";
		el('catcher').style.opacity = 0.7;
		*/
		app = new Appointment("Phone Call", selectedNode, true);
		selectedNode.updateTime();
		mapui.drawAll(svg);
		plugging();
	}
}

function emailEvent(){
	if (selectedNode !== 0){
		/*
		el('catcher').style.zIndex = 5;
		el('catcher').style.background = "#000";
		el('catcher').style.opacity = 0.7;
		*/
		app = new Appointment("Email", selectedNode, true);
		selectedNode.updateTime();
		mapui.drawAll(svg);
		plugging();
	}
}

function meetingEvent(){
	if (selectedNode !== 0){
		/*
		el('catcher').style.zIndex = 5;
		el('catcher').style.background = "#000";
		el('catcher').style.opacity = 0.7;
		*/
	app = new Appointment("Meeting", selectedNode, true);
	selectedNode.updateTime();
	mapui.drawAll(svg);
	plugging();
	}
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function plugging() {
	if (selectedNode != mapui.topFocus){
			var plugdiv = document.getElementById("plugview");
			if (selectedNode.profile.getNotify())
				plugdiv.style.background = "url(/assets/unplugged.png)";
			else 
				plugdiv.style.background = "url(/assets/plugged.png)";
			if (selectedNode.profile.lastConnected === 0)
				document.getElementById("plugdesc").textContent = "Never!"
			else{
				var today = new Date();
				var dayz = parseInt((today.UTC-selectedNode.profile.lastConnected.getTime())/86400000);
				document.getElementById("plugdesc").textContent = dayz + " days since you connected.";
			}
	}
}

