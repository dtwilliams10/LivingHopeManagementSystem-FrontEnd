import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import '../../App.css';
import { authHeader } from 'helpers/auth-header';

const endpoint: string = 'SystemReport';
const url: string = process.env.REACT_APP_API + endpoint;

type SystemReport = {
    reporterName: string,
    reportName: string,
    systemReportStatusId: number,
    systemNameId: number,
    systemUpdate: string,
    personnelUpdates: string,
    creativeIdeasAndEvaluations: string,
    barriersOrChallenges: string,
    howCanIHelpYou: string,
    personalGrowthAndDevelopment: string
}

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<SystemReport>();
  const onSubmit = data => axios.post(url, data);
  console.log(errors);

  function SystemNameDropDown() {
    const [systemName, setSystemNames] = useState([]);

    useEffect(() => {
      function getSystemNames() {
        axios.get(process.env.REACT_APP_API + 'SystemName').then(function(response) {
          setSystemNames(response.data.map(({id, name}) => ({ id: id, name: name })));
        });
    }
    getSystemNames();
    console.log(getSystemNames());
  }, []);

  return (
    <select {...register("systemNameId", { required: true })}>
      {systemName.map(systemNames => (
        <option key={systemNames.id} value={systemNames.id}>{systemNames.name}</option>
      ))}
    </select>
  );

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Reporter Name" {...register("reporterName", {required: true})} />
      <input type="text" placeholder="Report Name" {...register("reportName", {required: true})} />
      <SystemNameDropDown/>
      <input type="text" placeholder="System Updates"  {...register("systemUpdate", {required: true})} />
      <input type="text" placeholder="Personnel Updates"  {...register("personnelUpdates", {required: true})} />
      <input type="text" placeholder="Creative Ideas and Evaluations"  {...register("creativeIdeasAndEvaluations", {required: true})} />
      <input type="text" placeholder="Do you have any Barriers or Challenges?"  {...register("barriersOrChallenges", {required: true})} />
      <input type="text" placeholder="How Can I Help You?" {...register("howCanIHelpYou", {required: true})} />
      <input type="text" placeholder="Personal Growth and Development" {...register("personalGrowthAndDevelopment", {required: true})} />

      <input type="submit" />
    </form>
  );
}