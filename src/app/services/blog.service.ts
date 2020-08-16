import { Injectable } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/firestore';
import { Post } from  '../models/post';
import { map } from  'rxjs/operators';
import { Observable, Subject } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private db: AngularFirestore) { }

createPost(post: Post) {
    const postData = JSON.parse(JSON.stringify(post));
    return this.db.collection('blogs').add(postData);
  }
 
 
  getAllPosts(): Observable<any> {
  const blogs = this.db.collection('blogs', ref => ref.orderBy('createdDate', 'desc')).snapshotChanges().pipe(
    map(actions => {
      return actions.map(
        c => ({
          postId: c.payload.doc.id,
          ...c.payload.doc.data() as Post
        }));
    }));
  return blogs;
}
getPostbyId(postId: string) {
	const  userDetails = this.db.doc('blogs/' + postId).valueChanges();
	return  userDetails;
}
deletePost(blogID: string) {
	return  this.db.doc('blogs/' + blogID).delete();
}
updatePost(postId: string, post: Post) {
	const  putData = JSON.parse(JSON.stringify(post));
	return  this.db.doc('blogs/' + postId).update(putData);
}

editValueSource = new Subject<string>();

editValue$ = this.editValueSource.asObservable();

getEditValue(value) {
    this.editValueSource.next(value);
  }

}
