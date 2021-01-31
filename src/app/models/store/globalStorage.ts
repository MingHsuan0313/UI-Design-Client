export class SelabGlobalStorage {
    static projectName: string;
    static ndl: {};
    static sumdl: {};

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

    static addEdge(sourcePage, targetPage, parameter) {
        for(let index = 0;index < this.ndl['children'].length;index++) {
            if(this.ndl['children'][index]['component'] == sourcePage['name']) {
                this.ndl['children'][index]['destination'].push(targetPage['name'])
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
            'children': []
        }
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