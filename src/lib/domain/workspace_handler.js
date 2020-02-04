/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
/* eslint-disable space-infix-ops */

import { RESTExecutor } from "./networkDomain";

class WorkspaceHandler extends RESTExecutor{
    constructor(config,initializer){
        super('get','detail')
        this.initializer = initializer;

    }
    

    persistWorkspace(data){
    // console.log("PERSIST DATA",data)
    this.domain.write('workspace_id', data.id, true);
    this.domain.write('workspace_data', data, true);
  }
    isSelected(){
        // console.log("IS SELECTED")
        return Boolean(this.domain.read('workspace_id'));
    }

    getWorkspace(){
        return {
          id: this.domain.read('workspace_id'),
          data: this.domain.read('workspace_data'),
        };
}
    selectWorkspace(data){
        this.persistWorkspace(data);
    }

    refresh(){
        let id=this.domain.read('workspace_id');
        // console.log("REFRESHING FOR ID",id);
        this.forId(id).callbacks((success)=>{
            console.log("REFRESHED WORKSPACC",success.result);
            this.persistWorkspace(success.result);
        },(error,resp)=>{
            console.log("ERROR REFRESHING WORKSPACE",error)
            // this.removeWorkspace()
        }).execute();
        // this.callbacks
    }

    removeWorkspace(){
        // this.initializer()
        console.log("remove workspace")
        this.domain.purge()
        // this.domain.remove('workspace_id', true);
        // this.domain.remove('workspace_data', true);
    }

}

export default WorkspaceHandler