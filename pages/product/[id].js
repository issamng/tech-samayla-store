import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import FlyingButton from "@/components/FlyingButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import ProductReviews from "@/components/ProductReviews";
import ReviewsStars from "@/components/ReviewsStars";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.3rem;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>{product.prix}€</Price>
              </div>

              <div>
                {/* <Button primary onClick={() => addProduct(product._id)}>
                  <CartIcon /> Ajouter au panier
                </Button> */}
                <FlyingButton _id={product._id}  src={product.images?.[0]} hover={1}>
                <CartIcon /> Ajouter au panier
                </FlyingButton>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
        <ProductReviews product={product} />
        
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
