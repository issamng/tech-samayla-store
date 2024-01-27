import styled from "styled-components";
import StarOutline from "./icons/StarOutline";
import StarSolid from "./icons/StarSolid";
import { useState } from "react";

const StarsWrapper = styled.div`
  display: flex;
  gap: 1px;
`;
const StarWrapper = styled.button`
  ${(props) =>
    props.size === "md" &&
    `
    height: 1.4rem;
  width: 1.4rem;
`}
  ${(props) =>
    props.size === "sm" &&
    `
height: 1rem;
  width: 1rem;
`}

${(props) =>
    !props.disabled &&
    `
cursor: pointer;
`}

  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: #ffa41c;
`;

export default function ReviewsStars({
  size = "md",
  defaultStarClick = 0,
  disabled,
  onChange = () => {},
}) {
  const [starClick, setStarClick] = useState(defaultStarClick);
  const fiveStar = [1, 2, 3, 4, 5];
  function handleStarClick(n) {
    if (disabled) {
      return;
    }

    setStarClick(n);
    onChange(n);
  }
  return (
    <StarsWrapper>
      {fiveStar.map((n) => (
        <>
          <StarWrapper
            disabled={disabled}
            size={size}
            onClick={() => handleStarClick(n)}
          >
            {starClick >= n ? <StarSolid /> : <StarOutline />}
          </StarWrapper>
        </>
      ))}

      {/* <StarWrapper>
      {starClick >= 2 ? <StarSolid /> : <StarOutline />}
      </StarWrapper>
      <StarWrapper>
      {starClick >= 3 ? <StarSolid /> : <StarOutline />}
      </StarWrapper>
      <StarWrapper>
      {starClick >= 4 ? <StarSolid /> : <StarOutline />}
      </StarWrapper>
      <StarWrapper>
      {starClick >= 5 ? <StarSolid /> : <StarOutline />}
      </StarWrapper> */}
    </StarsWrapper>
  );
}
