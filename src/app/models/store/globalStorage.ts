export class SelabGlobalStorage {
    static projectName: string;
    static ndl: {};
    static sumdl: {};
    static usedNameTable: {}; // save all existing page and theme name, for duplicate name checking

    static addName(name: string) {
        if (this.usedNameTable == undefined)
            this.usedNameTable = {}
        this.usedNameTable[name] = "success";
    }

    static deleteName(name: string) {
        delete this.usedNameTable[name];
    }

    static checkIsNameUsed(name: string) {
        if (this.usedNameTable == undefined)
            return false;

        if (name in this.usedNameTable)
            return true;
        else 
            return false;
    }

    static initializeNDL() {
        this.ndl = {
            "selector": "DefaultLayout",
            "component":"DefaultLayoutComponent",
            "path": "",
            "category": "Layout",
            "children": []
        }
    }

    static cleanNDLChildren() {
        this.ndl['children'] = [];
    }

    static cleanEdges() {
        for(let index = 0;index < this.ndl['children'].length;index++) {
            this.ndl['children'][index]['destination'] = [];
        }
    }

    static addEdge(source, target, parameter) {
        for(let index = 0;index < this.ndl['children'].length;index++) {
            if(this.ndl['children'][index]['component'] == source['pageName']) {
                this.ndl['children'][index]['destination'].push(target['pageName'])

                this.ndl['children'][index]['edges'].push({
                    "source": source['componentSelector'],
                    "target": target["pageName"],
                    "passingParameter": parameter
                })


                if(parameter != undefined && parameter.length > 0) {
                    this.ndl['children'][index]['parameters'].push(parameter);
                }
                return;
            }
        }
    }

    static addNDL(page) {
        let newPage = {
            'selector': page['id'],
            'component': page['name'],
            'path': page['name'],
            'category': 'page',
            'isMain': page['imsMain'],
            'destination': [],
            'parameters': [],
            'children': [],
            'edges': []
        }
        console.log("Hello Hello Hello Hello Hello")
        this.ndl['children'].push(newPage);
    }

    

    static deletePage(pageId: string) {

    }

    static setProjectName(projectName: string) {
        if(projectName.length == 0)
            this.projectName = "SelabProject";
        this.projectName = projectName;
        this.ndl = {};
        this.sumdl = {};
    }
    
    static getInfo() {
        return {
            "projectName": this.projectName,
            "ndl": this.ndl,
            "sumdl": this.sumdl
        }
    }
}