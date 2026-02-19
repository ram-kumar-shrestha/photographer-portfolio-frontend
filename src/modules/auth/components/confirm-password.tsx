import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

interface ConfirmPasswordProps {
  passwordFieldName: string;
  label?: string;
  placeholder?: string;
  optional?: boolean;
}

const ConfirmPassword = ({
  passwordFieldName,
  label = "Confirm Password",
  placeholder = "Confirm your password",
  optional = false,
}: ConfirmPasswordProps) => {
  return (
    <Form.Item
      name="confirmPassword"
      label={label}
      dependencies={[passwordFieldName]}
      rules={[
        ({ getFieldValue }) => ({
          validator(_, value) {
            const password = getFieldValue(passwordFieldName);

            if (optional && !password) {
              return Promise.resolve();
            }

            if (password && !value) {
              return Promise.reject(new Error("Please confirm your password!"));
            }

            if (value && value.length < 6) {
              return Promise.reject(
                new Error("Password must be at least 6 characters!"),
              );
            }

            if (value && password !== value) {
              return Promise.reject(new Error("Passwords do not match!"));
            }

            return Promise.resolve();
          },
        }),
      ]}
    >
      <Input.Password prefix={<LockOutlined />} placeholder={placeholder} />
    </Form.Item>
  );
};

export default ConfirmPassword;
