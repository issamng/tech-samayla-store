import { transporter, mailOptions } from "@/config/nodemailer";

export default async function handle(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: data.subject,
        text: "Test Nodemailer text",
        html: "<h1>Nodemailer test title<p>Nodemailer test pp</p>",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }
}
