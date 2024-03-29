import "../styles/App.css";
import { AllPost } from "../components/Posts";
import { FormNewPost } from "../components/Forms";
import { useEffect, useState } from "react";
import { getUserData } from "../Api";
import { saveUserInfo } from "../utils";
import { Loading } from "../components/Loading";

const AuthorInfo = () => {
    const { first_name, last_name } = JSON.parse(
        localStorage.getItem("userProfile")
    );

    return (
        <div className="author-details">
            <h1>
                Welcome {first_name} {last_name}{" "}
            </h1>
        </div>
    );
};

export const UserProfile = () => {
    const [data, setData] = useState(null);
    const token = localStorage.getItem("token");
    const [wasUpdated, setWasUpdated] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getUserData();
                authorInfoSaved(result.author);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const authorInfoSaved = (author) => {
            const localAuthor = JSON.parse(localStorage.getItem("userProfile"));
            const saveAuthor = () =>
                saveUserInfo({
                    first_name: author.first_name,
                    last_name: author.last_name,
                    user_name: author.user_name,
                });
            if (!localAuthor) {
                saveAuthor();
            } else {
                if (localAuthor.user_name !== author.user_name) {
                    saveAuthor();
                }
            }
        };
        if (token) {
            fetchData();
        }
    }, [wasUpdated, token]);
    if (!data) {
        // Data is still being fetched
        return <Loading />;
    }

    return (
        <div className="content">
            <AuthorInfo />
            <FormNewPost setWasUpdated={setWasUpdated} />
            <AllPost allPosts={data.posts} />
        </div>
    );
};
