import { User } from './user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });

        return this.repo.save(user);
    }

    async findOne(id: string) {
        const user = await this.repo.findOne(id);
        if (!user) throw new NotFoundException('No user found');
        return user;
    }
    async find() {
        const users = await this.repo.find();
        return users
    }
    async update(id: number, attrs: Partial<User>) {
        const user = await this.repo.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, attrs);
        return await this.repo.save(user);
    }
    async remove(id: number) {
        const user = await this.repo.findOne(id);
        if (!user) throw new NotFoundException('User not found');
        return await this.repo.remove(user);
    }
}
