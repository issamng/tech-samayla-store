import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

/* eslint-disable react/no-unescaped-entities */
export default function RecruitmentPage() {
  return (
    <>
      <Header />
      <Center>
        <h2>Recrutement </h2>
        <p>
          Nous vous remercions de l'intérêt que vous portez à notre entreprise.
          Actuellement, il n'y a aucun poste vacant dans notre équipe.
          Cependant, nous sommes toujours à la recherche de talents
          exceptionnels. N'hésitez pas à consulter cette section ultérieurement
          pour les opportunités futures.
        </p>
      </Center>
      {/* <Footer /> */}
    </>
  );
}
