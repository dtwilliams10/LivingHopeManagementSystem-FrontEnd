import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import MyDateInput from "../../../app/helpers/MyDateInput";
import MySelectInput from "../../../app/helpers/MySelectInput";
import MyTextInput from "../../../app/helpers/MyTextInput";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { SystemReportFormValues } from "../../../app/models/systemReport";
import { User } from "../../../app/models/user";
import { useStore } from "../../../app/stores/store";
import MyTextArea from "../../../app/helpers/MyTextArea";

export default observer(function SystemReportForm() {
  const { systemReportStore, userStore } = useStore();
  const {
    loadSystemReport,
    loadingInitial,
    systemNames,
    createSystemReport,
    updateSystemReport,
  } = systemReportStore;

  const { getUser } = userStore;

  let user: User | null = null;

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
  }, []);

  useEffect(() => {
    if (!user) {
      getUser().then((_user: User | null) => {
        if (_user) {
          user = _user;
          console.log(user);
        }
      });
    }
  }, [user]);

  function handleFormSubmit(systemReport: SystemReportFormValues) {
    if (!systemReport.id) {
      systemReport.createdDate = new Date();
      systemReport.reporterId = user?.id! ? user?.id : "1";
      systemReport.systemReportStatus.id = 2;
      console.log(systemReport);
      createSystemReport(systemReport).then(() =>
        navigate(`/systemreport/${systemReport.id}`)
      );
    } else {
      console.log("Updating System Report");
      systemReport.reporterId = user?.id! ? user?.id : "1";
      systemReport.systemReportStatus.id = 2;
      console.log(systemReport);
      updateSystemReport(systemReport).then(() =>
        navigate(`/systemreport/${systemReport.id}`)
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
          <Form
            className="ui form systemReportForm"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Label content={"Report Title"} />
            <MyTextInput
              name="reportName"
              placeholder="Please give your report a title."
            />
            <Label content={"Report Date"} />
            <MyDateInput
              name="reportDate"
              dateFormat="MMMM d, yyyy"
              placeholderText="Please select a date..."
            />
            <Label content={"Please select a system."} />
            <MySelectInput
              disabled={!!systemReport.systemName.name}
              options={systemNames}
              text={systemReport.systemName.name}
              value={systemReport.systemName.id}
              placeholder={"Please select a system..."}
              name={"systemNameId"}
            />
            <Label content={"Barriers or Challenges"} />
            <MyTextArea
              placeholder={"What barriers or challenges are you facing?"}
              name={"barriersOrChallenges"}
              rows={3}
            />
            <Label content={"System/Team Updates"} />
            <MyTextArea
              placeholder={"Do you have any system/team updates?"}
              name={"systemUpdate"}
              rows={3}
            />
            <Label content={"Personnel Updates"} />
            <MyTextArea
              placeholder={
                "Are you looking to add or remove anyone from your team?"
              }
              name={"personnelUpdates"}
              rows={3}
            />
            <Label content={"Personal Growth and Development"} />
            <MyTextArea
              placeholder={
                "Tell me about your personal growth and development?"
              }
              name={"personalGrowthAndDevelopment"}
              rows={3}
            />
            <Label content={"Creative Ideas and Evaluations"} />
            <MyTextArea
              placeholder={
                "Do you have any creative ideas or evaluations for your team?"
              }
              name={"creativeIdeasAndEvaluations"}
              rows={5}
            />
            <Label content={"How can I help you?"} />
            <MyTextArea
              placeholder={"Is there anything I can pray for/with you about?"}
              name={"howCanIHelpYou"}
              rows={3}
            />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={NavLink}
              to="/systemreports"
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
