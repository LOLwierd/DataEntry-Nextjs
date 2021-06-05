import { signOut } from "next-auth/client";
import Link from "next/link";
import { useContext } from "react";
import Context from "../utils/Context";

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

          <button onClick={()=>signOut({callbackUrl: "/login"})}>LOGOUT</button>
        </div>
      </nav>
    </>
  );
}
