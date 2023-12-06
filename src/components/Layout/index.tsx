import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import LayoutStyled from "./styled";

const { Sider } = Layout;

interface LayoutProps {
  routes: {
    path: string;
    name: string;
  }[];
  children: React.ReactNode;
}

const PageLayout: React.FC<LayoutProps> = (props) => {
  const { routes } = props;
  const location = useLocation();
  const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(false);

  const handleSiderCollapse = (collapsed: boolean) => {
    setIsSiderCollapsed(collapsed);
  };

  const menuKey = isSiderCollapsed ? "collapsed" : "expanded";

  const selectedRouteMenuItem = useMemo(() => {
    const selected = routes.find((route) => route.path.includes(location.pathname));

    return [selected?.path + ""];
  }, [location.pathname, routes]);

  return (
    <LayoutStyled>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className="ant-sider"
          breakpoint="md"
          collapsedWidth="0"
          collapsed={isSiderCollapsed}
          onCollapse={handleSiderCollapse}
        >
          <div>
            <p className="title">Rick and Morty</p>
          </div>
          <Menu
            key={menuKey}
            theme="dark"
            mode="inline"
            selectedKeys={selectedRouteMenuItem}
            inlineCollapsed={isSiderCollapsed}
          >
            {routes.map((item) => {
              return (
                <Menu.Item key={item.path}>
                  <Link to={item.path}>{item.name}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <div className="page-content">{props.children}</div>
        </Layout>
      </Layout>
    </LayoutStyled>
  );
};

export default PageLayout;
