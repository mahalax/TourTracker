import jwt from "jsonwebtoken";
import Cookies from 'cookies'

const auth = (handler) => {
  return async (req, res, next) => {
  try {
    //const cookies = new Cookies(req, res)
    //const token = cookies.get('accesstoken')
    const token = req.headers.authorization
    console.log("token in auth middleware : ", token)
      if(!token) return res.status(400).json({message: "Invalid Authentication."})
      
      const isCustomAuth = token.length < 500;
      let decodedData;
      if (token && isCustomAuth) {  
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,  user) => {
          if(err) return res.status(400).json({message: "token exist but Invalid Authentication ."})

          req.userId =  user?.id;
          return handler(req, res);
      })
    }
      else{
       decodedData = jwt.decode(token);
  
        req.userId = decodedData?.sub;
        return handler(req, res);
      }  
     
  } catch (err) {
      return res.status(500).json({message: err.message})
  }
}
}




export default auth;