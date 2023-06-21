import "./styles/App.css";
import { getUserData } from "./Api";
import { useEffect, useState } from "react";
// import { AllPost } from "./components/Posts";
import { Routes, Route, NavLink } from "react-router-dom";
import { PostDetails } from "./components/PostDetails";
import { Home } from "./pages/Edit-Home";
import { FormNewPost } from "./components/Forms";
import { Index } from "./pages";

const NavBar = () => {
    return (
        <div className="nav-bar">
            <NavLink to="/" className="back-home">
                <h1>Blog Editor</h1>
            </NavLink>
        </div>
    );
};

// page with just the users that will direct for their post pages
//
function App() {
    const [data, setData] = useState(null);
    const [postId, setPostId] = useState();
    const [wasUpdated, setWasUpdated] = useState(false);

    const savePostId = (e) => {
        setPostId(e.target.id);
    };
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data");
            try {
                const result = await getUserData();
                const published = result.posts.filter((post) =>
                    post.published ? post : ""
                );
                result.published = published;
                const unpublished = result.posts.filter((post) =>
                    !post.published ? post : ""
                );
                result.unpublished = unpublished;
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [wasUpdated]);

    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            savePostId={savePostId}
                            data={data}
                            wasUpdated={wasUpdated}
                            setWasUpdated={setWasUpdated}
                        />
                    }
                />
                <Route
                    path="/post/:id"
                    element={
                        data ? (
                            <PostDetails
                                postId={postId}
                                author={data.author}
                                homeUpdate={wasUpdated}
                                setHomeUpdate={setWasUpdated}
                            />
                        ) : (
                            ""
                        )
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
                <Route path="/index" element={<Index />} />
            </Routes>
        </div>
    );
}

export default App;
