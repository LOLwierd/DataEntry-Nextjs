import { useContext } from "react";
import axios from "axios";
import { FieldArray, Form, Formik } from "formik";
import FormikControl from "../../utils/FormikControl";
import { SEM, BATCHES, Courses } from "../../interfaces/constants";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Context from "../../utils/Context";
import dynamic from 'next/dynamic';
const PrivateRoute = dynamic(() => import("../../utils/PrivateRoute"), {
  ssr: false,
});

export default function CreateResult() {
  const [numSub, setAddSub] = useState(1);
  const { setError, setInfo } = useContext(Context);
  const initialValues = {
    subject: {
      sem: SEM[0],
      course: Courses["Architecture"],
      batch: BATCHES[0],
    },
    subjects: [],
  };
  const createSubjects = async (values, resetForm) => {
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
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => createSubjects(values, resetForm)}
      >
        {({ values, isSubmitting }) => {
          return (
            <Form id="new-entry">
              <div className="row">
                <FormikControl
                  control="select"
                  name="subject.course"
                  label="Course"
                  style={{ flexBasis: "50%" }}
                  options={Object.keys(Courses).map((key) => ({
                    label: Courses[key],
                    value: Courses[key],
                  }))}
                  required
                />
                <FormikControl
                  control="select"
                  name="subject.sem"
                  label="Semester"
                  style={{ flexBasis: "20%" }}
                  options={SEM.map((sem) => ({
                    label: sem,
                    value: sem,
                  }))}
                  required
                />
                <FormikControl
                  control="select"
                  name="subject.batch"
                  label="Batch"
                  style={{ flexBasis: "30%" }}
                  options={BATCHES.map((batch) => ({
                    label: batch,
                    value: batch,
                  }))}
                  required
                />
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
                      <input
                        type="number"
                        min={1}
                        onChange={(e) => setAddSub(e.target.value)}
                        value={numSub}
                        style={{ flexBasis: "10%" }}
                      />
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
                        Add Subject
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
                      {values.subjects.length > 0 &&
                        values.subjects.map((subject, index) => {
                          return (
                            <div id="new-subject" key={index}>
                              <div className="row">
                                <h3>Entry #{index}</h3>
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
    </PrivateRoute>
  );
}
