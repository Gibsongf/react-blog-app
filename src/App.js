import "./styles/App.css";
import { getIndexData } from "./Api";
import { useEffect, useState } from "react";
// import uniqid from "uniqid";
// import { AllPost } from "./components/Posts";
import { Routes, Route, NavLink } from "react-router-dom";
import { PostDetails } from "./components/PostDetails";
import { Home } from "./pages/Home";
import { FormNewPost } from "./components/Forms";

const NavBar = () => {
    return (
        <div className="nav-bar">
            <h1>Blog Editor</h1>
            <NavLink to="/" className="back-home">
                <button className="home">Home</button>
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
                const result = await getIndexData();
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
                </Routes>
        </div>
    );
}

export default App;
