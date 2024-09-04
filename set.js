const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUc4NFVWeHB4R3BTNTFNUTN4SHpuNEwzTllqM0cyZHA1R0hTNnF2NFdFST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiczBTaXhQbHkrekZjLzFRT29PdEZRVElWN091OEhRc0lTNjNqUFZXYUpGaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvTExrRVhlazBoVkE0VjNYM3EvMldBZWI4dkpwUjVyWTZTaFNJeXd3bkdJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPbE1Vb3Q1Mjc2OVFvVklsNHcrekRSbVcvK3RjTnVDVFNVaFVyaVJyYjJRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndBSlRwU25ra290UGtIVmpsZXZpVkZQMkdPSitlRWV6ZThWbDNCc2dpMXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InYwbzRha0tVYVJBcE9RUlhTSVpGeGpNdW1zQnF2ZVpJcllsWnVHRXBaR289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEd5REZncklSQlU2NHI3aDhTN2E5cDY5S204Tnd4Y3J6QmtNWk5CanRGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN0tvek5JUUlOU3NnVUVEamFENG9IVHAvdEljcG51THoyR1V4Q1dsaTB5cz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpzbWtpY1FBQ2hQOThXZWlqQjZZZW9vaFpqR3hobU1NaHlYRXpodHJleEg1OXRwbkoyRmRwMFZzdU9iZndUR0kzZ1ZJQ3J2MWE1ZG02aVE4cTRtNGpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MSwiYWR2U2VjcmV0S2V5IjoiUGNOMmcvTnZMZ2QvdTBtQWQ0WktQZkV0ZXQvNTZ6TXFkdytDT0U2QkhKTT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOlt7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MTQ3NTE3OTM3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjJCNzQ1QkUxQjg0MDBDODBGMDQ1MkUwNUVDMDI0NjQ5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjU0Mjk2Nzh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Iml3YURseXVvVGpHZ3JmTlBHYnc0a0EiLCJwaG9uZUlkIjoiM2VkODM5YTgtZmM1Zi00N2U4LWFiYWItYzE4NmI3MmZjM2QzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFocUViRzcxTlhDZ0l0RUZ0QmZvSkp1ZDlDST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1WHJCNEVGQmtDTDRWWjVJa1gvSEVUWXhQOG89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiV1c5WFM3UjkiLCJtZSI6eyJpZCI6IjIzNDgxNDc1MTc5Mzc6MTNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lXdDNhRUZFSjd2MzdZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InBBTG5qQUlobUxlS1F1M3dSK0NyZyt0Ymk5bmcwM2pkM2M3RG1MemhUajQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ild0eSsvUmh1aER6TytTUk81eUhBem1PRXpWK3l6VW1JeW14Rlh2K0VtdjYxeS82U3ZoSjZtbVRlSE5telJ5cmlCU2RqbHpVN2tmTkUzelZydGx5dEF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJBRC9BaUtNS2dsMW5VQXN1S2JYaGlIVmlvL2dhbllZalA3VDdlblI3ZitQc01nMFczM3lZL2c4cGtuWW1aQnc5bkN3QzhBbUIxNi9IdFZwcC90MFNpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNDc1MTc5Mzc6MTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYVFDNTR3Q0laaTNpa0x0OEVmZ3E0UHJXNHZaNE5ONDNkM093NWk4NFU0KyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTQyOTY3NSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOSlUifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "David",
    NUMERO_OWNER : process.env.OWNER_NUM || "2",              
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
