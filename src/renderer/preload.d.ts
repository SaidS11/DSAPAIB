import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        selectImplementacionNombreIA(name: string): unknown;
        selectImplemenIA( // selectC(arg0: (event: any, resp: any) => void): unknown;
          arg0: (event: any, resp: any) => void
        ): unknown;
        selectImplementacionPorNombre(arg0: string): unknown;
        selectImplementacionPorN(
          arg0: (event: any, resp: any) => void
        ): unknown;
        selectModNom(): unknown;
        selectAIA(): unknown;
        preAnalisisPython(): unknown;
        preAnalisisP(arg0: (event: any, resp: any) => void): unknown;
        selectC(): unknown;
        analisisP(arg0: (event: any, resp: any) => void): unknown;
        analisisPython(
          type: string,
          typeIA: string,
          params: string,
          nombre: string
        ): unknown;
        selectCD(arg0: (event: any, resp: any) => void): unknown;
        selectConfiguracionDetalle(nameConf: string): unknown;
        selectCN(arg0: (event: any, resp: any) => void): unknown;
        selectConfiguracionNombre(protocolo: string): unknown;
        selectMC(arg0: (event: any, resp: any) => void): unknown;
        selectMultimediaConfig(configuracion: any): unknown;
        // selectC(arg0: (event: any, resp: any) => void): unknown;
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
