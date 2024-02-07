import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import CircularJSON from "circular-json";

const FormWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  margin-top: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 10px;
  justify-content: center;
  cursor: pointer;
`;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  console.log(errors);

  // const onSubmit = async (data) =>
  //   await fetch("/api/contact", {
  //     method: "POST",
  //     body: CircularJSON.stringify(data),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   });

  return (
    <>
      <Header />
      <Center>
        <FormTitle>Créer un compte</FormTitle>
        <FormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="text"
              placeholder="Nom"
              {...register("lastName", {})}
            />
            <InputField
              type="text"
              placeholder="Prenom"
              {...register("firstName", { required: true })}
            />
            <InputField
              type="email"
              placeholder="Email"
              {...register("Email", { required: true, pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i })}
            />
            <InputField
              type="password"
              placeholder="Mot de passe"
              {...register("Password", { required: true, max: 14, min: 6, maxLength: 14, })}
            />
            <InputField
              type="password"
              placeholder="Entrez a nouveau votre mot de passe"
              {...register("PasswordConfirmation", {
                required: true,
                max: 14,
                min: 6,
                maxLength: 14,
              })}
            />

            <SubmitButton primary="true" hover="true" onClick={onSubmit}>
              Inscription
            </SubmitButton>
          </form>
        </FormWrapper>
      </Center>
      <Footer />
    </>
  );
}
