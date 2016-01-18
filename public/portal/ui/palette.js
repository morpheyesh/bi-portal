PORTAL.palette = function() {  
  
    
    function createList(def){
    	
    	//$("#paletteList").append('<li><a href="#">'+cat.name+'</a></li>');
    	  nt = def.name;
    	  var d = document.createElement("div");
          d.id = "pn_"+def.name;
          d.type = def.name;
          d.schemas = def.schemas;
          
          d.innerHTML = '<a href="#">'+def.name+'</a>';
          d.className="palette_node";            
          
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