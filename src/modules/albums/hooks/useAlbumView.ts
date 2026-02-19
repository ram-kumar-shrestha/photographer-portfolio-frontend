import { Modal } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AlbumUrl } from "../utils/url";
import { useAlbum } from "./useAlbumData";
import { useDeleteAlbum } from "./useAlbumMutations";

export const useAlbumView = (id: string) => {
  const navigate = useNavigate();
  const { album, loading } = useAlbum(id);
  const { loading: deleteLoading, action: deleteAlbum } = useDeleteAlbum();

  const currentUser = useMemo(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }, []);

  const isOwner = useMemo(() => {
    return album && currentUser && album.user.id === currentUser.id;
  }, [album, currentUser]);

  const handleDelete = () => {
    Modal.confirm({
      title: "Delete Album",
      content: "Are you sure you want to delete this album?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        if (id) {
          await deleteAlbum(id);
          navigate(AlbumUrl.albums);
        }
      },
    });
  };

  const handleEdit = () => {
    if (id) {
      navigate(AlbumUrl.editAlbum + id);
    }
  };

  const handleBackToAlbums = () => {
    navigate(AlbumUrl.albums);
  };

  return {
    album,
    loading,
    deleteLoading,
    isOwner,
    handleDelete,
    handleEdit,
    handleBackToAlbums,
  };
};
