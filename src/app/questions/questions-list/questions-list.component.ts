import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/shared/pagination';

import { Question } from '../model/question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.sass']
})
export class QuestionsListComponent implements OnInit {

  page$: Observable<Pagination<Question>>;


  constructor(private questionService: QuestionService) {
    const pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 10;
    this.page$ = this.getPage(pageEvent);


  }

  ngOnInit(): void {
  }

  changePage(pageEvent: PageEvent) {
    this.page$ = this.getPage(pageEvent);
  }

  getPage(pageEvent: PageEvent) {
    return this.questionService.list(pageEvent);
  }

}
