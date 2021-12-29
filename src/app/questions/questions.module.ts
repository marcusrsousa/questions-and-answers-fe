import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/modules/material/material.module';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionNewComponent } from './question-new/question-new.component';
import { DeleteDialog, UserQuestionsComponent } from './user-questions/user-questions.component';



@NgModule({
  declarations: [
    QuestionsListComponent,
    QuestionDetailComponent, 
    QuestionNewComponent,
    UserQuestionsComponent,
    DeleteDialog
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    MaterialModule
  ]
})
export class QuestionsModule { }
