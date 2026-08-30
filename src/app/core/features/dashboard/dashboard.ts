import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import {
  CompactType,
  DisplayGrid,
  Gridster,
  GridsterConfig,
  GridsterItem,
  GridsterItemConfig
} from 'angular-gridster2';

import { StatWidget }
  from './components/stat-widget/stat-widget';

import { ChartWidget }
  from './components/chart-widget/chart-widget';

import { TableWidget }
  from './components/table-widget/table-widget';

import { DashboardStore } from '../../services/dashboard-store.service';
import { DashboardWidget } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    Gridster,
    GridsterItem,
    StatWidget,
  ChartWidget,
  TableWidget
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {

  readonly store = inject(DashboardStore);

readonly gridOptions: GridsterConfig = {
  gridType: 'scrollVertical',

  compactType: CompactType.None,

  minCols: 12,
  maxCols: 12,

  minRows: 6,
  maxRows: 100,

  margin: 12,
  outerMargin: false,

  pushItems: true,
  swap: true,

  mobileBreakpoint: 900,

  draggable: {
    enabled: true
  },

  resizable: {
    enabled: true
  },

  displayGrid: DisplayGrid.OnDragAndResize,

  itemChangeCallback: (item: GridsterItemConfig) => {
    this.handleWidgetChange(item);
  },

  itemResizeCallback: (item: GridsterItemConfig) => {
    this.handleWidgetChange(item);
  }
};

  private handleWidgetChange(item: GridsterItemConfig): void {
    const widget = item as DashboardWidget;

    this.store.updateWidget(widget);
  }

  saveLayout(): void {
  this.store.saveLayout();
}
}