
import jwt from "jsonwebtoken";
import{validateEmail,createActivationToken,createAccessToken,createRefreshToken} from '../../../commonFunctions.js'
import dbConnect from '../../../utils/dbConnect.js'
import Cookies from 'cookies'



const handler = async (req, res) => {
    try {
        await dbConnect()
        //const cookies = new Cookies(req, res)
        //const rf_token = cookies.get('refreshtoken')
        const {refreshToken} = req.body
        console.log('refresh token in auth middleware: ' + refreshToken)
        console.log('user details:',req.body)
        if(!refreshToken) return res.status(400).json({message: "Please login now!"})

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({message: "Please login now!"})

            const accesstoken = createAccessToken({email:user.email,id: user.id,role:user.role})
            const cookies = new Cookies(req, res);
            cookies.set('accesstoken', accesstoken, {
                httpOnly: true,
                path: '/',
            })

            console.log("accesstoken : " + accesstoken)
            console.log("user details : "+JSON.stringify(user))
            return res.json({token:accesstoken,refreshtoken:refreshToken,email:user.email,id:user.id,role: user.role})
        })
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}
export default handler;
