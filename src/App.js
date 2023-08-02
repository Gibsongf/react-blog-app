import "./styles/App.css";
import { createContext } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { PostDetails } from "./pages/PostDetails";
import { Home } from "./pages/Home";

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
export const DataContext = createContext({
    savePostId: () => {},
    authorInfo: () => {},
});
function App() {
    const savePostId = (e) => {
        localStorage.setItem("postID", e.target.id);
    };
    const authorInfo = (info) => {
        localStorage.setItem("author", JSON.stringify(info));
    };
    return (
        <div className="App">
            <Header />
            <DataContext.Provider value={{ savePostId, authorInfo }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post/:id" element={<PostDetails />} />
                </Routes>
            </DataContext.Provider>
            <Footer />
        </div>
    );
}

export default App;
