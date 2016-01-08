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
 
PORTAL.palette = function() {   
    
    function createCategoryContainer(category){
       
        $("#palette-container").append('\
            <div class="palette-category">\
            <div id="header-'+category+'" class="palette-header"><i class="expanded icon-chevron-down"></i><span>'+category+'</span></div>\
            <div class="palette-content" id="palette-base-category-'+category+'">\
              <div id="palette-'+category+'-input"></div>\
              <div id="palette-'+category+'-output"></div>\
              <div id="palette-'+category+'-function"></div>\
            </div>\
            </div>');    	
    }
    
    function createList(def){
    	
    	//$("#paletteList").append('<li><a href="#">'+cat.name+'</a></li>');
    	  nt = def.name;
    	  var d = document.createElement("div");
          d.id = "pn_"+def.name;
          d.type = def.name;
          d.schemas = def.schemas;
          
          d.innerHTML = '<a href="#">'+def.name+'</a>';
          d.className="palette_node"; 
          
           if (def.outputs > 0) {
              var port = document.createElement("div");
              port.className = "palette_port palette_port_output";
              d.appendChild(port);            
          }
          
          if (def.inputs > 0) {
              var port = document.createElement("div");
              port.className = "palette_port";
              d.appendChild(port);             
          }         
          
          $("#palette-container").append(d);
          d.onmousedown = function(e) { e.preventDefault(); }
          
          $(d).popover({
                  title:d.type,
                  placement:"right",
                  trigger: "hover",
                  delay: { show: 750, hide: 50 },
                  html: true,
                  container:'body',
                  content: $(($("script[data-help-name|='"+nt+"']").html()||"<p>no information available</p>").trim())[0] 
          });
         
          $(d).draggable({
              helper: 'clone',
              appendTo: 'body',
              revert: true,
              revertDuration: 50
          });         
          
    }
    
    function addNodeType(def) {
        createList(def);
    }   
    
    return {
        add:addNodeType
    };
}();
