"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WizardComponent = void 0;
var core_1 = require("@angular/core");
var storage_1 = require("../../../shared/storage");
var property_generator_1 = require("../../../shared/property-generator");
var model_1 = require("../../../models/model");
var WizardComponent = /** @class */ (function () {
    function WizardComponent(graphEditorService) {
        this.graphEditorService = graphEditorService;
        this.properties = [];
        this.compositeElements = [];
        this.isComposite = false;
    }
    WizardComponent.prototype.ngOnInit = function () {
        console.log("start wizard");
    };
    WizardComponent.prototype.setComponent = function (properties) {
        properties["id"] = property_generator_1.PropertyGenerator.getID(this.graphEditorService.getMaxID());
        properties["selector"] = property_generator_1.PropertyGenerator.getSelector(this.componentName, this.graphEditorService.getMaxID());
        properties["type"] = this.componentName;
        switch (this.componentName) {
            case "icon":
                this.component = new model_1.Icon(properties);
                break;
            case "text":
                this.component = new model_1.Text(properties);
                break;
            case "button":
                this.component = new model_1.Button(properties);
                break;
            case "dropdown":
                this.component = new model_1.Dropdown(properties);
                break;
            case "table":
                this.component = new model_1.Table(properties);
                break;
            case "card":
                this.component = new model_1.CardComposite(properties);
                break;
            case "inputgroup":
                this.component = new model_1.InputGroupComposite(properties);
                break;
            case "input":
                this.component = new model_1.INPUT(properties);
                break;
            case "breadcrumb":
                this.component = new model_1.BreadcrumbComposite(properties);
                break;
            case "form":
                this.component = new model_1.FormComposite(properties);
                break;
            default:
                console.log("Component Building Failed");
                return false;
        }
        return true;
    };
    WizardComponent.prototype.setSubComponent = function (properties) {
        properties["id"] = property_generator_1.PropertyGenerator.getID(this.graphEditorService.getMaxID());
        properties["selector"] = this.subComponentName;
        properties["type"] = this.subComponentName;
        switch (this.subComponentName) {
            case "icon":
                this.subComponent = new model_1.Icon(properties);
                break;
            case "text":
                this.subComponent = new model_1.Text(properties);
                break;
            case "button":
                this.subComponent = new model_1.Button(properties);
                break;
            case "dropdown":
                this.subComponent = new model_1.Dropdown(properties);
                break;
            case "table":
                this.subComponent = new model_1.Table(properties);
                break;
            case "card":
                this.subComponent = new model_1.CardComposite(properties);
                break;
            case "inputgroup":
                this.subComponent = new model_1.InputGroupComposite(properties);
                break;
            case "input":
                this.subComponent = new model_1.INPUT(properties);
                break;
            case "breadcrumb":
                this.component = new model_1.BreadcrumbComposite(properties);
                break;
            case "form":
                this.component = new model_1.FormComposite(properties);
                break;
            default:
                console.log("Sub Component Building Failed");
                return false;
        }
        return true;
    };
    WizardComponent.prototype.getComponentProperties = function (componentName) {
        this.componentProperties = storage_1.Storage.getComponentProperties(componentName);
        console.log(this.componentProperties);
        if (this.componentProperties == undefined) {
            this.isCustom = true;
        }
        if (this.componentProperties.includes("componentList")) {
            console.log("is Composite");
            this.isComposite = true;
        }
        else {
            this.isComposite = false;
        }
    };
    WizardComponent.prototype.getSubComponentProperties = function (subComponentName) {
        this.properties = storage_1.Storage.getComponentProperties(subComponentName);
        this.subComponentName = subComponentName;
    };
    WizardComponent.prototype.onKey = function (event) {
        this.tmp.set(event.target.name, event.target.value);
    };
    WizardComponent.prototype.onSubmit = function (f) {
        console.log(f.value);
        if (this.setComponent(f.value)) {
            console.log("set component properties");
        }
    };
    WizardComponent.prototype.onCompositeSubmit = function (sf) {
        console.log(sf.value);
        if (this.setSubComponent(sf.value)) {
            console.log("ready to add " + this.subComponentName + " component to composite component");
            this.component.add(this.subComponent);
            for (var _i = 0, _a = this.properties; _i < _a.length; _i++) {
                var element = _a[_i];
                sf["value"][element] = "";
            }
            //reset form with dafault value
            sf.resetForm(sf["value"]);
        }
    };
    WizardComponent.prototype.clickNext = function () {
        // $("#myModal a[href=\"#composition\"]").tab("show");
    };
    WizardComponent.prototype.onClose = function () {
        console.log("close");
        // $("#myModal a[href=\"#building\"]").tab("show");
    };
    WizardComponent.prototype.clickCreate = function () {
        this.compositeElements = storage_1.Storage.getCompositeElements(this.componentName);
    };
    WizardComponent.prototype.clickFinish = function () {
        console.log("finish");
        this.component.getInfo();
        // $("#myModal a[href=\"#building\"]").tab("show");
        storage_1.Storage.add(this.component);
        this.graphEditorService.bindComponent(this.component);
        console.log(this.component);
        this.properties = [];
        this.subComponentName = "";
    };
    __decorate([
        core_1.Input()
    ], WizardComponent.prototype, "componentProperties");
    __decorate([
        core_1.Input()
    ], WizardComponent.prototype, "componentName");
    WizardComponent = __decorate([
        core_1.Component({
            selector: "app-wizard",
            templateUrl: "./wizard.component.html",
            styleUrls: ["./wizard.component.scss"]
        })
    ], WizardComponent);
    return WizardComponent;
}());
exports.WizardComponent = WizardComponent;
