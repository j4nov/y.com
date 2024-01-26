import { Outlet } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";

const Layout = () => {
  return (
    <>
      <NavigationMenu />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
