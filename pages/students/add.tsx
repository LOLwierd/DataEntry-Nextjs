import { useContext, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import moment from 'moment';
import FormikControl from '../../utils/FormikControl';
import { BATCHES, Courses } from '../../interfaces/constants';
import axios from 'axios';
import Context from '../../utils/Context';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import { Student } from '@prisma/client';
const PrivateRoute = dynamic(() => import('../../utils/PrivateRoute'), {
	ssr: false,
});

interface FormikInitialValues {
	title: string;
	firstName: string;
	middleName: string;
	lastName: string;
	spuId: string;
	batch: string;
	course: string;
	nationality: string;
	address: string;
	dob: string;
}

export default function CreateStudent({ data }: { data: Student[] }) {
	const { setError, setInfo } = useContext(Context);
	const [students, setStudents] = useState(data);
	const [searchItem, setSearchItem] = useState<string | null>(null);

	useEffect(() => {
		// console.log("use effect called ", searchItem);
		if (searchItem) {
			if (searchItem.length > 0)
				setStudents(
					data.filter(
						(d) =>
							d.spuId.includes(searchItem) ||
							d.name.toLowerCase().includes(searchItem.toLowerCase())
					)
				);
			else setStudents(data);
		}
	}, [searchItem]);

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('Required'),
		middleName: Yup.string().required('Required'),
		lastName: Yup.string().required('Required'),
		spuId: Yup.string().required('Required'),
		batch: Yup.string().required('Required'),
		nationality: Yup.string().required('Required'),
		address: Yup.string().required('Required'),
	});
	const initialValues = {
		title: 'Mr',
		firstName: '',
		middleName: '',
		lastName: '',
		spuId: '',
		batch: '2018-2019',
		course: Courses.Architecture,
		nationality: '',
		address: '',
		dob: moment().format('YYYY-MM-DD'),
	};
	const createStudent = async (values, { resetForm }) => {
		NProgress.start();
		await axios
			.post('/api/student', {
				...values,
				dob: moment(values.dob).format('DD-MM-YYYY'),
			})
			.then((r) => {
				console.log('In then!');
				if (r.status == 200) {
					console.log(r);
					setInfo('Created Student successfully!');
					resetForm();
				} else {
					setError('Error in creating Student!!');
				}
			})
			.catch((e) => {
				console.log('IN error');
				console.error(e);
				setError('Error in creating Student!!');
			})
			.finally(() => {
				NProgress.done();
			});
	};

	return (
		<PrivateRoute>
			<aside>
				<form
					id="search"
					onSubmit={(e) => {
						e.preventDefault();
						setSearchItem(e.target.search.value);
					}}
				>
					<input
						type="search"
						name="search"
						placeholder="SPU-ID/Name"
					// onChange={(e) => setSearchItem(e.target.value)}
					/>
					{/* <button className="grey">Advanced</button> */}
					<button className="primary" type="submit">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
							<path d="M21 3C11.602 3 4 10.602 4 20s7.602 17 17 17c3.355 0 6.46-.984 9.094-2.656l12.281 12.281 4.25-4.25L34.5 30.281C36.68 27.421 38 23.88 38 20c0-9.398-7.602-17-17-17zm0 4c7.2 0 13 5.8 13 13s-5.8 13-13 13S8 27.2 8 20 13.8 7 21 7z" />
						</svg>
					</button>
				</form>
				{students.map((student) => (
					<ul id="student-list">
						<li>
							<b>{student.name}</b>
							<span>{student.spuId}</span>
						</li>
					</ul>
				))}
			</aside>
			<main className="sided">
				<h2>Add Student</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={createStudent}
				>
					{(formik) => {
						return (
							<Form id="new-entry">
								<div className="row">
									<FormikControl
										control="select"
										name="title"
										label="Title"
										options={[
											{ label: 'Mr.', value: 'Mr' },
											{ label: 'Ms.', value: 'Ms' },
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
								</div>
								<div className="row">
									<FormikControl
										control="select"
										name="course"
										label="Course"
										options={Object.keys(Courses).map((key) => ({
											label: Courses[key],
											value: Courses[key],
										}))}
									/>
									<FormikControl
										control="date"
										name="dob"
										label="Date of Birth"
									/>
									<FormikControl
										control="select"
										name="nationality"
										label="Nationality"
										options={[
											{ label: 'Indian', value: 'Indian' },
											{ label: 'Other', value: 'Other' },
										]}
									/>{' '}
								</div>
								<div className="row">
									<FormikControl
										control="textarea"
										name="address"
										label="Permanent Address"
										rows="4"
									/>
								</div>
								<button className="primary" type="submit">
									Submit
								</button>
							</Form>
						);
					}}
				</Formik>
			</main>
		</PrivateRoute>
	);
}

export async function getServerSideProps(context) {
	// TODO: Implement pagination
	const res = await fetch('http://localhost:3000/api/student?all=true');
	const data = await res.json();
	const students = data.map((student) => {
		let stu = Object.assign(student);
		stu['name'] =
			student.firstName + ' ' + student.middleName + ' ' + student.lastName;
		delete stu['firstName'];
		delete stu['middleName'];
		delete stu['lastName'];
		return stu;
	});
	return {
		props: { data: students },
	};
}
