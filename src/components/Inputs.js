import { useContext } from "react";
import { UserUpdateContext } from "../pages/UserPostDetails";

export const TitlePost = ({ handler, value, placeholder }) => {
    if (!value) {
        value = "";
    }
    return (
        <div className="form-title">
            <input
                placeholder={placeholder}
                type="text"
                id="post-title"
                name="title"
                value={value}
                onChange={handler}
                required
            />
        </div>
    );
};
export const TextPost = ({ handler, value, placeholder }) => {
    if (!value) {
        value = "";
    }
    return (
        <div className="form-text">
            <textarea
                placeholder={placeholder}
                type="text"
                name="text"
                id="post-text"
                value={value}
                onChange={handler}
                required
            ></textarea>
        </div>
    );
};

export const IsPublished = ({ handler, value }) => {
    return (
        <div className="published">
            <label htmlFor="published">Published: </label>
            <select
                name="published"
                id="published"
                onChange={handler}
                value={value}
            >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
            </select>
        </div>
    );
};
export const FormPostButton = ({ handleSubmit, newContent }) => {
    const { changeEditMode } = useContext(UserUpdateContext);

    return (
        <>
            <button className="confirm" onClick={handleSubmit} type="submit">
                {!newContent ? "Confirm" : "Save Post"}
            </button>
            {!newContent ? (
                <button
                    className="cancel"
                    onClick={changeEditMode}
                    type="button"
                >
                    Cancel
                </button>
            ) : null}
        </>
    );
};
