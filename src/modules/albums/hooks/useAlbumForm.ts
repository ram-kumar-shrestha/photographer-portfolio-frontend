import type { UploadFile } from "antd";
import { Form } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlbumFormKey } from "../services/list/type";
import { AlbumUrl } from "../utils/url";
import { useAlbum } from "./useAlbumData";
import { useCreateAlbum, useUpdateAlbum } from "./useAlbumMutations";

export const useAlbumForm = (id?: string) => {
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [form] = Form.useForm();
  const { album, loading: fetchLoading } = useAlbum(id || "");
  const { loading: createLoading, action: createAlbum } = useCreateAlbum();
  const { loading: updateLoading, action: updateAlbum } = useUpdateAlbum(
    id || "",
  );

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [removePhotos, setRemovePhotos] = useState<string[]>([]);

  const existingPhotos = useMemo(() => {
    if (!album) return [];
    return album.photos.filter((photo) => !removePhotos.includes(photo));
  }, [album, removePhotos]);

  const isLoading = isEditMode ? fetchLoading : false;
  const isSubmitting = isEditMode ? updateLoading : createLoading;

  useEffect(() => {
    if (isEditMode && album) {
      form.setFieldsValue({
        [AlbumFormKey.title]: album.title,
        [AlbumFormKey.category]: album.category,
        [AlbumFormKey.description]: album.description,
      });
    }
  }, [album, form, isEditMode]);

  const handleRemoveExistingPhoto = (photo: string) => {
    setRemovePhotos((prev) => [...prev, photo]);
  };

  const handleFileListChange = (newFileList: UploadFile[]) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values: {
    title: string;
    category: string;
    description: string;
  }) => {
    const photos = fileList.map((file) => file.originFileObj as File);

    if (isEditMode) {
      await updateAlbum({ ...values, photos, removePhotos });
      navigate(AlbumUrl.viewAlbum + id);
    } else {
      await createAlbum({ ...values, photos });
      navigate(AlbumUrl.albums);
    }
  };

  const handleBack = () => {
    navigate(isEditMode ? AlbumUrl.viewAlbum + id : AlbumUrl.albums);
  };

  return {
    form,
    isEditMode,
    isLoading,
    isSubmitting,
    fileList,
    existingPhotos,
    handleSubmit,
    handleRemoveExistingPhoto,
    handleFileListChange,
    handleBack,
  };
};
