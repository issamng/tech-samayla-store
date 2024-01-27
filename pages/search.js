import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import styled from "styled-components";

const SearchInput = styled(Input)`
  border-radius: 5px;
  margin: 30px 0 30px;
  font-style: italic;
`;

export default function SearchPage() {

  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce((phrase) => searchProducts(phrase), 500),
    []
  );

  function searchProducts(phrase) {
    axios
      .get("/api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
        setIsLoading(false);
      });
      
  }

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
      setIsLoading(false); // Ensure to set isLoading to false when there is no search phrase
    }
  }, [debouncedSearch, phrase]);

  return (
    <>
      <Header />
      <Center>
        <SearchInput
          autoFocus
          value={phrase}
          onChange={(ev) => setPhrase(ev.target.value)}
          placeholder="Rechercher un produit "
        />
        {!isLoading && phrase !== "" && products.length === 0 && (
          <h2>Aucun résultat trouvé pour votre recherche.</h2>
        )}
        {isLoading && <Spinner fullWidth={true} />}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
    </>
  );
}
