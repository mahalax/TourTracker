import dbConnect from '../../../utils/dbConnect'
import TourEntryTable from '../../../models/tourEntry.js'
import withProtect from '../../../middleware/auth.js'

const handler = async (req, res) => {
    try {
        await dbConnect();
    try {
        const TourEntryList = await TourEntryTable.find();
                
        res.status(200).json(TourEntryList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}catch (error) {
    res.status(404).json({ message: error.message });
}
}
export default withProtect(handler);