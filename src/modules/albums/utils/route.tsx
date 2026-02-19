import { Route } from "react-router-dom";
import AlbumList from "../list/album-list";
import AlbumView from "../view/album-view";
import { AlbumUrl } from "./url";

export const AlbumRoutes = (
  <Route>
    <Route path={AlbumUrl.albums} element={<AlbumList />} />
    <Route path={AlbumUrl.viewAlbum} element={<AlbumView />} />
  </Route>
);
