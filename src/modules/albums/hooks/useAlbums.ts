import { useAction } from "@/modules/hooks/useAction";
import { message } from "antd";
import { useEffect, useState } from "react";
import {
  createAlbum,
  deleteAlbum,
  getAlbum,
  getAlbums,
  updateAlbum,
} from "../services/list/api";
import type {
  Album,
  CreateAlbumProps,
  UpdateAlbumProps,
} from "../services/list/type";

export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  const fetchAlbumsAction = async () => {
    const response = await getAlbums();
    setAlbums(response.data);
  };

  const {
    loading,
    error,
    action: fetchAlbums,
  } = useAction(() => fetchAlbumsAction());

  useEffect(() => {
    fetchAlbums(undefined as never);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    albums,
    loading,
    error,
    refetch: () => fetchAlbums(undefined as never),
  };
};

export const useAlbum = (id: string) => {
  const [album, setAlbum] = useState<Album | null>(null);

  const fetchAlbumAction = async () => {
    const response = await getAlbum(id);
    setAlbum(response.data);
  };

  const {
    loading,
    error,
    action: fetchAlbum,
  } = useAction(() => fetchAlbumAction());

  useEffect(() => {
    if (id) {
      fetchAlbum(undefined as never);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    album,
    loading,
    error,
    refetch: () => fetchAlbum(undefined as never),
  };
};

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
