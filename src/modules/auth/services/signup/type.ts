import type { GenericReponse } from "@/modules/utils/type";
import type { User } from "../profile/type";

export type PostSignupProps = {
  name: string;
  email: string;
  password: string;
};

export const SignupFormKey: Required<{ [K in keyof PostSignupProps]: K }> = {
  name: "name",
  email: "email",
  password: "password",
};

export type PostSignupResponse = GenericReponse<{
  accessToken: string;
  user: User;
}>;
