/**
 * Created by Administrator on 2017/7/4.
 */

var board=[ ];
var score=0;
var hasConflic=[ ];//标记目标数组是否已经发生过一次叠加碰撞；
$(document).ready(function(){
    preForMoible()//自适应初始化移动端大盒子的宽高等布局；
    newgame()
})
function newgame() {

    //初始化棋盘，绝对定位
    init();

    //在随机两个格子生产数字
    generateOneNumber();
    generateOneNumber();
}
function preForMoible() {
    if( documentWidth > 500 ){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $("#grid-container").css("width",gridContainerWidth-(cellSpace*2));
    $("#grid-container").css("height",gridContainerWidth-(cellSpace*2));
    $("#grid-container").css("padding",cellSpace);
    $("#grid-container").css("border-radius",gridContainerWidth*0.02);

    $(".grid-cell").css("width",cellSideLength)
    $(".grid-cell").css("height",cellSideLength)
    $(".grid-cell").css("border-radius",cellSideLength*0.02)
}
function init() {

    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridCell=$("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j))
            gridCell.css("left",getPosLeft(i,j))
        }
        board[i]=new Array();
        hasConflic[i]=new Array()
        for(var j=0;j<4;j++){
            board[i][j]=0;
            hasConflic[i][j]=false;
        }

    }
    updateBoardView();
    score=0;
}


function updateBoardView() {//更新面板上的数字

    $(".number-cell").remove();//删除原来面板上的数字
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++) {
            $("#grid-container").append('<div class="number-cell"  id="number-cell-'+i+'-'+j+'"></div>');

            var theNumberCell=$("#number-cell-"+i+"-"+j);
            if(board[i][j]==0){
                theNumberCell.css("width",0);
                theNumberCell.css("height",0);
                theNumberCell.css("top",getPosTop(i,j)+(cellSideLength/2));
                theNumberCell.css("left",getPosLeft(i,j)+(cellSideLength/2));

            }else{
                theNumberCell.css("width",cellSideLength);
                theNumberCell.css("height",cellSideLength);
                theNumberCell.css("top",getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));
                theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflic[i][j]=false;
        }
        $(".number-cell").css("line-height",cellSideLength+"px")//行高；
    }
}
function generateOneNumber() {

    if(nospace(board)){
        return false;
    }
    var randomTimes=0;
    //随机一个位置
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    while (randomTimes<50){//循环50次去随机找一个空格子生成数字；
        if(board[randx][randy]==0){
            break;
        }
        var randx=parseInt(Math.floor(Math.random()*4));
        var randy=parseInt(Math.floor(Math.random()*4));
        randomTimes++
    }
    if(randomTimes==50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j]==0){
                    randx=i;
                    randy=j;
                }
            }
        }
    }
    //随机一个数字

    var randNumber=Math.random()<0.5?2:4;
    //随机位置显示数字
    board[randx][randy]=randNumber;
    showNumberWithAnimation(randx,randy,randNumber)
    return true;
}

$(document).keydown(function (event) {
    switch (event.keyCode){
        case 37:{
            event.preventDefault();//阻止默认事件，即滚动条滚动。
            if(moveLeft()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",210)
            }
            break;
        }
        case 39:{
            event.preventDefault();//阻止默认事件，即滚动条滚动。
            if(moveRight()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",210)
            }
            break;
        }
        case 38:{
            event.preventDefault();//阻止默认事件，即滚动条滚动。
            if(moveUp()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",210)
            }
            break;
        }
        case 40:{
            event.preventDefault();//阻止默认事件，即滚动条滚动。
            if(moveDown()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",210)
            }
            break;
        }
    }
})

document.addEventListener("touchstart",function (event) {//添加触摸事件，触摸点击屏幕，类似keydonw
    startX=event.touches[0].pageX;//数组表示多点触控，startX是全局变量，下一个方法会用到。
    startY=event.touches[0].pageY;

})
document.addEventListener("touchmove",function (event) {//触控移动的时间，这里是为了解决BUG；
    event.preventDefault();
});

document.addEventListener("touchend",function (event) {//添加触摸事件，触摸从屏幕释放；类似keyup另外还有滑动事件等等。
    var endX=event.changedTouches[0].pageX;
    var endY=event.changedTouches[0].pageY;

    var delX=endX-startX;
    var delY=endY-startY;

    if(Math.abs(delX)<25&&Math.abs(delY)<25){//触控距离少于25像素
        return
    }
    if(Math.abs(delX)>=Math.abs(delY)){//判断左右滑动
        if(delX>0){//向右
            if(moveRight()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",210)
            }
        }else{//向左,没有等于0的情况
            if(moveLeft()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",210)
            }
        }
    }else{//上下滑动
        if(delY>0){//向下
            if(moveDown()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",210)
            }
        }else{//向上
            if(moveUp()){
                setTimeout("generateOneNumber()",210)
                setTimeout("isgameover()",210)
            }
        }
    }

})


function isgameover() {
    if(nospace(board)&&nomove(board)){
        setTimeout("gameover()",400);
    }
    return true;
}

function gameover() {
    alert("gamerover")
}
function moveLeft() {//向左移动
    if(!canMoveLeft(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if( board[i][k]==0&&noBlock(i,k,j,board)){
                        showMoveAnimation(i,j,i,k)
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;

                    }else if(board[i][k]==board[i][j]&&noBlock(i,k,j,board)&&hasConflic[i][k]==false){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);

                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200)
    return true;
}

function moveRight() {//向右
    if(!canMoveRight(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if( board[i][k]==0&&noBlock(i,j,k,board)){
                        showMoveAnimation(i,j,i,k)
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noBlock(i,j,k,board)&&hasConflic[i][k]==false){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200)
    return true;
}

function moveDown() {//向下
    if(!canMoveDown(board)){
        return false;
    }
    for(var j=0;j<4;j++){
        for(var i=0;i<3;i++){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if( board[k][j]==0&&noBlock_lie(j,i,k,board)){
                        showMoveAnimation(i,j,k,j)
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noBlock_lie(j,i,k,board)&&hasConflic[k][j]==false){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200)
    return true;
}

function moveUp() {//向上
    if(!canMoveUp(board)){
        return false;
    }
    for(var j=0;j<4;j++){
        for(var i=3;i>0;i--){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if( board[k][j]==0&&noBlock_lie(j,k,i,board)){
                        showMoveAnimation(i,j,k,j)
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noBlock_lie(j,k,i,board)&&hasConflic[k][j]==false){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200)
    return true;
}
