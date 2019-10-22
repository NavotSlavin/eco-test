import * as Player from './player.js';
import * as styles from './styles/style.css';

//fire after the window object has been load
window.onload = Player.intializePlayer();

Player.setFirebase();

//count the number of views in the video
Player.countViews();

//assumption: maximum one like per loading
Player.countLikes();

//assumption: maximum one dislike per loading(user can dislike and like video)
Player.countDislikes();

//assumption: add view on page loading
Player.addView(); 


