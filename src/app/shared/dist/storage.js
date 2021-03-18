"use strict";
exports.__esModule = true;
exports.Storage = void 0;
var library_1 = require("./library");
var _ = require("lodash");
var Storage = /** @class */ (function () {
    function Storage() {
        console.log("storage initialization");
    }
    Storage.add = function (component) {
        this.components.push(component);
        if (component.selector.startsWith('card') || component.selector.startsWith('form')) {
            this.newCompositeList.push(component);
            this.library['genre']['CoreUI']['category']['Containers'].push(component.selector);
        }
        this.pageUICDL.body.componentList.push(component);
    };
    Storage.setLayoutComponent = function (component) {
        // this.layoutComponent = _.cloneDeep(component);
        // this.layoutComponent["componentList"] = this.components;
        // console.log("layout component");
        // console.log(this.layoutComponent);
        // this.pageUICDL['componentList'] = (this.layoutComponent);
    };
    Storage.getGenre = function () {
        return Object.keys(this.library['genre']);
    };
    Storage.getCategories = function (genre) {
        return Object.keys(this.library['genre'][genre]['category']);
    };
    Storage.getComponents = function (genre, category) {
        return Object.values(this.library['genre'][genre]['category'][category]);
    };
    Storage.getComponentProperties = function (component) {
        if (this.library['components'][component] == undefined)
            return undefined;
        return Object.values(this.library['components'][component]);
    };
    Storage.getCompositeElements = function (component) {
        return Object.values(this.library['compositeComponents'][component]);
    };
    Storage.getComponentValue = function (componentType) {
        return Object.values(this.library['componentValue'][componentType]);
    };
    Storage.getCompositeByName = function (componentName) {
        for (var _i = 0, _a = this.newCompositeList; _i < _a.length; _i++) {
            var component = _a[_i];
            if (component.selector == componentName) {
                return component;
            }
        }
    };
    Storage.getPageUICDL = function () {
        var clonedPageUICDL = _.cloneDeep(this.pageUICDL);
        return clonedPageUICDL;
    };
    Storage.createPageUICDL = function () {
        // if (this.isNewPage) {
        //   this.pageUICDL['id'] = PropertyGenerator.getPageID();
        //   this.pageUICDL['selector'] = 'page' + this.pageUICDL['id'];
        //   this.pageUICDLList.push(this.pageUICDL);
        //   this.isNewPage = false;
        // }
        // this.pageUICDL['componentList'] = [];
    };
    Storage.clearTemp = function () {
        this.components = [];
        console.log("clear graph");
    };
    Storage.setPageUICDL = function (pageUICDL) {
        this.pageUICDL = pageUICDL;
    };
    Storage.newCompositeList = []; // store reusable composite component
    Storage.components = [];
    Storage.library = library_1.Library;
    Storage.layout = '';
    Storage.isNewPage = true;
    Storage.pageUICDLList = [];
    // unorder, check if component exists / data binding
    Storage.navigationList = [];
    // for temporary import
    Storage.PageComponents = [];
    Storage.images = [];
    return Storage;
}());
exports.Storage = Storage;
