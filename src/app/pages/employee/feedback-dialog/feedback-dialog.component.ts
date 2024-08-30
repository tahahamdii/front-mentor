import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  feedback: string = '';

  constructor(
    private dialogRef: MatDialogRef<FeedbackDialogComponent>,
    private feedbackService: FeedbackService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.feedbackService.addFeedback({ feedback: this.feedback }).subscribe({
      next: () => this.dialogRef.close(),
      error: (err) => console.error(err),
    });
  }
}