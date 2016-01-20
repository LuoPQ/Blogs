; (function ($, window, document, undefined) {
    "use strict";

    var defaults = {
        "speed": 500,
        "activeClass": "active",
        "menuTop": 0,
        "onItemSelected": null,
        "stickyClass": "sticky",
        "menuItemSelector": "a",
        "stickyBarSelector": null,        
        "stickyBarHeight": null
    }

    if (typeof Array.prototype.indexOf != "function") {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var index = -1;
            fromIndex = fromIndex * 1 || 0;

            for (var k = 0, length = this.length; k < length; k++) {
                if (k >= fromIndex && this[k] === searchElement) {
                    index = k;
                    break;
                }
            }
            return index;
        };
    }

    function SectionRange(hash, top, bottom) {
        this.hash = hash;
        this.top = top;
        this.bottom = bottom;
    }

    function MenuItem($item, hash, top, bottom) {
        this.$item = $item;
        this.section = new SectionRange(hash, top, bottom);
    }
    MenuItem.prototype.scrollToSection = function (speed, callback) {

        callback && callback.call(this.$item);

        $("html,body").stop().animate({
            "scrollTop": this.section.top
        }, speed);
    }
    MenuItem.prototype.setMenuItem = function (activeClass) {
        this.$item.addClass(activeClass).siblings().removeClass(activeClass);
    }

    function StickyMenu($menu, options) {
        this.$menu = $menu;

        // 粘性菜单
        this.$stickyBar = options.stickyBarSelector && $(options.stickyBarSelector) || $menu;

        this.menuOffsetTop = $menu.offset().top;
        this.stickyBarHeight = options.stickyBarHeight || this.$stickyBar.height();

        this.options = options;
        this.menuItems = [];

        this.getMenuItems();
        this.bindEvent();
    }
    StickyMenu.prototype = {
        constructor: StickyMenu,        
        getMenuItems: function () {

            var menuItems = this.menuItems;
            // 菜单链接
            var $links = this.$menu.find(this.options.menuItemSelector + ":not(.exceptLink)");

            var stickyBarHeight = this.stickyBarHeight;

            $links.each(function (i, ele) {
                var $this = $(this);
                var attr = ($this.hasAttr("href") ? $this : $this.find("[href]").eq(0)).attr("href");

                if (attr.indexOf("#") < 0) {
                    return;
                }

                var hash = attr.substr(1);
                var $target = $("." + hash);

                if ($target.length) {
                    var targetOffsetTop = $target.offset().top;

                    menuItems.push(new MenuItem(
                        $this,
                        hash,
                        targetOffsetTop - stickyBarHeight,//菜单浮动后，要将每个区域的高度减去菜单高度
                        targetOffsetTop + $target.outerHeight()));

                }
            });

        },
        setStickyMenu: function () {

            var $window = $(window);
            var $body = $(document.body);
            var $menu = this.$menu;
            var $stickyBar = this.$stickyBar;

            var options = this.options;
            var scrollTop = $window.scrollTop();
            var stickyBarHeight = this.stickyBarHeight;
            var menuOffsetTop = this.menuOffsetTop;

            var menuItems = this.menuItems;


            var menuStyles = {
                "stickyStyle": {
                    "position": "fixed",
                    "top": options.menuTop,
                    "width": "100%",
                    "z-index": 9999
                },
                "originStyle": {
                    "position": $menu.css("position"),
                    "left": $menu.css("left"),
                    "top": $menu.css("top")
                }
            };

            var floatMenu = function () {
                //滚动距离超过菜单与文档顶部距离，则开始浮动
                if (scrollTop > menuOffsetTop) {
                    $stickyBar.css(menuStyles.stickyStyle).addClass(options.stickyClass);
                    $body.css("padding-top", stickyBarHeight);//菜单浮动后，设置body的padding-top为其高度
                }
                else {
                    $stickyBar.css(menuStyles.originStyle).removeClass(options.stickyClass)
                    $body.css("padding-top", 0);
                }
            }

            var setActiveMenuItem = function () {
                for (var i = 0; i < menuItems.length; i++) {
                    if (menuItems[i].section.top <= scrollTop && menuItems[i].section.bottom >= scrollTop) {
                        if (menuItems[i + 1]) {
                            if (menuItems[i + 1].section.top <= scrollTop) {
                                menuItems[i + 1].setMenuItem(options.activeClass);
                            }
                            else {
                                menuItems[i].setMenuItem(options.activeClass);
                            }
                        }
                        else {
                            menuItems[i].setMenuItem(options.activeClass);
                        }
                        break;
                    }
                }

                //第一个链接
                if (scrollTop == 0) {
                    menuItems[0].setMenuItem(options.activeClass);
                }

                //最后一个链接：如果已经滚动到底部，直接设置成最后一个链接
                if (scrollTop >= $(document).height() - $window.height()) {
                    menuItems[menuItems.length - 1].setMenuItem(options.activeClass);
                }
            }

            floatMenu();

            setActiveMenuItem();
        },
        bindEvent: function () {
            var $window = $(window);
            var menuItems = this.menuItems;
            var options = this.options;

            this.$menu.on("click", options.menuItemSelector + ":not(.exceptLink)", function () {
                var index = $(this).index();
                menuItems[index] && menuItems[index].scrollToSection(options.speed, options.onItemSelected);
            })

            var that = this;
            $window.on({
                "scroll": function () {
                    that.setStickyMenu();
                }
            })

            if ($window.scrollTop() > 0) {
                that.setStickyMenu();
            }
        }
    }

    $.fn.hasAttr = function (attrName) {
        return typeof $(this).attr(attrName) !== 'undefined';
    }

    $.fn.stickymenu = function (options) {
        options = $.extend(defaults, options || {});

        return new StickyMenu($(this), options);
    }

})($, window, document);