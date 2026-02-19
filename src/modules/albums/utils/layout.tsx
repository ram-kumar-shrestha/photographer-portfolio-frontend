import { AuthUrl } from "@/modules/auth/utils/url";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const AlbumLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user || !user.name) {
      //can be also used accessToken check
      navigate("/");
    }
  }, [navigate, user]);

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Layout style={{ backgroundColor: "transparent" }}>
      <Header style={{ backgroundColor: "transparent" }}>
        <Flex justify="space-between">
          Hi, {user.name}
          <Space>
            <Link to={AuthUrl.profile} style={{ color: "#111" }}>
              Profile
            </Link>
            <Button icon={<LogoutOutlined />} onClick={handleLogOut}>
              Logout
            </Button>
          </Space>
        </Flex>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};
