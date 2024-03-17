import styled from "styled-components";

const StyledInput = styled.input`
    width: 100%;
  padding: 10px;
  padding-left: 0;
  margin-bottom: 2px;
  border: none;
  box-sizing: border-box;
  font-family: inherit;
  /* background-color: #f8f8f8; */
  border-bottom: 1px solid ${(props) => (props.hasError ? "red" : "#d1d1d4")};
  &:active,
  &:hover,
  &:focus {
    outline: none;
    border-bottom-color: #29465b;
  }
`;


export default function Input(props) {
    return <StyledInput {...props} />
}