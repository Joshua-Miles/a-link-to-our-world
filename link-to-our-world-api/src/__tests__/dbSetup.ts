import { Globals, LogLevels, Migrations, Database } from '@triframe/scribe'

if (!process.env.VERBOSE) {
    Globals.logLevel = LogLevels.Test;
}

const DATABASE_URL = process.env.DATABASE_URL?.replace('/battle_of_dorin_api', '/')

const databaseName = `test_db_${generateDBSuffix(10)}`

const root = new Database({
    connectionString: DATABASE_URL
})

Globals.database = new Database({
    connectionString: DATABASE_URL + databaseName,
})

Migrations.disableAutoRun();

beforeAll(async () => {
    Database.all = [ Globals.database ]
    await root.query(`CREATE DATABASE "${databaseName}";`, [])
    await Migrations.run();
})

afterAll(async () => {
    await Globals.database.close();
    await root.query(`DROP DATABASE "${databaseName}"`, [])
    await root.close();
})


function generateDBSuffix(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
