import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable } from 'rxjs';

import { Pagination } from '../shared/pagination';
import { Answer } from './model/answer';
import { Question } from './model/question';



@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private readonly QUESTION_URL = 'http://localhost:8080/question';

  constructor(private http: HttpClient) { }

  getByQuestionId(questionId: number): Observable<Question> {
    return this.http.get<Question>(this.QUESTION_URL + '/' + questionId + '/answer').pipe(map(question => ({ ...question, answers: question.answers ?? [] })));
  }

  update(questionId: number, answer: Answer): Observable<Question> {
    return this.http.put<Question>(this.QUESTION_URL + '/' + questionId  + '/answer', answer);
  }

  create(questionId: number, answer: Answer): Observable<Question> {
    return this.http.post<Question>(this.QUESTION_URL + '/' + questionId + '/answer', answer);
  }

  delete(questionId: number): Observable<Question> {
    return this.http.delete<Question>(this.QUESTION_URL + '/' + questionId + '/answer');
  }
}
