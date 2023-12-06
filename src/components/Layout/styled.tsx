import styled from "styled-components";

const LayoutStyled = styled.div`
  min-height: 100vh;
  .ant-sider {
    position: fixed;
    height: 100vh;
    z-index: 3;
    + .site-layout {
      margin-left: 200px;
    }

    &.ant-layout-sider-below {
      //this css show up on small screen //when the sider collapsible
      + .site-layout {
        margin-left: 0;
      }
    }
    .ant-layout-sider-children {
      overflow: hidden;
    }
  }

  .site-layout {
    background-color: #f6f9fc;
  }

  .title {
    font-size: 18px;
    color: white;
    text-align: center;
  }
`;

export default LayoutStyled;
