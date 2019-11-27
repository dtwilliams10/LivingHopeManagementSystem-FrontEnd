import React from 'react';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import RichTextEditor from 'components/RichTextEditor';

import '../App.css';

const endpoint: string = 'SystemReport';
const url: string = process.env.REACT_APP_URL + endpoint;
console.log(url);

const SystemReportForm = () => {
  const formik = useFormik({
    initialValues: {
      reportName: '',
      reporterName: ''
    },

    onSubmit: values => {
      axios.post(url, { values }).then(function(response) {
        console.log(response);
      });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="reportName">Report Name</label>
      {/* Look into using Draft editors here instead of text fields. */}
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
      <RichTextEditor />
      <label htmlFor="personnelUpdates">Personnel Updates</label>
      <RichTextEditor />
      <label htmlFor="creativeIdeasAndEvaluations">
        Creative Ideas and Evaluations
      </label>
      <RichTextEditor />
      <label htmlFor="barriersOrChallenges">Barriers or Challenges</label>
      <RichTextEditor />
      <label htmlFor="howCanIHelpYou">How Can I Help You?</label>
      <RichTextEditor />
      <label htmlFor="personalGrowthAndDevelopment">
        Personal Growth and Development
      </label>
      <RichTextEditor />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SystemReportForm;
