import styled from "styled-components";
import Center from "./Center";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import SearchIcon from "./icons/SearchIcon";
import CloseIcon from "./icons/CloseIcon";
import Image from "next/image";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";

const StyledHeader = styled.header`
  background-color: #333333;
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
  margin-right:0px;
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
  top: ${props.top}px;
  padding-top: ${props.isFirst ? '70px' : '0'};
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

  background-color: #333333;

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
  display: block;
  color: #c0c0c0;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 3px;
  &:hover {
    color: #dfe5eb;
  }
  &[href="/signup"],
  &[href="/logout"] {
    background-color: #dddddd;
    color: #000000;
    padding: 6px 18px;
    border-radius: 7px;
    text-align: center;
    &:hover {
      opacity: 0.9;
    }
  }
  &[href="/signin"] {
    text-align: center;
    color: #eee;
    border: 1px solid #555555;
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
    &[href="/signin"] {
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
  display: flex;
  align-items: center;
  margin-top: 5px;
  a {
    display: inline-block;
    min-width: 20px;
    color: white;
    svg {
      width: 17px;
      height: 17px;
    }
  }
`;



const CartCount = styled.span`
  font-weight:bold;
`;

export default function Header() {
  const session = useSession();
  console.log('session status :', session);
  const status = session.status;
  const { cartProducts } = useContext(CartContext);
  //Responsive:
  const [mobilenavactive, setMobileNavActive] = useState(false);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  return (
    <StyledHeader>
      {/* <Center> */}
      <Wrapper>
        <Logo href={"/"}>
          {/* <Image src="/logofinal.png" alt="Logo" width={127} height={50} /> */}
          <div>TECH</div>
          <div>SAMAYLA</div>
        </Logo>
        <StyledNav $mobilenavactive={mobilenavactive} top={0} isFirst={true}>
          <NavLink href="/">Accueil</NavLink>
          <NavLink href="/products">Tous les produits</NavLink>
          <NavLink href="/categories">Rayons</NavLink>
          <NavLink href="/account">Mon compte</NavLink>
          
      <NavLink href="/cart">Mon Panier <CartCount>({cartProducts.length})</CartCount></NavLink>
      
        
        </StyledNav>
        <StyledNav $mobilenavactive={mobilenavactive} top={300}>
        {status === "authenticated" &&  (
            <Button hover="true" onClick={logout}>Se déconnecter</Button>
          )}
          {status !== "authenticated" && status !== "loading" && (
            <>
              <NavLink href="/signin">Se connecter</NavLink>
              <NavLink href="/signup">Inscription</NavLink>
            </>
          )}
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
      {/* </Center> */}
    </StyledHeader>
  );
}
