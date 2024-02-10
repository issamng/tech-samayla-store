import styled from "styled-components";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CircularJSON from "circular-json";

const FormWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  margin-top: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width:60%;
  margin: 80px auto;
  @media screen and (max-width: 768px) {
    width:70%;
  }
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  padding-left:0;
  margin-bottom: 15px;
  border: none;
  box-sizing: border-box;
  font-family: inherit;
  background-color:#f8f8f8;
  border-bottom: 2px solid #d1d1d4;
  &:active,
  &:hover,
  &:focus {
    outline: none;
    border-bottom-color: #29465b;
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
  margin: -15px 0 13px 1px;
  font-size:.8rem;
`;

export default function SignUpPage() {
  const schema = yup.object({
    lastName: yup.string().required("Entrez votre nom").max(50),
    firstName: yup.string().required("Entrez votre prénom").max(50),
    Email: yup.string().email("Format invalide").required("Entrez votre email"),
    Password: yup.string().required("Entrez votre mot de passe"),
    PasswordConfirmation: yup
      .string()
      .required("Entrez a nouveau votre mot de passe"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
        <FormWrapper>
          <FormTitle>Créer un compte</FormTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="text"
              placeholder="Nom"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <ErrorMessage>{errors.lastName.message}</ErrorMessage>
            )}
            <InputField
              type="text"
              placeholder="Prénom"
              {...register("firstName", { required: true })}
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
              type="password"
              placeholder="Mot de passe"
              {...register("Password", {
                required: true,
                max: 14,
                min: 6,
                maxLength: 14,
              })}
            />
            {errors.Password && (
              <ErrorMessage>{errors.Password.message}</ErrorMessage>
            )}
            <InputField
              type="password"
              placeholder="Confirmez votre mot de passe"
              {...register("PasswordConfirmation", {
                required: true,
                max: 14,
                min: 6,
                maxLength: 14,
              })}
            />
            {errors.PasswordConfirmation && (
              <ErrorMessage>{errors.PasswordConfirmation.message}</ErrorMessage>
            )}

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
