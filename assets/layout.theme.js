!(function (e) {
  function t(t) {
    for (
      var s, i, n = t[0], r = t[1], d = t[2], c = 0, f = [];
      c < n.length;
      c++
    )
      (i = n[c]),
        Object.prototype.hasOwnProperty.call(o, i) && o[i] && f.push(o[i][0]),
        (o[i] = 0);
    for (s in r) Object.prototype.hasOwnProperty.call(r, s) && (e[s] = r[s]);
    for (u && u(t); f.length; ) f.shift()();
    return l.push.apply(l, d || []), a();
  }
  function a() {
    for (var e, t = 0; t < l.length; t++) {
      for (var a = l[t], s = !0, n = 1; n < a.length; n++) {
        var r = a[n];
        0 !== o[r] && (s = !1);
      }
      s && (l.splice(t--, 1), (e = i((i.s = a[0]))));
    }
    return e;
  }
  var s = {},
    o = { 2: 0 },
    l = [];
  function i(t) {
    if (s[t]) return s[t].exports;
    var a = (s[t] = { i: t, l: !1, exports: {} });
    return e[t].call(a.exports, a, a.exports, i), (a.l = !0), a.exports;
  }
  (i.m = e),
    (i.c = s),
    (i.d = function (e, t, a) {
      i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a });
    }),
    (i.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (i.t = function (e, t) {
      if ((1 & t && (e = i(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var a = Object.create(null);
      if (
        (i.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var s in e)
          i.d(
            a,
            s,
            function (t) {
              return e[t];
            }.bind(null, s)
          );
      return a;
    }),
    (i.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return i.d(t, "a", t), t;
    }),
    (i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (i.p = "");
  var n = (window.shopifySlateJsonp = window.shopifySlateJsonp || []),
    r = n.push.bind(n);
  (n.push = t), (n = n.slice());
  for (var d = 0; d < n.length; d++) t(n[d]);
  var u = r;
  l.push([317, 0]), a();
})({
  20: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.default = n),
      (t.populateNormalCart = r);
    var s = l(a(2)),
      o = l(a(22));
    function l(e) {
      return e && e.__esModule ? e : { default: e };
    }
    n(),
      (0, s.default)(".cart-item--static").length &&
        (h(),
        (0, s.default)(".cart-item__toggle-prescription-table").on(
          "click",
          function (e) {
            e.preventDefault(),
              (e = (0, s.default)(this).attr("href")),
              (e = (0, s.default)(e)),
              (0, s.default)(this).find(".toggle-icon").toggleClass("open"),
              e.find(".cart-item__prescription-table").slideToggle();
          }
        ),
        d(),
        u(),
        p(1e3, 5e3)),
      (0, s.default)(window).on("load scroll resize", function () {
        m();
      });
    var i = !1;
    function n() {
      var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0],
        t =
          1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : ".cart-drawer";
      e && (0, s.default)(t).addClass("loading-icon"),
        s.default
          .ajax({ url: "/cart", type: "GET" })
          .done(function (e) {
            if (typeof freeGiftInject === "function") {
              freeGiftInject();
            }

            var a = (0, s.default)(".js-cart-drawer-container"),
              k = (0, s.default)(".js-cart-drawer-callout-container"),
              l = (0, s.default)(".js-cart-btn"),
              dc = (0, s.default)(e)
                .find(".js-cart-drawer-callout-ajax")
                .html(),
              i = (0, s.default)(e).find(".js-cart-drawer-ajax").html(),
              e = (0, s.default)(e).find(".item-counter").text();

            a.html(i),
              k.html(dc),
              l.find(".btn-cart__counter").text(e),
              (0, s.default)(t).removeClass("loading-icon"),
              m(),
              (0, s.default)(".cart-drawer .cart-widget__item").length
                ? ((0, s.default)(".cart-progress").show(),
                  (0, s.default)(".cart-drawer").removeClass(
                    "cart-drawer__empty"
                  ),
                  (l =
                    ((e =
                      3 <
                      (l = (0, s.default)(
                        ".cart-widget__total-value.total"
                      ).data("value")).length
                        ? l.replace(/[^\d]/g, "")
                        : l) /
                      100) *
                    100),
                  (0, s.default)(".cart-progress-bar__filled").css({
                    width: l + "%",
                  }),
                  100 <= e
                    ? ((0, s.default)(".cart-progress-status")
                        .addClass("complete")
                        .removeClass("incomplete")
                        .text("Congrats! You get free shipping ✨"),
                      (0, s.default)(
                        ".cart-widget .cart-widget__total.shipping .cart-widget__total-value"
                      ).text("Computed at checkout"))
                    : ((0, s.default)(".cart-progress-status")
                        .addClass("incomplete")
                        .removeClass("complete")
                        .text(
                          "Add $" + (100 - e) + " more to get free shipping"
                        ),
                      (0, s.default)(
                        ".cart-widget .cart-widget__total.shipping .cart-widget__total-value"
                      ).text("Computed at checkout"))) // $20
                : ((0, s.default)(".cart-drawer").addClass(
                    "cart-drawer__empty"
                  ),
                  (0, s.default)(".cart-progress").hide()),
              new o.default().init();
          })
          .fail(function () {
            (0, s.default)(t).removeClass("loading-icon"),
              console.log("error populate cart");
          });
    }
    function r() {
      var e =
        0 < arguments.length && void 0 !== arguments[0]
          ? arguments[0]
          : ".js-cart-section";
      s.default
        .ajax({ url: "/cart", type: "GET" })
        .done(function (t) {
          if (typeof freeGiftInject === "function") {
            freeGiftInject();
          }

          var a = (0, s.default)(".js-cart-section "),
            l = (0, s.default)(".section__body"),
            i = (0, s.default)(".js-cart-btn"),
            n = (0, s.default)(t).find(".js-cart-section").html(),
            r = (0, s.default)(t).find(".section__body").html(),
            c = (0, s.default)(t).find(".item-counter").text();
          (0, s.default)(t).find(".cart-item--static").length
            ? (l.html(r), h())
            : a.html(n),
            i.find(".btn-cart__counter").text(c),
            (0, s.default)(e).removeClass("loading-icon"),
            new o.default().init(),
            d(),
            u(),
            p(500, 3e3);
        })
        .fail(function () {
          alert("failed"),
            (0, s.default)(e).removeClass("loading-icon"),
            console.log("error populate normal cart");
        });
    }
    function d() {
      (0, s.default)(".cart-product-upsell").length &&
        (0, s.default)(window).width() < 992 &&
        ((0, s.default)(".cart-static").append(
          (0, s.default)(".cart-product-upsell")
        ),
        setTimeout(function () {
          (0, s.default)(".cart-product-upsell").fadeIn();
        }, 500));
    }
    function u() {
      (0, s.default)(window).width() < 992 &&
        (0, s.default)(".section__head-left h1").on("click", function () {
          // (0, s.default)(this).toggleClass("collapsed"),
            // (0, s.default)(".cart-static__items-wrapper").slideToggle();
        });
    }
    function c(e) {
      return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function f(e, t) {
      var a = setInterval(function () {
          var e, t, l, i, n;
          console.log("Processing: Checking for dcode info..."),
            (0, s.default)("#dcodeInfo").length &&
              (console.log("Success: Dcode info found"),
              clearInterval(a),
              (o = !0),
              (e = (0, s.default)(".cart-order-summary-total")),
              (n = (0, s.default)(".cart-static__row--total").data("value")),
              (t = (0, s.default)(
                ".dcode-discount-value-cell .dcode-discount-value"
              ).text()),
              (l = parseInt(3 < n.length ? n.replace(",", "") : n)),
              (n = (0, s.default)(
                ".dcodeTotalValue .dcode-total-value"
              ).text()),
              (n = +parseFloat(n).toFixed(2)),
              (i = 100 < l ? 0 : 15),
              (n = +parseFloat(n + i).toFixed(2)),
              e.text("$" + c(n)),
              (0, s.default)(".discount-value-placeholder").length &&
                (0, s.default)(".discount-value-placeholder").remove(),
              (0, s.default)("#dcodeInfo").append(
                '<p class="discount-value-placeholder">- $' + c(t) + "</p>"
              ),
              (0, s.default)(".dcDiscountBox button").on("click", function () {
                e.text("$" + c(l + i));
              }));
        }, e),
        o = !1;
      setTimeout(function () {
        o ||
          (console.log("Failed: There is no discount applied yet."),
          clearInterval(a));
      }, t);
    }
    function p(e, t) {
      var a = setInterval(function () {
          console.log("Processing: Waiting for dcode element"),
            (0, s.default)("#dcodeOuterWrapper").length &&
              (console.log("Success: Dcode element is ready"),
              f(500, 1e4),
              clearInterval(a),
              (o = !0),
              (0, s.default)("#dcodeSubmit").on("click", function () {
                "" !== (0, s.default)("#dcodeInput").val() &&
                  (console.log("applying code in progress..."),
                  f(1e3, 1e4),
                  setTimeout(function () {
                    o || clearInterval(a);
                  }, 5e3));
              }),
              (0, s.default)("#dcodeInput").on("keydown", function (e) {
                "Enter" == e.key &&
                  (console.log("applying code in progress..."),
                  f(1e3, 1e4),
                  setTimeout(function () {
                    o || clearInterval(a);
                  }, 5e3));
              }));
        }, e),
        o = !1;
      setTimeout(function () {
        o || (console.log("Failed: Dcode not found"), clearInterval(a));
      }, t);
    }
    function h() {
      var e =
          3 <
          (t = (0, s.default)(".cart-static__row--total").data("value")).length
            ? t.replace(/[^\d]/g, "")
            : t,
        t = (e / 100) * 100;
      (0, s.default)(".cart-progress-bar__filled").css({ width: t + "%" }),
        100 <= e
          ? ((0, s.default)(".cart-progress-status")
              .addClass("complete")
              .removeClass("incomplete")
              .text("Congrats! You get free shipping ✨"),
            (0, s.default)(".cart-static--shipping").text("Computed at checkout"))
          : ((0, s.default)(".cart-progress-status")
              .addClass("incomplete")
              .removeClass("complete")
              .text("Add $" + (100 - e) + " more to get free shipping"),
            (0, s.default)(".cart-static--shipping").text("Computed at checkout")); // $20
    }
    function m() {
      var e =
        ((0, s.default)(window).width() -
          (0, s.default)(".header .shell").width()) /
        2;
      (0, s.default)(".cart-drawer").css({ right: e }),
        (0, s.default)("html").removeClass("no-scroll");
    }
    (0, s.default)(".js-cart-btn")
      .on("mouseover", function (e) {
        (0, s.default)(".cart-drawer").addClass(""),
          m(),
          (0, s.default)(".cart-drawer")
            .on("mouseover", function () {
              (0, s.default)("html, body").addClass("no-scroll"), (i = !0);
            })
            .on("mouseleave", function () {
              (0, s.default)(".cart-drawer").removeClass("expanded"),
                (0, s.default)("html, body").removeClass("no-scroll"),
                (i = !1);
            });
      })
      .on("mouseleave", function () {
        setTimeout(function () {
          !i &&
            (0, s.default)(".cart-drawer").hasClass("expanded") &&
            ((0, s.default)("html, body").removeClass("no-scroll"),
            (0, s.default)(".cart-drawer").removeClass("expanded"));
        }, 500);
      }),
      (0, s.default)(document).on("click", ".js-cart-remove", function (e) {
        e.preventDefault();
        var t = (0, s.default)(this).attr("href"),
            e = (0, s.default)(this).data("lensKey"),
            a = (0, s.default)(this).parent().hasClass("js-remover-parent"),
            flaskKey = (0, s.default)(this).data("flaskBundleKey");
        function o() {
          if(!flaskKey){
            s.default
              .ajax({
                url: t,
                type: "GET",
                beforeSend: function () {
                  (0, s.default)(".cart-drawer, .section-cart").addClass(
                    "loading-icon"
                  );
                },
              })
              .done(function () {
                (a ? r : n)();
                window.location.reload();
              })
              .fail(function () {
                (0, s.default)(".cart-drawer, .section-cart").removeClass(
                  "loading-icon"
                ),
                  console.log("error cart remove");
              });
            }
            else{
              async function removeFlask() {
                let bundleKeys = flaskKey;
                let bundleKeyArray = bundleKeys.split(' ');
                try {
                  for (const key of bundleKeyArray) {
                    const response = await fetch(window.Shopify.routes.root + 'cart/change.js', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        'id': key,
                        'quantity': 0
                      })
                    });
              
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                    else{
                      $(".cart-drawer, .section-cart").addClass("loading-icon");
                    }
                  }
                } catch (error) {
                  console.error('Error:', error);
                } finally {
                
                    (a ? r : n)()
                }
              }
              removeFlask();
              (a ? r : n)()
            }
        }
        if (!!e) {
          ((e = "/cart/change.js?id=" + e + "&quantity=0"),
             r.default
             .ajax({
              url: e,
              type: "POST",
            })
             .done(function () {
              o();
            })
             .fail(function (e) {
              console.log(e);
            }))
        } else {
          o();
        }
      });
  },
  22: function (e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var s = n(a(84)),
      o = n(a(8)),
      l = n(a(9)),
      i = n(a(11));
    function n(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function r() {
      var e;
      (0, o.default)(this, r),
        (this.guestData =
          null === localStorage.getItem("guestData")
            ? null
            : JSON.parse(localStorage.getItem("guestData"))),
        (this.data = []),
        (this.prescriptionLookupTables = document.querySelectorAll(
          ".js-prescription-table"
        )),
        (this.orderWrapper = document.querySelector(".js-order-wrapper")),
        (this.loggedin_email = this.orderWrapper.dataset.email),
        this.loggedin_email
          ? null === this.guestData
            ? (this.email_address = this.loggedin_email)
            : (this.email_address =
                this.loggedin_email + "," + this.guestData.email_address)
          : (this.email_address =
              null != this.guestData ? this.guestData.email_address : ""),
        (this.url =
          "https://www.sunniessystems.com/api/3.0/324566/prescriptions/"),
        (this.apiKey = "052398FSOWRI2UR7FHJKG789403JHFSA"),
        (this.headers = { "oassis-api-key": this.apiKey }),
        (this.params =
          ((e = {
            email_address: this.email,
            client_id: "95jgnvudiht03075kdhfrw256789dhif",
            patient_id: "",
          }),
          (0, s.default)(e, "email_address", this.email_address),
          (0, s.default)(e, "client_id", "95jgnvudiht03075kdhfrw256789dhif"),
          (0, s.default)(e, "patient_id", ""),
          e));
    }
    (0, l.default)(r, [
      {
        key: "init",
        value: function () {
          var e = this,
            t = this.prescriptionLookupTables,
            a = this.url,
            s = this.headers,
            o = this.params;
          0 < t.length &&
            (0, i.default)({ url: a, method: "get", headers: s, params: o })
              .then(function (t) {
                return e.mapPrescription(t.data), !0;
              })
              .catch(function (e) {
                console.log(e);
              });
        },
      },
      {
        key: "mapPrescription",
        value: function (e) {
          var t = this.data,
            a = e.prescriptions_historical.concat(e.prescriptions_processing),
            s = !0,
            o = !1,
            l = void 0;
          try {
            for (
              var i = a[Symbol.iterator]();
              !(s = (n = i.next()).done);
              s = !0
            ) {
              var n = {
                id: (n = n.value).prescription_id,
                row_id: n.row_id,
                prescriptionSet: !1,
                newPrescription: !1,
                store: n.branch_name,
                date: n.date_updated,
                type: n.prescription_purpose,
                left: {
                  sph: n.sph_os,
                  cyl: n.cyl_os,
                  axis: n.axis_os,
                  add: n.add_os,
                  ipd: n.ipd_os,
                  ph: n.ph_os,
                },
                right: {
                  sph: n.sph_od,
                  cyl: n.cyl_od,
                  axis: n.axis_od,
                  add: n.add_od,
                  ipd: n.ipd_od,
                  ph: n.ph_od,
                },
                frame: n.frame_name,
                lens: n.lens_name,
              };
              t.push(n);
            }
          } catch (e) {
            (o = !0), (l = e);
          } finally {
            try {
              !s && i.return && i.return();
            } finally {
              if (o) throw l;
            }
          }
          this.buildTables(t);
        },
      },
      {
        key: "buildTables",
        value: function (e) {
          var t = this.prescriptionLookupTables,
            a = !0,
            s = !1,
            o = void 0;
          try {
            for (
              var l, i = t[Symbol.iterator]();
              !(a = (l = i.next()).done);
              a = !0
            )
              !(function (t) {
                var a = t.dataset.prescriptionId,
                  s = e.filter(function (e) {
                    return e.prescription_id === a || e.id === a;
                  })[0];
                (t.querySelector('[data-type="os-sph"]').innerText =
                  s.left.sph),
                  (t.querySelector('[data-type="os-cyl"]').innerText =
                    s.left.cyl),
                  (t.querySelector('[data-type="os-axis"]').innerText =
                    s.left.axis),
                  (t.querySelector('[data-type="os-add"]').innerText =
                    s.left.add),
                  (t.querySelector('[data-type="os-ipd"]').innerText =
                    s.left.ipd),
                  (t.querySelector('[data-type="od-sph"]').innerText =
                    s.right.sph),
                  (t.querySelector('[data-type="od-cyl"]').innerText =
                    s.right.cyl),
                  (t.querySelector('[data-type="od-axis"]').innerText =
                    s.right.axis),
                  (t.querySelector('[data-type="od-add"]').innerText =
                    s.right.add),
                  (t.querySelector('[data-type="od-ipd"]').innerText =
                    s.right.ipd);
              })(l.value);
          } catch (e) {
            (s = !0), (o = e);
          } finally {
            try {
              !a && i.return && i.return();
            } finally {
              if (s) throw o;
            }
          }
        },
      },
    ]),
      (l = r),
      (t.default = l);
  },
  317: function (e, t, a) {
    "use strict";
    var s,
      o = (s = a(2)) && s.__esModule ? s : { default: s };
    a(327),
      a(328),
      a(329),
      a(330),
      a(77),
      a(331),
      a(332),
      a(333),
      a(334),
      a(335),
      a(336),
      a(337),
      a(338),
      a(20),
      a(360),
      a(361),
      a(362),
      a(363),
      a(364),
      a(365),
      a(366),
      a(433),
      (0, (a = a(367)).focusHash)(),
      (0, a.bindInPageLinks)(),
      window.navigator.cookieEnabled &&
        (document.documentElement.className =
          document.documentElement.className.replace(
            "supports-no-cookies",
            "supports-cookies"
          ));
    var l,
      i,
      n,
      r,
      d = "",
      u = "",
      c = [
        {
          featureType: "administrative",
          elementType: "all",
          stylers: [{ visibility: "on" }, { lightness: 33 }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2e5d4" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#c5dac6" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels",
          stylers: [{ visibility: "on" }, { lightness: 20 }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ lightness: 20 }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#c5c6c6" }],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#e4d7c6" }],
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [{ color: "#fbfaf7" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ visibility: "on" }, { color: "#acbcc9" }],
        },
      ];
    function f() {
      (0, o.default)(".map").each(function () {
        (l = (0, o.default)(this).data("lat")),
          (i = (0, o.default)(this).data("lng")),
          (r = (0, o.default)(this).data("zoom")),
          (n = (0, o.default)(this).data("ico")),
          "" !== (0, o.default)(this).data("styles") &&
            (c = (0, o.default)(this).data("styles")),
          (r = { center: new google.maps.LatLng(l, i), zoom: r, styles: c }),
          (d = new google.maps.Map((0, o.default)(this).get(0), r)),
          (u = new google.maps.Marker({ position: d.getCenter(), map: d }));
        var e = new google.maps.InfoWindow({
          content: (0, o.default)(this).data("tooltip"),
        });
        "undefined" !== n && u.setIcon(n),
          e.open(d, u),
          u.addListener("click", function () {
            e.open(d, u);
          });
      });
    }
    (0, o.default)(".map").length &&
      (google.maps.event.addDomListener(window, "load", f),
      (d = { initialize: f }),
      (0, o.default)(function () {
        (0, o.default)(window).load(function () {
          d.initialize();
        });
      }));
  },
  332: function (e, t, a) {
    "use strict";
    var s = (a = a(2)) && a.__esModule ? a : { default: a },
      o = ((a = document.cookie), new Date());
    o.setDate(o.getDate() + 3),
      (0, s.default)(window).on("load scroll resize", function () {
        var e = (0, s.default)(".js-top-bar"),
          t = (0, s.default)(".header");
        (0, s.default)("body").hasClass("disable-top-bar") ||
          (t.hasClass("header-is-fixed")
            ? ((0, s.default)("body").addClass("has-header-bar"),
              e.slideUp(),
              e.addClass("sliding-up"),
              t.addClass("delay-color-transition"),
              setTimeout(function () {
                t.removeClass("delay-color-transition");
              }, 800),
              setTimeout(function () {
                (0, s.default)("body, html").hasClass("expand-search") &&
                  (0, s.default)(".js-trigger-srch-field").trigger("click");
              }, 500))
            : ((0, s.default)("body").removeClass("has-header-bar"),
              e.slideDown(),
              e.removeClass("sliding-up"),
              t.removeClass("delay-color-transition")));
      }),
      -1 < a.indexOf("bar=;") &&
        ((0, s.default)(".js-top-bar").addClass("top-bar-closed").hide(),
        (0, s.default)("body").addClass("disable-top-bar")),
      (0, s.default)(".js-close-top-bar").on("click", function (e) {
        e.preventDefault(),
          (document.cookie = "bar=; expires=" + o + "; path=/; "),
          (0, s.default)("body").addClass("disable-top-bar"),
          (0, s.default)(".js-top-bar").slideUp().addClass("top-bar-closed");
      });
  },
  333: function (e, t, a) {
    "use strict";
    var s = (a = a(2)) && a.__esModule ? a : { default: a };
    (0, s.default)(window).on("load scroll resize", function () {
      (0, s.default)(window).scrollTop() >
      (0, s.default)(".header").outerHeight()
        ? (0, s.default)(".header").addClass("header-is-fixed")
        : (0, s.default)(".header").removeClass("header-is-fixed");
    }),
      (0, s.default)(window).on("load", function () {
        var e = (0, s.default)(".account-dropdown__toggle").text();
        (0, s.default)(".mega-menu-mobile__links").hasClass("logged-in")
          ? (0, s.default)(
              ".js-mega-menu-mobile .mega-menu-mobile__links > ul:nth-child(1)"
            ).append(
              '<li class="menu__item menu__item--has-dropdown">\n      <a class="menu__item menu__item--has-dropdown" href="/account">Account</a>\n      <div class="menu__dropdown">\n        <div class="heading">\n          <h2>\n            <a href="/pages/prescription-types-of-vision">\n              <span>' +
                e +
                '</span>\n            </a>\n          </h2>\n        </div>\x3c!-- /.heading --\x3e\n        <ul>\n          <li class="menu__item"><a class="menu__item" href="/account">MY ACCOUNT</a></li>\n          <li class="menu__item"><a class="menu__item" href="/account?module=order-history">ORDER HISTORY</a></li>\n          <li class="menu__item"><a class="menu__item" href="/pages/shipping-returns">SHIPPING INFO</a></li>\n          <li class="account-dropdown_divider"></li>\n          <li class="menu__item logout"><a class="menu__item" href="/account/logout">LOG OUT</a></li>\n        </ul>\n      </div>\n    </li>'
            )
          : (0, s.default)(
              ".js-mega-menu-mobile .mega-menu-mobile__links > ul:nth-child(1)"
            ).append(
              '<li class="menu__item"><a href="/account">Account</a></li>'
            ),
          (0, s.default)(".js-mega-menu-mobile .mega-menu-mobile__links a").on(
            "click",
            function (e) {
              var t = (l = (0, s.default)(this)).closest(".menu__dropdown"),
                a = l.closest("li").find("> .menu__dropdown"),
                o = t.find(".menu__dropdown"),
                l =
                  ((t =
                    (l.closest(".heading").find("h1"),
                    t.find("> .heading h2").find("a"),
                    l.hasClass("menu__item--has-dropdown") &&
                      !l.parents(".menu__dropdown.open").length)),
                  l.hasClass("false"));
              t && e.preventDefault(),
                t && a.addClass("open"),
                l && (e.preventDefault(), o.removeClass("open"));
            }
          ),
          (0, s.default)(".js-mega-menu-mobile h2").on("click", function (e) {
            e.preventDefault(),
              (0, s.default)(this)
                .closest(".menu__dropdown")
                .removeClass("open");
          });
      }),
      (0, s.default)(".js-mega-menu").length &&
        768 <= (0, s.default)(window).width() &&
        ((0, s.default)(
          ".js-mega-menu > ul > .menu__item--has-dropdown > .menu__dropdown"
        ).each(function () {
          (0, s.default)(this).wrap(
            '<div class="mega-menu"><div class="mega-menu__inner"></div></div>'
          );
        }),
        (0, s.default)(".js-mega-menu > ul > .menu__item--has-dropdown").hover(
          function () {
            (0, s.default)(".global-overlay-navigation").addClass(
              "show-overlay"
            );
          },
          function () {
            (0, s.default)(".global-overlay-navigation").removeClass(
              "show-overlay"
            );
          }
        )),
      (0, s.default)(".js-btn-burger").on("click", function (e) {
        e.preventDefault(),
          (0, s.default)("body").toggleClass("open-menu"),
          (0, s.default)("body").hasClass("open-menu") ||
            (0, s.default)("body").removeClass(
              "bc-sf-search-suggestion-mobile-open"
            );
      });
    var o = !1,
      l = (0, s.default)(".account-dropdown");
    function i(e) {
      for (
        var t = window.location.search.substring(1).split("&"), a = 0;
        a < t.length;
        a++
      ) {
        var s = t[a].split("=");
        if (s[0] == e) return s[1];
      }
      return !1;
    }
    (0, s.default)(".account-dropdown__toggle")
      .on("mouseover", function () {
        l.fadeIn().addClass("open"),
          l
            .on("mouseover", function () {
              l.addClass("open"), (o = !0);
            })
            .on("mouseleave", function () {
              l.fadeOut().removeClass("open"), (o = !1);
            });
      })
      .on("mouseleave", function () {
        setTimeout(function () {
          !o && l.hasClass("open") && l.fadeOut().removeClass("open");
        }, 500);
      }),
      (0, s.default)(document).ready(function () {
        var e;
        (0, s.default)("body#account").length &&
          "" != i("module") &&
          ((e = i("module")),
          (0, s.default)(".Customer__sidebar-toggle").each(function () {
            (0, s.default)(this).data("target") === e
              ? (0, s.default)(this).addClass("active")
              : (0, s.default)(this).removeClass("active");
          }),
          (0, s.default)(".Customer__module").each(function () {
            (0, s.default)(this).data("module") === e
              ? (0, s.default)(this).removeClass("hide")
              : (0, s.default)(this).addClass("hide");
          }),
          (0, s.default)(".js-sidebar-title").text("ORDER HISTORY"));
      });
  },
  334: function (e, t, a) {
    "use strict";
    var s = (a = a(2)) && a.__esModule ? a : { default: a };
    (0, s.default)("#geo-redirect-select").on("change", function () {
      var e =
        "peso" == (0, s.default)(this).val()
          ? "https://ph.sunniesstudios.com/?r=php"
          : "https://sunniesstudios.com/?r=usd";
      (0, s.default)(this).toggleClass("currency-php currency-usd"),
        window.open(e, "_parent");
    }),
      (0, s.default)(window).on("resize load", function () {
        var e =
          1024 <= (0, s.default)(this).outerWidth()
            ? (0, s.default)(
                ".footer__aside-cols div:last-of-type"
              ).outerWidth()
            : "auto";
        (0, s.default)(".currency-container").css("width", e);
      }),
      (0, s.default)(window).on("load", function () {
        (0, s.default)(this).outerWidth() <= 767 &&
          (0, s.default)(
            ".secondary-col, .footer__aside-col .menu__item--has-dropdown"
          ).on("click", function () {
            (0, s.default)(this).toggleClass("open").find("ul").slideToggle();
          });
      });
  },
  335: function (e, t, a) {
    "use strict";
    var s = (a = a(2)) && a.__esModule ? a : { default: a };
    (0, s.default)(document).on("click", ".js-accordion-head", function (e) {
      e.preventDefault(),
        (e = (0, s.default)(this))
          .parent()
          .toggleClass("is-active-accordion")
          .find(".accordion__body")
          .slideToggle(),
        e
          .parent()
          .siblings()
          .removeClass("is-active-accordion")
          .find(".accordion__body")
          .slideUp();
    }),
      (0, s.default)(".js-accordion").length &&
        setTimeout(function () {
          (0, s.default)(
            ".js-accordion > .accordion__section:first-child > .js-accordion-head"
          ).trigger("click");
        }, 500);
  },
  336: function (e, t, a) {
    "use strict";
    var u =
      (a = a(2)) && a.__esModule
        ? a
        : {
            default: a,
          };
    (0, u.default)(document).on(
      "click",
      ".js-product-item-swatch",
      function (e) {
        e.preventDefault();
        var t = (0, u.default)(this),
          a = t.parents(".js-product-item"),
          o = t.data("swatch-vid"),
          s = a.find("[data-image-variant=" + o + "]"),
          l = s.data("bg-src"),
          i = a.find("[data-vid-price=" + o + "]"),
          n = a.find("[data-vid-color=" + o + "]"),
          r = a.find(".js-list-badges"),
          d = a.find(".js-item-stock"),
          e = i.data("stock-inventory"),
          o = t.data("swatch-link"),
          fl = t.data("item-type") ? t.data("item-type").toLowerCase() : ""; // flask changes

        const hasStock = t.parent().attr("data-swatch-disabled") === undefined;
        const isVariantOutOfStock = !hasStock;

        var currentVariantIdBcSf = t.data("swatch-vid");
        const productId = t.data("product-id");
  
        // Update the .swym-button element's data-variant-id attribute
        const swymButton = a.find(".swym-button");
        if (swymButton.length) {
          swymButton.attr("data-variant-id", currentVariantIdBcSf);
          document.dispatchEvent(new CustomEvent("swym:collections-loaded"));
          console.log("dispatched");
        }
  
        const waitlistProductActions = $(
          `.waitlist-product-actions-${productId}`
        );
        waitlistProductActions.attr("data-variant-id", currentVariantIdBcSf);

        const productActionsEl = t.parent().parent().parent().siblings();
        const hasAllVariantsOutOfStock =
          productActionsEl.attr("id") === "waitlist-product-actions";
        const hasNotYetConverted = !productActionsEl.find(
          `.join-the-waitlist-text-${productId}`
        ).length;
        // flask changes
        if(fl == 'flask_main'){
          $(`.join-the-waitlist-text-${productId}`).remove();
          productActionsEl.attr("id", "");
          productActionsEl.attr("onclick", "");
          const quickAddBtn = productActionsEl.find(".btn-quick-add");
          const btnCustomText = quickAddBtn.data("btnCustomText");
          quickAddBtn.html(`<span></span>Customize`);
          quickAddBtn.removeData("pre-order");
        }
        // flask changes
        else{
          if (isVariantOutOfStock) {
            if (!hasAllVariantsOutOfStock) {
              if (hasNotYetConverted) {
                productActionsEl.prepend(
                  `<a class="join-the-waitlist-text join-the-waitlist-text-${productId}"  href="javascript:void(0)" style="display: block"><span></span>Join the waitlist</a>`
                );
              }
              productActionsEl.attr("id", "waitlist-product-actions-converted");
              productActionsEl.attr(
                "onclick",
                `openWaitlistModal(${productId}, ${currentVariantIdBcSf})`
              );
            }
          } else {
            $(`.join-the-waitlist-text-${productId}`).remove();
            productActionsEl.attr("id", "");
            productActionsEl.attr("onclick", "");
          }
        }

        const shownImage = s.slice(0, 1);
        const hiddenImage = s.slice(1, 2);
        const hiddenBgSrc = hiddenImage.data("bg-src");

        const imageUrl =
          l.toLowerCase().indexOf("https:") === -1 ? `https:${l}` : l;

        shownImage.css({
          "background-image": "url(" + imageUrl + ")",
        });

        hiddenImage.css({
          "background-image": "url(" + hiddenBgSrc + ")",
        });

        s.parent()
          .children()
          .removeClass("current-image-variant")
          .parents("a")
          .attr("href", o);

        s.parent().siblings().children().removeClass("current-image-variant");

        s.addClass("current-image-variant");

        0 < r.length &&
          (d.remove(),
          (d =
            '<li class="js-item-stock"><small>Only ' +
            e +
            " left</small></li>"),
          e < 4 && r.append(d)),
          n
            .addClass("current-color-name")
            .siblings()
            .removeClass("current-color-name")
            .parents("a")
            .attr("href", o),
          i
            .addClass("current-price-variant")
            .siblings()
            .removeClass("current-price-variant"),
          t
            .parent()
            .addClass("current-swatch-variant")
            .siblings()
            .removeClass("current-swatch-variant"),
          a.removeClass("product-item--sold-out");
      }
    );
  },
  337: function (e, t, a) {
    "use strict";
    var s = (l = a(2)) && l.__esModule ? l : { default: l };
    a(53);
    var o = (0, s.default)(".slider-featured-products"),
      l = (0, s.default)(".slider-section-carousel"),
      i = (0, s.default)(".slider-testi"),
      g = (0, s.default)(".slider-testi-new"),
      n = (0, s.default)(".slider-nav-thumbnails"),
      j = (0, s.default)(".slider-nav-thumbnails-new");
    (a = (0, s.default)(".slider-instagram")),
      (s = (0, s.default)(".js-slider-base"));
    o.length &&
      o.slick({
        slidesToScroll: 4,
        slidesToShow: 4,
        dots: !0,
        arrows: !0,
        infinite: !0,
        variableWidth: !0,
        adaptiveHeight: !0,
        responsive: [
          {
            breakpoint: 1024,
            settings: { slidesToShow: 2, slidesToScroll: 2 },
          },
          { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: !1,
              infinite: !0,
            },
          },
        ],
      }),
      l.length &&
        l.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: !0,
          arrows: !1,
          infinite: !0,
          autoplay: !0,
          autoplaySpeed: 3e3,
          responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
          ],
        }),
      i.length &&
        i.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: !1,
          arrows: !1,
          infinite: !0,
          autoplay: !0,
          asNavFor: ".slider-nav-thumbnails",
          adaptiveHeight: !0,
          autoplaySpeed: 7e3,
          responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1, dots: !1 } },
          ],
        }),
      g.length &&
        g.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: !1,
          arrows: !1,
          infinite: !0,
          autoplay: !0,
          fade: true,
          asNavFor: ".slider-nav-thumbnails-new",
          adaptiveHeight: !0,
          autoplaySpeed: 7e3,
          responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1, dots: !1 } },
          ],
        }),
      n.length &&
        n.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: !0,
          arrows: !1,
          infinite: !0,
          autoplay: !0,
          autoplaySpeed: 7e3,
          asNavFor: ".slider-testi",
          focusOnSelect: !0,
          variableWidth: !0,
          responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1, dots: !0 } },
          ],
        }),
      j.length &&
        j.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: !0,
          arrows: !1,
          infinite: !0,
          autoplay: !0,
          autoplaySpeed: 7e3,
          asNavFor: ".slider-testi-new",
          focusOnSelect: !0,
          variableWidth: !0,
          responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1, dots: !0 } },
          ],
        }),
      a.length &&
        a.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: !0,
          arrows: !0,
          infinite: !0,
        }),
      s.length &&
        s.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: !0,
          arrows: !0,
          infinite: !0,
          fade: !0,
          cssEase: "linear",
        });
  },
  338: function (e, t, a) {
    "use strict";
    var s,
      o = (s = a(2)) && s.__esModule ? s : { default: s };
    a(339), a(340);
    var l = a(341);
    a = (0, l.getCookie)("subscribe-hidden");
    (0, o.default)(document).on("submit", ".js-subscribe-ajax", function (e) {
      e.preventDefault();
      var t,
        a = (0, o.default)(this),
        s = this.querySelectorAll('[name="gender"]'),
        i = (a.attr("action"), ""),
        n = !0,
        r = !1,
        d = void 0;
      try {
        for (var u = s[Symbol.iterator](); !(n = (c = u.next()).done); n = !0) {
          var c = c.value;
          if (c.checked) {
            i = c.value;
            break;
          }
        }
      } catch (e) {
        (r = !0), (d = e);
      } finally {
        try {
          !n && u.return && u.return();
        } finally {
          if (r) throw d;
        }
      }
      (0, o.default)(this).validate({
        rules: {
          EMAIL: "required",
          "BIRTHDAY-month": "required",
          "BIRTHDAY-day": "required",
          "BIRTHDAY-year": "required",
        },
        messages: {
          EMAIL: "Please enter a valid email address",
          "BIRTHDAY-year": {
            required: "Required",
            max: "Must be {0} or lower",
            min: "Must be {0} or higher",
          },
          "BIRTHDAY-month": {
            required: "Required",
            max: "Must be {0} or lower",
            min: "Must be 0{0} or higher",
          },
          "BIRTHDAY-day": {
            required: "Required",
            max: "Must be {0} or lower",
            min: "Must be 0{0} or higher",
          },
        },
      }),
        (0, o.default)(this).valid() &&
          ((t = {
            list_id: "newsletter",
            email: this.querySelector('[name="email"]').value,
            gender: i,
            dob_month: this.querySelector('[name="BIRTHDAY-month"]').value,
            dob_day: this.querySelector('[name="BIRTHDAY-day"]').value,
            dob_year: this.querySelector('[name="BIRTHDAY-year"]').value,
          }),
          zaius.subscribe(t),
          a
            .find(".form__message")
            .attr("class", "form__message form__message--success")
            .html("YOU'RE IN!<br/>EXCITING THINGS IN YOUR INBOX SOON.")
            .fadeIn()
            .css("display", "inline-block"),
          a.find(".form__body").hide(),
          (0, l.setCookie)("subscribe-hidden", !0));
    });
  },
  341: function (e, t, a) {
    "use strict";
    e.exports = {
      setCookie: function (e, t, a) {
        var s,
          o = "";
        a &&
          ((s = new Date()).setTime(s.getTime() + 24 * a * 60 * 60 * 1e3),
          (o = "; expires=" + s.toUTCString())),
          (document.cookie = e + "=" + (t || "") + o + "; path=/");
      },
      getCookie: function (e) {
        for (
          var t = e + "=", a = document.cookie.split(";"), s = 0;
          s < a.length;
          s++
        ) {
          for (var o = a[s]; " " == o.charAt(0); ) o = o.substring(1, o.length);
          if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
        }
        return null;
      },
      eraseCookie: function (e) {
        document.cookie = e + "=; Max-Age=-99999999;";
      },
    };
  },
  360: function (e, t, a) {
    "use strict";
    var s,
      o = (s = a(2)) && s.__esModule ? s : { default: s };
    a(234);
    a = (0, o.default)(document);
    var l = 0;
    a.on("click", ".js-toggle-btn", function (e) {
      e.preventDefault();
      var t = (0, o.default)(this),
        a = t.data("ref");
      "expand-search" === t.data("type")
        ? ((0, o.default)("html").addClass("search-opened"),
          (0, o.default)("body").toggleClass("expand-search"),
          (0, o.default)("body").toggleClass("search-mobile-is-active"),
          (e = (0, o.default)(".header").outerHeight(!0)),
          (t =
            (0, o.default)(
              ".bc-sf-search-suggestion-mobile-top-panel"
            ).outerHeight(!0) + e),
          (0, o.default)(".bc-sf-search-suggestion-mobile-top-panel").css({
            top: e + "px",
          }),
          (e =
            ".bc-sf-search-suggestion-mobile.bc-sf-search-suggestion-mobile.bc-sf-search-suggestion-mobile {top:" +
            t +
            "px !important;height:calc(100% - " +
            t +
            "px) !important;}"),
          ((t = document.createElement("style")).type = "text/css"),
          t.styleSheet
            ? (t.styleSheet.cssText = e)
            : t.appendChild(document.createTextNode(e)),
          (0, o.default)(".js-search-mobile-styles-overwrite")
            .empty()
            .append(t),
          (0, o.default)(window).width() <= 767 &&
            (0, o.default)(".bc-sf-search-suggestion-mobile-top-panel")
              .find(".bc-sf-search-btn-close-suggestion")
              .removeAttr("onclick")
              .removeAttr("class")
              .addClass("bc-sf-search-btn-close-suggestion-custom"),
          setTimeout(function () {
            (0, o.default)(".js-trigger-srch-field").trigger("focus");
          }, 500))
        : ((0, o.default)(a).toggleClass("expanded"),
          (0, o.default)(".cart-drawer").hasClass("expanded") &&
          (0, o.default)(".top-bar--absolute").length
            ? ((0, o.default)(".top-bar--absolute").addClass(
                "display-top-bar-absolute"
              ),
              (l = (0, o.default)(window).scrollTop()),
              (0, o.default)("body")
                .attr("data-top", (0, o.default)(window).scrollTop())
                .css("top", -l),
              (0, o.default)("html").addClass("no-scroll"))
            : ((0, o.default)(".top-bar--absolute").removeClass(
                "display-top-bar-absolute"
              ),
              (0, o.default)("html").removeClass("no-scroll"),
              (0, o.default)("html,body").animate(
                { scrollTop: Number((0, o.default)("body").data("top")) },
                0
              )));
    }),
      (0, o.default)(".js-go-back-history").on("click", function (e) {
        e.preventDefault(), history.go(-1);
      }),
      (0, o.default)(".js-select-page select").on("change", function () {
        var e = (0, o.default)(this).find("option:selected").data("page-url");
        window.location.href = e;
      }),
      a.on("click", ".bc-sf-search-btn-close-suggestion", function () {
        console.log(1),
          (0, o.default)(".bc-sf-search-btn-clear-suggestion").trigger("click"),
          (0, o.default)("body").trigger("click");
      }),
      a.on("click", ".bc-sf-search-btn-close-suggestion-custom", function (e) {
        (0, o.default)(window).width() <= 767 &&
          (e.preventDefault(), (0, o.default)(this).parent().submit());
      });
  },
  361: function (e, t, a) {
    "use strict";
    var s = i(a(2)),
      o = a(20),
      l = i(o);
    function i(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (0, s.default)(document).on("click", ".js-quick-add", function (e) {
      e.preventDefault();
      const itemType1 = (0, s.default)(this)
        .parents(".js-product-item")
        .find(".current-price-variant")
        .data('item-type');

      const itemType2 = (0, s.default)(this).data('item-type');

      const itemType = itemType2 === undefined ? itemType1 : itemType2
      const id = (0, s.default)(this)
        .parents(".js-product-item")
        .find(".current-price-variant")
        .data("vid-price");
      const variantId = id
        ? id
        : e.target.parentElement.parentElement.dataset.variantId;
        const isPreorder = e.target.getAttribute("data-pre-order");
        let properties = {_item_type: itemType}
        if(isPreorder){
          properties = {...properties, "Order type": "Pre-order"}
        }

      "your-shopping-cart" === (0, s.default)("body").attr("id")
        ? s.default
            .ajax({
              url: "/cart/add.js",
              type: "POST",
              data: { id: variantId, quantity: 1 },
              dataType: "json",
              beforeSend: function () {
                (0, s.default)(".section-cart").addClass("loading-icon");
              },
            })
            .done(function () {
              handleCleanLensPromo();
              (0, o.populateNormalCart)();
            })
            .fail(function () {
              (0, s.default)(".section-cart").removeClass("loading-icon"),
                console.log("error cart remove");
            })
        : s.default
            .ajax({
              url: "/cart/add.js",
              type: "POST",
              data: { id: variantId, quantity: 1,
                properties },
              dataType: "json",
            })
            .done(function () {
              handleCleanLensPromo();
              (0, l.default)(!0),
                (0, s.default)(".cart-drawer, body").addClass("expanded"),
                (0, s.default)(".cart-drawer").hasClass("expanded") &&
                (0, s.default)(".top-bar--absolute").length
                  ? (0, s.default)(".top-bar--absolute").addClass(
                      "display-top-bar-absolute"
                    )
                  : (0, s.default)(".top-bar--absolute").removeClass(
                      "display-top-bar-absolute"
                    ),
                setTimeout(function () {
                  (0, s.default)(".cart-drawer").removeClass("expanded");
                }, 1500);
            })
            .fail(function () {
              console.log("error quick add");
            });
    });
  },
  362: function (e, t, a) {
    "use strict";
    var s = (a = a(2)) && a.__esModule ? a : { default: a };
    (0, s.default)("body").on("click", function (e) {
      (e = (0, s.default)(e.target)).hasClass("cart-drawer") ||
        e.parents(".cart-drawer").length ||
        e.hasClass("filters-drawer") ||
        e.parents(".filters-drawer").length ||
        e.hasClass("bc-sf-search-suggestion-wrapper") ||
        e.parents(".bc-sf-search-suggestion-wrapper").length ||
        e.hasClass("bc-sf-search-suggestion-mobile-top-panel") ||
        e.parents(".bc-sf-search-suggestion-mobile-top-panel").length ||
        e.hasClass("js-search-container") ||
        e.parents(".js-search-container").length ||
        e.hasClass("js-toggle-btn") ||
        e.parents(".js-toggle-btn").length ||
        e.hasClass("bc-sf-search-suggestion-mobile-overlay").length ||
        e.parents(".bc-sf-search-suggestion-mobile-overlay").length ||
        ((e = Number((0, s.default)("body").attr("data-top"))),
        (0, s.default)(".cart-drawer").removeClass("expanded"),
        (0, s.default)("body, .filters-drawer").removeClass("expanded"),
        (0, s.default)("html, body").removeClass("no-scroll expand-search"),
        (0, s.default)("body").removeClass("search-mobile-is-active"),
        (0, s.default)(".bc-sf-search-suggestion-mobile").css({
          display: "none",
        }),
        e &&
          (0, s.default)("html, body").animate(
            { scrollTop: Number((0, s.default)("body").attr("data-top")) },
            0
          ));
    });
  },
  363: function (e, t, a) {
    "use strict";
    var s = (a = a(2)) && a.__esModule ? a : { default: a },
      o = ((a = (0, s.default)(document)), (0, s.default)(window));
    a.on("click", ".js-filtered-items a", function (e) {
      e.preventDefault(),
        (e = (0, s.default)(this).attr("href")),
        (0, s.default)("#bc-sf-filter-tree")
          .find(".bc-sf-filter-selection-wrapper")
          .find('a[href="' + e + '"]')
          .find(".bc-sf-filter-clear")
          .trigger("click");
    }),
      a.on("click", ".bc-sf-filter-block-title h3", function () {
        var e = (0, s.default)(this);
        o.width() < 768 &&
          e
            .parent()
            .next(".bc-sf-filter-block-content")
            .slideDown()
            .closest(".bc-sf-filter-option-block")
            .siblings()
            .find(".bc-sf-filter-block-content")
            .slideUp();
      }),
      a.on("click", ".product-view__filter-list__item", function () {
        console.log((0, s.default)(this).data("view")),
          "list" === (0, s.default)(this).data("view")
            ? ((0, s.default)(".product-listing").addClass("list"),
              (0, s.default)(".list-view").addClass("selected"),
              (0, s.default)(".grid-view").removeClass("selected"))
            : ((0, s.default)(".product-listing").removeClass("list"),
              (0, s.default)(".list-view").removeClass("selected"),
              (0, s.default)(".grid-view").addClass("selected"));
      });
  },
  364: function (e, t, a) {
    "use strict";
    var s,
      o,
      l,
      i = (a = a(2)) && a.__esModule ? a : { default: a };
    (0, i.default)(".js-stockist-container").length &&
      ((0, i.default)(".js-stockist-container"),
      (a = (0, i.default)(".custom-map-items")),
      (s = a.find(".custom-image")),
      (o = a.find(".custom-title")),
      (l = a.find(".custom-sub-title")),
      (a = document.querySelector(".js-stockist-container")),
      new MutationObserver(function (e, t) {
        var a,
          n,
          r = !0,
          d = !1,
          u = void 0;
        try {
          for (
            var c, f = e[Symbol.iterator]();
            !(r = (c = f.next()).done);
            r = !0
          )
            if ("childList" === c.value.type)
              return (
                (a = s),
                (n = o),
                (c = l),
                !(0, i.default)(".stockist-intro").length &&
                  (0, i.default)(".stockist-search-form").length &&
                  ((0, i.default)(".stockist-search-form").wrap(
                    '<div class="stockist-intro" ><div class="stockist-intro__inner"></div></div>'
                  ),
                  (0, i.default)(".stockist-intro .stockist-intro__inner")
                    .prepend(a)
                    .prepend(n)),
                void (
                  (0, i.default)(".stockist-side-panel").length &&
                  !(0, i.default)(".appended").length &&
                  ((0, i.default)(".stockist-side-panel").prepend(c),
                  (0, i.default)(".stockist-side-panel").addClass("appended"))
                )
              );
        } catch (e) {
          (d = !0), (u = e);
        } finally {
          try {
            !r && f.return && f.return();
          } finally {
            if (d) throw u;
          }
        }
      }).observe(a, { attributes: !0, childList: !0, subtree: !0 }));
  },
  365: function (e, t, a) {
    "use strict";
    var s = (a = a(2)) && a.__esModule ? a : { default: a };
    (0, s.default)(window).on("load", function () {
      var e,
        t,
        a,
        o,
        l,
        i,
        n = this;
      "virtual-try-on" === (0, s.default)("body").attr("id") &&
        ((e = (0, s.default)(".js-ditto-popup")),
        (t = (0, s.default)("#dittoWrapper")),
        (0, s.default)(this).width() < 1024 &&
          (0, s.default)(".ditto-grid__item .item-frames")
            .appendTo("#dittoWrapper")
            .css("display", "flex"),
        (a = function () {
          var e = document.cookie.split(";").filter(function (e) {
            var t = e.split("=")[0].trim();
            e = e.split("=")[1].trim();
            return "ditto_id" === t && e;
          });
          return 0 < e.length ? e[0].split("=")[1].trim() : "";
        }),
        (o = function (a, o) {
          var i = Ditto.flowType;
          s.default.get(
            "/tools/auth_key/ditto-auth-credentials/",
            function (r) {
              var d = new Ditto.Scan(
                {
                  tryOnServer: "https://vto.partners-au.api.ditto.com",
                  domSelector: a,
                  accessKey: r["X-Ditto-Access-Key-Id"],
                  partnerId: "sunniesstudios",
                  font: "montserrat",
                  partnerSignature: r["X-Ditto-Signature"],
                  enableFaceInsights: !0,
                },
                {
                  success: function (a) {
                    var r;
                    console.log("success", a),
                      e.removeClass("active"),
                      "COMPATIBILITY" == i &&
                        (alert("SUCCESS"),
                        e.css("display", "block"),
                        (0, s.default)("#scan-iframe").css("index", "2")),
                      l("#dittoDisplay", o, a.scanId),
                      t.addClass("ditto-overlay-active"),
                      d.destroy(),
                      (r = a.scanId),
                      (a = new Date()).setTime(a.getTime() + 2592e6),
                      (a = a.toUTCString()),
                      (n.scanId = r),
                      (document.cookie =
                        "ditto_id=" +
                        r +
                        "; expires=" +
                        a +
                        "; SameSite=Strict; path=/"),
                      document
                        .querySelector("html")
                        .classList.remove("no-scroll"),
                      ga("send", "event", "Ditto", "Success", "IndexPage");
                    document.querySelector("#dittoDisplay").scrollIntoView();
                  },
                  failure: function (e) {
                    console.log("failure", e);
                  },
                  progress: function (e) {
                    console.log("progress", e),
                      document.querySelector("html").classList.add("no-scroll"),
                      "COMPATIBILITY" == i &&
                        (document.querySelector("#scan-iframe").style.zIndex =
                          "10");
                  },
                  close: function (t) {
                    console.log("close", t),
                      (0, s.default)("#DittoPopup").css("display", "initial"),
                      e.removeClass("active"),
                      document
                        .querySelector("html")
                        .classList.remove("no-scroll");
                  },
                }
              );
            }
          );
        }),
        (l = function (e, t, a) {
          s.default.get(
            "/tools/auth_key/ditto-auth-credentials/?message=" + a,
            function (s) {
              new Ditto.Overlay(
                {
                  tryOnServer: "https://vto.partners-au.api.ditto.com",
                  partnerId: "sunniesstudios",
                  domSelector: e,
                  scanId: a,
                  glassesId: t,
                  accessKey: s["X-Ditto-Access-Key-Id"],
                  partnerSignature: s["X-Ditto-Signature"],
                  overlaySignature: s["X-Ditto-Signature"],
                },
                {
                  success: function (e) {
                    var a = document.getElementById("dittoDisplay"),
                      s = document.querySelector(".js-retake-ditto");
                    s && a.removeChild(s),
                      ((s = document.createElement("button")).type = "button"),
                      s.classList.add(
                        "Product__details-lifestyle__ditto",
                        "btn",
                        "js-retake-ditto",
                        "btn--black"
                      ),
                      (s.innerText = "Retake"),
                      document.getElementById("dittoDisplay").appendChild(s),
                      (s = document.getElementById("dittoHint")) &&
                        (document.getElementById("dittoDisplay").appendChild(s),
                        s.classList.add("show-hint")),
                      (s =
                        document.querySelector(
                          ".js-retake-ditto"
                        )).addEventListener("click", function () {
                        i(t);
                      }),
                      s.addEventListener("keydown", function (e) {
                        return 13 === e.keyCode && i(t);
                      });
                  },
                  failure: function () {
                    console.log("failure");
                  },
                }
              );
            }
          );
        }),
        (i = function (t) {
          e.addClass("active"), o("#DittoPopup", t);
        }),
        (0, s.default)('[name="ditto_frame"]').on("change", function () {
          var e, o;
          t.hasClass("ditto-overlay-active") &&
            ((e = (0, s.default)(this).data("variant-sku")),
            (o = a()),
            l("#dittoDisplay", e, o));
        }),
        (0, s.default)("#startDitto").on("click", function () {
          var i = void 0,
            n = a();
          (0, s.default)('[name="ditto_frame"]').each(function () {
            (0, s.default)(this).prop("checked") &&
              (i = (0, s.default)(this).data("variant-sku"));
          }),
            "" === n
              ? (e.addClass("active"), o("#DittoPopup", i))
              : (t.addClass("ditto-overlay-active"), l("#dittoDisplay", i, n));
        }),
        (0, s.default)("#startDitto2").on("click", function () {
          if (
            document.getElementById("dittoDisplay").style.display == "none" ||
            document.getElementById("dittoDisplay").style.display == "" ||
            document.getElementById("dittoDisplay").style.display == null
          ) {
            var i = void 0,
              n = a();
            (0, s.default)('[name="ditto_frame"]').each(function () {
              (0, s.default)(this).prop("checked") &&
                (i = (0, s.default)(this).data("variant-sku"));
            }),
              "" === n
                ? (e.addClass("active"), o("#DittoPopup", i))
                : (t.addClass("ditto-overlay-active"),
                  l("#dittoDisplay", i, n));
            window.location =
              ("" + window.location).replace(/#[A-Za-z0-9_]*$/, "") +
              "#dittoDisplay";
          } else {
            window.location =
              ("" + window.location).replace(/#[A-Za-z0-9_]*$/, "") +
              "#dittoDisplay";
          }
        }));
    });
  },
  366: function (e, t, a) {},
  433: function (e, t) {},
});

function scrollBottom() {
  window.scrollTo({
    left: 0,
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
  console.log("clickedd");
}



function variantCollapse(e){
  e.target.closest('.product__entry').querySelector('.flask').classList.add('flask-collapsed');
  e.target.closest('.product__entry').querySelector('.flask').classList.remove('flask-expanded');
}

function variantExpand(e){
  e.target.closest('.product__entry').querySelector('.flask').classList.remove('flask-collapsed');
  e.target.closest('.product__entry').querySelector('.flask').classList.add('flask-expanded');
}

function productCardVariantCollapse(e){
  e.target.closest('.product-card').querySelector('.product-card-swatches.flask').classList.add('flask-collapsed');
  e.target.closest('.product-card').querySelector('.product-card-swatches.flask').classList.remove('flask-expanded');
}

function productCardVariantExpand(e){
  e.target.closest('.product-card').querySelector('.product-card-swatches.flask').classList.remove('flask-collapsed');
  e.target.closest('.product-card').querySelector('.product-card-swatches.flask').classList.add('flask-expanded');
}