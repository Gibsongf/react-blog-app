import "./styles/App.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserPostDetails } from "./pages/UserPostDetails";
import { UserProfile } from "./pages/UserProfile";
import { Login } from "./pages/Login";

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
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
