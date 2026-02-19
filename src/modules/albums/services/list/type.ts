import type { GenericReponse } from "@/modules/utils/type";

export type Album = {
  id: string;
  title: string;
  category: string;
  description: string;
  photos: string[];
  user: { id: string };
  createdAt: string;
  updatedAt: string;
};

export type GetAlbumsResponse = {
  data: Album[];
  message: string;
};

export type GetAlbumResponse = GenericReponse<Album>;

export type CreateAlbumProps = {
  title: string;
  category: string;
  description: string;
  photos?: File[];
};

export type UpdateAlbumProps = {
  title: string;
  category: string;
  description: string;
  photos?: File[];
  removePhotos?: string[];
};

export type CreateAlbumResponse = GenericReponse<Album>;

export type UpdateAlbumResponse = GenericReponse<Album>;

export type DeleteAlbumResponse = GenericReponse<{ message: string }>;

export const AlbumFormKey = {
  title: "title",
  category: "category",
  description: "description",
  photos: "photos",
};
