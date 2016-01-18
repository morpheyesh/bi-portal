(function() {

	jsPlumb.ready(function() {
		jsPlumb.Defaults.Container = $(".window");

		//all windows are draggable
		jsPlumb.draggable($(".window"));

		var anEndpointDestination = {
			endpoint : ["Dot", {
				radius : 5
			}],
			isSource : true,
			isTarget : true,
			connectorStyle : {
				lineWidth : 3,
				strokeStyle : 'blue'
			},
			maxConnections : 10,

			anchors : ["Left", "Right"],
			dropOptions : {
				drop : function(e, ui) {
					var connectionList = jsPlumb.getConnections(this);
					console.log(connectionList);
				}
			}
		};

		 var parentnode2 = $(".add2")[0];
                
                
                jsPlumb.addEndpoint(
                    parentnode2,
                    anEndpointDestination
                );
                
                var parentnode3 = $(".add3")[0];
                
                
                jsPlumb.addEndpoint(
                    parentnode3,
                    anEndpointDestination
                );

                
                 var parentnode21 = $(".rem2")[0];
                
                
                jsPlumb.addEndpoint(
                    parentnode21,
                    anEndpointDestination
                );

                var parentnode31 = $(".rem3")[0];
                
                
                jsPlumb.addEndpoint(
                    parentnode31,
                    anEndpointDestination
                );

	});

})(); 