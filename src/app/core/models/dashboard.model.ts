import { GridsterItemConfig } from 'angular-gridster2';

export type WidgetType = 'stat' | 'chart' | 'table';

export type ChartType = 'line' | 'bar' | 'pie';

export type DataSource =
  | 'sales'
  | 'users'
  | 'engagement';

export interface DashboardWidget extends GridsterItemConfig  {
  id: string;
  title: string;

  type: WidgetType;

  visible: boolean;

  dataSource?: DataSource;

  chartType?: ChartType;
}