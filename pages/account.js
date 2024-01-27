/* eslint-disable react/no-unescaped-entities */
import Button from "@/components/Button";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import OrdersList from "@/components/OrdersList";
import ProductBox from "@/components/ProductBox";
import Spinner from "@/components/Spinner";
import Tabs from "@/components/Tabs";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
  const [loaded, setLoaded] = useState(false);
  // Orders pre loader
  // const [orderLoaded, setOrderLoaded] = useState(true);
  // State to show wishlist product on the account page
  const [wishedProducts, setWishedProducts] = useState([]);
  // State for tabs on account page
  const [activeTab, setActiveTab] = useState("Commandes");
  // State for orders on account page
  const [orders, setOrders] = useState([]);
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
    axios.put("/api/userInformation", data);
  }

  useEffect(() => {
    if (session) {
      // setOrderLoaded(false);
      axios.get("/api/userInformation").then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setCity(response.data.city);
        setPostalCode(response.data.postalCode);
        setAdress(response.data.adress);
        setCountry(response.data.country);
        setLoaded(true);
      });
      // Wishlist on account page
      axios.get("/api/wishlist").then((response) => {
        setWishedProducts(response.data.map((wp) => wp.product));
      });
      // List of orders on account page
      axios.get("api/orders").then((response) => {
        setOrders(response.data);
        // setOrderLoaded(true);
      });
    }
  }, [session]);

  // When remove product from wishlist (from the acount page)
  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p._id.toString() !== idToRemove)];
    });
  }

  //fetching user information
  // useEffect(() => {
  //   axios
  //     .get("/api/userInformation")
  //     .then((response) => {
  //       setFirstName(response.data.firstName);
  //       setLastName(response.data.lastName);
  //       setEmail(response.data.email);
  //       setCity(response.data.city);
  //       setPostalCode(response.data.postalCode);
  //       setAdress(response.data.adress);
  //       setCountry(response.data.country);
  //       setLoaded(true);
  //     })
  //     .catch((error) => {
  //       // Handle error, e.g., display an error message or redirect to login
  //       console.error("Error fetching user information:", error);
  //     });
  // }, []);

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <WhiteBox>
              <Tabs
                tabs={["Commandes", "Liste d'envies"]}
                active={activeTab}
                onChange={setActiveTab}
              />
              {activeTab === "Commandes" && (
                <>
                  <div>
                    {orders.length === 0 && (
                      <p>Connectez-vous pour afficher vos commandes.</p>
                    )}
                    {orders.length > 0 &&
                      orders.map((o) => <OrdersList key={o._id} {...o} />)}
                  </div>
                </>
              )}
              {activeTab === "Liste d'envies" && (
                <>
                  <WishedProductsGrid>
                    {wishedProducts.length > 0 &&
                      wishedProducts.map((wp) => (
                        <ProductBox
                          key={wp._id}
                          {...wp}
                          wished={true}
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
              {loaded && (
                <>
                  <h2>Informations sur votre compte</h2>
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
                  <hr />
                </>
              )}

              {session && (
                <Button primary="true" hover={1} onClick={logout}>
                  Me déconnecter
                </Button>
              )}
              {!session && (
                <>
                  <h2>Connectez-vous</h2>

                  <Button primary="true" onClick={login}>
                    Me connecter avec Google
                  </Button>
                </>
              )}
            </WhiteBox>
          </div>
        </ColsWrapper>
      </Center>
      <Footer />
    </>
  );
}
