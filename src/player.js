
import * as Firebase  from './firebase'
let myVideo, playOrPauseButton, seekslider, currentTime, durationTime, likeButtun, dislikeButtun;


//-------------video player functions --------------//

export function intializePlayer(){
	// Set object references
  	myVideo = document.getElementById("myvid");
	playOrPauseButton = document.getElementById("playPause");
	durationTime = document.getElementById("durationTime");
	currentTime = document.getElementById("currentTime");
	seekslider = document.getElementById("seekslider");
	likeButtun = document.getElementById("thumbsUp");
	dislikeButtun = document.getElementById("thumbsDown");
	// Add event listeners
	playOrPauseButton.addEventListener("click", playPauseToggle);
	seekslider.addEventListener("change",videoSeek);
	myVideo.addEventListener("timeupdate",updateVideoTime);
	likeButtun.addEventListener("click",Firebase.addLike);
	dislikeButtun.addEventListener("click",Firebase.addDislike);
}
//play/pause functionality - I removed the autoplay from the video
//so for the video to start the user have to press the play button
export function playPauseToggle() { 
    if (myVideo.paused) {
        myVideo.play();
        playOrPauseButton.innerHTML = "Pause";
    }
    else  {
        myVideo.pause(); 
    	playOrPauseButton.innerHTML = "Play";
    }
}

//activate when the user change the slider value
export function videoSeek(){
    let seekto = 0;
	seekto = myVideo.duration * (seekslider.value / 100);
	myVideo.currentTime = seekto;
}

//update the current and duration time values 
export function updateVideoTime(){
	//update slider
	let seeksliderValue = myVideo.currentTime * (100 / myVideo.duration);
	seekslider.value = seeksliderValue;
	//calc current
	let current_minutes = Math.floor(myVideo.currentTime / 60);
	let current_second = Math.floor(myVideo.currentTime - current_minutes * 60);
	//calc duration
	let duration_minutes = Math.floor(myVideo.duration / 60);
	let duration_seconds = Math.floor(myVideo.duration - duration_minutes * 60);
	//build the correct text value - seconds
	if(current_second < 10) { 
		current_second = "0" + current_second;
	 }
	if(duration_seconds < 10) { 
		duration_seconds = "0" + duration_seconds;
	 }
	 //build the correct text value - minutes
 	if(current_minutes < 10) { 
		 current_minutes = "0" + current_minutes;
	}
 	if(duration_minutes < 10) {
		  duration_minutes = "0" + duration_minutes;
	}
 	//update the text values
 	currentTime.innerText = current_minutes + ":" + current_second;
 	durationTime.innerText = duration_minutes + ":" + duration_seconds;
 }

//getter for video current time
export function getVideoCurrentTime(){
   return myVideo.currentTime;
 }

//all the functions below using firebase.
//if we will want to replace the firebase service in the future it will be transparent for index.js
export function setFirebase(){
	Firebase.setFirebase();
}

export function addView(){
	Firebase.addView();
}

export function countViews(){
	Firebase.countViews();
}

export function countLikes(){
	Firebase.countLikes();
}

export function countDislikes(){
	Firebase.countDislikes();
}

