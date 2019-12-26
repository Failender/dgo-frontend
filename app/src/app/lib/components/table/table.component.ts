import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  private _columns: TableColumn[];

  public dataSource: MatTableDataSource<any[]>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input()
  public set data(value) {
    this.dataSource = new MatTableDataSource(value);
    if(this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  @Output('edit') public editOutput = new EventEmitter<TableEditEvent>();

  @Input('columns')
  public set columns(value) {
    this._columns = value;

    this.displayedColumns = this._columns.map(val => val.field);
  }

  public get columns(): TableColumn[] {
    return this._columns;
  }


  public displayedColumns;

  constructor() { }

  ngOnInit() {
    if(this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  onSlideChange(row, column: TableColumn, value) {
    row[column.field] = value;
    this.onEdit(row, column);
  }

  onEdit(row, column) {
    this.editOutput.next({
      row, column
    });
  }

  public isVisible(action, element) {
    if (!action.condition) {
      return true;
    }

    return action.condition(element);
  }
}

export interface TableColumn {
  field: string;
  type: string;
  header: string;
  lookups?: {identifier: string, description: string}[];
  actions?: any[];
}

export interface TableEditEvent {
  row: any;
  column: TableColumn;
}
