import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export async function sendTaskMail(username, user_email, task_name, deadline) {
  try {
    await transporter.sendMail({
      from: `Taskyz <${process.env.EMAIL}>`,
      to: user_email,
      subject: "New Task Assigned",
      html: `
      <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 32px;">
        <h2 style="color: #333;">New Task Assigned</h2>
        <p style="color: #555;">Hello ${username},</p>
        <p style="color: #555;">You have been assigned a new task:</p>
        <h3 style="color: #333;">${task_name}</h3>
        <p style="color: #555;">Deadline: ${deadline}</p>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
        <div style="text-align: center; color: #bbb; font-size: 12px;">
         ${new Date().getFullYear()} Taskyz. All rights reserved.
        </div>
      </div>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
}
