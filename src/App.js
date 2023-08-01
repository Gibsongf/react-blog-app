import "./styles/App.css";
import { createContext, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { PostDetails } from "./pages/PostDetails";
import { Home } from "./pages/Home";
// import { FormNewPost } from "./components/Forms";

const Header = () => {
    return (
        <div className="header">
            <NavLink to="/" className="back-home">
                <h1>Blog Editor</h1>
            </NavLink>
        </div>
    );
};
export const DataContext = createContext({
    wasUpdated: false,
    setWasUpdated: () => {},
    savePostId: () => {},
    authorInfo: () => {},
});
function App() {
    const [postId, setPostId] = useState();
    const [wasUpdated, setWasUpdated] = useState(false);

    const savePostId = (e) => {
        setPostId(e.target.id);
        localStorage.setItem("postID", e.target.id);
    };
    const authorInfo = (info) => {
        localStorage.setItem("author", JSON.stringify(info));
    };
    return (
        <div className="App">
            <Header />
            <DataContext.Provider
                value={{ wasUpdated, setWasUpdated, savePostId, authorInfo }}
            >
                <Routes>
                    <Route
                        path="/"
                        element={<Home savePostId={savePostId} />}
                    />
                    <Route
                        path="/post/:id"
                        element={
                            <PostDetails
                                postId={postId}
                                setHomeUpdate={setWasUpdated}
                            />
                        }
                    />
                </Routes>
            </DataContext.Provider>
        </div>
    );
}

export default App;
