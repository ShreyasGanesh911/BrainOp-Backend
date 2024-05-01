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




async function main(userName,email) {
  const info = await transporter.sendMail({
    from: '"TechTerrain" <TechTerrain@gmail.com>', 
    to: email, 
    subject: "Welcome to Tech Terrain", 
    text: "Hello world?", 
    html: `
    <section style="display: flex;justify-content: center;align-items: center;height: 100%;width: 50vw;">
    <div style="width: auto; height: auto;background-color: rgba(242, 245, 245, 0.836);padding: 20px;border-radius: 15px;">
        <h2 style="font-family: 'Courier New', Courier, monospace;margin-left: 30px; padding-top: 20px;">Hey ${userName}, welcome to Tech Terrain</h2>
        <div style="width: 100%;height: 50%;">
            <h3 style="padding: 20px;";font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif>We are thrilled to have you on board with the most awaited online store</h3>
            <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px;">Don't hesitate to get in touch if you have any questions. We'll always get back to you :)</p>
            
        </div>
        <p style="text-align: center;position: relative; width: 100%;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">With love: Tech Terrain</p>
        </div>
</section>
    `
  });
  console.log("Message sent: %s", info.messageId);
}

module.exports= main