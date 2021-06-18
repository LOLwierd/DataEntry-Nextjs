import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import EmptyComponent from "../components/EmptyComponent";
const PrivateRoute = dynamic(() => import("../utils/PrivateRoute"), {
  ssr: false,
});
export default function Home({ data }) {
  const [students, setStudents] = useState(data);
  const [searchItem, setSearchItem] = useState(null);
  useEffect(() => {
    // console.log("use effect called ", searchItem);
    if (searchItem?.length > 0)
      setStudents(
        data.filter(
          (d) =>
            d.spuId.includes(searchItem) ||
            d.name.toLowerCase().includes(searchItem.toLowerCase())
        )
      );
    else setStudents(data);
  }, [searchItem]);
  return (
    <PrivateRoute>
      {data.length == 0 ? (
        <EmptyComponent />
      ) : (
        <main>
          <div id="search">
            <input
              type="text"
              placeholder="SPU-ID/Name"
              onChange={(e) => setSearchItem(e.target.value)}
            />
            {/* <button className="grey">Advanced</button> */}
            <button className="primary">Search</button>
          </div>
          <div id="results">
            {students.length == 0 ? (
              <EmptyComponent />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>SPU ID</th>
                    <th>Batch</th>
                    <th>Full Name</th>
                    <th>Nationality</th>
                    <th>DOB</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {students.map((student) => (
                      <tr key={student.spuId}>
                        <td>{student.spuId}</td>
                        <td>{student.batch}</td>
                        <td>{student.name}</td>
                        <td>{student.nationality}</td>
                        <td>{student.dob}</td>
                        <td>
                          <button
                            type="button"
                            aria-describedby="tooltip"
                            id="view"
                          >
                            <svg
                              aria-hidden="true"
                              data-prefix="fas"
                              data-icon="eye"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                              class="svg-inline--fa fa-eye fa-w-18 fa-3x"
                            >
                              <path
                                fill="currentColor"
                                d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 000 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 000-29.19zM288 400a144 144 0 11144-144 143.93 143.93 0 01-144 144zm0-240a95.31 95.31 0 00-25.31 3.79 47.85 47.85 0 01-66.9 66.9A95.78 95.78 0 10288 160z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            aria-describedby="tooltip"
                            id="generate"
                          >
                            <svg
                              aria-hidden="true"
                              data-prefix="fas"
                              data-icon="file-export"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                              class="svg-inline--fa fa-file-export fa-w-18 fa-3x"
                            >
                              <path
                                fill="currentColor"
                                d="M384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128zM571 308l-95.7-96.4c-10.1-10.1-27.4-3-27.4 11.3V288h-64v64h64v65.2c0 14.3 17.3 21.4 27.4 11.3L571 332c6.6-6.6 6.6-17.4 0-24zm-379 28v-32c0-8.8 7.2-16 16-16h176V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V352H208c-8.8 0-16-7.2-16-16z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                </tbody>
              </table>
            )}
          </div>
        </main>
      )}
    </PrivateRoute>
  );
}
export async function getServerSideProps(context) {
  // TODO: Implement pagination
  const res = await fetch("http://localhost:3000/api/student?all=true");
  const data = await res.json();
  const students = data.map((student) => {
    let stu = Object.assign(student);
    stu["name"] =
      student.firstName + " " + student.middleName + " " + student.lastName;
    delete stu["firstName"];
    delete stu["middleName"];
    delete stu["lastName"];
    return stu;
  });
  return {
    props: { data: students },
  };
}
