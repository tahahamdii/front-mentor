import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from '../menu-table/menu-table.component';

@Component({
  selector: 'app-update-menu-form',
  templateUrl: './update-menu-form.component.html',
})
export class UpdateMenuFormComponent {
  updateMenuForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateMenuFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Menu
  ) {
    this.updateMenuForm = this.fb.group({
      entree: [data.entree],
      platPrincipal: [data.platPrincipal],
      garniture: [data.garniture],
      dessert: [data.dessert],
      sandwiches: [data.sandwiches.join(', ')],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updatedMenu: Menu = {
      ...this.data,
      ...this.updateMenuForm.value,
      sandwiches: this.updateMenuForm.value.sandwiches.split(',').map((s: string) => s.trim()),
    };
    this.dialogRef.close(updatedMenu);
  }
}
