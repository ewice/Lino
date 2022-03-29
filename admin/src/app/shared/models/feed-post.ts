export class FeedPost {
  _id: string;
  author: string;
  creationDate: Date;
  text: string;
  projektId: string;
  imgUrl: string;
  likes: [];

  toggleLike(userId: string) {}

  addImage(imgUrl: string) {}

  createPost(feedPost: FeedPost) {}
}
