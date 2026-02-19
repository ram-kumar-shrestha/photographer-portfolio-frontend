import { Route } from "react-router-dom";
import AlbumAddEdit from "../add/album-add";
import AlbumList from "../list/album-list";
import AlbumView from "../view/album-view";
import { AlbumUrl } from "./url";

export const AlbumRoutes = (
  <Route>
    <Route path={AlbumUrl.albums} element={<AlbumList />} />
    <Route path={AlbumUrl.addAlbum} element={<AlbumAddEdit />} />
    <Route path={AlbumUrl.viewAlbum + ":id"} element={<AlbumView />} />
    <Route path={AlbumUrl.editAlbum + ":id"} element={<AlbumAddEdit />} />
  </Route>
);
