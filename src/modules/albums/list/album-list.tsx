import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Flex, Row, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAlbums } from "../hooks/useAlbums";
import { AlbumUrl } from "../utils/url";

const { Title, Text } = Typography;
const { Meta } = Card;

const AlbumList = () => {
  const navigate = useNavigate();
  const { albums, loading } = useAlbums();

  return (
    <div style={{ padding: "24px" }}>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "32px" }}
      >
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            Albums
          </Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate(AlbumUrl.addAlbum)}
            size="large"
          >
            Add Album
          </Button>
        </Col>
      </Row>

      <Spin spinning={loading}>
        {albums.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Empty description="No albums found" />
            <Button
              type="primary"
              onClick={() => navigate(AlbumUrl.addAlbum)}
              style={{ marginTop: "16px" }}
            >
              Create First Album
            </Button>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {albums.map((album) => (
              <Col key={album.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  title={album.title}
                  style={{ height: "100%", cursor: "pointer" }}
                  onClick={() =>
                    navigate(AlbumUrl.viewAlbum.replace(":id", album.id))
                  }
                  cover={
                    album.photos.length > 0 && (
                      <img
                        draggable={false}
                        src={`${import.meta.env.VITE_API_BASE_URL}${album.photos[0]}`}
                        alt={album.title}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "contain",
                        }}
                      />
                    )
                  }
                >
                  <Meta
                    title={album.category}
                    description={album.description}
                  />

                  <Flex
                    justify="space-between"
                    align="center"
                    style={{ marginTop: "16px" }}
                  >
                    <Text
                      type="secondary"
                      style={{ display: "block", marginBottom: "16px" }}
                    >
                      {album.photos.length} photos
                    </Text>
                    <Text type="secondary">
                      {new Date(album.updatedAt).toLocaleString()}
                    </Text>
                  </Flex>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Spin>
    </div>
  );
};

export default AlbumList;
