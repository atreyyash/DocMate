const mongoose=require('mongoose');

const {Schema}=mongoose;


const doctorSchema=new Schema(
    {
        name:{
            type: String,
            required: true
        },
        patientId:[
            {
                type: Schema.Types.ObjectId,
                ref: 'PatientModel'
            }
        ]
    }
)

module.exports=mongoose.model('DoctorModel',doctorSchema);