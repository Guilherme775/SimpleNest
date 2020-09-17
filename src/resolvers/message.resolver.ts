import {
  Args,
  Mutation,
  Query,
  Resolver,
  Parent,
  ResolveField,
  Subscription,
} from '@nestjs/graphql';
import Message from 'src/database/models/message.entity';
import User from 'src/database/models/user.entity';
import RepoService from 'src/repo.service';
import { MessageInput, DeleteMessageInput } from './input/message.input';
import { PubSub } from 'graphql-subscriptions';

export const pubSub = new PubSub();

@Resolver(() => Message)
class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }

  @Query(() => Message, { nullable: true })
  public async getMessagesFromUser(
    @Args('usersId') usersId: number,
  ): Promise<Message[]> {
    return this.repoService.messageRepo.find({
      where: { usersId },
    });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }

  @Mutation(() => Message)
  public async createMessage(
    @Args('data') input: MessageInput,
  ): Promise<Message> {
    const message = this.repoService.messageRepo.create({
      message: input.message,
      usersId: input.usersId,
    });

    const response = await this.repoService.messageRepo.save(message);

    pubSub.publish('messageAdded', { messageAdded: message });

    return response;
  }

  @Mutation(() => Message)
  public async deleteMessage(
    @Args('data') input: DeleteMessageInput,
  ): Promise<Message> {
    const message = await this.repoService.messageRepo.findOne({
      where: {
        id: input.id,
        usersId: input.usersId,
      },
    });

    if (!message)
      throw new Error('message does not exist or you are not author');

    const copy = { ...message };

    await this.repoService.messageRepo.remove(message);

    return copy;
  }

  @Subscription(() => Message)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }

  @ResolveField(() => User, { name: 'user' })
  public async getUser(@Parent() parent: Message): Promise<User> {
    return this.repoService.userRepo.findOne(parent.usersId);
  }
}
export default MessageResolver;
