import { CartContextProvider } from "@/components/CartContext";
import { SessionProvider } from "next-auth/react";
import  { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

body{
  padding:0;
  margin:0;
  background-color: #eee;
  font-family: system-ui;
}

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
