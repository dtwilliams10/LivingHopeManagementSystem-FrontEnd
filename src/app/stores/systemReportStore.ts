import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {
  ISystemReport,
  SystemReportFormValues,
  ISystemName,
  ISystemReportStatus,
} from "../models/systemReport";

export default class SystemReportStore {
  systemReportRegistry = new Map<number, ISystemReport>();
  selectedSystemReport: ISystemReport | undefined = undefined;
  loading = false;
  loadingInitial = false;
  systemNameRegistry = new Map<number, ISystemName>();
  systemReportStatusRegistry = new Map<number, ISystemReportStatus>();

  constructor() {
    makeAutoObservable(this);
  }

  get systemReports() {
    return Array.from(this.systemReportRegistry.values());
  }

  get systemNames() {
    return Array.from(this.systemNameRegistry.values());
  }

  get systemReportStatuses() {
    return Array.from(this.systemReportStatusRegistry.values());
  }

  getAllSystemNames = async () => {
    let systemNames = this.getSystemNames();
    if (!systemNames) {
      try {
        systemNames = await agent.SystemNames.getAllSystemNames();
        systemNames.forEach((systemName: ISystemName) => {
          this.setSystemName(systemName);
        });
      } catch (error) {
        console.error(error);
      }
    }
    return systemNames;
  };

  getAllReports = async () => {
    this.setLoadingInitial(true);
    try {
      const systemReports = await agent.SystemReports.getAllReports();
      systemReports.forEach((systemReport) => {
        this.setLoadingInitial(false);
        this.setSystemReport(systemReport);
      });
    } catch (error) {
      console.error(error);
      this.setLoadingInitial(false);
    }
  };

  loadSystemReport = async (id: number) => {
    let systemReport = this.getSystemReport(id);
    if (systemReport) {
      this.selectedSystemReport = systemReport;
      return systemReport;
    } else {
      this.setLoadingInitial(true);
      try {
        systemReport = await agent.SystemReports.getReportById(id);
        this.setSystemReport(systemReport!);
        runInAction(() => {
          this.selectedSystemReport = systemReport;
        });
        this.setLoadingInitial(false);
        return systemReport;
      } catch (error) {
        console.error(error);
      }
    }
  };

  createSystemReport = async (systemReport: SystemReportFormValues) => {};

  updateSystemReport = async (systemReport: SystemReportFormValues) => {};

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  private setSystemReport = (systemReport: ISystemReport) => {
    this.systemReportRegistry.set(systemReport.id, systemReport);
  };

  private getSystemReport = (id: number) => {
    return this.systemReportRegistry.get(id);
  };

  private setSystemName = (systemName: ISystemName) => {
    this.systemNameRegistry.set(systemName.id, systemName);
  };

  private getSystemName = (id: number) => {
    return this.systemNameRegistry.get(id);
  };

  private getSystemNames = () => {
    return Array.from(this.systemNameRegistry.values());
  };

  //   getSystemReport = async (id: number) => {
  //     try {
  //       let systemReport = this.systemReportRegistry.get(id);
  //       if (!systemReport) {
  //         systemReport = await agent.SystemReports.getReportById(id);
  //       }
  //       if (!systemReport) {
  //         throw Error;
  //       }
  //       return systemReport;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
}
