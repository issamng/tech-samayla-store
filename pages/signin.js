import styled from "styled-components";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import UserIcon from "@/components/icons/UserIcon";
import PasswordIcon from "@/components/icons/PasswordIcon";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FormWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 60%;
  margin: 80px auto;
  @media screen and (max-width: 768px) {
    width: 70%;
  }
`;

const FormTitle = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 20px;
  text-align: center;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  padding-left: 25px;
  margin-bottom: 15px;
  box-sizing: border-box;
  font-family: inherit;
  border: none;
  border-bottom: 1px solid ${(props) => (props.hasError ? "red" : "#d1d1d4")};
  font-weight: 500;
  background-color: #f8f8f8;

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
  margin-bottom: 15px;
  cursor: pointer;
`;

const ConnectGoogle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
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

const SignUp = styled(Link)`
  text-decoration: none;
  color: #29465b;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin: -15px 0 13px 5px;
  font-size: 0.8rem;
`;

export default function SignInPage() {
  const schema = yup.object({
    email: yup.string().email("Format invalide").required("Entrez votre email"),
    password: yup.string().required("Entrez votre mot de passe"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const onSubmit = (data) => console.log(data);
  // console.log(errors);

  // Connect with credentials
  const onSubmit = async (data) => {
    try {
        await signIn('credentials', data);
    } catch (error) {
      console.error("Error", error);
    } finally {
      
    }
  };

  // Connect with Google 
  async function login() {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
      prompt: "select_account",
    });
  }

  return (
    <>
      <Header />

      <Center>
        <FormWrapper>
          <FormTitle>Connectez-vous</FormTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <i>
                <UserIcon />
              </i>
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
            </InputContainer>
            <InputContainer>
              <i>
                <PasswordIcon />
              </i>
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
            </InputContainer>
            <SubmitButton primary="true" hover="true">
              Connexion
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
          <div>
            Vous n&apos;avez pas encore de compte?{" "}
            <SignUp href="/signup">Inscrivez-vous</SignUp>
          </div>
        </FormWrapper>
      </Center>
      <Footer />
    </>
  );
}
