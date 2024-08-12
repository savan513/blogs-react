import { BrowserRouter,Route, Routes } from "react-router-dom";
import BlogList from "./BlogList";
import Blog from "./Blog";
import Admin from "./Admin";

function App() {

  return (
    <>
<BrowserRouter>
      <Routes>
        <Route exact path="/" element={<BlogList/>}></Route>
        <Route exact path="/blog/:id" element={<Blog/>}></Route>
        <Route exact path="/admin" element={<Admin/>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
