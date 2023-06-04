
MySample.main = (function() {
    'use strict';

    // step 2   
    let canvas = document.getElementById('canvas-main');
    let gl = canvas.getContext('webgl2');

    //step 3
    let vertices = new Float32Array([
        0.0,  0.5,  0.0, 
        -0.5, -0.5,  0.5, 
        0.5, -0.5,  0.5,

        // 0.0,  0.5,  0.0, 
        // -0.5, -0.5,  0.5, 
        // -0.5, -0.5, -0.5, 

        // 0.0,  0.5,  0.0, 
        // 0.5, -0.5,  0.5, 
        // 0.5, -0.5, -0.5, 

        // -0.5, -0.5,  0.5, 
        // 0.5, -0.5,  0.5, 
        // -0.5, -0.5, -0.5, 
    ]);
    let indices = new Uint16Array([ 
        0, 1, 2,
        0, 2, 3,
        1, 3, 2,
        0, 3, 1
        
    ]);
    let vertexColors = new Float32Array([
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0
    ]);
    let cubeVertices = [
        -0.5, -0.5,  0.5, 1.0,
        -0.5,  0.5,  0.5, 1.0,
        0.5,  0.5,  0.5, 1.0,
        0.5, -0.5,  0.5, 1.0,

        -0.5, -0.5, -0.5, 1.0,
        -0.5,  0.5, -0.5, 1.0,
        0.5,  0.5, -0.5, 1.0,
        0.5, -0.5, -0.5, 1.0,

        -0.5, -0.5, -0.5, 1.0,
        -0.5, -0.5,  0.5, 1.0,
        -0.5,  0.5,  0.5, 1.0,
        -0.5,  0.5, -0.5, 1.0,

        0.5, -0.5, -0.5, 1.0,
        0.5, -0.5,  0.5, 1.0,
        0.5,  0.5,  0.5, 1.0,
        0.5,  0.5, -0.5, 1.0,

        -0.5,  0.5, -0.5, 1.0,
        0.5,  0.5, -0.5, 1.0,
        0.5,  0.5,  0.5, 1.0,
        -0.5,  0.5,  0.5, 1.0,

        -0.5, -0.5, -0.5, 1.0,
        0.5, -0.5, -0.5, 1.0,
        0.5, -0.5,  0.5, 1.0,
        -0.5, -0.5,  0.5, 1.0,
    ];
    let cubeVertexColors = [
        1.0, 0.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        1.0, 0.0, 1.0, 1.0,
        0.0, 1.0, 1.0, 1.0 
    ];
    let cubeIndices = new Uint16Array([
        0, 1, 2,
        0, 2, 3,

        4, 5, 6,
        4, 6, 7,

        8, 9, 10,
        8, 10, 11,

        12, 13, 14,
        12, 14, 15,

        16, 17, 18,
        16, 18, 19,

        20, 21, 22,
        20, 22, 23
    ]);
    let octahedronVertices = [
        0.0, 1.0, 0.0, 
        1.0, 0.0, 0.0, 
        -1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 
        0.0, 0.0, -1.0,
        0.0, -1.0, 0.0 
      ];
    let colorVertices = [
        1.0, 0.0, 0.0, //red
        0.0, 1.0, 0.0, //green
        0.0, 0.0, 1.0, //blue
        1.0, 1.0, 0.0, //yellow
        0.0, 1.0, 1.0, //cyan
        1.0, 0.0, 1.0 //magenta
    ];
    let octahedronIndices = [
        0, 1, 3,  
        0, 3, 2, 
        0, 2, 4,
        0, 4, 1, 
        5, 3, 1,  
        5, 2, 3, 
        5, 4, 2,
        5, 1, 4  
    ];

    //step 4
    let vertexBuffer = gl.createBuffer();
    let vertexColorBuffer = gl.createBuffer();
    let indexBuffer = gl.createBuffer();
    function createBuffer(arr, buffer, c){
        gl.bindBuffer(arr, buffer);
        gl.bufferData(arr, c, gl.STATIC_DRAW);
        gl.bindBuffer(arr, null);
    }
    createBuffer(gl.ARRAY_BUFFER, vertexBuffer, new Float32Array(cubeVertices));
    createBuffer(gl.ARRAY_BUFFER, vertexColorBuffer, new Float32Array(cubeVertexColors));
    createBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer, new Uint16Array(cubeIndices));
    // createBuffer(gl.ARRAY_BUFFER, vertexBuffer, new Float32Array(vertices));
    // createBuffer(gl.ARRAY_BUFFER, vertexColorBuffer, new Float32Array(vertexColors));
    // createBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer, new Uint16Array(indices));

    //step 5
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    let vertexShaderSource = "#version 300 es\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjection;\nin vec4 aPosition;\nin vec4 aColor;\nout vec4 vColor;\nvoid main()\n{\ngl_Position = aPosition*uModelViewMatrix*uProjection;\nvColor = aColor;\n}"
    let fragmentShaderSource = "#version 300 es\nprecision lowp float;\nin vec4 vColor;\nout vec4 outColor;\nvoid main()\n{\noutColor = vColor;\n}"
    let shaderProgram = gl.createProgram();
    function createShader(shader, source){
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
    }
    createShader(vertexShader, vertexShaderSource);
    createShader(fragmentShader, fragmentShaderSource);
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    //step 6
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    let position = gl.getAttribLocation(shaderProgram, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, vertices.BYTES_PER_ELEMENT * 3, 0);
    gl.vertexAttribPointer(position, 4, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    let color = gl.getAttribLocation(shaderProgram, 'aColor');
    gl.enableVertexAttribArray(color);
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, vertexColors.BYTES_PER_ELEMENT * 3, 0);
    gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);

    //step 8
    gl.clearColor(
        0.3921568627450980392156862745098,
        0.58431372549019607843137254901961,
        0.92941176470588235294117647058824,
        1.0
    );
    gl.clearDepth(1.0);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.DEPTH_TEST);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //step 9
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0);
    let object = {
        center: {
          x: 1.0,
          y: 1.0,
          z: 1.0
        },
        transformation: {
            x: 0.5,
            y: 0.5,
            z: 0.5
        }
      };
      
      

    //WebGL Uniform Parameters

    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------
    
    let bool = true;
    function update() {
        if(bool){
            if(object.transformation.x <= 1.0 || object.transformation.y <= 1.0){
                object.transformation.x += .01;
                object.transformation.y += .01;
                object.transformation.z += .01;
            }
            else{
                bool = false
            }

        }else{
            if(object.transformation.x >= -1.0 || object.transformation.y >= -1.0){
                object.transformation.x -= .01;
                object.transformation.y -= .01;
                object.transformation.z -= .01;
            }else{
                bool = true;
            }
        }
    }

    //------------------------------------------------------------------
    //
    // Rendering code goes here
    //
    //------------------------------------------------------------------
    function render() {
        let scalingMatrix = [
            object.center.x * object.transformation.x, 0, 0, 0,
            0, object.center.y * object.transformation.y, 0,0,
            0, 0, object.center.z * object.transformation.z, 0,
            0, 0, 0, 1
          ];
        let translationMatrix = [
            object.center.x, 0, 0, object.transformation.x,
            0, object.center.y, 0, object.transformation.y,
            0, 0, object.center.z, 0, object.transformation.z,
            0, 0, 0, 1
        ]
        let rotationMatrix = [
            object.transformation.x / (Math.sqrt(object.transformation.x**2 * object.transformation.z**2)), 0, object.transformation.z / (Math.sqrt(object.transformation.x**2 * object.transformation.z**2)), 0,
            0, 1, 0, 0,
            -object.transformation.z / (Math.sqrt(object.transformation.x**2 * object.transformation.z**2)), 0, object.transformation.x / (Math.sqrt(object.transformation.x**2 * object.transformation.z**2)), 0,
            0, 0, 0, 1
        ]
        let left = -1.0;
        let right = 1.0;
        let bottom = -1.0;
        let top = 1.0;
        let near = -1.0;
        let far = 1.0;
        let projectionMatrix = [
            2.0 / (right - left), 0, 0, -(right + left) / (right - left),
            0, 2.0 / (top - bottom), 0, -(top + bottom) / (top - bottom),
            0, 0, -2.0 / (far - near), -(far + near) / (far - near),
            0, 0, 0, 1
        ];
        let uProjectionLocation = gl.getUniformLocation(shaderProgram, 'uProjection');
        gl.uniformMatrix4fv(uProjectionLocation, false, projectionMatrix);
        let uThingLocation = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
        gl.uniformMatrix4fv(uThingLocation, false, rotationMatrix);
        gl.clearColor(
            0.3921568627450980392156862745098,
            0.58431372549019607843137254901961,
            0.92941176470588235294117647058824,
            1.0
        );
        gl.clearDepth(1.0);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //step 9
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    }

    //------------------------------------------------------------------
    //
    // This is the animation loop.
    //
    //------------------------------------------------------------------
    function animationLoop(time) {

        update();
        let modelViewMatrix = [
            1, 0, 0, object.transformation.x,
            0, 1, 0, object.transformation.y,
            0, 0, 1, object.transformation.z,
            0, 0, 0, 1
        ];
    
        let uModelViewLocation = gl.getUniformLocation(shaderProgram, 'uModelView');
        gl.uniformMatrix4fv(uModelViewLocation, false, modelViewMatrix);
        render();

        requestAnimationFrame(animationLoop);
    }

    console.log('initializing...');
    requestAnimationFrame(animationLoop);

}());
