const patients = require("../../models/patients");
const patient = require("../../models/patients");
const user = require("../../models/users");

module.exports.getPatients =async (req, res, next) => {
   try{
      // console.log("USER ID : ", req.user._id);
      let messages = [];
      let data = await patient.find({ doctorId: req.user._id }).lean().exec()
      data.map((d)=>{
         let date=new Date(d.dov).toDateString()
         d.dov=date
         // console.log(d.dov);
      })
      // data.dov=new Date(data.dov)
      // console.log(data.dov)
      res.render('patients', {
         data,
         messages
      });
   }
   catch (err)
   {
      console.log("error is handled", err);
      next();
   }
   
}

module.exports.getAddPatient = async(req, res, next) => {
   // try{
   //    console.log(req.user.username)

   //    let data=await patient.find({}).exec()
   //    data.dov=new Date(data.dov).toDateString()
   //    console.log(data.dov)
   //    res.render('addpatient',{data});
   // }
   // catch
   // {
   //    console.log("error is handled")
   //    next();
   // }
   // console.log("USER ID get Add Patient vali :: ", req.user);
   res.render('addpatient');
}

module.exports.postAddPatient = async (req, res, next) => {
   // console.log(req.body)
   // console.log(req.user);
   // console.log(req.user._id)
   try{
      const Patient = {
         name:req.body.name,
         age: req.body.age,
         gender: req.body.gender,
         phoneNo: req.body.phno,
         address: req.body.address,
         dov: req.body.dov,
         height: req.body.height,
         weight: req.body.weight,
         prakarti: req.body.prakarti,
         doctorId: req.user._id
      };
      // console.log(Patient)
      // console.log("USER posţadd patient vala : ", req.user);
      const data = await patient.create(Patient);
      try {
         await user.updateOne({ _id: req.user._id },
            {
               $push: {
                  patientId: data._id
               }
            })
      }
      catch (err) {
         res.send(err);
      }
      // console.log(await patient.find({}).populate('doctorId'));
      req.flash("messages", "Patient Added Successfully!");
      res.redirect('/patient')
   }
   catch(err)
   {
      console.log("Error is handled", err);
      next();
   }
}

module.exports.getPatientDetails = async (req, res, next) => {
   const { patientId } = req.query;
   let message = [];
   try {
      let patient = await patients.findOne({ _id: patientId });
      let date = new Date(patient.dov).toDateString();
      patient.dov = date;
      // console.log(date);
      res.render('patientDetails', {
         patient,
         date,
         message: req.flash("messages", "Visit added Successfully!")
      });
   }
   catch (err) {
      console.log(err);
   }
}

module.exports.getAddPatientVisit = (req, res, next) => {
   const { patientId } = req.query;
   const message = req.flash().message || [];
   res.render("addVisit", {
      patientId,
      message
   });
}

module.exports.postAddPatientVisit = async (req, res, next) => {
   try {
      const { patientId } = req.body;
      const visit = {
         complaints: req.body.complaints,
         investigation: req.body.investigation,
         treatment: req.body.treatment,
         diagnosis: req.body.diagnosis,
         duration: req.body.duration,
         therapy: req.body.therapy,
         payment: req.body.payment,
         remarks: req.body.remarks,
         dov: new Date()
      }

      await patient.updateOne({ _id: patientId }, {
         $push: {
            visits: visit
         }
      });

      req.flash('message', "Success!");
      setTimeout(() => {
         res.redirect(`/patient/details?patientId=${patientId}`);
      }, 2000)
   }
   catch (err) {
      req.flash("error", err);
      next();
   }
}

module.exports.searchPatient = async (req, res, next) => {
   const { text } = req.query;
   // console.log(text);
   try {
      const regex = new RegExp(text, 'i');
      console.log("regex: ", regex);
      let query;
      // console.log("isNumber: ", isNaN(text));
      if (isNaN(text)) {
         // If text is not a number, search by name only
         query = {
            name: regex,
            doctorId: req.user._id
         };
      } else {
         // If text is a number, search by both name and phone number
         query = {
            $or: [
               { name: { $regex: text, $options: 'i' } },
               { phoneNo: Number(text) }
            ],
            doctorId: req.user._id
         };
      }

      const p = await patient.find(query);
      console.log(p);
      res.send(p);
   }
   catch (err) {
      console.log(err);
   }

}

module.exports.getPatientProfile = async (req, res, next) => {
   const { id } = req.query;
   try {
      const p = await patient.findOne({ _id: id });

      // console.log("Patient is: ", p);
      res.render("editPatient", {
         p
      });
   }
   catch (err) {
      req.flash("error", err);
      console.log(err)
   }
}

module.exports.updatePatient = async (req, res, next) => {
   const { id, name, age, gender, phoneNo, address, dov, height, weight, prakarti } = req.body;

   try {
      let updatedUser = await patient.findOneAndUpdate({_id: id}, {
         name,
         age,
         gender,
         phoneNo,
         address,
         dov,
         height,
         weight,
         prakarti
      })
      res.redirect(`/patient/details?patientId=${id}`);
   }
   catch (err) {
      req.flash("error", `Error Occurred, ${err}`);
      next(err);
   }
}