import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Setting } from "@/models/Setting";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("Une méthode POST est obligatoire");
    return;
  }
  const {
    firstName,
    lastName,
    email,
    city,
    postalCode,
    adress,
    country,
    cartProducts,
  } = req.body;
  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "eur",
          product_data: { name: productInfo.title },
          //We multiply by 100 because Stripe display interpret the prices in cents 
          unit_amount:  productInfo.prix * 100,
        },
      });
    }
  }

  const session = await getServerSession(req,res,authOptions);

  const orderDoc = await Order.create({
    line_items,
    firstName,
    lastName,
    email,
    city,
    postalCode,
    adress,
    country,
    paid: false,
    userEmail:session?.user?.email,
  });

  // Shipping fee in cents 
const shippingFeeSetting = await Setting.findOne({name:'shippingFee'});
 // Final Shipping fee 
 const shippingFeeFinal = parseInt(shippingFeeSetting.value || 0) * 100;


  const StripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    // Shipping fee
    shipping_options: [{
      shipping_rate_data: {
        display_name: 'Frais de livraison',
        type: 'fixed_amount',
        fixed_amount: {amount: shippingFeeFinal, currency: 'EUR'}
      }
    }]
  });

  res.json({
    url: StripeSession.url,
  });
}
