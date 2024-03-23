/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import SearchIcon from "./icons/SearchIcon";
import CloseIcon from "./icons/CloseIcon";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";
import CartIcon from "./icons/CartIcon";

const StyledHeader = styled.header`
  /* background-color: #333333; */
  background-color: #666;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;

  z-index: 3;
  font-family: "Rock Salt", cursive;
  margin-left: 12px;
  margin-right: 0px;
  @media screen and (min-width: 821px) {
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  @media screen and (min-width: 821px) {
    justify-content: space-evenly;
    padding: 10px 50px;
  }
`;

const StyledNav = styled.nav`
  //responsive
  ${(props) =>
    props.$mobilenavactive
      ? `
  display: block;
  top: ${props.$top}px;
  padding-top: ${props.$isFirst ? "70px" : "0"};
  `
      : `
  display: none;
  `}

  gap: 15px;
  position: fixed;

  bottom: 0;
  left: 0;
  right: 0;
  /* padding: 70px 10px 20px; */
  padding-right: 10px;
  padding-bottom: 100px;
  padding-left: 10px;
  align-items: center;

  /* background-color: #333333; */
  background-color: #666;

  @media screen and (min-width: 821px) {
    display: flex;
    position: static;
    padding: 0;
  }
  @media screen and (max-width: 821px) {
    & > Button {
      width: 100%;
      justify-content: center;
    }
  }
`;

const NavLink = styled(Link)`
  position: relative;
  display: block;
  color: #ccc;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 3px;
  font-weight:500;
  &:hover {
    color: #dfe5eb;
  }
  &[href="/signup"],
  &[href="/logout"] {
    background-color: #dddddd;
    color: #333;
    padding: 6px 18px;
    border-radius: 7px;
    text-align: center;
    &:hover {
      opacity: 0.9;
    }
  }
  &[href="/signin"],
  &[href="/account"] {
    text-align: center;
    color: #eee;
    /* border: 1px solid #555555; */
    border: 1px solid #999;
    padding: 6px 18px;
    border-radius: 7px;
    margin-bottom: 10px;

    &:hover {
      /* opacity:0.9; */
      border: 1px solid #888888;
    }
  }
  svg {
    height: 20px;
  }

  @media screen and (min-width: 821px) {
    padding: 0;
    &[href="/signin"],
    &[href="/account"] {
      margin-bottom: 0;
      /* margin-left: 300px; */
    }
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
  @media screen and (min-width: 821px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  /* position: relative; */
  display: flex;
  align-items: center;
  margin-top: 5px;
 
  gap: 5px;
  a {
    display: inline-block;
    min-width: 20px;
    color: white;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const CartCount = styled.span`
  font-weight: bold;
  background-color: white;
  border-radius: 50%;
  padding: 0px 3px;
  position: absolute;
  top: -0.8rem; /* Adjust this value to position it properly */
  right: -0.6rem; /* Adjust this value to position it properly */
  font-size: 0.8rem;
  color: black;
`;

export default function Header() {
  const session = useSession();
  const status = session.status;
  const { cartProducts, clearCart } = useContext(CartContext);
  //Responsive:
  const [mobilenavactive, setMobileNavActive] = useState(false);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });

    // Clear Cart after user logout

    // setTimeout(() => {
    //   if (window.location.pathname === '/') {
    //     clearCart();
    //   }
    // }, 1000);
  }

  return (
    <StyledHeader data-testid="header">
      {/* <Center> */}
      <Wrapper>
        <Logo href={"/"}>
          {/* <Image src="/logofinal.png" alt="Logo" width={127} height={50} /> */}
          <div>TECH</div>
          <div>SAMAYLA</div>
        </Logo>
        <StyledNav $mobilenavactive={mobilenavactive} $top={0} $isFirst={true}>
          <NavLink href="/">Accueil</NavLink>
          <NavLink href="/products">Tous les produits</NavLink>
          <NavLink href="/categories">Rayons</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </StyledNav>
        <StyledNav $mobilenavactive={mobilenavactive} $top={250}>
          {status === "authenticated" && (
            <>
              <NavLink href="/account">Mon compte</NavLink>
              <Button hover="true" onClick={logout}>
                Se déconnecter
              </Button>
            </>
          )}
          {status !== "authenticated" && status !== "loading" && (
            <>
              <NavLink href="/signin">Se connecter</NavLink>
              <NavLink href="/signup">S'inscrire</NavLink>
            </>
          )}
        </StyledNav>
     
        {/* Navigation Icons  */}
        <SideIcons>
          
          <Link href={"/search"}>
            <SearchIcon />
          </Link>
          {!mobilenavactive && (
    <Link href={"/cart"} style={{ position: 'relative' }}>
      <CartIcon />
      <CartCount>{cartProducts.length}</CartCount>
    </Link>
  )}

          {/* responsive */}
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            {mobilenavactive ? <CloseIcon /> : <BarsIcon />}
          </NavButton>
        </SideIcons>
       
      </Wrapper>
      {/* </Center> */}
    </StyledHeader>
  );
}
