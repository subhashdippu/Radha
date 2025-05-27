import PatientList from "../components/patientListt";
import SqlQueryExecutor from "../components/sqlQueryExecutor";

function HomePage() {
  return (
    <div>
      <SqlQueryExecutor />,
      <PatientList />
    </div>
  );
}

export default HomePage;
