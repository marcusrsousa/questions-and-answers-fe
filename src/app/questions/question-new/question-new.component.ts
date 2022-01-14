import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { DialogLoginComponent } from 'src/app/shared/components/dialog-login/dialog-login.component';
import { loader } from 'src/app/shared/rxjs';
import { LoginService } from 'src/app/shared/services/login.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Question } from '../model/question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.sass']
})
export class QuestionNewComponent implements OnInit, OnDestroy {

  statement = new FormControl('', [Validators.required]);
  question: Question = {
    id: 0,
    statement: '',
    answers: [],
    user: {
      id: 0,
      name: ''
    }
  };

  id: number;

  loading$ = new Subject<boolean>();

  verifyLoggedInSubscription: Subscription;
  isTokenValidSubscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private snarckBarService: SnackBarService, public dialog: MatDialog, public loginService: LoginService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.verifyLoggedInSubscription = this.verifyLoggedIn().subscribe(isLoggedIn => {
      if (this.id && isLoggedIn) {
        this.questionService.getById(this.id).subscribe({
          next: question => {
            this.question = question;
            this.statement.setValue(question.statement);
          },
          error: err => this.snarckBarService.open(err.error)
        });
      }
    });
  }

  ngOnInit(): void {
  }

  onSave() {
    if (this.statement.invalid) {
      this.statement.markAsTouched();
      return
    }

    this.question.statement = this.statement.value;

    if (this.id) {
      this.questionService.update(this.question).pipe(loader(this.loading$)).subscribe({
        complete: () => this.snarckBarService.openAndRedirect('Question updated.', '/questions/author/' + this.question.user),
        error: err => this.snarckBarService.open(err.error)
      });
      return;
    }
    this.questionService.create(this.question).pipe(loader(this.loading$)).subscribe({
      complete: () => this.snarckBarService.openAndRedirect('Question created.', '/questions'),
      error: err => this.snarckBarService.open(err.error)
    });

  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  private verifyLoggedIn(): Observable<boolean> {
    return new Observable(subscriber => {
      this.isTokenValidSubscription = this.loginService.isTokenValid().subscribe(isTokenValid => {
        if (!isTokenValid) {
          let ref = this.dialog.open(DialogLoginComponent, { width: '400px' });
          ref.disableClose = true;
        }

        return subscriber.next(isTokenValid);

      })
    });
  }

  ngOnDestroy(): void {
    this.verifyLoggedInSubscription.unsubscribe();
    if (this.isTokenValidSubscription) {
      this.isTokenValidSubscription.unsubscribe();
    }
  }

}
