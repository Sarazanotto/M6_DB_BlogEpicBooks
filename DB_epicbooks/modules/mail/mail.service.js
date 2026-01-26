const nodemailer= require('nodemailer')
require('dotenv').config()

class EmailService{
    constructor(){
        this.transporter=nodemailer.createTransport({
            host: process.env.EMAIL_HOST ,
            port:process.env.EMAIL_PORT ,
            auth:{
                user:process.env.EMAIL_USER ,
                pass:process.env.EMAIL_PASS ,
            }
        })
    }


async send(to,subject,message){
  
         const emailOptions={
        from:'',
        to,
        subject,
        html:message
    }
      try {
        const info=await this.transporter.sendMail(emailOptions)
        console.log('mail inviata')
        return info
    } catch (error) {
        console.error(error,'mail non inviata')
        throw error
    }
   

}

}
module.exports= EmailService