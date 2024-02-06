import MainContent from "../src/components/MainContent";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter className="app-main">
      <Header />
      <MainContent />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
