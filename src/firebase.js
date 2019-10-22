import firebase from 'firebase/app';
import  'firebase/database';

export function setFirebase () {

  // my web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAojBtby3tCN0930nQEAeW6_JcFU2enz_Q",
    authDomain: "eko-video-project.firebaseapp.com",
    databaseURL: "https://eko-video-project.firebaseio.com",
    projectId: "eko-video-project",
    storageBucket: "eko-video-project.appspot.com",
    messagingSenderId: "134954950686",
    appId: "1:134954950686:web:a69c8ee494f55b1f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

}

export function countViews() {
  //to avoid from writing to html data twice
  let initData = true;
  let viewrsNumber = document.getElementById("views");
  //get ref to db
  const dbRefObject = firebase.database().ref().child('object');
  const dbRefViews = dbRefObject.child('views');
  dbRefViews.on('value', (snap) => {
    if(!initData){
      viewrsNumber.innerText = snap.val();
    }
    initData = false;  
  });
}

export function countLikes() {
  let likesNumber = document.getElementById("thumbsUp");
  //get ref to db
  const dbRefObject = firebase.database().ref().child('object');
  const dbRefLikes = dbRefObject.child('likes'); 
  //listening to any update event in the db
  dbRefLikes.on('value', (snap) => {
      likesNumber.innerText = "Likes: " + snap.val();
  });
}

export function countDislikes() {
  let dislikesNumber = document.getElementById("thumbsDown");
  //get ref to db
  const dbRefObject = firebase.database().ref().child('object');
  const dbRefDislikes = dbRefObject.child('dislikes'); 
  //listening to any update event in the db
  dbRefDislikes.on('value', (snap) => {
      dislikesNumber.innerText = "Dislikes: " + snap.val();
  });
}

export function addView(){
  //get ref to db
  const dbRefObject = firebase.database().ref().child('object');
  const dbRefViews = dbRefObject.child('views');
  //Atomically modifies the data 
  dbRefViews.transaction(function(currentLikes) {
    // If node/clicks has never been set, currentLikes will be `null`.
    return (currentLikes || 0) + 1;
  });
}

export function addLike(){
  let likeButtun = document.getElementById("thumbsUp");
  //get ref to db
  const dbRefObject = firebase.database().ref().child('object');
  const dbRefLikes = dbRefObject.child('likes');
  //Atomically modifies the data
  dbRefLikes.transaction(function(currentLikes) {
    //disable the button to prevent more then one like
    likeButtun.disabled = true;
    // If node/clicks has never been set, currentLikes will be `null`.
    return (currentLikes || 0) + 1;
  });

}

export function addDislike(){
  let dislikeButtun = document.getElementById("thumbsDown");
  //get ref to db
  const dbRefObject = firebase.database().ref().child('object');
  const dbRefLikes = dbRefObject.child('dislikes');

  dbRefLikes.transaction(function(currentDislikes) {
    //disable the button to prevent more then one dislike
    dislikeButtun.disabled = true;
    // If node/clicks has never been set, currentLikes will be `null`.
    return (currentDislikes || 0) + 1;
  });

}




