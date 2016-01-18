/*
 ** Copyright [2013] [Megam Systems]
 **
 ** Licensed under the Apache License, Version 2.0 (the "License");
 ** you may not use this file except in compliance with the License.
 ** You may obtain a copy of the License at
 **
 ** http://www.apache.org/licenses/LICENSE-2.0
 **
 ** Unless required by applicable law or agreed to in writing, software
 ** distributed under the License is distributed on an "AS IS" BASIS,
 ** WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ** See the License for the specific language governing permissions and
 ** limitations under the License.
 */

var PORTAL = function() {   

    function save(force) {
    }     
    
    
    function loadFlows() {
       // $.getJSON("flows",function(nodes) {
        	//console.log(nodes);
        	//var nodes = [{"name":"table1", "type":"Schema"},{"name":"table2", "type":"Schema"}];
            //PORTAL.nodes.import(nodes);
           /* var sample = [
                      {name: 'table1', schemas: ["schema1", "schema2", "schema3", "schema4"]},
                      {name: 'table2', schemas: ["schema1", "schema2", "schema3", "schema4"]},
                      {name: 'table3', schemas: ["schema1", "schema2", "schema3", "schema4"]},
                      {name: 'table4', schemas: ["schema1", "schema2", "schema3", "schema4"]},
                      {name: 'table5', schemas: ["schema1", "schema2", "schema3", "schema4"]},
                      {name: 'table6', schemas: ["schema1", "schema2", "schema3", "schema4"]}
                      ]
            PORTAL.nodes.registerType(sample);
             $(".palette-scroll").show();*/
            //PORTAL.view.dirty(false);
            //PORTAL.view.redraw();           
        //});
    }    
    
  
    $(function() {
       // PORTAL.keyboard.add(/* ? */ 191,{shift:true},function(){showHelp();d3.event.preventDefault();});
        //setWorkSpace();
        loadFlows(); 
    }); 

    return {
    };
}();
