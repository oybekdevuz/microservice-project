import * as dotenv from "dotenv";

dotenv.config();

export type ConfigType = {
    PORT: number;
    BOOK_URL: string;
    AUTH_URL: string;
    DB_URL: string;


};

const requiredVariables = [
    "PORT",
    "DB_URL",
    "BOOK_URL",
    "AUTH_URL"
];

const missingVariables = requiredVariables.filter((variable) => {
    const value = process.env[variable];
    return !value || value.trim() === "";
});


export const config: ConfigType = {
    PORT: parseInt(process.env.PORT as string, 10),
    AUTH_URL: (process.env.AUTH_URL as string),
    BOOK_URL: (process.env.BOOK_URL as string),
    DB_URL: (process.env.DB_URL as string),

};
