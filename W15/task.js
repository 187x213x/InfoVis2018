function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth,
        height: window.innerHeight,
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var isovalue = document.getElementById('isovalue_range').value;
    var surfaces = Isosurfaces( volume, isovalue );
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });

    screen.loop();
    

    var isovalue_range = document.getElementById('isovalue_range');
    var isovalue_num = document.getElementById('isovalue');
    isovalue_num.value = isovalue_range.value;
    
    isovalue_range.addEventListener('input', function(){
        isovalue_num.value = this.value;

        screen.scene.remove(surfaces);
        surfaces.geometry.dispose();
        surfaces.material.dispose();
        isovalue = this.value;
        surfaces = Isosurfaces( volume, isovalue );
        screen.scene.add( surfaces );
    });

    isovalue_num.addEventListener("input", function(){
        isovalue_range.value = this.value;
        isovalue_range.dispatchEvent(new Event("input"));
    });

    var plane_range = document.getElementById('plane_range').getElementsByTagName('input');
    var plane_range_array = Array.from(plane_range);
    var plane_range0 = document.getElementById('plane_range0');
    var plane_num = document.getElementById('plane');
    plane_num.value = plane_range0.value;

    var point = new THREE.Vector3(60,60,5);
    document.getElementById('plane_checkbox').addEventListener("input", function()
    {
        if(this.checked){
            isovalue_range.disabled = true;
            isovalue_num.disabled = true;
            plane_range0.disabled = false;
            plane_num.disabled = false;
            plane_range_array.forEach(function(value){
                value.disabled = false;
            });
            screen.scene.remove(surfaces);
            surfaces.geometry.dispose();
            surfaces.material.dispose();
            var normal = new THREE.Vector3(plane_range_array[0].value, plane_range_array[1].value, plane_range_array[2].value);
            surfaces = Isosurfaces_plane( volume, point , normal );
            screen.scene.add( surfaces );
        } else {
            isovalue_range.disabled = false;
            isovalue_num.disabled =false;
            plane_range0.disabled = true;
            plane_num.disabled = true;
            plane_range_array.forEach(function(value){
                value.disabled = true;
            });
            screen.scene.remove(surfaces);
            surfaces.geometry.dispose();
            surfaces.material.dispose();
            isovalue = document.getElementById('isovalue_range').value;
            surfaces = Isosurfaces( volume, isovalue );
            screen.scene.add( surfaces );
        }
    });

    plane_range0.addEventListener("input", function() {
        plane_num.value = this.value;

        screen.scene.remove(surfaces);
        surfaces.geometry.dispose();
        surfaces.material.dispose();
        point = new THREE.Vector3(120*this.value/this.max,120*this.value/this.max,34*this.value/this.max);
        var normal = new THREE.Vector3(plane_range_array[0].value, plane_range_array[1].value, plane_range_array[2].value);
        surfaces = Isosurfaces_plane( volume, point , normal );
        screen.scene.add( surfaces );
    });

    plane_num.addEventListener("input", function(){
        plane_range0.value = this.value;
        plane_range0.dispatchEvent(new Event("input"));
    });

    plane_range_array.forEach(function(value){
        value.addEventListener("input", function(){
            screen.scene.remove(surfaces);
            surfaces.geometry.dispose();
            surfaces.material.dispose();
            var normal = new THREE.Vector3(plane_range_array[0].value, plane_range_array[1].value, plane_range_array[2].value);
            surfaces = Isosurfaces_plane( volume, point , normal );
            screen.scene.add( surfaces );
        });
    });    
}
