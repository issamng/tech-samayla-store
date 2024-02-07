import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";

export default async function handle(req, res) {
  await mongooseConnect();
  
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user; // Get user from session

  // Vérifier si l'utilisateur est connecté
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { product } = req.body;
    const wishedDoc = await WishedProduct.findOne({ userEmail: user.email, product });
    if (wishedDoc) {
      await WishedProduct.findByIdAndDelete(wishedDoc._id);
      res.json({ wishedDoc });
    } else {
      await WishedProduct.create({ userEmail: user.email, product });
      res.json('created');
    }
  }

  // Liste des produits de la wishlist sur la page du compte
  if (req.method === "GET") {
    const wishlistProducts = await WishedProduct.find({ userEmail: user.email }).populate('product');
    res.json(wishlistProducts);
  }
}
