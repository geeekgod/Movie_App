import type { NextPage } from "next";
import axios from "axios";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const hitSearch = (e: any) => {
    if (e.key === "Enter" && term.trim() !== "") {
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
          <input
            type="text"
            value={term}
            placeholder="Enter a movie or series name"
            onChange={(e) => setTerm(e.target.value)}
            onKeyPress={(e) => hitSearch(e)}
          />
        </div>
      </nav>
      <Row>
        {movies[0] !== undefined &&
          movies.map((item: any, pos: any) => {
            return (
              <Col key={pos} md={4}>
                <Card style={{ width: "18rem" }}>
                  {item.i && <Card.Img variant="top" src={item.i.imageUrl} />}
                  <Card.Body>
                    <Card.Title>{item.l}</Card.Title>
                    <Row>
                      <Col>
                        <Card.Text>{item.rank}</Card.Text>
                      </Col>

                      <Col>
                        <Card.Text>{item.y}</Card.Text>
                      </Col>
                    </Row>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Home;
