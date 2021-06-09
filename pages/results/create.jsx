import { useContext } from "react";
import axios from "axios";
import { FieldArray, Form, Formik, yupToFormErrors } from "formik";
import FormikControl from "../../utils/FormikControl";
import { ExamTypes, Months, SEM, YEAR } from "../../interfaces/constants";
import { useEffect, useState } from "react";
import Context from "../../utils/Context";
import NProgress from "nprogress"; //nprogress module
import dynamic from "next/dynamic";
const PrivateRoute = dynamic(() => import("../../utils/PrivateRoute"), {
  ssr: false,
});
import "nprogress/nprogress.css"; //styles of nprogress

export default function CreateResult({ students }) {
  const [subjects, setSubject] = useState([]);
  const [result, setResult] = useState({
    fspuId: "",
    sem: "1",
    examMonth: Months.NOV,
    examYear: "",
    type: "",
  });
  const { setError, setInfo } = useContext(Context);

  const initialValues = {
    result: result,
    marks: subjects,
  };
  const createResult = async ({ result, marks }) => {
    NProgress.start();
    const marksData = marks.map((mark) => {
      delete mark.subName;
      return mark;
    });
    await axios
      .post("/api/result", {
        result: result,
        marks: marks,
      })
      .then((r) => {
        console.log(r);
        if (r.status == 200) {
          setResult({
            fspuId: "",
            sem: "1",
            examMonth: Months.NOV,
            examYear: "",
            type: "",
          });
          setSubject([]);
          setInfo("Created Result successfully!");
        } else setError("Error in creating Result!!");
      })
      .catch((e) => {
        console.log("IN error");
        console.error(e);
        setError("Error in creating Result!!");
      })
      .finally(() => {
        NProgress.done();
      });
  };
  const getSubjects = async (values) => {
    const { fspuId, sem } = values;
    console.log(values);
    setResult(values);
    if (fspuId && sem) {
      NProgress.start();
      await axios
        .get("/api/subject", {
          params: {
            sem: sem,
            spuId: fspuId,
          },
        })
        .then((r) => {
          setSubject(r.data);
          if (r.data.length === 0) setError("No Subjects found!!");
          else setInfo("Subjects Loaded!!");
        })
        .catch((e) => {
          console.error(e);
          setError("Error in loading subjects!");
        })
        .finally(() => NProgress.done());
    } else {
      setError("Please enter spuId and/or sem");
    }
  };

  return (
    <PrivateRoute>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={createResult}
      >
        {({ values, isSubmitting }) => {
          return (
            <Form id="new-entry">
              <div className="row">
                <FormikControl
                  name="result.fspuId"
                  label="SPU Id"
                  required
                  control="select-search"
                  students={students}
                  required
                />
                <FormikControl
                  control="select"
                  name="result.sem"
                  label="Semester"
                  options={SEM.map((sem) => ({
                    label: sem,
                    value: sem,
                  }))}
                  required
                />
                <div
                  className="load-subjects"
                  onClick={() => getSubjects(values.result)}
                  title="Load Subjects"
                >
                  <img
                    height="25px"
                    width="25px"
                    src="/load-subjects.svg"
                    alt="Load Subjects"
                    className="load-subjects"
                  />
                </div>
              </div>
              <div className="row">
                <FormikControl
                  control="select"
                  name="result.examMonth"
                  label="Exam Month"
                  options={Object.keys(Months).map((key) => ({
                    label: Months[key],
                    value: Months[key],
                  }))}
                  required
                />
                <FormikControl
                  control="select"
                  name="result.examYear"
                  label="Exam Year"
                  options={YEAR.map((year) => ({
                    label: year,
                    value: year,
                  }))}
                  required
                />
                <FormikControl
                  control="radio"
                  name="result.type"
                  label="Type"
                  options={Object.keys(ExamTypes).map((key) => ({
                    key: ExamTypes[key],
                    value: ExamTypes[key],
                  }))}
                  required
                />
              </div>
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
                      style={{ flexWrap: "wrap", justifyContent: "center" }}
                    >
                      {values.marks.length > 0 &&
                        values.marks.map((mark, index) => {
                          return (
                            <div id="new-marks" key={index}>
                              <div
                                className="row"
                                style={{
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <h3>Entry #{index}</h3>
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  X
                                </button>
                              </div>
                              <div className="row">
                                <FormikControl
                                  name={`marks.${index}.subjectSubCode`}
                                  label="Subject Code"
                                  style={{ flexBasis: "20%" }}
                                  disabled
                                />
                                <FormikControl
                                  name={`marks.${index}.subName`}
                                  label="Subject Name"
                                  style={{ flexBasis: "40%" }}
                                  disabled
                                />
                                <br />
                                <FormikControl
                                  name={`marks.${index}.internal`}
                                  label="Internal"
                                  type="number"
                                  style={{ flexBasis: "10%" }}
                                  required
                                />
                                <FormikControl
                                  name={`marks.${index}.internalTotal`}
                                  label="Internal Total"
                                  type="number"
                                  style={{ flexBasis: "10%" }}
                                  required
                                />
                                <FormikControl
                                  name={`marks.${index}.external`}
                                  label="External"
                                  type="number"
                                  style={{ flexBasis: "10%" }}
                                  required
                                />
                                <FormikControl
                                  name={`marks.${index}.externalTotal`}
                                  label="External Total"
                                  type="number"
                                  style={{ flexBasis: "10%" }}
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
    </PrivateRoute>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/api/student");
  const data = await res.json();
  const students = data.map((v) => {
    const name = v.firstName + " " + v.middleName + " " + v.lastName;
    return {
      label: v.spuId + ": " + name,
      value: v.spuId,
    };
  });
  console.log(students);
  return {
    props: { students }, // will be passed to the page component as props
  };
}
