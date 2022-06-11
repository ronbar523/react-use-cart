import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import data from "./data";

import Cart from "./cart";
import ItemCard from "./itemCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faXmark,
  faArrowRight,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  // Slice

  const [noOfElement, setNoOfElement] = useState(4);
  const loadMore = () => {
    if (data.productData.length > noOfElement) {
      setNoOfElement(noOfElement + 4);
    }
  };
  const loadLess = () => {
    if (noOfElement > 5) {
      setNoOfElement(noOfElement - 4);
    }
  };

  const slice = data.productData.slice(0, noOfElement);

  // Search

  const [filter, setFilter] = useState("");
  const searchText = (event) => {
    setFilter(event.target.value);
  };

  let dataSearch = data.productData.filter((item) => {
    return (
      item.title.toLowerCase() +
      item.price
    ).includes(filter.toLowerCase() || Number(filter));
  });

  // Dark / Light Mode

  const getTheme = () => {
    return JSON.parse(localStorage.getItem("theme")) || false;
  };

  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  // Sort

  data.productData.sort((a, b) => (a.title > b.title ? 1 : -1));

  const [highPriceArr, setHighPriceArr] = useState(false);
  const [lowPriceArr, setLowPriceArr] = useState(false);
  const [highRatingArr, setHighRatingArr] = useState(false);
  const [lowRatingArr, setLowRatingArr] = useState(false);
  const [normalArr, setNormalArr] = useState(true);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const [show, setShow] = useState(false);

  return (
    //Dark
    <div className={theme ? "theme-dark" : ""}>
      <div className="content-bg-color main-content">
        <h1 className="text-center mt-3">All Items</h1>
        <div className="col-12 mb-2"></div>
        <section className="py-1 container">
          <div className="col-12 mb-2">
            <div className="row">
              <div className="mb-3 col-4">
                
             
                  <div className="d-block mt-3">
                    <label className="from-label h5"> Search: &nbsp;</label>
                    <input
                      type="text"
                      className="from-control"
                      value={filter}
                      onChange={(e) => searchText(e)}
                    />
                  </div>
              </div>
            </div>

            {/* Page */}
            <div className="row justify-content-center">
              {dataSearch.length === 0 &&
                highPriceArr === false &&
                lowPriceArr === false &&
                lowRatingArr === false &&
                highRatingArr === false &&
                slice.map((item, index) => {
                  return <ItemCard key={index} item={item} />;
                })}
            </div>

            {/* Search */}
            <div className="row justify-content-center">
              {dataSearch.slice(0, noOfElement).map((item, index) => {
                return <ItemCard key={index} item={item} />;
              })}

              {/* Filter Low Rating */}
              <div className="row justify-content-center">
                {lowRatingArr
                  ? data.productData

                      .sort((a, b) => (a.rating > b.rating ? 1 : -1))
                      .slice(0, noOfElement)
                      .map((item, index) => {
                        return <ItemCard key={index} item={item} />;
                      })
                  : null}
              </div>

              {/* Filter High Price */}
              <div className="row justify-content-center">
                {highPriceArr
                  ? data.productData
                      .sort((a, b) => (a.price < b.price ? 1 : -1))
                      .slice(0, noOfElement)
                      .map((item, index) => {
                        return <ItemCard key={index} item={item} />;
                      })
                  : null}
              </div>
              {/* filter Low Price */}
              <div className="row justify-content-center">
                {lowPriceArr
                  ? data.productData
                      .sort((a, b) => (a.price > b.price ? 1 : -1))
                      .slice(0, noOfElement)
                      .map((item, index) => {
                        return <ItemCard key={index} item={item} />;
                      })
                  : null}
              </div>
              {/* Filter High Rating */}
              <div className="row justify-content-center">
                {highRatingArr
                  ? data.productData
                      .sort((a, b) => (a.rating < b.rating ? 1 : -1))
                      .slice(0, noOfElement)
                      .map((item, index) => {
                        return <ItemCard key={index} item={item} />;
                      })
                  : null}

                {/* Slice */}

                <button
                  className={
                    theme
                      ? "btn btn-light d-block py-2 col-12 container mb-1"
                      : "btn btn-primary d-block py-2 col-12 container mb-1"
                  }
                  onClick={() => loadMore()}
                  disabled={noOfElement >= data.productData.length}
                >
                  Load More &nbsp;
                  <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                </button>

                {/* Slice */}
                <button
                  className={
                    theme
                      ? "btn btn-light d-block py-2 col-12 container mb-1"
                      : "btn btn-primary d-block py-2 col-12 container mb-1"
                  }
                  onClick={() => loadLess()}
                  disabled={noOfElement < 5}
                >
                  Load Less &nbsp;
                  <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
          <Cart />
        </section>
        <motion.nav
          animate={show ? "open" : "closed"}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <motion.div>
            <hr className="hr-nav"></hr>
            {/* Dark */}
            {theme ? (
              <h5 className="theme-title fs-4"> Switch Light</h5>
            ) : (
              <h5 className="theme-title fs-4"> Switch Dark</h5>
            )}
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => {
                  setTheme(!theme);
                  setShow(false);
                }}
              />
              <span className="slider round"></span>
            </label>
            {/* sort */}
            <div>
              <button
                className={
                  theme ? " btn btn-dark btn-one" : "btn btn-primary btn-one"
                }
                disabled={normalArr || filter}
                onClick={() => {
                  setHighPriceArr(false);
                  setLowPriceArr(false);
                  setHighRatingArr(false);
                  setLowRatingArr(false);
                  setNormalArr(true);
                 
                  setShow(false);
                }}
              >
                A &nbsp;
                <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
                &nbsp; Z
              </button>

             

              <button
                className={
                  theme
                    ? " btn btn-dark btn-two"
                    : "btn btn-primary btn-two"
                }
                disabled={highPriceArr || filter}
                onClick={() => {
                  setHighPriceArr(true);
                  setLowPriceArr(false);
                  setHighRatingArr(false);
                  setLowRatingArr(false);
                  setNormalArr(false);
                 
                  setShow(false);
                }}
              >
                Price High To Low &nbsp;
                <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
              </button>

              <button
                className={
                  theme ? " btn btn-dark btn-three" : "btn btn-primary btn-three"
                }
                disabled={lowPriceArr || filter}
                onClick={() => {
                  setHighPriceArr(false);
                  setLowPriceArr(true);
                  setHighRatingArr(false);
                  setLowRatingArr(false);
                  setNormalArr(false);
                 
                  setShow(false);
                }}
              >
                Price Low To High &nbsp;
                <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
              </button>
              <button
                className={
                  theme ? " btn btn-dark btn-four" : "btn btn-primary btn-four"
                }
                disabled={highRatingArr || filter}
                onClick={() => {
                  setHighPriceArr(false);
                  setLowPriceArr(false);
                  setHighRatingArr(true);
                  setLowRatingArr(false);
                  setNormalArr(false);
                 
                  setShow(false);
                }}
              >
                Rating High To Low &nbsp;
                <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
              </button>
              <button
                className={
                  theme ? " btn btn-dark btn-five" : "btn btn-primary btn-five"
                }
                disabled={lowRatingArr || filter}
                onClick={() => {
                  setHighPriceArr(false);
                  setLowPriceArr(false);
                  setHighRatingArr(false);
                  setLowRatingArr(true);
                  setNormalArr(false);
                 
                  setShow(false);
                }}
              >
                Rating Low To High &nbsp;
                <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
              </button>
            </div>
          </motion.div>
        </motion.nav>
        <motion.button
          className="toggle"
          onClick={() => setShow((show) => !show)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
        >
          {show ? (
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
