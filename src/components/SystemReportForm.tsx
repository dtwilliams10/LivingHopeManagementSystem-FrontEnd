import React from 'react';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';

import '../App.css';

const endpoint: string = 'SystemReport';
const url: string = process.env.REACT_APP_URL + endpoint;
console.log(url);

const SystemReportForm = () => {
  const formik = useFormik({
    initialValues: {
      reportName: '',
      reporterName: '',
      systemUpdate: '',
      personnelUpdates: '',
      creativeIdeasAndEvaluations: '',
      barriersOrChallenges: '',
      howCanIHelpYou: '',
      personalGrowthAndDevelopment: ''
    },

    onSubmit: values => {
      axios.post(url, values).then(function(response) {
        console.log(response);
      });
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="SystemReportform"
      style={{ display: 'block' }}
    >
      <label htmlFor="reportName">Report Name</label>
      {/* TODO: Look into using Draft editors here instead of text fields. Need to figure out how to pass Editor State into the API.  */}
      <TextField
        id="reportName"
        name="reportName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.reportName}
      />
      <label htmlFor="reporterName">Reporter Name</label>
      <TextField
        id="reporterName"
        name="reporterName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.reporterName}
      />
      <br />
      <label htmlFor="systemUpdate">System Update</label>
      <TextField
        id="systemUpdate"
        name="systemUpdate"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.systemUpdate}
      />
      <label htmlFor="personnelUpdates">Personnel Updates</label>
      <TextField
        id="personnelUpdates"
        name="personnelUpdates"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.personnelUpdates}
      />
      <label htmlFor="creativeIdeasAndEvaluations">
        Creative Ideas and Evaluations
      </label>
      <TextField
        id="creativeIdeasAndEvaluations"
        name="creativeIdeasAndEvaluations"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.creativeIdeasAndEvaluations}
      />
      <label htmlFor="barriersOrChallenges">Barriers or Challenges</label>
      <TextField
        id="barriersOrChallenges"
        name="barriersOrChallenges"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.barriersOrChallenges}
      />
      <label htmlFor="howCanIHelpYou">How Can I Help You?</label>
      <TextField
        id="howCanIHelpYou"
        name="howCanIHelpYou"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.howCanIHelpYou}
      />
      <label htmlFor="personalGrowthAndDevelopment">
        Personal Growth and Development
      </label>
      <TextField
        id="personalGrowthAndDevelopment"
        name="personalGrowthAndDevelopment"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.personalGrowthAndDevelopment}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SystemReportForm;
