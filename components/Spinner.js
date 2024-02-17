import { PulseLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  ${(props) =>
    props.fullWidth
      ? `
display:flex;
justify-content: center;
;
`
      : `
// border: 5px solid blue;
`}

  ${(props) => props.white && "color: #fff;"}
`;

export default function Spinner({ fullWidth, white }) {
  return (
    <Wrapper fullWidth={fullWidth} white={white}>
      <PulseLoader speedMultiplier={2} color={white ? "#fff" : "#29465B"} />
    </Wrapper>
  );
}
