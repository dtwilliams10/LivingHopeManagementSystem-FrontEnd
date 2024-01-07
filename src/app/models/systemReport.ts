export interface ISystemReport {
  id: number;
  reporterId: string;
  reportName: string;
  reportDate: Date | null;
  createdDate: Date | null;
  updatedDate: Date | null;
  systemReportStatus: SystemReportStatus;
  systemName: SystemName;
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

export class SystemNameDropdown {
  key: number = 0;
  value: number = 0;
  text: string = "";

  constructor(systemNameDropdown: SystemNameDropdown) {
    if (systemNameDropdown) {
      this.key = systemNameDropdown.key;
      this.value = systemNameDropdown.value;
      this.text = systemNameDropdown.text;
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
  systemReportStatus: SystemReportStatus = { id: 0, name: "" };
  systemName: SystemName = { id: 0, name: "" };
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
      this.systemReportStatus = systemReport.systemReportStatus;
      this.systemName = systemReport.systemName;
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
