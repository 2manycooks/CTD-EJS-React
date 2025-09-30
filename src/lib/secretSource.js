import axios from "axios";

export const USE_API = false; // set to true when you spin up the Node API

// ---------- LocalStorage provider (no backend) ----------
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
	} else if (nextWord.toUpperCase().startsWith("P")) {
		errors.push("That word won't work!");
		errors.push("You can't use words that start with p.");
	} else {
		localStorage.setItem(LS_KEY, nextWord);
		info.push("The secret word was changed.");
	}
	const secretWord = localStorage.getItem(LS_KEY) || "syzygy";
	return { secretWord, info, errors };
}

// ---------- Axios provider (backend) ----------
export const api = axios.create({
	baseURL: "/api", // use Vite proxy
	headers: { Accept: "application/json" },
	// withCredentials: true, // enable if you switch to cookie/session auth
});

async function getFromApi() {
	const { data } = await api.get("/secretWord");
	return data; // { secretWord, info, errors }
}
async function setToApi(secretWord) {
	const { data } = await api.post("/secretWord", { secretWord });
	return data;
}

// ---------- Public facade ----------
export async function getSecretWord() {
	try {
		return USE_API ? await getFromApi() : getLocal();
	} catch (err) {
		throw new Error(
			err?.response?.data?.msg || err.message || "Request failed"
		);
	}
}
export async function setSecretWord(secretWord) {
	try {
		return USE_API ? await setToApi(secretWord) : setLocal(secretWord);
	} catch (err) {
		throw new Error(
			err?.response?.data?.msg || err.message || "Request failed"
		);
	}
}
