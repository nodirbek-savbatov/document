import { MailerService } from "@nestjs-modules/mailer";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ISendMailPayload } from "./interfaces";

@Injectable()
export class MailerCustomService {
    constructor(
        @Inject(ConfigService) private configService: ConfigService,
        @Inject(MailerService) private mailerService: MailerService
    ) { }

    async sendMail(payload: ISendMailPayload): Promise<void> {
        try {
            await this.mailerService.sendMail({
                to: payload.to,
                from: this.configService.get<string>('email.user'),
                subject: payload.subject,
                text: payload.text
            })
        } catch (error) {
            throw new ConflictException(error.message)
        }
    }
}