import type { GenericReponse } from "@/modules/utils/type";

export type UpdateProfileProps = {
  name: string;
  newPassword?: string;
};

export const ProfileFormKey = {
  name: "name",
  newPassword: "newPassword",
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type UpdateProfileResponse = GenericReponse<{
  user: User;
}>;

export type ChangePasswordResponse = GenericReponse<{
  message: string;
}>;
