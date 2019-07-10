import { HttpClient } from '@angular/common/http';
import * as angularCore from '@angular/core';
import {Injectable, Injector, Type} from '@angular/core';
import { tap } from 'rxjs/operators';
import * as angularRouter from '@angular/router';
import { Router, Routes } from '@angular/router';
import * as angularCommon from '@angular/common';
import * as angularMaterial from '@angular/material';
import * as angularMaterialFormField from '@angular/material/form-field';
import * as angularCdkOverlay from '@angular/cdk/overlay';
import {of} from 'rxjs';

(window as any).ng.core = angularCore;
(window as any).ng.common = angularCommon;
(window as any).ng.router = angularRouter;
(window as any).ng.material = angularMaterial;
(window as any).ng.material['formField'] = angularMaterialFormField;
(window as any).ng.cdk = {};
(window as any).ng.cdk.overlay = angularCdkOverlay;


export interface ModuleDefinition {
  path: string;
  name: string;
  ngModuleName: string;
  source: string;
}

@Injectable({providedIn: 'root'})
export class RouteService {


}


export function routeInitializer(injector: Injector) {
  return () => of(modules)
    .pipe(tap(definitions => {
        const router = injector.get(Router);

        const paths: Routes = definitions.map(definition => ({
          path: definition.path,
          loadChildren: () => loadModule(definition)
        }));

        router.resetConfig([
          ...paths,
          ...router.config
        ]);
      })
    ).toPromise();
}

export function loadModule(definition: ModuleDefinition): Promise<Type<any>> {
  const module = document.getElementById(definition.name);

  if (module) {
    return Promise.resolve(window[definition.name][definition.ngModuleName]);
  }

  const script = document.createElement('script');
  script.src = definition.source;
  script.id = definition.name;

  return new Promise((resolve, reject) => {
    document.head.appendChild(script);

    script.onload = () => {
      console.log(window[definition.name])
      resolve(window[definition.name][definition.ngModuleName]);
    };

    script.onerror = (event: ErrorEvent) => {
      reject(event.error);
    };
  });
}

export const modules = [
  {
    path: "meister",
    name: "meister-plugin",
    ngModuleName: "MeisterPluginModule",
    source: "http://localhost:8888/meister-plugin.umd.min.js"
  }
]