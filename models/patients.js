const {mongoose, Schema } = require("mongoose");
const { type } = require("os");

let patientSchema=new Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type:Number,
        required:true,
    },
    gender: {
        type: String,
        required:true,
    },
    phoneNo: {
        type: Number,
    },
    address: {
        type: String,
    },
    dov: {
        type: [{type:Date}],
    },
    complaints :{
        type:String,
    },
    diagnosis: {
        type: String,
        required:true,
    },
    treatmentPeriod: {
        type: Number,
        required:true,
    },
    payment: {
        type: Number,
        required:true,
    },
    remarks:{
        type:String,
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    }
})

module.exports=mongoose.model('PatientModel',patientSchema)