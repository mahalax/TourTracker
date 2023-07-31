import dbConnect from '../../../../utils/dbConnect'
import TourEntryTable from '../../../../models/tourEntry.js'
import withProtect from '../../../../middleware/auth.js'
import mongoose from 'mongoose';
import moment from 'moment'
const handler = async (req, res) => {
    try {
        await dbConnect();
        const { id } = req.query;
    const { location,guide,costOfTour,tourpicurl,dateOfTour,guide_status} = req.body;
    
    
    console.log('inside Tour entry edit')
    console.log(id)
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No data with id: ${id}`);

    const updatedTourEntry = { 
        location:location,
        guide:guide,
        costOfTour:costOfTour,
        tourpicurl:tourpicurl,
        dateOfTour:dateOfTour,
        guide_status:guide_status,
        _id: id };

    console.log(updatedTourEntry)

    const TourEntryTableList = await TourEntryTable.find({
        location: updatedTourEntry.location,
        guide:guide,
        costOfTour:updatedTourEntry.costOfTour,
        tourpicurl:updatedTourEntry.tourpicurl,
        dateOfTour:updatedTourEntry.dateOfTour,
        guide_status:updatedTourEntry.guide_status,
        _id: {$ne:mongoose.Types.ObjectId(id)} });

    
    try {
        if (TourEntryTableList.length === 0) {
            await TourEntryTable.findByIdAndUpdate(id, updatedTourEntry, { new: true });
            res.status(201).json(updatedTourEntry);
        }
        else {
            res.status(409).json({ message: "Duplicate entry" });
        }

    }
    catch (error) {
        console.log('duplicate')
        res.status(409).json({ message: error.message });
    }
}catch (error) {
    res.status(404).json({ message: error.message });
}
}
export default withProtect(handler);

