import { ComponentFactoryResolver, OpaqueToken } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RuntimeCompiler } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
export declare const AC_WEBPACK_ASYNC_MAP: OpaqueToken;
export declare function composeRoutes(...routes: any[]): any;
export declare class WebpackAsyncModules {
    private _asyncModules;
    constructor(_asyncModules: any);
    fetch(moduleName: string, exportName?: string): any;
    hasModule(moduleName: string): boolean;
}
export declare class WebpackComponentResolver {
    private _resolver;
    private _webpackAsyncModules;
    constructor(_resolver: ComponentFactoryResolver, _webpackAsyncModules: WebpackAsyncModules);
    resolveComponent(componentType: any): any;
    clearCache(): void;
    private _resolveExports(cmpFile, componentType);
}
export declare class WebpackAsyncRoute {
    router: Router;
    webpackAsyncModules: WebpackAsyncModules;
    constructor(router: Router, webpackAsyncModules: WebpackAsyncModules);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean;
}
export declare const ANGULARCLASS_WEBPACK_RUNTIME_PROVIDERS: (typeof WebpackAsyncModules | {
    provide: typeof WebpackAsyncRoute;
    useFactory: (router: any, webpackAsyncModules: any) => WebpackAsyncRoute;
    deps: (typeof Router | typeof WebpackAsyncModules)[];
} | {
    provide: typeof ComponentFactoryResolver;
    useFactory: (resolver: any, webpackAsyncModules: any) => WebpackComponentResolver;
    deps: (typeof RuntimeCompiler | typeof WebpackAsyncModules)[];
})[];
export declare function provideWebpack(asyncModules: any): ({
    provide: OpaqueToken;
    useValue: any;
} | typeof WebpackAsyncModules | {
    provide: typeof WebpackAsyncRoute;
    useFactory: (router: any, webpackAsyncModules: any) => WebpackAsyncRoute;
    deps: (typeof Router | typeof WebpackAsyncModules)[];
} | {
    provide: typeof ComponentFactoryResolver;
    useFactory: (resolver: any, webpackAsyncModules: any) => WebpackComponentResolver;
    deps: (typeof RuntimeCompiler | typeof WebpackAsyncModules)[];
})[];
