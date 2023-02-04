import { Track } from "./Track.js";
import { Weather } from "./Weather.js";

const weather = new Weather();

class Tracks{
   constructor(){
      this.baseURL = 'https://api.spotify.com';
      this.tracks=[];
      this.promedio=0;
      this.limit= 7
   }
   async me(access_token){
      const resp = await fetch (`${this.baseURL}/v1/me`,{
         method:'GET',
         headers:{
            'Authorization': 'Bearer ' + access_token
         }
      })
   
      console.log(await resp.json())
   }

   async meTracks(access_token){
   
      const params = new URLSearchParams({
         limit:this.limit,
         market: "ES",
         offset: 0
      })
      const url = `${this.baseURL}/v1/me/tracks?${params}`
      const resp = await fetch(url,{
         method:'GET',
         headers:{
            'Authorization': 'Bearer ' + access_token
         }
      })
      const {items} = await resp.json();
      let idsString='';

      items.map((currentValue,index)=>{
         let id = currentValue.track.id;
         let name = currentValue.track.name;
         let artists = currentValue.track.artists[0].name;
         let duration = currentValue.track.duration_ms;
         let albumCover= currentValue.track.album.images[0].url;

         const comma = index==this.tracks.length+1? '':','
         idsString += id+comma;

         this.crearTracks(id,name,artists,duration,albumCover)
      }) 
     
      return idsString
   }

   async getTracksAudioFeautures(access_token){
      const tracksIDs = await this.meTracks(access_token)
      const params = new URLSearchParams({
         ids: tracksIDs
      });
      const url = `${this.baseURL}/v1/audio-features?${params}`
      const resp = await fetch(url,{
         method:'GET',
         headers:{
            'Authorization': 'Bearer ' + access_token
         }
      })
      const {audio_features} = await resp.json();
   
      const energyData = audio_features.map((currentValue,index)=>{
         let energy = currentValue.energy;
         return energy
      })
      
       this.energy(energyData)

   }

   crearTracks(id,name,artist,duration,albumCover){
      const track = new Track(id,name,artist,duration,albumCover);
      this.tracks.push(track);
   }

   energy(energyData = []){

      this.tracks.forEach((element,index)=>{
         this.tracks[index].energy = energyData[index];
         this.tracks[index].temperature = this.map_range(energyData[index],0,1,weather.weather[0].valueMax,weather.weather[11].valueMax,1);
         
         let {iconIndex}=  weather.obteniendoObjetoDelClima(this.tracks[index].temperature);
         this.tracks[index].iconIndex= iconIndex;
         // this.tracks[index].iconIndex= this.map_range(energyData[index],0,1,0,10,0)
         this.tracks[index].duration = this.milisegundosAMinutosYSegundos(this.tracks[index].duration);

         this.promedio += ((this.tracks[index].temperature)*1);
      })
      this.promedio= (this.promedio/this.limit).toFixed(1)*1;
   }

   map_range(value, low1=0, high1=1, low2, high2,decimal=0) {
      const number= low2 + (high2 - low2) * (value - low1) / (high1 - low1);
      return number.toFixed(decimal);
  }

  domDraw(){
   this.tracks.forEach((element,index)=>{
      this.domSelector(index);
   })
  
  }

  domSelector(index){
   document.querySelector(`#song-name-${index}`).innerHTML=this.tracks[index].name;
   document.querySelector(`#artist-name-${index}`).innerHTML = this.tracks[index].artists;
   document.querySelector(`#icon-weather-${index}`).setAttribute('src',`assets/${this.tracks[index].iconIndex}.png`);
  
   // document.querySelector(`#icon-weather-${index}`).setAttribute('xlink:href',`assets/icons.svg#${this.tracks[index].iconIndex}`);
   document.querySelector(`#cover-song-${index}`).setAttribute('src',this.tracks[index].albumCover);
   document.querySelector(`#temperature-song-${index}`).innerHTML = this.tracks[index].temperature+'°';
   document.querySelector(`#duration-song-${index}`).innerHTML = this.tracks[index].duration;

  }

  milisegundosAMinutosYSegundos = (milisegundos) => {
	const minutos = parseInt(milisegundos / 1000 / 60);
	milisegundos -= minutos * 60 * 1000;
	const segundos = (milisegundos / 1000);
	return `${minutos}:${this.agregarCeroSiEsNecesario(segundos.toFixed(0))}`;
};

 agregarCeroSiEsNecesario = valor => {
	if (valor < 10) {
		return "0" + valor;
	} else {
		return "" + valor;
	}
}

  

}

export{Tracks}