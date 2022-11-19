import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';


class User extends Model {
    static table = 'users';
    
    @field('user_id') //Nome do campo na tabela
    user_id!: string; //Nome do campo na propria classe

    @field('name')
    name!: string;

    @field('email')
    email!: string;

    @field('driver_license')
    driver_license!: string;

    @field('avatar')
    avatar!: string;

    @field('token')
    token!: string;
}

export { User }

