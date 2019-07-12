import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  private _columns: TableColumn[];

  @Input() public data;
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
  }

  onSlideChange(row, column: TableColumn, value) {
    row[column.field] = value;
    this.onEdit(row, column);
  }

  onEdit(row, column) {
    this.editOutput.next({
      row, column
    })
  }

}

export interface TableColumn {
  field: string;
  type: string;
  header: string;
  actions?: any[];
}

export interface TableEditEvent {
  row: any;
  column: TableColumn;
}
