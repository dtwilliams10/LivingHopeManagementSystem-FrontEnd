import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import SystemReportList from "./SystemReportList";

export default observer(function SystemReport() {
  const { systemReportStore } = useStore();
  const { getAllReports, systemReportRegistry } = systemReportStore;

  useEffect(() => {
    if (systemReportRegistry.size < 1) {
      getAllReports();
    }
  }, [systemReportRegistry.size, getAllReports]);

  if (systemReportStore.loadingInitial)
    return <LoadingComponent content="Loading System Reports..." />;

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
});
