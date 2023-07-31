import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import{validateEmail,createActivationToken,createAccessToken,createRefreshToken} from '../../../commonFunctions.js'
import dbConnect from '../../../utils/dbConnect.js'
import UserModal from '../../../models/user.js'
import Cookies from 'cookies';

const handler = async (req, res) => {
    try {
        await dbConnect();
        const {email, password} = req.body
        const user = await UserModal.findOne({email})
        console.log("user : " + user)
        if(!user) return res.status(400).json({msg: "This email does not exist."})
        let isMatch = false;
        if(password === user.password){
            isMatch =  true;
        }
        else
        isMatch = false;
        
        if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

        const refresh_token = createRefreshToken({id: user._id,email: user.email,role: user.role})
        const access_token = createAccessToken({email:user.email,id: user._id,role:user.role})
        const cookies = new Cookies(req, res);
        cookies.set('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/',
            maxAge: 7*24*60*60*1000 // 7 days
        })
        console.log("accesstoken and refreshtoken :" ,access_token , "+" ,refresh_token)
        return res.json({token:access_token,refreshtoken:refresh_token,email:user.email,id:user._id,role: user.role})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}
export default handler;