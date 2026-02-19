import axiosInstance from "@/axios";
import type {
  CreateAlbumProps,
  CreateAlbumResponse,
  DeleteAlbumResponse,
  GetAlbumResponse,
  GetAlbumsResponse,
  UpdateAlbumProps,
  UpdateAlbumResponse,
} from "./type";

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

export const createAlbum = async (
  data: CreateAlbumProps,
): Promise<CreateAlbumResponse> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("description", data.description);

  if (data.photos) {
    data.photos.forEach((photo) => {
      formData.append("photos", photo);
    });
  }

  const response = await axiosInstance.post<CreateAlbumResponse>(
    AlbumEndpoints.albums,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const updateAlbum = async (
  id: string,
  data: UpdateAlbumProps,
): Promise<UpdateAlbumResponse> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("description", data.description);

  if (data.photos) {
    data.photos.forEach((photo) => {
      formData.append("photos", photo);
    });
  }

  if (data.removePhotos && data.removePhotos.length > 0) {
    data.removePhotos.forEach((photo) => {
      formData.append("removePhotos", photo);
    });
  }

  const response = await axiosInstance.patch<UpdateAlbumResponse>(
    `${AlbumEndpoints.albums}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const deleteAlbum = async (id: string): Promise<DeleteAlbumResponse> => {
  const response = await axiosInstance.delete<DeleteAlbumResponse>(
    `${AlbumEndpoints.albums}/${id}`,
  );
  return response.data;
};
