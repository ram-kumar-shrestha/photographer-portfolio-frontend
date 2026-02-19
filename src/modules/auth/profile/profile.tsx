import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useEffect, useMemo } from "react";
import ConfirmPassword from "../components/confirm-password";
import { ProfileFormKey } from "../services/profile/type";
import { useUpdateProfile } from "./hooks/useProfile";

const { Title, Text } = Typography;

interface UserData {
  id: string;
  name: string;
  email: string;
}

const Profile = () => {
  const [form] = Form.useForm();
  const userData = useMemo<UserData | null>(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }, []);
  const { loading, action: updateProfile } = useUpdateProfile(userData?.id);

  useEffect(() => {
    if (userData) {
      form.setFieldValue(ProfileFormKey.name, userData.name);
      form.setFieldValue("email", userData.email);
    }
  }, [userData, form]);

  const handleSubmit = async (values: {
    name: string;
    newPassword?: string;
    confirmPassword?: string;
  }) => {
    await updateProfile({
      name: values.name,
      newPassword: values.newPassword,
    });

    // Clear password fields on success
    form.setFieldValue(ProfileFormKey.newPassword, undefined);
    form.setFieldValue("confirmPassword", undefined);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100dvh",
        padding: "20px",
      }}
    >
      <Col xs={22} sm={18} md={12} lg={8} xl={6}>
        <Card>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <Title level={2} style={{ marginBottom: "8px" }}>
              My Profile
            </Title>
            {userData && <Text type="secondary">{userData.email}</Text>}
          </div>

          <Form
            form={form}
            name="profile"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Email is required!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your email"
                disabled
              />
            </Form.Item>

            <Form.Item
              name={ProfileFormKey.name}
              label="Name"
              rules={[
                { required: true, message: "Please input your name!" },
                { min: 2, message: "Name must be at least 2 characters!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your name" />
            </Form.Item>

            <div style={{ marginTop: "24px", marginBottom: "16px" }}>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                (Optional) Leave password fields empty to skip password change
              </Text>
            </div>

            <Form.Item
              name={ProfileFormKey.newPassword}
              label="New Password"
              rules={[]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your new password"
              />
            </Form.Item>

            <ConfirmPassword passwordFieldName={ProfileFormKey.newPassword} />

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ marginTop: "8px" }}
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
