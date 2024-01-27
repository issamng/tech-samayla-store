import styled from "styled-components";

const StyledOrders = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
  display: flex;
  gap: 20px;
  align-items: center;
  time {
    font-size: 0.9rem;
    color: #888;
    
  }
`;

const ProductRow = styled.div`
  span {
    font-size: 0.9rem;
    color: #888;
    
  }
`;

export default function OrdersList({ line_items, createdAt }) {
  return (
    <StyledOrders>
      <div>
        <time>{new Date(createdAt).toLocaleString()}</time>
      </div>
      <div>
        {line_items.map((item, index) => (
          <ProductRow key={index}>
            {item.price_data.product_data.name} : <span>{item.quantity}</span>
          </ProductRow>
        ))}
      </div>
    </StyledOrders>
  );
}
