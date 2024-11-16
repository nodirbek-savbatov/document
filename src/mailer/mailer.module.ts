import { MailerService } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailerCustomService } from "./mailer.service";

@Module({
    providers: [MailerCustomService]
})
export class MailerCustomModule { }