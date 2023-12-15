import "./styles/App.css";
import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { PostDetails } from "./pages/PostDetails";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

const Header = () => {
    return (
        <div className="header">
            <h1>
                <NavLink to="/" className="back-home">
                    Blog Editor
                </NavLink>
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
            {!token ? (
                <Login setToken={setToken} />
            ) : (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post/:id" element={<PostDetails />} />
                </Routes>
            )}
            <Footer />
        </div>
    );
}

export default App;
