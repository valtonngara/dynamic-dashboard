import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input
} from '@angular/core';

import {
  BaseChartDirective
} from 'ng2-charts';

import {
  ChartConfiguration,
  ChartData,
  ChartType
} from 'chart.js';

import {
  MatSelectModule
} from '@angular/material/select';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  AnalyticsService
} from '../../../../services/analytics.service';

import {
  DashboardStore
} from '../../../../services/dashboard-store.service';

import {
  DashboardWidget
} from '../../../../models/dashboard.model';

@Component({
  selector: 'app-chart-widget',

  imports: [
    BaseChartDirective,
    MatSelectModule,
    MatFormFieldModule
  ],

  templateUrl: './chart-widget.html',
  styleUrl: './chart-widget.scss',

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartWidget {

  readonly widget =
    input.required<DashboardWidget>();

  private readonly analytics =
    inject(AnalyticsService);

  private readonly dashboardStore =
    inject(DashboardStore);

  readonly chartType = computed<ChartType>(
    () => this.widget().chartType ?? 'line'
  );

  readonly chartData = computed<ChartData>(() => {

    const records =
      this.analytics.filteredData();

    const labels =
      records.map(record => record.date);

    const values =
      records.map(record => {

        switch (this.widget().dataSource) {

          case 'users':
            return record.activeUsers;

          case 'engagement':
            return record.engagements;

          case 'sales':
          default:
            return record.sales;
        }

      });

    return {
      labels,

      datasets: [
        {
          label: this.widget().title,
          data: values
        }
      ]
    };

  });

readonly chartOptions: ChartConfiguration['options'] = {
  responsive: true,
  maintainAspectRatio: false,

  interaction: {
    intersect: false,
    mode: 'index'
  },

  plugins: {
    legend: {
      display: false
    }
  },

  scales: {
    x: {
      grid: {
        display: false
      }
    },

    y: {
      beginAtZero: true
    }
  }
};

  changeChartType(
    type: 'line' | 'bar' | 'pie'
  ): void {

    this.dashboardStore.changeChartType(
      this.widget().id,
      type
    );
  }
}