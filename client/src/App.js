import { Container } from "@mui/material";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
// import WebSocketComponent from "./components/WebSocket"

function App() {
  const handleMessage = (message) => {
    console.log('WebSocket message received:', message);
  };
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
        </Routes>
      </Container>
      {/* <WebSocketComponent url="wss://127.0.0.1:49936" onMessage={handleMessage} /> */}
    </BrowserRouter>
  );
}

export default App;
