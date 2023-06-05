
MySample.main = (function() {
    'use strict';

    // step 2   
    let canvas = document.getElementById('canvas-main');
    let gl = canvas.getContext('webgl2');

    //step 3
    let vertices = new Float32Array([
        -0.5, 0.0, 0.5, 1.0,
        0.0, 0.0, 0.0, 1.0,
        0.0, 0.5, 0.5, 1.0,

        0.0, 0.0, 0.0, 1.0,
        0.5, 0.0, 0.5, 1.0,
        0.0, 0.5, 0.5, 1.0,

        0.5, 0.0, 0.5, 1.0,
        -0.5, 0.0, 0.5, 1.0,
        0.0, 0.5, 0.5, 1.0,

        0.0, 0.0, 0.0, 1.0,
        -0.5, 0.0, 0.5, 1.0,
        0.5, 0.0, 0.5, 1.0,
       
    ]);
    let indices = new Uint16Array([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
       
    ]);
    let vertexColors = new Float32Array([
        1.0, 0.0, 0.0,
        0.0, 0.0, 4.0,
        0.0, 2.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 0.0, 1.0,
        0.0, 0.5, 0.5,
        
    ]);
    let cubeVertices = new Float32Array([
        0.5, 0.5, 0.0, 1.0,
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0,
        0.5, 0.5, 0.0, 1.0, //End of Front face
        0.5, 0.5, 1.0, 1.0,
        -0.5, 0.5, 1.0, 1.0,
        -0.5, -0.5, 1.0, 1.0,
        -0.5, -0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 1.0,
        0.5, 0.5, 1.0, 1.0, // End of Back face
        0.5, 0.5, 1.0, 1.0,
        0.5, 0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, 1.0, 1.0,
        0.5, 0.5, 1.0, 1.0, // End of right face
        -0.5, 0.5, 1.0, 1.0,
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        -0.5, -0.5, 1.0, 1.0,
        -0.5, 0.5, 1.0, 1.0, // End of Left face
        -0.5, 0.5, 0.0, 1.0,
        -0.5, 0.5, 1.0, 1.0,
        0.5, 0.5, 1.0, 1.0,
        -0.5, 0.5, 0.0, 1.0,
        0.5, 0.5, 0.0, 1.0,
        0.5, 0.5, 1.0, 1.0, // End of top face
        -0.5, -0.5, 0.0, 1.0,
        -0.5, -0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, 1.0, 1.0,
    ])
    let cubeIndices = new Uint16Array([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
    ]);
    let cubeColors = new Float32Array([
        1.0, 0.0, 0.0,
        0.0, 0.0, 4.0,
        0.0, 2.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 0.0, 1.0,
        0.0, 0.5, 0.5
    ]);
    let octahedronVertices = new Float32Array([
        0.0, 0.0, 0.0, 1.0,
        0.5, 0.0, 0.5, 1.0,
        0.0, 0.5, 0.5, 1.0,

        0.0, 0.0, 0.0, 1.0,
        0.0, 0.5, 0.5, 1.0,
        -0.5, 0.0, 0.5, 1.0,

        0.5, 0.0, 0.5, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.5, 0.5, 1.0,

        0.0, 0.0, 1.0, 1.0,
        -0.5, 0.0, 0.5, 1.0,
        0.0, 0.5, 0.5, 1.0,

        0.0, 0.0, 0.0, 1.0,
        0.0, -0.5, 0.5, 1.0,
        0.5, 0.0, 0.5, 1.0,

        0.0, 0.0, 0.0, 1.0,
        -0.5, 0.0, 0.5, 1.0,
        0.0, -0.5, 0.5, 1.0,
        
        0.0, 0.0, 1.0, 1.0,
        -0.5, 0.0, 0.5, 1.0,
        0.0, -0.5, 0.5, 1.0,

        0.0, 0.0, 1.0, 1.0,
        0.5, 0.0, 0.5, 1.0,
        0.0, -0.5, 0.5, 1.0
    ]);
    let octahedronIndices = new Uint16Array([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
    ]);
    let octahedronColors = new Float32Array([
        1.0, 0.0, 0.0,
        0.0, 0.0, 4.0,
        0.0, 2.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 0.0, 1.0,
        0.0, 0.5, 0.5,
        1.0, 0.0, 0.0,
        0.0, 0.0, 4.0,
        0.0, 2.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 0.0, 1.0,
        0.0, 0.5, 0.5,
        1.0, 0.0, 0.0,
        0.0, 0.0, 4.0,
        0.0, 2.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 0.0, 1.0,
        0.0, 0.5, 0.5
    ]);

    //step 4
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, octahedronVertices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    let vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, octahedronColors, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, octahedronIndices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    

    //step 5
    let right = 1;
    let left = -1;
    let top = 1;
    let bottom = -1;
    let near = 1;
    let far = -1;
    let object = {
        center: {
            x: 0,
            y: 0, 
            z: 0
        }
    }
    let matTranslate = [
        1, 0, 0, object.center.x,
        0, 1, 0, object.center.y,
        0, 0, 1, object.center.z,
        0, 0, 0, 1
    ];
    let vertexShaderSource = `#version 300 es
    in vec4 aPosition;
    in vec4 aColor;
    out vec4 vColor;
    void main()
    {
    gl_Position = aPosition;
    vColor = aColor;
    }`;
    let fragmentShaderSource = `#version 300 es
    precision lowp float;
    in vec4 vColor;
    out vec4 outColor;
    void main()
    {
    outColor = vColor;
    }`;
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    console.log(gl.getShaderInfoLog(vertexShader)); // for debugging
    
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    
    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    let location = gl.getUniformLocation(shaderProgram, 'uThing');
    gl.uniformMatrix4fv(location, false, transposeMatrix4x4(matTranslate));
    
    //step 6
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    let position = gl.getAttribLocation(shaderProgram, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 4, gl.FLOAT, false, octahedronVertices.BYTES_PER_ELEMENT * 4, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    let color = gl.getAttribLocation(shaderProgram, 'aColor');
    gl.enableVertexAttribArray(color);
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, octahedronColors.BYTES_PER_ELEMENT * 3, 0);
    
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
        gl.drawElements(gl.TRIANGLES, octahedronIndices.length, gl.UNSIGNED_SHORT, 0);
        
        let angle = 0;
        const rotationSpeed = .01;

        
        let T = [
            1, 0, 0, -((left + right) / (right - left)),
            0, 1, 0, -((top + bottom) / (top - bottom)),
            0, 0, 1, -((far + near) / (far - near)),
            0, 0, 0, 1
        ];
        let S = [
            2 / (right - left), 0, 0, 0,
            0, 2 / (top - bottom), 0, 0,
            0, 0, -(2 / (far - near)), 0,
            0, 0, 0, 1
        ];
        let projection = S * T;
        let mView = []

    //WebGL Uniform Parameters

    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------
    
    function update() {
        angle += rotationSpeed;
    }

    //------------------------------------------------------------------
    //
    // Rendering code goes here
    //
    //------------------------------------------------------------------
    function render() {
        
    }

    //------------------------------------------------------------------
    //
    // This is the animation loop.
    //
    //------------------------------------------------------------------
    function animationLoop(time) {

        update();
        render();

        requestAnimationFrame(animationLoop);
    }

    console.log('initializing...');
    requestAnimationFrame(animationLoop);

}());
