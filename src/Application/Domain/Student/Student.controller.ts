import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { TStudentPayload } from 'src/Application/@types';
import { RolesDecorator } from '../Auth/AccessControl/roles.decorator';
import { Role } from '../Auth/AccessControl/role';
import { AuthJwtGuard } from '../Auth/guards/auth.guard';
import { RolesGuard } from '../Auth/AccessControl/role.guard';

@Controller('student')
export class StudentController {
  @Get('protected')
  @UseGuards(AuthJwtGuard, RolesGuard)
  @RolesDecorator(Role.ADMIN, Role.STUDENT)
  protected(@Request() req: any) {
    const payload: TStudentPayload = req.user;

    const response = {
      message: 'you can access protected route',
      jwt_payload: payload,
    };

    return response;
  }
}
