var cursor = $(".cursor"),
    follower = $(".follower"),
    cWidth = 8, //カーソルの大きさ
    fWidth = 40, //フォロワーの大きさ
    delay = 10, //数字を大きくするとフォロワーがより遅れて来る
    mouseX = 0, //マウスのX座標
    mouseY = 0, //マウスのY座標
    posX = 0, //フォロワーのX座標
    posY = 0; //フォロワーのX座標

//カーソルの遅延アニメーション
//ほんの少ーーーしだけ遅延させる 0.001秒
TweenMax.to({}, .001, {
    repeat: -1,
    onRepeat: function () {
        posX += (mouseX - posX) / delay;
        posY += (mouseY - posY) / delay;

        TweenMax.set(follower, {
            css: {
                left: posX - (fWidth / 2),
                top: posY - (fWidth / 2)
            }
        });

        TweenMax.set(cursor, {
            css: {
                left: mouseX - (cWidth / 2),
                top: mouseY - (cWidth / 2)
            }
        });
    }
});

//マウス座標を取得
$(document).on("mousemove", function (e) {
    //mouseX = e.pageX;
    //mouseY = e.pageY;
    mouseX = e.clientX;
    mouseY = e.clientY;
});

$("a").on({
    "mouseenter": function () {
        cursor.addClass("is-active");
        follower.addClass("is-active");
    },
    "mouseleave": function () {
        cursor.removeClass("is-active");
        follower.removeClass("is-active");
    }
});

// $('#navBtn').click(function() {
//     $(".navMenuArea").toggleClass("active");
//   });


//---------------works-------------------

$(window).on('load', function () { //画面遷移時にギャラリーの画像が被らないように、すべての読み込みが終わった後に実行する

    //＝＝＝Muuriギャラリープラグイン設定
    var grid = new Muuri('.grid', {

        //アイテムの表示速度※オプション。入れなくても動作します
        showDuration: 600,
        showEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        hideDuration: 600,
        hideEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',

        // アイテムの表示/非表示状態のスタイル※オプション。入れなくても動作します
        visibleStyles: {
            opacity: '1',
            transform: 'scale(1)'
        },
        hiddenStyles: {
            opacity: '0',
            transform: 'scale(0.5)'
        }
    });

    //＝＝＝並び替えボタン設定
    $('.sort-btn li').on('click', function () {      //並び替えボタンをクリックしたら
        $(".sort-btn .active").removeClass("active"); //並び替えボタンに付与されているactiveクラスを全て取り除き
        var className = $(this).attr("class");      //クラス名を取得
        className = className.split(' ');       //「sortXX active」のクラス名を分割して配列にする
        $("." + className[0]).addClass("active");     //並び替えボタンに付与されているクラス名とギャラリー内のリストのクラス名が同じボタンにactiveクラスを付与
        if (className[0] == "sort00") {           //クラス名がsort00（全て）のボタンの場合は、
            grid.show('');               //全ての要素を出す
        } else {                      //それ以外の場合は
            grid.filter("." + className[0]);        //フィルターを実行
        }
    });

    //＝＝＝ Fancyboxの設定
    $('[data-fancybox]').fancybox({
        thumbs: {
            autoStart: true, //グループのサムネイル一覧をデフォルトで出す。不必要であればfalseに
        },
    });

});
