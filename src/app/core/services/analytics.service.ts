import {
  computed,
  inject,
  Injectable
} from '@angular/core';

import { DashboardStore } from './dashboard-store.service';

import { MOCK_ANALYTICS_DATA } from '../data/mock-analytics.data';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private readonly dashboardStore = inject(DashboardStore);

  readonly data = MOCK_ANALYTICS_DATA;

  readonly filteredData = computed(() => {

    const filter = this.dashboardStore.filter();

    return this.data.filter(record => {

      const recordDate = new Date(record.date);

      if (
        filter.startDate &&
        recordDate < filter.startDate
      ) {
        return false;
      }

      if (
        filter.endDate &&
        recordDate > filter.endDate
      ) {
        return false;
      }

      return true;
    });
  });

  readonly totalSales = computed(() =>
    this.filteredData()
      .reduce(
        (total, record) => total + record.sales,
        0
      )
  );

  readonly activeUsers = computed(() =>
    this.filteredData()
      .reduce(
        (total, record) =>
          total + record.activeUsers,
        0
      )
  );

  readonly engagementRate = computed(() => {

    const records = this.filteredData();

    const sessions = records.reduce(
      (total, record) =>
        total + record.sessions,
      0
    );

    const engagements = records.reduce(
      (total, record) =>
        total + record.engagements,
      0
    );

    if (!sessions) {
      return 0;
    }

    return (engagements / sessions) * 100;
  });
}