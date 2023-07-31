import dbConnect from '../../../utils/dbConnect'
import TourEntryTable from '../../../models/tourEntry.js'
import withProtect from '../../../middleware/auth.js'
import moment from 'moment'
const handler = async (req, res) => {
    try {
        await dbConnect();
        const Data = req.body;
        var savedData = []
        try {
        const promises =await  Data.map(async(item,index)=>{
    const { location,guide,costOfTour,tourpicurl,dateOfTour} = item;
 
    const newTourEntry = new TourEntryTable({
        location:location,
        guide:guide,
        costOfTour:costOfTour,
        tourpicurl:tourpicurl,
        dateOfTour:dateOfTour,
        guide_status:"Pending",
    })
   
         console.log('new entry :' +newTourEntry)
       
            savedData.push(newTourEntry)
                await newTourEntry.save();
          
         
    })
    
        await Promise.all(promises);
    res.status(201).json(savedData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}catch (error) {
    res.status(404).json({ message: error.message });
}
}
export default withProtect(handler);
