import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th{
    /* text-align: left; */
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: .8rem;
  }
  td{
    border-top: 1px solid rgba(0,0,0,.1);
    text-align: center;
    /* width: 100%; */
  }
  tr:last-of-type td {
  border-top: none;
}
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
