import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { name: 'akash', email: 'akki@gmail.com' },
    { name: 'ravi', email: 'ravi@gmail.com' },
    { name: 'sham', email: 'sham@gmail.com' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }
}
