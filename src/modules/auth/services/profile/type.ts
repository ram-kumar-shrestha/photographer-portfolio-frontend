import type { GenericReponse } from "@/modules/utils/type";

export type UpdateProfileProps = {
  name: string;
  newPassword?: string;
};

export const ProfileFormKey = {
  name: "name",
  newPassword: "newPassword",
};

export type UpdateProfileResponse = GenericReponse<{
  user: {
    id: string;
    name: string;
    email: string;
  };
}>;

export type ChangePasswordResponse = GenericReponse<{
  message: string;
}>;
