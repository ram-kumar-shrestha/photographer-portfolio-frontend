import axiosInstance from "@/axios";
import { AuthEndpoints } from "../../utils/endpoint";
import type { ForgotPasswordProps, ForgotPasswordResponse } from "./type";

export const forgotPasswordService = {
  requestReset: async (
    email: ForgotPasswordProps,
  ): Promise<ForgotPasswordResponse> => {
    const response = await axiosInstance.post<ForgotPasswordResponse>(
      AuthEndpoints.forgotPassword,
      email,
    );
    return response.data;
  },
};
