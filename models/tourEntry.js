import mongoose from 'mongoose';
const tourEntrySchema = mongoose.Schema({
    location:{type:String},
    guide:{type:String},
    costOfTour : {type:Number},
    tourpicurl: {type: String, default: ''},
    dateOfTour: {type:Date},
    guide_status:{type:String},
    noOfUsers:{type:Number}
})

var TourEntryTable = mongoose.models.tourEntry || mongoose.model('tourEntry', tourEntrySchema);

export default TourEntryTable;