export const EditPost = () => {};
export const Post = (props) => {
	const { title, author, text, timestamp } = props;
	return (
		<div className="posts">
			<h1 className="title">{title}</h1>
			<h2 className="author">{author}</h2>
			<h4>{timestamp}</h4>
			<p className="post-content">{text}</p>
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
						/>
					);
				})}
			</div>
		</>
	);
};
