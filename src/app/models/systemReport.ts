export interface ISystemReport {
  id: number;
  reporterId: string;
  reportName: string;
  reportDate: Date | null;
  createdDate: Date | null;
  updatedDate: Date | null;
  systemReportStatusId: number;
  systemNameId: number;
  systemUpdate: string;
  personnelUpdates: string;
  creativeIdeasAndEvaluations: string;
  barriersOrChallenges: string;
  howCanIHelpYou: string;
  personalGrowthAndDevelopment: string;
}

export interface ISystemName {
  id: number;
  name: string;
}

export interface ISystemReportStatus {
  id: number;
  name: string;
}

export class SystemReportStatus implements ISystemReportStatus {
  id: number = 0;
  name: string = "";

  constructor(systemReportStatus: SystemReportStatus) {
    if (systemReportStatus) {
      this.id = systemReportStatus.id;
      this.name = systemReportStatus.name;
    }
  }
}

export class SystemName implements ISystemName {
  id: number = 0;
  name: string = "";

  constructor(systemName: SystemName) {
    if (systemName) {
      this.id = systemName.id;
      this.name = systemName.name;
    }
  }
}

export class SystemNameDropdownValue {
  id: number = 0;
  name: string = "";

  constructor(systemName: ISystemName) {
    if (systemName) {
      this.id = systemName.id;
      this.name = systemName.name;
    }
  }
}

export class SystemReportFormValues implements ISystemReport {
  id: number = 0;
  reporterId: string = "";
  reportName: string = "";
  reportDate: Date | null = null;
  createdDate: Date | null = null;
  updatedDate: Date | null = null;
  systemReportStatusId: number = 0;
  systemNameId: number = 0;
  systemUpdate: string = "";
  personnelUpdates: string = "";
  creativeIdeasAndEvaluations: string = "";
  barriersOrChallenges: string = "";
  howCanIHelpYou: string = "";
  personalGrowthAndDevelopment: string = "";

  constructor(systemReport?: SystemReportFormValues) {
    if (systemReport) {
      this.id = systemReport.id;
      this.reporterId = systemReport.reporterId;
      this.reportName = systemReport.reportName;
      this.reportDate = systemReport.reportDate;
      this.createdDate = systemReport.createdDate;
      this.updatedDate = systemReport.updatedDate;
      this.systemReportStatusId = systemReport.systemReportStatusId;
      this.systemNameId = systemReport.systemNameId;
      this.systemUpdate = systemReport.systemUpdate;
      this.personnelUpdates = systemReport.personnelUpdates;
      this.creativeIdeasAndEvaluations =
        systemReport.creativeIdeasAndEvaluations;
      this.barriersOrChallenges = systemReport.barriersOrChallenges;
      this.howCanIHelpYou = systemReport.howCanIHelpYou;
      this.personalGrowthAndDevelopment =
        systemReport.personalGrowthAndDevelopment;
    }
  }
}
