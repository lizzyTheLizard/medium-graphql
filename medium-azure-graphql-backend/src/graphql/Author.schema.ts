import { Field, ID, ObjectType } from 'type-graphql';
import { Author } from '../domain/author/Author';

@ObjectType()
export class AuthorSchema {
    @Field((type) => ID)
    id: string;

    @Field()
    firstName: string;

    @Field({ nullable: true })
    middleName?: string;

    @Field()
    lastName: string;

    constructor(author: Author) {
        this.id = author.id;
        this.firstName = author.firstName;
        this.lastName = author.lastName;
    }
}
