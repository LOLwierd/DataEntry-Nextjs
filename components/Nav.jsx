import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { useContext } from 'react';
import Context from '../utils/Context';
import NavLink from './NavLink';

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
					<NavLink href="/students/add">
						<button>STUDENTS</button>
					</NavLink>
					<NavLink href="/results/add">
						<button>RESULTS</button>
					</NavLink>
					<NavLink href="/subjects/add">
						<button>SUBJECTS</button>
					</NavLink>
					<NavLink href="/">
						<button id="new-btn" onclick="location.href='{% url 'search' %}'">
							SEARCH
						</button>
					</NavLink>

					<button
						className="grey"
						onClick={() => signOut({ callbackUrl: '/login' })}
					>
						LOGOUT
					</button>
				</div>
			</nav>
		</>
	);
}
