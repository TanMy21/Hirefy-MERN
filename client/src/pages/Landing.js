import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import {Logo} from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            tristique maximus sem ac pretium. Vestibulum fringilla faucibus
            blandit. Quisque id vulputate orci. Etiam in tempor mi, nec
            vulputate mi. Nunc convallis bibendum rutrum. Aenean nec viverra
            justo. Etiam faucibus risus urna, quis euismod ligula varius vitae.
            Maecenas eu ante nunc.
          </p>
          <Link to="/register" className="btn btn-hero">Login/Register</Link>
        </div>
      </div>
      <img src={main} alt="job hunt" className="img main-img" />
    </Wrapper>
  );
};



export default Landing;
