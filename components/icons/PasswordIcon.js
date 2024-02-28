import styled from "styled-components";

const StyledPasswordIcon = styled.svg`
    position: absolute;
    width: 20px;
    height: 22px;
    color: #aaa;
    top: 6px;
  `;

export default function PasswordIcon({ className = "w-6 h-6" }) {
  

  return (
    <StyledPasswordIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path
          fillRule="evenodd"
          d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
          clipRule="evenodd"
        />
      </svg>
    </StyledPasswordIcon>
  );
}
