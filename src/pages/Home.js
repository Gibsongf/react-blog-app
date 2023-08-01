import "../styles/App.css";
import { AllPost } from "../components/Posts";
import { FormNewPost } from "../components/Forms";
import { useContext, useEffect, useState } from "react";
import { getUserData } from "../Api";
import { DataContext } from "../App";

const AuthorInfo = () => {
    const { first_name, last_name } = JSON.parse(
        localStorage.getItem("author")
    );

    return (
        <div className="author-details">
            <h1>
                Welcome {first_name} {last_name}{" "}
            </h1>
        </div>
    );
};

export const Home = () => {
    const { authorInfo } = useContext(DataContext);
    const [data, setData] = useState(null);
    const [wasUpdated, setWasUpdated] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("fetch data");
                const result = await getUserData();
                authorInfoSaved(result.author);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const authorInfoSaved = (author) => {
            const localAuthor = JSON.parse(localStorage.getItem("author"));
            const saveAuthor = () =>
                authorInfo({
                    first_name: author.first_name,
                    last_name: author.last_name,
                    user_name: author.user_name,
                });
            if (!localAuthor) {
                saveAuthor();
                console.log("saved for not having any author in local storage");
            } else {
                if (localAuthor.user_name !== author.user_name) {
                    saveAuthor();
                    console.log("saved for being different user_name");
                }
            }
        };

        fetchData();
    }, [authorInfo, wasUpdated]);
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <div className="content">
            <AuthorInfo />
            <FormNewPost setWasUpdated={setWasUpdated} />
            <AllPost allPosts={data.posts} />
        </div>
    );
};
