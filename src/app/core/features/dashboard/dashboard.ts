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

import { DashboardStore } from '../../services/dashboard-store.service';
import { DashboardWidget } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    Gridster,
    GridsterItem
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {

  readonly store = inject(DashboardStore);

readonly gridOptions: GridsterConfig = {
  gridType: 'fit',

  compactType: CompactType.None,

  minCols: 12,
  maxCols: 12,

  minRows: 6,
  maxRows: 50,

  margin: 10,
  outerMargin: true,

  pushItems: true,
  swap: true,

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
}