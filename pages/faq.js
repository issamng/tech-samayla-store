import Center from "@/components/Center";
import Header from "@/components/Header";
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
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <Center>
        <FAQContainer>
          <h1>FAQ</h1>
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
    </>
  );
}
