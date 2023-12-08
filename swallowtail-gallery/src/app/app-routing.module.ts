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
import { AccountEditComponent } from './components/main-page/account/account-edit/account-edit.component';
import { AccountChangePasswordComponent } from './components/main-page/account/account-change-password/account-change-password.component';
import { AccountChangeAvatarComponent } from './components/main-page/account/account-change-avatar/account-change-avatar.component';
import { PageNotFoundComponent } from './components/main-page/page-not-found/page-not-found.component';
import { auth } from './middleware/auth';
import { guest } from './middleware/guest';
import { RegisterComponent } from './components/auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [auth],
    children: [
      { path: '', component: DiscoverComponent, title: 'Swallowtail Gallery' },
      {
        path: 'search',
        component: SearchComponent,
        title: 'Swallowtail Gallery | Search',
      },
      {
        path: 'create',
        component: CreateComponent,
        title: 'Swallowtail Gallery | Create',
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
      },
      { path: 'post', component: PostComponent },
      {
        path: 'edit',
        component: EditComponent,
        title: 'Swallowtail Gallery | Edit',
      },
      {
        path: 'account',
        component: AccountComponent,
        title: 'Swallowtail Gallery | Account',
        children: [
          { path: 'edit', component: AccountEditComponent },
          { path: 'password', component: AccountChangePasswordComponent },
          { path: 'avatar', component: AccountChangeAvatarComponent },
        ],
      },
      { path: 'pagenotfound', component: PageNotFoundComponent },
    ],
  },
  {
    path: 'login',
    canActivate: [guest],
    component: LoginComponent,
  },
  {
    path: 'signup',
    canActivate: [guest],
    component: RegisterComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'pagenotfound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
