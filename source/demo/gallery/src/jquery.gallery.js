; (function ($) {
    $.fn.gallery = function (options) {
        var opt = {
            thumWidth: 110,              //缩略图的宽度
            thumGap: 8,                  //缩略图之间的距离
            thumMoveStep: 5,             //一次移动的数量
            moveSpeed: 300,              //移动的速度
            fadeSpeed: 300,              //淡入淡出的速度
            end: '',
            bigImg: ".bigImg",
            prevImg: ".prevImg",
            nextImg: ".nextImg",
            thumbBox: ".thumbBox",
            thumbList: ".thumbList",
            prevPage: ".prevPage",
            nextPage: ".nextPage",
            selectClass: "",
            defaultImgIndex: 0,
            onImgChanged: null
        }
        $.extend(opt, options);
        return this.each(function () {
            var $this = $(this);
            var $bigImg = $this.find(opt.bigImg);
            var $thumbBox = $this.find(opt.thumbBox);
            var $thumbList = $thumbBox.find(opt.thumbList);
            var $thumItems = $thumbList.children();

            var $nextBtn = $this.find(opt.nextImg);
            var $prevBtn = $this.find(opt.prevImg);
            var $nextPageBtn = $this.find(opt.nextPage);
            var $prevPageBtn = $this.find(opt.prevPage);

            var objNum = $thumItems.length;
            var currentIndex = opt.defaultImgIndex;

            var currentPage = 0;

            var totalPage = Math.ceil(objNum / opt.thumMoveStep);
            var oldImg;

            init();

            function init() {
                initDom();
                setEvent();
                changeImg();
            }

            function initDom() {
                //添加选中框到缩略图中
                //$thumbList.append($thumLine.get())

                $thumbList.css({
                    "position": "relative",
                    "width": (opt.thumWidth + opt.thumGap) * objNum,
                });

                var width = $bigImg.width();
                var height = $bigImg.height();
                $bigImg.wrap("<div style='width:" + width + "px;height:" + height + "px;margin:0 auto;'></div>");
            }

            //绑定事件
            function setEvent() {
                $thumItems.on('click', function (e) {
                    e.preventDefault();
                    currentIndex = $(this).index();
                    changeImg();
                });
                $nextBtn.on('click', function () {
                    if (currentIndex < objNum - 1) {
                        currentIndex++;
                        changeImg();
                        currentPage = Math.floor(currentIndex / opt.thumMoveStep);
                        moveThum();
                    }
                });
                $prevBtn.on('click', function () {
                    if (currentIndex > 0) {
                        currentIndex--;
                        changeImg();
                        currentPage = Math.floor(currentIndex / opt.thumMoveStep);
                        moveThum();
                    }
                });
                $nextPageBtn.on('click', function () {
                    if (currentPage < totalPage - 1) {
                        currentPage++;
                        moveThum();
                    }
                });
                $prevPageBtn.on('click', function () {
                    if (currentPage > 0) {
                        currentPage--;
                        moveThum();
                    }
                });

                $bigImg.on({
                    "mousemove": function (event) {
                        var x = event.offsetX || (event.clientX - $bigImg.offset().left);

                        if (x < ($bigImg.width() / 2)) {
                            //$imgWin.css("cursor", "pointer");
                        }
                        else {
                            //$imgWin.css("cursor", "move");
                        }
                    },
                    "mouseout": function () {
                        //$imgWin.css("cursor", "auto");
                    },
                    "click": function (event) {
                        var x = event.offsetX || (event.clientX - $bigImg.offset().left);

                        if (x < ($bigImg.width() / 2)) {
                            $prevBtn.trigger("click");
                        }
                        else {
                            $nextBtn.trigger("click");
                        }
                    }
                })
                $(document).on("keydown", function (event) {
                    var code = event.keyCode || event.which;
                    switch (code) {
                        case 37:
                            $prevBtn.trigger("click");
                            break;
                        case 39:
                            $nextBtn.trigger("click");
                            break;
                        default:

                    }
                })
            }

            //移动缩略图
            function moveThum() {
                var pos = ((opt.thumWidth + opt.thumGap) * opt.thumMoveStep) * currentPage
                $thumbList.animate({ 'left': -pos }, opt.moveSpeed);
                //
                setVisibleBtn();
            }

            //设置按钮是否可见
            function setVisibleBtn() {
                $prevPageBtn.show();
                $nextPageBtn.show();
                $prevBtn.show();
                $nextBtn.show();
                if (currentPage == 0) {
                    $prevPageBtn.hide();
                }

                if (currentPage == totalPage - 1) {
                    $nextPageBtn.hide();
                }
                if (currentIndex == 0) {
                    $prevBtn.hide();
                }
                if (currentIndex == objNum - 1) {
                    $nextBtn.hide();
                }
            }

            //改变大图
            function changeImg() {

                //获取原图并设置到大图位置
                var $thum = $thumItems.eq(currentIndex)
                $thum.addClass(opt.selectClass).siblings().removeClass(opt.selectClass);
                var _src = $thum.find('a').attr('href');
                $bigImg.hide().attr('src', _src).fadeIn();

                setVisibleBtn();

                opt.onImgChanged && opt.onImgChanged.call($thum, currentIndex);
            }
        })
    }
})(jQuery);