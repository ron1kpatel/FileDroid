import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload";
import ShowDownload from "./pages/ShowDownload";
import MainLogo from "./components/MainLogo";
import DarkModeToggle from "./components/DarkModeToggle";
import NotFound from "./pages/NotFound";
function App() {
  
  return (
    <>
    <div className="App">
      <Router>
      <MainLogo />
      <DarkModeToggle/>
        <Routes>
          <Route exact path="/" element={<Upload />} />
          <Route
            exact
            path="/files/download/:ufid"
            element={<ShowDownload />}
          />
        
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
