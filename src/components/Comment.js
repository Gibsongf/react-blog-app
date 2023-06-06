



export const PostComment = ({ userName, text, timestamp }) => {
    return (
        <div className="comments">
            <p>{userName}</p>
            <p>{text}</p>
            <p>{timestamp}</p>
        </div>
    );
};