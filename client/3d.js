
THREE;

		  //  addEventListener("deviceorientation", function(event){
		  //  	line.rotation.x = event.alpha * Math.PI / 180.0;
		  //  	line.rotation.y = event.beta * Math.PI / 180.0;
		  //  	line.rotation.z = event.gamma * Math.PI / 180.0;	
		  //  });


	var camera, scene, renderer;
	var mesh;
	var particle;
	var PI2 = Math.PI * 2;
	var mag = 50;
	var line;
	var group;
  var drawGroup;
  var drawGeo;
  var drawLine;
  var pos = new THREE.Vector3();
  var tm = 5;
  var posPart;

  var lastCoords;
  var relCoords = {alpha:0,beta:0};

  var count = true;

  


  
      

    Handlebars.registerHelper('makeKey', function(){
       
       var x = Math.random().toString(36).substring(13).substring(0,2).toUpperCase(); 
       Session.set('compKey', x);
       return Session.get('compKey');
        
    });

    Handlebars.registerHelper('stopped', function(){
      return Session.get('stop');
    });

    $(function(){
      Session.set('mag', 5);
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        {
            Session.set('mobKey', null);
            Session.set('stop', 1);//-1 means stopped, 0 means just toggled, 1 means not stopped
            return;
        }
        console.log('potato');
      init();
	  animate();  
	  Session.set('allowMessage', false);
	  console.log(scene);
//	  eval(scene);
    })
            
            function parseEvent(e){
                if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
                    return;
                applyRotation(e.ralpha * Math.PI / 180, e.rbeta * Math.PI / 180, 0, /*e.gamma * Math.PI / 180*/e.mag, e.stopped);
                
            }

			function applyRotation(a,b,c,d, stopped){//ret is the actual Vector3
        if(!d)
          d = 5; 
				// var x = new Date().getTime();
				var ret = new THREE.Vector3(mag, 0, 0);
				ret.applyEuler(new THREE.Euler(c,a,b,'XYZ'));
				line.geometry.vertices[1] = ret;
        
				particle.position = line.geometry.vertices[1];
        var desired = new THREE.Vector3();
        desired.copy(ret);
        desired.multiplyScalar(d/mag);
        pos.add(desired);
        var n = new THREE.Vector3();
        n.copy(pos);
        if(stopped == 1)
          drawGeo.vertices.push(n);
        else if(stopped == 0){

         drawGeo = new THREE.Geometry();
         drawGeo.vertices.push(n);
         drawGeo.vertices.push(n);

         drawLine = new THREE.Line(drawGeo, new THREE.LineBasicMaterial({color: 0x77FF77,  shading: THREE.SmoothShading}));
         drawLine.material.linewidth = 10;
         drawGroup.add(drawLine);

        }
        //if it's -1, do nothing
        
        posPart.position = n;
        
				return ret;
				
			}


        
        function clearCanvas(){
          if(drawGeo)
          {
            drawGeo.vertices = [];
            drawGeo.vertices.push( new THREE.Vector3() );
            drawGeo.vertices.push( new THREE.Vector3() );
            pos = new THREE.Vector3();
            //drawGroup.children = [];
            //drawLine = new THREE.Line(drawGeo);
            //drawGroup.add(drawLine);
          }
        }

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );



				renderer = new THREE.CanvasRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				// scene.rotation
				camera.position = new THREE.Vector3(0, 0, 400);
        
        controls = new THREE.TrackballControls( camera );	


				// controls = new THREE.TrackballControls( camera );				

            
				scene = new THREE.Scene();
				group = new THREE.Object3D();
        drawGroup = new THREE.Object3D();
        drawGeo = new THREE.Geometry();
				window.scene = scene;


				var mat = new THREE.ParticleCanvasMaterial( {

					color: 0xffffff,
					program: function ( context ) {

						context.beginPath();
						context.arc( 0, 0, 1, 0, PI2, true );
						context.fill();

					}

				} );
        
        posPart = new THREE.Particle(mat);
        
        posPart.scale.x = posPart.scale.y = 10;
        posPart.material.colo = 0xffffff;
        scene.add(posPart);        

				var matG = new THREE.ParticleCanvasMaterial( {
					color: 0x00ff00,
					program: function ( context ) {
						context.beginPath();
						context.arc( 0, 0, 1, 0, PI2, true );
						context.fill();
					}
				} );

				var geo = new THREE.Geometry();
				geo.vertices.push(new THREE.Vector3(0,0,0));
				geo.vertices.push(new THREE.Vector3(mag, 0, 0));
				line = new THREE.Line(geo);

				line.material.linewidth = 2;

				particle = new THREE.Particle(mat);
				particle.scale.x = particle.scale.y = 2;
				particle.position.x = mag;

				particle.position = line.geometry.vertices[1];
        
        

				var x = new THREE.Particle(matG);
				x.position.x = 200;

				var y = new THREE.Particle(matG);
				y.position.y = 200;
				

				var z = new THREE.Particle(matG);
				z.position.z = 200;


				var temp = new THREE.Particle(mat);
				temp.scale.x = temp.scale.y = 2;
        drawGeo.vertices.push(new THREE.Vector3());
        drawGeo.vertices.push(new THREE.Vector3());
        
				drawLine = new THREE.Line(drawGeo, new THREE.LineBasicMaterial({color: 0x77FF77}));
				drawLine.material.linewidth = 10;        
        
				// scene.add(line);
				// scene.add(x);
				// scene.add(y);
				// scene.add(z);
				// scene.add(temp);
				// scene.add(particle);
        //var planeW = 50; // pixels
				//var planeH = 50; // pixels 
				//var numW = 50; // how many wide (50*50 = 2500 pixels wide)
				//var numH = 50; // how many tall (50*50 = 2500 pixels tall)
				//var plane = new THREE.Mesh( new THREE.PlaneGeometry( planeW*50, planeH*50, planeW, planeH ), new   THREE.MeshBasicMaterial( 
        //{ color: 0xffffff, wireframe: true, wireframeLinewidth: 0.1} ) );
				//scene.add(plane);

				group.add(line);
				group.add(x);
				group.add(y);
				group.add(z);
				group.add(temp);
				group.add(particle);		
        drawGroup.add(drawLine);
				// group.rotation.y = Math.PI / 4;
				// // group.rotation.x = Math.PI / 4;		
				group.position.y = -100;
				scene.add(group);
        scene.add(drawGroup);
        
        
        var size = 100;
        var step = 10;
        
        var gridHelper = new THREE.GridHelper( size, step );
        
        gridHelper.position = new THREE.Vector3( 0, -100, 0 );
        gridHelper.rotation = new THREE.Euler( 0, 0, 0 );
        gridHelper.setColors(new THREE.Color(0xbbbbbb), new THREE.Color(0xbbbbbb));
        scene.add( gridHelper );
        
        var gridHelper = new THREE.GridHelper( size, step );
        
        gridHelper.position = new THREE.Vector3( 0, -100, 0 );
        gridHelper.rotation = new THREE.Euler( Math.PI / 2, 0, 0 );
        gridHelper.setColors(new THREE.Color(0x999999), new THREE.Color(0x999999));
        scene.add( gridHelper );
        
        var gridHelper = new THREE.GridHelper( size, step );
        
        gridHelper.position = new THREE.Vector3( 0, -100, 0 );
        gridHelper.rotation = new THREE.Euler( 0, 0, Math.PI / 2 );
        gridHelper.setColors(new THREE.Color(0x666666), new THREE.Color(0x666666));
        scene.add( gridHelper );        
        
        
        
				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );


				controls.update();

				renderer.render( scene, camera );

			}

    Handlebars.registerHelper('isMobile', function(){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); 
    });


  
  window.addEventListener("deviceorientation", function(){
    event.key = Session.get('mobKey');
    event.ctype = 'orient';
    event.mag = $("#magSlider").val();
    event.stopped = Session.get('stop');
    $('#magInt').text(event.mag);
    
    lastCoords = {alpha:event.alpha,beta:event.beta};
    if(count)//first time
    {
     count = false;
      relCoords = {alpha:-90 + event.alpha, beta:-90 + event.beta};
    }
      
    
    //lastCoords, relCoords
    
    event.ralpha = event.alpha - relCoords.alpha;
    event.rbeta = event.beta - relCoords.beta;
   
    //relative coords
    if(Session.get('stop') == 0)
      Session.set('stop', 1);    
    
    if(event.key != null)
        sendData(event);    
  }, true);
  
  
  Meteor.methods({
      'rotate':function(a,b,c,m){applyRotation(a,b,c,m)},
      'clear':function(){clearCanvas()}
  })
        
    
        
$(function(){
    sendData = function(message) {
    orientationStream.emit('message', message);
    // if(Session.get('allowMessage'))
    //console.log(message);
    };

  orientationStream.on('message', function(message) {
    // if(Session.get('allowMessage'))
    //console.log(message);
    if(Session.get('compKey') == message.key && message.ctype == 'orient')
    {
      parseEvent(message);
      console.log(message.mag);
    }
    else if(Session.get('compKey') == message.key && message.ctype == 'clear'){
      clearCanvas();
    }
    
    //console.log(message.ctype);
    console.log(message.mag);
    console.log('type above');
  });
})


Template.mobile.events = {
  'click #keyBut': function(){
     Session.set('mobKey', $('#keyInp').val().toUpperCase());
   }, 
   'click #clearBut': function(){
     sendData({ctype:'clear', key:Session.get('mobKey')});
   },
  'click #stopBut': function(){
    if(Session.get('stop') == -1)
     Session.set('stop', 0);
    else
      Session.set('stop', -1);

  },
  'click #magBut': function(){
    $('#magSlider').val(0);
  },
  'click #calBut': function(){
    relCoords.alpha = -90 + lastCoords.alpha;
    relCoords.beta = -90 + lastCoords.beta;
  }
    
}