import styled, { css } from "styled-components";
import { primary } from "@/lib/colors";


export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  /* padding:0.5rem 1rem; */
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-size: 16px;
  font-family: inherit;
  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${(props) =>
    props.hover &&
    css`
      &:hover {
        opacity: 0.9;
        
      }
    `}

  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}

${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}


${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #333333;
      color: #fff;
    `}
  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #333333;
      border: 1px solid #000;
    `}
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;
    `}
  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
    `}
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}

    /* ${(props) =>
    props.signin &&
    css`
      background-color: white;
      color:black;
      margin-right:10px;
      
    `}

    ${(props) =>
    props.signup &&
    css`
      background-color: black;
      color:white;
      margin-right:10px;
      border:1px solid #eee;
      
    `} */
    
`;

export const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
