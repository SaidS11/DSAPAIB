import { Json } from 'aws-sdk/clients/robomaker';
import { Channels } from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        insertarElementoM(arg0: (event: any, resp: any) => void): unknown;
        insertarElementoMongo(archivo: string): unknown;
        buscarElementoM(arg0: (event: any, resp: any) => void): unknown;
        buscarElementoMongo(archivo: string): unknown;
        seleccionarTodoM(arg0: (event: any, resp: any) => void): unknown;
        seleccionarTodoMongo(): unknown;
        borrarElementoM(arg0: (event: any, resp: any) => void): unknown;
        borrarElementoMongo(archivo: string): unknown;
        updateImplementacion(
          precision: string,
          desviacion: string,
          entrenado: string,
          modelo: string
        ): unknown;
        updateIm(arg0: (event: any, resp: any) => void): unknown;
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
          nombre: string,
          iteraciones: string,
          reducedPercentage: string
        ): unknown;
        selectCD(nombre: string): object;
        selectConfiguracionDetalle(nameConf: string): unknown;
        selectCN(arg0: (event: any, resp: any) => void): unknown;
        selectConfiguracionNombre(protocolo: string): unknown;
        selectMultimediaConfig(configuracion: any): unknown;
        selectMC(nombre: string): object;
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
