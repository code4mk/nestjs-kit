import { userStub } from '../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  getHello: jest.fn().mockReturnValue(userStub()),
});
