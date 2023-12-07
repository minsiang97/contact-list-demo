import styled from "styled-components";

const ContactDetailStyled = styled.div`
  height: 100vh;
  overflow-y: auto;
  background-color: #f6f9fc;

  .site-header {
    background-color: white;
    padding: 16px;
    height: fit-content;
    border-bottom: 1px solid #d9d9d9;

    .back-button {
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 5px;
      margin: 0px;
      border: 1px solid #d9d9d9;
      display: flex;
      cursor: pointer;
    }

    .contact-header {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        max-width: 150px;
        border-radius: 50%;
      }

      .character-name {
        font-size: 18px;
        margin-bottom: 0px;
        margin-top: 0px;
        font-weight: 500;
      }
    }
  }

  .ant-layout-content {
    background-color: #f6f9fc;
  }

  .site-content {
    padding: 16px;

    .personal-details-container {
      background-color: #fff;
      padding: 32px;
      border-radius: 8px;
      margin-bottom: 20px;

      .personal-details {
        border: 1px solid #d9d9d9;
        padding: 20px;
        border-radius: 8px;

        .top-row {
          padding: 0px 16px 16px 16px;
          border-bottom: 1px solid #d9d9d9;
          justify-content: center;
        }

        .middle-row {
          padding: 16px 16px 16px 16px;
          border-bottom: 1px solid #d9d9d9;
          justify-content: center;
        }

        .last-row {
          padding: 16px 16px 0px 16px;
          justify-content: center;
        }
      }
    }
  }
`;

export default ContactDetailStyled;
