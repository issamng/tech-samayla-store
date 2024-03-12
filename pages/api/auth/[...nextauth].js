// import clientPromise from "@/lib/mongodb";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { LocalUser } from "@/models/LocalUser";
import bcrypt from "bcrypt";
import { mongooseConnect } from "@/lib/mongoose";

export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),

  secret: process.env.SECRET,
  providers: [
    // OAuth authentication providers...

    GoogleProvider({
      clientId: process.env.GOOGLE_FRONT_ID,
      clientSecret: process.env.GOOGLE_FRONT_SECRET,
    }),

    // Credential provider

    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { type: "text", placeholder: "Email" },
        password: { type: "password", placeholder: "Mot de passe" },
      },
      async authorize(credentials, req) {
        await mongooseConnect();

        const email = credentials?.email;
        const password = credentials?.password;

        try {
          const user = await LocalUser.findOne({ email });
          if (user && bcrypt.compareSync(password, user.password)) {
            return user;
          } else {
            throw new Error("Mot de passe incorrect");
          }
        } catch (error) {
          console.error("Erreur d'authentification:", error.message);
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
