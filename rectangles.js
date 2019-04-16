// color the rectangle and move them randomlyi
// Today's goal :
//   - rectangles randomly are colored when the color button is clicked
//   - when the select is changed the number of rectangles changes to match it

// in the next class we will make the move function work 

// here is a road map of the functions you need to implement.

(function() {
	"use strict";

	window.onload = function() {
		var colorButton = document.getElementById("color");
		colorButton.onclick = colorIt;

		var moveButton = document.getElementById("move");
		moveButton.onclick = moveIt;

		var numSelect = document.getElementById("count");
		numSelect.onchange = createRectangles;

		createRectangles();
		colorIt();
		moveIt();
	};

	// creates the number of rectangles specified in the select.
	function createRectangles() { 
		var count = document.getElementById("count").value;
        let rectangle = document.createElement('div');
        let container = document.getElementById("rectanglearea");
        rectangle.className = "rectangle";
        
        
        if (count == 1) {
            document.getElementById("rectanglearea").innerHTML = ""; //clears box
            //console.warn("1");
            container.appendChild(rectangle);
            colorIt();
            
        } else if (count == 50) {
            //console.warn("50");
            document.getElementById("rectanglearea").innerHTML = ""; //clears box
            for (let i = 0; i< 50; i++) {
                //console.warn(i);
                let rectangle = document.createElement('div');
                rectangle.className = "rectangle";
                container.appendChild(rectangle);
                colorIt();
            }
            
        } else if (count == 100) {
            //console.warn("1");
            document.getElementById("rectanglearea").innerHTML = ""; //clears box
            for (let i = 0; i< 100; i++) {
                //console.warn(i);
                let rectangle = document.createElement('div');
                rectangle.className = "rectangle";
                container.appendChild(rectangle);
                colorIt();
            }
            
        }
        
	}
        

   	// Randomly color all of the rectangles
    function colorIt() {
      
        let rects = document.querySelectorAll(".rectangle"); //color all rects
        
        //console.warn(rects.length);
        for (let i = 0; i < rects.length; i++) {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            rects[i].style.backgroundColor = "rgba("+r+","+g+","+b+",0.7)"; 
            
        }
        
    	// your code goes here
    	//you might find the following code snippts useful
    	//var r = Math.floor(Math.random() * 256);
    }

    // // WARNING: incomplete
	// Randomly position all the rectangles
	function moveIt() {
		//console.warn("move");
        var rects = document.querySelectorAll("#rectanglearea .rectangle");
		var area = document.getElementById("rectanglearea");
        
		for(var i = 0; i < rects.length; i++) {
	        //console.warn(i);
            let left = Math.floor(Math.random() * (700-50)); //I can't figure out how to do this other than set pos of rect to absolute then manually look at the px size of the rectanglearea and accounting for rect size itself.
            let bottom = Math.floor(Math.random() * (500-50));
            
            //console.warn(left);
            //console.warn(bottom);
            rects[i].style.position = "absolute";
            rects[i].style.left = left+"px";
            rects[i].style.bottom = bottom+"px";
           
		}
        //drag ball
        area.onmousedown = dragIt;
        area.ondragstart = function() {
            return false;
        }
        
        
	}
    
    function dragIt(event){
        var area = document.getElementById("rectanglearea");
        //get object based on mouse coordinates
        var mouseX = event.clientX; 
        var mouseY = event.clientY;
        let movedObject = document.elementFromPoint(mouseX,mouseY);
        //console.warn(mouseX + " " + mouseY);  
        //console.warn(movedObject.className);
        
        var delObject = document.getElementById("count").value;
       
        //I can't figure out why the release is so strange
        if (movedObject.className == "rectangle"){
            
            if(delObject == "Delete") {
                movedObject.parentNode.removeChild(movedObject);
                return;
            }
            
            //console.warn("true");
            let shiftX = event.clientX - movedObject.getBoundingClientRect().left;
            let shiftY = event.clientY - movedObject.getBoundingClientRect().top;
        
            movedObject.style.position = 'absolute';
            movedObject.style.zIndex = 1000;
            document.body.append(movedObject);
        
            moveAt(event.pageX, event.pageY);
        
            function moveAt(pageX, pageY) {
                movedObject.style.left = pageX - shiftX + 'px';
                movedObject.style.top = pageY - shiftY + 'px';
            }
        
            function onMouseMove(event) {
            moveAt(event.pageX, event.pageY); 
            }
        
            document.addEventListener('mousemove', onMouseMove);
        
            movedObject.onmouseup = function(){
                document.removeEventListener('mousemove', onMouseMove);
                area.append(movedObject);
                movedObject.onmouseup = null;
            
            
            }
        }
        
        
        
            
        
    }



})();