/* eslint-disable react/no-unescaped-entities */
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
// import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.5fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const ProductInfoCell = styled.td`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 3px;
  .productImageBox {
    max-width: 60px;
    max-height: 60px;
    /* margin:100px; */
  }
  @media screen and (min-width: 768px) {
    width: 100px;
    height: 100px;
    padding: 10px;
    .productImageBox{
      max-width: 100px;
      max-height: 100px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const th = styled.th`
  text-align: center;
  /* Ajoutez d'autres styles de th si nécessaire */
`;

const CartEmpty = styled(Link)`
  text-decoration: none;
  color: #29465b;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin: -4px 0 13px 1px;
  font-size: 0.8rem;
`;


export default function CartPage() {
  const { data: session } = useSession();
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [adress, setAdress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  // Shipping fee
  const [shippingFee, setShippingFee] = useState(null);
  // Spinner before displaying products in cart page
  const [loading, setLoading] = useState(false);
  // Erros if fields are empty
  const [errors, setErrors] = useState({});

  //Display products in cart box
  useEffect(() => {
    if (cartProducts.length > 0) {
      setLoading(true);
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((response) => {
          setProducts(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [cartProducts]);
  //Empty Cart after payment confirmation
  useEffect(() => {
    let isMounted = true;

    if (typeof window === "undefined" || !isMounted) {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }

    // Shipping fee
    axios.get("/api/settings?name=shippingFee").then((res) => {
      setShippingFee(res.data?.value);
    });

    if (session) {
      axios.get("/api/userInformation").then((response) => {
        setFirstName(response.data?.firstName);
        setLastName(response.data?.lastName);
        setEmail(response.data?.email);
        setCity(response.data?.city);
        setPostalCode(response.data?.postalCode);
        setAdress(response.data?.adress);
        setCountry(response.data?.country);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [clearCart, session, setIsSuccess]);

  async function moreProduct(id) {
    await addProduct(id);
    setLoading(false);
  }

  async function lessProduct(id) {
    await removeProduct(id);
    setLoading(false);
  }

  const goToPayment = async () => {

    // Check if all fields are filled in
    const newErrors = {};
    if (!firstName) newErrors.firstName = "Entrez votre nom";
    if (!lastName) newErrors.lastName = "Entrez votre prénom";
    if (!email) newErrors.email = "Entrez votre email";
    if (!city) newErrors.city = "Entrez votre ville";
    if (!postalCode) newErrors.postalCode = "Entrez votre code postal";
    if (!adress) newErrors.adress = "Entrez votre adresse";
    if (!country) newErrors.country = "Entrez votre pays";

    // Update errors 
    setErrors(newErrors);

    // Not proceed to payment if fields are empty 
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Proceed to payment 
    const response = await axios.post("/api/checkout", {
      firstName,
      lastName,
      email,
      city,
      postalCode,
      adress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  };

  // Total orders price in cart page
  let total = 0;
  for (const productId of cartProducts) {
    const prix = products.find((p) => p._id === productId)?.prix || 0;
    total += prix;
  }
  // Round total to 2 decimal
  const roundedTotal = Number(total.toFixed(2));

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <WhiteBox style={{ marginTop: 40 }}>
            <h1>Merci pour votre commande!</h1>
            <p>
              Vous serez notifié par email lors de lenvoi de votre commande.
            </p>
          </WhiteBox>
        </Center>
        {/* <Footer /> */}
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <div>
            <WhiteBox>
              <Title>Mon panier</Title>

              {!cartProducts?.length && !loading && (
                <>
                  <div>Oops, votre panier est vide. </div>
                  <div style={{ marginTop: "10px", lineHeight: 1.5 }}>
                    Besoin d'inspiration? Explorez nos{" "}
                    <CartEmpty href="/">nouveautés</CartEmpty> pour dénicher des
                    trésors ou parcourez nos{" "}
                    <CartEmpty href="/categories">rayons</CartEmpty> pour
                    trouver l'article parfait. Bonne chasse aux pépites!
                  </div>
                </>
              )}

              {loading && <Spinner fullWidth={true} />}

              {products?.length > 0 &&  (
                <>
                  <Table>
                    <thead>
                      <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id}>
                          <ProductInfoCell>
                            <ProductImageBox>
                              <Image className={"productImageBox"} src={product.images[0]} width={100} height={100} alt="" />
                              {/* <img src={product.images[0]} alt="" />  */}
                            </ProductImageBox>

                            <div>{product.title}</div>
                          </ProductInfoCell>
                          <td>
                            <Button onClick={() => lessProduct(product._id)}>
                              -
                            </Button>
                            <QuantityLabel>
                              {
                                cartProducts.filter((id) => id === product._id)
                                  .length
                              }
                            </QuantityLabel>

                            <Button onClick={() => moreProduct(product._id)}>
                              +
                            </Button>
                          </td>
                          <td>
                            {Number(
                              (
                                cartProducts.filter((id) => id === product._id)
                                  .length * product.prix
                              ).toFixed(2)
                            )}
                            €
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {roundedTotal}€
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} style={{ textAlign: "right" }}>
                          (Frais de livraison) :
                        </td>
                        <td>{shippingFee}€</td>
                      </tr>
                      <tr>
                        <td colSpan={2} style={{ textAlign: "right" }}>
                          Total :
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {roundedTotal + parseInt(shippingFee || 0)}€
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              )}
            </WhiteBox>
          </div>

          {!!cartProducts?.length && (
            <>
              <div>
                <WhiteBox>
                  <Title>Saisissez vos informations</Title>
                  <Input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    name="firstName"
                    onChange={(ev) => setFirstName(ev.target.value)}
                  />
                  {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage> }
                  <Input
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    name="lastName"
                    
                    onChange={(ev) => setLastName(ev.target.value)}
                  />
                  {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage> }
                  
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage> }
                 
                    <Input
                      type="text"
                      placeholder="Ville"
                      value={city}
                      name="city"
                      onChange={(ev) => setCity(ev.target.value)}
                    />
                    {errors.city && <ErrorMessage>{errors.city}</ErrorMessage> }
                    <Input
                      type="text"
                      placeholder="Code postal"
                      value={postalCode}
                      name="postalCode"
                      onChange={(ev) => setPostalCode(ev.target.value)}
                    />
                    {errors.postalCode && <ErrorMessage>{errors.postalCode}</ErrorMessage> }
               

                  <Input
                    type="text"
                    placeholder="Adresse"
                    value={adress}
                    name="adress"
                    onChange={(ev) => setAdress(ev.target.value)}
                  />
                  {errors.adress && <ErrorMessage>{errors.adress}</ErrorMessage> }
                  <Input
                    type="text"
                    placeholder="Pays"
                    value={country}
                    name="country"
                    onChange={(ev) => setCountry(ev.target.value)}
                    
                  />
                  {errors.country && <ErrorMessage>{errors.country}</ErrorMessage> }
                  <Button black="true" block="true" hover="true" style={{ marginTop: '13px' }}  onClick={goToPayment}>
                    Continuez vers le paiement
                  </Button>
                </WhiteBox>
              </div>
            </>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  ); // Return
} // Funtction close
