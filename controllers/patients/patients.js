const patient = require("../../models/patients");

module.exports.getPatients =async (req, res, next) => {
   try{
      // console.log(req.user)

      let data=await patient.find({}).lean().exec()
      data.map((d)=>{
         let date=new Date(d.dov).toDateString()
         d.dov=date
         console.log(d.dov);
      })
      data.dov=new Date(data.dov)
      // console.log(data.dov)
      res.render('patients',{data});
   }
   catch
   {
      console.log("error is handled")
      next();
   }
   
}

module.exports.getAddPatient = async(req, res, next) => {
   try{
      console.log(req.user.username)

      let data=await patient.find({}).exec()
      data.dov=new Date(data.dov).toDateString()
      console.log(data.dov)
      res.render('addpatient',{data});
   }
   catch
   {
      console.log("error is handled")
      next();
   }
   // res.render('addpatient');
}

module.exports.postAddPatient = async(req, res, next) => {
   console.log(req.body)
   console.log(req.user.username)
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
         remarks:req.body.remarks,
      };
      console.log(Patient)
      const data= await patient.create(Patient);
      console.log(data);
      console.log(req.user);
      res.redirect('/patient')
   }
   catch(err)
   {
      console.log("Error is handled")
      next();
   }


}