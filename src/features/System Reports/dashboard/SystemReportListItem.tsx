import { NavLink } from "react-router-dom";
import { Segment, Item } from "semantic-ui-react";
import { ISystemReport } from "../../../app/models/systemReport";

interface Props {
  systemReport: ISystemReport;
}

export default function SystemReportListItem({ systemReport }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as={NavLink} to={`/systemreport/${systemReport.id}`}>
                {systemReport.reportName}
              </Item.Header>
              <Item.Description>{systemReport.id}</Item.Description>
              <Item.Content>
                {systemReport.systemReportStatus.name}
              </Item.Content>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
