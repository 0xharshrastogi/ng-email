import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { EmailCreateComponent } from './email-create/email-create.component';
import { EmailIndexComponent } from './email-index/email-index.component';
import { EmailPlaceholderComponent } from './email-placeholder/email-placeholder.component';
import { EmailReplyComponent } from './email-reply/email-reply.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { HomeComponent } from './home/home.component';
import { InboxRoutingModule } from './inbox-routing.module';
import { EmailFormComponent } from './email-form/email-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    EmailCreateComponent,
    EmailReplyComponent,
    EmailIndexComponent,
    EmailShowComponent,
    EmailPlaceholderComponent,
    EmailFormComponent,
  ],
  imports: [CommonModule, InboxRoutingModule, HttpClientModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class InboxModule {}
