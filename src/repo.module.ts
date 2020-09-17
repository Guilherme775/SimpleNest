import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import User from './database/models/user.entity';
import Message from './database/models/message.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
