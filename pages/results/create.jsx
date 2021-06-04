import axios from 'axios';
import { FieldArray, Form, Formik } from 'formik';
import FormikControl from '../../utils/FormikControl';

import { ExamTypes, Months, SEM, YEAR } from '../../interfaces/constants';
import { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';

export default function CreateResult() {
	const [subjects, setSubject] = useState([]);

	const initialValues = {
		result: {
			fspuId: '',
			sem: '',
			examMonth: Months.NOV,
			examYear: '',
			type: 'Regular',
		},
		marks: subjects,
	};
	const createResult = async ({ result, marks }) => {
		await axios
			.post('/api/result', {
				result: result,
				marks: marks,
			})
			.then((r) => {
				console.log(r);
			})
			.catch((e) => console.error(e));
	};
	const getSubjects = async () => {
		await axios
			.get('/api/subject', {
				sem: '4',
				batch: '2018-2019',
				course: 'Bachelor of Architecture',
			})
			.then((r) => {
				setSubject(r.data);
			})
			.catch((e) => console.error(e));
	};

	useEffect(() => {
		getSubjects();
		console.log(subjects);
	}, []);

	return (
		<Formik
			initialValues={initialValues}
			// validationSchema={validationSchema}
			onSubmit={createResult}
		>
			{({ values, isSubmitting }) => {
				useEffect(() => {
					getSubjects();
				}, [values.sem]);
				return (
					<Form>
						<div class="row">
							<FormikControl name="fspuId" label="SPU Id" />
							<FormikControl
								control="select"
								name="result.sem"
								label="Semester"
								options={SEM.map((sem) => ({
									label: sem,
									value: sem,
								}))}
							/>
							<FormikControl
								control="select"
								name="result.examMonth"
								label="Exam Month"
								options={Object.keys(Months).map((key) => ({
									label: Months[key],
									value: Months[key],
								}))}
							/>
							<FormikControl
								control="select"
								name="result.examYear"
								label="Exam Year"
								options={YEAR.map((year) => ({
									label: year,
									value: year,
								}))}
							/>
							<FormikControl
								control="radio"
								name="result.type"
								label="Type"
								options={Object.keys(ExamTypes).map((key) => ({
									key: ExamTypes[key],
									value: ExamTypes[key],
								}))}
							/>
						</div>
						<FieldArray name="marks">
							{({ insert, remove, push }) => (
								<div>
									{values.marks.length > 0 &&
										values.marks.map((mark, index) => {
											console.log(index);
											return (
												<div className="row" key={index}>
													<FormikControl
														name={`marks.${index}.subjectSubCode`}
														label="Subject Code"
														// disabled
													/>
													<FormikControl
														name={`marks.${index}.subName`}
														label="Subject Name"
														// disabled
													/>
													Marks
													<FormikControl
														name={`marks.${index}.internal`}
														label="Internal"
														type="number"
													/>
													<FormikControl
														name={`marks.${index}.internalTotal`}
														label="Internal Total"
														type="number"
													/>
													<FormikControl
														name={`marks.${index}.external`}
														label="External"
														type="number"
													/>
													<FormikControl
														name={`marks.${index}.externalTotal`}
														label="External Total"
														type="number"
													/>
													<div className="col">
														<button
															type="button"
															className="secondary"
															onClick={() => remove(index)}
														>
															X
														</button>
													</div>
												</div>
											);
										})}
									<button
										type="button"
										className="secondary"
										onClick={() => {
											push({
												subjectSubCode: '',
												internal: undefined,
												internalTotal: undefined,
												external: undefined,
												externalTotal: undefined,
											});
										}}
									>
										Add mark
									</button>
								</div>
							)}
						</FieldArray>
						<button type="submit">Submit</button>
					</Form>
				);
			}}
		</Formik>
	);
}

export async function getServerSideProps({ query }) {
	const prisma = new PrismaClient();

	console.log('query', query);
	// const results = await prisma.subject.findMany({
	// 	where: query,
	// });

	let subjects = [];
	return {
		props: { subjects: subjects || [] }, // will be passed to the page component as props
	};
}
