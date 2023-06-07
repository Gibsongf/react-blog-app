import "../styles/App.css";
import { getIndexData } from "../Api";
import { useEffect, useState } from "react";
// import uniqid from "uniqid";
import { AllPost } from "../components/Posts";
import { FormNewPost } from "../components/Forms";
// import { Routes, Route } from "react-router-dom";

const AuthorInfo = (props) => {
    const { fname, lname, description } = props;

    return (
        <div className="author-details">
            <h1>
                {fname} {lname}
            </h1>
            <h1>{description.length > 0 ? description : ""}</h1>
        </div>
    );
};

export const Home = ({ savePostId, data, wasUpdated, setWasUpdated }) => {
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }
    return (
        <>
            <FormNewPost
                wasUpdated={wasUpdated}
                setWasUpdated={setWasUpdated}
            />
            <AuthorInfo
                fname={data.author.first_name}
                lname={data.author.last_name}
                description={data.author.description}
            />
            <AllPost
                allPosts={data.posts}
                author={data.author.first_name}
                setPostId={savePostId}
            />
        </>
    );
};
