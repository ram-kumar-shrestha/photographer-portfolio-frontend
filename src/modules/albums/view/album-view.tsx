import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Carousel,
  Col,
  Empty,
  Flex,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAlbum } from "../hooks/useAlbums";
import { AlbumUrl } from "../utils/url";

const { Title, Paragraph, Text } = Typography;

const AlbumView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { album, loading } = useAlbum(id || "");

  if (loading) {
    return (
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!album) {
    return (
      <div style={{ padding: "24px" }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(AlbumUrl.albums)}
          style={{ marginBottom: "24px" }}
        >
          Back to Albums
        </Button>
        <Empty description="Album not found" />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(AlbumUrl.albums)}
        style={{ marginBottom: "24px" }}
      >
        Back to Albums
      </Button>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={14}>
          {album.photos.length > 0 ? (
            <Carousel autoplay arrows infinite dotPlacement="bottom">
              {album.photos.map((photo, index) => (
                <div key={index + photo}>
                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      height: "500px",
                    }}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${photo}`}
                      alt={`${album.title} - Photo ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Flex>
                </div>
              ))}
            </Carousel>
          ) : (
            <Empty description="No photos in this album" />
          )}
        </Col>

        <Col xs={24} lg={10}>
          <Card>
            <Space orientation="vertical">
              <Title level={2} style={{ marginBottom: "8px" }}>
                {album.title}
              </Title>
              <Text
                type="secondary"
                style={{
                  fontSize: "16px",
                  display: "block",
                  marginBottom: "24px",
                }}
              >
                {album.category}
              </Text>
              <>
                <Title level={5} style={{ marginBottom: "8px" }}>
                  Description
                </Title>
                <Paragraph>{album.description}</Paragraph>
              </>
              <Text type="secondary">
                <strong>{album.photos.length}</strong> photos in this album
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Last updated: {new Date(album.updatedAt).toLocaleString()}
              </Text>{" "}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AlbumView;
