import dbConnect from '../../../../utils/dbConnect'
import TourEntryTable from '../../../../models/tourEntry.js'
import withProtect from '../../../../middleware/auth.js'
import mongoose from 'mongoose';
const handler = async (req, res) => {
    try {
        await dbConnect();
        const { id } = req.query;
        const {status} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No tourEntry with id: ${id}`);

    const updatedTourEntry = { 
        guide_status:status };

    console.log(updatedTourEntry)

      
    try {
      
            await TourEntryTable.findByIdAndUpdate(id, updatedTourEntry, { new: true });
            const TourEntryList = await TourEntryTable.find();
                
            res.status(200).json(TourEntryList);
       

    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}catch (error) {
    res.status(404).json({ message: error.message });
}
}
export default withProtect(handler);

