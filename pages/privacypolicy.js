/* eslint-disable react/no-unescaped-entities */
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <Center>
        <h2>Politique de confidentialité </h2>
        <b>Collecte d'informations personnelles:</b>
        <p>
          Lorsque vous visitez notre site, nous recueillons des informations
          automatiquement via des technologies telles que les cookies, les
          journaux de serveur et les balises Web. Ces informations peuvent
          inclure votre adresse IP, votre type de navigateur, votre fournisseur
          de services Internet, les pages que vous avez visitées et d'autres
          données de diagnostic. Lorsque vous effectuez un achat ou créez un
          compte, nous recueillons des informations personnelles telles que
          votre nom, votre adresse e-mail, votre adresse de livraison et les
          détails de votre carte de crédit.
        </p>
        <b>Utilisation des informations:</b>
        <p>
          Nous utilisons les informations recueillies pour diverses finalités,
          notamment pour traiter vos commandes, personnaliser votre expérience
          sur notre site, communiquer avec vous et améliorer nos services.
        </p>
        <b>Divulgation à des tiers:</b>
        <p>
          Nous pouvons partager vos informations personnelles avec des tiers
          dans le but de vous fournir des services, de traiter des paiements et
          de respecter des obligations légales.
        </p>
        <b>Sécurité:</b>
        <p>
          Nous mettons en œuvre des mesures de sécurité pour protéger vos
          informations personnelles, mais aucune méthode de transmission sur
          Internet ou de stockage électronique n'est totalement sécurisée. Nous
          nous efforçons de protéger vos informations, mais nous ne pouvons
          garantir leur sécurité à 100 %.
        </p>
        <b>Vos droits:</b>
        <p>
          Vous avez le droit d'accéder, de corriger et de supprimer vos
          informations personnelles. Vous pouvez également choisir de ne pas
          recevoir nos communications marketing. Contactez-nous pour exercer ces
          droits.
        </p>
      </Center>
      <Footer />
    </>
  );
}
