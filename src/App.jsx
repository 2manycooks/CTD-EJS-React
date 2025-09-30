import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { getSecretWord, setSecretWord } from "./lib/secretSource.js";

export default function App() {
	const [secretWord, setWord] = useState("");
	const [input, setInput] = useState("");
	const [errors, setErrors] = useState([]);
	const [info, setInfo] = useState([]);
	const [loading, setLoading] = useState(false);

	async function load() {
		setLoading(true);
		try {
			const data = await getSecretWord();
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

	async function submit() {
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

	useEffect(() => {
		load();
	}, []);

	return (
		<div style={{ maxWidth: 680, margin: "0 auto", padding: "1rem" }}>
			<Header errors={errors} info={info} />

			<main>
				<h2>Secret Word</h2>
				{loading ? (
					<p>Loading…</p>
				) : (
					<>
						<p>
							The secret word is: <b>{secretWord}</b>
						</p>
						<p>Would you like to change it?</p>
						<div style={{ display: "flex", gap: 8 }}>
							<input
								name="secretWord"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Enter new secret word"
								style={{ flex: "0 1 280px", padding: "0.5rem" }}
							/>
							<button onClick={submit} disabled={!input || loading}>
								Submit
							</button>
							<button onClick={load} disabled={loading}>
								Refresh
							</button>
						</div>
					</>
				)}
			</main>

			<Footer />
		</div>
	);
}
