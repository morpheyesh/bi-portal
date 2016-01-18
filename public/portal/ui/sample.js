var source_config = {
	maxConnections : 10,
	onMaxConnections : function(info, e) {
	}
};

var target_config = {
	dropOptions : {
		hoverClass : "dragHover"
	},
};

var table1 = '<div class="window" style="left: 20px">' + 
                '<div class="button_container">' + 
                  '<div class="button_add add">Add2</div>' + 
                '</div>' + 
                '<div class="button_container">' + 
                   '<div class="button_remove rem">Remove</div>' + 
                 '</div>' + 
             '</div>';

var table2 = '<div class="window table1">'+
                '<div class="button_container">'+
                   '<div class="button_add add">schema1</div>'+
                 '</div>'+
                 '<div class="button_container">'+
                    '<div class="button_add add1">schema2</div>'+
                  '</div>'+
                  '<div class="button_container">'+
                     '<div class="button_add add2">schema3</div>'+
                   '</div>'+
                   '<div class="button_container">'+
                   '<div class="button_add add3">schema4</div>'+
                   '</div></div>';

var refresh_all = function() {
	jsPlumb.repaintEverything();
};

//jsPlumb.ready(function() {
jsPlumb.bind("ready", function() {

	jsPlumb.importDefaults({
		Container : $("body"),
		Endpoints : [["Dot", {
			radius : 2
		}], ["Dot", {
			radius : 5
		}]],
		Anchor : "Continuous",
		HoverPaintStyle : {
			strokeStyle : "#1e8151",
			lineWidth : 5
		},
		ConnectionOverlays : [],
		Connector : ["Flowchart", {
			stub : 20,
			alwaysRespectStubs : true
		}],
		PaintStyle : {
			lineWidth : 5,
			strokeStyle : '#5c96bc'
		},
	});

	//centering
	$('#chart .window').each(function() {
		$(this).css({
			position : 'absolute',
			left : ($(".window").width() - $(this).outerWidth()) / 2,
			top : ($(".window").height() - $(this).outerHeight()) / 2,
			margin : 0
		});
	});

	$(".window").draggable({
		containment : ".chart",
		helper : "clone",
		//appendTo: ".canvas"
	});

	var endpointOptions = {
		anchors : ["Right", "Left"],
		isSource : true,
		isTarget : true,
		endpoint : ["Dot", {
			radius : 10
		}],
		style : {
			fillStyle : 'blue'
		},
		maxConnections : -1,
		connector : "Straight",
		connectorStyle : {
			lineWidth : 3,
			strokeStyle : 'blue'
		},
		scope : "blueline",
		dropOptions : {
			drop : function(e, ui) {
				alert('drop!');
			}
		}
	};

	var i = 1;

	$('#chart').droppable({
		accept : ".palette_node",
		drop : function(e, ui) {
			var selected_tool = ui.draggable[0].type;
			var nn = {
				id : (1 + Math.random() * 4294967295).toString(16)				
			};

			nn.name = selected_tool;
			nn._def = PORTAL.nodes.getType(nn.name);
			
			
			var content = '<div class="window '+nn._def.name+'" id="container00">';
		
		$.each(nn._def.schemas, function( key, value ) {
           content += '<div class="button_container">' + 
				         '<div class="button_add tablebutton '+ nn._def.name+'_'+value+'">'+value+'</div>' + 
				       '</div>';
      });
		
		content += '</div>';
		
		//console.log(content);
			
			i = i + 1;
			//$(ui.draggable).hasClass('tb12');
			el = $(table2);
			// el.css({'top': ui.offset.top, 'left': ui.offset.left});
			$(this).append(el);
			//blink(el, 'black');

			jsPlumb.draggable(el, {
				containment : "parent"
			});
			//console.log(i);	
			
			jsPlumb.addEndpoint($(this).find(".add"), endpointOptions );
			jsPlumb.addEndpoint($(this).find(".add1"), endpointOptions );
			//jsPlumb.makeSource($(this).find(".add"), source_config);
			//jsPlumb.makeTarget($(this).find(".rem"), target_config);
			refresh_all();
		}
	});

	jsPlumb.bind("click", function(conn, originalEvent) {
		if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
			jsPlumb.detach(conn);
	});

	jsPlumb.bind("connection", function(info) {
		info.connection.getOverlay("label").setLabel(info.connection.id);
	});

	//context_menu();
	// create_example();
});
