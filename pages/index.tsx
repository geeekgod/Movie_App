import type { NextPage } from "next";
import useSWR from "swr";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: NextPage = () => {
  const fetcher = (url: any, term: any) =>
    axios.get(url, { params: { name: term } }).then((res) => res.data);

  const [term, setTerm] = useState("");
  const [search, setSearch] = useState(false);
  const [movies, setMovies] = useState([]);

  const { data, error, mutate } = useSWR(search ? "/api/movie" : null, () =>
    fetcher("/api/movie", term)
  );

  const hitSearch = (e: any) => {
    if (e.key === "Enter") {
      setSearch(true);
      mutate();
    }
  };

  // useEffect(() => {
  //   if (search) {
  //     setTimeout(() => {
  //       setSearch(false);
  //     }, 500);
  //   }
  // }, [search]);

  useEffect(() => {
    setSearch(true);
    mutate();
    setTimeout(() => {
      setSearch(false);
    }, 2000);
  }, [term]);

  useEffect(() => {
    if (error) {
      console.log("error", error);
    }
    if (data) {
      console.log("data", data);
      setMovies(data.movies);
    }
    if (data !== movies) {
      setSearch(false);
    }
  }, [error, data, movies]);

  return (
    <div>
      <nav>
        <h1>Movie App</h1>
        <input
          type="text"
          value={term}
          placeholder="Enter a movie or series name"
          onChange={(e) => setTerm(e.target.value)}
          onKeyPress={(e) => hitSearch(e)}
        />
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
      </nav>
    </div>
  );
};

export default Home;
