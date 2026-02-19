import { Route } from "react-router-dom";
import AlbumList from "../list/album-list";
import { AlbumUrl } from "./url";

export const AlbumRoutes = (
  <Route>
    <Route path={AlbumUrl.albums} element={<AlbumList />} />
  </Route>
);
