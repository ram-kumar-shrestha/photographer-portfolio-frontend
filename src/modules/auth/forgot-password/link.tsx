import { Button, Result, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const ResetLink = ({ resetLink }: { resetLink: string | null }) => {
  const navigate = useNavigate();
  if (!resetLink) return null;

  return (
    <Result
      status="success"
      title="Reset Link Sent"
      subTitle="Click the button below to open the reset link directly."
      extra={[
        <>
          <Button key="open" onClick={() => navigate(resetLink)}>
            Open Reset Link
          </Button>
          <Typography.Text
            type="secondary"
            style={{ display: "block", marginTop: "16px" }}
          >
            {`${window.location.origin}${resetLink}`}
          </Typography.Text>
        </>,
      ]}
    />
  );
};

export default ResetLink;
