import { useState, useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu, MenuProps } from "antd";
import LayoutStyled from "./styled";

const { Sider } = Layout;

interface LayoutProps {
  routes: {
    path: string;
    name: string;
    showOnSideBar?: boolean;
  }[];
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key): MenuItem {
  return {
    key,
    label,
  } as MenuItem;
}

const PageLayout: React.FC<LayoutProps> = (props) => {
  const { routes } = props;
  const location = useLocation();
  const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(false);

  const handleSiderCollapse = (collapsed: boolean) => {
    setIsSiderCollapsed(collapsed);
  };

  const menuKey = isSiderCollapsed ? "collapsed" : "expanded";

  const sideBarRoute = useMemo(() => {
    return routes.filter((item) => item.showOnSideBar);
  }, [routes]);

  const menuItems = useMemo(() => {
    return sideBarRoute.map((route) => {
      return getItem(<Link to={route.path}>{route.name}</Link>, route.path);
    });
  }, [sideBarRoute]);

  const selectedRouteMenuItem = useMemo(() => {
    const selectedPath = location.pathname.split("/")[1];
    return ["/" + selectedPath];
  }, [location.pathname]);

  return (
    <LayoutStyled>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className="ant-sider"
          breakpoint="lg"
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
            items={menuItems}
          />
        </Sider>

        <Layout className="site-layout">
          <Outlet />
        </Layout>
      </Layout>
    </LayoutStyled>
  );
};

export default PageLayout;
