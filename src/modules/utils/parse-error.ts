import { AxiosError } from "axios";

export const parseError = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof AxiosError) {
    const response = error.response;
    if (response) {
      const responseData = response.data;
      if (Array.isArray(responseData) && responseData.length > 0) {
        return (
          responseData[0]?.errors?.issues?.[0]?.message ||
          responseData[0]?.message ||
          "An error occurred"
        );
      }
      return responseData?.message || "An error occurred";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Try again later.";
};
