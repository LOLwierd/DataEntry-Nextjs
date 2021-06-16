import { Batch, Course } from "@prisma/client";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface ContextType {
  user: Object | undefined;
  error: string | undefined;
  setError: Function;
  info: string | undefined;
  setInfo: Function;
  batches: Batch[];
  courses: Course[];
}

// Context
const Context = createContext({} as ContextType);
export default Context;

// Provider
export const Provider = ({ children }: { children: React.Component }) => {
  const [user, setUser] = useState();
  const [info, setInfo] = useState();
  const [error, setError] = useState();
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/api/batch").then((data) => {
      setBatches(data.data);
    }).catch((e) => console.log("Error Fetching Batch", e)
    );
    axios.get("/api/course").then((data) => {
      setCourses(data.data);
    }).catch((e) => console.log("Error Fetching Courses", e))
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        error,
        setError,
        info,
        setInfo,
        batches,
        courses,
      }}
    >
      {children}
    </Context.Provider>
  );
};
