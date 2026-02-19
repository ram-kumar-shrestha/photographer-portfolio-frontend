import axiosInstance from "@/axios";
import { AuthEndpoints } from "../../utils/endpoint";
import type { UpdateProfileProps, UpdateProfileResponse } from "./type";

export const profileService = {
  updateProfile: async (
    data: UpdateProfileProps,
    userId?: string,
  ): Promise<UpdateProfileResponse> => {
    const response = await axiosInstance.patch<UpdateProfileResponse>(
      AuthEndpoints.profile + `/${userId}`,
      data,
    );
    return response.data;
  },
};
