/* eslint-disable react/no-unescaped-entities */
import Button from "@/components/Button";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import OrdersList from "@/components/OrdersList";
import ProductBox from "@/components/ProductBox";
import Tabs from "@/components/Tabs";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import UserIcon from "@/components/icons/UserIcon";
import PasswordIcon from "@/components/icons/PasswordIcon";
import Link from "next/link";
import Title from "@/components/Title";
import Spinner from "@/components/Spinner";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.5fr 0.8fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

//Login form
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
  border-bottom: 2px solid #d1d1d4;
  font-weight: 500;
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
  margin-bottom: 15px;
  justify-content: center;
  cursor: pointer;
`;

const ConnectGoogle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #aaa;
  gap: 3px;
  margin-bottom: 15px;
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

const SuccessMessage = styled.div`
  color: #008000;
  margin-top: 10px;
  font-weight: bold;
  font-size: 0.9rem;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [adress, setAdress] = useState("");
  const [country, setCountry] = useState("");
  // State to show account form only if informations fetched
  // const [loaded, setLoaded] = useState(false);
  // Orders pre loader
  // const [orderLoaded, setOrderLoaded] = useState(true);
  // State to show wishlist product on the account page
  const [wishedProducts, setWishedProducts] = useState([]);
  // State for tabs on account page
  // const [activeTab, setActiveTab] = useState(true);
  const [activeTabName, setActiveTabName] = useState("Mes commandes");
  // State for orders on account page
  const [orders, setOrders] = useState([]);
  //Success message after user save informations
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  //Spinner
  const [loading, setLoading] = useState(true);
  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
      prompt: "select_account",
    });
  }
  //Account informations
  function updateUserInformation() {
    const data = {
      firstName,
      lastName,
      email,
      city,
      adress,
      postalCode,
      country,
    };
    axios
      .put("/api/userInformation", data)
      .then(() => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la mise à jour des informations :",
          error
        );
      });
  }

  useEffect(() => {
    const fetchData = async () => {
setLoading(true);
      if (session) {
        try {
          const userInformationResponse = await axios.get("/api/userInformation");
          setFirstName(userInformationResponse.data.firstName);
          setLastName(userInformationResponse.data.lastName);
          setEmail(userInformationResponse.data.email);
          setCity(userInformationResponse.data.city);
          setPostalCode(userInformationResponse.data.postalCode);
          setAdress(userInformationResponse.data.adress);
          setCountry(userInformationResponse.data.country);
          
  
          const wishlistResponse = await axios.get("/api/wishlist");
          setWishedProducts(wishlistResponse.data.map((wp) => wp.product));
          
          const ordersResponse = await axios.get("api/orders");
          setOrders(ordersResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } 
      }
    };
    
    fetchData();
    setLoading(false);
    
  }, [session]);
  

  // When remove product from wishlist (from the acount page)
  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p._id.toString() !== idToRemove)];
    });
  }

  //Login Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <>
      <Header />
      <Center>
     
        <ColsWrapper>
          <div>
            <WhiteBox>
              <Tabs
                tabs={["Mes commandes", "Ma liste d'envies"]}
                $active={activeTabName}
                onChange={setActiveTabName}
              />
              {activeTabName === "Mes commandes" && (
                <>
                  <div>
                    { !session && !loading &&  (
                      <p>Connectez-vous pour afficher vos commandes.</p>
                    )}

                    {orders.length === 0 && !loading && (
                      <>
                        {session && (
                          <p>Vous n'avez pas encore passé de commandes.</p>
                        )}
                      </>
                    )}
                    </div>

                  <div>
                  {loading && session ? (
                      <Spinner fullWidth={true} />
                    ) : (
                      orders.length > 0 &&
                      orders.map((o) => <OrdersList key={o._id} {...o} />)
                    )}
                  </div>
                
                </>
              )}
              {activeTabName === "Ma liste d'envies" && (
                <>
                  <WishedProductsGrid>
                    {wishedProducts.length > 0 &&
                      wishedProducts.map((wp) => (
                        <ProductBox
                          key={wp._id}
                          {...wp}
                          wished={1}
                          removeFromWishlist={productRemovedFromWishlist}
                        />
                      ))}
                  </WishedProductsGrid>
                  {wishedProducts.length === 0 && (
                    <>
                      {session && <p>Votre liste d'envie est vide.</p>}
                      {!session && (
                        <p>Connectez-vous pour gérer votre liste d'envies.</p>
                      )}
                    </>
                  )}
                </>
              )}
            </WhiteBox>
          </div>
          <div>
            <WhiteBox>
              {session && (
                <>
                  <Title>Mes informations personnelles</Title>

                  <Input
                    type="text"
                    placeholder="Nom"
                    value={firstName}
                    name="firstName"
                    onChange={(ev) => setFirstName(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Prénom"
                    value={lastName}
                    name="lastName"
                    onChange={(ev) => setLastName(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                  <CityHolder>
                    <Input
                      type="text"
                      placeholder="Ville"
                      value={city}
                      name="city"
                      onChange={(ev) => setCity(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Code postal"
                      value={postalCode}
                      name="postalCode"
                      onChange={(ev) => setPostalCode(ev.target.value)}
                    />
                  </CityHolder>

                  <Input
                    type="text"
                    placeholder="Adresse"
                    value={adress}
                    name="adress"
                    onChange={(ev) => setAdress(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Pays"
                    value={country}
                    name="country"
                    onChange={(ev) => setCountry(ev.target.value)}
                  />
                  <Button
                    black="true"
                    block="true"
                    hover={1}
                    onClick={updateUserInformation}
                  >
                    Enregistrer
                  </Button>
                  {showSuccessMessage && (
                    <SuccessMessage>
                      Informations enregistrées avec succès!
                    </SuccessMessage>
                  )}
                  <hr />
                </>
              )}

              {session && (
                <Button primary="true" hover="true" onClick={logout}>
                  Me déconnecter
                </Button>
              )}
              {!session && (
                <>
                  <Title>Connectez-vous</Title>

                  {/* login form  */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                      <i>
                        <UserIcon />
                      </i>
                      <InputField
                        type="email"
                        placeholder="Email"
                        {...register("Email", {
                          required: true,
                          pattern:
                            /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i,
                        })}
                      />
                    </InputContainer>
                    <InputContainer>
                      <i>
                        <PasswordIcon />
                      </i>
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
                    </InputContainer>
                    <SubmitButton
                      primary="true"
                      hover="true"
                      onClick={onSubmit}
                    >
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

                  {/* <Button primary="true" onClick={login}>
                    Me connecter avec Google
                  </Button> */}
                </>
              )}
            </WhiteBox>
          </div>
        </ColsWrapper>
        {/* )} */}
      </Center>
      <Footer />
    </>
  );
}
