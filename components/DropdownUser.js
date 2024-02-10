import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  /* background-color: #f9f9f9; */
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.a`
  padding: 12px 16px;
  display: block;
  text-decoration: none;
  color: red;
  cursor:pointer;
`;

export default function DropdownUser() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleIconClick = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <>
      <DropdownContainer>
        <Link href={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={handleIconClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
        <DropdownContent visible={dropdownVisible}>
        <DropdownItem onClick={() => setDropdownVisible(false)}>Se connecter</DropdownItem>
  <DropdownItem onClick={() => setDropdownVisible(false)}>S&apos;inscrire</DropdownItem>
        </DropdownContent>
      </DropdownContainer>
    </>
  );
}
