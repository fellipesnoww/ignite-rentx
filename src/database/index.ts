import { Database } from '@nozbe/watermelondb';
import SqliteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { User } from './models/User';
import { schemas } from './schema';

//Cria nova instancia e configura qual é o adaptador que será utilizado
const adapter = new SqliteAdapter({
    schema: schemas,
});


//Cria nova instancia do banco de dados informando o adapter e quais serão as classes utilizadas no banco de dados
export const database = new Database({
    adapter,    
    modelClasses: [User]    
})
