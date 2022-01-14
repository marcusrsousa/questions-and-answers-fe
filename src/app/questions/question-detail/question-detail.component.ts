import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subject, Subscription } from 'rxjs';
import { loader } from 'src/app/shared/rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { AnswerService } from '../answer.service';

import { Question } from '../model/question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.sass']
})
export class QuestionDetailComponent implements OnInit, OnDestroy {

  answer = new FormControl('', [Validators.required]);

  question: Question = {
    id: 0,
    statement: '',
    answers: [],
    user: {
      id: 0,
      name: ''
    }
  };

  loading$ = new Subject<boolean>();
  getByIdRef: Subscription;
  updateRef: Subscription | null = null;

  constructor(private route: ActivatedRoute, private answerService: AnswerService, private snarckBarService: SnackBarService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getByIdRef = answerService.getByQuestionId(id).subscribe(question => {
      this.question = question;
    });
  }

  ngOnInit(): void {
  }

  onSave() {
    if (this.answer.invalid) {
      this.answer.markAsTouched();
      return;
    }

    this.question.answers.push();
    this.updateRef = this.answerService.create(this.question.id, { id: 0, text: this.answer.value }).pipe(loader(this.loading$), finalize(() => this.snarckBarService.openAndRedirect('Answer saved.', '/questions'))).subscribe();

  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  ngOnDestroy() {
    this.getByIdRef.unsubscribe();

    if (this.updateRef) {
      this.updateRef.unsubscribe();
    }

  }

}



