import { Field, ID, ObjectType } from 'type-graphql';
import { Book } from '../domain/book/Book';

@ObjectType()
export class BookSchema {
    @Field((type) => ID)
    id: string;

    @Field()
    title: string;

    authorId: string;

    constructor(book: Book) {
        this.id = book.id;
        this.title = book.title;
        this.authorId = book.authorId;
    }
}
