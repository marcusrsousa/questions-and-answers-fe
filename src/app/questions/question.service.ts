import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './model/question';
import { map } from 'rxjs';


  
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly QUESTION_URL = 'http://localhost:8080/question';

  constructor(private http : HttpClient) { }

  list() {
    return this.http.get<Question[]>(this.QUESTION_URL);
  }

  getById(id: number) {
    return this.http.get<Question>(this.QUESTION_URL + '/' + id).pipe(map(question => ({ ...question, answer: question.answer ?? "" })));
  }

  update(question: Question) {
    return this.http.put<Question>(this.QUESTION_URL + '/' + question.id, question);
  }
}
