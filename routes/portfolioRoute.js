const Router = require('express').Router()
const bcrypt=require('bcrypt')
const jwt=require( 'jsonwebtoken' )
const { Intros, About, Experience, Projects, Contact, LoginDetails } = require('../modals/portfolioModal')

// get all portfolio data
Router.get('/get-portfolio-data', async (req, res) => {
  try {
    const intros = await Intros.find()
    const abouts = await About.find()
    const experiences = await Experience.find()
    const projects = await Projects.find()
    const contact = await Contact.find()
    res.status(200).send({
      intros: intros[0],
      projects: projects,
      contact: contact[0],
      abouts: abouts[0],
      experiences: experiences,
    })
  } catch (error) {
    console.log(error)
  }
})
Router.post("/update-intros", async (req, res) => {
  try {
    const intros = await Intros.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    res.status(200).send({ data: intros, success: true, message: "Intro updated successfully" })

  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
  console.log('req.body', req.body);
})
Router.post("/update-abouts", async (req, res) => {
  try {
    const abouts = await About.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    res.status(200).send({ data: abouts, success: true, message: "Intro updated successfully" })

  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
  console.log('abouts:req.body', req.body);
})
//update contacts
Router.post("/update-contacts", async (req, res) => {
  try {
    const contacts = await Contact.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    res.status(200).send({ data: contacts, success: true, message: "contacts updated successfully" })

  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})
//add new exprience
Router.post('/add-experiences', async (req, res) => {
  try {
    const experience = new Experience(req.body)
    await experience.save()
    res.status(200).send({
      success: true,
      data: experience,
      message: "Experience added succesfully!"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: error.message })
  }
})
//update the experience
Router.post('/update-experiences', async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    res.send({ success: true, message: "experiences updated successfully", data: experience })
  } catch (error) {
    console.log(error)
    res.send({ success: false, message: error.message })
  }
})
//delete the experience
Router.post('/delete-experiences', async (req, res) => {
  try {
    const result = await Experience.findByIdAndDelete(req.body._id)
    res.send({ success: true, data: result, message: 'Deleted Successfully' })
  } catch (error) {
    console.log(error)
  }
})
//add new project
Router.post('/add-projects', async (req, res) => {
  try {
    const projects = new Projects(req.body)
    await projects.save()
    res.status(200).send({
      success: true,
      data: projects,
      message: "project added succesfully!"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: error.message })
  }
})
//update the project
Router.post('/update-projects', async (req, res) => {
  try {
    const project = await Projects.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    res.send({ success: true, message: "project updated successfully", data: project })
  } catch (error) {
    console.log(error)
    res.send({ success: false, message: error.message })
  }
})
//delete the project
Router.post('/delete-projects', async (req, res) => {
  try {
    const project = await Projects.findByIdAndDelete(req.body._id)
    res.send({ success: true, data: project, message: 'project Deleted Successfully' })
  } catch (error) {
    console.log(error)
  }
})
//get login details
Router.post('/login', async (req, res) => {
  try {
    const {username,password}=req.body
    console.log(username,password)
    let login = await LoginDetails.findOne({username:username})
    if(!login) {
      return res.send({message:"user not found in database",success:false})
    }
      console.log(login)
      if (await bcrypt.compare(password,login.password)) {
        const payload={
          username,
          type:'admin'
        }
        const token=jwt.sign(payload,process.env.jwt_token,{expiresIn:'5h'})
        return res.send({ success: true, message:"login successfull",token })
      }
      else{
        return res.send({ success: false, message: "enter valid credentials" })
      }
   
    
  }
  catch (error) {
    console.log(error.message)
    res.send({ success: false, message: error.message })
  }
  
})
//create login 
Router.post('/create-login',async(req,res)=>{
  try {
    const {username,password:plainTextPassword}=req.body
    const salt=await bcrypt.genSalt(10)
    const encryptedPassword=bcrypt.hashSync(plainTextPassword,salt)
    const newLogin={
      username,password:encryptedPassword
    }
    await LoginDetails.create(newLogin)
    res.send({success:true,message:"login created succesfully"})
  } catch (error) {
    res.send({success:false,message:error.message})
  }
 
})
module.exports = Router;