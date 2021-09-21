import { Length, MaxLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class NewAuthorInput {
    @Field()
    @MaxLength(30)
    firstName: string;

    @Field()
    @MaxLength(30)
    lastName: string;
}
