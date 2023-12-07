import styled from "styled-components";

const ContactListStyled = styled.div`
  .list-container {
    border-right: 1px solid #d9d9d9;
    background-color: #fff;
    height: 100vh;
    overflow-y: scroll;

    .search-bar-container {
      padding: 16px;
      border-bottom: 1px solid #d9d9d9;
      p {
        margin-top: 0px;
      }

      .contact-title {
        font-size: 20px;
      }

      .filter-row {
        margin-top: 10px;
      }
    }

    .selectedContact {
      background-color: #1890ff;
      color: #fff;
    }

    .contact {
      padding: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      img {
        border-radius: 50%;
        width: 100px;
      }

      .character-details {
        margin-left: 10px;
      }
    }
  }
`;

export default ContactListStyled;
