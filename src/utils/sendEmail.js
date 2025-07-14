import nodemailer from "nodemailer";
// create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export async function sendVerificationMail(user_email, task_name, deadline) {
  try {
    await transporter.sendMail({
      from: `"Taskyz" <${process.env.EMAIL}>`,
      to: user_email,
      subject: "New Task Assigned",
      html: `
      <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 32px;">
        
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
        <div style="text-align: center; color: #bbb; font-size: 12px;">
          &copy; ${new Date().getFullYear()} Taskyz. All rights reserved.
        </div>
      </div>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
}
