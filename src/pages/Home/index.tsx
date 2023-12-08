import React from "react";
import HomeStyled from "./styled";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <HomeStyled>
      <div className="container">
        <p>Welcome to Rick and Morty's contact list</p>
        <p>
          Click here to go to <Link to="/contact">Contacts</Link>
        </p>
      </div>
    </HomeStyled>
  );
};

export default Home;
