import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

type ClerkEmailAddress = {
  id: string;
  email_address: string;
};

type ClerkUserEventData = {
  id: string;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  image_url?: string | null;
  primary_email_address_id?: string | null;
  email_addresses?: ClerkEmailAddress[];
};

type ClerkDeletedUserEventData = {
  id?: string | null;
};

export type ClerkWebhookEvent = {
  type: string;
  data: ClerkUserEventData | ClerkDeletedUserEventData;
};

@Injectable()
export class ClerkWebhookService {
  constructor(private readonly authService: AuthService) {}

  async handleEvent(event: ClerkWebhookEvent) {
    if (event.type === 'user.created' || event.type === 'user.updated') {
      const data = event.data as ClerkUserEventData;
      if (!data?.id) return;

      await this.authService.syncClerkUser({
        sub: data.id,
        email: this.getPrimaryEmail(data),
        username: data.username ?? undefined,
        given_name: data.first_name ?? undefined,
        family_name: data.last_name ?? undefined,
        image_url: data.image_url ?? undefined,
      });
      return;
    }

    if (event.type === 'user.deleted') {
      const data = event.data as ClerkDeletedUserEventData;
      if (!data?.id) return;

      await this.authService.deleteClerkUser(data.id);
    }
  }

  private getPrimaryEmail(data: ClerkUserEventData) {
    const emails = data.email_addresses ?? [];
    if (emails.length === 0) return undefined;

    if (data.primary_email_address_id) {
      const primary = emails.find((email) => email.id === data.primary_email_address_id);
      if (primary?.email_address) return primary.email_address;
    }

    return emails[0]?.email_address;
  }
}
