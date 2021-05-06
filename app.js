


const btn1 = document.querySelector('#btn1');


const WIDTH = 6;
const HEIGHT = 6;
const tableBoard = document.getElementById('board');
const body = document.createElement('tbody');
const topLine = document.createElement('thead');

topLine.setAttribute('id', 'column-top');
body.setAttribute('id', 'table-body');
tableBoard.append(topLine);
tableBoard.append(body);

let results = [];
let titleBoard = [];


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
 
  for(i = 0; i < WIDTH; i++) {
    const row = document.createElement('th');
    row.setAttribute('id', `${i}`)
    topLine.append(row);

  }
  
  for (let x = 1; x < 6; x++) {
    const tableRowCell = document.createElement('tr');
    body.append(tableRowCell);
        for (let y = 0; y < HEIGHT; y++) {
            const cell = document.createElement('td');
            cell.innerText = "$"+ x + '00';
            cell.setAttribute('id', `${y}-${x}`);
            tableRowCell.append(cell);
      }
    }  
  }

// function that resets the HTML board

function resetHtmlBoard() {
  const tableBody = document.getElementById('table-body')
  
  for (let i = 0; i < tableBody.children.length; i++) {
    for (let j = 0; j < tableBody.children[i].children.length; j++) {
      tableBody.children[i].children[j].innerHTML = "$"+ (i+1) + '00';
    }
  }
}

// function the populates the jeopardy categories

function roundQuestions() {
  titleBoard.sort(() => Math.random() - 0.5);
  
  let title1 = document.getElementById('0').innerText = titleBoard[0][1];
  let title2 = document.getElementById('1').innerText = titleBoard[1][1];
  let title3 = document.getElementById('2').innerText = titleBoard[2][1];
  let title4 = document.getElementById('3').innerText = titleBoard[3][1];
  let title5 = document.getElementById('4').innerText = titleBoard[4][1];
  let title6 = document.getElementById('5').innerText = titleBoard[5][1];
  }
//^below is the API request that pulls categories from the api, but the categories are not random


async function jeopardyCategory(nums){
    const res = await axios.get('https://jservice.io/api/categories', { params: { count: nums } } );
    for (let results of res.data) {
        jeopardyCategoryQuestion(results.id);
        
    }    
}


//^below is the original api callback that pulls the id of the catergory that is identified
async function jeopardyCategoryQuestion(id){
    const res = await axios.get('https://jservice.io/api/category', { params : { id : id } } );
   
    results.push(res.data);
    titleBoard.push([res.data.id, res.data.title]);
    titleBoard.sort(() => Math.random() - 0.5);
}

class TriviaGameShow  {
constructor (){
  //categories that will used in the game
}

cat1 = []; cat2 = []; cat3 = []; cat4 = []; cat5 = []; cat6 = []; 

fetchCategories(){
 //console.log(results);
  this.cat1 = [];
  this.cat2 = [];
  this.cat3 = [];
  this.cat4 = [];
  this.cat5 = [];
  this.cat6 = []; 

 for(let result of results) {
   (result.id == titleBoard[0][0])? this.cat1.push(result.clues) : '';
   (result.id == titleBoard[1][0])? this.cat2.push(result.clues) : '';
   (result.id == titleBoard[2][0])? this.cat3.push(result.clues) : '';
   (result.id == titleBoard[3][0])? this.cat4.push(result.clues) : '';
   (result.id == titleBoard[4][0])? this.cat5.push(result.clues) : '';
   (result.id == titleBoard[5][0])? this.cat6.push(result.clues) : '';
         };
}

}


const JeopardyGame = new TriviaGameShow()

btn1.addEventListener('click', function (){

  roundQuestions();
  JeopardyGame.fetchCategories();
  resetHtmlBoard();
})

body.addEventListener('click', addQues);

body.addEventListener('dblclick', addAns)

function addAns(e){
  //console.log(e.target.id);

  let selection = e.target.id.split('');
  let spot1 = parseInt(selection[0]);
  let spot2 = parseInt(selection[2]);
  if(spot1 === 0){
    e.target.innerHTML = JeopardyGame.cat1[0][spot2 - 1].answer;    
  } else if (spot1 === 1) {
    e.target.innerHTML = JeopardyGame.cat2[0][spot2 - 1].answer;    
  } else if (spot1 === 2) {
    e.target.innerHTML = JeopardyGame.cat3[0][spot2 - 1].answer;    
  } else if (spot1 === 3) {
    e.target.innerHTML = JeopardyGame.cat4[0][spot2 - 1].answer;    
  } else if (spot1 === 4) {
    e.target.innerHTML = JeopardyGame.cat5[0][spot2 - 1].answer;    
  } else if (spot1 === 5) {
    e.target.innerHTML = JeopardyGame.cat6[0][spot2 - 1].answer;    
  }
$(e.target).click(function(){return false;});
}
  
function addQues(e){
 
let selection = e.target.id.split('');
let spot1 = parseInt(selection[0]);
let spot2 = parseInt(selection[2]);
if(spot1 === 0){
  e.target.innerHTML = JeopardyGame.cat1[0][spot2 - 1].question;    
} else if (spot1 === 1) {
  e.target.innerHTML = JeopardyGame.cat2[0][spot2 - 1].question;    
} else if (spot1 === 2) {
  e.target.innerHTML = JeopardyGame.cat3[0][spot2 - 1].question;    
} else if (spot1 === 3) {
  e.target.innerHTML = JeopardyGame.cat4[0][spot2 - 1].question;    
} else if (spot1 === 4) {
  e.target.innerHTML = JeopardyGame.cat5[0][spot2 - 1].question;    
} else if (spot1 === 5) {
  e.target.innerHTML = JeopardyGame.cat6[0][spot2 - 1].question;    
}
  $(e.target).click(function(){return false;});
  };

makeHtmlBoard();
jeopardyCategory(50);


