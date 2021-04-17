import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: number): Promise<User> {
    if (await this.userRepo.findOne(id)) {
      return this.userRepo.findOne(id);
    } else throw new NotFoundException();
  }

  async register(user: User): Promise<User> {
    const username: string = user.username;
    const usr: User = await this.userRepo.findOne({ username });
    if (!usr) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      user.password = hashedPassword;
      return await this.userRepo.save(user);
    } else throw new BadRequestException('User Already Exists');
  }

  async update(id: number, user: User): Promise<UpdateResult> {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    return await this.userRepo.update(id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ [key: string]: string }> {
    const emailRegex = /\S+@\S+\.\S+/;
    const isEmail: boolean = emailRegex.test(username);
    const user: User = !isEmail
      ? await this.userRepo.findOne({ username: username })
      : await this.userRepo.findOne({ email: username });
    if (!user) {
      throw new BadRequestException('Invalid Username');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid Password');
    }
    const jwt: string = this.jwtService.sign({
      uid: user.id,
      uname: user.username,
    });
    return { message: 'Login Successful', token: jwt };
  }
}
