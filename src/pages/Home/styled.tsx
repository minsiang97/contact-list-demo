import styled from "styled-components";

const HomeStyled = styled.div`
  min-height: 100vh;
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    .contact-button {
      position: absolute;
      bottom: 20%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export default HomeStyled;
