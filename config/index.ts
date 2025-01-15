import * as dotenv from "dotenv";

dotenv.config();

export type ConfigType = {
	PORT: number;
	DB_URL: string;


};

const requiredVariables = [
	"PORT",
	"DB_URL",
];

const missingVariables = requiredVariables.filter((variable) => {
	const value = process.env[variable];
	return !value || value.trim() === "";
});


export const config: ConfigType = {
	PORT: parseInt(process.env.PORT as string, 10),
	DB_URL: (process.env.DB_URL as string),

};
