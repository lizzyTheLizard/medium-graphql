import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class BookSchema {
    @Field((type) => ID)
    id: string;

    @Field()
    title: string;

    authorId: string;
}
