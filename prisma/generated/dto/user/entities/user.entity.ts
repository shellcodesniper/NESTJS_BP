
import {Post} from '../../post/entities/post.entity'


export class User {
  id: number ;
email: string ;
name: string ;
posts?: Post[] ;
createdAt: Date ;
updatedAt: Date ;
}
