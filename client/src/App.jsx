import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/App.routes";
import { useEffect } from "react";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      document.title = "Ecommerce admin";
    } else {
      document.title = "Ecommerce";
    }
  }, [pathname]);

  return <AppRoutes />;
};

export default App;
