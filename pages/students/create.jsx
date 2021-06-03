import { Form, Formik } from 'formik';
import moment from 'moment';
import FormikControl from '../../utils/FormikControl';
import { BATCHES, Courses } from '../../interfaces/constants';
import axios from 'axios';

export default function CreateStudent() {
	const initialValues = {
		title: 'MR',
		firstName: '',
		middleName: '',
		lastName: '',
		spuId: '',
		batch: '2018-2019',
		course: Courses.Architecture,
		nationality: '',
		address: '',
		// new Date().toISOString()
		dob: moment().format('YYYY-MM-DD'),
	};
	const createStudent = async (values) => {
		await axios
			.post('/api/student', values)
			.then((r) => {
				console.log(r);
			})
			.catch((e) => console.error(e));
	};

	return (
		<Formik
			initialValues={initialValues}
			// validationSchema={validationSchema}
			onSubmit={createStudent}
		>
			{(formik) => {
				return (
					<Form>
						<div class="row">
							<FormikControl
								control="select"
								name="title"
								label="Title"
								options={[
									{ label: 'Mr', value: 'MR' },
									{ label: 'Mrs', value: 'MRS' },
								]}
							/>
							<FormikControl name="firstName" label="First Name" />
							<FormikControl name="middleName" label="Middle Name" />
							<FormikControl name="lastName" label="Last Name" />
						</div>
						<div className="row">
							<FormikControl name="spuId" label="SPU Id" />
							<FormikControl
								control="select"
								name="batch"
								label="Batch"
								options={BATCHES.map((batch) => ({
									label: batch,
									value: batch,
								}))}
							/>
							<FormikControl
								control="select"
								name="course"
								label="Course"
								options={Object.keys(Courses).map((key) => ({
									label: Courses[key],
									value: Courses[key],
								}))}
							/>
							<FormikControl control="date" name="dob" label="Date of Birth" />

							<FormikControl name="nationality" label="Nationality" />
						</div>
						<FormikControl
							control="textarea"
							name="address"
							label="Permanent Address"
							rows="4"
						/>
						<button type="submit">Submit</button>
					</Form>
				);
			}}
		</Formik>
	);
}
