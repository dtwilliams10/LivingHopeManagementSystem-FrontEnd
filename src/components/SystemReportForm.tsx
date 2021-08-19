import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from "react-bootstrap"
import { getSystemNames } from '../helpers/getSystemNames'

const endpoint: string = 'SystemReport';
const url: string = process.env.REACT_APP_API + endpoint;

export default function SystemReportForm() {
  const [systemReport, setSystemReport] = useState({
    reporterName: '',
    reportName: '',
    systemReportStatusId: 0,
    systemNameId: 0,
    systemUpdate: '',
    personnelUpdates: '',
    creativeIdeasAndEvaluations: '',
    barriersOrChallenges: '',
    howCanIHelpYou: '',
    personalGrowthAndDevelopment: ''
  })

  const systemNames = getSystemNames();
  console.log(systemNames);

  const [validated, setValidated] = useState(false);

  const handleReporterNameChange = (event) => {
    event.persist();
    setSystemReport((systemReport) => ({
      ...systemReport,
      reporterName: event.target.value,
    }));
  }

  const handleSystemNameChange = (event) => {
    event.persist();
    setSystemReport((systemReport) => ({
      ...systemReport,
      systemNameId: event.target.value,
    }))
  }

  const handleReportNameChange = (event) => {
    event.persist();
    setSystemReport((systemReport) => ({
      ...systemReport,
      reportName: event.target.value,
    }));
  }

  const handleSystemUpdate = (event) => {
    event.persist();
    setSystemReport((systemReport) => ({
      ...systemReport,
      systemUpdate: event.target.value,
    }));
  }

  const handlePersonnelUpdate = (event) => {
    event.persist();
    setSystemReport((systemReport) => ({
      ...systemReport,
      personnelUpdates: event.target.value,
    }));
  }

  const handleCreativeIdeasandEvaluations = (event) => {
    event.persist();
    setSystemReport((systemReport) => ({
      ...systemReport,
      creativeIdeasAndEvaluations: event.target.value,
    }));
  }

  const handleBarriersorChallenges = (event) => {
    event.persist();
    setSystemReport((systemReport) => ({
      ...systemReport,
      barriersOrChallenges: event.target.value,
    }));
  }

  const handleHowCanIHelpYou = (event) => {
    event.persist();
    setSystemReport((systemReport) => ({
      ...systemReport,
      howCanIHelpYou: event.target.value,
    }));
  }

  const handlePersonalGrowthandDevelopment = (event) => {
    event.persist();
    setSystemReport((systemReport) => ({
      ...systemReport,
      personalGrowthAndDevelopment: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if(!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      axios.post(url, systemReport).catch(error => {
        console.log(error);
      })
    }
  }

  return (
      <div className="SystemReportForm">
        <br/>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="reporterName">
            <Form.Label>Reporter Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Please enter your name"
              onChange={handleReporterNameChange}
            />
            <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="reportName">
            <Form.Label>Report Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Please enter a name for your report"
              onChange={handleReportNameChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name for your report.
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="systemName">
            <Form.Control as="select" defaultValue="Choose a system" onChange={handleSystemNameChange}>
              <option>Please Select a System</option>
              {//systemNames.map(systemName => (<option key={systemName.id} value={systemName.id}>{systemName.name}</option>))}
}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="systemUpdate">
            <Form.Label>System Update</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              required
              placeholder="Please give an update for your system."
              onChange={handleSystemUpdate}
            />
            <Form.Control.Feedback type="invalid">
              Please provide an update for your system.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="personnelUpdates">
            <Form.Label>Personnel Updates</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={4}
              placeholder="Please provide any personnel updates for your system."
              onChange={handlePersonnelUpdate}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a personnel update for your system.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="creativeIdeasandEvaluations">
            <Form.Label>Creative Ideas and Evaluations</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={4}
              placeholder="Please provide any creative ideas or evaluations that your system has."
              onChange={handleCreativeIdeasandEvaluations}
            />
            <Form.Control.Feedback type="invalid">
              Please provide any creative ideas or evaluations that your system has.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="barriersOrChallenges">
            <Form.Label>Barriers or Challenges</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={4}
              placeholder="Please provide any barriers or challenges that your system has experienced"
              onChange={handleBarriersorChallenges}
            />
            <Form.Control.Feedback type="invalid">
              Please provide any barriers or challenges that your system has experienced.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="howCanIHelpYou">
            <Form.Label>How Can I Help You?</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={4}
              placeholder="Please list any ways that I can help you or pray for you."
              onChange={handleHowCanIHelpYou}
            />
            <Form.Control.Feedback type="invalid">
              Please provide any ways that I can help you or pray for you.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="personalGrowthandDevelopment">
            <Form.Label>Personal Growth and Development</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={4}
              placeholder="Please provide any personal growth and development opportunities that you have had."
              onChange={handlePersonalGrowthandDevelopment}
            />
            <Form.Control.Feedback type="invalid">
              Please provide any personal growth and development opportunities that you have had.
            </Form.Control.Feedback>
          </Form.Group>
          <Button className="submit-systemreport-button" type="submit">
            Submit to System Director
          </Button>
        </Form>
        <br/>
      </div>
  )
}