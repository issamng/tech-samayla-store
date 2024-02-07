import styled from "styled-components";
import Center from "./Center";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import SearchIcon from "./icons/SearchIcon";
import CloseIcon from "./icons/CloseIcon";
import Image from "next/image";

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled(Link)`
  // @import url('https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap');

  color: #fff;
  text-decoration: none;
  
  z-index: 3;
  font-family: "Rock Salt", cursive;
  // font-size:1.2rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const StyledNav = styled.nav`
  //responsive
  ${(props) =>
    props.mobilenavactive
      ? `
  display: block;
  `
      : `
  display: none;
  `}

  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #c0c0c0;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 0;
  &:hover {
    /* text-decoration: underline; */
    color: #dfe5eb;
    /* opacity: 0.5; */
  }
  svg {
    height: 20px;
  }
 
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

//Responsive

const NavButton = styled.button`
  background-color: transparent;
  width: 35px;
  height: 35px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a {
    display: inline-block;
    min-width: 20px;
    color: white;
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  //Responsive:
  const [mobilenavactive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}><Image src="/logofinal.png" alt="Logo" width={127} height={50} /></Logo>
          <StyledNav mobilenavactive={mobilenavactive}>
            <NavLink href={"/"}>Accueil</NavLink>
            <NavLink href={"/products"}>Tous les produits</NavLink>
            <NavLink href={"/categories"}>Rayons</NavLink>
            <NavLink href={"/account"}>Mon compte</NavLink>
            <NavLink href={"/cart"}>Mon Panier ({cartProducts.length})</NavLink>
          </StyledNav>
          {/* Navigation Icons  */}
          <SideIcons>
            <Link href={"/search"}>
              <SearchIcon />{" "}
            </Link>
            {/* responsive */}
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              {/* <BarsIcon /> */}
              {mobilenavactive ? <CloseIcon /> : <BarsIcon />}
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
