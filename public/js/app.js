import { Tracks } from "./models/Tracks.js";
import { Profile } from "./models/Profile.js";
import { logout } from "./helpers/logout.js";
import { downloadImg } from "./helpers/download-image.js";

const getHashParams =()=>{
   let hashParams = {};
   let e;
   let r= /([^&;=]+)=?([^&;]*)/g;
   let q= window.location.hash.substring(1);

   e=r.exec(q);
   hashParams[e[1]]= decodeURIComponent(e[2]);
   return hashParams;
}

if(window.location.hash){
   
   let {access_token, refresh_token, error}= getHashParams();
   let spotifyTracks = new Tracks();
   await spotifyTracks.getTracksAudioFeautures(access_token);  

   let profile = new Profile();
   await profile.me(access_token);

   profile.promedioAsignacion(spotifyTracks.promedio);

  profile.domDraw();
  spotifyTracks.domDraw();

  //signout
  const sigoutbutton = document.querySelector('#signoutbutton')
  sigoutbutton.addEventListener('click',logout);
  
  //downloadImage
  const dowloadImage = document.querySelector('#downloadbutton');
  dowloadImage.addEventListener("click", downloadImg);

  
}

   
