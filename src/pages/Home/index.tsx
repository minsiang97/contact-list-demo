import React from "react";
import HomeStyled from "./styled";
import { useNavigate } from "react-router-dom";
import { rnm_wallpaper } from "../../images";
import { Button } from "antd";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <HomeStyled>
      <div
        className="container"
        style={{
          backgroundImage: `url(${rnm_wallpaper})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Button className="contact-button" type="primary" onClick={() => navigate("/contact")} size="large">
          Click here to go to Contact
        </Button>
      </div>
    </HomeStyled>
  );
};

export default Home;
