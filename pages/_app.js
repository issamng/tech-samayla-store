import { CartContextProvider } from "@/components/CartContext";
import { SessionProvider } from "next-auth/react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body{
  padding:0;
  margin:0;
  background-color: #eee;
  font-family: 'Roboto', sans-serif;
},

hr{
  display: block;
  border: 0;
  border-top:1px solid #ccc;
}

`;
// const PageWrapper = styled.div`

  // position: relative;
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;

//  `;

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          {/* <PageWrapper> */}
          <Component {...pageProps} />
          {/* </PageWrapper> */}
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
