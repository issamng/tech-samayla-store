import styled from "styled-components";
import Button, { ButtonStyle } from "./Button";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "./CartContext";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle};

    // main flying button of the home page
    ${(props) =>
      props.main &&
      `
    background-color: white;
    color: black;
  `}
    
  }

  @keyframes fly {
    100% {
      top: 0;
      left: 190.5vh;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }

  @media screen and (max-width: 821px) {
    @keyframes fly {
      100% {
        top: 0;
        left: 80%;
        opacity: 0;
        display: none;
        max-width: 50px;
        max-height: 50px;
      }
    }
  }

  img {
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    display: none;
    animation: fly 1s;
    z-index: 5;
    border-radius: 10px;
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const imgRef = useRef();
  function sendImageToCartAnimation(ev) {
    imgRef.current.style.display = "inline-block";
    imgRef.current.style.left = ev.clientX - 50 + "px";
    imgRef.current.style.top = ev.clientY - 50 + "px";
    setTimeout(() => {
      // This condition to avoid "Cannot read properties of null" if user go to cart page before animation end
      if (imgRef.current) {
        imgRef.current.style.display = "none";
      }
    }, 1000);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const reveal =
        imgRef.current && imgRef.current.closest("div[data-sr-id]");
      if (reveal?.style.opacity === "1") {
        //visible
        reveal.style.transform = "none";
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <FlyingButtonWrapper
        main={props.main}
        
        onClick={() => addProduct(props._id)}
        primary={1}
      >
        <img src={props.src} alt="" ref={imgRef} />
        <Button onClick={(ev) => sendImageToCartAnimation(ev)} {...props} />
      </FlyingButtonWrapper>
    </>
  );
}
