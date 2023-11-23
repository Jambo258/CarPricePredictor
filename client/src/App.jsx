import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter} from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import AuthProvider from "./Auth";
import RoutesComponent from "./RoutesComponent";

const App = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <div className="main">
          <RoutesComponent />
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
