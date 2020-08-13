import {Component, Input, OnInit} from '@angular/core';
import {Storage} from '../../../shared/storage';
import {NgForm} from '@angular/forms';
import GraphEditorService from '../../../services/graph-editor.service';
import ServiceComponentService from '../../../services/service-component.service';
import {PropertyGenerator} from '../../../shared/property-generator';
import {
  BreadcrumbComposite,
  Button,
  CardComposite,
  Dropdown,
  FormComposite,
  Icon,
  INPUT,
  InputGroupComposite,
  Table,
  Text,
  UIComponent,
  ServiceMappingType
} from '../../../models/model';

// import { UIComponent } from "src/app/models/modelDependency";


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  @Input() componentProperties: any[];
  @Input() componentName: any;

  serviceNoneOption: Object;
  selectedServiceComponent: Object;
  component: any;
  subComponent: any;
  subComponentName: any;
  properties: any[] = [];
  tmp: Map<any, any>;
  compositeElements: any[] = [];
  private isComposite = false;
  private isCustom: boolean = false;


  constructor(private graphEditorService: GraphEditorService,
              private servceComponentService: ServiceComponentService
  ) {
    this.selectedServiceComponent = {};
    this.selectedServiceComponent['name'] = 'choose service component';
    this.serviceNoneOption = {
      'name': 'None',
      'preference': 0
    };
  }

  ngOnInit(): void {
    console.log('start wizard');
  }

  setComponent(properties): boolean {
    properties['id'] = PropertyGenerator.getID();
    properties['selector'] = PropertyGenerator.getSelector(this.componentName);
    properties['type'] = this.componentName;
    properties['serviceType'] = ServiceMappingType['none'];
    properties['serviceComponent'] = {
      'name': '',
      'preference': 0
    };

    switch (this.componentName) {
      case 'icon':
        this.component = new Icon(properties);
        break;
      case 'text':
        this.component = new Text(properties);
        break;
      case 'button':
        this.component = new Button(properties);
        break;
      case 'dropdown':
        this.component = new Dropdown(properties);
        break;
      case 'table':
        this.component = new Table(properties);
        break;
      case 'card':
        this.component = new CardComposite(properties);
        break;
      case 'inputgroup':
        this.component = new InputGroupComposite(properties);
        break;
      case 'input':
        this.component = new INPUT(properties);
        break;
      case 'breadcrumb':
        this.component = new BreadcrumbComposite(properties);
        break;
      case 'form':
        this.component = new FormComposite(properties);
        break;
      default:
        console.log('Component Building Failed');
        return false;
    }
    return true;
  }

  setSubComponent(properties): boolean {
    properties['id'] = PropertyGenerator.getID();
    properties['selector'] = this.subComponentName;
    properties['type'] = this.subComponentName;
    properties['serviceType'] = ServiceMappingType['none'];
    properties['serviceComponent'] = {
      'name': '',
      'preference': 0
    };

    switch (this.subComponentName) {
      case 'icon':
        this.subComponent = new Icon(properties);
        break;
      case 'text':
        this.subComponent = new Text(properties);
        break;
      case 'button':
        this.subComponent = new Button(properties);
        break;
      case 'dropdown':
        this.subComponent = new Dropdown(properties);
        break;
      case 'table':
        this.subComponent = new Table(properties);
        break;
      case 'card':
        this.subComponent = new CardComposite(properties);
        break;
      case 'inputgroup':
        this.subComponent = new InputGroupComposite(properties);
        break;
      case 'input':
        this.subComponent = new INPUT(properties);
        break;
      case 'breadcrumb':
        this.component = new BreadcrumbComposite(properties);
        break;
      case 'form':
        this.component = new FormComposite(properties);
        break;
      default:
        console.log('Sub Component Building Failed');
        return false;
    }
    return true;
  }

  getComponentProperties(componentName) {
    this.componentProperties = Storage.getComponentProperties(componentName);
    if (this.componentProperties == undefined) {
      this.component = Storage.getCompositeByName(componentName);
      this.isCustom = true;
      return;
    }
    if (this.componentProperties.includes('componentList')) {
      console.log('is Composite');
      this.isComposite = true;
    } else {
      this.isComposite = false;
    }
  }

  getSubComponentProperties(subComponentName: string) {
    this.properties = Storage.getComponentProperties(subComponentName);
    this.subComponentName = subComponentName;
  }

  show() {
    console.log('change');
  }


  onKey(event: any) {
    this.tmp.set(event.target.name, event.target.value);
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    if (this.setComponent(f.value)) {
      console.log('set component properties');
    }
  }

  onCompositeSubmit(sf: NgForm) {
    console.log(sf.value);
    if (this.setSubComponent(sf.value)) {
      console.log('ready to add ' + this.subComponentName + ' component to composite component');
      this.component.add(this.subComponent);
      for (const element of this.properties) {
        sf['value'][element] = '';
      }

      //reset form with dafault value
      sf.resetForm(sf['value']);
    }
  }

  clickNext() {
    $('#myModal a[href="#composition"]').tab('show');
  }


  onClose() {
    console.log('close');
    $('#myModal a[href="#building"]').tab('show');
  }

  clickCreate() {
    this.compositeElements = Storage.getCompositeElements(this.componentName);
  }


  clickFinish() {
    console.log('finish');
    $('#myModal a[href="#building"]').tab('show');
    let newComponent = {};
    if (this.isCustom) {
      newComponent = this.newCompositeComponent(newComponent, this.component);
      newComponent['id'] = PropertyGenerator.getID();
      newComponent['selector'] = PropertyGenerator.getSelector(newComponent.type);
      this.graphEditorService.bindComponent(newComponent);
    } else {
      Storage.add(this.component);
      this.graphEditorService.bindComponent(this.component);
    }
    this.properties = [];
    this.subComponentName = '';
    this.isCustom = false;
    this.component = {};

  }

  newCompositeComponent(newComponent, component) {
    if(component["type"].startsWith("form")) {
      newComponent = new FormComposite();
      newComponent['type'] = "form";
    }
    for (let i in component.componentList) {
      newComponent['componentList'].push(Object.assign({}, component['componentList'][i]));
      newComponent['componentList'][i]['id'] = PropertyGenerator.getID();
      newComponent['componentList'][i]['selector'] = PropertyGenerator.getSelector(newComponent['componentList'][i].type);
    }
    return newComponent;
  }

  // this is for composition subComponent
  // type1. Service Component
  // type2. Argument
  // type3. None
  setServiceType(subComponent: UIComponent, serviceType: ServiceMappingType) {
    console.log('set service Type');
    console.log(subComponent);
    console.log(serviceType);
    subComponent.setServiceType(serviceType);
  }

  setArgument(subComponent: UIComponent, argument) {
    subComponent.setArgument(argument.name);
  }

  setServiceComponent(component: UIComponent, serviceComponent) {
    component.setServiceComponent(serviceComponent);
  }

  setSelectedServiceComponent(serviceComponent) {
    this.selectedServiceComponent = serviceComponent;
    this.setServiceComponent(this.component, serviceComponent);
  }

  setSelectedServiceSubComponent(subComponent, serviceComponent) {
    this.setServiceComponent(subComponent, serviceComponent);
  }

  getServiceComponents() {
    return this.servceComponentService.getServiceComponents();
  }

  setMatchmaking(isChecked) {
    this.servceComponentService.setIsMatchMaking(isChecked);
  }

  queryServices() {
    this.servceComponentService.queryServer();
  }
}

