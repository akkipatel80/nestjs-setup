import {
  Body,
  Controller,
  Get,
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
    return this.userService.fetchUsers();
  }

  @Post()
  createUser(@Req() req: Request, @Res() res: Response) {
    try {
      console.log(req.body);
      res.send({
        status: 201,
        success: true,
        message: 'user created',
        data: req.body,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 400,
        success: false,
        message: 'something went wrong.',
      });
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
    @Param('id', ParseIntPipe) id: number,
    @Param('postId') postId: string,
    @Res() res: Response,
  ) {
    // console.log(req.params);
    console.log(id, postId);
    res.send({
      status: 200,
      success: true,
      message: 'user get successfully.',
      data: { id, postId },
    });
  }
}
