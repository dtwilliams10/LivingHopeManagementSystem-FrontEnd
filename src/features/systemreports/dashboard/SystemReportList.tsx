import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import SystemReportListItem from "./SystemReportListItem";

export default observer(function SystemReportList() {
  const { systemReportStore } = useStore();
  const { systemReports } = systemReportStore;

  return (
    <>
      {systemReports.map((systemReport) => (
        <SystemReportListItem
          key={systemReport.id}
          systemReport={systemReport}
        />
      ))}
    </>
  );
});
