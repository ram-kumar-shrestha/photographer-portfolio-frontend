import type { GenericReponse } from "@/modules/utils/type";

export type Album = {
  id: string;
  title: string;
  category: string;
  description: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
};

export type GetAlbumsResponse = {
  data: Album[];
  message: string;
};

export type GetAlbumResponse = GenericReponse<Album>;
