import axiosInstance from "@/axios";
import type { GetAlbumsResponse, GetAlbumResponse } from "./type";

const AlbumEndpoints = {
  albums: "/albums",
};

export const getAlbums = async (): Promise<GetAlbumsResponse> => {
  const response = await axiosInstance.get<GetAlbumsResponse>(
    AlbumEndpoints.albums,
  );
  return response.data;
};

export const getAlbum = async (id: string): Promise<GetAlbumResponse> => {
  const response = await axiosInstance.get<GetAlbumResponse>(
    `${AlbumEndpoints.albums}/${id}`,
  );
  return response.data;
};
