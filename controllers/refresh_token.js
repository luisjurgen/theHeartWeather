import axios from "axios";

const refresh_token =async (req, res)=>{
   let refresh_token = req.query.refresh_token;

   const instance = axios.create({
      baseURL:'https://accounts.spotify.com/api/token',
      params: {
         'grant_type':"refresh_code",
         refresh_token: refresh_token
      },
      headers:{
         'Authorization':'Basic ' + (new Buffer(process.env.CLIENT_ID+':'+ process.env.CLIENT_SECRET).toString('base64')),
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'json'
   });

   try {
      const resp = await instance.post();
      console.log(resp)
      console.log('ref',resp.status)
   } catch (error) {
      
   }
}

export {refresh_token}