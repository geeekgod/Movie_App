import type { NextPage } from "next";
import axios from "axios";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Home: NextPage = () => {
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const hitSearch = () => {
    if (term.trim() !== "") {
      axios
        .get("/api/movie", { params: { name: term.toLowerCase() } })
        .then((res) => {
          if (res.data.movies) {
            setMovies(res.data.movies);
            setTerm("");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={classes.container}>
      <nav>
        <div className={classes.headerContainer}>
          <h1>Movie App</h1>
          <div className={classes.searchBar}>
            <input
              type="text"
              value={term}
              placeholder="Enter a movie or series name"
              onChange={(e) => setTerm(e.target.value)}
              onKeyPress={(e) => {
                e.key === "Enter" ? hitSearch() : null;
              }}
              onSubmit={hitSearch}
            />
            <FontAwesomeIcon icon={faSearch} color="grey" onClick={hitSearch} />
          </div>
        </div>
      </nav>
      <Row>
        {movies[0] !== undefined &&
          movies.map((item: any, pos: any) => {
            return (
              <Col key={pos} md={4}>
                <div
                  style={{ width: "18rem" }}
                  className={classes.cardContainer}
                >
                  {item.i && (
                    <div
                      style={{
                        backgroundImage: `url(${item.i.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}
                      className={classes.cardImage}
                    ></div>
                  )}
                  <div className={classes.cardContentContainer}>
                    <h4>{item.l}</h4>
                    <Row>
                      <Col>
                        <p>{item.rank}</p>
                      </Col>

                      <Col>
                        <p>{item.y}</p>
                      </Col>
                    </Row>
                    <a
                      target="_blank"
                      // href={`https://www.google.com/search?q=${item.l}`}
                      href={`https://www.imdb.com/find?q=${item.l}`}
                    >
                      <Button variant="primary">Read More</Button>
                    </a>
                  </div>
                </div>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Home;
