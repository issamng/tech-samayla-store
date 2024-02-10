import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { useState } from "react";
import styled from "styled-components";

const FAQContainer = styled.div`
  /* max-width: 600px;
  margin: 0 auto;
  padding: 20px; */
`;

const Question = styled.div`
  cursor: pointer;
  padding: 10px;
  /* background-color: #f0f0f0; */
  background-color: #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ccc;
  }
`;

const Answer = styled.div`
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function FaqPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Comment puis-je passer une commande sur votre site ?",
      answer:
        "Pour effectuer un achat, parcourez notre catalogue, ajoutez les articles souhaités à votre panier, puis suivez les étapes de paiement.",
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer:
        "Nous acceptons les paiements par carte de crédit, PayPal, et d'autres méthodes de paiement sécurisées. Les options disponibles seront affichées lors du processus de paiement.",
    },
    {
      question:
        "Les informations de paiement sont-elles sécurisées sur votre site ?",
      answer:
        "Oui, nous utilisons des technologies de cryptage sécurisées pour protéger vos informations de paiement. Votre sécurité est notre priorité.",
    },
    {
      question: "Pouvez-vous expédier vos produits à l'international ?",
      answer:
        "Oui, nous proposons la livraison internationale. Consultez les informations de livraison pour plus de détails.",
    },
    {
      question: "Puis-je ajouter des articles à ma commande après l'avoir passée ?",
      answer:
"Malheureusement, une fois que la commande est confirmée, nous ne pouvons pas ajouter d'articles. Vous devrez passer une nouvelle commande pour les articles supplémentaires."    },

    {
      question:
        "Comment puis-je contacter le service client en cas de problème ?",
      answer:
        "Vous pouvez nous contacter via notre formulaire de contact sur la page, Nous nous efforçons de répondre dans les plus brefs délais.",
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <Center>
        <FAQContainer>
          <Title>FAQ</Title>
          {faqData.map((faq, index) => (
            <div key={index}>
              <Question onClick={() => handleToggle(index)}>
                {faq.question}
              </Question>
              {activeIndex === index && <Answer>{faq.answer}</Answer>}
            </div>
          ))}
        </FAQContainer>
      </Center>
      <Footer />
    </>
  );
}
