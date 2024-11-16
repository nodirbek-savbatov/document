import { User } from "@modules";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeedsService } from "./seeds.service";

@Module({
    imports : [SequelizeModule.forFeature([User])],
    providers : [SeedsService]
})
export class SeedsModule {}