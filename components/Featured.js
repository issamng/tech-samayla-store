import Center from "@/components/Center";
import styled from "styled-components";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import FlyingButton from "./FlyingButton";
import { RevealWrapper } from "next-reveal";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.9rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  img.main {
    max-width: 100%;
    max-height: 320px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.9fr 1fr;
    div: nth-child(1) {
      order: 0;
    }
    img.main {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
  margin-bottom: 10px;
`;

export default function Featured({ product }) {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <RevealWrapper origin={"left"}>
                <Title>{product.title}</Title>
                <Desc>{product.description}</Desc>
                <ButtonsWrapper>
                  <ButtonLink
                    href={"/product/" + product._id}
                    outline={1}
                    white={1}
                  >
                    En savoir plus
                  </ButtonLink>

                  <FlyingButton
                    main={1}
                    hover={1}
                    _id={product._id}
                    src={product.images?.[0]}
                  >
                    <CartIcon /> Ajouter au panier
                  </FlyingButton>
                </ButtonsWrapper>
              </RevealWrapper>
            </div>
          </Column>
          <Column>
            <RevealWrapper>
              <img className={"main"} src={product.images?.[0]} alt="" />
            </RevealWrapper>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
