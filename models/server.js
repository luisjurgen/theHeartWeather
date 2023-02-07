import express from 'express';
import cookieParser from 'cookie-parser';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.',import.meta.url));

import cors from 'cors';

import { router as login} from '../routes/auth.js';
import { router as callback} from '../routes/callback.js';
import { router  as refresh_token} from '../routes/refresh_token.js';

class Server{
   constructor(){
      this.app=express();
      this.port=process.env.PORT;
      this.paths={
         login:'/login',
         callback: '/callback',
         refresh_token:'/refresh_token',
         notFound:'*'
      }

      this.middlewares();
      this.routes();
   }

   middlewares(){
      this.app.use(cors());

      // this.app.use(express.json());

      this.app.use(express.static('public'));

      this.app.use(cookieParser());
   }

   routes(){
      this.app.use(this.paths.login,login);
      this.app.use(this.paths.callback,callback);
      this.app.use(this.paths.refresh_token, refresh_token);
      this.app.get(this.paths.notFound,(req,res)=>{
         res.redirect('/')

      })
   }

   listen(){
      this.app.listen(this.port,()=>{
         console.log(`Listening on port ${this.port}`)
      })
   }

}

export {Server}