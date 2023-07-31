import Cookies from 'cookies';
const handler = async (req, res) => {
    try {
        const cookies = new Cookies(req, res);
        cookies.set('refreshtoken')
        return res.status(200).json({message: "Logged out."})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}
export default handler;