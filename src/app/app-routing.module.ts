import { AccountComponent } from './components/main-page/account/account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateComponent } from './components/main-page/create/create.component';
import { DiscoverComponent } from './components/main-page/discover/discover.component';
import { EditComponent } from './components/main-page/edit/edit.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PostComponent } from './components/main-page/post/post.component';
import { ProfileComponent } from './components/main-page/profile/profile.component';
import { SearchComponent } from './components/main-page/search/search.component';
import { SigninComponent } from './components/signin/signin.component';
import { AccountEditComponent } from './components/main-page/account/account-edit/account-edit.component';
import { AccountChangePasswordComponent } from './components/main-page/account/account-change-password/account-change-password.component';
import { AccountChangeAvatarComponent } from './components/main-page/account/account-change-avatar/account-change-avatar.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', component: DiscoverComponent },
      { path: 'search', component: SearchComponent },
      { path: 'create', component: CreateComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'post', component: PostComponent },
      { path: 'edit', component: EditComponent },
      {
        path: 'account',
        component: AccountComponent,
        children: [
          { path: 'edit', component: AccountEditComponent },
          { path: 'password', component: AccountChangePasswordComponent },
          { path: 'avatar', component: AccountChangeAvatarComponent },
        ],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
