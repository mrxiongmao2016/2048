/**
 * Created by Administrator on 2017/7/4.
 */
function  showNumberWithAnimation(i,j,randNumber) {
    var numberCell=$("#number-cell-"+i+"-"+j);//注意个读取字符串的id
    numberCell.css("background-color",getNumberBackgroundColor(randNumber));
    numberCell.css("color",getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        "width":cellSideLength,
        "height":cellSideLength,
        "top":getPosTop(i,j),
        "left":getPosLeft(i,j)

        },100)

}


function showMoveAnimation( fromx , fromy , tox, toy ){

    var numberCell = $('#number-cell-' + fromx + '-' + fromy );
    numberCell.animate({
        top:getPosTop( tox , toy ),
        left:getPosLeft( tox , toy )
    },200);
}

function updateScore(score) {
    $("span").text(score);
}
