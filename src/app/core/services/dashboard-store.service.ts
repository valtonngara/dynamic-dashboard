import {
  computed,
  Injectable,
  signal
} from '@angular/core';

import { DashboardWidget } from '../models/dashboard.model';
import { DashboardFilter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardStore {

private readonly _widgets = signal<DashboardWidget[]>([
  {
    id: 'total-sales',
    title: 'Total Sales',
    type: 'stat',
    dataSource: 'sales',

    x: 0,
    y: 0,
    cols: 4,
    rows: 2,

    visible: true
  },

  {
    id: 'sales-chart-main',
    title: 'Sales Overview',
    type: 'chart',
    dataSource: 'sales',
    chartType: 'line',

    x: 4,
    y: 0,
    cols: 4,
    rows: 4,

    visible: true
  },

  {
    id: 'users-chart',
    title: 'Users',
    type: 'chart',
    dataSource: 'users',
    chartType: 'bar',

    x: 8,
    y: 0,
    cols: 4,
    rows: 4,

    visible: true
  },

  {
    id: 'sales-chart-left',
    title: 'Sales Trend',
    type: 'chart',
    dataSource: 'sales',
    chartType: 'line',

    x: 0,
    y: 2,
    cols: 4,
    rows: 3,

    visible: true
  },

  {
    id: 'sales-table',
    title: 'Transactions',
    type: 'table',

    x: 4,
    y: 4,
    cols: 8,
    rows: 4,

    visible: true
  }
]);

  private readonly _filter = signal<DashboardFilter>({
    startDate: null,
    endDate: null
  });

  readonly widgets = this._widgets.asReadonly();

  readonly filter = this._filter.asReadonly();

  readonly visibleWidgets = computed(() =>
    this._widgets().filter(widget => widget.visible)
  );

  updateFilter(filter: DashboardFilter): void {
    this._filter.set(filter);
  }

  updateWidget(updatedWidget: DashboardWidget): void {
    this._widgets.update(widgets =>
      widgets.map(widget =>
        widget.id === updatedWidget.id
          ? { ...updatedWidget }
          : widget
      )
    );
  }

  toggleWidget(id: string): void {
    this._widgets.update(widgets =>
      widgets.map(widget =>
        widget.id === id
          ? { ...widget, visible: !widget.visible }
          : widget
      )
    );
  }

  changeChartType(
    widgetId: string,
    chartType: 'line' | 'bar' | 'pie'
  ): void {

    this._widgets.update(widgets =>
      widgets.map(widget =>
        widget.id === widgetId
          ? { ...widget, chartType }
          : widget
      )
    );
  }

  private readonly storageKey = 'dashboard-layout';

saveLayout(): void {
  localStorage.setItem(
    this.storageKey,
    JSON.stringify(this._widgets())
  );
}

loadLayout(): void {
  const saved = localStorage.getItem(this.storageKey);

  if (!saved) {
    return;
  }

  try {
    const widgets =
      JSON.parse(saved) as DashboardWidget[];

    this._widgets.set(widgets);
  } catch {
    console.error('Could not restore dashboard layout.');
  }
}
}