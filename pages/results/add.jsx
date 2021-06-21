import { useContext } from 'react';
import axios from 'axios';
import { FieldArray, Form, Formik, yupToFormErrors } from 'formik';
import FormikControl from '../../utils/FormikControl';
import { ExamTypes, Months, SEM, YEAR } from '../../interfaces/constants';
import { useEffect, useState } from 'react';
import Context from '../../utils/Context';
import NProgress from 'nprogress'; //nprogress module
import dynamic from 'next/dynamic';
import * as Yup from 'yup';

const PrivateRoute = dynamic(() => import('../../utils/PrivateRoute'), {
	ssr: false,
});
import 'nprogress/nprogress.css'; //styles of nprogress

export default function CreateResult({ students }) {
	const [subjects, setSubjects] = useState([]);
	const [result, setResult] = useState({});

	const { setError, setInfo } = useContext(Context);

	const resultValues = {
		fspuId: '',
		sem: '1',
		examMonth: Months.JAN,
		examYear: YEAR[0],
		type: ExamTypes.Regular,
	};
	const subjectValues = {
		result: result,
		marks: subjects,
	};
	// This not working TODO Validation
	const validationSchema = Yup.object().shape({
		result: Yup.object().shape({
			fspuId: Yup.string().required('Required!'),
			sem: Yup.string().required('Required!'),
			examMonth: Yup.string().required('Required'),
			type: Yup.string().required('Required'),
		}),
		marks: Yup.array().of(
			Yup.object().shape({
				internal: Yup.number()
					.min(0)
					.max(Yup.ref('internalTotal'), 'Greater than Internal Total')
					.required('Required'),
				internalTotal: Yup.number().required('Required'),
				external: Yup.number().required('Required'),
				externalTotal: Yup.number().required('Required'),

				// Rest of your amenities object properties
			})
		),
	});

	// @ts-ignore
	const createResult = async ({ result, marks }) => {
		NProgress.start();
		const marksData = marks.map((mark) => {
			delete mark.subName;
			return mark;
		});
		await axios
			.post('/api/result', {
				result: result,
				marks: marks,
			})
			.then((r) => {
				console.log(r);
				if (r.status == 200) {
					setResult({
						fspuId: '',
						sem: '1',
						examMonth: Months.NOV,
						examYear: '',
						type: '',
					});
					setSubjects([]);
					setInfo('Created Result successfully!');
				} else setError('Error in creating Result!!');
			})
			.catch((e) => {
				console.log('IN error');
				console.error(e);
				setError('Error in creating Result!!');
			})
			.finally(() => {
				NProgress.done();
			});
	};
	const getSubjects = async (values) => {
		const { fspuId, sem } = values;
		setResult(values);
		if (fspuId && sem) {
			NProgress.start();
			await axios
				.get('/api/subject', {
					params: {
						sem: sem,
						spuId: fspuId,
					},
				})
				.then((r) => {
					setSubjects(r.data);
					if (r.data.length === 0) setError('No Subjects found!!');
					else setInfo('Subjects Loaded!!');
				})
				.catch((e) => {
					console.error(e);
					setError('Error in loading subjects!');
				})
				.finally(() => NProgress.done());
		} else {
			setError('Please enter spuId and/or sem');
		}
	};

	return (
		<PrivateRoute>
			<aside>
				<Formik
					// validationSchema={validationSchema}
					initialValues={resultValues}
					onSubmit={getSubjects}
				>
					{({ values, isSubmitting }) => {
						return (
							<Form id="new-entry" style={{ margin: '1em' }}>
								<FormikControl
									name="fspuId"
									label="SPU Id"
									control="select-search"
									students={students}
								/>

								<div className="row">
									<FormikControl
										grid="col-2"
										control="select"
										name="examMonth"
										label="Exam Month"
										options={Object.keys(Months).map((key) => ({
											label: Months[key],
											value: Months[key],
										}))}
										required
									/>
									<FormikControl
										grid="col-2"
										control="select"
										name="examYear"
										label="Exam Year"
										options={YEAR.map((year) => ({
											label: year,
											value: year,
										}))}
										required
									/>
								</div>
								<div className="row">
									<FormikControl
										grid="col-3"
										control="select"
										name="sem"
										label="Semester"
										options={SEM.map((sem) => ({
											label: sem,
											value: sem,
										}))}
									/>
									<FormikControl
										grid="col-6"
										control="radio"
										name="type"
										label="Type"
										options={Object.keys(ExamTypes).map((key) => ({
											key: ExamTypes[key],
											value: ExamTypes[key],
										}))}
										required
									/>
								</div>

								<button type="submit" className="primary">
									Get Subjects
								</button>
							</Form>
						);
					}}
				</Formik>
			</aside>
			<main className="sided">
				<h2>Add Result</h2>
				<br />
				<Formik
					validationSchema={validationSchema}
					enableReinitialize={true}
					initialValues={subjectValues}
					onSubmit={createResult}
				>
					{({ values, isSubmitting }) => {
						return (
							<Form id="new-entry">
								<FieldArray name="marks">
									{({ insert, remove, push }) => (
										<div>
											{/* <button
                    className="grey"
                    onClick={() => {
                      push({
                        subjectSubCode: "",
                        subName: "",
                        internal: undefined,
                        internalTotal: undefined,
                        external: undefined,
                        externalTotal: undefined,
                      });
                    }}
                    style={{ margin: "auto" }}
                  >
                    Add mark
                  </button> */}
											<div
												className="row"
												style={{ flexWrap: 'wrap', justifyContent: 'center' }}
											>
												{values.marks.length > 0 &&
													values.marks.map((mark, index) => {
														console.log(mark);
														return (
															<div id="new-marks" key={index}>
																<div
																	className="row"
																	style={{
																		justifyContent: 'space-between',
																		alignItems: 'center',
																	}}
																>
																	<h3>
																		{mark?.subjectSubCode} &nbsp; | &nbsp;
																		{mark?.subName}
																	</h3>
																	<button
																		type="button"
																		onClick={() => remove(index)}
																	>
																		X
																	</button>
																</div>
																<div className="row">
																	{/* <FormikControl
																		name={`marks.${index}.subjectSubCode`}
																		label="Subject Code"
																		style={{ flexBasis: '20%' }}
																		disabled
																	/>
																	<FormikControl
																		name={`marks.${index}.subName`}
																		label="Subject Name"
																		style={{ flexBasis: '40%' }}
																		disabled
																	/> */}
																	<br />
																	<FormikControl
																		grid="col-4"
																		name={`marks.${index}.internal`}
																		label="Internal"
																		type="number"
																		required
																	/>
																	<FormikControl
																		grid="col-4"
																		name={`marks.${index}.internalTotal`}
																		label="Internal Total"
																		type="number"
																		required
																	/>
																	<FormikControl
																		grid="col-4"
																		name={`marks.${index}.external`}
																		label="External"
																		type="number"
																		required
																	/>
																	<FormikControl
																		grid="col-4"
																		name={`marks.${index}.externalTotal`}
																		label="External Total"
																		type="number"
																		required
																	/>
																</div>
															</div>
														);
													})}
											</div>
										</div>
									)}
								</FieldArray>
								<button type="submit" className="primary">
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
	const res = await fetch('http://localhost:3000/api/student');
	const data = await res.json();
	const students = data.map((v) => {
		const name = v.firstName + ' ' + v.middleName + ' ' + v.lastName;
		return {
			label: v.spuId + ': ' + name,
			value: v.spuId,
		};
	});
	console.log(students);
	return {
		props: { students }, // will be passed to the page component as props
	};
}
