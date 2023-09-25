const gameinfo=document.querySelector(".game-info");
const boxes=document.querySelectorAll(".box");
const btn=document.querySelector(".btn");


let currntplayer;
let gamegrid;

const winningposition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initgame(){
    currntplayer="X";
    gamegrid=["","","","","","","","",""];


    boxes.forEach((box , index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all"
        box.classList=`box box${index+1}`;
    });


    btn.classList.remove("active");
    gameinfo.innerText=`Current player - ${currntplayer}`;   
}

initgame();

function swapturn(){
    if(currntplayer==="X"){
        currntplayer="O";
    }
    else{
        currntplayer="X";
    }

    gameinfo.innerText=`Current player - ${currntplayer}`;
}

function checkGameOver(){
   let answer="";

   winningposition.forEach((position)=>{
    if((gamegrid[position[0]]!="" || gamegrid[position[1]]!="" || gamegrid[position[2]]!="")
    && (gamegrid[position[0]]===gamegrid[position[1]]) && (gamegrid[position[0]]===gamegrid[position[2]]) )
    {

        if(gamegrid[position[0]]=="X") answer="X";
        else answer="O";

        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        })

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }

    if(answer!==""){
        gameinfo.innerText=`winning player - ${answer}`;
        btn.classList.add("active");
        return;
    }

    let fillcount=0;

    gamegrid.forEach((box)=>{
        if(box!=="") fillcount++;
    });

    if(fillcount==9){
        gameinfo.innerText="Game Tied !";
        btn.classList.add("active");
    }

   });
}

function handlecheck(index){
    if(gamegrid[index]===""){
        boxes[index].innerText=currntplayer;
        gamegrid[index]=currntplayer;
        boxes[index].style.pointerEvents="none";
        swapturn();
        checkGameOver();
    }

}

boxes.forEach((box , index)=>{
    box.addEventListener("click" , ()=>{
        handlecheck(index);
    });
});

btn.addEventListener("click" , ()=>{
   
    initgame();
   
})