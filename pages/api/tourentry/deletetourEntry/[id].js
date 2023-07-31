import dbConnect from '../../../../utils/dbConnect'
import TourEntryTable from '../../../../models/tourEntry.js'
import withProtect from '../../../../middleware/auth.js'
import mongoose from 'mongoose';
const handler = async (req, res) => {
    try {
        await dbConnect();
        const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No tourEntry with id: ${id}`);

    await TourEntryTable.findByIdAndRemove(id);

    res.json({ message: "TourEntry deleted successfully." });
}catch (error) {
    res.status(404).json({ message: error.message });
}
}
export default withProtect(handler);
