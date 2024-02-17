import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CircularJSON from "circular-json";
import Spinner from "@/components/Spinner";

const FormWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  /* margin-top: 40px; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 80px auto;
`;

const FormTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 20px;
  text-align: center;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
  &:active,
  &:focus {
    outline: none;
  }
`;

const TextAreaField = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;
  font-family: inherit;
  &:active,
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 10px;
  justify-content: center;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: -15px 0 13px 5px;
  font-size:.8rem;
`;

const SuccessMessage = styled.div`
  color: #008000;
  margin-top: 10px;
  font-weight: bold;
  font-size: 0.9rem;
`;

export default function ContactPage() {

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object({
    lastName: yup.string().max(50, 'Le nom ne doit pas dépasser 50 caractères.'),
    firstName: yup.string().required("Entrez votre prénom").max(50, 'Le prénom ne doit pas dépasser 50 caractères.'),
    Email: yup.string().email("Format invalide").required("Entrez votre email"),
    Objet: yup.string().max(100, "L'objet ne doit pas dépasser 100 caractères."),
    Message: yup.string().required("Entrez votre message"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const onSubmit = (data) => console.log(data);
  // console.log(errors);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: CircularJSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if(response.ok){
        reset();
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        console.error("Error submitting data:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during the submission:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <Header />
      <Center>
        <FormWrapper>
          <FormTitle>Nous contacter</FormTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="text"
              placeholder="Nom"
              {...register("lastName", { maxLength: 50 })}
              
            />
             {errors.lastName && (
              <ErrorMessage>{errors.lastName.message}</ErrorMessage>
            )}
            <InputField
              type="text"
              placeholder="Prenom"
              {...register("firstName", { required: true, maxLength: 50 })}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName.message}</ErrorMessage>
            )}

            <InputField
              type="email"
              placeholder="Email"
              {...register("Email", {
                required: true,
                pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i,
              })}
            />
            {errors.Email && (
              <ErrorMessage>{errors.Email.message}</ErrorMessage>
            )}

            <InputField
              type="text"
              placeholder="Objet"
              {...register("Subject", { maxLength: 100 })}
            />
            <TextAreaField
              placeholder="Message"
              {...register("Message", { required: true })}
            />
            <ErrorMessage>{errors.Message?.message}</ErrorMessage>
            <SubmitButton primary="true" hover="true" disabled={isLoading}>
            {isLoading ? <Spinner fullWidth={true} white={true} /> : 'Envoyer'}
            </SubmitButton>
            {showSuccessMessage && (
                    <SuccessMessage>
                      Votre message a été envoyé avec succès.
                    </SuccessMessage>
                  )}
          </form>
        </FormWrapper>
      </Center>

      {/* <div style={{marginTop:'50px'}}><img src="advice.jpg" style={{ width: '50%', height: '350px' }} /> </div> */}

      <Footer />
    </>
  );
}
