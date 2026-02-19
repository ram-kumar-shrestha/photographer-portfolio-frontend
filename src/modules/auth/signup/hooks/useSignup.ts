import { AlbumUrl } from "@/modules/albums/utils/url";
import { useAction, type UseActionReturn } from "@/modules/hooks/useAction";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/signup/api";
import type { PostSignupProps } from "../../services/signup/type";

export const useSignup = (): UseActionReturn<PostSignupProps> => {
  const navigate = useNavigate();
  const signup = async (credentials: PostSignupProps) => {
    const { data } = (await signupService.signup(credentials)) ?? {};

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate(AlbumUrl.albums);
  };
  const { loading, error, action } = useAction(signup);

  return { loading, error, action };
};
