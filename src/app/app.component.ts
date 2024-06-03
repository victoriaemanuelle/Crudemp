import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Crudemp';

  constructor(private _dialog: MatDialog) { }
  ngOnInit(): void {
  }

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent)
  }
}
