import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Form, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import ConfirmPassword from "../components/confirm-password";
import { SignupFormKey } from "../services/signup/type";
import { AuthUrl } from "../utils/url";
import { useSignup } from "./hooks/useSignup";

const { Title, Text } = Typography;

const SignUp = () => {
  const { loading, action: signup } = useSignup();

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
              Create Account
            </Title>
            <Text type="secondary">Sign up for a new account</Text>
          </div>

          <Form
            name="signup"
            onFinish={signup}
            layout="vertical"
            size="large"
            autoComplete="off"
          >
            <Form.Item
              name={SignupFormKey.name}
              label="Name"
              rules={[
                { required: true, message: "Please input your name!" },
                { min: 2, message: "Name must be at least 2 characters!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              name={SignupFormKey.email}
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name={SignupFormKey.password}
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

            <ConfirmPassword passwordFieldName={SignupFormKey.password} />

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                style={{ marginTop: "8px" }}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <Flex justify="center" align="center" style={{ width: "100%" }}>
            <Text type="secondary">
              Already have an account? <Link to={AuthUrl.signIn}>Sign in</Link>
            </Text>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUp;
