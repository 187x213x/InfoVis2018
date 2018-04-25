function main()
{
    var width = 500;
    var height = 500;

    var scene1 = new THREE.Scene();
    var scene2 = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene1.add( camera );
    scene2.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene1.add( light );
    scene2.add( light );

    var renderer_lambertian = new THREE.WebGLRenderer();
    renderer_lambertian.setSize( width, height );
    document.body.appendChild( renderer_lambertian.domElement );

    var renderer_phong = new THREE.WebGLRenderer();
    renderer_phong.setSize( width, height );
    document.body.appendChild( renderer_phong.domElement );

    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var material_lambertian = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('lambertian.vert').text,
        fragmentShader: document.getElementById('lambertian.frag').text,
        uniforms: {
          light_position: { type: 'v3', value: light.position }
        }
    });

    var material_phong = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('phong.vert').text,
        fragmentShader: document.getElementById('phong.frag').text,
        uniforms: {
          light_position: { type: 'v3', value: light.position }
        }
    });

    var torus_knot_lambertian = new THREE.Mesh( geometry, material_lambertian );
    scene1.add( torus_knot_lambertian );

    var torus_knot_phong = new THREE.Mesh( geometry, material_phong );
    scene2.add( torus_knot_phong );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        torus_knot_lambertian.rotation.x += 0.01;
        torus_knot_lambertian.rotation.y += 0.01;
        torus_knot_phong.rotation.x += 0.01;
        torus_knot_phong.rotation.y += 0.01;
        renderer_lambertian.render( scene1, camera );
        renderer_phong.render( scene2, camera );
    }
}
