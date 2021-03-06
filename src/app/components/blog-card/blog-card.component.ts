import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Post } from 'src/app/models/post';
import { AppUser } from 'src/app/models/appuser';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
  blogPost: Post[] = [];
  appUser: AppUser;
  subscription: Subscription;
  editValue:boolean;
  constructor(private authService: AuthService, private blogService: BlogService) {
    this.authService.appUser$.subscribe(appUser  =>  this.appUser  =  appUser);
   }

  ngOnInit() {
  this.getBlogPosts();
  this.subscription = this.blogService.editValueSource.subscribe(
    editvalue => {
      if (editvalue=="edit"){
        this.editValue=true;
      }
  });
  }

  getBlogPosts() {
  this.blogService.getAllPosts().subscribe(result => {
    this.blogPost = result;
  });
}
delete(postId) {
if (confirm('Are you sure you want to delete Post')) {
  this.blogService.deletePost(postId).then(
    () => {
      alert("Blog deleted successfully");
    }
  );
 }
}

}
