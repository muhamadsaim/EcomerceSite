import MainContent from "../src/components/MainContent";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="app-main">
      <BrowserRouter>
        <Header />
        <MainContent />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
