import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import CircularJSON from 'circular-json';

const FormWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  margin-top: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
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
  font-weight: 500;
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
  font-weight:500;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 10px;
  justify-content: center;
  cursor: pointer;
`;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => console.log(data);
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
       
        <FormWrapper>
        <FormTitle>Nous contacter</FormTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="text"
              placeholder="Nom"
              {...register("Nom", { maxLength: 50 })}
              
            />
            <InputField
              type="text"
              placeholder="Prenom"
              {...register("Prenom", { required: true, maxLength: 50 })}
            />

            <InputField
              type="email"
              placeholder="Email"
              {...register("Email", {
                required: true,
                pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i,
              })}
            />
            <InputField
              type="text"
              placeholder="Objet"
              {...register("Objet", { maxLength: 100 })}
            />
            <TextAreaField
              placeholder="Message"
              {...register("Message", { required: true })}
            />
            <SubmitButton primary="true" hover="true" onClick={onSubmit}>
              Envoyer
            </SubmitButton>
          </form>
        </FormWrapper>
      </Center>
      
      {/* <div style={{marginTop:'50px'}}><img src="advice.jpg" style={{ width: '50%', height: '350px' }} /> </div> */}
      
      <Footer />
    </>
  );
}
