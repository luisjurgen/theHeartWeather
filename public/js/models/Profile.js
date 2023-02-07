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
      this.date = this.dateTHW();
   }

   async me(access_token){
      try{

         const resp = await fetch (`${this.baseURL}/v1/me`,{
            method:'GET',
            headers:{
               'Authorization': 'Bearer ' + access_token
            }
         })
     
         const {display_name,images} = await resp.json();
         
        
   
         this.display_name = `${display_name}`;
        
         if(images.length>=1){
            this.image=images[0].url;
         }
      }catch(err){
         console.log(err)
      }

   }

   promedioAsignacion (promedio){
      this.profile_temperature = promedio;
      let {nameTime,iconIndex} = weather.obteniendoObjetoDelClima(this.profile_temperature);
      this.profile_iconIndex = iconIndex;
      this.nameTime = nameTime;

   }

   domDraw(){
      document.querySelector('#username').innerHTML=this.display_name;
      if(this.image!==undefined){
         const img = document.querySelector('#profilepicture');
         img.setAttribute('src',this.image);
         this.imageProperties(img);
      }

      document.querySelector('#date-thw').innerHTML = this.date;
      document.querySelector('#profileweather').innerHTML= this.profile_temperature +'°';
      document.querySelector('#icon-weather-user').setAttribute('src',`assets/${this.profile_iconIndex}.png`);
      
      document.querySelector('#name-time').innerHTML=this.nameTime;
   }

   map_range(value, low1=0, high1=1, low2, high2,decimal=0) {
      const number= low2 + (high2 - low2) * (value - low1) / (high1 - low1);
      return number.toFixed(decimal);
  }

  dateTHW(){
   const date = new Date();
   const months = ['JAN','FEB','MAR', 'APR', 'MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
   const [month, day] = [months[date.getMonth()], date.getDate()]
   const year = date.getFullYear();
   return `${month} ${day}, ${year}`

  }

  imageProperties(imgElement){

   imgElement.onload= function(){
      
      if(imgElement.width > imgElement.height){
         imgElement.style.width = 'auto';
         imgElement.style.height = '100%';
         
      }else if(imgElement.width < imgElement.height){
         imgElement.style.width = '100%';
         imgElement.style.height = 'auto';
         
      }else{
         imgElement.style.width = '100%';
         imgElement.style.height = '100%';
         
      }
   }
   


   
  }

}
export{Profile}