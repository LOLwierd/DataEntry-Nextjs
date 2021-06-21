import { useEffect } from "react";
import { ReportResult } from "../../types";
import { GetServerSideProps } from 'next'
import axios from "axios";

export default function StudentIndi({ report }: { report: ReportResult }) {
  useEffect(() => {
    console.log(report)
  }, [])
  return (
    <main>
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
        <tr>
          <td rowspan={6}>Jul'15 to Dec'15</td>
          <td colspan={1}>B Arch. Semester 1</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>BASIC DESIGN STUDIO - 1</td>
          <td>A</td>
          <td rowspan={5}>7.79</td>
          <td rowspan={5}>7.79</td>
          <td>187</td>
          <td>250</td>
          <td>74.8</td>
          <td>8</td>
        </tr>
        <tr>
          <td>BASIC DESIGN STUDIO - 1</td>
          <td>A</td>
          <td>187</td>
          <td>250</td>
          <td>74.8</td>
          <td>8</td>
        </tr>
        <tr>
          <td>BASIC DESIGN STUDIO - 1</td>
          <td>A</td>
          <td>187</td>
          <td>250</td>
          <td>74.8</td>
          <td>8</td>
        </tr>
        <tr>
          <td>BASIC DESIGN STUDIO - 1</td>
          <td>A</td>
          <td>187</td>
          <td>250</td>
          <td>74.8</td>
          <td>8</td>
        </tr>
        <tr>
          <td>BASIC DESIGN STUDIO - 1</td>
          <td>A</td>
          <td>187</td>
          <td>250</td>
          <td>74.8</td>
          <td>8</td>
        </tr>
        <tr>
          <td rowspan={6}>Jul'15 to Dec'15</td>
          <td colspan={1}>B Arch. Semester 1</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>BASIC DESIGN STUDIO - 1</td>
          <td>A</td>
          <td rowspan={6}>7.79</td>
          <td rowspan={6}>7.79</td>
          <td>187</td>
          <td>250</td>
          <td>74.8</td>
          <td>8</td>
        </tr>
        <tr>
          <td>BASIC DESIGN STUDIO - 1</td>
          <td>A</td>
          <td>187</td>
          <td>250</td>
          <td>74.8</td>
          <td>8</td>
        </tr>
        <tr>
          <td>BASIC DESIGN STUDIO - 1</td>
          <td>A</td>
          <td>187</td>
          <td>250</td>
          <td>74.8</td>
          <td>8</td>
        </tr>
        <tr>
          <td>BASIC DESIGN STUDIO - 1</td>
          <td>A</td>
          <td>187</td>
          <td>250</td>
          <td>74.8</td>
          <td>8</td>
        </tr>
        <tr>
          <td>BASIC DESIGN STUDIO - 1</td>
          <td>A</td>
          <td>187</td>
          <td>250</td>
          <td>74.8</td>
          <td>8</td>
        </tr>
      </table>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    console.log("Query: ", query.id)
    const res = await axios.get(`http://localhost:3000/api/report?spuId=${query.id}`)

  } catch (e) {
    console.log("Error", e)
    return {
      props: {}
    }
  }
  return {
    props: {}
  };
}
