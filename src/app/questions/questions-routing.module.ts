import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionNewComponent } from './question-new/question-new.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { UserQuestionsComponent } from './user-questions/user-questions.component';

const routes: Routes = [
  { path: '', children: [
  { path: 'new', component: QuestionNewComponent },
  { path: 'edit/:id', component: QuestionNewComponent },
  { path: ':id', component: QuestionDetailComponent },
  { path: 'author/:user', component: UserQuestionsComponent },
  { path: '', component: QuestionsListComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
