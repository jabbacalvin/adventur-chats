import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import HomePage from "../HomePage/HomePage";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import VisitPage from "../VisitPage/VisitPage";
import SettingsPage from "../SettingsPage/SettingsPage";
import ChatWindow from "../../components/ChatWindow/ChatWindow";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      {user ? (
        <>
          <Routes>
            {/* Route components in here */}
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage user={user} />} />
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/visits" element={<VisitPage />} />
          </Routes>
          <ChatWindow user={user} />
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage setUser={setUser} />} />
          </Routes>
        </>
      )}
    </main>
  );
}
