import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseError } from "../../../utils/parse-error";
import { signupService } from "../../services/signup/api";
import type { PostSignupProps } from "../../services/signup/type";

interface UseSignupReturn {
  loading: boolean;
  error: string | null;
  signup: (credentials: PostSignupProps) => Promise<void>;
}

export const useSignup = (): UseSignupReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signup = async (credentials: PostSignupProps) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = (await signupService.signup(credentials)) ?? {};

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/profiles");
    } catch (err: unknown) {
      const errorMessage = parseError(err);
      setError(errorMessage);
      message.error(errorMessage);

      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, signup };
};
