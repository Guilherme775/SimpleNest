import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from './database/models/user.entity';
import Message from './database/models/message.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Message) public readonly messageRepo: Repository<Message>,
  ) {}
}

export default RepoService;
