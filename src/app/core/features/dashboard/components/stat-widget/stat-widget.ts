import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { CurrencyPipe, DecimalPipe} from '@angular/common';

import { AnalyticsService } from '../../../../services/analytics.service';
import { DashboardWidget } from '../../../../models/dashboard.model';

@Component({
  selector: 'app-stat-widget',
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './stat-widget.html',
  styleUrl: './stat-widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatWidget {

  readonly widget = input.required<DashboardWidget>();

  private readonly analytics =
    inject(AnalyticsService);

  readonly value = computed(() => {

    switch (this.widget().dataSource) {

      case 'sales':
        return this.analytics.totalSales();

      case 'users':
        return this.analytics.activeUsers();

      case 'engagement':
        return this.analytics.engagementRate();

      default:
        return 0;
    }
  });

}