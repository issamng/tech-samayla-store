import styled from "styled-components";

const StyledTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  margin-top:14px;
`;

const StyledTab = styled.span`
  font-size: 1.3rem;
  cursor: pointer;
 
color: ${(props) => (props.$active ? "black" : "#999")};
  border-bottom: ${(props) => (props.$active ? "2px solid black" : "none")};
`;

export default function Tabs({ tabs, $active, onChange }) {
  return (
    <StyledTabs>
      {tabs.map((tabName, index) => (
        <StyledTab key={index}
          onClick={() => {
            onChange(tabName);
          }}
          $active={tabName === $active}
        >
          {tabName}
        </StyledTab>
      ))}
    </StyledTabs>
  );
}
