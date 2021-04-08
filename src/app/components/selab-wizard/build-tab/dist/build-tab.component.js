"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BuildTabComponent = void 0;
var core_1 = require("@angular/core");
var globalStorage_1 = require("src/app/models/store/globalStorage");
var status_dialog_component_1 = require("../pipeline-tab/status-dialog/status-dialog.component");
var uicomponent_config_1 = require("../uicomponent-config");
var BuildTabComponent = /** @class */ (function () {
    function BuildTabComponent(statusDialog, wizard) {
        this.statusDialog = statusDialog;
        this.wizard = wizard;
        this.returnData = []; // from pipeline return
        this.formData = {};
    }
    BuildTabComponent.prototype.setReturn = function (service) {
        this.returnData = ["None"];
        for (var index = 0; index < service['returnData'].getReturnDatas()['datas'].length; index++) {
            this.returnData.push(service['returnData'].getReturnDatas()['datas'][index]);
        }
    };
    BuildTabComponent.prototype.chooseReturn = function (event, option, property) {
        console.log('toggle is from return');
        console.log(property);
        var currentTask = globalStorage_1.SelabGlobalStorage.getTaskGraph().currentTask;
        var parentTask = currentTask.parentTask;
        var hierarchy = parentTask.componentSelector + "-" + this.uiComponentBuilder.selector;
        var serviceReturnBindingObject = this.generateReturnClass(currentTask, option, property, hierarchy);
        if (option == "None") {
            this.deleteServiceReturnBinding(property["name"], hierarchy, option);
        }
        else {
            if (!this.checkIsReturnBindingExist(serviceReturnBindingObject["bindingPart"]["name"], serviceReturnBindingObject["hierarchy"], option)) {
                console.log('not existed');
                this.uiComponentBuilder.currentTaskStatus.push(serviceReturnBindingObject);
            }
            else
                console.log('exist');
        }
        console.log(this.uiComponentBuilder.currentTaskStatus);
    };
    BuildTabComponent.prototype.deleteServiceReturnBinding = function (bindingPart, hierarchy, returnPropertyName) {
        console.log("delete service return\nbinding part = " + bindingPart + "\nhierarchy = " + hierarchy + "\nreturn property name " + returnPropertyName);
        for (var index = 0; index < this.uiComponentBuilder.currentTaskStatus.length; index++) {
            var serviceReturnBindingObject = this.uiComponentBuilder.currentTaskStatus[index];
            if (serviceReturnBindingObject['hierarchy'] != hierarchy)
                continue;
            else {
                if (serviceReturnBindingObject['bindingPart']["name"] != bindingPart)
                    continue;
                else {
                    console.log("delete index " + index);
                    this.uiComponentBuilder.currentTaskStatus.splice(index, 1);
                }
            }
        }
    };
    BuildTabComponent.prototype.checkIsReturnBindingExist = function (bindingPart, hierarchy, returnPropertyName) {
        console.log("binding part = " + bindingPart + "\nhierarchy = " + hierarchy + "\nreturn property name = " + returnPropertyName);
        for (var index = 0; index < this.uiComponentBuilder.currentTaskStatus.length; index++) {
            var serviceReturnBindingObject = this.uiComponentBuilder.currentTaskStatus[index];
            if (serviceReturnBindingObject['hierarchy'] != hierarchy)
                continue;
            else {
                if (serviceReturnBindingObject['bindingPart']["name"] != bindingPart)
                    continue;
                else {
                    var returnProperty = "";
                    if (serviceReturnBindingObject["returnClass"]["class"] == "List") {
                        returnProperty = serviceReturnBindingObject["returnClass"]["child"]["propertyName"];
                    }
                    else {
                        returnProperty = serviceReturnBindingObject["returnClass"]["propertyName"];
                    }
                    if (returnProperty != returnPropertyName)
                        continue;
                    else
                        return true;
                }
            }
        }
        return false;
    };
    BuildTabComponent.prototype.generateReturnClass = function (parentTask, option, property, hierarchy) {
        if (option == "None") {
            return null;
        }
        var bindingPart = property;
        var returnClass = {};
        if (parentTask.service.returnData.isList()) {
            returnClass = {
                "class": "List",
                "propertyName": "l1",
                "child": {
                    "class": "String",
                    "propertyName": option
                }
            };
        }
        else {
            returnClass = {
                "class": "String",
                "propertyName": option
            };
        }
        var result = {
            "hierarchy": hierarchy,
            "bindingPart": bindingPart,
            "returnClass": returnClass
        };
        return result;
    };
    BuildTabComponent.prototype.closeWizard = function () {
        var currentTask = globalStorage_1.SelabGlobalStorage.getTaskGraph().currentTask;
        this.wizard.close(currentTask);
    };
    BuildTabComponent.prototype.setComponentProperties = function () {
        this.uiComponentBuilder
            .setProperties(this.formData)
            .setName(this.formData["name"].value);
        if (!this.checkIsFormFill()) {
            alert("You need to fill all input");
            return;
        }
        if (this.isComposite)
            this.navigateToComposeTab();
        else
            this.navigateToStatusTab();
    };
    BuildTabComponent.prototype.buildForm = function () {
        for (var index = 0; index < this.buildFormProperties.length; index++) {
            var propertyName = this.buildFormProperties[index]["name"];
            var propertyType = this.buildFormProperties[index]["type"];
            if (this.formData[propertyName] == undefined) {
                this.formData[propertyName] = {};
            }
            this.formData[propertyName].type = propertyType;
            if (propertyType == "Boolean") {
                this.formData[propertyName].value = false;
            }
            else if (propertyType == "String") {
                this.formData[propertyName].value = "";
            }
            else if (propertyType == "Option") {
            }
            else if (propertyType == "Integer") {
            }
        }
    };
    BuildTabComponent.prototype.valueChange = function (event, property) {
        this.formData[property.name]["value"] = event;
        this.formData[property.name]["type"] = property["type"];
    };
    BuildTabComponent.prototype.concateString = function (str1, str2) {
        return str1 + str2;
    };
    BuildTabComponent.prototype.checkIsFormFill = function () {
        var isCorrect = true;
        console.log('check is form filled ?');
        console.log(this.formData);
        console.log(this.uiComponentBuilder.currentTaskStatus);
        // check user input
        for (var propertyName in this.formData) {
            var propertyType = this.formData[propertyName].type;
            var propertyValue = this.formData[propertyName].value;
            if (propertyType == "String") {
                if (propertyValue.length == 0)
                    isCorrect = false;
            }
            else if (propertyType == "Boolean") {
                if (propertyValue == false || propertyValue == true)
                    continue;
                else
                    isCorrect = false;
            }
            else if (propertyType == "Option") {
                if (propertyValue.length == 0)
                    isCorrect = false;
            }
            else if (propertyType == "Integer") {
                continue;
            }
        }
        return isCorrect;
    };
    BuildTabComponent.prototype.navigateToComposeTab = function () {
        var tabLinkElements = document.getElementsByClassName("mat-tab-label-content");
        for (var index = 0; index < tabLinkElements.length; index++) {
            if (tabLinkElements[index].innerText == "Compose Component") {
                tabLinkElements[index].click();
            }
        }
    };
    BuildTabComponent.prototype.navigateToStatusTab = function () {
        var tabLinkElements = document.getElementsByClassName("mat-tab-label-content");
        for (var index = 0; index < tabLinkElements.length; index++) {
            if (tabLinkElements[index].innerText == "Check Status")
                tabLinkElements[index].click();
        }
    };
    BuildTabComponent.prototype.ngOnInit = function () {
        this.buildFormProperties = uicomponent_config_1.UIComponentConfig.getProperties(this.uiComponentBuilder.type);
        this.buildForm();
    };
    BuildTabComponent.prototype.showStatus = function () {
        this.statusDialog.open(status_dialog_component_1.StatusDialogComponent, {
            width: '50%',
            height: '60%',
            autoFocus: true
        });
    };
    __decorate([
        core_1.Input()
    ], BuildTabComponent.prototype, "isPipeline");
    __decorate([
        core_1.Input()
    ], BuildTabComponent.prototype, "uiComponentBuilder");
    __decorate([
        core_1.Input()
    ], BuildTabComponent.prototype, "isComposite");
    BuildTabComponent = __decorate([
        core_1.Component({
            selector: 'build-tab',
            templateUrl: './build-tab.component.html',
            styleUrls: ['./build-tab.component.css']
        })
    ], BuildTabComponent);
    return BuildTabComponent;
}());
exports.BuildTabComponent = BuildTabComponent;
