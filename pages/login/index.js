
(global.webpackJsonp = global.webpackJsonp || []).push([
    ["pages/login/index"], {
        "0cba": function(e, n, t) {
            (function(e) {
                var o = t("4ea4");
                Object.defineProperty(n, "__esModule", {
                    value: !0
                }), n.default = void 0;
                var a = o(t("ad84")),
                    i = {
                        data: function() {
                            return {
                                form: {
                                    account: "",
                                    password: ""
                                },
                                loading: !1,
                                isAgree: []
                            }
                        },
                        onLoad: function() {},
                        methods: {
                            checkboxChange: function(e) {
                                var n = e.detail.value;
                                this.isAgree = n
                            },
                            tologin: function() {
                                this.isAgree.length || e.showToast({
                                    title: "请先阅读并同意隐私政策",
                                    icon: "none"
                                })
                            },
                            getPhoneNumber: function(n) {
                                var t = this,
                                    o = this;
                                if (n.detail.errMsg.indexOf("fail") > -1) return e.showToast({
                                    title: "您拒绝了授权",
                                    icon: "none"
                                }), !1;
                                var i = {
                                    code: n.detail.code
                                };
                                this.loading || (this.loading = !0, e.showLoading({
                                    title: "登录中..."
                                }), a.default.codeLogin(i).then((function(n) {
                                    var a = n.info;
                                    e.setStorageSync("userInfo", JSON.stringify(a)), e.setStorageSync("mobile", JSON.stringify(a.mobile)), e.setStorageSync("token", a.token), t.$store.commit("SET_USERINFO", a), t.$store.commit("SET", {
                                        key: "token",
                                        value: a.token
                                    }), e.hideLoading(), setTimeout((function() {
                                        o.loading = !1, e.navigateBack({
                                            delta: 1
                                        })
                                    }), 200), e.showToast({
                                        title: "登录成功",
                                        icon: "none"
                                    })
                                })).catch((function(n) {
                                    e.showToast({
                                        title: n.message,
                                        icon: "none"
                                    })
                                })))
                            }
                        }
                    };
                n.default = i
            }).call(this, t("543d").default)
        },
        "4aca": function(e, n, t) {
            t.r(n);
            var o = t("5325"),
                a = t("6708");
            for (var i in a)["default"].indexOf(i) < 0 && function(e) {
                t.d(n, e, (function() {
                    return a[e]
                }))
            }(i);
            t("87ba");
            var c = t("f0c5"),
                r = Object(c.a)(a.default, o.b, o.c, !1, null, "2ffd878b", null, !1, o.a, void 0);
            n.default = r.exports
        },
        5325: function(e, n, t) {
            t.d(n, "b", (function() {
                return o
            })), t.d(n, "c", (function() {
                return a
            })), t.d(n, "a", (function() {}));
            var o = function() {
                    this.$createElement;
                    var e = (this._self._c, this.isAgree.length),
                        n = this.isAgree.length;
                    this.$mp.data = Object.assign({}, {
                        $root: {
                            g0: e,
                            g1: n
                        }
                    })
                },
                a = []
        },
        6708: function(e, n, t) {
            t.r(n);
            var o = t("0cba"),
                a = t.n(o);
            for (var i in o)["default"].indexOf(i) < 0 && function(e) {
                t.d(n, e, (function() {
                    return o[e]
                }))
            }(i);
            n.default = a.a
        },
        "87ba": function(e, n, t) {
            var o = t("d9ae");
            t.n(o).a
        },
        d9ae: function(e, n, t) {},
        eab3: function(e, n, t) {
            (function(e, n) {
                var o = t("4ea4");
                t("de51"), o(t("66fd"));
                var a = o(t("4aca"));
                e.__webpack_require_UNI_MP_PLUGIN__ = t, n(a.default)
            }).call(this, t("bc2e").default, t("543d").createPage)
        }
    },
    [
        ["eab3", "common/runtime", "common/vendor"]
    ]
]);