"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var compiler_1 = require('@angular/compiler');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/fromPromise');
exports.AC_WEBPACK_ASYNC_MAP = new core_1.OpaqueToken('AC_WEBPACK_ASYNC_MAP');
function composeRoutes() {
    var routes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        routes[_i - 0] = arguments[_i];
    }
    return (_a = Object).assign.apply(_a, routes);
    var _a;
}
exports.composeRoutes = composeRoutes;
var WebpackAsyncModules = (function () {
    function WebpackAsyncModules(_asyncModules) {
        this._asyncModules = _asyncModules;
    }
    WebpackAsyncModules.prototype.fetch = function (moduleName, exportName) {
        return this._asyncModules[moduleName]();
    };
    WebpackAsyncModules.prototype.hasModule = function (moduleName) {
        return !!this._asyncModules[moduleName];
    };
    WebpackAsyncModules = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(exports.AC_WEBPACK_ASYNC_MAP)), 
        __metadata('design:paramtypes', [Object])
    ], WebpackAsyncModules);
    return WebpackAsyncModules;
}());
exports.WebpackAsyncModules = WebpackAsyncModules;
var WebpackComponentResolver = (function () {
    function WebpackComponentResolver(_resolver, _webpackAsyncModules) {
        this._resolver = _resolver;
        this._webpackAsyncModules = _webpackAsyncModules;
    }
    WebpackComponentResolver.prototype.resolveComponent = function (componentType) {
        var _this = this;
        if (typeof componentType === 'string' && this._webpackAsyncModules.hasModule(componentType)) {
            return this._webpackAsyncModules.fetch(componentType)
                .then(function (cmpFile) {
                var component = _this._resolveExports(cmpFile, componentType);
                return _this._resolver.resolveComponentFactory(component);
            });
        }
        return this._resolver.resolveComponentFactory(componentType);
    };
    WebpackComponentResolver.prototype.clearCache = function () { };
    WebpackComponentResolver.prototype._resolveExports = function (cmpFile, componentType) {
        return cmpFile[componentType] || cmpFile.default || cmpFile;
    };
    WebpackComponentResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, WebpackAsyncModules])
    ], WebpackComponentResolver);
    return WebpackComponentResolver;
}());
exports.WebpackComponentResolver = WebpackComponentResolver;
var WebpackAsyncRoute = (function () {
    function WebpackAsyncRoute(router, webpackAsyncModules) {
        this.router = router;
        this.webpackAsyncModules = webpackAsyncModules;
    }
    WebpackAsyncRoute.prototype.canActivate = function (route, state) {
        var _this = this;
        var commponentString = route.component;
        if (typeof commponentString !== 'string') {
            return true;
        }
        var routeConfig = this.router.config;
        return Observable_1.Observable.fromPromise(new Promise(function (resolve) {
            _this.webpackAsyncModules.fetch(commponentString)
                .then(function (asyncModule) {
                var currentRouteConfig = routeConfig;
                var newRoutes = currentRouteConfig
                    .map(function (_route) {
                    if (_route.path === asyncModule.routes.path) {
                        var newRoute = composeRoutes(_route, asyncModule.routes);
                        newRoute.canActivate = newRoute.canActivate.filter(function (active) { return active !== WebpackAsyncRoute; });
                        return newRoute;
                    }
                    return _route;
                });
                _this.router.resetConfig(newRoutes);
                resolve(true);
                return asyncModule;
            });
        }));
    };
    WebpackAsyncRoute = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, WebpackAsyncModules])
    ], WebpackAsyncRoute);
    return WebpackAsyncRoute;
}());
exports.WebpackAsyncRoute = WebpackAsyncRoute;
exports.ANGULARCLASS_WEBPACK_RUNTIME_PROVIDERS = [
    WebpackAsyncModules,
    {
        provide: WebpackAsyncRoute,
        useFactory: function (router, webpackAsyncModules) {
            return new WebpackAsyncRoute(router, webpackAsyncModules);
        },
        deps: [router_1.Router, WebpackAsyncModules]
    },
    {
        provide: core_1.ComponentFactoryResolver,
        useFactory: function (resolver, webpackAsyncModules) {
            return new WebpackComponentResolver(resolver, webpackAsyncModules);
        },
        deps: [compiler_1.RuntimeCompiler, WebpackAsyncModules]
    }
];
function provideWebpack(asyncModules) {
    return [
        { provide: exports.AC_WEBPACK_ASYNC_MAP, useValue: asyncModules }
    ].concat(exports.ANGULARCLASS_WEBPACK_RUNTIME_PROVIDERS);
}
exports.provideWebpack = provideWebpack;
//# sourceMappingURL=index.js.map