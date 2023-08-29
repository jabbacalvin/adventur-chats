import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getProfile, getUser } from "../../utilities/users-service";
import "./App.css";
import HomePage from "../HomePage/HomePage";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import VisitPage from "../VisitPage/VisitPage";
import PostsPage from "../PostsPage/PostsPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import SettingsPage from "../SettingsPage/SettingsPage";
import ChatWindow from "../../components/ChatWindow/ChatWindow";

export default function App() {
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [chatVisible, setChatVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user and profile data concurrently
        const [userData, profileData] = await Promise.all([
          getUser(),
          getProfile(),
        ]);

        setUser(userData);
        if (profileData) setProfile(profileData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the async function
  }, []);

  return (
    <main className="App">
      <NavBar
        chatVisible={chatVisible}
        setChatVisible={setChatVisible}
        unreadCount={unreadCount}
        setUnreadCount={setUnreadCount}
        updatingProfile={updatingProfile}
        user={user}
        setUser={setUser}
        profile={profile}
        setProfile={setProfile}
      />
      {user ? (
        <>
          <Routes>
            {/* Route components in here */}
            <Route path="/" element={<HomePage />} />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  updatingProfile={updatingProfile}
                  setUpdatingProfile={setUpdatingProfile}
                  profile={profile}
                  setProfile={setProfile}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <SettingsPage
                  updatingProfile={updatingProfile}
                  setUpdatingProfile={setUpdatingProfile}
                  profile={profile}
                  setProfile={setProfile}
                />
              }
            />
            <Route path="/posts" element={<PostsPage profile={profile} />} />
            <Route path="/visits" element={<VisitPage />} />
          </Routes>
          {profile ? (
            <ChatWindow
              chatVisible={chatVisible}
              setChatVisible={setChatVisible}
              profile={profile}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<AuthPage setUser={setUser} setProfile={setProfile} />}
            />
            <Route path="/posts" element={<PostsPage profile={profile} />} />
          </Routes>
        </>
      )}
    </main>
  );
}
