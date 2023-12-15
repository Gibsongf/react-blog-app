import "./styles/App.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserPostDetails } from "./pages/UserPostDetails";
import { UserProfile } from "./pages/UserProfile";
import { Login } from "./pages/Login";
import { AllPublicPost } from "./pages/public/AllPosts";
import { PublicPostDetails } from "./pages/public/PublicPostDetails";
import { PublicAuthorDetails } from "./pages/public/PublicAuthorDetails";

const Header = () => {
    return (
        <div className="header">
            <h1>
                <Link to="/profile" className="back-home">
                    Blog Editor
                </Link>
            </h1>
        </div>
    );
};
const Footer = () => {
    return <div className="footer"></div>;
};

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <div className="App">
            <Header />
            {!token ? <Login setToken={setToken} /> : ""}
            <Routes>
                <Route path="profile/*">
                    <Route index element={<UserProfile />} />
                    <Route path="post/:id" element={<UserPostDetails />} />
                </Route>
                <Route path="public/*">
                    <Route index element={<AllPublicPost />} />
                    <Route path="post/:id" element={<PublicPostDetails />} />
                    <Route
                        path="author/:id"
                        element={<PublicAuthorDetails />}
                    />
                </Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
