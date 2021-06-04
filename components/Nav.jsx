import Link from 'next/link';
import { useContext } from 'react';
import Context from '../utils/Context';

export default function Nav() {
	const { setSubjectCreate } = useContext(Context);

	return (
		<>
			<nav>
				<div>
					<svg
						width="30"
						height="30"
						viewBox="0 0 30 30"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="15"
							cy="15"
							r="13.5"
							fill="#C4C4C4"
							stroke="#222222"
							stroke-width="3"
						></circle>
					</svg>
					<p>
						<span>STUDENT</span> RESULT ENTRY
					</p>
				</div>

				<div>
					<Link href="/students/create">
						<button>&#43; STUDENT</button>
					</Link>
					<Link href="/results/create">
						<button>&#43; RESULT</button>
					</Link>
					<button onClick={() => setSubjectCreate(1)}>&#43; SUBJECT</button>
					<button id="new-btn" onclick="location.href='{% url 'search' %}'">
						SEARCH
					</button>

					<a>
						ADMIN
						<svg
							width="12"
							height="12"
							viewBox="0 0 23 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<line
								x1="1.76781"
								y1="2.23227"
								x2="12.7678"
								y2="13.2328"
								stroke="#555555"
								stroke-width="5"
							></line>
							<line
								x1="20.7677"
								y1="2.76781"
								x2="9.76724"
								y2="13.7678"
								stroke="#555555"
								stroke-width="5"
							></line>
						</svg>
					</a>
				</div>
			</nav>
		</>
	);
}
