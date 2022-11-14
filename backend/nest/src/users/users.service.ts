import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    await this.isEmailInUse(dto);
    await this.isUsernameInUse(dto);

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const { password, ...user } = await this.usersRepository.save({
      ...dto,
      password: passwordHash,
    });

    return user;
  }

  async isUsernameInUse(dto: CreateUserDto) {
    const usernameInUse = await this.usersRepository.findOneBy({
      username: dto.username,
    });

    if (usernameInUse) throw new ConflictException('Username already in use');
  }

  async isEmailInUse(dto: CreateUserDto) {
    const emailInUse = await this.usersRepository.findOneBy({
      email: dto.email,
    });

    if (emailInUse) throw new ConflictException('Email already in use');
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
