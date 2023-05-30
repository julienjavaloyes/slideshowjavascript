//?location=https://www.reddit.com/r/Art/+https://www.reddit.com/r/ArtFundamentals/+https://www.reddit.com/r/sketchpad/

var i = 0; 			// Start Point
var iterimg=0;
var nbimgdisplayed=0;

var images = [];
var imagessource = [];
const imagealreadydisplayed=new Map();
var imgpath = '';	// Images Array

var itersubreddit=0;
var subreddit=[];
var lastsubreddit='';
var sType='hot';
var sFreq='year';
var nbpicsrequest=100;

var time = 7000;	// Time Between Switch
var stoptime=1;
var inputlistsubreddit="";

// Image List
images[0] = "https://www.redditinc.com/assets/images/site/brand_header_mobile@3x.png";
images[1] = "https://www.redditinc.com/assets/images/site/brand_header_mobile@3x.png";

function stopfunction(){
	stoptime=0;
	document.getElementById("startstop").innerHTML="STOP";
}


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

function mainfunction(){
	document.getElementById("startstop").innerHTML="Running...";
	stoptime=1;
	inputlistsubreddit=document.getElementById("inputtext").value;
	subreddit=inputlistsubreddit.split('+');
	//console.log('runALL');
	//console.log(subreddit);
	changeImg();
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
	if (nbimgdisplayed > iterimg-5) {
		console.log('=== RESET  ===');
		imagealreadydisplayed.clear();
		imagealreadydisplayed.set(0,0);
		nbimgdisplayed=0;
	}
	i=Math.floor(Math.random()*iterimg-1);
	if (imagealreadydisplayed.has(i)) {
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
		i=getrandimg();
		imagealreadydisplayed.set(i,i);
		document.getElementById("info").innerHTML=  '(' + nbimgdisplayed + ') ' + i  + "  / " + iterimg   + ' => ' +  images[i] + ' (' + imagessource[i]  + ')';
		document.slide.src = images[i];
		nbimgdisplayed++;
	}

	// Run function every x seconds
	if (stoptime===1){
		setTimeout("changeImg()", time);
	}
	
}