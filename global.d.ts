declare namespace NodeJS {
  interface ProcessEnv {
    APP_NAME: string;
    COMPANY_NAME: string;
    COMPANY_DESC: string;
    FB_DOMAIN_VERI: string;
    FB_PIXEL_ID?: string;
    FB_ACCESS_TOKEN?: string;
    FB_API_VERSION?: string;
    FB_TEST_EVENT_CODE?: string;
  }
}
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
