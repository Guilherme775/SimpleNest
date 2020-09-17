import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import User from 'src/database/models/user.entity';
import RepoService from 'src/repo.service';
import UserInput from './input/user.input';

@Resolver(() => User)
class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User, { nullable: true })
  public async getUser(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: UserInput): Promise<User> {
    const user = this.repoService.userRepo.create({
      email: input.email,
      password: input.password,
    });

    return this.repoService.userRepo.save(user);
  }

  @Query(() => User)
  public async login(@Args('data') input: UserInput): Promise<User> {
    const email = input.email;
    const password = input.password;

    const login = await this.repoService.userRepo.findOne({
      where: { email, password },
    });

    if (!login) throw new Error('user not exist');

    return login;
  }
}
export default UserResolver;
