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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const feedbackData = {
      feedbackType: this.selectedFeedbackType, // Feedback type selected by the user
      menu: this.data.reservation.menu // Menu ID from the reservation data
    };

    this.feedbackService.addFeedback(feedbackData).subscribe({
      next: () => this.dialogRef.close(this.selectedFeedbackType),
      error: (err) => console.error(err),
    });
  }
}