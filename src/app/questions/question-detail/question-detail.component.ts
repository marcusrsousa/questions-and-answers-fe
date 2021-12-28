import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../model/question';
import { QuestionService } from '../question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, finalize, Subject } from 'rxjs';
import { loader } from 'src/app/shared/rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.sass']
})
export class QuestionDetailComponent implements OnInit {

  question: Question = {
    id: 0,
    statement: "",
    answer: "",
    userName: ""
  };

  loading$ = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private snarckBarService: SnackBarService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    questionService.getById(id).subscribe(question => this.question = question)
  }

  ngOnInit(): void {
  }

  onSave() {
    this.questionService.update(this.question).pipe(loader(this.loading$), finalize(() => this.snarckBarService.openAndRedirect("Answer saved.", "/questions"))).subscribe();

  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

}


