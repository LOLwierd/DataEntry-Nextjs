export default function StudentIndi({ query }) {
  console.log(query);
  return (
    <table id="transcript">
      <tbody>
        <tr>
          <td>Name:</td>
          <td>Vraj Shah</td>
        </tr>
        <tr>
          <td rowspan="2">Vraj Shah</td>
          <td>Vraj Shah</td>
        </tr>
        <tr>
          <td>Vraj Shah</td>
        </tr>
        <tr>
          <td>Vraj Shah</td>
        </tr>
      </tbody>
    </table>
  );
}
