import {appSchema} from '@nozbe/watermelondb'

import {userSchema} from './userSchema';

//Centraliza todos os schemas da aplicação
//Configura o banco de dados em si
const schemas = appSchema({
    version: 1,
    tables: [
        userSchema
    ]
});

export {schemas};