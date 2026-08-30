import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  viewChild
} from '@angular/core';

import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';

import {
  MatPaginator,
  MatPaginatorModule
} from '@angular/material/paginator';

import {
  MatSort,
  MatSortModule
} from '@angular/material/sort';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatInputModule
} from '@angular/material/input';

import { AnalyticsRecord }
  from '../../../../models/analytics.model';

import { AnalyticsService }
  from '../../../../services/analytics.service';

@Component({
  selector: 'app-table-widget',

  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],

  templateUrl: './table-widget.html',
  styleUrl: './table-widget.scss',

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableWidget implements AfterViewInit {

  private readonly analytics =
    inject(AnalyticsService);

  readonly paginator =
    viewChild.required(MatPaginator);

  readonly sort =
    viewChild.required(MatSort);

  readonly displayedColumns = [
    'name',
    'email',
    'country',
    'sales'
  ];

  readonly dataSource =
    new MatTableDataSource<AnalyticsRecord>();

  constructor() {

    effect(() => {

      this.dataSource.data =
        this.analytics.filteredData();

    });

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator();

    this.dataSource.sort =
      this.sort();

  }

  applyFilter(event: Event): void {

    const value =
      (event.target as HTMLInputElement)
        .value
        .trim()
        .toLowerCase();

    this.dataSource.filter = value;

    this.dataSource.paginator?.firstPage();
  }
}