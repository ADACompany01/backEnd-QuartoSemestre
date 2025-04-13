import * as dotenv from 'dotenv';


dotenv.config();

interface Config {
  MONGODB_URI: string,
  JWT_SECRET: string;
  
}

const config: Config = {
  MONGODB_URI: process.env.MONGODB_URI || '', 
  JWT_SECRET: process.env.JWT_SECRET || '',  
};

if(!config.MONGODB_URI || !config.JWT_SECRET) {
  throw new Error('Faltam variáveis de ambiente essencias no arquivo .env');
}

export default config;
