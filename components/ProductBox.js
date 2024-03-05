import styled from "styled-components";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import FlyingButton from "./FlyingButton";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.07);
  }
  .productBoxImage {
    max-width: 100%;
    max-height: 110px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

const WishListButton = styled.button`
  border: 0;
  width: 40px;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  cursor: pointer;
  ${(props) =>
    props.wished
      ? `
color: red ;
`
      : `
color: black;
`}
  svg {
    width: 16px;
  }

  /* &:hover{
    background-color:#aaa;
  } */
`;

export default function ProductBox({
  _id,
  title,
  prix,
  images,
  wished = false,
  // When remove product from wishlist (from the acount page)
  removeFromWishlist = () => {},
}) {
  const url = "/product/" + _id;
  //Add to wish list
  const [isWished, setIsWished] = useState(wished);

  function addToWishList(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    // When remove product from wishlist (from the acount page)
    if (nextValue === false && removeFromWishlist) {
      removeFromWishlist(_id);
    }
    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then(() => {});
    setIsWished(nextValue);
  }
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <WishListButton wished={isWished} onClick={addToWishList}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishListButton>
          <Image
            className={"productBoxImage"}
            src={images?.[0]}
            alt=""
            width={100}
            height={100}
          />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>{prix}€</Price>
          <FlyingButton _id={_id} src={images?.[0]} hover={1}>
            <CartIcon />
          </FlyingButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
