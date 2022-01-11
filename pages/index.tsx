import type { NextPage } from "next";
import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "tailwindcss/tailwind.css";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const hitSearch = () => {
    if (term.trim() !== "") {
      axios
        .get("/api/movie", { params: { name: term.toLowerCase() } })
        .then((res) => {
          if (res.data.movies) {
            setMovies([]);
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
    <div className="min-h-screen bg-back-g overflow-hidden">
      <nav>
        <div className="flex justify-between items-center my-0 mx-3 px-3">
          <motion.div
            className="flex items-center py-8 cursor-pointer"
            whileHover={{
              y: [0, -20, 20, -20, 0],
              transition: { duration: 1 },
            }}
          >
            <motion.svg
              initial={{ rotate: -270 }}
              animate={{ rotate: 0, transition: { duration: 0.6 } }}
              className="w-12 mr-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, transition: { duration: 1.2 } }}
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              ></motion.path>
            </motion.svg>
            <motion.h1
              initial={{ y: -1000 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 70 }}
              className="text-4xl text-white"
            >
              Movie App
            </motion.h1>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.07, transition: { duration: 0.3 } }}
            className="flex h-10 bg-search-bar items-center p-2 w-64 justify-evenly rounded-3xl "
          >
            <input
              className="bg-transparent border-none outline-none"
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
          </motion.div>
        </div>
      </nav>
      <Row>
        {movies[0] !== undefined &&
          movies.map((item: any, pos: any) => {
            return (
              <Col key={pos} md={4}>
                <motion.div
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.1}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  style={{ width: "18rem" }}
                  className="w-4/12 m-auto overflow-hidden rounded-3xl bg-card-cont my-2 cursor-pointer shadow-lg hover:shadow-xl"
                >
                  {item.i && (
                    <div
                      style={{
                        backgroundImage: `url(${item.i.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}
                      className="w-full h-96"
                    ></div>
                  )}
                  <div className="py-6 px-6 text-white">
                    <h4 className="my-1">{item.l}</h4>
                    <Row className="my-1">
                      <Col>
                        <p>{item.rank}</p>
                      </Col>

                      <Col>
                        <p>{item.y}</p>
                      </Col>
                    </Row>
                    <a
                      className="my-1"
                      target="_blank"
                      href={`https://www.imdb.com/find?q=${item.l}`}
                    >
                      <Button variant="primary">Read More</Button>
                    </a>
                  </div>
                </motion.div>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Home;
