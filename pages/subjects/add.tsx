import { useContext } from "react";
import axios from "axios";
import { FieldArray, Form, Formik } from "formik";
import FormikControl from "../../utils/FormikControl";
import { SEM } from "../../types/constants";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Context from "../../utils/Context";
import dynamic from "next/dynamic";
import { Subject } from "@prisma/client";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import * as Yup from 'yup';
const PrivateRoute = dynamic(() => import("../../utils/PrivateRoute"), {
	ssr: false,
});

interface FormikInitialValues {
	subject: { sem: string; courseId: number; batchId: number };
	subjects: { subCode: string; subName: string }[];
}

export default function CreateResult({ data }: { data: Subject[] }) {
	const [numSub, setAddSub] = useState(1);
	const { setError, setInfo, batches, courses } = useContext(Context);
	const [searchItem, setSearchItem] = useState<string | null>(null);
	const [subjectData, setSubjectData] = useState(data);
	const [subjects, setSubjects] = useState<FormikInitialValues["subjects"]>([]);
	const initialValues: FormikInitialValues = {
		subject: {
			sem: SEM[0],
			courseId: 1,
			batchId: 1,
		},
		subjects: [],
	};

	useEffect(() => {
		// console.log("use effect called ", searchItem);
		if (searchItem) {
			if (searchItem.length > 0)
				setSubjectData(
					data.filter(
						(d) =>
							d.subCode.includes(searchItem) ||
							d.subName.toLowerCase().includes(searchItem.toLowerCase())
					)
				);
		} else setSubjectData(data);
	}, [searchItem]);
	const getSubjects = async (values: FormikInitialValues["subject"]) => {
		const { courseId, batchId, sem } = values;
		console.log(values);
		if (courseId && sem && batchId) {
			NProgress.start();
			await axios
				.get("/api/subject", {
					params: {
						sem: sem,
						courseId: courseId,
						batchId: batchId,
					},
				})
				.then((r) => {
					const subjects = r.data.map(
						(subject: Pick<Subject, "subCode" | "subName">) => {
							return { ...subject, enabled: false };
						}
					);
					setSubjects(subjects);
					if (r.data.length === 0) setError("No Subjects found!!");
					else setInfo("Subjects Loaded!!");
				})
				.catch((e) => {
					console.error(e);
					setError("Error in loading subjects!");
				})
				.finally(() => NProgress.done());
		} else {
			setError("Please enter course and/or sem and/or batch");
		}
	};
	const createSubjects = async (
		values: FormikInitialValues,
		resetForm: Function
	) => {
		if (values.subjects.length === 0) {
			setError("Please enter Subjects!!");
			return;
		}
		console.log("SUBMIT CALLED!!");
		const subjects = values.subjects.map((subject) => {
			return { ...subject, ...values.subject };
		});
		NProgress.start();
		console.log(subjects);
		await axios
			.post("/api/subject", subjects)
			.then((r) => {
				console.log(r);
				if (r.status == 200) {
					setInfo("Created Subjects successfully!");
					resetForm();
				} else setError("Error in creating Subject!!");
			})
			.catch((e) => {
				console.log("IN error");
				console.error(e);
				setError("Error in creating Subject!!");
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
				// onSubmit={(e) => {
				// 	e.preventDefault();
				// 	// @ts-ignore
				// 	setSearchItem(e.target.search.value);
				// }}
				>
					<input
						type="search"
						name="search"
						placeholder="Subject Name/Code"
						onChange={(e) => setSearchItem(e.target.value)}
					/>
					{/* <button className="grey">Advanced</button> */}
					<button className="primary" type="submit">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
							<path d="M21 3C11.602 3 4 10.602 4 20s7.602 17 17 17c3.355 0 6.46-.984 9.094-2.656l12.281 12.281 4.25-4.25L34.5 30.281C36.68 27.421 38 23.88 38 20c0-9.398-7.602-17-17-17zm0 4c7.2 0 13 5.8 13 13s-5.8 13-13 13S8 27.2 8 20 13.8 7 21 7z" />
						</svg>
					</button>
				</form>
				{data.length === 0 ? (
					<h3 style={{ margin: "0.8em 1em", textAlign: "center" }}>
						No Match Found
					</h3>
				) : (
					<ul id="list">
						{subjectData.map((subject) => (
							<li>
								<b>{subject.subName}</b>
								<span>{subject.subCode}</span>
							</li>
						))}
					</ul>
				)}
			</aside>
			<main className="sided">
				<h2>Add Subject</h2>
				<br />
				<Formik
					initialValues={initialValues}
					onSubmit={(values, { resetForm }) =>
						createSubjects(values, resetForm)
					}
				>
					{({ values, isSubmitting }) => {
						return (
							<Form id="new-entry">
								<div className="row">
									<FormikControl
										grid='col-2'
										control="select"
										name="subject.course"
										label="Course"
										options={courses.map((course) => ({
											label: course.course,
											value: course.courseId,
										}))}
										required
									/>
									<FormikControl
										grid='col-8'

										control="select"
										name="subject.sem"
										label="Semester"
										options={SEM.map((sem) => ({
											label: sem,
											value: sem,
										}))}
										required
									/>
									<FormikControl
										grid='col-3'
										control="select"
										name="subject.batch"
										label="Batch"
										options={batches.map((batch) => ({
											label: batch.batch,
											value: batch.batchId,
										}))}
										required
									/>
									{/* <div
                    className="load-subjects"
                    onClick={() => getSubjects(values.subject)}
                    title="Load Subjects"
                  >
                    <img
                      height="25px"
                      width="25px"
                      src="/load-subjects.svg"
                      alt="Load Subjects"
                      className="load-subjects"
                    />
                  </div> */}
								</div>
								<FieldArray name="subjects">
									{({ insert, remove, push }) => (
										<div>
											<div
												className="row"
												style={{
													justifyContent: "flex-start",
													alignItems: "center",
												}}
											>
												<div className='formik-control col-4'>
													<label htmlFor="">No. of Subjects</label>
													<input
														type="number"
														min={1}
														value={numSub}
														onChange={(e) =>
															setAddSub(Number.parseInt(e.target.value))
														}
														style={{ flexBasis: "10%" }}
													/>
												</div>
												<button
													className="grey"
													onClick={(e) => {
														e.preventDefault();
														for (let i = 0; i < numSub; i++) {
															push({
																subName: undefined,
																subCode: undefined,
															});
														}
														setAddSub(1);
													}}
												>
													Add Subject(s)
												</button>
											</div>
											<div
												className="row"
												style={{
													flexWrap: "wrap",
													flexDirection: "row",
													justifyContent: "center",
												}}
											>
												{/* {subjects.length > 0 &&
													subjects.map((subject, index) => {
														return (
															<div id="new-subject" key={index}>
																<div >
																	<h3>Entry #{`${index + 1}`}</h3>
																</div>
																<div className="formik-control">
																	<label htmlFor={"sub_Code"}>
																		{"Sub Code"}
																	</label>
																	<input
																		id="sub_Code"
																		type="text"
																		value={subject.subCode}
																		disabled
																	/>
																</div>
																<div className="formik-control">
																	<label htmlFor={"sub_Name"}>
																		{"Sub Name"}
																	</label>
																	<input
																		id="sub_Name"
																		type="text"
																		value={subject.subName}
																		disabled
																	/>
																</div>
															</div>
														);
													})} */}
												{values.subjects.length > 0 &&
													values.subjects.map((subject, index) => {
														return (
															<div id="new-subject" key={index}>
																<div className="row" style={{ alignItems: "center" }}>
																	<h3>Subject #{index + 1}</h3>
																	<button
																		type="button"
																		onClick={() => remove(index)}
																	>
																		X
																	</button>
																</div>
																<FormikControl
																	name={`subjects.${index}.subCode`}
																	label="Subject Code"
																	pattern="[0-9]+"
																/>
																<FormikControl
																	name={`subjects.${index}.subName`}
																	label="Subject Name"
																/>
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
			</main>{" "}
		</PrivateRoute>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	// TODO: Implement pagination
	const subjects = await prisma.subject.findMany({});

	return {
		props: { data: subjects },
	};
};
