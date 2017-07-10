/**
 * Created by Administrator on 2017/7/4.
 */
var documentWidth=window.screen.availWidth;//获取屏幕的宽高
//console.log(documentWidth)，值是不带单位的。

var gridContainerWidth=documentWidth*0.92;//大盒子的宽高；
var cellSideLength=documentWidth*0.18;//每个正方形格子的宽和高；
var cellSpace=documentWidth*0.04;//间距


function getPosTop(i,j) {
    return cellSpace+(i*(cellSideLength+cellSpace));
}
function getPosLeft(i,j) {
    return cellSpace+(j*(cellSideLength+cellSpace));
}
function getNumberBackgroundColor(num){
    switch (num){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
}
function getNumberColor(num) {
    if(num<=4){
        return "tomato";
    }else{
        return "white";
    }
}
function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}
function nomove(board) {
    if(canMoveUp(board)||canMoveDown(board)||canMoveLeft(board)||canMoveRight(board)){
        return false;
    }
    return true;
}
function canMoveLeft(board) {//判断当前布局所有的格子，还有没有可以向左移动的空格子

    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){//向左移动，第一列不需要判断；
            if(board[i][j]!=0){//等于0的的不会进行判断。
                if(board[i][j-1]==board[i][j]||board[i][j-1]==0){
                    return true;
                }
            }
        }
    }
 return false;
}
function canMoveRight(board) {
    for(var i =0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                if(board[i][j]==board[i][j+1]||board[i][j+1]==0){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    //可向下移动的位置中，空格子的数量
    for(var i=0;i<3;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                if(board[i][j]==board[i+1][j]||board[i+1][j]==0){
                    return true;
                }
            }

        }
    }
    return false;
}
function canMoveUp(board) {
// /可向上移动的位置中，空格子的数量
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                if(board[i][j]==board[i-1][j]||board[i-1][j]==0){
                    return true;
                }
            }
        }
    }
    return false;
}
function noBlock(row,c1,c2,board) {//相邻的左右两个格子不会判断，返回true
    for(var i=c1+1;i<c2;i++){
        if(board[row][i]!=0){
            return false;
        }
    }
    return true;

}
function  noBlock_lie(cell,c1,c2,board) {//两个快竖向列上没有其他元素
    for(var i=c1+1;i<c2;i++){
        if(board[i][cell]!=0){
            return false;
        }
    }
    return true;
}
