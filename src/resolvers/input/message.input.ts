import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  @Field()
  readonly message: string;

  @Field()
  readonly usersId: number;
}

@InputType()
export class DeleteMessageInput {
  @Field()
  readonly id: number;

  @Field()
  readonly usersId: number;
}
