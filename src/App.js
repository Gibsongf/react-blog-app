import "./styles/App.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { PostDetails } from "./pages/PostDetails";
import { Home } from "./pages/Home";
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
                    <Route index element={<Home />} />
                    <Route path="post/:id" element={<PostDetails />} />
                </Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
