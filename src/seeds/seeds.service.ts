import { HASH_SALT } from "@constants";
import { User, UserRoles } from "@modules";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { hash } from "bcrypt";

@Injectable()
export class SeedsService implements OnModuleInit {
    constructor(
        @InjectModel(User) private userModel: typeof User
    ) { }

    async onModuleInit() {
        await this.seedUsers()
    }

    async seedUsers(): Promise<void> {
        const usersCount = await this.userModel.count()

        if (usersCount == 0) {
            await this.userModel.create({
                full_name: "Arslon Yo'doshev",
                email: 'admin@gmail.com',
                password: await hash('admin',HASH_SALT),
                role: UserRoles.ADMIN
            })
        }
    }
}