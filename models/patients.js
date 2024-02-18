const {mongoose, Schema } = require("mongoose");
const { type } = require("os");

let patientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dov: {
        type: Date,
        default: Date.now(),
    },
    phoneNo: {
        type: Number,
    },
    address: {
        type: String,
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    prakarti: {
        type: String
    },
    visits: [
        {
            complaints: {
                type: String
            },
            investigation: {
                type: String
            },
            diagnosis: {
                type: String
            },
            treatment: {
                type: String
            },
            therapy: {
                type: String
            },
            duration: {
                type: String
            },
            payment: {
                type: Number
            },
            remarks: {
                type: String
            },
            dov: {
                type: Date
            }
        }
    ],
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    }
})

module.exports=mongoose.model('PatientModel',patientSchema)