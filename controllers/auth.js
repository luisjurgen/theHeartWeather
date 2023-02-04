import queryString from "query-string";

const generateRandomString = (length) =>{
   var text = '';
   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 
   for (var i = 0; i < length; i++) {
     text += possible.charAt(Math.floor(Math.random() * possible.length));
   }
   return text;
 };

const login = (req,res)=>{
   let scope = ' user-read-email user-library-read';
   let state = generateRandomString(16);

   res.cookie(process.env.STATE_KEY,state);


   const params = queryString.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri:process.env.REDIRECT_URI,
      state:state
   })

   console.log(params);
   res.redirect('https://accounts.spotify.com/authorize?'+params)
}

export {login}