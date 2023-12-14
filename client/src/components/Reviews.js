import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import {Stars} from "./index";
import {BsStarFill} from "react-icons/bs";
import Notiflix from "notiflix";
import {useAppContext} from "../context/user_context";

const ReviewFormWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;

  form {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;

    label {
      display: block;
      margin-bottom: 10px;
    }

    input,
    textarea {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
    }

    button {
      background-color: var(--clr-primary-5);
      color: #fff;
      padding: 10px 15px;
      border: none;
      cursor: pointer;
    }
  }
`;

const AllReviews = ({productId}) => {
    const {user} = useAppContext();
    const [reviews, setReviews] = useState(null);
    const [count, setCount] = useState(0);
    const [reviewMessage, setReviewMessage] = useState(null);
    const [reviewFormData, setReviewFormData] = useState({
        rating: 0,
        title: '',
        comment: '',
    });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/v1/reviews/${productId}/`);
                setReviews(response.data.reviews);
                setCount(response.data.count);
            } catch (error) {
                console.error('Error fetching reviews: ', error);
            }
        };

        if (productId) {
            fetchReviews();
        }
    }, [productId, reviewMessage]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        try {
            const post_response = await axios.post(`/api/v1/reviews`, {
                ...reviewFormData,
                product: productId,
            });
            setReviewFormData({
                rating: 0,
                title: '',
                comment: '',
            });
            Notiflix.Notify.success("Review added successfully");
            // Fetch the updated reviews from the server
            const fetchresponse = await axios.get(`/api/v1/reviews/${productId}/`);
            setReviews(fetchresponse.data.reviews);
            setCount(fetchresponse.data.count);
        } catch (error) {
            console.error(error.response.data.msg);
            Notiflix.Notify.failure(error.response.data.msg);

        }
    };

    const handleReviewChange = (e) => {
        const {name, value} = e.target;
        setReviewFormData({...reviewFormData, [name]: value});
    };
    return (
        <div>
            <h2>Reviews</h2>
            {count !== 0 ? (
                <ul>
                    {reviews?.map((review) => (
                        <li key={review._id}>
                            <ReviewCard>
                                <Stars stars={review.rating}/>
                                <p className="titlee">{review.title}</p>
                                <p className="comment">{review.comment}</p>
                                <p className="timestamp">
                                    {new Date(review.createdAt).toDateString()} by{' '}
                                    <span className="user">{review.user.name}</span>
                                </p>
                            </ReviewCard>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>The customers who have purchased this product have not yet submitted any reviews.</p>
            )}
            {user && <ReviewFormWrapper>
                <h2>Add review</h2>
                <form onSubmit={handleReviewSubmit}>
                    <label>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <BsStarFill
                                key={star}
                                style={{
                                    color: star <= reviewFormData.rating ? '#ffb900' : '#f5f1f1',
                                    cursor: 'pointer',
                                    fontSize: '2.5rem',
                                }}
                                onClick={() => handleReviewChange({target: {name: 'rating', value: star}})}
                            />
                        ))}
                    </label>
                    <br/>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={reviewFormData.title}
                            onChange={handleReviewChange}
                        />
                    </label>
                    <br/>
                    <label>
                        Comment:
                        <textarea
                            name="comment"
                            value={reviewFormData.comment}
                            onChange={handleReviewChange}
                        />
                    </label>
                    <br/>
                    <button type="submit">Submit Review</button>
                </form>
            </ReviewFormWrapper>}
        </div>
    );
};


const ReviewCard = styled.div`
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 16px;

  p {
    margin: 0;
  }

  p.titlee {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p.comment {

    margin-top: 8px;
  }

  p.timestamp {
    font-size: 0.8em;
    color: #555;
    margin-top: 8px;
  }

  p.user {
    font-weight: bold;
    font-size: 0.8em;
  }
`;

export default AllReviews;
