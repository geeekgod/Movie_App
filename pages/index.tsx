import type { NextPage } from "next";
import useSWR from "swr";
import axios from "axios";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: NextPage = () => {
  let data: any;

  const [term, setTerm] = useState("");

  const url = "https://imdb8.p.rapidapi.com/auto-complete";

  const searchMovie = () => {
    data = useSWR([url, term], () =>
      axios({
        url: "https://imdb8.p.rapidapi.com/auto-complete",
        method: "GET",
        headers: {
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "x-rapidapi-key":
            "c00e7820b4msh8ed6fb408512112p1269e6jsn01948f19398a",
        },
        params: { q: term },
      }).then((res) => res.data)
    );
  };

  let finData;

  searchMovie();

  if (data.data != null) {
    console.log(data.data);
    finData = data.data.d;
  }

  const hitSearch = (e: any) => {
    if (e.key === "Enter") {
      searchMovie();
    }
  };

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
          {data.data != null &&
            finData.map((item: any, pos: any) => {
              return (
                <Col key={pos} md={4}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={item.i.imageUrl} />
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
