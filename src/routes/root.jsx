import { Outlet, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Root() {
  return (
    <>
      <div id="searchbar">
        <SearchBar />
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
