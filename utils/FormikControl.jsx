import { Field, ErrorMessage } from "formik";
import moment from "moment";
import { Fragment } from "react";
import Select from "react-select";

export default function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <CustomSelect {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckBoxes {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "image":
      return <Image {...rest} />;
    case "select-search":
      return <CustomSelectSearch {...rest} />;
    default:
      return <Input {...rest} />;
  }
}
const regex = /\./i;
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "var(--bg2)",
    border: "solid 3px #ddd",
    fontSize: "16px",
    fontWeight: "600",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "16px",
  }),
};

function CustomSelectSearch(props) {
  const { label, name, students, style, ...rest } = props;
  return (
    <div
      className={`formik-control formik-control-${name.replace(regex, "-")}`}
      style={style}
    >
      <label htmlFor={name}>{label}</label>
      <Field name={name} component="div" {...rest}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          return (
            <Select
              className="searchable-select"
              classNamePrefix="react-select"
              styles={customStyles}
              isSearchable={true}
              options={students}
              placeholder="Select a Student"
              onChange={({ value }) => {
                setFieldValue(name, value);
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage
        as="small"
        component="label"
        name={name}
        style={{ marginTop: "3px", color: "#d83455" }}
      />
    </div>
  );
}

function Input(props) {
  const { label, name, style, ...rest } = props;
  return (
    <div
      className={`formik-control formik-control-${name.replace(regex, "-")}`}
      style={style}
    >
      <label htmlFor={name}>{label}</label>
      <Field type="text" id={name} name={name} {...rest} />
      <ErrorMessage
        component="label"
        name={name}
        style={{ marginTop: "3px", color: "#d83455" }}
      />
    </div>
  );
}
function Textarea(props) {
  const { label, name, style, ...rest } = props;
  return (
    <div
      className={`formik-control formik-control-${name.replace(regex, "-")}`}
      style={style}
    >
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" id={name} name={name} {...rest} />
      <ErrorMessage
        as="small"
        component="label"
        name={name}
        style={{ marginTop: "3px", color: "#d83455" }}
      />
    </div>
  );
}
function RadioButtons(props) {
  const { label, name, style, options, ...rest } = props;
  return (
    <div
      className={`formik-control formik-control-${name.replace(regex, "-")}`}
      style={style}
    >
      <label>{label}</label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  className="tag"
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage as="small" name={name} />
    </div>
  );
}
function CheckBoxes(props) {
  const { label, style, name, options, ...rest } = props;
  return (
    <div
      className={`formik-control formik-control-${name.replace(regex, "-")}`}
      style={style}
    >
      <label>{label}</label>
      <br />
      <Field name={name} component="div">
        {({ field }) => {
          return options.map((option) => {
            return (
              <div
                key={option.key}
                style={{ display: "inline-block", margin: "5px" }}
              >
                <input
                  type="checkbox"
                  id={option.id}
                  className="tag"
                  {...field}
                  {...rest}
                  value={option.id}
                  checked={field.value.includes(option.id)}
                />
                <label htmlFor={option.id}>{option.name}</label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage as="small" name={name} />
    </div>
  );
}
function CustomSelect(props) {
  const { label, name, style, options, ...rest } = props;
  return (
    <div
      className={`formik-control formik-control-${name.replace(regex, "-")}`}
      style={style}
    >
      <label htmlFor={name}>{label}</label>
      <div>
        <Field as="select" id={name} name={name} {...rest}>
          {options.map((option, i) => {
            return (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </Field>
      </div>
      <ErrorMessage component="small" name={name} />
    </div>
  );
}
function DatePicker(props) {
  const { label, style, name, ...rest } = props;
  return (
    <div
      className={`formik-control formik-control-${name.replace(regex, "-")}`}
      style={style}
    >
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <input
              type="date"
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(e) => {
                console.log(e.target.value);
                setFieldValue(
                  name,
                  moment(e.target.value).format("YYYY-MM-DD")
                );
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage as="small" name={name} />
    </div>
  );
}
function Image(props) {
  const { label, style, name, ...rest } = props;
  return (
    <div
      className={`formik-control formik-control-${name.replace(regex, "-")}`}
      style={style}
    >
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          return (
            <input
              type="file"
              id={name}
              name={name}
              {...field}
              {...rest}
              multiple
              accept=".png, .jpeg, .jpg"
              onChange={(e) => {
                setFieldValue({ name }, e.target.files);
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage as="small" name={name} />
    </div>
  );
}
