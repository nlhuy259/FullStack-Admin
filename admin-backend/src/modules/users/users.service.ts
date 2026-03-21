import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import aqp from 'api-query-params';
import { hashPasswordHelper } from '@/helper/util';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService,
) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hashPasswordHelper(createUserDto.password);

    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return {
      id: newUser._id,
    }
  }

  async findAll(query: string, current: number = 1, pageSize: number = 10) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    const totalItem = (await this.userModel.find(filter)).length;
    const totalPage = Math.ceil(totalItem / pageSize);

    const skip = (current - 1) * pageSize;

    const result = await this.userModel
    .find(filter)
    .limit(pageSize)
    .skip(skip)
    .select('-password')
    .sort(sort as any) ;
    return {result, totalItem, totalPage};
  }

  async findOne(_id: string) {
    if (mongoose.isValidObjectId(_id)) {
      return await this.userModel.findOne({ _id }).select('-password');
    } else {
      throw new BadRequestException('Invalid userId');
    }
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email })
  }

  async isEmailExists(email: string) {
    return await this.userModel.exists({ email })
  }
  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({
      _id: updateUserDto._id
    }, {...updateUserDto })
  }

  async remove(_id: string) {
    if (mongoose.isValidObjectId(_id)) {
      return await this.userModel.deleteOne({ _id });
    } else {
      throw new BadRequestException('Invalid userId');
    }
  }

  async handleRegister(registerDto: CreateAuthDto) {
    const { email, password, name } = registerDto;
    const isExist = await this.isEmailExists(email);
    if (isExist) {
      throw new BadRequestException('Invalid email');
    }

    const codeId = uuidv4();
    const codeExpired = dayjs().add(1, 'hour').toDate();
    const hashedPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name, email, password: hashedPassword,
      isVerified: false,
      codeId: codeId,
      codeExpired: codeExpired,
    });

    await this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Testing Nest MailerModule ✔', // Subject line
      template: 'register',
      context: {
        name: user?.name?? user.email,
        code: codeId,
        expireTime: codeExpired,
        year: '2026',
      },
    })
    .then(() => {})
    .catch(() => {});
    //Send email logic here
    return {
      userId: user._id
    }
  }
}
