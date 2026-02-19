import axiosInstance from "@/axios";
import { AuthEndpoints } from "../../utils/endpoint";
import type { ResetPasswordProps, ResetPasswordResponse } from "./type";

export const resetPasswordService = {
  resetPassword: async (
    data: ResetPasswordProps,
  ): Promise<ResetPasswordResponse> => {
    const response = await axiosInstance.post<ResetPasswordResponse>(
      AuthEndpoints.resetPassword,
      data,
    );
    return response.data;
  },
};
