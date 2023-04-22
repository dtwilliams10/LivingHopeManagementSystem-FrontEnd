import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import MyDateInput from "../../../app/helpers/MyDateInput";
import MySelectInput from "../../../app/helpers/MySelectInput";
import MyTextInput from "../../../app/helpers/MyTextInput";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {
  ISystemName,
  SystemReportFormValues,
} from "../../../app/models/systemReport";
import { useStore } from "../../../app/stores/store";

export default observer(function SystemReportForm() {
  const { systemReportStore } = useStore();
  const {
    loadSystemReport,
    loadingInitial,
    createSystemReport,
    updateSystemReport,
    getAllSystemNames,
    systemNames,
  } = systemReportStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [systemReport, setSystemReport] = useState<SystemReportFormValues>(
    new SystemReportFormValues()
  );

  useEffect(() => {
    let reportId = parseInt(id!);
    if (reportId) {
      loadSystemReport(reportId).then((systemReport) =>
        setSystemReport(new SystemReportFormValues(systemReport))
      );
    }
  });

  useEffect(() => {
    let systemNamesList = systemNames;
    if (!systemNamesList) {
      getAllSystemNames().then(() => {});
    }
  });

  function handleFormSubmit(systemReport: SystemReportFormValues) {
    if (!systemReport.id) {
      createSystemReport(systemReport).then(() =>
        navigate(`/systemReports/${systemReport.id}`)
      );
    } else {
      updateSystemReport(systemReport).then(() =>
        navigate(`/systemReports/${systemReport.id}`)
      );
    }
  }

  if (loadingInitial)
    return <LoadingComponent content="Loading System Report..." />;

  return (
    <Segment clearing>
      <Header content="System Report Details" sub color="teal" />
      <Formik
        enableReinitialize
        initialValues={systemReport}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput
              name="reportName"
              placeholder="Please give your report a title."
            />
            <MyDateInput name="reportDate" dateFormat="MMMM d, yyyy" />
            <MySelectInput
              options={""}
              placeholder="Please select your system..."
              name="SystemName"
            />
            <Button
              diabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/systemReport"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
