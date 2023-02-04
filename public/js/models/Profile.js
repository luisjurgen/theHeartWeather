import { Weather } from "./Weather.js";
const weather = new Weather();

class Profile{
   constructor(){
      this.baseURL = 'https://api.spotify.com';
      this.display_name;
      this.image;
      this.profile_temperature;
      this.profile_iconIndex;
      this.nameTime;
   }

   async me(access_token){
      const resp = await fetch (`${this.baseURL}/v1/me`,{
         method:'GET',
         headers:{
            'Authorization': 'Bearer ' + access_token
         }
      })
  
      const {display_name,images} = await resp.json();
      this.display_name = `${display_name} — ${display_name} — ${display_name} — ${display_name}`;
      this.image=images[0].url;

   }

   promedioAsignacion (promedio){
      this.profile_temperature = promedio;
      let {nameTime,iconIndex} = weather.obteniendoObjetoDelClima(this.profile_temperature);
      this.profile_iconIndex = iconIndex;
      this.nameTime = nameTime;

   }

   domDraw(){
      document.querySelector('#username').innerHTML=this.display_name;
      document.querySelector('#profilepicture').setAttribute('src',this.image);
      document.querySelector('#profileweather').innerHTML= this.profile_temperature +'°';
      document.querySelector('#icon-weather-user').setAttribute('src',`assets/${this.profile_iconIndex}.png`);
      // document.querySelector('#icon-weather-user').setAttribute('xlink:href',`assets/icons.svg#${this.profile_iconIndex}`);
      document.querySelector('#name-time').innerHTML=this.nameTime;
   }

   map_range(value, low1=0, high1=1, low2, high2,decimal=0) {
      const number= low2 + (high2 - low2) * (value - low1) / (high1 - low1);
      return number.toFixed(decimal);
  }

}
export{Profile}