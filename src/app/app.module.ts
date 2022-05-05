import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';

import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiscoverComponent } from './components/main-page/discover/discover.component';
import { SearchComponent } from './components/main-page/search/search.component';
import { CreateComponent } from './components/main-page/create/create.component';
import { ProfileComponent } from './components/main-page/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { PictureListComponent } from './components/main-page/picture-list/picture-list.component';
import { PictureListItemComponent } from './components/main-page/picture-list/picture-list-item/picture-list-item.component';
import { DivDescriptionComponent } from './components/main-page/create/div-description/div-description.component';
import { PostComponent } from './components/main-page/post/post.component';
import { AlertDialogComponent } from './components/dialog/alert-dialog/alert-dialog.component';
import { PictureDialogComponent } from './components/dialog/picture-dialog/picture-dialog.component';
import { PostPictureComponent } from './components/main-page/post/post-picture/post-picture.component';
import { ClickOutSideHandleDirective } from './directives/click-out-side-handle.directive';
import { EditComponent } from './components/main-page/edit/edit.component';
import { UserListComponent } from './components/main-page/user-list/user-list.component';
import { UserListItemComponent } from './components/main-page/user-list/user-list-item/user-list-item.component';
import { AccountComponent } from './components/main-page/account/account.component';
import { AccountEditComponent } from './components/main-page/account/account-edit/account-edit.component';
import { AccountChangePasswordComponent } from './components/main-page/account/account-change-password/account-change-password.component';
import { AccountChangeAvatarComponent } from './components/main-page/account/account-change-avatar/account-change-avatar.component';
import { UploadProfileComponent } from './components/dialog/upload-profile/upload-profile.component';
import { PageNotFoundComponent } from './components/main-page/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    DiscoverComponent,
    SearchComponent,
    CreateComponent,
    ProfileComponent,
    LoginComponent,
    SigninComponent,
    PictureListComponent,
    PictureListItemComponent,
    DivDescriptionComponent,
    AlertDialogComponent,
    PostComponent,
    PictureDialogComponent,
    PostPictureComponent,
    ClickOutSideHandleDirective,
    EditComponent,
    UserListComponent,
    UserListItemComponent,
    AccountComponent,
    AccountEditComponent,
    AccountChangePasswordComponent,
    AccountChangeAvatarComponent,
    UploadProfileComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatMenuModule,
    MatProgressBarModule,
    MatStepperModule,
    ImageCropperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
