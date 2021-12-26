import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const movieApi = axios.create({
  baseURL: "https://imdb8.p.rapidapi.com/auto-complete",
  headers: {
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "x-rapidapi-key": "c00e7820b4msh8ed6fb408512112p1269e6jsn01948f19398a",
  },
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise<void>((resolve, reject) => {
    let data = req.query;
    let key = data.name;
    movieApi
      .get("/", { params: { q: key } })
      .then((resP) => {
        if (resP.data) {
          res.status(200).json({ movies: resP.data.d });
        } else {
          console.log("Error");
          console.log(data);
          res.status(404).json({ msg: "Movies not found" });
        }
        resolve();
      })
      .catch((err) => {
        if (err) {
          res.status(500).json({ msg: "Internal server error" });
          res.end();
          resolve();
        }
      });
  });
}
