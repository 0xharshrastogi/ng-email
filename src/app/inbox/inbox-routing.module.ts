import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailInfoResolver } from './email-info.resolver';

import { EmailPlaceholderComponent } from './email-placeholder/email-placeholder.component';
import { EmailReplyComponent } from './email-reply/email-reply.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Inbox',
    children: [
      {
        path: 'reply',
        component: EmailReplyComponent,
      },
      {
        path: ':id',
        component: EmailShowComponent,
        resolve: { email: EmailInfoResolver },
      },
      {
        path: '',
        component: EmailPlaceholderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
