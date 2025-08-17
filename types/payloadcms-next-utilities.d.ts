declare module '@payloadcms/next/utilities' {
  import type { Config } from 'payload';
  
  export function getPayloadHMR(options: { 
    config: Promise<Config> | Config 
  }): Promise<any>;
}
