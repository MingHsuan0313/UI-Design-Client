export class SelabGlobalStorage {
    static projectName: string;
    static ndl: {};
    static sumdl: {};
    
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