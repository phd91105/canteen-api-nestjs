import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }
  async findOne(id: number): Promise<any> {
    return (await this.userRepo.findOne(id))
      ? this.userRepo.findOne(id)
      : { status: HttpStatus.NOT_FOUND, msg: 'Not found' };
  }

  async register(user: UserEntity): Promise<any> {
    const username = await this.userRepo.findOne(user.username);
    if (!username) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      return await this.userRepo.save({
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        password: hashedPassword,
      });
    } else
      return { status: HttpStatus.BAD_REQUEST, msg: 'User already exists' };
  }

  async update(id: number, user: UserEntity): Promise<UpdateResult> {
    return await this.userRepo.update(id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({ username });
    if (!user) {
      throw new BadRequestException('Invalid username');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid password');
    }
    const jwt = this.jwtService.sign({ id: user.id });
    delete user.password;
    return { msg: 'Login success', token: jwt };
  }
}
