const mongoose=require('mongoose');

const {Schema}=mongoose;


const userSchema=new Schema(
    {
        email:{
            type: String,
            required:true
        },
        username:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        patientId:[
            {
                type: Schema.Types.ObjectId,
                ref:'PatientModel'
            }
        ]
    }
)

module.exports=mongoose.model('UserModel',userSchema);