declare namespace NodeJS {
  interface ProcessEnv {
    APP_NAME: string;
    COMPANY_NAME: string;
    COMPANY_DESC: string;
    FB_DOMAIN_VERI: string;
  }
}
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
