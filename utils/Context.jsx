import { createContext, useState } from 'react';

// Context
const Context = createContext();
export default Context;

// Provider
export const Provider = ({ children }) => {
	const [subjectCreate, setSubjectCreate] = useState(0);
	const [user, setUser] = useState(null);
	const [info, setInfo] = useState(null)
	const [error, setError] = useState(null)

	return (
		<Context.Provider
			value={{
				subjectCreate,
				setSubjectCreate,
				user,
				error, 
				setError,
				info,
				setInfo
			}}
		>
			{children}
		</Context.Provider>
	);
};
