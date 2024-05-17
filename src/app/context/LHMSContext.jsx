import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import agent from "../api/agent";
import { router } from "../router/Routes";

const LHMSContext = createContext();

export const LHMSContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);
  const [systemReports, setSystemReports] = useState([]);
  const [systemReport, setSystemReport] = useState({});
  const [systemNames, setSystemNames] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});

  const login = async (creds) => {
    try {
      const user = await agent.Accounts.login(creds);
      setToken(user.jwtToken);
      console.log(token);
      localStorage.setItem("jwt", user.jwtToken);

      if (user) {
        setUser(user);
        setToken(user.jwtToken);
      }

      console.log(user);
      console.log(token);
      router.navigate("/home");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logoff = async () => {
    localStorage.clear();
    setToken("");
    setUser({});
    console.log("Logging off!!!");
    router.navigate("/");
  };

  const register = async (creds) => {
    try {
      //creds.password - Need to salt and hash the password here before it's submitted.
      const user = await agent.Accounts.register(creds);
      setToken(user.jwtToken);
      router.navigate("/home");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchSystemNames = async () => {
    try {
      setLoading(true);
      const names = await agent.SystemNames.getAllSystemNames();
      let systemNames = names;
      console.log("Context system Names:", systemNames);
      localStorage.setItem("systemNames", JSON.stringify(systemNames));
      setSystemNames(names);
      setLoading(false);
      return names;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const fetchSystemReports = async () => {
    console.log("Fetching system reports in Context");
    try {
      setLoading(true);
      const reports = await agent.SystemReports.getAllReports();
      console.log(reports);
      setSystemReports(reports);
      setLoading(false);
      return reports;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const createSystemReport = async (systemReport) => {
    await agent.SystemReports.createReport(systemReport);
  };

  const updateSystemReport = async (systemReport) => {
    try {
      const updatedSystemReport = await agent.SystemReports.updateReport(
        systemReport
      );
      setSystemReport(updatedSystemReport);
      return updatedSystemReport;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const loadSystemReport = async (id) => {
    try {
      const systemReport = await agent.SystemReports.getReportById(id);
      return systemReport;
    } catch (error) {
      console.error("Error loading report with the id of: ", id);
      throw error;
    }
  };

  const fetchSystemNamesById = async (id) => {
    try {
      const systemName = await agent.SystemNames.getSystemNameById(id);
      return systemName;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const contextValue = useMemo(
    () => ({
      login,
      register,
      loading,
      setLoading,
      appLoaded,
      setAppLoaded,
      systemReport,
      setSystemReport,
      setUser,
      systemReports,
      systemNames,
      setSystemNames,
      setSystemReports,
      fetchSystemReports,
      fetchSystemNames,
      fetchSystemNamesById,
      createSystemReport,
      updateSystemReport,
      logoff,
      user,
      loadSystemReport,
      token,
      setToken,
    }),
    [appLoaded, systemReports, systemNames, user]
  );

  return (
    <LHMSContext.Provider value={contextValue}>{children}</LHMSContext.Provider>
  );
};

LHMSContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default LHMSContext;
