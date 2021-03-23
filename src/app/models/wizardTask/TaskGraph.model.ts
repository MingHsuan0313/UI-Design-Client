import { Edge, Node } from "@swimlane/ngx-graph";
import { ServiceComponentModel } from "../internalRepresentation/serviceComponent/ServiceComponentModel";
import { tasksSelector } from "../store/selectors/PipelineStorageSelector";

export class TaskGraph {
    beginTask: WizardTask;
    taskCount: number;
    currentTask: WizardTask;
    taskStack: WizardTask[]; // maintain all task state and order

    constructor(task: WizardTask) {
        this.taskStack = [];
        this.taskCount = 1;
        this.beginTask = task;
        this.currentTask = task;
        this.beginTask.state = TaskState['ongoing'];
        this.taskStack.push(task);
    }

    next() {
        console.log("next task........");
        for(let index = this.taskStack.length - 1; index >= 0; index--) {
            if(this.taskStack[index].state == TaskState['closed'])
                continue;
            else if(this.taskStack[index].state == TaskState['undo']) {
                this.currentTask = this.taskStack[index];
                this.currentTask.start();
                break;
            }
        }
    }

    setCurrentTask(task: WizardTask) {
        task.state = TaskState['ongoing'];
        this.currentTask = task;
        this.currentTask.start();
    }

    insertTask(componentType: string, componentSelector: string, service: ServiceComponentModel) {
        this.currentTask.insertTask(componentType, componentSelector, service);
    }

    traverse() {
        this.dfs(this.beginTask);
    }

    dfs(task: WizardTask) {
        for(let index = 0;index < task.tasks.length; index++) {
            this.dfs(task.tasks[index]);
        }
    }

    establishStorage(task: WizardTask, storage: PipelineStatusStorage) {
        let newNode = {
            id: `task${storage.nodes.length}`,
            label: `Task${storage.nodes.length} (${task.componentType})`,
            data: {
                status: `${task.state}`
            }
        }
        if(task.tasks.length > 0) {
            newNode['label'] = `Task${storage.nodes.length} (${task.componentType}) *${task.tasks[0].service.name}`;
        }
        storage.addNode(newNode);
        for(let index = 0; index < task.tasks.length; index++) {
            let service: ServiceComponentModel = task.tasks[index].service;
            let newEdge = {
                id: `edge-${storage.edges.length}`,
                label: `${service.getName()} (${service.getServiceID()})`,
                source: `${newNode.id}`,
                target: `task${storage.nodes.length}`,
            } 
            storage.addEdge(newEdge);
            this.establishStorage(task.tasks[index], storage);
        }
    }

    convertToNgxGraph(): PipelineStatusStorage {
        let storage = new PipelineStatusStorage();
        this.establishStorage(this.beginTask, storage);
        return storage;
    }
}

export class WizardTask {
    name: string; // eg: task-0
    tasks: WizardTask[] = [];
    service: ServiceComponentModel;
    componentType: string;
    componentSelector: string;
    parentTask: WizardTask;
    state: TaskState;
    isRoot: boolean; // first task


    constructor() {
    }

    insertTask(componentType: string, componentSelector: string, service: ServiceComponentModel) {
        let task = new WizardTask();
        task.setComponentType(componentType)
            .setComponentSelector(componentSelector)
            .setName('Task')
            .setService(service)
            .setState(TaskState['undo']);
        this.tasks.push(task);
    }

    finish() {
        this.state = TaskState['closed'];
    }

    start() {
        this.state = TaskState['ongoing'];
    }

    setName(name: string) {
        this.name = name;
        return this;
    }

    setService(service: ServiceComponentModel) {
        this.service = service;
        return this;
    }

    setComponentType(componentType: string) {
        this.componentType = componentType;
        return this;
    }

    setComponentSelector(componentSelector: string) {
        this.componentSelector = componentSelector;
        return this;
    }

    setParentTask(task: WizardTask) {
        this.parentTask = task;
        return this;
    }

    setState(state: TaskState) {
        this.state = state;
        return this;
    }

    setIsRoot(flag: boolean) {
        this.isRoot = flag;
        return this;
    }
}

export enum TaskState {
    undo = 0,
    ongoing = 1,
    closed = 2,
}

export class PipelineStatusStorage {
    nodes: Node[] = [];
    edges: Edge[] = [];
    constructor() {

    }

    addNode(node: Node) {
        this.nodes.push(node);
    }

    addEdge(edge: Edge) {
        this.edges.push(edge);
    }
}