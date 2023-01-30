import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        funP(arg0: (event: any, resp: any) => void): unknown;
        funPython(name: string): unknown;
        selectCD(arg0: (event: any, resp: any) => void): unknown;
        selectConfiguracionDetalle(nameConf: string): unknown;
        selectCN(arg0: (event: any, resp: any) => void): unknown;
        selectConfiguracionNombre(protocolo: string): unknown;
        selectMC(arg0: (event: any, resp: any) => void): unknown;
        selectMultimediaConfig(configuracion: any): unknown;
        selectC(arg0: (event: any, resp: any) => void): unknown;
        selectConfiguracion(): unknown;
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
        removeListener(
          channel: string,
          func: (...args: unknown[]) => void
        ): void;
        removeAllListeners(channel: string): void;
      };
    };
  }
}

export {};
