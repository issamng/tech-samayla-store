/* eslint-disable react/no-unescaped-entities */
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Title from "@/components/Title";

export default function DeliveryPage() {
  return (
    <>
      <Header />
      <Center>
        <Title>Livraison rapide et fiable pour tous vos produits</Title>
        
        <p>
          Chez Tech Samayla, nous comprenons à quel point il est essentiel pour vous de
          recevoir vos produits rapidement et en parfait état. C'est pourquoi
          nous nous engageons à offrir une expérience de livraison
          exceptionnelle pour tous nos articles multimédia, notamment les
          téléphones, tablettes, ordinateurs et montres connectées.
        </p>
        <Title>Nos engagements </Title>
        <p>
          <b>Expédition rapide:</b> Vos commandes sont traitées avec la plus
          grande efficacité pour que vous puissiez profiter au plus vite de vos
          nouveaux gadgets et équipements.
          <br /><br /> <b>Emballage soigné:</b> Chaque produit est emballé avec le
          plus grand soin afin d'assurer une livraison en parfait état. Nous
          nous efforçons de minimiser les risques de dommages pendant le
          transport.
          <br /><br /> <b>Suivi en temps réel:</b> Restez informé à chaque étape du
          processus de livraison. Suivez votre colis en temps réel et soyez
          assuré de sa progression jusqu'à votre porte.
          <br /><br />
          <b> Options de livraison Flexibles:</b> Choisissez parmi différentes
          options de livraison pour trouver celle qui correspond le mieux à vos
          besoins. Nous nous adaptons à votre emploi du temps.
        </p>
        <p>
          Chez Tech Samayla, nous sommes déterminés à dépasser vos attentes en matière
          de livraison. Faites-nous confiance pour vous fournir un service
          rapide, fiable et transparent à chaque commande.
        </p>
      </Center>
      <Footer />
    </>
  );
}
