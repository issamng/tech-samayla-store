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
  /* background-color: #222; */
  background-color: #333333;
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
  display: flex;
  gap: 50px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0 15px;
  @media screen and (min-width: 768px) {
    gap: 100px;
  }
`;

const FooterLink = styled(Link)`
  color: #c0c0c0;
  text-decoration: none;
  display: block;
  padding: 5px 0;
  font-size: 0.9rem;
  &:hover {
    color: #fff;
  }
`;

const SocialIconContainer = styled.div`
  display: flex;
  gap: 30px;
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
  justify-content: center;
  margin-left: 60px;
  /* margin-top: 40px; */

  @media screen and (max-width: 768px) {
    text-align: center;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 0;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <LinksContainer>
        <div>
          <FooterLink href="/">Accueil</FooterLink>
          <FooterLink href="/products">Tous les produits</FooterLink>
          <FooterLink href="/categories">Rayons</FooterLink>
          <FooterLink href="/account">Mon compte</FooterLink>
          <FooterLink href="/search">Rechercher un produit</FooterLink>
        </div>
        <div>
          <FooterLink href="/quisommesnous">Qui sommes nous ?</FooterLink>
          <FooterLink href="/contact">Nous contacter</FooterLink>
          <FooterLink href="/recruitment">Recrutement</FooterLink>
          <FooterLink href="/privacypolicy">
            Politique de confidentialité
          </FooterLink>
          <FooterLink href="/delivery">Livraison</FooterLink>
        </div>
        <div>
          <FooterLink href="/signup">Inscription</FooterLink>
          <FooterLink href="/signin">Connexion</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
        </div>
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
