import {Component, Input, OnInit} from "@angular/core";
import {Storage} from "../../../shared/storage";
import {NgForm} from "@angular/forms";
import GraphEditorService from "../../../services/graph-editor.service";
import {PropertyGenerator} from "../../../shared/property-generator";
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
  Text
} from "../../../models/model";



@Component({
  selector: "app-wizard",
  templateUrl: "./wizard.component.html",
  styleUrls: ["./wizard.component.scss"]
})
export class WizardComponent implements OnInit {

  @Input() componentProperties: any[];
  @Input() componentName: any;



  component: any;
  subComponent: any;
  subComponentName: any;
  properties: any[] = [];
  tmp: Map<any, any>;
  compositeElements: any[] = [];
  private isComposite = false;



  constructor(private graphEditorService: GraphEditorService) { }

  ngOnInit(): void {
    console.log("start wizard");
  }

  setComponent(properties): boolean {
   properties["id"] = PropertyGenerator.getID();
   properties["selector"] = PropertyGenerator.getSelector(this.componentName);
   properties["type"] = this.componentName;
    switch (this.componentName) {
      case "icon":
        this.component = new Icon(properties);
        break;
      case "text":
        this.component = new Text(properties);
        break;
      case "button":
        this.component = new Button(properties);
        break;
      case "dropdown":
        this.component = new Dropdown(properties);
        break;
      case "table":
        this.component = new Table(properties);
        break;
      case "card":
        this.component = new CardComposite(properties);
        break;
      case "inputgroup":
        this.component = new InputGroupComposite(properties);
        break;
      case "input":
        this.component = new INPUT(properties);
        break;
      case "breadcrumb":
        this.component = new BreadcrumbComposite(properties);
        break;
      case "form":
        this.component = new FormComposite(properties);
        break;
      default:
        console.log("Component Building Failed");
        return false;
    }
    return true;
  }

  setSubComponent(properties): boolean {
    properties["id"] = PropertyGenerator.getID();
    properties["selector"] = this.subComponentName;
    properties["type"] = this.subComponentName;
    switch (this.subComponentName) {
      case "icon":
        this.subComponent = new Icon(properties);
        break;
      case "text":
        this.subComponent = new Text(properties);
        break;
      case "button":
        this.subComponent = new Button(properties);
        break;
      case "dropdown":
        this.subComponent = new Dropdown(properties);
        break;
      case "table":
        this.subComponent = new Table(properties);
        break;
      case "card":
        this.subComponent = new CardComposite(properties);
        break;
      case "inputgroup":
        this.subComponent = new InputGroupComposite(properties);
        break;
      case "input":
        this.component = new INPUT(properties);
        break;
      case "breadcrumb":
        this.component = new BreadcrumbComposite(properties);
        break;
      case "form":
        this.component = new FormComposite(properties);
        break;
      default:
        console.log("Sub Component Building Failed");
        return false;
    }
    return true;
  }

  getComponentProperties(componentName) {
    this.componentProperties =  Storage.getComponentProperties(componentName);
    if (this.componentProperties.includes("componentList")) {
      console.log("is Composite");
      this.isComposite = true;
    } else {
      this.isComposite = false;
    }
  }

  getSubComponentProperties(subComponentName: string) {
    this.properties =  Storage.getComponentProperties(subComponentName);
    this.subComponentName = subComponentName;
  }

  show() {
    console.log("change");
  }


  onKey(event: any) {
    this.tmp.set(event.target.name, event.target.value);
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    if (this.setComponent(f.value)) {
      console.log("set component properties");
    }
  }

  onCompositeSubmit(sf: NgForm) {
    console.log(sf.value);
    if (this.setSubComponent(sf.value)) {
      console.log("ready to add " + this.subComponentName + " component to composite component");
      this.component.add(this.subComponent);
      for (const element of this.properties) {
        sf["value"][element] = "";
      }

      //reset form with dafault value
      sf.resetForm(sf["value"]);
    }
  }
  clickNext() {
    $("#myModal a[href=\"#composition\"]").tab("show");
  }


  onClose() {
    console.log("close");
    $("#myModal a[href=\"#building\"]").tab("show");
  }

  clickCreate() {
    this.compositeElements = Storage.getCompositeElements(this.componentName);
  }


  clickFinish() {
    console.log("finish");
    this.component.getInfo();
    $("#myModal a[href=\"#building\"]").tab("show");
    Storage.add(this.component);
    this.graphEditorService.bindComponent(this.component);
    console.log(this.component);
    this.properties = [];
    this.subComponentName = "";

  }

}
