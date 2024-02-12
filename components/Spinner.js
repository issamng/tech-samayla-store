import { PulseLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
${props => props.fullWidth ? `
display:flex;
justify-content: center;
;
` : `
// border: 5px solid blue;
`}
`;

export default function Spinner({ fullWidth }) {
  return (
    <Wrapper fullWidth={fullWidth}>
      <PulseLoader speedMultiplier={2} color={"#29465B"} />
    </Wrapper>
  );
}
