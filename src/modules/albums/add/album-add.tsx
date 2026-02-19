import {
  ArrowLeftOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Form, Image, Input, Row, Spin, Upload } from "antd";
import type { UploadFile } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlbum, useCreateAlbum, useUpdateAlbum } from "../hooks/useAlbums";
import { AlbumFormKey } from "../services/list/type";
import { AlbumUrl } from "../utils/url";

const AlbumAddEdit = () => {
  const { id } = useParams<{ id: string }>();
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

  return (
    <div style={{ padding: "24px" }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() =>
          navigate(isEditMode ? AlbumUrl.viewAlbum + id : AlbumUrl.albums)
        }
        style={{ marginBottom: "24px" }}
      >
        Back to {isEditMode ? "Album" : "Albums"}
      </Button>

      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card>
            <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
              {isEditMode ? "Edit Album" : "Create New Album"}
            </h2>

            <Spin spinning={isLoading}>
              <Form
                form={form}
                name="album"
                onFinish={handleSubmit}
                layout="vertical"
                size="large"
                autoComplete="off"
              >
                <Form.Item
                  name={AlbumFormKey.title}
                  label="Title"
                  rules={[
                    { required: true, message: "Please input album title!" },
                    {
                      min: 2,
                      message: "Title must be at least 2 characters!",
                    },
                    {
                      max: 100,
                      message: "Title must not exceed 100 characters!",
                    },
                  ]}
                >
                  <Input placeholder="Enter album title" />
                </Form.Item>

                <Form.Item
                  name={AlbumFormKey.category}
                  label="Category"
                  rules={[
                    {
                      required: true,
                      message: "Please input album category!",
                    },
                    {
                      min: 2,
                      message: "Category must be at least 2 characters!",
                    },
                    {
                      max: 50,
                      message: "Category must not exceed 50 characters!",
                    },
                  ]}
                >
                  <Input placeholder="Enter album category" />
                </Form.Item>

                <Form.Item
                  name={AlbumFormKey.description}
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Please input album description!",
                    },
                    {
                      min: 10,
                      message: "Description must be at least 10 characters!",
                    },
                    {
                      max: 1000,
                      message: "Description must not exceed 1000 characters!",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Enter album description"
                    rows={5}
                  />
                </Form.Item>

                {isEditMode && existingPhotos.length > 0 && (
                  <Form.Item label="Existing Photos">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(100px, 1fr))",
                        gap: "8px",
                      }}
                    >
                      <Image.PreviewGroup>
                        {existingPhotos.map((photo) => (
                          <div
                            key={photo}
                            style={{
                              position: "relative",
                              width: "100px",
                              height: "100px",
                            }}
                          >
                            <Image
                              src={`${import.meta.env.VITE_API_BASE_URL}${photo}`}
                              alt="Album photo"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                            <Button
                              danger
                              size="small"
                              icon={<CloseOutlined />}
                              onClick={() => handleRemoveExistingPhoto(photo)}
                              style={{
                                position: "absolute",
                                top: "4px",
                                right: "4px",
                              }}
                            />
                          </div>
                        ))}
                      </Image.PreviewGroup>
                    </div>
                  </Form.Item>
                )}

                <Form.Item
                  label={isEditMode ? "Add New Photos" : "Photos"}
                  name={AlbumFormKey.photos}
                >
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={({ fileList: newFileList }) =>
                      setFileList(newFileList)
                    }
                    beforeUpload={() => false}
                    multiple
                    accept="image/*"
                  >
                    {fileList.length >= 10 ? null : (
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    block
                    size="large"
                  >
                    {isEditMode ? "Update Album" : "Create Album"}
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AlbumAddEdit;
