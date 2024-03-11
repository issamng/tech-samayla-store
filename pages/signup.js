/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import { signIn } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import Link from "next/link";

const FormWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  margin-top: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 60%;
  margin: 100px auto;
  @media screen and (max-width: 768px) {
    width: 70%;
  }
`;

const FormTitle = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 20px;
  text-align: center;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  padding-left: 0;
  margin-bottom: 15px;
  border: none;
  box-sizing: border-box;
  font-family: inherit;
  background-color: #f8f8f8;
  border-bottom: 1px solid ${(props) => (props.hasError ? "red" : "#d1d1d4")};
  &:active,
  &:hover,
  &:focus {
    outline: none;
    border-bottom-color: #29465b;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 0.5rem 1rem;
  justify-content: center;
  margin-bottom:15px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: -15px 0 13px 1px;
  font-size: 0.8rem;
`;

const SuccessMessage = styled.div`
  color: #008000;
  margin-top: 10px;
  font-weight: bold;
  font-size: 0.9rem;
`;

const SubmitError = styled.div`
margin-top:10px;
color: red;
font-size: 0.8rem;
`;


const SignIn = styled(Link)`
text-decoration: none;
color:#29465b;
font-weight: bold;
&:hover{
    text-decoration: underline;
}
`;

const ConnectGoogle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom:10px;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #aaa;
  gap: 3px;
  font-family: inherit;
  cursor: pointer;
  svg {
    height: 20px;
  }
`;


export default function SignUpPage() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

// Login with Google
  async function login() {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
      prompt: "select_account",
    });
  }

  const schema = yup.object({
    lastName: yup.string().required("Entrez votre nom").max(50),
    firstName: yup.string().required("Entrez votre prénom").max(50),
    email: yup.string().email("Format invalide").required("Entrez votre email"),
    password: yup.string().required("Entrez votre mot de passe"),
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

  const removeCircularReferences = (obj, seen = new WeakSet()) => {
    return JSON.parse(
      JSON.stringify(obj, (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return; // Skip circular references
          }
          seen.add(value);
        }
        return value;
      })
    );
  };

  const onSubmit = async (data) => {
    try {
      setError(false);
      setIsLoading(true);
      const sanitizedData = removeCircularReferences(data);
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(sanitizedData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        reset();
        setShowSuccessMessage(true);
      } else {
        setError(true)
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

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
              hasError={errors.lastName}
            />
            {errors.lastName && (
              <ErrorMessage>{errors.lastName.message}</ErrorMessage>
            )}
            <InputField
              type="text"
              placeholder="Prénom"
              {...register("firstName", { required: true })}
              hasError={errors.firstName}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName.message}</ErrorMessage>
            )}
            <InputField
              type="email"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i,
              })}
              hasError={errors.email}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            <InputField
              type="password"
              placeholder="Mot de passe"
              {...register("password", {
                required: true,
                max: 14,
                min: 6,
                maxLength: 14,
              })}
              hasError={errors.password} 
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            {/* <InputField
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
            )} */}

            <SubmitButton primary="true" hover="true" disabled={isLoading}>
              {isLoading ? (
                <Spinner fullWidth={true} white={true} />
              ) : (
                "Valider"
              )}
            </SubmitButton>
          </form>
          <ConnectGoogle onClick={login}>
            <svg version="1.1" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            Se connecter avec Google
          </ConnectGoogle>

          {error && (
              <SubmitError>
                Une erreur s'est produite, veuillez réessayer ultérieurement.
              </SubmitError>
            )}

            {showSuccessMessage && (
              <SuccessMessage>
                Votre inscription a été effectuée avec succès.
                <div><SignIn href="/signin">Connectez-vous</SignIn></div>
              </SuccessMessage>
            )}

        </FormWrapper>
      </Center>
      <Footer />
    </>
  );
}
