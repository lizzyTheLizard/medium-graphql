import { Length, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class NewAuthorInput {
  @Field()
  @MaxLength(30)
  firstName: string;

  @Field()
  @MaxLength(30)
  lastName: string;
}