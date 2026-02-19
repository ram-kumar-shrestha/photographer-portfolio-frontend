import { useAction } from "@/modules/hooks/useAction";
import { useEffect, useState } from "react";
import { getAlbum, getAlbums } from "../services/list/api";
import type { Album } from "../services/list/type";

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
