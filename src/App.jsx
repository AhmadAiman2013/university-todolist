import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import ThemeToggle from "./components/ToogleTheme";
import { AuthProvider } from "./components/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <ThemeToggle />
        <Routes>
          <Route path="/dashboard/:userUID" element={<Dashboard />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
