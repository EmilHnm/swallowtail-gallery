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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
