import type { GenericReponse } from "@/modules/utils/type";

export type ForgotPasswordProps = {
  email: string;
};

export const ForgotPasswordFormKey: Required<{
  [K in keyof ForgotPasswordProps]: K;
}> = {
  email: "email",
};

export interface ForgotPasswordData {
  link: string;
}

export type ForgotPasswordResponse = GenericReponse<ForgotPasswordData>;
