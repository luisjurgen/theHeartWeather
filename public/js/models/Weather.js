class Weather{
   constructor(){
      
      this.weather= [
         {
            valueMax:-20,
            nameTime:'Snowing',
            iconIndex:0
         },
         {
            valueMax:-14.5,
            nameTime:'Snowing',
            iconIndex:0
         },
         {
            valueMax:-9.05,
            nameTime:'Sleet',
            iconIndex:1
         },
         {
            valueMax:-3.6,
            nameTime:'Stormy',
            iconIndex:2
         },
         {
            valueMax:1.85,
            nameTime:'Hail',
            iconIndex:3
         },
         {
            valueMax:7.3,
            nameTime:'Rain',
            iconIndex:4
         },
         {
            valueMax:12.75,
            nameTime:'Drizzle',
            iconIndex:5
         },
         {
            valueMax:14.2,
            nameTime:'Windy',
            iconIndex:6
         },
         {
            valueMax:19.65,
            nameTime:'Overcast',
            iconIndex:7
         },
         {
            valueMax:25.9,
            nameTime:'Cloudy',
            iconIndex:8
         },
         {
            valueMax:32.55,
            nameTime:'Partly Cloudy',
            iconIndex:9
         },
         {
            valueMax:40,
            nameTime:'Sunny',
            iconIndex:10
         }

      ]

      }

      obteniendoObjetoDelClima(temperatura){
         let climaObjeto;

         this.weather.forEach((element,index)=>{
            let arrayIndex= index-1;
            if(index==0){
               arrayIndex=0
            }

            if(temperatura<=this.weather[index].valueMax && temperatura>=this.weather[arrayIndex].valueMax ){
               return climaObjeto = this.weather[index];
            }

         })

         return climaObjeto;  

      }


}

export {Weather}