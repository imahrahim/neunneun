let data = [];
let x = 0
let y = 0

function setup() {
  

  createCanvas(windowWidth, windowHeight);
  d3.csv("Sprochrgb.csv", d3.autoType).then(function (csv) {
    data = csv;
    console.log(data);
  });

  frameRate(1);

  //let inp = createInput('');
  //inp.position(10,10);
  //inp.size(500);
  input = select('#textinput');
  input.input(inputHandling);

}

function draw() {
  //background(240);
}


function inputHandling()
{

  background(255);
  noStroke();
  let text = this.value();

  let words =  text.split(' ');

  console.log(words);
  
  const distanceBetweenRows = 10;
  const marginLeft = 0;
  const marginTop = 20;
  const positionsPerLine = 20;
  const sizeX = 20;
  const sizeY = 40;
  
  //Set starting positions equal to margin
  let posY = marginTop;
  let posX = marginLeft;
  
  let position = 0;

  words.forEach(element => {

    let num = textToNumber(element);
    console.log(num);
    
    if(num != undefined && !isNaN(num))
    {
      let r1 = data[num].R1;
      let r2 = data[num].R2;
      let g1 = data[num].G1;
      let g2 = data[num].G2;
      let b1 = data[num].B1;
      let b2 = data[num].B2;
      
      console.log(data[num].R1,data[num].R2);
      console.log(r1,r2,g1,g2,b1,b2);
      
      fill(r1, g1, b1);
      rect(posX,posY,sizeX,sizeY);
      
      //Add to posX so that rgb2 will be next to it
      posX += sizeX;

      fill(r2, g2, b2);
      rect(posX,posY,sizeX,sizeY);
      
      //Add to posX again. This will be the distance between the words
      posX += sizeX * 1.5;

      //Add 1 to position count to start next line if > positionsPerLine
      position++;
      
      console.log("x", posX);
      console.log("y", posY);

      //Start next line if we run out of space or if position >= positionsPerLine
      //(4 * sizeX) gives us a bit of a margin to the right
      if (posX >= windowWidth - (4 * sizeX) || position >= positionsPerLine)
      { 
        posY += sizeY + distanceBetweenRows;
        posX = marginLeft;
        position = 0;
      }
    }
  });
}

function textToColor(text){

  for(let i = 0; i < 99; i++)
  {
    if(data[i].Wörter == text)
    {
      return color(data[i].RGB)
    }
  }

}


function textToNumber(text)
{
  for(let i = 0; i < 99; i++)
  {
    if(data[i].Wörter == text)
    {
      return i;
    }
  }
}