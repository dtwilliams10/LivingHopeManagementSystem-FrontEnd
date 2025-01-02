import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
import SystemReportList from "./SystemReportList";
import { useContext, useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import LHMSContext from "../../../app/context/LHMSContext";

const SystemReportDashboard = () => {
  const { systemReports, fetchSystemReports, loading, setLoading } =
    useContext(LHMSContext) ||
    (() => {
      throw new Error(
        "SystemReportDashboard must be used within an LHMSContextProvider"
      );
    })();

  useEffect(() => {
    if (systemReports === undefined || systemReports.length < 1) {
      fetchSystemReports();
    }
    if (systemReports !== undefined) setLoading(false);
  }, [systemReports]);

  if (loading) return <LoadingComponent content="Loading System Reports..." />;

  return (
    <>
      <h1>System Reports By Team</h1>
      <Button
        as={NavLink}
        to="/createSystemReport"
        positive
        content="Create System Report"
      />
      <SystemReportList />
    </>
  );
};

export default SystemReportDashboard;
