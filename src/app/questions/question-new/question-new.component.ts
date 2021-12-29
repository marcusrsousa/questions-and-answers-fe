import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subject } from 'rxjs';
import { loader } from 'src/app/shared/rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

import { Question } from '../model/question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.sass']
})
export class QuestionNewComponent implements OnInit {

  question: Question = {
    id: 0,
    statement: '',
    answer: '',
    user: ''
  };

  id: number;

  loading$ = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private snarckBarService: SnackBarService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      questionService.getById(this.id).subscribe(question => this.question = question)
    }
  }

  ngOnInit(): void {
  }

  onSave() {
    if (this.id) {
      this.questionService.update(this.question).pipe(loader(this.loading$), finalize(() => this.snarckBarService.openAndRedirect('Question updated.', '/questions/author/' + this.question.user))).subscribe();
      return;
    }
    this.questionService.create(this.question).pipe(loader(this.loading$), finalize(() => this.snarckBarService.openAndRedirect('Question created.', '/questions'))).subscribe();

  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
