import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Question } from '../model/question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.sass']
})
export class QuestionsListComponent implements OnInit {

  questions: Observable<Question[]>;
  
  constructor(private questionService : QuestionService) { 
    this.questions = this.questionService.list();
  }

  ngOnInit(): void {
  }

}
