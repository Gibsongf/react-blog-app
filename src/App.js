import "./styles/App.css";
import { useEffect, useState } from "react";
import {
    Routes,
    Route,
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { UserPostDetails } from "./pages/UserPostDetails";
import { UserProfile } from "./pages/UserProfile";
import { Login } from "./pages/Login";
import { AllPublicPost } from "./pages/public/AllPosts";
import { PublicPostDetails } from "./pages/public/PublicPostDetails";
import { PublicAuthorDetails } from "./pages/public/PublicAuthorDetails";
import { headerInfo } from "./utils";
import Icon from "@mdi/react";
import { mdiAccountCircleOutline } from "@mdi/js";

const Header = () => {
    let token = localStorage.getItem("token");
    const location = useLocation().pathname.split("/")[1];
    const h3 = headerInfo();
    const AccountIcon = () => {
        return (
            <Link to={h3.url} className="back-home">
                <Icon
                    path={mdiAccountCircleOutline}
                    title="User Profile"
                    size={2}
                    color="white"
                />
            </Link>
        );
    };
    return (
        <div className="header">
            <h1>
                <Link to="/public/" className="back-home">
                    Blog
                </Link>
            </h1>
            {!token && location === "public" && (
                <Link to="/login/">
                    <button className="login-btn-header">Login</button>
                </Link>
            )}
            {token && <AccountIcon />}
        </div>
    );
};
const Footer = () => {
    return <div className="footer"></div>;
};

function App() {
    const nav = useNavigate();
    const location = useLocation();
    const [guest, setGuest] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const redirectLogin = () => {
        const currentUrl = location.pathname.split("/")[1];
        if (currentUrl !== "login" && !guest) {
            nav("/login");
        }
    };
    useEffect(() => {
        if (!token && !guest) {
            redirectLogin();
        }
    }, []);
    return (
        <div className="App">
            <Header guest={guest} />
            <Routes>
                <Route
                    path="login"
                    element={<Login setToken={setToken} setGuest={setGuest} />}
                />
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
