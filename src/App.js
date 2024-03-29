import "./styles/App.css";
import { useEffect, useState } from "react";
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
    NavLink,
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
            <NavLink to={h3.url} className="back-home">
                <Icon
                    path={mdiAccountCircleOutline}
                    title="User Profile"
                    size={2}
                    color="white"
                />
            </NavLink>
        );
    };
    return (
        <div className="header">
            <h1>
                <NavLink to="/public" className="back-home">
                    Blog
                </NavLink>
            </h1>
            {location === "public" && (
                <NavLink to="/login">
                    <button className="login-btn-header">Login</button>
                </NavLink>
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

    useEffect(() => {
        const redirectLogin = () => {
            const currentUrl = location.pathname.split("/")[1];
            if (currentUrl !== "login" && !guest) {
                nav("/login");
            }
        };
        if (!token && !guest) {
            redirectLogin();
        }
        if (token) {
            nav("/public");
        }
    }, []);
    return (
        <div className="App">
            <Header guest={guest} />
            <Routes>
                <Route path="/*">
                    <Route
                        path="login"
                        element={
                            <Login setToken={setToken} setGuest={setGuest} />
                        }
                    />
                    <Route path="profile/*">
                        <Route index element={<UserProfile />} />
                        <Route path="post/:id" element={<UserPostDetails />} />
                    </Route>
                    <Route path="public/*">
                        <Route index element={<AllPublicPost />} />
                        <Route
                            path="post/:id"
                            element={<PublicPostDetails />}
                        />
                        <Route
                            path="author/:id"
                            element={<PublicAuthorDetails />}
                        />
                    </Route>
                </Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
