function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  for (let r = 0; r < 6; r++) {
    for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + r * 3)) {
      let x1 = sin((PI / 2) * (r + 1) + i) * (40 + r * 20);
      let y1 = cos((PI / 2) * (r + 1) + i) * (40 + r * 20);
      fill(255);
      stroke(255, 100);
      strokeWeight(map(sin(i + frameCount * 0.05), -1, 1, 0.01, 2));
      line(x1, y1, 0, 0);
      noStroke();
      circle(x1, y1, map(sin(i + frameCount * 0.05), -1, 1, 3, 6 + r * 3.5));
    }
  }
  circle(0, 0, 30);
}

function drawDandFlower(layerNum, transX, transY, ci) {
  let rV = colorBase[ci][0];
  let gV = colorBase[ci][1];
  let bV = colorBase[ci][2];
  push();
  translate(transX, transY);
  stroke(rV, gV, bV);
  strokeWeight(5);
  push();
  translate(0, 300);
  let x1 = map(sin(frameCount * 0.01), -1, 1, -60, 60);
  let y1 = map(cos(frameCount * 0.01), -1, 1, -10, 0);
  pop();
  push();
  noFill();
  bezier(x1, y1, 0, 150, 0, 500, 0, 500);
  pop();
  for (let r = 0; r < layerNum; r++) {
    for (let i = 0; i <= 2 * PI; i += (2 * PI) / (11 + r * 3)) {
      let fly = false;
      let x = x1 + sin((PI / 2) * (r + 1) + i) * (40 + r * 20);
      let y = y1 + cos((PI / 2) * (r + 1) + i) * (40 + r * 20);
      let distFromCentX = transX - width / 2;
      let distFromCentY = transY - height / 2;
      let dmouse = dist(
        x + width / 2 + distFromCentX,
        y + height / 2 + distFromCentY,
        mouseX,
        mouseY
      );
      if (dmouse <= 20) {
        y += map(dmouse, 0, 20, 10, 0);
        x += map(dmouse, 0, 20, 10, 0);
      }

      stroke(255, 100);
      strokeWeight(map(sin(i + frameCount * 0.05), -1, 1, 0.01, 2));
      bezier(x1, y1, x, y, x, y, x, y);
      let fluctation = sin((PI / 2) * (r + 1) + i);
      assignColor(ci, fluctation);
      noStroke();
      circle(x, y, map(sin(i + frameCount * 0.05), -1, 1, 3, 6 + r * 3.5));
    }
  }
  let fluctation2 = sin(PI / 2 + frameCount * 0.01);
  assignColor(ci, fluctation2);
  // fill(map(sin(PI / 2 + frameCount * 0.01), -1, 1, 10, 230), 215, 80);
  circle(x1, y1, map(layerNum, 1, 8, 16, 38));
  pop();
}

function assignColor(baseColorIndex, fluct) {
  fill(
    map(
      fluct,
      -1,
      1,
      colorRange[baseColorIndex][0][0],
      colorRange[baseColorIndex][1][0]
    ),
    map(
      fluct,
      -1,
      1,
      colorRange[baseColorIndex][0][1],
      colorRange[baseColorIndex][1][1]
    ),
    map(
      fluct,
      -1,
      1,
      colorRange[baseColorIndex][0][2],
      colorRange[baseColorIndex][1][2]
    )
  );
}
