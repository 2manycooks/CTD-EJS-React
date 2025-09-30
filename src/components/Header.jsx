export default function Header({ errors = [], info = [] }) {
	return (
		<header style={{ padding: "1rem 0" }}>
			<h1>Secret Word – React</h1>
			<div>
				{errors.map((e, i) => (
					<div key={`e-${i}`} style={{ color: "#b91c1c" }}>
						Error: {e}
					</div>
				))}
				{info.map((m, i) => (
					<div key={`i-${i}`} style={{ color: "#1d4ed8" }}>
						Info: {m}
					</div>
				))}
			</div>
			<hr />
		</header>
	);
}
