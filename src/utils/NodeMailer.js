const nodemailer = require("nodemailer");
require('dotenv').config()
const transporter = nodemailer.createTransport({
    service:'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.USER,
    pass: process.env.KEY,
  },
});




async function main(userName,email,otp) {
  const info = await transporter.sendMail({
    from: '"Thrift Terrane" <TechTerrain@gmail.com>', 
    to: email, 
    subject: "Welcome to Thrift Terrane", 
    text: "Hello world?", 
    html: `
    <   <section style="display: flex;justify-content: center;align-items: center;height: 100%;width: 50vw;">
    <div style="width: auto; height: auto;background-color: rgba(242, 245, 245, 0.836);padding: 20px;border-radius: 15px;">
        <h2 style="font-family: 'Courier New', Courier, monospace;margin-left: 30px; padding-top: 20px;">Hey ${userName}, welcome to Thrift Terrane</h2>
        <div style="width: 100%;height: 50%;display:flex;flex-direction:column;align-items:center">
        <h2 style="text-align:center;width:25%;border:2px solid black;letter-spacing: 5px"> ${otp}</h2>
            <h3 style="padding: 20px;";font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif>We are thrilled to have you on board with the most awaited online store</h3>
            <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px;">Don't hesitate to get in touch if you have any questions. We'll always get back to you :)</p>
            
        </div>
        <p style="text-align: center;position: relative; width: 100%;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">With love: Thrift Terrane</p>
        </div>
</section>
    `
  });
  
}

module.exports= main