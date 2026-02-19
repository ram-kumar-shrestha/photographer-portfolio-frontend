import { useAction } from "@/modules/hooks/useAction";
import { useEffect, useState } from "react";
import { getAlbums } from "../services/list/api";
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
