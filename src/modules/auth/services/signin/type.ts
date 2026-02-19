import type { GenericReponse } from "@/modules/utils/type";

export type PostLoginProps = {
  email: string;
  password: string;
};
export const LoginFormKey: Required<{ [K in keyof PostLoginProps]: K }> = {
  email: "email",
  password: "password",
};

export type PostLoginResponse = GenericReponse<{
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}>;
