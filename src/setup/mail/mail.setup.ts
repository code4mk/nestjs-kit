import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST || '',
        port: process.env.MAIL_PORT || '',
        ignoreTLS: true,
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME || '',
          pass: process.env.MAIL_PASSWORD || '',
        },
      },
      defaults: {
        from: `${process.env.MAIL_FROM_NAME} ${process.env.MAIL_FROM_ADDRESS}`,
      },
      template: {
        dir: path.join(process.env.PWD, 'dist/templates/mail/pages'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: path.join(process.env.PWD, 'dist/templates/mail/partials'),
          options: {
            strict: true,
          },
        },
      },
    }),
  ],
  providers: [],
})

export default class MailSetupModule {}
