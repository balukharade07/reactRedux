import axios from "axios";
import React, { Component } from "react";

 class Home extends Component {
  componentDidMount() {
    const userData = axios.get("https://jsonplaceholder.typicode.com/users");
    const userPosts = axios.get("https://jsonplaceholder.typicode.com/posts");
    Promise.all([userData, userPosts])
      .then((res) => {
        return Promise.all(res.map((item) => item.data));
      })
      .then(([userData, userPosts]) => {
        console.log("userData", userData);
        console.log("userPosts", userPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return <>
      <h2>Promise All</h2>
      <iframe 
        width="1200" 
        height="550" 
        allowFullScreen={true} 
        src="https://www.youtube.com/embed/_TjtAyMkiTI?si=sNiEZSg6NFLFHy1v" 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin"
      >
      </iframe>
    </>;
  }
}

export default Home;