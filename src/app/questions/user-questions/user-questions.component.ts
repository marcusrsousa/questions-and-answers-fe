import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Question } from '../model/question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.sass']
})
export class UserQuestionsComponent implements OnInit {

  questions: Observable<Question[]>;
  user: string;

  constructor(private route: ActivatedRoute, private questionService: QuestionService, public dialog: MatDialog, private snackBarService: SnackBarService) {
    this.user = this.route.snapshot.paramMap.get('user') ?? '';
    this.questions = this.questionService.findByUser(this.user);
  }

  ngOnInit(): void {
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => result ? this.questionService.delete(id).pipe(finalize(() => this.snackBarService.open('Question deleted'))).subscribe(() => this.questions = this.questionService.findByUser(this.user)) : '');

  }

}

@Component({
  selector: 'dialog-delete',
  templateUrl: './dialog-delete.html',
})
export class DeleteDialog { }
