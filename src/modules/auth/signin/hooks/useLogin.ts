import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseError } from "../../../utils/parse-error";
import { signinService } from "../../services/signin/api";
import type { PostLoginProps } from "../../services/signin/type";

interface UseLoginReturn {
  loading: boolean;
  error: string | null;
  login: (credentials: PostLoginProps) => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (credentials: PostLoginProps) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = (await signinService.login(credentials)) ?? {};

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/profiles");
    } catch (err: unknown) {
      const errorMessage = parseError(err);
      setError(errorMessage);
      message.error(errorMessage);

      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};
