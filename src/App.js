import "./styles/App.css";
import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { PostDetails } from "./pages/PostDetails";
import { Home } from "./pages/Home";
import { FormNewPost } from "./components/Forms";

const Header = () => {
    return (
        <div className="header">
            <NavLink to="/" className="back-home">
                <h1>Blog Editor</h1>
            </NavLink>
        </div>
    );
};

function App() {
    const [postId, setPostId] = useState();
    const [wasUpdated, setWasUpdated] = useState(false);

    const savePostId = (e) => {
        setPostId(e.target.id);
    };

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            savePostId={savePostId}
                            wasUpdated={wasUpdated}
                            setWasUpdated={setWasUpdated}
                        />
                    }
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
                <Route
                    path="/submit"
                    element={
                        <FormNewPost
                            wasUpdated={wasUpdated}
                            setWasUpdated={setWasUpdated}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
