import axiosInstance from "@/axios";
import { AuthEndpoints } from "../../utils/endpoint";
import type { PostSignupProps, PostSignupResponse } from "./type";

export const signupService = {
  signup: async (credentials: PostSignupProps): Promise<PostSignupResponse> => {
    const response = await axiosInstance.post<PostSignupResponse>(
      AuthEndpoints.signup,
      credentials,
    );
    return response.data;
  },
};
