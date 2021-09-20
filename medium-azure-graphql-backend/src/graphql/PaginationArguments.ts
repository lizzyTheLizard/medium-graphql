import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaginationAguments {
    @Field((type) => Int, { nullable: true })
    @Min(0)
    skip: number = 0;

    @Field((type) => Int, { nullable: true })
    @Min(1)
    @Max(50)
    take: number | undefined;
}
