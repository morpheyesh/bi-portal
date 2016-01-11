/**
 * Copyright 2013 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/* 
 * This is modified by Megam Systems.
 */

var PORTAL = function() {

    $('#btn-keyboard-shortcuts').click(function(){showHelp();});

    //function hideDropTarget() {
    //    $("#dropTarget").hide();
    //    PORTAL.keyboard.remove(/* ESCAPE */ 27);
   // }

   //$('#chart').on("dragenter",function(event) {
    //    if ($.inArray("text/plain",event.originalEvent.dataTransfer.types) != -1) {
    //        $("#dropTarget").css({display:'table'});
     //       PORTAL.keyboard.add(/* ESCAPE */ 27,hideDropTarget);
     //   }
    //});

   /* $('#dropTarget').on("dragover",function(event) {
        if ($.inArray("text/plain",event.originalEvent.dataTransfer.types) != -1) {
            event.preventDefault();
        }
    })
    .on("dragleave",function(event) {
        hideDropTarget();
    })
    .on("drop",function(event) {
        var data = event.originalEvent.dataTransfer.getData("text/plain");
        hideDropTarget();
        PORTAL.view.importNodes(data);
        event.preventDefault();
    });*/


    function save(force) {
        if (PORTAL.view.dirty()) {

            if (!force) {
                var invalid = false;
                var unknownNodes = [];
                PORTAL.nodes.eachNode(function(node) {
                	console.log(node);
                    invalid = invalid || !node.valid;
                    if (node.type === "unknown") {
                        if (unknownNodes.indexOf(node.name) == -1) {
                            unknownNodes.push(node.name);
                        }
                        invalid = true;
                    }
                });
                /*if (invalid) {
                    if (unknownNodes.length > 0) {
                        $( "#node-dialog-confirm-deploy-config" ).hide();
                        $( "#node-dialog-confirm-deploy-unknown" ).show();
                        var list = "<li>"+unknownNodes.join("</li><li>")+"</li>";
                        $( "#node-dialog-confirm-deploy-unknown-list" ).html(list);
                    } else {
                        $( "#node-dialog-confirm-deploy-config" ).show();
                        $( "#node-dialog-confirm-deploy-unknown" ).hide();
                    }
                    $( "#node-dialog-confirm-deploy" ).dialog( "open" );
                    return;
                }*/
            }
            
            var nns = PORTAL.nodes.createCompleteNodeSet();           
            var dataLength = nns.length;
            var totalCS = 0;
            var totalCSLength = 0;
            
            for(i=0;i<dataLength; i++) {
            	if(nns[i].type == "cloudsettings" || nns[i].type == "docker") {            	
            		totalCS = totalCS + 1;
            		totalCSLength = totalCSLength + nns[i].wires[0].length;
            	  } 
            	}            
            
            if ((dataLength-totalCS) != totalCSLength) {
            	PORTAL.notify("<strong>Error</strong>: Apps or Services are not properly configured. Please re-configure the apps or services.","error");
            	return;
            } 
            
            $("#btn-icn-deploy").removeClass('icon-upload');
            $("#btn-icn-deploy").addClass('spinner');
            PORTAL.view.dirty(false);            
         
            //assemblies JSON creation 
            console.log(JSON.stringify(nns));
            var json = PORTAL.nodes.assemblyJson(nns);
            console.log(JSON.stringify(json));
                       
           $.ajax({
                url:"flows",
                type: "POST",
                data: JSON.stringify(json),
                contentType: "application/json; charset=utf-8"
            }).done(function(data,textStatus,xhr) {            	
                PORTAL.notify("Successfully deployed","success");
                PORTAL.nodes.eachNode(function(node) {
                    if (node.changed) {
                        node.dirty = true;
                        node.changed = false;
                    }
                    if(node.credentials) {
                        delete node.credentials;
                    }
                });
                PORTAL.nodes.eachConfig(function (confNode) {
                    if (confNode.credentials) {
                        delete confNode.credentials;
                    }
                });
                // Once deployed, cannot undo back to a clean state
                PORTAL.history.markAllDirty();
                PORTAL.view.redraw();
            }).fail(function(xhr,textStatus,err) {
                PORTAL.view.dirty(true);
                if (xhr.responseText) {
                    PORTAL.notify("<strong>Error</strong>: "+xhr.responseText,"error");
                } else {
                    PORTAL.notify("<strong>Error</strong>: no response from server","error");
                }
            }).always(function() {
                $("#btn-icn-deploy").removeClass('spinner');
                $("#btn-icn-deploy").addClass('icon-upload');
            });
        }
    }

    $('#btn-deploy').click(function() { save(); });

    $( "#node-dialog-confirm-deploy" ).dialog({
            title: "Confirm deploy",
            modal: true,
            autoOpen: false,
            width: 530,
            height: 230,
            buttons: [
                {
                    text: "Confirm deploy",
                    click: function() {
                        save(true);
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: "Cancel",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]
    });
    
    var workspaceIndex = 0;
    
    function setWorkSpace() {
    	 var tabId = PORTAL.nodes.id();
         do {
             workspaceIndex += 1;
         } while($("#workspace-tabs a[title='Sheet "+workspaceIndex+"']").size() != 0);

         var ws = {type:"tab",id:tabId,label:"Sheet "+workspaceIndex};
    	PORTAL.view.addWorkspace(ws);
    } 
    
    function loadFlows() {
       // $.getJSON("flows",function(nodes) {
        	//console.log(nodes);
        	//var nodes = [{"name":"table1", "type":"Schema"},{"name":"table2", "type":"Schema"}];
            //PORTAL.nodes.import(nodes);
            var sample = [
                      {label:"table1", name: 'table1', inputs:2, outputs:3, category: 'AppBoilers1', schemas: ["schema1", "schema2", "schema3", "schema4"]},
                      {label:"table2", name: 'table2', inputs:1, outputs:3, category: 'AppBoilers2', schemas: ["schema1", "schema2", "schema3", "schema4"]},
                      {label:"table3", name: 'table3', inputs:4, outputs:3, category: 'AppBoilers1', schemas: ["schema1", "schema2", "schema3", "schema4"]},
                      {label:"table4", name: 'table4', inputs:2, outputs:4, category: 'AppBoilers2', schemas: ["schema1", "schema2", "schema3", "schema4"]},
                      {label:"table5", name: 'table5', inputs:3, outputs:5, category: 'AppBoilers3', schemas: ["schema1", "schema2", "schema3", "schema4"]},
                      {label:"table6", name: 'table6', inputs:5, outputs:6, category: 'AppBoilers2', schemas: ["schema1", "schema2", "schema3", "schema4"]}
                      ]
            PORTAL.nodes.registerType(sample);
             $(".palette-scroll").show();
            //PORTAL.view.dirty(false);
            //PORTAL.view.redraw();           
        //});
    }

    $('#btn-node-status').click(function() {toggleStatus();});

    var statusEnabled = false;
    function toggleStatus() {
        var btnStatus = $("#btn-node-status");
        statusEnabled = btnStatus.toggleClass("active").hasClass("active");
        PORTAL.view.status(statusEnabled);
    }
    
    function showHelp() {

       // var dialog = $('#node-help');

        //$("#node-help").draggable({
        //        handle: ".modal-header"
        //});

        //dialog.on('show',function() {
        //    PORTAL.keyboard.disable();
       // });
        //dialog.on('hidden',function() {
        //    PORTAL.keyboard.enable();
        //});

       // dialog.modal();
    }

    $(function() {
        PORTAL.keyboard.add(/* ? */ 191,{shift:true},function(){showHelp();d3.event.preventDefault();});
        $("#btn-deploy").addClass("disabled");
        setWorkSpace();
        loadFlows(); 
        loadSettings();     
    }); 

    return {
    };
}();
