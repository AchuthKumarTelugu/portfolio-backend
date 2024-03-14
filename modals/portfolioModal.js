const mongoose = require('mongoose')
const { Schema, model } = mongoose
const introSchema = new Schema({
    welcomeText: {
        required: true,
        type: String
    },
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    caption: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },

})

const aboutSchema = new Schema({
    lottieUrl: {
        required: true,
        type: String,
    },
    description1: {
        type: String,
        required: true,
    },
    description2: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    }
})

const experiencesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
})


const projectsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        
    },
    
    description: {
        type: String,
        required: true
    },
    techStack:{
        type:Array,
        required:true
    },
    link:{
        type:String,
        required:true
    }
})

const contactSchema=new Schema ({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
})
const logindetails=new Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})
module.exports={
    Intros:model('intros',introSchema),
    About:model('abouts',aboutSchema),
    Experience:model('experiences',experiencesSchema),
    Projects:model('projects',projectsSchema),
    Contact:model('contacts',contactSchema),
    LoginDetails:model('loginDetails',logindetails)
}