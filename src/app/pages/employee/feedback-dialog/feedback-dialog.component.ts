import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback-dialog',
  standalone: true,
  imports: [MatFormFieldModule,MatRadioGroup,MatRadioButton,CommonModule,FormsModule],
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.scss'
})
export class FeedbackDialogComponent {
  selectedFeedbackType: string = '';

  constructor(
    private dialogRef: MatDialogRef<FeedbackDialogComponent>,
    private feedbackService: FeedbackService,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: { menu: { id: number } } }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.selectedFeedbackType) {
      console.error('Feedback type is not selected');
      return;
    }

    const { menu: { id: menuId } } = this.data.reservation;

    this.feedbackService.addFeedback(this.selectedFeedbackType, menuId).subscribe({
      next: () => this.dialogRef.close(this.selectedFeedbackType),
      error: (err) => console.error(err),
    });
  }
}