import { createContext, useState, useMemo, ReactNode } from "react";
import agent from "../api/agent";
import { router } from "../router/Routes";
import { User, UserFormValues } from "../models/user";
import {
  ISystemReport,
  SystemName,
  SystemReportFormValues,
} from "../models/systemReport";

interface LHMSContextType {
  login: (creds: UserFormValues) => Promise<void>;
  register: (creds: UserFormValues) => Promise<void>;
  loading: boolean;
  appLoaded: boolean;
  systemReport: SystemReportFormValues;
  systemReports: ISystemReport[];
  systemNames: SystemName[];
  fetchSystemNames: () => Promise<SystemName[]>;
  fetchSystemReports: () => Promise<ISystemReport[]>;
  fetchSystemNamesById: (id: number) => Promise<SystemName>;
  createSystemReport: (systemReport: SystemReportFormValues) => Promise<void>;
  updateSystemReport: (
    systemReport: SystemReportFormValues
  ) => Promise<SystemReportFormValues>;
  logoff: () => Promise<void>;
  user: User;
  loadSystemReport: (id: number) => Promise<SystemReportFormValues>;
  token: string;
  setAppLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const LHMSContext = createContext<LHMSContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const LHMSContextProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [appLoaded, setAppLoaded] = useState<boolean>(false);
  const [systemReports, setSystemReports] = useState<ISystemReport[]>([]);
  const [systemReport, setSystemReport] = useState<SystemReportFormValues>({
    id: NaN,
    barriersOrChallenges: "",
    createdDate: null,
    creativeIdeasAndEvaluations: "",
    howCanIHelpYou: "",
    personalGrowthAndDevelopment: "",
    personnelUpdates: "",
    reportDate: null,
    reporterId: "",
    reportName: "",
    systemNameId: NaN,
    systemReportStatusId: NaN,
    systemUpdate: "",
    updatedDate: null,
  });
  const [systemNames, setSystemNames] = useState<SystemName[]>([]);
  const [user, setUser] = useState<User>({
    created: new Date(),
    email: "",
    firstName: "",
    isVerified: false,
    jwtToken: "",
    lastName: "",
    refreshToken: "",
    role: "",
    updated: new Date(),
    id: "",
  });
  const [token, setToken] = useState<string>("");

  const login = async (creds: UserFormValues) => {
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
    setUser(new User());
    console.log("Logging off!!!");
    router.navigate("/");
  };

  const register = async (creds: UserFormValues) => {
    //creds.password - Need to salt and hash the password here before it's submitted.
    const user = await agent.Accounts.register(creds);
    setToken(user.jwtToken);
    router.navigate("/home");
  };

  const fetchSystemNames = async () => {
    try {
      setLoading(true);
      const names = await agent.SystemNames.getAllSystemNames();
      let systemNames = names;
      console.log("Context system Names:", systemNames);
      localStorage.setItem("systemNames", JSON.stringify(systemNames));
      setSystemNames(systemNames);
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

  const createSystemReport = async (systemReport: SystemReportFormValues) => {
    await agent.SystemReports.createReport(systemReport);
  };

  const updateSystemReport = async (systemReport: SystemReportFormValues) => {
    try {
      const updatedSystemReport =
        await agent.SystemReports.updateReport(systemReport);
      setSystemReport(updatedSystemReport);
      return updatedSystemReport;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const loadSystemReport = async (id: number) => {
    try {
      const systemReport = await agent.SystemReports.getReportById(id);
      return systemReport;
    } catch (error) {
      console.error("Error loading report with the id of: ", id);
      throw error;
    }
  };

  const fetchSystemNamesById = async (id: number) => {
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
    [
      appLoaded,
      systemReports,
      systemNames,
      user,
      loading,
      systemReport,
      register,
      fetchSystemReports,
      setAppLoaded,
    ]
  );

  return (
    <LHMSContext.Provider value={contextValue}>{children}</LHMSContext.Provider>
  );
};

export default LHMSContext;
