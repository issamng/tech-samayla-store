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
import { Helmet } from 'react-helmet';


export default function HomePage({ featuredProduct, newProducts, wishedNewProducts }) {
  return (
    <div data-testid="home-page">
         <Helmet>
        {/* Google Analytics main code */}
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WKFD27FN');
          `}
        </script>
      </Helmet>
      <Header data-testid="header" />
      <Featured product={featuredProduct} data-testid="featured-product" />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} data-testid="new-products" />
      <Footer data-testid="footer" />
      <Helmet>
        {/* Google Analytics (noscript) */}
        <noscript>
          {`
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WKFD27FN"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `}
        </noscript>
      </Helmet>
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
