import {Component, Input, OnInit} from '@angular/core';
import {Storage} from '../../../shared/storage';
import {NgForm} from '@angular/forms';
import GraphEditorService from '../../../services/externalRepresentation/graph-editor.service';
import ServiceComponentService from '../../../services/serviceComponent/service-component.service';
import {PropertyGenerator} from '../../../shared/property-generator';
import { ServiceComponentModel, ServiceMappingType } from '../../../models/service-component-dependency';
import {
  BreadcrumbComponent,
  ButtonComponent,
  CardComponent,
  DropdownComponent,
  FormComponent,
  IconComponent,
  InputTextComponent,
  InputGroupComponent,
  TableComponent,
  TextComponent,
  UIComponent,
} from '../../../models/ui-component-dependency';

// import { UIComponent } from "src/app/models/modelDependency";


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  @Input() componentProperties: any[];
  @Input() componentName: any;

  public component: any;
  public subComponent: any;
  public subComponentName: any;
  public properties: any[] = [];
  public tmp: Map<any, any>;
  public compositeElements: any[] = [];
  private isComposite = false;
  private isCustom: boolean = false;


  constructor(private graphEditorService: GraphEditorService,
  ) {
  }

  ngOnInit(): void {
  }

  setComponent(properties): boolean {
    properties['id'] = PropertyGenerator.getID(this.graphEditorService.getMaxVertexID());
    properties['selector'] = PropertyGenerator.getSelector(this.componentName);
    properties['type'] = this.componentName;
    // properties['serviceType'] = ServiceMappingType['none'];
    properties['serviceComponent'] = new ServiceComponentModel(); 

    switch (this.componentName) {
      case 'icon':
        this.component = new IconComponent(properties);
        break;
      case 'text':
        this.component = new TextComponent(properties);
        break;
      case 'button':
        this.component = new ButtonComponent(properties);
        break;
      case 'dropdown':
        this.component = new DropdownComponent(properties);
        break;
      case 'table':
        this.component = new TableComponent(properties);
        break;
      case 'card':
        this.component = new CardComponent(properties);
        break;
      case 'inputgroup':
        this.component = new InputGroupComponent(properties);
        break;
      case 'input':
        this.component = new InputTextComponent(properties);
        break;
      case 'breadcrumb':
        this.component = new BreadcrumbComponent(properties);
        break;
      case 'form':
        this.component = new FormComponent(properties);
        break;
      default:
        console.log('Component Building Failed');
        return false;
    }
    return true;
  }

  setSubComponent(properties): boolean {
    properties['id'] = PropertyGenerator.getID(this.graphEditorService.getMaxVertexID());
    properties['selector'] = PropertyGenerator.getSelector(this.subComponentName);
    properties['type'] = this.subComponentName;
    properties['serviceType'] = ServiceMappingType['none'];
    properties['serviceComponent'] = {
      'name': '',
      'preference': 0
    };

    switch (this.subComponentName) {
      case 'icon':
        this.subComponent = new IconComponent(properties);
        break;
      case 'text':
        this.subComponent = new TextComponent(properties);
        break;
      case 'button':
        this.subComponent = new ButtonComponent(properties);
        break;
      case 'dropdown':
        this.subComponent = new DropdownComponent(properties);
        break;
      case 'table':
        this.subComponent = new TableComponent(properties);
        break;
      case 'card':
        this.subComponent = new CardComponent(properties);
        break;
      case 'inputgroup':
        this.subComponent = new InputGroupComponent(properties);
        break;
      case 'input':
        this.subComponent = new InputTextComponent(properties);
        break;
      case 'breadcrumb':
        this.component = new BreadcrumbComponent(properties);
        break;
      case 'form':
        this.component = new FormComponent(properties);
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
      console.log("component no properties");
      this.isCustom = true;
      return;
    }
    if (this.componentProperties.includes('componentList')) {
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
    // console.log(f.value);
    if (this.setComponent(f.value)) {
      console.log('set component properties');
    }
    this.clickNext();
  }

  onCompositeSubmit(sf: NgForm) {
    // console.log(sf.value);
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
    $('#myModal a[href="#building"]').tab('show');
    let newComponent:any;
    console.log("dd")
    if (this.isCustom) {
      console.log("ee")
      newComponent = this.newCompositeComponent(newComponent, this.component);
      newComponent['id'] = PropertyGenerator.getID(this.graphEditorService.getMaxVertexID());
      newComponent['selector'] = PropertyGenerator.getSelector(newComponent.type);
      Storage.add(newComponent);
      this.graphEditorService.bindComponent(newComponent);
    } else {
      console.log("ff")
      Storage.add(this.component);
      this.graphEditorService.bindComponent(this.component);
    }
    console.log("Create UI Component");
    console.log(this.component);
    this.properties = [];
    this.subComponentName = '';
    this.isCustom = false;
    this.component = {};


  }

  newCompositeComponent(newComponent, component) {
    if(component["type"].startsWith("form")) {
      newComponent = new FormComponent();
      newComponent['type'] = "form";
    }
    for (let i in component.componentList) {
      newComponent['componentList'].push(Object.assign({}, component['componentList'][i]));
      newComponent['componentList'][i]['id'] = PropertyGenerator.getID(this.graphEditorService.getMaxVertexID());
      newComponent['componentList'][i]['selector'] = PropertyGenerator.getSelector(newComponent['componentList'][i].type);
    }
    return newComponent;
  }
}

