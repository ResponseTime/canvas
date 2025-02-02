function renderCanvas() {
  const canvas = document.getElementById("canvas")
  const cropper = document.getElementById("cropper")
  const cropBtn = document.getElementById("cropBtn")
  // const canvas_shapes = document.getElementById("canvas_shapes")
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.src = "https://placehold.co/500x500?text=image-test"
    let cropperBoundingRect = cropper.getBoundingClientRect()
    const p1 = {
      name: "point1",
      x: cropperBoundingRect.left,
      y: cropperBoundingRect.top,
      initialHeight: cropperBoundingRect.height,
      initialWidth: cropperBoundingRect.width,
      initX: 0,
      initY: 0
    };

    const p2 = {
      name: "point2",
      x: cropperBoundingRect.right,
      y: cropperBoundingRect.top,
      initialHeight: cropperBoundingRect.height,
      initialWidth: cropperBoundingRect.width,
      initX: 0,
      initY: 0
    };

    const p3 = {
      name: "point3",
      x: cropperBoundingRect.left,
      y: cropperBoundingRect.bottom,
      initialHeight: cropperBoundingRect.height,
      initialWidth: cropperBoundingRect.width,
      initX: 0,
      initY: 0
    };

    const p4 = {
      name: "point4",
      x: cropperBoundingRect.right,
      y: cropperBoundingRect.bottom,
      initialHeight: cropperBoundingRect.height,
      initialWidth: cropperBoundingRect.width,
      initX: 0,
      initY: 0
    };

    const threshold = 10;
    let isResizing = {
      resizing: false,
      point: ""
    }
    document.addEventListener("mousedown", (e) => {
      if ((e.pageX - p1.x) ** 2 + (e.pageY - p1.y) ** 2 <= threshold ** 2) {
        console.log("Clicked on p1 (Top-Left)", p1);
        p1.initX = e.pageX
        p1.initY = e.pageY
        p1.initialWidth = parseFloat(cropper.style.width) || cropperBoundingRect.width;
        p1.initialHeight = parseFloat(cropper.style.height) || cropperBoundingRect.height;
        isResizing.resizing = true
        isResizing.point = p1
      }
      if ((e.pageX - p2.x) ** 2 + (e.pageY - p2.y) ** 2 <= threshold ** 2) {
        console.log("Clicked on p2 (Top-Right)", p2);
        p2.initX = e.pageX
        p2.initY = e.pageY
        p2.initialWidth = parseFloat(cropper.style.width) || cropperBoundingRect.width;
        p2.initialHeight = parseFloat(cropper.style.height) || cropperBoundingRect.height;
        isResizing.resizing = true
        isResizing.point = p2
      }
      if ((e.pageX - p3.x) ** 2 + (e.pageY - p3.y) ** 2 <= threshold ** 2) {
        console.log("Clicked on p3 (Bottom-Left)", p3);
        p3.initX = e.pageX
        p3.initY = e.pageY
        p3.initialWidth = parseFloat(cropper.style.width) || cropperBoundingRect.width;
        p3.initialHeight = parseFloat(cropper.style.height) || cropperBoundingRect.height;
        isResizing.resizing = true
        isResizing.point = p3
      }
      if ((e.pageX - p4.x) ** 2 + (e.pageY - p4.y) ** 2 <= threshold ** 2) {
        console.log("Clicked on p4 (Bottom-Right)", p4);
        p4.initX = e.pageX
        p4.initY = e.pageY
        p4.initialWidth = parseFloat(cropper.style.width) || cropperBoundingRect.width;
        p4.initialHeight = parseFloat(cropper.style.height) || cropperBoundingRect.height;
        isResizing.resizing = true
        isResizing.point = p4
      }
    })
    let lastExecution = 0;
    function resize(e) {
      if (isResizing.resizing) {
        switch (isResizing.point.name) {
          case "point1":
            newTop = isResizing.point.initY + (e.pageY - isResizing.point.initY)
            newLeft = isResizing.point.initX + (e.pageX - isResizing.point.initX)
            newHeight = isResizing.point.initialHeight + (isResizing.point.initY - e.pageY)
            newWidth = isResizing.point.initialWidth + (isResizing.point.initX - e.pageX);
            cropper.style.top = newTop + "px"
            cropper.style.left = newLeft + "px"
            cropper.style.width = newWidth + "px";
            cropper.style.height = newHeight + "px"
            break
          case "point2":
            newTop = isResizing.point.initY + (e.pageY - isResizing.point.initY)
            newWidth = isResizing.point.initialWidth + (e.pageX - isResizing.point.initX);
            newHeight = isResizing.point.initialHeight + (isResizing.point.initY - e.pageY)
            cropper.style.top = newTop + "px"
            cropper.style.width = newWidth + "px";
            cropper.style.height = newHeight + "px"
            break
          case "point3":
            newLeft = isResizing.point.initX + (e.pageX - isResizing.point.initX)
            newHeight = isResizing.point.initialHeight + (e.pageY - isResizing.point.initY);
            newWidth = isResizing.point.initialWidth + (isResizing.point.initX - e.pageX);
            cropper.style.left = newLeft + "px"
            cropper.style.width = newWidth + "px"
            cropper.style.height = newHeight + "px";
            break
          case "point4":
            newWidth = isResizing.point.initialWidth + (e.pageX - isResizing.point.initX);
            newHeight = isResizing.point.initialHeight + (e.pageY - isResizing.point.initY);
            cropper.style.width = newWidth + "px";
            cropper.style.height = newHeight + "px";
            break
        }
        let FPS_CAP = Math.floor(1000 / 60); //~60FPS
        if (Date.now() - lastExecution < FPS_CAP) return;
        lastExecution = Date.now();
        ctx.clearRect(0, 0, 600, 600)
        ctx.drawImage(image, cropper.getBoundingClientRect().left - canvasBoundingRect.left, cropper.getBoundingClientRect().top - canvasBoundingRect.top, cropper.getBoundingClientRect().width, cropper.getBoundingClientRect().height)
      }
    }

    document.addEventListener("mousemove", (e) => {
      if (e.pageX <= 0 || e.pageY >= 600 || e.pageX >= 600 || e.pageY <= 0) {
        console.log("boundary reached")
        return
      } else {
        resize(e)
      }
    })
    document.addEventListener("mouseup", (e) => {
      if (isResizing.resizing) {
        isResizing.resizing = false
        cropperBoundingRect = cropper.getBoundingClientRect()
        p1.x = cropperBoundingRect.left
        p1.y = cropperBoundingRect.top

        p2.x = cropperBoundingRect.right
        p2.y = cropperBoundingRect.top

        p3.x = cropperBoundingRect.left
        p3.y = cropperBoundingRect.bottom

        p4.x = cropperBoundingRect.right
        p4.y = cropperBoundingRect.bottom

      }
    })
    cropBtn.addEventListener("click", () => {
      ctx.clearRect(0, 0, 600, 600)
      ctx.beginPath();
      ctx.rect(cropperBoundingRect.left - canvasBoundingRect.left, cropperBoundingRect.top - canvasBoundingRect.top, cropperBoundingRect.width, cropperBoundingRect.height)
      ctx.clip()
      // ctx.drawImage(image, cropperBoundingRect.left - canvasBoundingRect.left, cropperBoundingRect.top - canvasBoundingRect.top, cropperBoundingRect.width, cropperBoundingRect.height, cropperBoundingRect.left - canvasBoundingRect.left, cropperBoundingRect.top - canvasBoundingRect.top, cropperBoundingRect.width, cropperBoundingRect.height)
      ctx.drawImage(image, 0, 0)
      const imageData = ctx.getImageData(0, 0, 600, 600)
      console.log(imageData)
    })
    const canvasBoundingRect = canvas.getBoundingClientRect()
    image.onload = () => {
      ctx.drawImage(image, 50, 50)
      // ctx.drawImage(image, cropperBoundingRect.left - canvasBoundingRect.left, cropperBoundingRect.top - canvasBoundingRect.top, cropperBoundingRect.width, cropperBoundingRect.height, cropperBoundingRect.left - canvasBoundingRect.left, cropperBoundingRect.top - canvasBoundingRect.top, cropperBoundingRect.width, cropperBoundingRect.height)
    }
    // ctx.beginPath()
    // ctx.arc(500, 225, 50, 0, 2 * Math.PI)
    // ctx.fillStyle = "white"
    // ctx.fill()
    // ctx.beginPath()
    // const circle = {
    //   x: 50,
    //   y: 50,
    //   radius: 50,
    //   color: 'red'
    // }
    // ctx.arc(circle.x, circle.y, circle.radius, 0, 360)
    // ctx.fillStyle = "red"
    // ctx.fill()
    // let isDraging = false;
    // let isDrawing = false
    // function draw(e) {
    //   if (!isDrawing) return;
    //   requestAnimationFrame(() => {
    //     ctx.strokeStyle = "red"
    //     const x = e.pageX;
    //     const y = e.pageY;
    //     ctx.lineTo(x, y);
    //     ctx.stroke();
    //   });
    // }
    // let imageData;
    // canvas.addEventListener("mousemove", (e) => {
    //   if (isDraging) {
    //     ctx.clearRect(circle.x - circle.radius - 1, circle.y - circle.radius - 1, 2 * circle.radius + 2, 2 * circle.radius + 2);
    //     ctx.beginPath()
    //     circle.x = e.pageX
    //     circle.y = e.pageY
    //     ctx.arc(circle.x, circle.y, circle.radius, 0, 360)
    //     ctx.fillStyle = "blue"
    //     ctx.fill()
    //   } else {
    //     draw(e)
    //   }
    // })
    // canvas.addEventListener("mousedown", (e) => {
    //   if (Math.sqrt((e.pageX - circle.x) ** 2 + (e.pageY - circle.y) ** 2) <= circle.radius) {
    //     isDraging = true
    //     circle.color = "blue"
    //   } else {
    //     ctx.moveTo(e.pageX, e.pageY)
    //     isDrawing = true
    //   }
    // })
    // canvas.addEventListener("mouseup", (e) => {
    //   if (Math.sqrt((e.pageX - circle.x) ** 2 + (e.pageY - circle.y) ** 2) <= circle.radius) {
    //     isDraging = false
    //     ctx.arc(circle.x, circle.y, circle.radius, 0, 360)
    //     ctx.fillStyle = "red"
    //     ctx.fill()
    //   } else {
    //     ctx.moveTo(e.pageX, e.pageY)
    //     isDrawing = false
    //   }
    // })
    // const ctx_shapes = canvas_shapes.getContext("2d")
    // ctx.fillStyle = "rgb(200 0 0)";
    // ctx.fillRect(10, 10, 50, 50);

    // ctx.fillStyle = "rgb(0 0 200 / 50%)";
    // ctx.fillRect(30, 30, 50, 50);

    // ctx.strokeRect(50, 50, 100, 100)
    // ctx.beginPath();
    // ctx.moveTo(75, 50);
    // ctx.lineTo(100, 75);
    // ctx.lineTo(100, 25);
    // ctx.fill();
    // ctx.beginPath();
    // ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    // ctx.moveTo(110, 75);
    // ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
    // ctx.moveTo(65, 65);
    // ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    // ctx.moveTo(95, 65);
    // ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
    // ctx.stroke();
    // Filled triangle
    // ctx.beginPath();
    // ctx.moveTo(25, 25);
    // ctx.lineTo(105, 25);
    // ctx.lineTo(25, 105);
    // ctx.fill();

    // // Stroked triangle
    // ctx.beginPath();
    // ctx.moveTo(125, 125);
    // ctx.lineTo(125, 45);
    // ctx.lineTo(45, 125);
    // ctx.closePath();
    // ctx.stroke();

    //   for (let i = 0; i < 4; i++) {
    //     for (let j = 0; j < 3; j++) {
    //       ctx.beginPath();
    //       const x = 25 + j * 50; // x coordinate
    //       const y = 25 + i * 50; // y coordinate
    //       const radius = 20; // Arc radius
    //       const startAngle = 0; // Starting point on circle
    //       const endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
    //       const counterclockwise = i % 2 !== 0; // clockwise or counterclockwise

    //       ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);

    //       if (i > 1) {
    //         ctx.fill();
    //       } else {
    //         ctx.stroke();
    //       }
    //     }
    //   }
    // ctx.beginPath()
    // ctx.arc(255, 255, 100, 0, 360)
    // ctx.stroke()
    // const x = 50, y = 50; // Top-left corner
    // const width = 200, height = 100;
    // const radius = 20;

    // ctx.beginPath();
    // ctx.moveTo(x + radius, y); // Move to start of top edge
    // ctx.arcTo(x + width, y, x + width, y + height, radius); // Top-right corner
    // ctx.arcTo(x + width, y + height, x, y + height, radius); // Bottom-right corner
    // ctx.arcTo(x, y + height, x, y, radius); // Bottom-left corner
    // ctx.arcTo(x, y, x + width, y, radius); // Top-left corner
    // ctx.closePath();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(75, 25);
    // ctx.quadraticCurveTo(25, 25, 25, 62.5);
    // ctx.quadraticCurveTo(25, 100, 50, 100);
    // ctx.quadraticCurveTo(50, 120, 30, 125);
    // ctx.quadraticCurveTo(60, 120, 65, 100);
    // ctx.quadraticCurveTo(125, 100, 125, 62.5);
    // ctx.quadraticCurveTo(125, 25, 75, 25);
    // ctx.stroke();

    // ctx.beginPath()
    // ctx.moveTo(75, 80)
    // ctx.arcTo(125, 20, 125, 50, 20);
    // ctx.lineTo(130, 130)
    // ctx.stroke()
    // ctx.beginPath()
    // ctx.arc(225, 225, 100, 0, 2 * Math.PI)
    // ctx.fillStyle = "black"
    // ctx.fill()
    // ctx.beginPath()
    // ctx.arc(225, 225, 50, 0, 2 * Math.PI)
    // ctx.fillStyle = "white"
    // ctx.fill()
    // ctx.beginPath()
    // ctx.arc(500, 225, 100, 0, 2 * Math.PI)
    // ctx.fillStyle = "black"
    // ctx.fill()
    // ctx.beginPath()
    // ctx.arc(500, 225, 50, 0, 2 * Math.PI)
    // ctx.fillStyle = "white"
    // ctx.fill()
    // ctx_shapes.beginPath()
    // const circle = {
    //   x: 50,
    //   y: 50,
    //   radius: 50,
    //   color: 'red'
    // }
    // ctx_shapes.arc(circle.x, circle.y, circle.radius, 0, 360)
    // ctx_shapes.fillStyle = "red"
    // ctx_shapes.fill()
    // let isDraging = false;
    // canvas_shapes.addEventListener("mousemove", (e) => {
    //   if (isDraging) {
    //     ctx_shapes.clearRect(circle.x - circle.radius - 1, circle.y - circle.radius - 1, 2 * circle.radius + 2, 2 * circle.radius + 2);
    //     ctx_shapes.beginPath()
    //     ctx_shapes.arc(e.pageX, e.pageY, 50, 0, 360)
    //     circle.x = e.pageX
    //     circle.y = e.pageY
    //     ctx_shapes.fillStyle = "blue"
    //     ctx_shapes.fill()
    //   }
    // })
    // canvas_shapes.addEventListener("mousedown", (e) => {
    //   if (Math.sqrt((e.pageX - circle.x) ** 2 + (e.pageY - circle.y) ** 2) <= circle.radius) {
    //     isDraging = true
    //     circle.color = "blue"
    //   }
    // })

    // canvas_shapes.addEventListener("mouseup", (e) => {
    //   if (Math.sqrt((e.pageX - circle.x) ** 2 + (e.pageY - circle.y) ** 2) <= circle.radius) {
    //     if (isDraging) {
    //       isDraging = false
    //       ctx_shapes.clearRect(circle.x - circle.radius - 1, circle.y - circle.radius - 1, 2 * circle.radius + 2, 2 * circle.radius + 2);
    //       ctx_shapes.beginPath()
    //       ctx_shapes.arc(e.pageX, e.pageY, 50, 0, 360)
    //       circle.x = e.pageX
    //       circle.y = e.pageY
    //       ctx_shapes.fillStyle = "red"
    //       ctx_shapes.fill()
    //     }
    //   }
    // })
    // ctx.lineJoin = "round";
    // ctx.lineCap = "round";
    // for (let i = 0; i < 6; i++) {
    //   for (let j = 0; j < 6; j++) {
    //     ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)} ${Math.floor(
    //       255 - 42.5 * j,
    //     )} 0)`;
    //     ctx.fillRect(j * 25, i * 25, 25, 25);
    //   }
    // }
    // for (let i = 0; i < 6; i++) {
    //   for (let j = 0; j < 6; j++) {
    //     ctx.strokeStyle = `rgb(0 ${Math.floor(255 - 42.5 * i)} ${Math.floor(
    //       255 - 42.5 * j,
    //     )})`;
    //     ctx.beginPath();
    //     ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, 2 * Math.PI, true);
    //     ctx.stroke();
    //   }
    // }
    // document.addEventListener("click", (e) => {
    //   if (isDrawing) {
    //     isDrawing = false
    //   } else {
    //     ctx.beginPath()
    //     ctx.moveTo(e.pageX, e.pageY)
    //     isDrawing = true
    //   }
    // })
    // document.addEventListener("click", (e) => {
    //   console.log(points)
    //   if (points.length && e.pageX != points[0] && e.pageY != points[1]) {
    //     ctx.lineTo(e.pageX, e.pageY)
    //     ctx.stroke()
    //     return
    //   }
    //   points.push(e.pageX, e.pageY)
    //   ctx.moveTo(e.pageX, e.pageY)
    // })
  }
}
window.addEventListener("load", renderCanvas)