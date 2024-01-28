import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";


export default function HomePage({ featuredProduct, newProducts, wishedNewProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const featuredProductSetting = await Setting.findOne({name:'featuredProductId'})
  const featuredProductId = featuredProductSetting.value;
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  //Wishlist
  const session = await getServerSession(context.req, context.res, authOptions);
  const wishedNewProducts = session?.user ? await WishedProduct.find({ 
    userEmail: session?.user.email,
    product: newProducts.map(p => p._id.toString())
   }) : [] ;
  //  console.log({wishedNewProducts});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map(i => i.product.toString())
    },
  };
}
