//?location=https://www.reddit.com/r/Art/+https://www.reddit.com/r/ArtFundamentals/+https://www.reddit.com/r/sketchpad/

var i = 0; 			// Start Point
var iterimg=0;
var nbimgdisplayed=0;

var num_slider=1;
var num_slider_load=1;
var move_next=0;

var images = [];
var imagessource = [];
const imagealreadydisplayed=new Map();
const imagereturningerror=new Map();
var imgpath = '';	// Images Array
var nberrors=0;

var vheight=0;

var itersubreddit=0;
var subreddit=[];
var lastsubreddit='';
var sType='hot';
var sFreq='year';
var nbpicsrequest=100;

var time = 7000;	// Time Between Switch
var stop_loop=1;
var inputlistsubreddit="";

// Image List
images[0] = "img1";
images[1] = "img1";
images[2] = "img1";
images[3] = "img1";
images[4] = "img1";

// ======================== PARAM ========================
function typehotfunction(){
	sType='hot';
	document.getElementById("hotnewtoprising").innerHTML=sType;
}
function typenewfunction(){
	sType='new';
	document.getElementById("hotnewtoprising").innerHTML=sType;
}
function typetopfunction(){
	sType='top';
	document.getElementById("hotnewtoprising").innerHTML=sType;
}
function typerisingfunction(){
	sType='rising';
	document.getElementById("hotnewtoprising").innerHTML=sType;
}

function freqallfunction(){
	sFreq='all';
	document.getElementById("allyearmonth").innerHTML=sFreq;
}
function freqyearfunction(){
	sFreq='year';
	document.getElementById("allyearmonth").innerHTML=sFreq;
}
function freqmonthfunction(){
	sFreq='month';
	document.getElementById("allyearmonth").innerHTML=sFreq;
}


function time3s(){
	time=3000;
	document.getElementById("stime").innerHTML=time/1000 + "s";
}
function time5s(){
	time=5000;
	document.getElementById("stime").innerHTML=time/1000 + "s";
}
function time7s(){
	time=7000;
	document.getElementById("stime").innerHTML=time/1000 + "s";
}
function time10s(){
	time=10000;
	document.getElementById("stime").innerHTML=time/1000 + "s";
}

// ======================== PREVIOUS NEXT ========================
function previous(){
	if (num_slider>1) {
		num_slider -=1;
		const widthSlider=document.querySelector('.slider').offsetWidth;
		document.querySelector('.slider_content').scrollLeft -= widthSlider;
		document.getElementById("previousnext").innerHTML=num_slider + ' (' + num_slider_load + ')';
	}
	else {
		num_slider =5;
		const widthSlider=document.querySelector('.slider').offsetWidth;
		document.querySelector('.slider_content').scrollLeft += 4*widthSlider;
		document.getElementById("previousnext").innerHTML=num_slider + ' (' + num_slider_load + ')';
	}
}
function next(){
	if (num_slider<5) {
		num_slider +=1;
		const widthSlider=document.querySelector('.slider').offsetWidth;
		document.querySelector('.slider_content').scrollLeft += widthSlider;
		document.getElementById("previousnext").innerHTML=num_slider + ' (' + num_slider_load + ')';
	}
	else {
		num_slider =1;
		const widthSlider=document.querySelector('.slider').offsetWidth;
		document.querySelector('.slider_content').scrollLeft -= 4*widthSlider;
		document.getElementById("previousnext").innerHTML=num_slider + ' (' + num_slider_load + ')';
	}
	console.log('DISPLAYING IMG'  + num_slider)
}
function nextsliderload(){
	if (num_slider_load<5) {
		num_slider_load +=1;
	}
	else {
		num_slider_load =1;
	}
}

// ======================== FORMAT NEXT ========================
function hide_menu() {
	var elems = document.querySelectorAll('.hideshowmenu');
    var index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.color='transparent';
		elems[index].style.borderColor='transparent';
    }
}
function show_menu() {
	var elems = document.querySelectorAll('.hideshowmenu');
    var index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.color='gray';
		elems[index].style.borderColor='gray';
    }
}

// ======================== HEIGHT ========================
function vheigthdecreasefunction() {
	if (vheight==0) {
		vheight=250;
	}
	vheight -= 50;
	if (vheight<100) {
		vheight=100;
	}
	document.querySelector('.slider').style.height=vheight + 'px';
}
function vheigthincreasefunction() {
	if (vheight==0) {
		vheight=250;
	}
	vheight += 50;
	document.querySelector('.slider').style.height=vheight + 'px';
}

// ======================== PREVIOUS NEXT ========================
function stopfunction(){
	stop_loop=1;
	document.getElementById("startstop").innerHTML="STOP";
	show_menu();
}

function startfunction(){
	hide_menu();
	document.getElementById("startstop").innerHTML="Loading...";
	stop_loop=0;
	inputlistsubreddit=document.getElementById("inputtext").value;
	subreddit=inputlistsubreddit.split('+');
	//console.log('runALL');
	//console.log(subreddit);
	document.getElementById("startstop").innerHTML="Loading 1";
	setTimeout("changeImg()", 2000);
	document.getElementById("startstop").innerHTML="Loading 2";
	setTimeout("changeImg()", 4000);
	document.getElementById("startstop").innerHTML="Loading 3";
	setTimeout("changeImg()", 6000);
	document.getElementById("startstop").innerHTML="Loading 4";
	setTimeout("changeImg()", 8000);
	//Show next Image
	setTimeout("mainfunctionloop()", 10000);
}

function mainfunctionloop(){
	document.getElementById("startstop").innerHTML="Running...";

	//Load next images
	changeImg();

	// Run function every x seconds
	if (stop_loop==0){
		setTimeout("mainfunctionloop()", time);
	}
	
}

function UpdateIMGs(subredditval){
	//if (lastsubreddit!=subredditval){after=''}
	console.log('=== UPDATE IMGs ===')
	console.log(subredditval)
	fetch('https://www.reddit.com/r/' + subredditval + '/' + sType + '.json?limit=' + nbpicsrequest + '&t=' + sFreq)
	.then(response => response.json())
	.then(body => {
		after=body.data.after
		for (let index = 0; index < body.data.children.length; index++) {
			if(body.data.children[index].data.post_hint=="image") {
				imgpath=body.data.children[index].data.url_overridden_by_dest
				if (imgpath.substring(imgpath.length-3,imgpath.length)!="gif"){
					iterimg++
					//body.data.children[index].data.url_overridden_by_dest
					images[iterimg]=imgpath
					imagessource[iterimg]=subredditval
				}
			} 
		}
		}
		)
}

function getrandimg(){
	if (nbimgdisplayed > iterimg - 5 - nberrors) {
		console.log('=== RESET  ===');
		imagealreadydisplayed.clear();
		imagealreadydisplayed.set(0,0);
		nbimgdisplayed=0;
	}
	i=Math.floor(Math.random()*iterimg-1);
	if (imagealreadydisplayed.has(i)) {
		i=getrandimg();
	}
	if (imagereturningerror.has(images[i])) {
		i=getrandimg();
	}
	if (i<1) {
		i=getrandimg();
	}
	return i;
}

// Update and change Image
function changeImg(){
	//console.log('itersub:' + itersubreddit);
	//console.log('TOTALIMG:' + iterimg);
	if (itersubreddit < subreddit.length) {
		UpdateIMGs(subreddit[itersubreddit])
		itersubreddit++;
	}
	if (iterimg>0){
		nextsliderload();
		if (num_slider_load>5) {
			move_next=1;
		}
		document.getElementById("previousnext").innerHTML='Loading' + ' (' + num_slider_load + ')';
		i=getrandimg();
		imagealreadydisplayed.set(i,i);
		document.getElementById("info").innerHTML=  '(' + nbimgdisplayed + ') ' + i  + "  / " + iterimg   + ' => ' +  images[i] + ' (' + imagessource[i]  + ')';
		document.getElementById("IMG" + num_slider_load).src = images[i];
		console.log('UPDATING SRC'  + num_slider_load)
		nbimgdisplayed++;
	}

	//Show next Image
	if (move_next=1) {
		next(); 
	}
}

function imgError(image){
	console.log('MANAGING ERROR SRC' + image.id);
	image.onerror = "";
	i=getrandimg();
	document.getElementById(image.id).src = images[i] ;
	imagereturningerror.set(image.src,image.src);
	nberrors +=1;
	return true;
}