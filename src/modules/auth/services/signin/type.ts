import type { GenericReponse } from "@/modules/utils/type";
import type { User } from "../profile/type";

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
  user: User;
}>;
