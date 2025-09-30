export default function Header({ errors = [], info = [] }) {
	return (
		<header>
			<h1> Secret Word - REACT VERSION </h1>
			<div>
				{errors.map((error, index) => (
					<div key={`error-${index}`}> Error: {error} </div>
				))}
				{info.map((e, i) => (
					<div key={`error-${i}`}> Info: {e} </div>
				))}
			</div>
		</header>
	);
}
