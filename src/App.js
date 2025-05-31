import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Teacher from './Components/Teacher';
import Student from './Components/Student';
import Home from "./Components/Home";
import PollHistory from "./Components/PollHistory";

import { ChatProvider } from './Context/ChatProvider'; 

function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/poll-history" element={<PollHistory />} />
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;