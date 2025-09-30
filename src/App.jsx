import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getSecretWord, setSecretWord } from "./lib/secretSource";
import "./App.css";

function App() {
	const [secretWord, setSecretWord] = useState("");
	const [input, setInput] = useState("");
	const [errors, setErrors] = useState([]);
	const [info, setInfo] = useState([]);
	const [loading, setLoading] = useState(false);

	// resets all values to be empty when opening/reloadig page.
	async function load() {
		setLoading(true);
		try {
			const data = await getSecretWord();
			setSecretWord(data.secretWord || "");
			setErrors(Array.isArray(data.errors) ? data.errors : []);
			setInfo(Array.isArray(data.info) ? data.info : []);
			setInput("");
		} catch (err) {
			setErrors([err.message]);
		} finally {
			setLoading(false);
		}
	}

	async function handleSubmit() {
		if (!input) return;
		setLoading(true);
		try {
			const data = await setSecretWord(input);
			setWord(data.secretWord || "");
			setErrors(Array.isArray(data.errors) ? data.errors : []);
			setInfo(Array.isArray(data.info) ? data.info : []);
			setInput("");
		} catch (err) {
			setErrors([err.message]);
		} finally {
			setLoading(false);
		}
	}

	// useEffect(() => {
	// 	load(), [];
	// });

	return (
		<>
			<Header errors={errors} info={info} />

			<div>
				<h2>Secret Word:</h2>

				<>
					<p>The secret word is: {secretWord}</p>
					<p>Change the secret word here:</p>
					<form>
						<input
							name="secretWord"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Enter secret word"
						/>
					</form>
					<button onClick={handleSubmit}>Submit</button>
					<button onClick={load}>Refresh</button>
				</>
			</div>

			<Footer />
		</>
	);
}

export default App;
