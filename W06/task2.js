function main()
{
    var width = 500;
    var height = 500;

    var scene_gouraud_lambertian = new THREE.Scene();
    var scene_gouraud_phong = new THREE.Scene();
    var scene_phong_lambertian = new THREE.Scene();
    var scene_phong_phong = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene_gouraud_lambertian.add( camera );
    scene_gouraud_phong.add( camera );
    scene_phong_lambertian.add( camera );
    scene_phong_phong.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene_gouraud_lambertian.add( light );
    scene_gouraud_phong.add( light );
    scene_phong_lambertian.add( light );
    scene_phong_phong.add( light );

    var canvas_gouraud = document.getElementById('canvas_gouraud');
    var renderer_gouraud_lambertian = new THREE.WebGLRenderer();
    var renderer_gouraud_phong = new THREE.WebGLRenderer();
    renderer_gouraud_lambertian.setSize( width, height );
    renderer_gouraud_phong.setSize( width, height );
    canvas_gouraud.appendChild(renderer_gouraud_lambertian.domElement);
    canvas_gouraud.appendChild(renderer_gouraud_phong.domElement);

    var canvas_phong = document.getElementById('canvas_phong');
    var renderer_phong_lambertian = new THREE.WebGLRenderer();
    var renderer_phong_phong = new THREE.WebGLRenderer();
    renderer_phong_lambertian.setSize( width, height );
    renderer_phong_phong.setSize( width, height );
    canvas_phong.appendChild(renderer_phong_lambertian.domElement);
    canvas_phong.appendChild(renderer_phong_phong.domElement);

    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var material_gouraud_lambertian = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('gouraud_lambertian.vert').text,
        fragmentShader: document.getElementById('gouraud_lambertian.frag').text,
        uniforms: {
          light_position: { type: 'v3', value: light.position }
        }
    });
    var material_gouraud_phong = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('gouraud_phong.vert').text,
        fragmentShader: document.getElementById('gouraud_phong.frag').text,
        uniforms: {
          light_position: { type: 'v3', value: light.position }
        }
    });

    var material_phong_lambertian = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('phong_lambertian.vert').text,
        fragmentShader: document.getElementById('phong_lambertian.frag').text,
        uniforms: {
          light_position: { type: 'v3', value: light.position }
        }
    });
    var material_phong_phong = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('phong_phong.vert').text,
        fragmentShader: document.getElementById('phong_phong.frag').text,
        uniforms: {
          light_position: { type: 'v3', value: light.position }
        }
    });

    var torus_knot_gouraud_lambertian = new THREE.Mesh( geometry, material_gouraud_lambertian );
    scene_gouraud_lambertian.add( torus_knot_gouraud_lambertian );
    var torus_knot_gouraud_phong = new THREE.Mesh( geometry, material_gouraud_phong );
    scene_gouraud_phong.add( torus_knot_gouraud_phong );

    var torus_knot_phong_lambertian = new THREE.Mesh( geometry, material_phong_lambertian );
    scene_phong_lambertian.add( torus_knot_phong_lambertian );
    var torus_knot_phong_phong = new THREE.Mesh( geometry, material_phong_phong );
    scene_phong_phong.add( torus_knot_phong_phong );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        torus_knot_gouraud_lambertian.rotation.x += 0.01;
        torus_knot_gouraud_lambertian.rotation.y += 0.01;
        torus_knot_gouraud_phong.rotation.x += 0.01;
        torus_knot_gouraud_phong.rotation.y += 0.01;
        torus_knot_phong_lambertian.rotation.x += 0.01;
        torus_knot_phong_lambertian.rotation.y += 0.01;
        torus_knot_phong_phong.rotation.x += 0.01;
        torus_knot_phong_phong.rotation.y += 0.01;
        renderer_gouraud_lambertian.render( scene_gouraud_lambertian, camera );
        renderer_gouraud_phong.render( scene_gouraud_phong, camera );
        renderer_phong_lambertian.render( scene_phong_lambertian, camera );
        renderer_phong_phong.render( scene_phong_phong, camera );
    }
}
