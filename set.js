const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUVBWGpTRmlYME85Ykk4SkpQSTRiTjBrdThIVHlJaDdYS09VVzNuUEFtZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUJrSmtMWGNuVzFxcGhHbFovRS92QVNYNUZzdERtQkdxekNpSDdnRnZoRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvQlJtR3ZqT09FMnRJQ3V0WE91elc0R2Ivc0dVWHhwZ05qRkdXbjhtM0ZrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDMDRHKzNSVkJId0ZsRFRMUG8xdnM3NWRMbTdESHQzVDlHUHJ4MWxZWlRFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9MR055Z1NGNFk2K3VxK1JoeWorQVFPRXdIMmZRdDRBYnBWbzZxUWFSMVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBmZHkvcnhtczlkV2tKbzJ4RHduV24rc003TFYrcTNmQ083akc2NGxMMTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0JFdGdCUzNoWU9MeFRyRmFuMmcyUWRkd1lNOU5TYitBVTRocFhKNzZVaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNDNrQ0c5elgycnUvTjc4QlZrd004bEVXMzFlTXA3c1hRb2huVGxZM013ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhuRXRPVXVXc0JURGRyMlFtTFlLVkcwS0hZWktNdDZSVVIxUXFkNVA5KzZYU3lsWm53dVk3bWpPUC9JS1JiR1NoZ0FQV1Z0eU9LMlAxV2NNOTF6WGdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY2LCJhZHZTZWNyZXRLZXkiOiJxbnVJVGR5Rkl0dVArTDB0V3RrSzZibkltVXZrYUZoaWFtanJ3MktuTzMwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwMzgyOTY3MzlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjUyOEE4MTZDMjZDREY1QzI4RUQ2QkVEQ0JCMTY5MDMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTI0MjA0Mn0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODAzODI5NjczOUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0QTM5RDhBNzZDMEQ1RjgwMTM5Mzk2M0NENkU0MTI0RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMjQyMDQzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIzVnJsNmlKZFFrTzItRngxT1pMNEFnIiwicGhvbmVJZCI6ImQxYmJlMzVmLWUyMzctNDBlMi05MWZjLTJmMzVkOTg0ODk5MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJINEZNK2RSeUNJTjVzbVVEaEN2QjR5RzBySUU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidzNRNlhJaENocCszUS9JWkRTNjhSY0NOd2hJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRSM0NRN0xXIiwibWUiOnsiaWQiOiIyMzQ4MDM4Mjk2NzM5OjYxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IldPV34ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ092YTlaOEJFS21qNExRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im1uZ3BkdDNWK3RxUFNITUJhb2hCRU95OEdFMHJoY05wQWljNmpxdDE3UWc9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImJkYlVMSG85alZOblNRam83blYydWdKYkFlaCs2aFVKSjJlZmRYMmhTTWJFbVprRVVtOTB1Y3RBSkJVbXRwSUJoemMzUmsweVdCWmV4TnVDTXJNV0JnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJtN2JSTTh5VmM3TlRldkVZRmRueXZyb3dBQkdPYnFkUnJrUkdiRnVnNytwTHoxS3dFTG02WDEwTWY4WVd4YU1Hay9oWmxrdUUzNHdxNkhsUFJnRFFpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwMzgyOTY3Mzk6NjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWnA0S1hiZDFmcmFqMGh6QVdxSVFSRHN2QmhOSzRYRGFRSW5PbzZyZGUwSSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTI0MjAzOCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKSkYifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
