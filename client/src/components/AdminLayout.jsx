import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const AdminLayout = () => {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <div>Que haces aqui?</div>;
  } else {
    return (
      <div className="bg-slate-400 h-screen flex">
        <Nav />
        <div className="bg-slate-200 flex-grow my-4 mr-4 rounded-lg p-4">
          <Outlet />
        </div>
      </div>
    );
  }
};

export default AdminLayout;
