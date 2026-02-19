import { message } from "antd";
import { useState } from "react";
import { parseError } from "../utils/parse-error";

export type UseActionReturn<T> = {
  loading: boolean;
  error: string | null;
  action: (data: T) => Promise<void>;
};

export const useAction = <T>(
  fn: (data: T) => Promise<unknown>,
): UseActionReturn<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const action = async (data: T) => {
    try {
      setLoading(true);
      setError(null);

      await fn(data);
    } catch (err: unknown) {
      const errorMessage = parseError(err);
      setError(errorMessage);
      message.error(errorMessage);

      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, action };
};
