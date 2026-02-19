import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

interface ConfirmPasswordProps {
  passwordFieldName: string;
  label?: string;
  placeholder?: string;
}

const ConfirmPassword = ({
  passwordFieldName,
  label = "Confirm Password",
  placeholder = "Confirm your password",
}: ConfirmPasswordProps) => {
  return (
    <Form.Item
      name="confirmPassword"
      label={label}
      dependencies={[passwordFieldName]}
      rules={[
        { required: true, message: "Please confirm your password!" },
        { min: 6, message: "Password must be at least 6 characters!" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue(passwordFieldName) === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Passwords do not match!"));
          },
        }),
      ]}
    >
      <Input.Password prefix={<LockOutlined />} placeholder={placeholder} />
    </Form.Item>
  );
};

export default ConfirmPassword;
