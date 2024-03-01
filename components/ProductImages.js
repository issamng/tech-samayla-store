import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

// const Image = styled.img`
//   max-width: 100%;
//   max-height: 100%;
// `;

// const MainImage = styled.img`
//   max-width: 100%;
//   max-height: 200px;
// `;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;
const ImageButton = styled.div`
  ${(props) =>
    props.active
      ? `
border: 2px solid #ccc;
border-color: #ccc;
`
      : `
border-color: Transparent;
// opacity: .9;
`}

  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;

  .imageButton{
    max-width: 100%;
    max-height: 100%;
  }
`;

const MainImageWrapper = styled.div`
  text-align: center;
  .mainImage{
  max-width: 100%;
  max-height: 200px;
  }
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <MainImageWrapper>
        
        <Image className={"mainImage"} src={activeImage} width={220} height={200} alt=""  />
      </MainImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            
            <Image className={"imageButton"} src={image} width={40} height={40} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
