import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Grid,
  Input,
  Row,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { AuthUrl } from "../utils/url";

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const { md: isLargerScreen } = Grid.useBreakpoint();

  const onFinish = async (values: LoginFormValues) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100dvh",
      }}
    >
      <Col xs={22} sm={18} md={12} lg={8} xl={6}>
        <Card>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <Title level={2} style={{ marginBottom: "8px" }}>
              Welcome
            </Title>
            <Text type="secondary">Sign in to your account</Text>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                // loading={loading}
                style={{ marginTop: "8px" }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Flex
            justify={isLargerScreen ? "space-between" : "center"}
            align="center"
            wrap
            style={{ width: "100%" }}
          >
            <Text type="secondary">
              Don't have an account? <Link to={AuthUrl.signUp}>Sign up</Link>
            </Text>
            <Link to={AuthUrl.forgotPassword}>Forgot password?</Link>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
