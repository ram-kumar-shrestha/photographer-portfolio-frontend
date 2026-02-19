import { useAction } from "@/modules/hooks/useAction";
import { message } from "antd";
import { createAlbum, deleteAlbum, updateAlbum } from "../services/list/api";
import type { CreateAlbumProps, UpdateAlbumProps } from "../services/list/type";

export const useCreateAlbum = () => {
  const handleCreateAlbum = async (data: CreateAlbumProps) => {
    const response = await createAlbum(data);
    message.success(response.message || "Album created successfully!");
  };

  const { loading, error, action } = useAction(handleCreateAlbum);

  return { loading, error, action };
};

export const useUpdateAlbum = (id: string) => {
  const handleUpdateAlbum = async (data: UpdateAlbumProps) => {
    const response = await updateAlbum(id, data);
    message.success(response.message || "Album updated successfully!");
  };

  const { loading, error, action } = useAction(handleUpdateAlbum);

  return { loading, error, action };
};

export const useDeleteAlbum = () => {
  const handleDeleteAlbum = async (id: string) => {
    const response = await deleteAlbum(id);
    message.success(response.message || "Album deleted successfully!");
  };

  const { loading, error, action } = useAction(handleDeleteAlbum);

  return { loading, error, action };
};
