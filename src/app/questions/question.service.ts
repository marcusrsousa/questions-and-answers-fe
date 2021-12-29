import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Question } from './model/question';


  
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly QUESTION_URL = 'http://localhost:8080/question';

  constructor(private http : HttpClient) { }

  list():Observable<Question[]> {
    return this.http.get<Question[]>(this.QUESTION_URL);
  }

  findByUser(user: string):Observable<Question[]> {
    return this.http.get<Question[]>(this.QUESTION_URL + '?user=' + user);
  }

  getById(id: number):Observable<Question> {
    return this.http.get<Question>(this.QUESTION_URL + '/' + id).pipe(map(question => ({ ...question, answer: question.answer ?? '' })));
  }

  update(question: Question):Observable<Question> {
    return this.http.put<Question>(this.QUESTION_URL + '/' + question.id, question);
  }

  create(question: Question):Observable<Question> {
    return this.http.post<Question>(this.QUESTION_URL, question);
  }

  delete(id: number):Observable<Question> {
    return this.http.delete<Question>(this.QUESTION_URL  + '/' + id);
  }
}
