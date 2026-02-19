import axiosInstance from "@/axios";
import { AuthEndpoints } from "../../utils/endpoint";
import type { PostLoginProps, PostLoginResponse } from "./type";

export const signinService = {
  login: async (credentials: PostLoginProps): Promise<PostLoginResponse> => {
    const response = await axiosInstance.post<PostLoginResponse>(
      AuthEndpoints.signin,
      credentials,
    );
    return response.data;
  },
};
