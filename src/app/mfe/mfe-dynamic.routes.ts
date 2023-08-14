import { getManifest, loadRemoteModule } from "@angular-architects/module-federation";
import { Routes } from "@angular/router";
import { routes } from "../app-routing.module";
import { CustomManifest } from "../model/mf.model";

export function buildRoutes(): Routes {
    const lazyRoutes = Object.entries(getManifest<CustomManifest>())
        .filter(([key, value]) => {
            console.log(key, value, 'ssass');
            return value.viaRoute === true
        })
        .map(([key, value]) => {
            console.log()
            return {
                path: value.routePath,
                loadChildren: () => loadRemoteModule({
                    type: 'manifest',
                    remoteName: key,
                    exposedModule: value.exposedModule
                }).then(m => m[value.ngModuleName!])
            }
        });
    const notFound = [
        {
            path: '**',
            redirectTo: ''
        }]
    // { path:'**', ...} needs to be the LAST one.
    console.log([...routes, ...lazyRoutes, ...notFound])
    return [...routes, ...lazyRoutes, ...notFound]
}