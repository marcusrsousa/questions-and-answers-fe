import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { MaterialModule } from '../shared/modules/material/material.module';



@NgModule({
  declarations: [
    QuestionsListComponent,
    QuestionDetailComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    MaterialModule
  ]
})
export class QuestionsModule { }
