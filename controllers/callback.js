// import request from 'request';
import queryString from "query-string";
import axios from 'axios';

const callback = async (req,res)=>{
   const code = req.query.code;
   const state = req.query.state;
   let storedState = req.cookies ? req.cookies[process.env.STATE_KEY]: null;

   if(state===null ||  state !==storedState){
      res.redirect('/#'+
         queryString.stringify({
            error:'state_mismattch'
         })
      )
   }else{
      res.clearCookie(process.env.stateKey);

      const instance = axios.create({
         baseURL:'https://accounts.spotify.com/api/token',
         params: {
            'grant_type':"authorization_code",
            'code':code,
            'redirect_uri': process.env.REDIRECT_URI,
         },
         headers:{
            'Authorization':'Basic ' + (new Buffer(process.env.CLIENT_ID+':'+ process.env.CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         responseType: 'json'
      });

      let access_token, refresh_token;
      
      try {
         
         const resp = await instance.post();
         console.log(resp.status);
         access_token = resp.data.access_token;
         refresh_token=resp.data.refresh_token;
   
      } catch (error) {
         console.log(error)
      }



      try {
         const instance = axios.create({
            baseURL:'https://api.spotify.com/v1/me',
            headers:{
               'Authorization':'Bearer ' + access_token,
            },
            responseType: 'json'
         });

         const resp = await instance.get();
         console.log(resp)

         return res.redirect('/heartweather-page/#'+
            queryString.stringify({
               access_token:access_token,
               refresh_token: refresh_token
            }));
            
      } catch (error) {
         res.redirect('/#'+
               queryString.stringify({
                  error:'invalid_token'
               }));
         
      }

   
   }
}

export{callback}