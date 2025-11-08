import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './theme/provider';
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './components/ProtectedRoutes';
import Chat from './components/Chat';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Project from './components/Project';
import RoutesWithSidebar from './components/RoutesWithSidebar';
import Folderui from './components/folderui';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
        <ToastContainer />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<RoutesWithSidebar />}>
              <Route path="/" element={<Chat />} />
            </Route>
            <Route path="/project/:id" element={<Project />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
