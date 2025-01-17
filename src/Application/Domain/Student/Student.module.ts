import { Module } from '@nestjs/common';
import { StudentController } from './Student.controller';
import { StudentService } from './Student.service';
import { RepositoriesModule } from 'src/Application/Repositories/Repositories.module';
import { AuthJwtGuard } from '../Auth/guards/auth.guard';
import { RolesGuard } from '../Auth/AccessControl/role.guard';

@Module({
  imports: [RepositoriesModule],
  controllers: [StudentController],
  providers: [StudentService, AuthJwtGuard, RolesGuard],
  exports: [StudentService],
})
export class StudentModule {}
