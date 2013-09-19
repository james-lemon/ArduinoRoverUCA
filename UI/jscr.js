function generate(){
    a = document.getElementById('rows').value;
    b = document.getElementById('column').value;
    a = a-1+1;
    b = b-1+1;    
    m = new Array(a);

    for (var x = 0; x<a;x++){
        m[x] = new Array(b);
    }

    for (var i = 0; i < a; i++) {
        for (var j = 0; j < b; j++){
         m[i][j] = "1";  
        }
    }

    $('#drawSpace')[0].width=Math.max(b*scaleFactor,500);
    $('#drawSpace')[0].height=Math.max(a*scaleFactor,500);


    setToolBar();
    drawToolBar();
    draw();


}

function setToolBar(){
    clearToolBar();
    drawFuns = new Array(new Array(drawDefault,drawWall,drawVertWall),new Array(drawHoriWall,drawHori,drawVert),new Array(drawBotRight,drawTopLeft,drawTopRight),new Array(drawBotLeft,drawColumn,drawTopT),new Array(drawBottomT,drawLeftT,drawRightT),new Array(drawCross,drawRFID));
    loadedFunction = drawFuns[0][0];
    loadedFunctionId = "0";
}

function clearToolBar(){
    var canvas = document.getElementById('toolBar');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function drawToolBar(){
  var canvas = document.getElementById('toolBar');
  var l = canvas.width;
  var w = canvas.height;
  var la = scaleFactor;
  var wb = scaleFactor;
  
  if(canvas.getContext){

    var ctx = canvas.getContext("2d");

    canvas.addEventListener("click", toolBarClick);

    ctx.fillStyle="rgb(255,255,255)";
    ctx.fillRect(0,0,w,l);
    ctx.beginPath();

    for(var i = 0; i<6; i++){
      for(var j = 0; j<3; j++){
        
        ctx.strokeStyle="grey";
        ctx.lineWidth=(la/8);
        if(i*j!=10){
          var xloc=0;
          var yloc=(3*i)+j;
          if(i > 2){
            xloc = 2;
            yloc = 3*(i-3)+j;
          }
          drawFuns[i][j](xloc, yloc*1.5, wb/2, la/2, ctx);
        }
      }
    }
    ctx.stroke();

    for(var i = 0; i<6; i++){
      for(var j = 0; j<3; j++){
      
        if(i*j!=10){
          var xloc=0;
          var yloc=(3*i)+j;
          if(i > 2){
            xloc = 2;
            yloc = 3*(i-3)+j;
          }
          ctx.strokeStyle="black";
          ctx.lineWidth=1;
          ctx.strokeRect( (xloc*wb)/2, (yloc*la*1.5)/2, wb/2,la/2);
        }
      }
    }
  }
}

function draw(){

  var canvas = document.getElementById('drawSpace');
  var l = canvas.width;
  var w = canvas.height;
  var la = scaleFactor;
  var wb = scaleFactor;
  var arrayValue;
  var holdString;


  if(canvas.getContext) {

    var ctx = canvas.getContext("2d");

    canvas.addEventListener("click", mapClick);

    for(var i = 0; i < a; i++){

      for(var j = 0; j < b; j++){
        ctx.strokeRect(j*wb,i*la,wb,la);
        holdString = m[i][j];

        if(holdString.indexOf(";") == -1){
          arrayValue = (holdString-1)+1;
        }
        else{
          arrayValue = holdString.slice(0,holdString.indexOf(";"));
        }
          arrayValue = (arrayValue-1)+1;

        ctx.fillStyle="rgb(255,255,255)";
        ctx.fillRect(j*wb,i*la,wb,la);
        ctx.strokeStyle="grey";
        ctx.lineWidth=(la/4);
        ctx.beginPath();  

        drawFuns[Math.floor(arrayValue/3)][arrayValue%3](j, i, wb, la, ctx);

        ctx.stroke();
        ctx.lineWidth="1";
        ctx.strokeStyle="black";
        ctx.fillStyle="rgb(255,255,255)";

        ctx.strokeRect(j*wb,i*la,wb,la);
      }
    }
  }
}

function toolBarClick(event){
  var xCod = event.clientX;
  var yCod = event.clientY;
  canvas = document.getElementById('toolBar');
  var ctx = canvas.getContext("2d");
  var rect = canvas.getBoundingClientRect();
  xCod -= rect.left;
  yCod -= rect.top;

  var l = canvas.width;
  var w = canvas.heigth;
  var la = 67.5;
  var wb = 90;

  var yBox = yCod/la;
  var outside = yBox % 1;

  if( outside < .6815){

    var xBox = xCod/wb;
    outside = xBox % 1;
  
    if( outside < .5){

      yBox = Math.floor(yBox);
      xBox = Math.floor(xBox);

      if(yBox==8 && xBox==1){
        loadedFunction = drawFuns[0][0];
        loadedFunctionId = "0";
      }
      else{
        drawHighlight(yBox, xBox, 90, 90, ctx);
        loadedFunction = drawFuns[Math.floor((yBox+(xBox*9))/3)][(yBox+(xBox*9))%3]; 
        loadedFunctionId = (yBox+(xBox*9))+"";
      }
    }
  }
}

function mapClick(event){
  var xCod = event.clientX;
  var yCod = event.clientY;
  canvas = document.getElementById('drawSpace');
  var rect = canvas.getBoundingClientRect();
  xCod -= rect.left;
  yCod -= rect.top;
  change(xCod, yCod);

}

function change(x, y){

  var canvas = document.getElementById('drawSpace');
  var l = canvas.width, w = canvas.height, la = scaleFactor, wb = scaleFactor;

  var ctx = canvas.getContext("2d");

  var yBox = y/la;
  yBox = Math.floor(yBox);
  var xBox = x/wb;
  xBox = Math.floor(xBox);

  var initVal = m[yBox][xBox];


  var value=null;
  var value2=null;
  var value3=null;
  var hold1;
  var hold2;
  if(loadedFunctionId==2 || loadedFunctionId==3){

     if(initVal.indexOf(";")!=-1){
       if(initVal.slice(0, initVal.indexOf(";"))==2 || initVal.slice(0, initVal.indexOf(";"))==3){
         var holdInit = initVal.slice(initVal.indexOf(";")+1, initVal.length);
         hold1 = holdInit.slice(0, holdInit.indexOf(";"));
         hold2 = holdInit.slice(holdInit.indexOf(";")+1, holdInit.length);
    
       }
       else{
         hold1 = hold2 = 0;
       }
     }
     else{
       hold1 = hold2 = 0;
     }

     value2 = prompt("Enter the door RFID Value. Old value: "+hold1, hold1); 
     value3 = prompt("Enter the room number. Old value: "+hold2, hold2);
     value = loadedFunctionId+";"+value2+";"+value3;
  }
  else{
    if(loadedFunctionId==16){
      
     if(initVal.indexOf(";")!=-1){
       if(initVal.slice(0, initVal.indexOf(";"))==16){
         var holdInit = initVal.slice(initVal.indexOf(";")+1, initVal.length);
         hold1 = holdInit;      
       }
       else{
         hold1 = 0;
       }
     }
     else{
       hold1 = 0;
     }

       value2 = prompt("Enter the RFID value. Old value: "+hold1, hold1);
       value = loadedFunctionId+";"+value2;
    }
    else{
      value = loadedFunctionId+"";
    }
  }

  m[yBox][xBox] = value+"";
  draw();
}


function lock(){
    $.post("makeMapData.php", {myarray : m});
    $.post("makeMap.php", {myarray : m}, function(){ 
    isLock = 1;
    alert("done"); });
}

function resetMap(){
  for(var i = 0; i < a; i++){
    for(var j = 0; j < b; j++){
      m[i][j] = "1";
    }
  }
  draw();
}

function load(){
  var holder1;
  var holder2;
  var counter = 0;
  $.ajax({
    cache: false,
    url: 'http://localhost/Map/map_data.txt',
    success: function(data){
  
    while(data.length > 0){
    holder1 = data.slice(0,data.indexOf("."));
    data = data.slice(data.indexOf(".")+1, data.length);
    if(counter==0){
      a = holder1.slice(0,holder1.indexOf(","));
      b = holder1.slice(holder1.indexOf(",")+1, holder1.length);   
      m = new Array(a);
      $('#drawSpace')[0].width=Math.max(b*scaleFactor,500);
      $('#drawSpace')[0].height=Math.max(a*scaleFactor,500);

      for (var x = 0; x<a;x++){
        m[x] = new Array(b);
      }

      for (var i = 0; i < a; i++) {
        for (var j = 0; j < b; j++){
         m[i][j] = "0";  
        }
      }
    }
    else{
      var i = holder1.slice(0,holder1.indexOf(","));
      var j = holder1.slice(holder1.indexOf(",")+1, holder1.indexOf(":"));
      i = i-1+1;
      j = j-1+1;
      var value = holder1.slice(holder1.indexOf(":")+1, holder1.length);
      value = value.concat("");
      m[i][j] = value;
    }
    counter++;

    }
    setToolBar();
    drawToolBar();
    draw();  

    }

});

}

function drawVertWall(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j*wb)+(j*wb-((j-1)*wb))/2), ((i+1)*la), ((j*wb)+(j*wb-((j-1)*wb))/2), ((i*la)+(((i+1)*la)-(i*la))/1.5), ctx);
  drawLineSegment( ((j*wb)+(j*wb-((j-1)*wb))/2), (i*la), ((j*wb)+(j*wb-((j-1)*wb))/2), ((i*la)+(((i+1)*la)-(i*la))/3), ctx);
}

function drawHoriWall(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j+1)*wb), ((i*la)+(i*la-((i-1)*la))/2), ((j*wb)+(((j+1)*wb)-(j*wb))/1.5), ((i*la)+(i*la-((i-1)*la))/2), ctx);
  drawLineSegment( (j*wb), ((i*la)+(i*la-((i-1)*la))/2), ((j*wb)+(((j+1)*wb)-(j*wb))/3), ((i*la)+(i*la-((i-1)*la))/2), ctx);
}

function drawVert(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j*wb)+(j*wb-((j-1)*wb))/2), ((i+1)*la), ((j*wb)+(j*wb-((j-1)*wb))/2), (i*la), ctx);
}

function drawHori(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j+1)*wb), ((i*la)+(i*la-((i-1)*la))/2), (j*wb), ((i*la)+(i*la-((i-1)*la))/2), ctx);
}

function drawTopLeft(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j*wb)+(j*wb-((j-1)*wb))/2), (i*la), ((j*wb)+(((j+1)*wb)-(j*wb))/2), ((i*la)+ (i*la-((i-1)*la))/1.6), ctx);
  drawLineSegment( (j*wb), ((i*la)+(i*la-((i-1)*la))/2), ((j*wb)+(j*wb-((j-1)*wb))/1.6), ((i*la)+(((i+1)*la)-(i*la))/2), ctx);
}

function drawTopRight(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j*wb)+(j*wb-((j-1)*wb))/2), (i*la), ((j*wb)+(((j+1)*wb)-(j*wb))/2), ((i*la)+(i*la-((i-1)*la))/1.6), ctx);
  drawLineSegment( ((j+1)*wb), ((i*la)+(i*la-((i-1)*la))/2), (j*wb)+ ((j*wb-((j-1)*wb))/2.6), ((i*la)+(((i+1)*la)-(i*la))/2), ctx);
}

function drawBotLeft(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j*wb)+(j*wb-((j-1)*wb))/2), ((i+1)*la), ((j*wb)+(((j+1)*wb)-(j*wb))/2), ((i*la)+ (i*la-((i-1)*la))/2.6), ctx);
  drawLineSegment( (j*wb), ((i*la)+(i*la-((i-1)*la))/2), ((j*wb)+(j*wb-((j-1)*wb))/1.6), ((i*la)+(((i+1)*la)-(i*la))/2), ctx);
}

function drawBotRight(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j*wb)+(j*wb-((j-1)*wb))/2),((i+1)*la), ((j*wb)+(((j+1)*wb)-(j*wb))/2), ((i*la)+ (i*la-((i-1)*la))/2.6), ctx);
  drawLineSegment( ((j+1)*wb), ((i*la)+(i*la-((i-1)*la))/2), ((j*wb)+ (j*wb-((j-1)*wb))/2.6), ((i*la)+(((i+1)*la)-(i*la))/2), ctx);
}

function drawTopT(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j*wb)+(j*wb-((j-1)*wb))/2), (i*la), ((j*wb)+(((j+1)*wb)-(j*wb))/2), ((i*la)+ (i*la-((i-1)*la))/1.6), ctx);
  drawLineSegment( ((j+1)*wb), ((i*la)+(i*la-((i-1)*la))/2), (j*wb), ((i*la)+(i*la-((i-1)*la))/2), ctx);
}

function drawBottomT(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j+1)*wb), ((i*la)+(i*la-((i-1)*la))/2), (j*wb), ((i*la)+(i*la-((i-1)*la))/2), ctx);
  drawLineSegment( ((j*wb)+(j*wb-((j-1)*wb))/2),((i+1)*la), ((j*wb)+(((j+1)*wb)-(j*wb))/2), ((i*la)+ (i*la-((i-1)*la))/2.6), ctx);
}

function drawLeftT(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j*wb)+(j*wb-((j-1)*wb))/2), ((i+1)*la), ((j*wb)+(j*wb-((j-1)*wb))/2), (i*la), ctx);
  drawLineSegment( (j*wb), ((i*la)+(i*la-((i-1)*la))/2), ((j*wb)+(j*wb-((j-1)*wb))/1.6), ((i*la)+(((i+1)*la)-(i*la))/2), ctx);
}

function drawRightT(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j*wb)+(j*wb-((j-1)*wb))/2), ((i+1)*la), ((j*wb)+(j*wb-((j-1)*wb))/2), (i*la), ctx);
  drawLineSegment( ((j+1)*wb), ((i*la)+(i*la-((i-1)*la))/2), (j*wb)+ ((j*wb-((j-1)*wb))/2.6), ((i*la)+(((i+1)*la)-(i*la))/2), ctx);
}

function drawCross(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  drawLineSegment( ((j*wb)+(j*wb-((j-1)*wb))/2), ((i+1)*la), ((j*wb)+(j*wb-((j-1)*wb))/2), (i*la), ctx);
  drawLineSegment( ((j+1)*wb), ((i*la)+(i*la-((i-1)*la))/2), (j*wb), ((i*la)+(i*la-((i-1)*la))/2), ctx);
}

function drawDefault(j, i, wb, la, ctx){
  ctx.lineWidth=1;
  ctx.fillStyle="rgb(255,255,255)";
  ctx.strokeRect(j*wb,i*la,wb,la);
}

function drawWall(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  ctx.fillStyle="grey";
  ctx.fillRect(j*wb,i*la,wb,la);
}

function drawRFID(j, i, wb, la, ctx){
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  ctx.fillStyle="rgb(0,0,255)";
  ctx.globalAlpha=0.1;
  ctx.fillRect(j*wb,i*la,wb,la);
  ctx.globalAlpha=1;
}

function drawColumn(j, i, wb, la, ctx){
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(j*wb,i*la,wb,la);
  ctx.arc( ((j*wb)+(j*wb-((j-1)*wb))/2), ((i*la)+(i*la-((i-1)*la))/2), wb/2, 0, 2*Math.PI);
  ctx.fillStyle="grey";
  ctx.fill();

  ctx.beginPath();
}

function drawHighlight(j, i, wb, la, ctx){
          clearToolBar();
          drawToolBar();
          ctx.strokeStyle="blue";
          ctx.lineWidth=3;
          ctx.strokeRect( (i*wb*2)/2, (j*la*1.5)/2, wb/2,la/2);
          ctx.lineWidth=1;
}

function drawLineSegment(start_x, start_y, end_x, end_y, ctx){
  ctx.moveTo(start_x, start_y);
  ctx.lineTo(end_x, end_y);
}
