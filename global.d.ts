declare namespace NodeJS {
  export interface ProcessEnv {
    CLIENTID: string;
    CLIENTSECRET: string;
    PRODUCTION: 'true' | 'false';
  }
}
