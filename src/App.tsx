import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './compoents/Login/Login'; 
import Chat from './compoents/Aichat/index';
import Register from './compoents/Login/Register';
import Index from './compoents/filemanage/Index';
import Home from './compoents/Index/Home';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/index" element={<Index/>}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;