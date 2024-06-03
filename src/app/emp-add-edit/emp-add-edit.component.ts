import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  providers: [provideNativeDateAdapter(), EmployeeService],
  imports: [MatInputModule, MatFormFieldModule, FormsModule,
    MatDatepickerModule, MatRadioModule, MatButtonModule,
    ReactiveFormsModule, NgFor, MatSelectModule, MatDialogClose
  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent implements OnInit {

  education: string[] =
    [
      'Matric',
      'Diploma',
      'Intermediate',
      'Masters'
    ];

  empForm: FormGroup;
  Save: any;


  constructor(private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _empService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Employee updated sucessfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err)
            }
          })
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added sucessfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err)
          },
        });
      }
    }
  }
}
