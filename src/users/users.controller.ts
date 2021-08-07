import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('auth')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.userService.create(body.email, body.password);
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Get()
    findAllUsers() {
        return this.userService.find();
    }
    @Put()
    updateUser(@Body() body: CreateUserDto) {

    }

}
