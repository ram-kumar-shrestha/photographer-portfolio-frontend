import { useAction, type UseActionReturn } from "@/modules/hooks/useAction";
import { message } from "antd";
import { profileService } from "../../auth/services/profile/api";
import type { UpdateProfileProps } from "../../auth/services/profile/type";

export const useUpdateProfile = (
  id?: string,
): UseActionReturn<UpdateProfileProps> => {
  const handleUpdateProfile = async (data: UpdateProfileProps) => {
    const response = await profileService.updateProfile(data, id);

    message.success(response.message || "Profile updated successfully!");

    // Update user in localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem("user", JSON.stringify({ ...user, name: data.name }));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("profileUpdated"));
  };

  const { loading, error, action } = useAction(handleUpdateProfile);

  return { loading, error, action };
};
