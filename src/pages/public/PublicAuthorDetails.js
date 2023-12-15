import { useEffect, useState } from "react";
import { getAuthorDetails } from "../../Api";
import { AllPost } from "../../components/Posts";
// import { RenderAllPost } from "../components/Posts";
// import "../styles/App.css";
// import { getAuthorDetails } from "../Api";
// import { Loading } from "../components/Loading";
// import { useLocation } from "react-router-dom";

const AuthorInfo = (props) => {
    const { name } = props;
    return (
        <div className="author-details">
            <h1>Posts of {name}</h1>
        </div>
    );
};

export const PublicAuthorDetails = () => {
    const [currentAuthor, setCurrentAuthor] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const authorID = localStorage["authorID"];
            try {
                // console.log("public author details");
                const result = await getAuthorDetails(authorID);
                // console.log(result);
                setCurrentAuthor(() => result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    if (!currentAuthor) {
        // Data is still being fetched
        return; //<Loading />;
    }
    // console.log(currentAuthor.posts);
    return (
        <div className="content">
            <AuthorInfo name={currentAuthor.name} />

            <AllPost allPosts={currentAuthor?.posts} />
        </div>
    );
};
