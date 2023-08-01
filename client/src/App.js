import { Container } from "@mui/material";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
// import WebSocketComponent from "./components/WebSocket"

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts"/>}></Route>
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts" />}></Route>
        </Routes>
      </Container>
      {/* <WebSocketComponent url="wss://127.0.0.1:49936" onMessage={handleMessage} /> */}
    </BrowserRouter>
  );
}

export default App;
