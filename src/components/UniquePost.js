import { useEffect, useState } from "react";
import { updatePost } from "../Api";
import { NavLink } from "react-router-dom";


const EditPostForm = (props) => {
	const { title, text, published } = props;
	const obj = { title, text, published };
	const [state, setState] = useState(obj);
	const handleChanges = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		updatePost(props.dbId, state);
        props.setEditMode(false)
	};
	return (
		<form method='POST' action="">
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
			<button onClick={handleSubmit} type="submit">
				Confirm Edit
			</button>
			<button onClick={()=>props.setEditMode(false)} type="button">
				Cancel 
			</button>
		</form>
	);
};

export const UniquePost = (props) => {
	const { title, author, text, timestamp } = props;
    console.log(props)
	const [editMode, setEditMode] = useState(false);
    
	if (editMode === true) {
		return <EditPostForm {...props} editMode={editMode} setEditMode={setEditMode}/>;
	}
	// here we need to call the api to get the messages and all the info of this post
	return (
		<div className="posts">
			<NavLink to={`post/${props.id}`}>
			<h2 className="title">{title}</h2>
			</NavLink>
			<h2 className="author">{author}</h2>
			<h4>{timestamp}</h4>
			<p className="post-content">{text}</p>
			<button onClick={() => setEditMode(!editMode)}>Edit Post</button>
		</div>
	);
};