import { MailOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { ForgotPasswordFormKey } from "../services/forgot-password/type";
import { AuthUrl } from "../utils/url";
import { useForgotPassword } from "./hooks/useForgotPassword";
import ResetLink from "./link";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const { loading, resetLink, action: requestReset } = useForgotPassword();

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100dvh",
        }}
      >
        <Col xs={22} sm={18} md={12} lg={8} xl={6}>
          <Alert
            type="info"
            message="For demonstration purposes, the reset link will be displayed on the screen after submission. In a real application, this link would be sent to the user's email address."
            showIcon
            style={{ marginBottom: "16px" }}
          />
          <Card>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <Title level={2} style={{ marginBottom: "8px" }}>
                Forgot Password
              </Title>
              <Text type="secondary">
                Enter your email to receive a password reset link
              </Text>
            </div>

            <Form
              name="forgot-password"
              onFinish={requestReset}
              layout="vertical"
              size="large"
              autoComplete="off"
            >
              <Form.Item
                name={ForgotPasswordFormKey.email}
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Enter your email"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  style={{ marginTop: "8px" }}
                >
                  Send Reset Link
                </Button>
              </Form.Item>
              {resetLink && <ResetLink resetLink={resetLink} />}
            </Form>

            <Flex justify="center" style={{ width: "100%" }}>
              <Text type="secondary">
                Remember your password? <Link to={AuthUrl.signIn}>Sign in</Link>
              </Text>
            </Flex>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
