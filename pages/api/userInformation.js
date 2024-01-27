import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { UserInformation } from "@/models/UserInformation";

export default async function handle(req, res) {
  await mongooseConnect();

//   try {
//     const { user } = await getServerSession(req, res, authOptions);

//     if (!user) {
//       res.status(401).json({ error: "User not authenticated" });
//       return;
//     }
//     if (req.method === "PUT") {
//       const { user } = await getServerSession(req, res, authOptions);
//       const userInformation = await UserInformation.findOne({
//         userEmail: user.email,
//       });
//       if (userInformation) {
//         res.json(
//           await UserInformation.findByIdAndUpdate(userInformation._id, req.body)
//         );
//         res.json();
//       } else {
//         res.json(
//           await UserInformation.create({ userEmail: user.email, ...req.body })
//         );
//       }
//     }
//   } catch (error) {
//     console.error('Server error:', error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }

  //My previous code
    if (req.method === "PUT") {

      const { user } = await getServerSession(req, res, authOptions);
      const userInformation = await UserInformation.findOne({
        userEmail: user.email,
      });
      if (userInformation) {
        res.json(
          await UserInformation.findByIdAndUpdate(userInformation._id, req.body)
        );
        res.json();
      } else {
        res.json(
          await UserInformation.create({ userEmail: user.email, ...req.body })
        );
      }
    }

  if (req.method === "GET") {
    const { user } = await getServerSession(req, res, authOptions);
    const userInformation = await UserInformation.findOne({
      userEmail: user.email,
    });
    res.json(userInformation);
  }
}
