import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import NewBlog from "./Components/NewBlog";
import { ElaboratedBlog } from "./Components/ElaboratedBlog";
import { EditBlog } from "./Components/EditBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/newBlog"
          element={
            <NewBlog
              title=""
              description=""
              markdown=""
              publish={true}
              id={-1}
            />
          }
        ></Route>
        <Route path="/blog/:id" element={<ElaboratedBlog />}></Route>
        <Route path="/editBlog/:id" element={<EditBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
