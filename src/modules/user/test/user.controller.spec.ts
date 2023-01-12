import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

jest.mock('../user.service');

describe('user-controller', () => {
  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    // instance controller and service.
    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('get project', async () => {
    const req: Request = getMockReq({
      params: { },
      body: { },
    });
    const { res } = getMockRes();

    controller.getHello(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ project: 'nestjskit' }),
    );
  });
});
