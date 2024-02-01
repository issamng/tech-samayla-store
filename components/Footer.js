import styled from "styled-components";
import Link from "next/link";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/instagram";
import "react-social-icons/facebook";
import "react-social-icons/x";


const StyledFooter = styled.div`
  // position: absolute;
  bottom: 0;
  margin-bottom: 0;
  background-color: #222;
  display: flex;
  justify-content: center; /* Horizontally center align */
  width: 100%;
  // margin-top: auto;
  margin-top: 80px;
`;

const LinksContainer = styled.div`
  display: block; /* Ensures links stack vertically */
  text-align: center; /* Horizontally centers the links */
  margin-top: 20px;
  margin-bottom: 20px;
`;

const FooterLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  display: block;
  padding: 5px 0;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialIconContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  margin-bottom: 0;
`;



export default function Footer() {
  return (
    <StyledFooter>
      <LinksContainer>
        <FooterLink href={"/quisommesnous"}>Qui sommes nous ?</FooterLink>
        <FooterLink href={"/contact"}>Nous contacter</FooterLink>
        <FooterLink href={"/"}>Nous rejoindre</FooterLink>

        <FooterLink href={"/"}>FAQ</FooterLink>

        <FooterLink href={"/delivery"}>Livraison</FooterLink>
        <SocialIconContainer>
          <SocialIcon
            bgColor="white"
            fgColor="#222"
            url="https://www.instagram.com" style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            bgColor="white"
            fgColor="#222"
            url="https://www.facebook.com" style={{ height: 35, width: 35 }}
          />
          <SocialIcon bgColor="white" fgColor="#222" url="https://www.x.com" style={{ height: 35, width: 35 }}/>
        </SocialIconContainer>
        
      </LinksContainer>
    </StyledFooter>
  );
}
