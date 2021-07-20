import { useEffect, useContext } from "react";
import Context from "../../utils/Context";
import { Report } from "../../types";
import { GetServerSideProps } from "next";
import axios from "axios";
import { getRoman, getShortName } from "../../utils";
import EmptyComponent from "../../components/EmptyComponent";
import { useRouter } from "next/router";
import { getFontDefinitionFromNetwork } from "next/dist/next-server/server/font-utils";

export default function StudentIndi({ report }: { report: Report }) {
  let course: string;
  const { query } = useRouter();
  const { setError } = useContext(Context);

  if (report) {
    course = getShortName(report.course.course);
  }
  useEffect(() => {
    if (query.print) {
      if (report) window.print();
      else setError("Result not found!");
    }
  }, []);

  // function to print html using window.print()
  function printHTML() {
    window.print();
  }
  return (
    <main>
      {report ? (
        <>
          <button id="print-btn" className="primary" onClick={printHTML}>
            Print
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
            <tr>
              <td
                colSpan={9}
                style={{
                  height: "8em",
                  background: "white",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  verticalAlign: "bottom",
                  position: "relative",
                }}
              >
                <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                  Seal & Signature of the Principal
                </div>
              </td>
            </tr>
          </table>
          <table
            id="transcript"
            className="printHide"
            style={{
              // width: "100%",
              margin: "0 auto",
            }}
          >
            <tr className="no-border">
              <td>PERCENTAGE OF RANGE</td>
              <td>100</td>
              <td>90</td>
              <td>80</td>
              <td>70</td>
              <td>65</td>
              <td>60</td>
              <td>55</td>
              <td>50</td>
              <td>45</td>
              <td>{"<40"}</td>
            </tr>
            <tr className="no-border">
              <td>EQUIVALENT GRADE</td>
              <td>A++</td>
              <td>A+</td>
              <td>A</td>
              <td>B+</td>
              <td>B</td>
              <td>B-</td>
              <td>C</td>
              <td>D</td>
              <td>E</td>
              <td>F</td>
            </tr>
            <tr className="no-border">
              <td>SEMESTER PERFORMANCE INDEX (SPI)</td>
              <td colSpan={10}>Sum (Percentage) / No. of Subjects</td>
            </tr>
            <tr className="no-border">
              <td>CUMULATIVE PERFORMANCE INDEX (CPI)</td>
              <td colSpan={10}>Sum (SPI per sem ) / No. of Sem</td>
            </tr>
            <tr className="no-border">
              <td>C.P.I.</td>
              <td></td>
              <td colSpan={2}>{"> 6.6"}</td>
              <td colSpan={2}>6.6 - 6</td>
              <td colSpan={2}>6 - 5</td>
              <td colSpan={2}>{"< 5"}</td>
              <td></td>
            </tr>
            <tr className="no-border">
              <td>Performance</td>
              <td colSpan={1}></td>
              <td colSpan={2}>Excellent</td>
              <td colSpan={2}>Very Good</td>
              <td colSpan={2}>Good</td>
              <td colSpan={2}>Average</td>
              <td colSpan={1}></td>
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
