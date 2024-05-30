import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './user.dto';
import { UsersService } from './users.service';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit') limit: string,
    @Query('sortDesc', ParseBoolPipe) sort: boolean,
  ) {
    console.log(page, limit, sort);
    const result = this.userService.fetchUsers();
    return result;
  }

  @Post()
  createUser(@Req() req: Request) {
    try {
      console.log(req.body);
      const result = this.userService.createUser(req.body);
      return result;
      // res.send({
      //   status: 201,
      //   success: true,
      //   message: 'user created',
      //   data: req.body,
      // });
    } catch (error) {
      console.log(error);
      throw new HttpException('something went wrong.', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createDemoUser(@Body() userDate: CreateUserDto, @Res() res: Response) {
    console.log(userDate);
    res.send({
      status: 201,
      success: true,
      message: 'user created',
      data: userDate,
    });
  }

  @Get(':id/:postId')
  getUserById(
    @Param('id') id: Types.ObjectId,
    @Param('postId') postId: string,
    @Req() req: Request,
  ) {
    try {
      // console.log(req.params);
      const result = this.userService.getUserById(id);
      console.log(req.user, 'auth');
      console.log(id, postId);
      console.log(result, '=========');
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('something went wrong.', HttpStatus.BAD_REQUEST);
    }
  }
}
