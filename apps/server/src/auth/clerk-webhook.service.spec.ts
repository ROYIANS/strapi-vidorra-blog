import { Test, TestingModule } from '@nestjs/testing';
import { ClerkWebhookService } from './clerk-webhook.service';
import { AuthService } from './auth.service';

describe('ClerkWebhookService', () => {
  let service: ClerkWebhookService;
  let authService: {
    syncClerkUser: jest.Mock;
    deleteClerkUser: jest.Mock;
  };

  beforeEach(async () => {
    authService = {
      syncClerkUser: jest.fn(),
      deleteClerkUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClerkWebhookService,
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    service = module.get<ClerkWebhookService>(ClerkWebhookService);
  });

  it('syncs user on user.created event', async () => {
    await service.handleEvent({
      type: 'user.created',
      data: {
        id: 'user_123',
        username: 'alice',
        first_name: 'Alice',
        last_name: 'Doe',
        image_url: 'https://example.com/avatar.png',
        primary_email_address_id: 'email_1',
        email_addresses: [
          { id: 'email_1', email_address: 'alice@example.com' },
          { id: 'email_2', email_address: 'backup@example.com' },
        ],
      },
    });

    expect(authService.syncClerkUser).toHaveBeenCalledWith({
      sub: 'user_123',
      email: 'alice@example.com',
      username: 'alice',
      given_name: 'Alice',
      family_name: 'Doe',
      image_url: 'https://example.com/avatar.png',
    });
  });

  it('syncs user on user.updated event with fallback email selection', async () => {
    await service.handleEvent({
      type: 'user.updated',
      data: {
        id: 'user_124',
        username: null,
        first_name: null,
        last_name: null,
        image_url: null,
        primary_email_address_id: null,
        email_addresses: [{ id: 'email_x', email_address: 'bob@example.com' }],
      },
    });

    expect(authService.syncClerkUser).toHaveBeenCalledWith({
      sub: 'user_124',
      email: 'bob@example.com',
      username: undefined,
      given_name: undefined,
      family_name: undefined,
      image_url: undefined,
    });
  });

  it('removes user on user.deleted event', async () => {
    await service.handleEvent({
      type: 'user.deleted',
      data: {
        id: 'user_999',
      },
    });

    expect(authService.deleteClerkUser).toHaveBeenCalledWith('user_999');
  });

  it('ignores unsupported event types', async () => {
    await service.handleEvent({
      type: 'session.created',
      data: {
        id: 'sess_1',
      },
    });

    expect(authService.syncClerkUser).not.toHaveBeenCalled();
    expect(authService.deleteClerkUser).not.toHaveBeenCalled();
  });
});
