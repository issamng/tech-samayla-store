import { transporter, mailOptions } from "@/config/nodemailer";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};

export default async function handle(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: data.Subject,
        text: `
          Nom: ${data.lastName}
          Prénom: ${data.firstName}
          Email: ${data.email}
          Objet: ${data.subject}
          Message: ${data.message}
        `,
        html: `
          <h1>Tech Samayla</h1><h2>Vous avez un nouveau message</h2>
          <p><b>Nom:</b> ${data.lastName}</p>
          <p><b>Prénom:</b> ${data.firstName}</p>
          <p><b>Email:</b> ${data.Email}</p>
          <p><b>Objet:</b> ${data.Subject}</p>
          <p><b>Message:</b> ${data.Message}</p>
        `,
      });

      // Send a success response
      return res.status(200).json({ message: "Votre message a été envoyé avec succès." });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: "Methode d'envoie non autorisé!" });
  }
}
