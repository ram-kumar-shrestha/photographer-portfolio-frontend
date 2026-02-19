import axiosInstance from "@/axios";
import type { GetAlbumsResponse } from "./type";

const AlbumEndpoints = {
  albums: "/albums",
};

export const getAlbums = async (): Promise<GetAlbumsResponse> => {
  const response = await axiosInstance.get<GetAlbumsResponse>(
    AlbumEndpoints.albums,
  );
  return response.data;
};
