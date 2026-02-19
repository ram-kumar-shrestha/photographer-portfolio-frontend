import { Modal } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AlbumUrl } from "../utils/url";
import { useAlbums } from "./useAlbumData";
import { useDeleteAlbum } from "./useAlbumMutations";

export const useAlbumList = () => {
  const navigate = useNavigate();
  const { albums, loading, refetch } = useAlbums();
  const { loading: deleteLoading, action: deleteAlbum } = useDeleteAlbum();

  const currentUser = useMemo(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }, []);

  const handleDelete = (albumId: string) => {
    Modal.confirm({
      title: "Delete Album",
      content: "Are you sure you want to delete this album?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        await deleteAlbum(albumId);
        refetch();
      },
    });
  };

  const handleEdit = (albumId: string) => {
    navigate(AlbumUrl.editAlbum + albumId);
  };

  const handleView = (albumId: string) => {
    navigate(AlbumUrl.viewAlbum + albumId);
  };

  const handleAddAlbum = () => {
    navigate(AlbumUrl.addAlbum);
  };

  const isOwner = (albumUserId: string) => {
    return currentUser && albumUserId === currentUser.id;
  };

  return {
    albums,
    loading,
    deleteLoading,
    currentUser,
    handleDelete,
    handleEdit,
    handleView,
    handleAddAlbum,
    isOwner,
  };
};
