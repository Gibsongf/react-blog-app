import { useEffect, useState } from "react";
import { updatePost } from "../Api";
export const EditPostForm = (props) => {
	const { title, text, published } = props;
	const obj = { title, text, published };
	const [state, setState] = useState(obj);
	const handleChanges = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	useEffect(() => console.log(state), [state]);
	const handleSubmit = (e) => {
        console.log(props.dbId)
        e.preventDefault()
        updatePost(props.dbId,state)
        console.log('updated ?')
    };
	return (
		<form action="PUT">
			<div className="title">
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					id="title"
					name="title"
					value={state.title}
					onChange={handleChanges}
				/>
			</div>
			<div className="post-text">
				<label htmlFor="post-text">Text:</label>
				<input
					type="text"
					id="post-text"
					name="text"
					value={state.text}
					onChange={handleChanges}
				/>
			</div>
            {/* need to pass the published value as default */}
			<div className="published">
				<label htmlFor="published">Published:</label>
				<select
					name="published"
					id="published"
					onChange={handleChanges}
				>
					<option value="true">true</option>
					<option value="false">false</option>
				</select>
			</div>
            <button onClick={handleSubmit} type="submit">Confirm Edit</button>
		</form>
	);
};
export const Post = (props) => {
	const { title, author, text, timestamp } = props;
	const [editMode, setEditMode] = useState(false);

	if (editMode === true) {
		return <EditPostForm {...props} />;
	}
	return (
		<div className="posts">
			<h1 className="title">{title}</h1>
			<h2 className="author">{author}</h2>
			<h4>{timestamp}</h4>
			<p className="post-content">{text}</p>
			<button onClick={() => setEditMode(!editMode)}>Edit Post</button>
		</div>
	);
};
export const AllPost = (props) => {
	const { allPosts, author } = props;
	// console.log(allPosts)
	return (
		<>
			<h1>All Yours Post</h1>
			<div className="content">
				{allPosts.map((post) => {
					return (
						<Post
							key={post._id}
							title={post.title}
							author={author}
							timestamp={post.timestamp}
							text={post.text}
                            dbId={post._id}
						/>
					);
				})}
			</div>
		</>
	);
};
