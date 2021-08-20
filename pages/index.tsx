import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect } from "react";
const Home: NextPage = () => {

  let data: any;

  const term = 'thor';
  const url = 'https://imdb8.p.rapidapi.com/auto-complete';

  const searchMovie = async () =>{
     data = useSWR([url, term], () => axios({
      url: 'https://imdb8.p.rapidapi.com/auto-complete',
      // withCredentials: true,
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': 'c00e7820b4msh8ed6fb408512112p1269e6jsn01948f19398a'
      },
      params: { q: term }
    }).then(res => res.data))
  }

  // const data = useSWR(options.url, fetcher);

  // let finData = data.data.d;

  // useEffect(()=>{
    searchMovie();
  // },[]);

  // if(data.data){
  //   console.log(data.data);
  // }

  return (
    <div>
      <nav>
        <h1>Movie App</h1>
        {/* {
          finData && finData.map((item: any) =>{
            return(
              <img src={item.i.imageUrl} alt=""/>
            )
          })
        } */}
      </nav>
    </div>
  );
};

export default Home;
