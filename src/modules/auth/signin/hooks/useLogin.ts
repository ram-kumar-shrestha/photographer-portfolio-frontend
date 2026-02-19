import { AlbumUrl } from "@/modules/albums/utils/url";
import { useAction, type UseActionReturn } from "@/modules/hooks/useAction";
import { useNavigate } from "react-router-dom";
import { signinService } from "../../services/signin/api";
import type { PostLoginProps } from "../../services/signin/type";

export const useLogin = (): UseActionReturn<PostLoginProps> => {
  const navigate = useNavigate();
  const login = async (credentials: PostLoginProps) => {
    const { data } = (await signinService.login(credentials)) ?? {};

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate(AlbumUrl.albums);
  };
  const { loading, error, action } = useAction(login);

  return { loading, error, action };
};
