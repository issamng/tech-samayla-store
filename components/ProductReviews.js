/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import WhiteBox from "./WhiteBox";
import ReviewsStars from "./ReviewsStars";
import Textarea from "./Textarea";
import Input from "./Input";
import Button from "./Button";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const Subtitle = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
`;

const AllReviewsWrapper = styled.div`
  margin-bottom: 10px;
  h3 {
    margin: 0;
    font-size: 1rem;
  }
  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

const AllReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time {
    font-size: 12px;
    color: #aaa;
  }
`;




export default function ProductReviews({ product }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const loadReviews = useCallback(() => {
    setReviewsLoading(true);
    axios.get("/api/reviews?product=" + product._id).then((res) => {
      setReviews(res.data);
      setReviewsLoading(false);
    });
  }, [product._id]);
  

  function submitReview() {
    const data = { title, desc, stars, product: product._id };
    axios.post("/api/reviews", data).then((res) => {
      setTitle("");
      setDesc("");
      setStars(0);
      loadReviews();
      // const newReview = res.data; // Assuming res.data is the new review
      // setReviews((prevReviews) => [newReview, ...prevReviews]);
    });
  }
  useEffect(() => {
    loadReviews();
  }, [loadReviews, product._id]);


  return (
    <div>
      <Title>Évaluations</Title>
      <ColsWrapper>
    
          <div> <WhiteBox>
            <Subtitle>Évaluer ce produit</Subtitle>
            <ReviewsStars onChange={setStars} />
            <Input
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              type="text"
              placeholder="Titre"
            />
            <Textarea
              value={desc}
              onChange={(ev) => setDesc(ev.target.value)}
              placeholder="Partagez votre opinion avec les autres clients"
            />
            <div>
              <Button primary="true" hover="true" onClick={submitReview}>
                Valider
              </Button>
            </div>
          </WhiteBox></div>
         
        
    <div> <WhiteBox>
            <Subtitle>Toutes les évaluations</Subtitle>
            {reviewsLoading && <Spinner fullWidth={true} />}
            {reviews.length === 0 && <p>Ce produit n'a aucune évaluation.</p>}
            {reviews.length > 0 &&
              reviews.map((review, index) => (
                <AllReviewsWrapper key={index}>
                  <AllReviewsHeader>
                    <ReviewsStars
                      size={"sm"}
                      disabled={true}
                      defaultStarClick={review.stars}
                    />
                    <time>
                      {new Date(review.createdAt).toLocaleString("fr-FR")}
                    </time>
                  </AllReviewsHeader>
                  <h3> {review.title}</h3>
                  <p> {review.desc}</p>
                </AllReviewsWrapper>
              ))}
          </WhiteBox></div>
         
        
      </ColsWrapper>
    </div>
  );
}
