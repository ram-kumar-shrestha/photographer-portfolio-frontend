import { useAction, type UseActionReturn } from "@/modules/hooks/useAction";
import { message } from "antd";
import { useState } from "react";
import { forgotPasswordService } from "../../services/forgot-password/api";
import type { ForgotPasswordProps } from "../../services/forgot-password/type";
import { AuthUrl } from "../../utils/url";

export const useForgotPassword = (): UseActionReturn<ForgotPasswordProps> & {
  resetLink: string | null;
} => {
  const [resetLink, setResetLink] = useState<string | null>(null);
  const requestReset = async (email: ForgotPasswordProps) => {
    const response = await forgotPasswordService.requestReset(email);

    //   the link will be backend url so manipulated here
    const frontendLink =
      response?.data?.link?.split(AuthUrl.resetPassword)[1] ?? null;
    setResetLink(
      frontendLink ? `${AuthUrl.resetPassword}${frontendLink}` : null,
    );
    message.success(response.message);
  };

  const { loading, error, action } = useAction(requestReset);

  return { loading, error, resetLink, action };
};
