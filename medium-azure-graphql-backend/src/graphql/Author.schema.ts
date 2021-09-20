import { Field, ID, ObjectType } from 'type-graphql';

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
}
