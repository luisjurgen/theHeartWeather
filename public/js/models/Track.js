export class Track {
   constructor(id,name,artist,duration,albumCover,external_url){
      this.id = id
      this.name = name;
      this.artists = artist;
      this.duration = duration;
      this.albumCover= albumCover;
      this.energy = null;
      this.temperature=null;
      this.iconIndex=null;
      this.external_url= external_url;
   
   }
}