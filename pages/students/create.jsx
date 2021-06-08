import { useContext } from "react";
import { Form, Formik } from "formik";
import moment from "moment";
import FormikControl from "../../utils/FormikControl";
import { BATCHES, Courses } from "../../interfaces/constants";
import axios from "axios";
import Context from "../../utils/Context";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import * as Yup from "yup";
import dynamic from 'next/dynamic';
const PrivateRoute = dynamic(() => import("../../utils/PrivateRoute"), {
  ssr: false,
});

export default function CreateStudent({ students }) {
  const { setError, setInfo } = useContext(Context);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    middleName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    spuId: Yup.string().required("Required"),
    batch: Yup.string().required("Required"),
    nationality: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });
  const initialValues = {
    title: "Mr",
    firstName: "",
    middleName: "",
    lastName: "",
    spuId: "",
    batch: "2018-2019",
    course: Courses.Architecture,
    nationality: "",
    address: "",
    dob: moment().format("YYYY-MM-DD"),
  };
  const createStudent = async (values, { resetForm }) => {
    NProgress.start();
    await axios
      .post("/api/student", {
        ...values,
        dob: moment(values.dob).format("DD-MM-YYYY"),
      })
      .then((r) => {
        console.log("In then!");
        if (r.status == 200) {
          console.log(r);
          setInfo("Created Student successfully!");
          resetForm();
        } else {
          setError("Error in creating Student!!");
        }
      })
      .catch((e) => {
        console.log("IN error");
        console.error(e);
        setError("Error in creating Student!!");
      })
      .finally(() => {
        NProgress.done();
      });
  };

  return (
    <PrivateRoute>
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
                    { label: "Mr", value: "Mr" },
                    { label: "Mrs", value: "Mrs" },
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

                <FormikControl name="nationality" label="Nationality" />
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
    </PrivateRoute>
  );
}
