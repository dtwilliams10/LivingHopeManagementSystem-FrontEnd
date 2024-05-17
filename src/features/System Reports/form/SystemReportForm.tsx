import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Header,
  Item,
  ItemContent,
  Label,
  Segment,
} from "semantic-ui-react";
import MyDateInput from "../../../app/helpers/MyDateInput";
import MySelectInput from "../../../app/helpers/MySelectInput";
import MyTextInput from "../../../app/helpers/MyTextInput";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {
  ISystemName,
  ISystemReport,
  SystemName,
  SystemReportFormValues,
} from "../../../app/models/systemReport";
import MyTextArea from "../../../app/helpers/MyTextArea";
import LHMSContext from "../../../app/context/LHMSContext";

const SystemReportForm = () => {
  const {
    loadSystemReport,
    createSystemReport,
    updateSystemReport,
    user,
    systemNames,
    fetchSystemNamesById,
    fetchSystemNames,
  } = useContext(LHMSContext);

  const [systemReport, setSystemReport] = useState({} as ISystemReport);
  const [systemName, setSystemName] = useState<SystemName>({} as SystemName);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (systemNames.length < 1) {
      fetchSystemNames();
    }
    const names = systemNames.map((name: ISystemName) => ({
      id: name.id,
      value: name.id,
      text: name.name,
    }));
    console.log(names);
    setOptions(names);
    setLoading(false);
  }, [systemNames]);

  const { id } = useParams();

  const loadReport = async (id: string | undefined) => {
    setLoading(true);
    let systemReport = await loadSystemReport(parseInt(id!));
    if (systemReport) {
      let systemName = await fetchSystemNamesById(systemReport.systemNameId);
      setSystemName(systemName);
      setSystemReport(systemReport);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (parseInt(id!)) {
      loadReport(id);
    } else {
      let systemReport = new SystemReportFormValues();
      setSystemReport(systemReport);
      setLoading(false);
    }
  }, []);

  const handleFormSubmit = async (systemReport: SystemReportFormValues) => {
    console.log(systemReport);
    if (!systemReport.id) {
      systemReport.createdDate = new Date();
      systemReport.reporterId = user?.id! ? user?.id : "1";
      systemReport.systemReportStatusId = 2;
      console.log("Submitting new system report: ", systemReport);
      await createSystemReport(systemReport);
      setLoading(false);
      navigate(`/systemreports`);
    } else {
      console.log("Updating System Report");
      systemReport.reporterId = user?.id! ? user?.id : "1";
      systemReport.systemReportStatusId = 2;
      console.log(systemReport);
      updateSystemReport(systemReport).then(() => {
        navigate(`/systemreport/${systemReport.id}`);
      });
    }
  };

  if (loading) return <LoadingComponent content="Loading System Report..." />;

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

            {id === undefined ? (
              <Label content={"Please select a system."} />
            ) : (
              <Label content={"System Name"} />
            )}

            {id === undefined ? (
              <MySelectInput
                options={options}
                placeholder={"Please select a system..."}
                name={"systemNameId"}
              />
            ) : (
              <Item>
                <ItemContent content={systemName.name} />
              </Item>
            )}

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
};

export default SystemReportForm;
