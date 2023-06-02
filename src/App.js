import "./styles/App.css";
import ApiData from "./Api";
// import uniqid from "uniqid";
import { AllPost } from "./components/Posts";
const Header = (props) => {
	const { fname, lname, description } = props;
	return (
		<div className="header">
			<div className="nav-bar">
				<h1>Blog Author Section</h1>
			</div>
			<div className="author-details">
				<h1>
					{fname} {lname}
				</h1>
				<h1>{description.length > 0 ? description : ""}</h1>
			</div>
		</div>
	);
};
const fakeData = {
	author_details: {
		_id: "6477f5a1e45bf7b562a23f93",
		user_name: "test",
		password: "password",
		first_name: "Test",
		last_name: "Author",
		description: "a test blog author",
		age: "1991-01-01T02:00:00.000Z",
		__v: 0,
	},
	posts: [
		{
			_id: "6477f5a1e45bf7b562a23f95",
			title: "Lorem ipsum dolor sit amet",
			author: "6477f5a1e45bf7b562a23f93",
			text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
			published: false,
			timestamp: "2023-06-01T01:34:25.116Z",
			__v: 0,
		},
	],
};

function App() {
	// const data = ApiData();
	return (
		<div className="App">
			<Header
				fname={fakeData.author_details.first_name} //some method to make full name
				lname={fakeData.author_details.last_name}
				description={fakeData.author_details.description}
			/>
			<AllPost
				allPosts={fakeData.posts}
				author={fakeData.author_details.first_name}
			/>
		</div>
	);
}

export default App;
