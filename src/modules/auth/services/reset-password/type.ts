import type { GenericReponse } from "@/modules/utils/type";

export type ResetPasswordProps = {
  token: string;
  newPassword: string;
};

export const ResetPasswordFormKey: Required<{ newPassword: string }> = {
  newPassword: "newPassword",
};

export type ResetPasswordResponse = GenericReponse<{
  message: string;
}>;
