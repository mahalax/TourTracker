import dbConnect from '../../../utils/dbConnect'
import UserModal from '../../../models/user.js'
import withProtect from '../../../middleware/auth.js'

const handler = async (req, res) => {
    try {
        await dbConnect();
    try {
        const UserList = await UserModal.find({_id: req.userId}).select("-password");
                
        res.status(200).json(UserList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}catch (error) {
    res.status(404).json({ message: error.message });
}
}
export default withProtect(handler);