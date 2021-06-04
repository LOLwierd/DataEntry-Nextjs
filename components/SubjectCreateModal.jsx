import { useContext } from 'react';
import Context from '../utils/Context';
import Modal from './Modal';

export default function SubjectCreateModal() {
	const { subjectCreate, setSubjectCreate } = useContext(Context);

	return (
		<Modal
			visible={subjectCreate}
			onClose={() => {
				setSubjectCreate(0);
			}}
		>
			Subject Yahi banega
		</Modal>
	);
}
