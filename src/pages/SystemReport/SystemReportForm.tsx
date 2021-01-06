import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

import '../../App.css';
import { authHeader } from 'helpers/auth-header';

const endpoint: string = 'SystemReport';
const url: string = process.env.REACT_APP_API + endpoint;

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
      const headers = authHeader();
      axios.post(url, values, { headers: headers })
      .then(function(response) {
        console.log(response);
      });
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="systemReport"
    >
      <br/>
      <label htmlFor="reportName">Report Name</label>
      <input
        placeholder={"Please enter your report name"}
      />
      <label htmlFor="reporterName">Reporter Name</label>
      <input
        disabled
        /*placeholder={TODO: need to pass in the user name}*/
        onChange={formik.handleChange}
        value={formik.values.reporterName}

      />
      <label htmlFor="systemUpdate">System Update</label>
      <input
        id="systemUpdate"
        name="systemUpdate"
        onChange={formik.handleChange}
        value={formik.values.systemUpdate}
      />
      <label htmlFor="personnelUpdates">Personnel Updates</label>
      <input
        className="systemReport"
        id="personnelUpdates"
        name="personnelUpdates"
        onChange={formik.handleChange}
        value={formik.values.personnelUpdates}
      />
      <label htmlFor="creativeIdeasAndEvaluations">
        Creative Ideas and Evaluations
      </label>
      <input
        id="creativeIdeasAndEvaluations"
        name="creativeIdeasAndEvaluations"
        onChange={formik.handleChange}
        value={formik.values.creativeIdeasAndEvaluations}
      />
      <label htmlFor="barriersOrChallenges">Barriers or Challenges</label>
      <input
        id="barriersOrChallenges"
        name="barriersOrChallenges"
        onChange={formik.handleChange}
        value={formik.values.barriersOrChallenges}
      />
      <label htmlFor="howCanIHelpYou">How Can I Help You?</label>
      <input
        id="howCanIHelpYou"
        name="howCanIHelpYou"
        onChange={formik.handleChange}
        value={formik.values.howCanIHelpYou}
      />
      <label htmlFor="personalGrowthAndDevelopment">
        Personal Growth and Development
      </label>
      <input
        id="personalGrowthAndDevelopment"
        name="personalGrowthAndDevelopment"
        onChange={formik.handleChange}
        value={formik.values.personalGrowthAndDevelopment}
      />
      <br/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SystemReportForm;
