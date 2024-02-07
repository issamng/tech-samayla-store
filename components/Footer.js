import styled from "styled-components";
import Link from "next/link";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/instagram";
import "react-social-icons/facebook";
import "react-social-icons/x";
import "react-social-icons/youtube";

const StyledFooter = styled.div`
  // position: absolute;
  bottom: 0;
  margin-bottom: 0;
  background-color: #222;
  display: grid;
  grid-template-columns: 1fr;
  /* justify-content: center;  */
  width: 100%;
  // margin-top: auto;
  margin-top: 80px;
  border-top: 1px solid #2226;
  @media screen and (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const LinksContainer = styled.div`
  /* display: block; */
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const FooterLink = styled(Link)`
  color: #c0c0c0;
  text-decoration: none;
  display: block;
  padding: 5px 0;
  font-size:.9rem;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialIconContainer = styled.div`
  display: flex;
  /* padding-left: 35px; */
  gap: 30px;
  /* margin-top: 60px; */
`;

const JoinUs = styled.div`
  color: #ddd;
  font-size: 1.7rem;
  font-weight: bold;
  font-style: italic;
`;

const SocialIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content:center;
  /* margin-top: 40px; */
  
  
  @media screen and (max-width: 768px) {
    text-align: center;
    align-items: center;
    margin-bottom: 10px;
  }
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
      </LinksContainer>
      <SocialIconWrapper>
        <JoinUs>REJOINS-NOUS !</JoinUs>
        <SocialIconContainer>
          <SocialIcon
            bgColor="#ddd"
            fgColor="#222"
            url="https://www.instagram.com"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            bgColor="#ddd"
            fgColor="#222"
            url="https://www.facebook.com"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            bgColor="#ddd"
            fgColor="#222"
            url="https://www.x.com"
            style={{ height: 35, width: 35 }}
          />
           <SocialIcon
            bgColor="#ddd"
            fgColor="#222"
            url="https://www.youtube.com"
            style={{ height: 35, width: 35 }}
          />
        </SocialIconContainer>
      </SocialIconWrapper>
    </StyledFooter>
  );
}
