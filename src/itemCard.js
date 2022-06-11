import React from "react";
import { useCart } from "react-use-cart";
import Ripples from "react-ripples";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-rating-stars-component";

const ItemCard = ({ item }) => {
  const { addItem } = useCart();
  const [likeArr, setLikeArr] = useState(false);

  return (
    <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
      <div className="card p-0 overflow-hidden h-100 shadow">
        <img src={item.img} className="card-img-top img-fluid" />
        <div className="card-body text-center">
          <h5 className="card-title fs-2">{item.title}</h5>
          <h5 className="card-text fs-3">{item.price}$</h5>
          <Ripples
            during={5000}
            color={"rgba(255,255,255, .5"}
            className="btn btn-success"
            onClick={() => addItem(item)}
          >
            <span className="fs-6">Add To Cart</span>
          </Ripples>
          {likeArr === false ? (
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="btn btn-primary fs-4 ms-3"
              onClick={() => setLikeArr(true)}
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              icon={faThumbsDown}
              className="btn btn-danger fs-4 ms-3"
              onClick={() => setLikeArr(false)}
            ></FontAwesomeIcon>
          )}
          <div className="stars">
            <ReactStars
              count={5}
              // onChange={ratingChanged}
              size={27}
              value={item.rating}
              edit={false}
              isHalf={true}
              emptyIcon={<i className="far fa-star "></i>}
              halfIcon={<i className="fa fa-star-half-alt "></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          </div>       
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
