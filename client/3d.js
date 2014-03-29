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
	var mag = 100;
	var line;
	var group;

    Handlebars.registerHelper('makeKey', function(){
       
       var x = Math.random().toString(36).substring(10).toUpperCase(); 
       Session.set('compKey', x);
       return Session.get('compKey');
        
    });

    $(function(){
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        {
            Session.set('mobKey', null);
            return;
        }
        console.log('potato');
      init();
	  animate();  
	  Session.set('allowMessage', false);
	  console.log(scene);
	  eval(scene);
    })
            
            function parseEvent(e){
                if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
                    return;
                applyRotation(e.alpha * Math.PI / 180, e.beta * Math.PI / 180, /*e.gamma * Math.PI / 180*/0);
            }

			function applyRotation(a,b,c){//ret is the actual Vector3
				// var x = new Date().getTime();
				var ret = new THREE.Vector3(mag, 0, 0);
				ret.applyEuler(new THREE.Euler(c,a,b,'XYZ'));
				line.geometry.vertices[1] = ret;
				particle.position = line.geometry.vertices[1];
				console.log(ret);
				// console.log("â–³T: " + (new Date().getTime() - x));
				// console.log(ret);
				// return ret;
				
				return ret;
				
			}



		  //  addEventListener("deviceorientation", function(event){
		  //  	applyRotation(event.alpha * Math.PI / 180, event.beta * Math.PI / 180, event.gamma * Math.PI / 180);
		  //  	for(var i in event)
		  //  		if("alphabetagamma".indexOf(i) > -1)
		  //  			document.getElementById(i).value = Math.round(event[i] * 100) / 100;
		  //  });


			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );



				renderer = new THREE.CanvasRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				// scene.rotation
				camera.position = new THREE.Vector3(0, 0, 400);



				// controls = new THREE.TrackballControls( camera );				

            
				scene = new THREE.Scene();
				group = new THREE.Object3D();
				window.scene = scene;


				var mat = new THREE.ParticleCanvasMaterial( {

					color: 0xffffff,
					program: function ( context ) {

						context.beginPath();
						context.arc( 0, 0, 1, 0, PI2, true );
						context.fill();

					}

				} );

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

				line.material.linewidth = 5;



				particle = new THREE.Particle(mat);
				particle.scale.x = particle.scale.y = 10;
				particle.position.x = mag;

				particle.position = line.geometry.vertices[1];



				var x = new THREE.Particle(matG);
				x.position.x = 200;

				var y = new THREE.Particle(matG);
				y.position.y = 200;
				

				var z = new THREE.Particle(matG);
				z.position.z = 200;


				var temp = new THREE.Particle(mat);
				temp.scale.x = temp.scale.y = 10;


				// scene.add(line);
				// scene.add(x);
				// scene.add(y);
				// scene.add(z);
				// scene.add(temp);
				// scene.add(particle);


				group.add(line);
				group.add(x);
				group.add(y);
				group.add(z);
				group.add(temp);
				group.add(particle);		
				// group.rotation.y = Math.PI / 4;
				// // group.rotation.x = Math.PI / 4;		
				group.position.y = -100;
				scene.add(group);

				



				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );


				// controls.update();

				renderer.render( scene, camera );

			}







    Handlebars.registerHelper('isMobile', function(){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); 
    });


  
  window.addEventListener("deviceorientation", function(){
    event.key = Session.get('mobKey');
    if(event.key != null)
        sendData(event);
    
  }, true);
  
  
  Meteor.methods({
      'rotate':function(a,b,c){applyRotation(a,b,c)}
      
  })
        
    
        
$(function(){
    sendData = function(message) {
    orientationStream.emit('message', message);
    // if(Session.get('allowMessage'))
    console.log(message);
    };

  orientationStream.on('message', function(message) {
    // if(Session.get('allowMessage'))
    console.log(message);
    if(Session.get('compKey') == Session.get('mobKey'))
    parseEvent(message);
  });
})