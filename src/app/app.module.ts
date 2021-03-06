import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgMaterialModule } from  './ng-material/ng-material.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from  '@angular/forms';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ExcerptPipe } from './custompipes/excerpt.pipe';
import { SlugPipe } from './custompipes/slug.pipe';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogComponent } from './components/blog/blog.component';
import { AngularFireAuthModule } from  '@angular/fire/auth';
import { AuthGuard } from './guards/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    BlogEditorComponent,
    ExcerptPipe,
    SlugPipe,
    BlogCardComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
	AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
	BrowserAnimationsModule,
	NgMaterialModule,
	 RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
	  { path: 'addpost', component: BlogEditorComponent, canActivate: [AuthGuard] },
	  { path: 'blog/:id/:slug', component: BlogComponent },
	  { path: 'editpost/:id', component: BlogEditorComponent, canActivate: [AuthGuard]},
      { path: '**', component: HomeComponent }
    ]),
	FormsModule,
  CKEditorModule,
  AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
