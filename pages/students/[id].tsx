import { useEffect } from "react";
import { Report } from "../../types";
import { GetServerSideProps } from "next";
import axios from "axios";
import { getRoman, getShortName } from "../../utils";
import EmptyComponent from "../../components/EmptyComponent";
import { useRouter } from "next/router";

export default function StudentIndi({ report }: { report: Report }) {
  let course: string;
  const { query } = useRouter();
  if (report) {
    course = getShortName(report.course.course);
  }
  useEffect(() => {
    if (query.print) window.print();
  }, []);

  // function to print html using window.print()
  function printHTML() {
    window.print();
  }
  return (
    <main>
      {report ? (
        <>
          <button id="print-btn" onClick={printHTML}>
            Print window
          </button>
          <table id="transcript">
            <thead>
              <tr>
                <th>Period</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>SPI</th>
                <th>CPI</th>
                <th>Marks Obtained</th>
                <th>Max Marks</th>
                <th>Percentage</th>
                <th>Points</th>
              </tr>
            </thead>
            {report.Result.map((result) => {
              return (
                <>
                  <tr>
                    <td rowSpan={result.Marks.length + 1}>Jul'15 to Dec'15</td>
                    <td colSpan={1}>
                      {course +
                        " SEM: " +
                        getRoman(Number.parseInt(result.sem))}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  {result.Marks.map((mark, index) => {
                    return (
                      <tr>
                        <td>{mark.subject.subName}</td>
                        <td>{mark.grade}</td>
                        {index === 0 && (
                          <>
                            <td rowSpan={result.Marks.length}>{result.spi}</td>
                            <td rowSpan={result.Marks.length}>{result.cpi}</td>
                          </>
                        )}
                        <td>{mark.marks}</td>
                        <td>{mark.totalMarks}</td>
                        <td>{mark.percentage}</td>
                        <td>{mark.percentage}</td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
            <tr>
              <td
                colSpan={9}
                style={{
                  height: "1em",
                  background: "white",
                  borderLeft: "1px solid white",
                  borderRight: "1px solid white",
                }}
              ></td>
            </tr>
            <tr>
              <td colSpan={8}>CUMULATIVE PERFORMANCE INDEX (CPI)</td>
              <td>{report.Result[report.Result.length - 1].cpi}</td>
            </tr>
          </table>
        </>
      ) : (
        <EmptyComponent />
      )}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    console.log("Query: ", query.id);
    const res = await axios.get(
      `http://localhost:3000/api/report?spuId=${query.id}`
    );
    return {
      props: { report: res.data },
    };
  } catch (e) {
    console.log("Error", e);
    return {
      props: {},
    };
  }
};
