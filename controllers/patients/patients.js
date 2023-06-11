const patient = require("../../models/patients");
const user = require("../../models/users");

module.exports.getPatients =async (req, res, next) => {
   try{
      console.log("USER ID : ", req.user._id);

      let data=await patient.find({}).lean().exec()
      data.map((d)=>{
         let date=new Date(d.dov).toDateString()
         d.dov=date
         // console.log(d.dov);
      })
      data.dov=new Date(data.dov)
      // console.log(data.dov)
      res.render('patients', {
         data
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
   console.log("USER ID get Add Patient vali :: ", req.user);
   res.render('addpatient');
}

module.exports.postAddPatient = async (req, res, next) => {
   // console.log(req.body)
   console.log(req.user);
   console.log(req.user._id)
   try{
      const Patient = {
         name:req.body.name,
         age: req.body.age,
         gender: req.body.gender,
         phoneNo: req.body.phno,
         address: req.body.address,
         dov: req.body.dov,
         complaints :req.body.complaint,
         diagnosis:req.body.diagnosis,
         treatmentPeriod: req.body.treatmentPeriod,
         payment: req.body.payment,
         remarks: req.body.remarks,
         doctorId: req.user._id
      };
      console.log(Patient)
      console.log("USER posţadd patient vala : ", req.user);
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
      res.redirect('/patient')
   }
   catch(err)
   {
      console.log("Error is handled", err);
      next();
   }


}