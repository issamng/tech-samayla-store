import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  await mongooseConnect();

  try {
    const newProducts = await Product.find({}, null, {
      sort: { _id: -1 },
      limit: 10,
    });
    res.status(200).json(newProducts);
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}