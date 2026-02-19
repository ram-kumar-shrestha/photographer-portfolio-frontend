import { useAction, type UseActionReturn } from "@/modules/hooks/useAction";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { resetPasswordService } from "../../services/reset-password/api";
import { AuthUrl } from "../../utils/url";

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export const useResetPassword = (): UseActionReturn<ResetPasswordPayload> => {
  const navigate = useNavigate();

  const handleReset = async (payload: ResetPasswordPayload) => {
    const response = await resetPasswordService.resetPassword(payload);

    message.success(response.message);

    // Redirect to signin after 2 seconds
    setTimeout(() => {
      navigate(AuthUrl.signIn);
    }, 2000);
  };

  const { loading, error, action } = useAction(handleReset);

  return { loading, error, action };
};
