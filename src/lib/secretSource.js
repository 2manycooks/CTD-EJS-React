import axios from "axios";

export const USE_API = false;

// ------- local version of secret

const LS_KEY = "secretWord.value";

function getLocal() {
	let secretWord = localStorage.getItem(LS_KEY);
	if (!secretWord) {
		secretWord = "syzygy";
		localStorage.setItem(LS_KEY, secretWord);
	}
	return { secretWord, info: [], errors: [] };
}

function setLocal(nextWord) {
	const errors = [];
	const info = [];

	if (!nextWord) {
		errors.push("Secret word required.");
	} else if (nextWord.toUpperCase().startsWith("p")) {
		errors.push("That word won't work!");
		errors.push("You can't use words that start with p.");
	} else {
		localStorage.setItem(LS_KEY, nextWord);
		info.push("The secret word was changed.");
	}
	const secretWord = localStorage.getItem(LS_KEY || "syzygy");
	return { secretWord, info, errors };
}

// ------ Axios version

export const api = axios.create({
	baseURL: "localhost:3000",
	headers: { Accept: "application/json" },
});

async function getFromApi() {
	const { data } = await api.get("/secretWord");
	return data; // expected output: { secretWord, info, errors }
}

async function setToApi() {
	const { data } = await api.post("/secretWord");
	return data; // expected output { secretWord, info errors }
}

// exported functions to use elsewhere

export async function getSecretWord() {
	try {
		return USE_API ? getFromApi() : getLocal();
	} catch (err) {
		throw new Error(err.response.data.msg || err.message || "request failed");
	}
}

export async function setSecretWord(secretWord) {
	try {
		return USE_API ? setToApi(secretWord) : setLocal(secretWord);
	} catch (err) {
		throw new Error(err.response.data.msg || err.msg || "Request failed");
	}
}
