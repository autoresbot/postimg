if (function() {
    var t = document,
        e = this.Document || this.HTMLDocument,
        n = window,
        i = this.constructor || this.Window || Window,
        s = Element,
        o = "prototype";
    if (n.HTMLElement || (n.HTMLElement = n[s]), Array[o].indexOf || (Array[o].indexOf = function(t) {
            if (void 0 === this || null === this) throw new TypeError(this + " is not an object");
            var e = this instanceof String ? this.split("") : this,
                n = Math.max(Math.min(e.length, 9007199254740991), 0) || 0,
                i = Number(arguments[1]) || 0;
            for (i = (i < 0 ? Math.max(n + i, 0) : i) - 1; ++i < n;)
                if (i in e && e[i] === t) return i;
            return -1
        }), !("classList" in s[o])) {
        var r = function(t) {
            var e = (t.getAttribute("class") || "").replace(/^\s+|\s+$/g, "").split(/\s+/) || [];
            hasClass = this.contains = function(t) {
                return e.indexOf(t) > -1
            }, addClass = this.add = function(n) {
                hasClass(n) || (e.push(n), t.setAttribute("class", e.join(" ")))
            }, removeClass = this.remove = function(n) {
                hasClass(n) && (e.splice(e.indexOf(n), 1), t.setAttribute("class", e.join(" ")))
            }, toggleClass = this.toggle = function(t) {
                hasClass(t) ? removeClass(t) : addClass(t)
            }
        };
        Object.defineProperty(s[o], "classList", {
            get: function() {
                return new r(this)
            }
        })
    }
    n.Event && i[o].Event || (n.Event = i[o].Event = e[o].Event = s[o].Event = function(e, n) {
        if (!e) throw new Error("Not enough arguments");
        var i, s = !(!n || void 0 === n.bubbles) && n.bubbles,
            o = !(!n || void 0 === n.cancelable) && n.cancelable;
        return "createEvent" in t ? (i = t.createEvent("Event")).initEvent(e, s, o) : ((i = t.createEventObject()).type = e, i.bubbles = s, i
            .cancelable = o), i
    }), "CustomEvent" in n && "CustomEvent" in i[o] || (n.CustomEvent = i[o].CustomEvent = e[o].CustomEvent = Element[o].CustomEvent = function(t, e) {
        if (!t) throw Error("CustomEvent TypeError: An event name must be provided.");
        var n = new Event(t, e);
        return n.detail = e && e.detail || null, n
    }), n.addEventListener && i[o].addEventListener || (n.addEventListener = i[o].addEventListener = e[o].addEventListener = s[o].addEventListener =
        function() {
            var e = this,
                n = arguments[0],
                i = arguments[1];
            e._events || (e._events = {}), e._events[n] || (e._events[n] = function(n) {
                var i, s = e._events[n.type].list,
                    o = s.slice(),
                    r = -1,
                    a = o.length;
                for (n.preventDefault = function() {
                        !1 !== n.cancelable && (n.returnValue = !1)
                    }, n.stopPropagation = function() {
                        n.cancelBubble = !0
                    }, n.stopImmediatePropagation = function() {
                        n.cancelBubble = !0, n.cancelImmediate = !0
                    }, n.currentTarget = e, n.relatedTarget = n.relatedTarget || n.fromElement || null, n.target = n.target || n.srcElement ||
                    e, n.timeStamp = (new Date).getTime(), n.clientX && (n.pageX = n.clientX + t.documentElement.scrollLeft, n.pageY = n
                        .clientY + t.documentElement.scrollTop); ++r < a && !n.cancelImmediate;) r in o && (i = o[r], -1 !== s.indexOf(i) &&
                    "function" == typeof i && i.call(e, n))
            }, e._events[n].list = [], e.attachEvent && e.attachEvent("on" + n, e._events[n])), e._events[n].list.push(i)
        }, n.removeEventListener = i[o].removeEventListener = e[o].removeEventListener = s[o].removeEventListener = function() {
            var t, e = this,
                n = arguments[0],
                i = arguments[1];
            e._events && e._events[n] && e._events[n].list && -1 !== (t = e._events[n].list.indexOf(i)) && (e._events[n].list.splice(t, 1), e._events[n]
                .list.length || (e.detachEvent && e.detachEvent("on" + n, e._events[n]), delete e._events[n]))
        }), n.dispatchEvent && i[o].dispatchEvent && e[o].dispatchEvent && s[o].dispatchEvent || (n.dispatchEvent = i[o].dispatchEvent = e[o]
        .dispatchEvent = s[o].dispatchEvent = function(t) {
            if (!arguments.length) throw new Error("Not enough arguments");
            if (!t || "string" != typeof t.type) throw new Error("DOM Events Exception 0");
            var e = this,
                i = t.type;
            try {
                if (!t.bubbles) {
                    t.cancelBubble = !0;
                    var s = function(t) {
                        t.cancelBubble = !0, (e || n).detachEvent("on" + i, s)
                    };
                    this.attachEvent("on" + i, s)
                }
                this.fireEvent("on" + i, t)
            }
            catch (n) {
                t.target = e;
                do {
                    t.currentTarget = e, "_events" in e && "function" == typeof e._events[i] && e._events[i].call(e, t), "function" == typeof e["on" +
                        i] && e["on" + i].call(e, t), e = 9 === e.nodeType ? e.parentWindow : e.parentNode
                } while (e && !t.cancelBubble)
            }
            return !0
        })
}(), function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.Slideout = t()
    }
}(function() {
    return function t(e, n, i) {
        function s(r, a) {
            if (!n[r]) {
                if (!e[r]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(r, !0);
                    if (o) return o(r, !0);
                    var c = new Error("Cannot find module '" + r + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = n[r] = {
                    exports: {}
                };
                e[r][0].call(u.exports, function(t) {
                    var n = e[r][1][t];
                    return s(n || t)
                }, u, u.exports, t, e, n, i)
            }
            return n[r].exports
        }
        for (var o = "function" == typeof require && require, r = 0; r < i.length; r++) s(i[r]);
        return s
    }({
        1: [function(t, e, n) {
            "use strict";

            function i(t, e) {
                for (var n in e) e[n] && (t[n] = e[n]);
                return t
            }

            function s(t) {
                for (; t.parentNode;) {
                    if (null !== t.getAttribute("data-slideout-ignore")) return t;
                    t = t.parentNode
                }
                return null
            }

            function o(t) {
                t = t || {}, this._startOffsetX = 0, this._currentOffsetX = 0, this._opening = !1, this._moved = !1, this._opened = !1,
                    this._preventOpen = !1, this._touch = void 0 === t.touch || t.touch && !0, this._side = t.side || "left", this
                    .panel = t.panel, this.menu = t.menu, this.panel.classList.contains("slideout-panel") || this.panel.classList.add(
                        "slideout-panel"), this.panel.classList.contains("slideout-panel-" + this._side) || this.panel.classList.add(
                        "slideout-panel-" + this._side), this.menu.classList.contains("slideout-menu") || this.menu.classList.add(
                        "slideout-menu"), this.menu.classList.contains("slideout-menu-" + this._side) || this.menu.classList.add(
                        "slideout-menu-" + this._side), this._fx = t.fx || "ease", this._duration = parseInt(t.duration, 10) || 300,
                    this._tolerance = parseInt(t.tolerance, 10) || 70, this._padding = this._translateTo = parseInt(t.padding, 10) ||
                    256, this._orientation = "right" === this._side ? -1 : 1, this._translateTo *= this._orientation, this._touch &&
                    this._initTouchEvents()
            }
            var r, a = t("decouple"),
                l = t("emitter"),
                c = !1,
                u = window.document,
                h = u.documentElement,
                d = window.navigator.msPointerEnabled,
                f = {
                    start: d ? "MSPointerDown" : "touchstart",
                    move: d ? "MSPointerMove" : "touchmove",
                    end: d ? "MSPointerUp" : "touchend"
                },
                p = function() {
                    var t = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/,
                        e = u.getElementsByTagName("script")[0].style;
                    for (var n in e)
                        if (t.test(n)) return "-" + n.match(t)[0].toLowerCase() + "-";
                    return "WebkitOpacity" in e ? "-webkit-" : "KhtmlOpacity" in e ? "-khtml-" : ""
                }();
            ! function(t, e) {
                t.prototype = i(t.prototype || {}, e.prototype)
            }(o, l), o.prototype.open = function() {
                var t = this;
                return this.emit("beforeopen"), h.classList.contains("slideout-open") || h.classList.add("slideout-open"), this
                    ._setTransition(), this._translateXTo(this._translateTo), this._opened = !0, setTimeout(function() {
                        t.panel.style.transition = t.panel.style["-webkit-transition"] = "", t.emit("open")
                    }, this._duration + 50), this
            }, o.prototype.close = function() {
                var t = this;
                return this.isOpen() || this._opening ? (this.emit("beforeclose"), this._setTransition(), this._translateXTo(0),
                    this._opened = !1, setTimeout(function() {
                        h.classList.remove("slideout-open"), t.panel.style.transition = t.panel.style[
                            "-webkit-transition"] = t.panel.style[p + "transform"] = t.panel.style.transform = "", t.emit(
                                "close")
                    }, this._duration + 50), this) : this
            }, o.prototype.toggle = function() {
                return this.isOpen() ? this.close() : this.open()
            }, o.prototype.isOpen = function() {
                return this._opened
            }, o.prototype._translateXTo = function(t) {
                return this._currentOffsetX = t, this.panel.style[p + "transform"] = this.panel.style.transform = "translateX(" +
                    t + "px)", this
            }, o.prototype._setTransition = function() {
                return this.panel.style[p + "transition"] = this.panel.style.transition = p + "transform " + this._duration +
                    "ms " + this._fx, this
            }, o.prototype._initTouchEvents = function() {
                var t = this;
                return this._onScrollFn = a(u, "scroll", function() {
                    t._moved || (clearTimeout(r), c = !0, r = setTimeout(function() {
                        c = !1
                    }, 250))
                }), this._preventMove = function(e) {
                    t._moved && e.preventDefault()
                }, u.addEventListener(f.move, this._preventMove), this._resetTouchFn = function(e) {
                    void 0 !== e.touches && (t._moved = !1, t._opening = !1, t._startOffsetX = e.touches[0].pageX, t
                        ._preventOpen = !t._touch || !t.isOpen() && 0 !== t.menu.clientWidth)
                }, this.panel.addEventListener(f.start, this._resetTouchFn), this._onTouchCancelFn = function() {
                    t._moved = !1, t._opening = !1
                }, this.panel.addEventListener("touchcancel", this._onTouchCancelFn), this._onTouchEndFn = function() {
                    t._moved && (t.emit("translateend"), t._opening && Math.abs(t._currentOffsetX) > t._tolerance ? t.open() : t
                        .close()), t._moved = !1
                }, this.panel.addEventListener(f.end, this._onTouchEndFn), this._onTouchMoveFn = function(e) {
                    if (!(c || t._preventOpen || void 0 === e.touches || s(e.target))) {
                        var n = e.touches[0].clientX - t._startOffsetX,
                            i = t._currentOffsetX = n;
                        if (!(Math.abs(i) > t._padding) && Math.abs(n) > 20) {
                            t._opening = !0;
                            var o = n * t._orientation;
                            if (t._opened && o > 0 || !t._opened && o < 0) return;
                            t._moved || t.emit("translatestart"), o <= 0 && (i = n + t._padding * t._orientation, t._opening = !
                                    1), t._moved && h.classList.contains("slideout-open") || h.classList.add("slideout-open"), t
                                .panel.style[p + "transform"] = t.panel.style.transform = "translateX(" + i + "px)", t.emit(
                                    "translate", i), t._moved = !0
                        }
                    }
                }, this.panel.addEventListener(f.move, this._onTouchMoveFn), this
            }, o.prototype.enableTouch = function() {
                return this._touch = !0, this
            }, o.prototype.disableTouch = function() {
                return this._touch = !1, this
            }, o.prototype.destroy = function() {
                return this.close(), u.removeEventListener(f.move, this._preventMove), this.panel.removeEventListener(f.start, this
                        ._resetTouchFn), this.panel.removeEventListener("touchcancel", this._onTouchCancelFn), this.panel
                    .removeEventListener(f.end, this._onTouchEndFn), this.panel.removeEventListener(f.move, this._onTouchMoveFn), u
                    .removeEventListener("scroll", this._onScrollFn), this.open = this.close = function() {}, this
            }, e.exports = o
        }, {
            decouple: 2,
            emitter: 3
        }],
        2: [function(t, e, n) {
            "use strict";
            var i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(t) {
                window.setTimeout(t, 1e3 / 60)
            };
            e.exports = function(t, e, n) {
                function s(t) {
                    a = t, o()
                }

                function o() {
                    l || (i(r), l = !0)
                }

                function r() {
                    n.call(t, a), l = !1
                }
                var a, l = !1;
                return t.addEventListener(e, s, !1), s
            }
        }, {}],
        3: [function(t, e, n) {
            "use strict";
            var i = function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            };
            n.__esModule = !0;
            var s = function() {
                function t() {
                    i(this, t)
                }
                return t.prototype.on = function(t, e) {
                    return this._eventCollection = this._eventCollection || {}, this._eventCollection[t] = this
                        ._eventCollection[t] || [], this._eventCollection[t].push(e), this
                }, t.prototype.once = function(t, e) {
                    function n() {
                        i.off(t, n), e.apply(this, arguments)
                    }
                    var i = this;
                    return n.listener = e, this.on(t, n), this
                }, t.prototype.off = function(t, e) {
                    var n = void 0;
                    return this._eventCollection && (n = this._eventCollection[t]) ? (n.forEach(function(t, i) {
                        t !== e && t.listener !== e || n.splice(i, 1)
                    }), 0 === n.length && delete this._eventCollection[t], this) : this
                }, t.prototype.emit = function(t) {
                    for (var e = this, n = arguments.length, i = Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) i[s - 1] =
                        arguments[s];
                    var o = void 0;
                    return this._eventCollection && (o = this._eventCollection[t]) ? ((o = o.slice(0)).forEach(function(t) {
                        return t.apply(e, i)
                    }), this) : this
                }, t
            }();
            n.default = s, e.exports = n.default
        }, {}]
    }, {}, [1])(1)
}), document.getElementById("side-menu")) {
var slideout = new Slideout({
    panel: document.getElementById("sb-main"),
    menu: document.getElementById("side-menu"),
    side: "right"
});
document.getElementById("menu-btn").addEventListener("click", function() {
    slideout.toggle()
});
var fixed = document.querySelector(".sb-slide");
slideout.on("translate", function(t) {
    fixed.style.transform = "translateX(" + t + "px)"
}), slideout.on("beforeopen", function() {
    fixed.style.transition = "transform 300ms ease", fixed.style.transform = "translateX(-256px)"
}), slideout.on("beforeclose", function() {
    fixed.style.transition = "transform 300ms ease", fixed.style.transform = "translateX(0px)"
}), slideout.on("open", function() {
    fixed.style.transition = ""
}), slideout.on("close", function() {
    fixed.style.transition = ""
})
}