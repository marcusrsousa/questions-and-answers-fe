import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable } from 'rxjs';

import { Pagination } from '../shared/pagination';
import { Question } from './model/question';



@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly QUESTION_URL = 'http://localhost:8080/question';

  constructor(private http: HttpClient) { }

  list(pageEvent: PageEvent): Observable<Pagination<Question>> {
    return this.http.get<Pagination<Question>>(this.QUESTION_URL + '?page=' + (pageEvent.pageIndex + 1) + '&size=' + pageEvent.pageSize);
  }

  findByUser(user: string, pageEvent: PageEvent): Observable<Pagination<Question>> {
    return this.http.get<Pagination<Question>>(this.QUESTION_URL + '?user_id=' + user + '&page=' + (pageEvent.pageIndex + 1) + '&size=' + pageEvent.pageSize);
  }

  getById(id: number): Observable<Question> {
    return this.http.get<Question>(this.QUESTION_URL + '/' + id).pipe(map(question => ({ ...question, answers: question.answers ?? [] })));
  }

  update(question: Question): Observable<Question> {
    return this.http.put<Question>(this.QUESTION_URL + '/' + question.id, question);
  }

  create(question: Question): Observable<Question> {
    return this.http.post<Question>(this.QUESTION_URL, question);
  }

  delete(id: number): Observable<Question> {
    return this.http.delete<Question>(this.QUESTION_URL + '/' + id);
  }
}
