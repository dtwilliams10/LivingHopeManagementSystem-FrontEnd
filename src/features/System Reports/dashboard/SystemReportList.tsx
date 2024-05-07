import { useContext } from "react";
import SystemReportListItem from "./SystemReportListItem";
import { ISystemReport } from "../../../app/models/systemReport";
import LHMSContext from "../../../app/context/LHMSContext";

const SystemReportList = () => {
  const { systemReports } = useContext(LHMSContext);
  return (
    <>
      {systemReports.map((systemReport: ISystemReport) => (
        <SystemReportListItem
          key={systemReport.id}
          systemReport={systemReport}
        />
      ))}
    </>
  );
};

export default SystemReportList;
