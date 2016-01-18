; (function ($, window, document, undefined) {
    var screenHeight = window.innerHeight || document.documentElement.clientHeight;
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;


    function isInViewport(element) {
        var screenHeight = window.screenHeight;
        var screenWidth = window.screenWidth;
        if (!window.screenHeight) {
            screenHeight = window.screenHeight = window.innerHeight
                || document.documentElement.clientHeight;

            screenWidth = window.screenWidth = window.innerWidth
                || document.documentElement.clientWidth;
        }

        var rect = element.getBoundingClientRect();
        return rect.bottom > 0 &&
            rect.right > 0 &&
            rect.left < screenWidth &&
            rect.top < screenHeight;
    }

    $(".slider").children().height(screenHeight * 0.75);

    $(".slider").slide({
        "switchTime": "7000",
        "bindHover": false,
        "indexClass": "active",
        "delay": 500,
        "onInit": function () {
            $(this).children().first().children().first().addClass("zoomIn").css("visibility", "visible");
        },
        "onBeforeChange": function () {
            $(this).children().first().addClass("zoomOut");
        },
        "onChanged": function () {
            var $this = $(this);

            $this.children().first().addClass("zoomIn").css("visibility", "visible");

            $this.siblings().each(function () {
                $(this).children().first().removeClass("zoomIn").removeClass("zoomOut");
            })

            var $video = $this.find("video");
            $video.length && $video.get(0).play();
        }
    });

    $(".nav").stickymenu({
        "stickyBarSelector": ".header",
        "linkSelector": "li",
        "stickyClass": "header-sticky",
        "stickyBarHeight": 60
    });

    var $countChange = $(".countChange");
    var countsFrom = $countChange.map(function (idx, ele) {
        return parseInt($(ele).data("from"));
    })
    var countsTo = $countChange.map(function (idx, ele) {
        return parseInt($(ele).data("to"));
    })

    var countTimer = null;

    var changeCount = function () {
        if (isInViewport($countChange.get(0)) && countTimer == null) {

            countTimer = setInterval(function () {
                $countChange.each(function (idx, ele) {
                    return (function (idx) {
                        if (countsFrom[idx] == countsTo[idx]) {
                            if (idx === countsFrom.length - 1) {
                                clearInterval(countTimer);
                            }
                            return true;
                        }
                        $countChange.eq(idx).text(++countsFrom[idx]);
                    })(idx);
                })
            }, 7);
        }
    }


    var $countChange = $(".countChange");
    var countsFrom = $countChange.map(function (idx, ele) {
        return parseInt($(ele).data("from"));
    })
    var countsTo = $countChange.map(function (idx, ele) {
        return parseInt($(ele).data("to"));
    })

    var countTimer = null;
    var changeCount = function () {
        if (isInViewport($countChange.get(0)) && countTimer == null) {

            countTimer = setInterval(function () {
                $countChange.each(function (idx, ele) {
                    return (function (idx) {
                        if (countsFrom[idx] == countsTo[idx]) {
                            if (idx === countsFrom.length - 1) {
                                clearInterval(countTimer);
                            }
                            return true;
                        }
                        $countChange.eq(idx).text(++countsFrom[idx]);
                    })(idx);
                })
            }, 7);
        }
    }

    var $percentChange = $(".percentChange");
    var percentsFrom = $percentChange.map(function (idx, ele) {
        return parseInt($(ele).data("from"));
    })
    var percentsTo = $percentChange.map(function (idx, ele) {
        return parseInt($(ele).data("to"));
    })
    var percentTimer = null;
    var changePercent = function () {
        if (isInViewport($percentChange.get(0)) && percentTimer == null) {

            percentTimer = setInterval(function () {
                $percentChange.each(function (idx, ele) {
                    return (function (idx) {
                        if (percentsFrom[idx] == percentsTo[idx]) {
                            if (idx === percentsFrom.length - 1) {
                                clearInterval(percentTimer);
                            }
                            return true;
                        }
                        $percentChange.eq(idx).text(++percentsFrom[idx] + "%")
                        .parent().next().css("width", percentsFrom[idx] + "%");
                    })(idx);
                })
            }, 7);
        }
    }


    $(window).on("scroll", function () {
        changeCount();
        changePercent();
    })
    changeCount();
    changePercent();
})(jQuery, window, document);