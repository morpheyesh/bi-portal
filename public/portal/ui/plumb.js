PORTAL.plumb = function() {	

  var refresh_all = function() {
    jsPlumb.repaintEverything();
};

	function plumby(nn, el) {

		jsPlumb.ready(function() {

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
				//Connector : ["Flowchart", {
				//	stub : 20,
				//	alwaysRespectStubs : true
				//}],
				PaintStyle : {
					lineWidth : 5,
					strokeStyle : '#5c96bc'
				},
			});

			jsPlumb.draggable($("." + nn._def.name));

			var anEndpointDestination = {
				endpoint : ["Dot", {
					radius : 7
				}],
				isSource : true,
				isTarget : true,
				connectorStyle : {
					lineWidth : 3,
					strokeStyle : 'blue'
				},
				maxConnections : 10,

				anchors : ["Right", "Left"],
				dropOptions : {
					drop : function(e, ui) {
						var connectionList = jsPlumb.getConnections(this);
						console.log(connectionList);
					}
				}
			};

			 $.each(nn._def.schemas, function( key, value ) {
				console.log("."+nn._def.name+"_"+value);
				var parentnode = $("."+nn._def.name+"_"+value)[0];
				jsPlumb.addEndpoint(parentnode, anEndpointDestination);
			});
			
         refresh_all();
		
		});
	}

	return {
		plumby : plumby
	};

}();
