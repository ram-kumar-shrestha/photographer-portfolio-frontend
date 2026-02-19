import { LockOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Result,
  Row,
  Typography,
} from "antd";
import { useSearchParams } from "react-router-dom";
import ConfirmPassword from "../components/confirm-password";
import { ResetPasswordFormKey } from "../services/reset-password/type";
import { useResetPassword } from "./hooks/useResetPassword";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const { loading, error, action: resetPassword } = useResetPassword();
  const [form] = Form.useForm();

  const token = searchParams.get("token");

  if (!token) {
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
            <Result
              status="error"
              title="Invalid Reset Link"
              subTitle="The reset link is invalid or has expired. Please request a new one."
            />
          </Card>
        </Col>
      </Row>
    );
  }

  const handleSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    await resetPassword({ token, newPassword: values.newPassword });
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
              Reset Password
            </Title>
            <Text type="secondary">Enter your new password</Text>
          </div>

          <Form
            form={form}
            name="reset-password"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            autoComplete="off"
          >
            <Form.Item
              name={ResetPasswordFormKey.newPassword}
              label="New Password"
              rules={[
                { required: true, message: "Please input your new password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your new password"
              />
            </Form.Item>

            <ConfirmPassword
              passwordFieldName={ResetPasswordFormKey.newPassword}
            />

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                style={{ marginTop: "8px" }}
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>

          {error && (
            <Flex justify="center" style={{ marginTop: "16px" }}>
              <Text type="danger">{error}</Text>
            </Flex>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPassword;
