import {appSchema} from '@nozbe/watermelondb'
import { carSchema } from './carSchema';

import {userSchema} from './userSchema';

//Centraliza todos os schemas da aplicação
//Configura o banco de dados em si
const schemas = appSchema({
    version: 2,
    tables: [
        userSchema,
        carSchema
    ]
});

export {schemas};