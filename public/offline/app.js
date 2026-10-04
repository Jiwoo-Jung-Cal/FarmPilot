//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, T = Object.prototype.hasOwnProperty;
	function E(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function D(e, t) {
		return E(e.type, t, e.props);
	}
	function O(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function k(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var A = /\/+/g;
	function ee(e, t) {
		return typeof e == "object" && e && e.key != null ? k("" + e.key) : t.toString(36);
	}
	function j(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function M(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, M(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + ee(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(A, "$&/") + "/"), M(o, r, i, "", function(e) {
			return e;
		})) : o != null && (O(o) && (o = D(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(A, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + ee(a, u), c += M(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + ee(a, u++), c += M(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return M(j(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function te(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return M(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function ne(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var N = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, P = {
		map: te,
		forEach: function(e, t, n) {
			te(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return te(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return te(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!O(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = P, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !T.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return E(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) T.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return E(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = O, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: ne
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, N);
		} catch (e) {
			N(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.6";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, O());
		else {
			var t = n(l);
			t !== null && ee(x, t.startTime - e);
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function D() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && ee(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? O() : S = !1;
			}
		}
	}
	var O;
	if (typeof y == "function") O = function() {
		y(D);
	};
	else if (typeof MessageChannel < "u") {
		var k = new MessageChannel(), A = k.port2;
		k.port1.onmessage = D, O = function() {
			A.postMessage(null);
		};
	} else O = function() {
		_(D, 0);
	};
	function ee(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, ee(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.6";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), E = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), k = Symbol.for("react.activity"), A = Symbol.for("react.memo_cache_sentinel"), ee = Symbol.iterator;
	function j(e) {
		return typeof e != "object" || !e ? null : (e = ee && e[ee] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var M = Symbol.for("react.client.reference");
	function te(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === M ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case T: return "Suspense";
			case E: return "SuspenseList";
			case k: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case D: return t = e.displayName || null, t === null ? te(e.type) || "Memo" : t;
			case O:
				t = e._payload, e = e._init;
				try {
					return te(e(t));
				} catch {}
		}
		return null;
	}
	var ne = Array.isArray, N = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, re = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, ie = [], ae = -1;
	function oe(e) {
		return { current: e };
	}
	function F(e) {
		0 > ae || (e.current = ie[ae], ie[ae] = null, ae--);
	}
	function I(e, t) {
		ae++, ie[ae] = e.current, e.current = t;
	}
	var se = oe(null), ce = oe(null), le = oe(null), ue = oe(null);
	function de(e, t) {
		switch (I(le, t), I(ce, e), I(se, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Wd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Wd(t), e = Gd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		F(se), I(se, e);
	}
	function fe() {
		F(se), F(ce), F(le);
	}
	function pe(e) {
		e.memoizedState !== null && I(ue, e);
		var t = se.current, n = Gd(t, e.type);
		t !== n && (I(ce, e), I(se, n));
	}
	function me(e) {
		ce.current === e && (F(se), F(ce)), ue.current === e && (F(ue), Qf._currentValue = re);
	}
	var he, ge;
	function _e(e) {
		if (he === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			he = t && t[1] || "", ge = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + he + e + ge;
	}
	var ve = !1;
	function ye(e, t) {
		if (!e || ve) return "";
		ve = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			ve = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? _e(n) : "";
	}
	function be(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return _e(e.type);
			case 16: return _e("Lazy");
			case 13: return e.child !== t && t !== null ? _e("Suspense Fallback") : _e("Suspense");
			case 19: return _e("SuspenseList");
			case 0:
			case 15: return ye(e.type, !1);
			case 11: return ye(e.type.render, !1);
			case 1: return ye(e.type, !0);
			case 31: return _e("Activity");
			default: return "";
		}
	}
	function xe(e) {
		try {
			var t = "", n = null;
			do
				t += be(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Se = Object.prototype.hasOwnProperty, Ce = t.unstable_scheduleCallback, we = t.unstable_cancelCallback, Te = t.unstable_shouldYield, Ee = t.unstable_requestPaint, De = t.unstable_now, Oe = t.unstable_getCurrentPriorityLevel, ke = t.unstable_ImmediatePriority, Ae = t.unstable_UserBlockingPriority, L = t.unstable_NormalPriority, je = t.unstable_LowPriority, Me = t.unstable_IdlePriority, Ne = t.log, Pe = t.unstable_setDisableYieldValue, Fe = null, Ie = null;
	function Le(e) {
		if (typeof Ne == "function" && Pe(e), Ie && typeof Ie.setStrictMode == "function") try {
			Ie.setStrictMode(Fe, e);
		} catch {}
	}
	var Re = Math.clz32 ? Math.clz32 : Ve, ze = Math.log, Be = Math.LN2;
	function Ve(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (ze(e) / Be | 0) | 0;
	}
	var He = 256, R = 262144, z = 4194304;
	function Ue(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function B(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ue(n))) : i = Ue(o) : i = Ue(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ue(n))) : i = Ue(o)) : i = Ue(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function We(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Ge(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Ke() {
		var e = z;
		return z <<= 1, !(z & 62914560) && (z = 4194304), e;
	}
	function qe(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Je(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function V(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Re(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && H(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function H(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Re(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function U(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Re(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function Ye(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Xe(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Xe(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function Ze(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function Qe() {
		var e = P.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function $e(e, t) {
		var n = P.p;
		try {
			return P.p = e, t();
		} finally {
			P.p = n;
		}
	}
	var et = Math.random().toString(36).slice(2), tt = "__reactFiber$" + et, nt = "__reactProps$" + et, rt = "__reactContainer$" + et, it = "__reactEvents$" + et, at = "__reactListeners$" + et, ot = "__reactHandles$" + et, st = "__reactResources$" + et, ct = "__reactMarker$" + et;
	function lt(e) {
		delete e[tt], delete e[nt], delete e[it], delete e[at], delete e[ot];
	}
	function ut(e) {
		var t = e[tt];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[rt] || n[tt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ff(e); e !== null;) {
					if (n = e[tt]) return n;
					e = ff(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function W(e) {
		if (e = e[tt] || e[rt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function dt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function G(e) {
		var t = e[st];
		return t ||= e[st] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function ft(e) {
		e[ct] = !0;
	}
	var pt = /* @__PURE__ */ new Set(), mt = {};
	function ht(e, t) {
		gt(e, t), gt(e + "Capture", t);
	}
	function gt(e, t) {
		for (mt[e] = t, e = 0; e < t.length; e++) pt.add(t[e]);
	}
	var _t = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), vt = {}, yt = {};
	function bt(e) {
		return Se.call(yt, e) ? !0 : Se.call(vt, e) ? !1 : _t.test(e) ? yt[e] = !0 : (vt[e] = !0, !1);
	}
	function xt(e, t, n) {
		if (bt(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function St(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Ct(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function wt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Tt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Et(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function K(e) {
		if (!e._valueTracker) {
			var t = Tt(e) ? "checked" : "value";
			e._valueTracker = Et(e, t, "" + e[t]);
		}
	}
	function Dt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Tt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Ot(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var kt = /[\n"\\]/g;
	function At(e) {
		return e.replace(kt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function jt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + wt(t)) : e.value !== "" + wt(t) && (e.value = "" + wt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Nt(e, o, wt(n)) : Nt(e, o, wt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + wt(s) : e.removeAttribute("name");
	}
	function Mt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				K(e);
				return;
			}
			n = n == null ? "" : "" + wt(n), t = t == null ? n : "" + wt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), K(e);
	}
	function Nt(e, t, n) {
		t === "number" && Ot(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Pt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + wt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Ft(e, t, n) {
		if (t != null && (t = "" + wt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + wt(n);
	}
	function It(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ne(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = wt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), K(e);
	}
	function Lt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Rt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function zt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Rt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Bt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && zt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && zt(e, o, t[o]);
	}
	function Vt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Ht = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), Ut = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Wt(e) {
		return Ut.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Gt() {}
	var Kt = null;
	function qt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Jt = null, Yt = null;
	function Xt(e) {
		var t = W(e);
		if (t && (e = t.stateNode)) {
			var n = e[nt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (jt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + At("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[nt] || null;
								if (!a) throw Error(i(90));
								jt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Dt(r);
					}
					break a;
				case "textarea":
					Ft(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Pt(e, !!n.multiple, t, !1);
			}
		}
	}
	var Zt = !1;
	function Qt(e, t, n) {
		if (Zt) return e(t, n);
		Zt = !0;
		try {
			return e(t);
		} finally {
			if (Zt = !1, (Jt !== null || Yt !== null) && (xu(), Jt && (t = Jt, e = Yt, Yt = Jt = null, Xt(t), e))) for (t = 0; t < e.length; t++) Xt(e[t]);
		}
	}
	function $t(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[nt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var en = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), tn = !1;
	if (en) try {
		var q = {};
		Object.defineProperty(q, "passive", { get: function() {
			tn = !0;
		} }), window.addEventListener("test", q, q), window.removeEventListener("test", q, q);
	} catch {
		tn = !1;
	}
	var nn = null, rn = null, an = null;
	function on() {
		if (an) return an;
		var e, t = rn, n = t.length, r, i = "value" in nn ? nn.value : nn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return an = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function sn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function cn() {
		return !0;
	}
	function ln() {
		return !1;
	}
	function un(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? cn : ln, this.isPropagationStopped = ln, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = cn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = cn);
			},
			persist: function() {},
			isPersistent: cn
		}), t;
	}
	var dn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, fn = un(dn), pn = h({}, dn, {
		view: 0,
		detail: 0
	}), mn = un(pn), hn, gn, _n, vn = h({}, pn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: kn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== _n && (_n && e.type === "mousemove" ? (hn = e.screenX - _n.screenX, gn = e.screenY - _n.screenY) : gn = hn = 0, _n = e), hn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : gn;
		}
	}), yn = un(vn), bn = un(h({}, vn, { dataTransfer: 0 })), xn = un(h({}, pn, { relatedTarget: 0 })), Sn = un(h({}, dn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Cn = un(h({}, dn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), wn = un(h({}, dn, { data: 0 })), Tn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, En = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Dn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function On(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Dn[e]) ? !!t[e] : !1;
	}
	function kn() {
		return On;
	}
	var An = un(h({}, pn, {
		key: function(e) {
			if (e.key) {
				var t = Tn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = sn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? En[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: kn,
		charCode: function(e) {
			return e.type === "keypress" ? sn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? sn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), jn = un(h({}, vn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Mn = un(h({}, pn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: kn
	})), Nn = un(h({}, dn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Pn = un(h({}, vn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Fn = un(h({}, dn, {
		newState: 0,
		oldState: 0
	})), In = [
		9,
		13,
		27,
		32
	], Ln = en && "CompositionEvent" in window, Rn = null;
	en && "documentMode" in document && (Rn = document.documentMode);
	var zn = en && "TextEvent" in window && !Rn, Bn = en && (!Ln || Rn && 8 < Rn && 11 >= Rn), Vn = " ", Hn = !1;
	function Un(e, t) {
		switch (e) {
			case "keyup": return In.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Wn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Gn = !1;
	function Kn(e, t) {
		switch (e) {
			case "compositionend": return Wn(t);
			case "keypress": return t.which === 32 ? (Hn = !0, Vn) : null;
			case "textInput": return e = t.data, e === Vn && Hn ? null : e;
			default: return null;
		}
	}
	function qn(e, t) {
		if (Gn) return e === "compositionend" || !Ln && Un(e, t) ? (e = on(), an = rn = nn = null, Gn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Bn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Jn = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function Yn(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Jn[e.type] : t === "textarea";
	}
	function Xn(e, t, n, r) {
		Jt ? Yt ? Yt.push(r) : Yt = [r] : Jt = r, t = kd(t, "onChange"), 0 < t.length && (n = new fn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Zn = null, Qn = null;
	function $n(e) {
		xd(e, 0);
	}
	function er(e) {
		if (Dt(dt(e))) return e;
	}
	function tr(e, t) {
		if (e === "change") return t;
	}
	var nr = !1;
	if (en) {
		var rr;
		if (en) {
			var ir = "oninput" in document;
			if (!ir) {
				var ar = document.createElement("div");
				ar.setAttribute("oninput", "return;"), ir = typeof ar.oninput == "function";
			}
			rr = ir;
		} else rr = !1;
		nr = rr && (!document.documentMode || 9 < document.documentMode);
	}
	function or() {
		Zn && (Zn.detachEvent("onpropertychange", sr), Qn = Zn = null);
	}
	function sr(e) {
		if (e.propertyName === "value" && er(Qn)) {
			var t = [];
			Xn(t, Qn, e, qt(e)), Qt($n, t);
		}
	}
	function cr(e, t, n) {
		e === "focusin" ? (or(), Zn = t, Qn = n, Zn.attachEvent("onpropertychange", sr)) : e === "focusout" && or();
	}
	function lr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return er(Qn);
	}
	function ur(e, t) {
		if (e === "click") return er(t);
	}
	function dr(e, t) {
		if (e === "input" || e === "change") return er(t);
	}
	function fr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var pr = typeof Object.is == "function" ? Object.is : fr;
	function mr(e, t) {
		if (pr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Se.call(t, i) || !pr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function hr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function gr(e, t) {
		var n = hr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = hr(n);
		}
	}
	function _r(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? _r(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function vr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Ot(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Ot(e.document);
		}
		return t;
	}
	function yr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var br = en && "documentMode" in document && 11 >= document.documentMode, xr = null, Sr = null, Cr = null, wr = !1;
	function Tr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		wr || xr == null || xr !== Ot(r) || (r = xr, "selectionStart" in r && yr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Cr && mr(Cr, r) || (Cr = r, r = kd(Sr, "onSelect"), 0 < r.length && (t = new fn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = xr)));
	}
	function Er(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Dr = {
		animationend: Er("Animation", "AnimationEnd"),
		animationiteration: Er("Animation", "AnimationIteration"),
		animationstart: Er("Animation", "AnimationStart"),
		transitionrun: Er("Transition", "TransitionRun"),
		transitionstart: Er("Transition", "TransitionStart"),
		transitioncancel: Er("Transition", "TransitionCancel"),
		transitionend: Er("Transition", "TransitionEnd")
	}, Or = {}, kr = {};
	en && (kr = document.createElement("div").style, "AnimationEvent" in window || (delete Dr.animationend.animation, delete Dr.animationiteration.animation, delete Dr.animationstart.animation), "TransitionEvent" in window || delete Dr.transitionend.transition);
	function Ar(e) {
		if (Or[e]) return Or[e];
		if (!Dr[e]) return e;
		var t = Dr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in kr) return Or[e] = t[n];
		return e;
	}
	var jr = Ar("animationend"), Mr = Ar("animationiteration"), Nr = Ar("animationstart"), Pr = Ar("transitionrun"), Fr = Ar("transitionstart"), Ir = Ar("transitioncancel"), Lr = Ar("transitionend"), Rr = /* @__PURE__ */ new Map(), zr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	zr.push("scrollEnd");
	function Br(e, t) {
		Rr.set(e, t), ht(t, [e]);
	}
	var Vr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Hr = [], Ur = 0, Wr = 0;
	function Gr() {
		for (var e = Ur, t = Wr = Ur = 0; t < e;) {
			var n = Hr[t];
			Hr[t++] = null;
			var r = Hr[t];
			Hr[t++] = null;
			var i = Hr[t];
			Hr[t++] = null;
			var a = Hr[t];
			if (Hr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Yr(n, i, a);
		}
	}
	function Kr(e, t, n, r) {
		Hr[Ur++] = e, Hr[Ur++] = t, Hr[Ur++] = n, Hr[Ur++] = r, Wr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function qr(e, t, n, r) {
		return Kr(e, t, n, r), Xr(e);
	}
	function Jr(e, t) {
		return Kr(e, null, null, t), Xr(e);
	}
	function Yr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Re(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Xr(e) {
		if (50 < fu) throw fu = 0, pu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Zr = {};
	function Qr(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function $r(e, t, n, r) {
		return new Qr(e, t, n, r);
	}
	function ei(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function ti(e, t) {
		var n = e.alternate;
		return n === null ? (n = $r(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ni(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function ri(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") ei(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, se.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case k: return e = $r(31, n, t, a), e.elementType = k, e.lanes = o, e;
			case y: return ii(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = $r(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case T: return e = $r(13, n, t, a), e.elementType = T, e.lanes = o, e;
			case E: return e = $r(19, n, t, a), e.elementType = E, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case w:
						s = 11;
						break a;
					case D:
						s = 14;
						break a;
					case O:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = $r(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ii(e, t, n, r) {
		return e = $r(7, e, r, t), e.lanes = n, e;
	}
	function ai(e, t, n) {
		return e = $r(6, e, null, t), e.lanes = n, e;
	}
	function oi(e) {
		var t = $r(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function si(e, t, n) {
		return t = $r(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var ci = /* @__PURE__ */ new WeakMap();
	function li(e, t) {
		if (typeof e == "object" && e) {
			var n = ci.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: xe(t)
			}, ci.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: xe(t)
		};
	}
	var ui = [], di = 0, fi = null, pi = 0, mi = [], hi = 0, gi = null, _i = 1, vi = "";
	function yi(e, t) {
		ui[di++] = pi, ui[di++] = fi, fi = e, pi = t;
	}
	function bi(e, t, n) {
		mi[hi++] = _i, mi[hi++] = vi, mi[hi++] = gi, gi = e;
		var r = _i;
		e = vi;
		var i = 32 - Re(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Re(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, _i = 1 << 32 - Re(t) + i | n << i | r, vi = a + e;
		} else _i = 1 << a | n << i | r, vi = e;
	}
	function xi(e) {
		e.return !== null && (yi(e, 1), bi(e, 1, 0));
	}
	function Si(e) {
		for (; e === fi;) fi = ui[--di], ui[di] = null, pi = ui[--di], ui[di] = null;
		for (; e === gi;) gi = mi[--hi], mi[hi] = null, vi = mi[--hi], mi[hi] = null, _i = mi[--hi], mi[hi] = null;
	}
	function Ci(e, t) {
		mi[hi++] = _i, mi[hi++] = vi, mi[hi++] = gi, _i = t.id, vi = t.overflow, gi = e;
	}
	var wi = null, Ti = null, Ei = !1, Di = null, Oi = !1, ki = Error(i(519));
	function Ai(e) {
		throw Ii(li(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), ki;
	}
	function ji(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[tt] = e, t[nt] = r, n) {
			case "dialog":
				Sd("cancel", t), Sd("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Sd("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < yd.length; n++) Sd(yd[n], t);
				break;
			case "source":
				Sd("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Sd("error", t), Sd("load", t);
				break;
			case "details":
				Sd("toggle", t);
				break;
			case "input":
				Sd("invalid", t), Mt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Sd("invalid", t);
				break;
			case "textarea": Sd("invalid", t), It(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Fd(t.textContent, n) ? (r.popover != null && (Sd("beforetoggle", t), Sd("toggle", t)), r.onScroll != null && Sd("scroll", t), r.onScrollEnd != null && Sd("scrollend", t), r.onClick != null && (t.onclick = Gt), t = !0) : t = !1, t || Ai(e, !0);
	}
	function Mi(e) {
		for (wi = e.return; wi;) switch (wi.tag) {
			case 5:
			case 31:
			case 13:
				Oi = !1;
				return;
			case 27:
			case 3:
				Oi = !0;
				return;
			default: wi = wi.return;
		}
	}
	function Ni(e) {
		if (e !== wi) return !1;
		if (!Ei) return Mi(e), Ei = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Kd(e.type, e.memoizedProps)), n = !n), n && Ti && Ai(e), Mi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ti = df(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ti = df(e);
		} else t === 27 ? (t = Ti, $d(e.type) ? (e = uf, uf = null, Ti = e) : Ti = t) : Ti = wi ? lf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Pi() {
		Ti = wi = null, Ei = !1;
	}
	function Fi() {
		var e = Di;
		return e !== null && (Ql === null ? Ql = e : Ql.push.apply(Ql, e), Di = null), e;
	}
	function Ii(e) {
		Di === null ? Di = [e] : Di.push(e);
	}
	var Li = oe(null), Ri = null, zi = null;
	function Bi(e, t, n) {
		I(Li, t._currentValue), t._currentValue = n;
	}
	function Vi(e) {
		e._currentValue = Li.current, F(Li);
	}
	function Hi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Ui(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Hi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Hi(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Wi(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					pr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ue.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Ui(t, e, n, r), t.flags |= 262144;
	}
	function Gi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!pr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Ki(e) {
		Ri = e, zi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function qi(e) {
		return Yi(Ri, e);
	}
	function Ji(e, t) {
		return Ri === null && Ki(e), Yi(e, t);
	}
	function Yi(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, zi === null) {
			if (e === null) throw Error(i(308));
			zi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else zi = zi.next = t;
		return n;
	}
	var Xi = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, Zi = t.unstable_scheduleCallback, Qi = t.unstable_NormalPriority, $i = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ea() {
		return {
			controller: new Xi(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ta(e) {
		e.refCount--, e.refCount === 0 && Zi(Qi, function() {
			e.controller.abort();
		});
	}
	var na = null, ra = 0, ia = 0, aa = null;
	function oa(e, t) {
		if (na === null) {
			var n = na = [];
			ra = 0, ia = pd(), aa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ra++, t.then(sa, sa), t;
	}
	function sa() {
		if (--ra === 0 && na !== null) {
			aa !== null && (aa.status = "fulfilled");
			var e = na;
			na = null, ia = 0, aa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ca(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var la = N.S;
	N.S = function(e, t) {
		tu = De(), typeof t == "object" && t && typeof t.then == "function" && oa(e, t), la !== null && la(e, t);
	};
	var ua = oe(null);
	function da() {
		var e = ua.current;
		return e === null ? Ll.pooledCache : e;
	}
	function fa(e, t) {
		t === null ? I(ua, ua.current) : I(ua, t.pool);
	}
	function pa() {
		var e = da();
		return e === null ? null : {
			parent: $i._currentValue,
			pool: e
		};
	}
	var ma = Error(i(460)), ha = Error(i(474)), ga = Error(i(542)), _a = { then: function() {} };
	function va(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function ya(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Gt, Gt), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ca(e), e;
			default:
				if (typeof t.status == "string") t.then(Gt, Gt);
				else {
					if (e = Ll, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Ca(e), e;
				}
				throw xa = t, ma;
		}
	}
	function ba(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (xa = e, ma) : e;
		}
	}
	var xa = null;
	function Sa() {
		if (xa === null) throw Error(i(459));
		var e = xa;
		return xa = null, e;
	}
	function Ca(e) {
		if (e === ma || e === ga) throw Error(i(483));
	}
	var wa = null, Ta = 0;
	function Ea(e) {
		var t = Ta;
		return Ta += 1, wa === null && (wa = []), ya(wa, e, t);
	}
	function Da(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Oa(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function ka(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = ti(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ai(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === O && ba(i) === t.type) ? (t = a(t, n.props), Da(t, n), t.return = e, t) : (t = ri(n.type, n.key, n.props, null, e.mode, r), Da(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = si(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ii(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ai("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = ri(t.type, t.key, t.props, null, e.mode, n), Da(n, t), n.return = e, n;
					case v: return t = si(t, e.mode, n), t.return = e, t;
					case O: return t = ba(t), f(e, t, n);
				}
				if (ne(t) || j(t)) return t = ii(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ea(t), n);
				if (t.$$typeof === C) return f(e, Ji(e, t), n);
				Oa(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case O: return n = ba(n), p(e, t, n, r);
				}
				if (ne(n) || j(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ea(n), r);
				if (n.$$typeof === C) return p(e, t, Ji(e, n), r);
				Oa(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case O: return r = ba(r), m(e, t, n, r, i);
				}
				if (ne(r) || j(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Ea(r), i);
				if (r.$$typeof === C) return m(e, t, n, Ji(t, r), i);
				Oa(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), Ei && yi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return Ei && yi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), Ei && yi(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), Ei && yi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return Ei && yi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), Ei && yi(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === O && ba(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Da(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = ii(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = ri(o.type, o.key, o.props, null, e.mode, c), Da(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = si(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case O: return o = ba(o), b(e, r, o, c);
				}
				if (ne(o)) return h(e, r, o, c);
				if (j(o)) {
					if (l = j(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Ea(o), c);
				if (o.$$typeof === C) return b(e, r, Ji(e, o), c);
				Oa(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ai(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ta = 0;
				var i = b(e, t, n, r);
				return wa = null, i;
			} catch (t) {
				if (t === ma || t === ga) throw t;
				var a = $r(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Aa = ka(!0), ja = ka(!1), Ma = !1;
	function Na(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Pa(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Fa(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ia(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Il & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Xr(e), Yr(e, null, n), t;
		}
		return Kr(e, r, t, n), Xr(e);
	}
	function La(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, U(e, n);
		}
	}
	function Ra(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var za = !1;
	function Ba() {
		if (za) {
			var e = aa;
			if (e !== null) throw e;
		}
	}
	function Va(e, t, n, r) {
		za = !1;
		var i = e.updateQueue;
		Ma = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Rl & f) === f : (r & f) === f) {
					f !== 0 && f === ia && (za = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Ma = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Kl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ha(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ua(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ha(n[e], t);
	}
	var Wa = oe(null), Ga = oe(0);
	function Ka(e, t) {
		e = Wl, I(Ga, e), I(Wa, t), Wl = e | t.baseLanes;
	}
	function qa() {
		I(Ga, Wl), I(Wa, Wa.current);
	}
	function Ja() {
		Wl = Ga.current, F(Wa), F(Ga);
	}
	var Ya = oe(null), Xa = null;
	function Za(e) {
		var t = e.alternate;
		I(no, no.current & 1), I(Ya, e), Xa === null && (t === null || Wa.current !== null || t.memoizedState !== null) && (Xa = e);
	}
	function Qa(e) {
		I(no, no.current), I(Ya, e), Xa === null && (Xa = e);
	}
	function $a(e) {
		e.tag === 22 ? (I(no, no.current), I(Ya, e), Xa === null && (Xa = e)) : eo(e);
	}
	function eo() {
		I(no, no.current), I(Ya, Ya.current);
	}
	function to(e) {
		F(Ya), Xa === e && (Xa = null), F(no);
	}
	var no = oe(0);
	function ro(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || of(n) || sf(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var io = 0, J = null, ao = null, oo = null, so = !1, co = !1, lo = !1, uo = 0, fo = 0, po = null, mo = 0;
	function ho() {
		throw Error(i(321));
	}
	function go(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!pr(e[n], t[n])) return !1;
		return !0;
	}
	function _o(e, t, n, r, i, a) {
		return io = a, J = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, N.H = e === null || e.memoizedState === null ? Ps : Fs, lo = !1, a = n(r, i), lo = !1, co && (a = yo(t, n, r, i)), vo(e), a;
	}
	function vo(e) {
		N.H = Ns;
		var t = ao !== null && ao.next !== null;
		if (io = 0, oo = ao = J = null, so = !1, fo = 0, po = null, t) throw Error(i(300));
		e === null || Qs || (e = e.dependencies, e !== null && Gi(e) && (Qs = !0));
	}
	function yo(e, t, n, r) {
		J = e;
		var a = 0;
		do {
			if (co && (po = null), fo = 0, co = !1, 25 <= a) throw Error(i(301));
			if (a += 1, oo = ao = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			N.H = Is, o = t(n, r);
		} while (co);
		return o;
	}
	function bo() {
		var e = N.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Do(t) : t, e = e.useState()[0], (ao === null ? null : ao.memoizedState) !== e && (J.flags |= 1024), t;
	}
	function xo() {
		var e = uo !== 0;
		return uo = 0, e;
	}
	function So(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Co(e) {
		if (so) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			so = !1;
		}
		io = 0, oo = ao = J = null, co = !1, fo = uo = 0, po = null;
	}
	function wo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return oo === null ? J.memoizedState = oo = e : oo = oo.next = e, oo;
	}
	function To() {
		if (ao === null) {
			var e = J.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = ao.next;
		var t = oo === null ? J.memoizedState : oo.next;
		if (t !== null) oo = t, ao = e;
		else {
			if (e === null) throw J.alternate === null ? Error(i(467)) : Error(i(310));
			ao = e, e = {
				memoizedState: ao.memoizedState,
				baseState: ao.baseState,
				baseQueue: ao.baseQueue,
				queue: ao.queue,
				next: null
			}, oo === null ? J.memoizedState = oo = e : oo = oo.next = e;
		}
		return oo;
	}
	function Eo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Do(e) {
		var t = fo;
		return fo += 1, po === null && (po = []), e = ya(po, e, t), t = J, (oo === null ? t.memoizedState : oo.next) === null && (t = t.alternate, N.H = t === null || t.memoizedState === null ? Ps : Fs), e;
	}
	function Oo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Do(e);
			if (e.$$typeof === C) return qi(e);
		}
		throw Error(i(438, String(e)));
	}
	function ko(e) {
		var t = null, n = J.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = J.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = Eo(), J.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = A;
		return t.index++, n;
	}
	function Ao(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function jo(e) {
		return Mo(To(), ao, e);
	}
	function Mo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (io & f) === f : (Rl & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ia && (d = !0);
					else if ((io & p) === p) {
						u = u.next, p === ia && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, J.lanes |= p, Kl |= p;
					f = u.action, lo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, J.lanes |= f, Kl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !pr(o, e.memoizedState) && (Qs = !0, d && (n = aa, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function No(e) {
		var t = To(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			pr(o, t.memoizedState) || (Qs = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Po(e, t, n) {
		var r = J, a = To(), o = Ei;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !pr((ao || a).memoizedState, n);
		if (s && (a.memoizedState = n, Qs = !0), a = a.queue, as(Lo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || oo !== null && oo.memoizedState.tag & 1) {
			if (r.flags |= 2048, es(9, { destroy: void 0 }, Io.bind(null, r, a, n, t), null), Ll === null) throw Error(i(349));
			o || io & 127 || Fo(r, t, n);
		}
		return n;
	}
	function Fo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = J.updateQueue, t === null ? (t = Eo(), J.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Io(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Ro(t) && zo(e);
	}
	function Lo(e, t, n) {
		return n(function() {
			Ro(t) && zo(e);
		});
	}
	function Ro(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !pr(e, n);
		} catch {
			return !0;
		}
	}
	function zo(e) {
		var t = Jr(e, 2);
		t !== null && gu(t, e, 2);
	}
	function Bo(e) {
		var t = wo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), lo) {
				Le(!0);
				try {
					n();
				} finally {
					Le(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ao,
			lastRenderedState: e
		}, t;
	}
	function Vo(e, t, n, r) {
		return e.baseState = n, Mo(e, ao, typeof r == "function" ? r : Ao);
	}
	function Ho(e, t, n, r, a) {
		if (As(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			N.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Uo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Uo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = N.T, o = {};
			N.T = o;
			try {
				var s = n(i, r), c = N.S;
				c !== null && c(o, s), Wo(e, t, s);
			} catch (n) {
				Ko(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), N.T = a;
			}
		} else try {
			a = n(i, r), Wo(e, t, a);
		} catch (n) {
			Ko(e, t, n);
		}
	}
	function Wo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Go(e, t, n);
		}, function(n) {
			return Ko(e, t, n);
		}) : Go(e, t, n);
	}
	function Go(e, t, n) {
		t.status = "fulfilled", t.value = n, qo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Uo(e, n)));
	}
	function Ko(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, qo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function qo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Jo(e, t) {
		return t;
	}
	function Yo(e, t) {
		if (Ei) {
			var n = Ll.formState;
			if (n !== null) {
				a: {
					var r = J;
					if (Ei) {
						if (Ti) {
							b: {
								for (var i = Ti, a = Oi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = lf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Ti = lf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ai(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = wo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Jo,
			lastRenderedState: t
		}, n.queue = r, n = Ds.bind(null, J, r), r.dispatch = n, r = Bo(!1), a = ks.bind(null, J, !1, r.queue), r = wo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Ho.bind(null, J, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Xo(e) {
		return Zo(To(), ao, e);
	}
	function Zo(e, t, n) {
		if (t = Mo(e, t, Jo)[0], e = jo(Ao)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Do(t);
		} catch (e) {
			throw e === ma ? ga : e;
		}
		else r = t;
		t = To();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (J.flags |= 2048, es(9, { destroy: void 0 }, Qo.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Qo(e, t) {
		e.action = t;
	}
	function $o(e) {
		var t = To(), n = ao;
		if (n !== null) return Zo(t, n, e);
		To(), t = t.memoizedState, n = To();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function es(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = J.updateQueue, t === null && (t = Eo(), J.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ts() {
		return To().memoizedState;
	}
	function ns(e, t, n, r) {
		var i = wo();
		J.flags |= e, i.memoizedState = es(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function rs(e, t, n, r) {
		var i = To();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		ao !== null && r !== null && go(r, ao.memoizedState.deps) ? i.memoizedState = es(t, a, n, r) : (J.flags |= e, i.memoizedState = es(1 | t, a, n, r));
	}
	function is(e, t) {
		ns(8390656, 8, e, t);
	}
	function as(e, t) {
		rs(2048, 8, e, t);
	}
	function os(e) {
		J.flags |= 4;
		var t = J.updateQueue;
		if (t === null) t = Eo(), J.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function ss(e) {
		var t = To().memoizedState;
		return os({
			ref: t,
			nextImpl: e
		}), function() {
			if (Il & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function cs(e, t) {
		return rs(4, 2, e, t);
	}
	function ls(e, t) {
		return rs(4, 4, e, t);
	}
	function us(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function ds(e, t, n) {
		n = n == null ? null : n.concat([e]), rs(4, 4, us.bind(null, t, e), n);
	}
	function fs() {}
	function ps(e, t) {
		var n = To();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && go(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ms(e, t) {
		var n = To();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && go(t, r[1])) return r[0];
		if (r = e(), lo) {
			Le(!0);
			try {
				e();
			} finally {
				Le(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function hs(e, t, n) {
		return n === void 0 || io & 1073741824 && !(Rl & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = hu(), J.lanes |= e, Kl |= e, n);
	}
	function gs(e, t, n, r) {
		return pr(n, t) ? n : Wa.current === null ? !(io & 42) || io & 1073741824 && !(Rl & 261930) ? (Qs = !0, e.memoizedState = n) : (e = hu(), J.lanes |= e, Kl |= e, t) : (e = hs(e, n, r), pr(e, t) || (Qs = !0), e);
	}
	function _s(e, t, n, r, i) {
		var a = P.p;
		P.p = a !== 0 && 8 > a ? a : 8;
		var o = N.T, s = {};
		N.T = s, ks(e, !1, t, n);
		try {
			var c = i(), l = N.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Os(e, t, ca(c, r), mu(e)) : Os(e, t, r, mu(e));
		} catch (n) {
			Os(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, mu());
		} finally {
			P.p = a, o !== null && s.types !== null && (o.types = s.types), N.T = o;
		}
	}
	function vs() {}
	function ys(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = bs(e).queue;
		_s(e, a, t, re, n === null ? vs : function() {
			return xs(e), n(r);
		});
	}
	function bs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: re,
			baseState: re,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ao,
				lastRenderedState: re
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ao,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function xs(e) {
		var t = bs(e);
		t.next === null && (t = e.alternate.memoizedState), Os(e, t.next.queue, {}, mu());
	}
	function Ss() {
		return qi(Qf);
	}
	function Cs() {
		return To().memoizedState;
	}
	function ws() {
		return To().memoizedState;
	}
	function Ts(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = mu();
					e = Fa(n);
					var r = Ia(t, e, n);
					r !== null && (gu(r, t, n), La(r, t, n)), t = { cache: ea() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Es(e, t, n) {
		var r = mu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, As(e) ? js(t, n) : (n = qr(e, t, n, r), n !== null && (gu(n, e, r), Ms(n, t, r)));
	}
	function Ds(e, t, n) {
		Os(e, t, n, mu());
	}
	function Os(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (As(e)) js(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, pr(s, o)) return Kr(e, t, i, 0), Ll === null && Gr(), !1;
			} catch {}
			if (n = qr(e, t, i, r), n !== null) return gu(n, e, r), Ms(n, t, r), !0;
		}
		return !1;
	}
	function ks(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: pd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, As(e)) {
			if (t) throw Error(i(479));
		} else t = qr(e, n, r, 2), t !== null && gu(t, e, 2);
	}
	function As(e) {
		var t = e.alternate;
		return e === J || t !== null && t === J;
	}
	function js(e, t) {
		co = so = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Ms(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, U(e, n);
		}
	}
	var Ns = {
		readContext: qi,
		use: Oo,
		useCallback: ho,
		useContext: ho,
		useEffect: ho,
		useImperativeHandle: ho,
		useLayoutEffect: ho,
		useInsertionEffect: ho,
		useMemo: ho,
		useReducer: ho,
		useRef: ho,
		useState: ho,
		useDebugValue: ho,
		useDeferredValue: ho,
		useTransition: ho,
		useSyncExternalStore: ho,
		useId: ho,
		useHostTransitionStatus: ho,
		useFormState: ho,
		useActionState: ho,
		useOptimistic: ho,
		useMemoCache: ho,
		useCacheRefresh: ho
	};
	Ns.useEffectEvent = ho;
	var Ps = {
		readContext: qi,
		use: Oo,
		useCallback: function(e, t) {
			return wo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: qi,
		useEffect: is,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ns(4194308, 4, us.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ns(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ns(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = wo();
			t = t === void 0 ? null : t;
			var r = e();
			if (lo) {
				Le(!0);
				try {
					e();
				} finally {
					Le(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = wo();
			if (n !== void 0) {
				var i = n(t);
				if (lo) {
					Le(!0);
					try {
						n(t);
					} finally {
						Le(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Es.bind(null, J, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = wo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Bo(e);
			var t = e.queue, n = Ds.bind(null, J, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: fs,
		useDeferredValue: function(e, t) {
			return hs(wo(), e, t);
		},
		useTransition: function() {
			var e = Bo(!1);
			return e = _s.bind(null, J, e.queue, !0, !1), wo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = J, a = wo();
			if (Ei) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Ll === null) throw Error(i(349));
				Rl & 127 || Fo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, is(Lo.bind(null, r, o, e), [e]), r.flags |= 2048, es(9, { destroy: void 0 }, Io.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = wo(), t = Ll.identifierPrefix;
			if (Ei) {
				var n = vi, r = _i;
				n = (r & ~(1 << 32 - Re(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = uo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = mo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ss,
		useFormState: Yo,
		useActionState: Yo,
		useOptimistic: function(e) {
			var t = wo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = ks.bind(null, J, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: ko,
		useCacheRefresh: function() {
			return wo().memoizedState = Ts.bind(null, J);
		},
		useEffectEvent: function(e) {
			var t = wo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Il & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Fs = {
		readContext: qi,
		use: Oo,
		useCallback: ps,
		useContext: qi,
		useEffect: as,
		useImperativeHandle: ds,
		useInsertionEffect: cs,
		useLayoutEffect: ls,
		useMemo: ms,
		useReducer: jo,
		useRef: ts,
		useState: function() {
			return jo(Ao);
		},
		useDebugValue: fs,
		useDeferredValue: function(e, t) {
			return gs(To(), ao.memoizedState, e, t);
		},
		useTransition: function() {
			var e = jo(Ao)[0], t = To().memoizedState;
			return [typeof e == "boolean" ? e : Do(e), t];
		},
		useSyncExternalStore: Po,
		useId: Cs,
		useHostTransitionStatus: Ss,
		useFormState: Xo,
		useActionState: Xo,
		useOptimistic: function(e, t) {
			return Vo(To(), ao, e, t);
		},
		useMemoCache: ko,
		useCacheRefresh: ws
	};
	Fs.useEffectEvent = ss;
	var Is = {
		readContext: qi,
		use: Oo,
		useCallback: ps,
		useContext: qi,
		useEffect: as,
		useImperativeHandle: ds,
		useInsertionEffect: cs,
		useLayoutEffect: ls,
		useMemo: ms,
		useReducer: No,
		useRef: ts,
		useState: function() {
			return No(Ao);
		},
		useDebugValue: fs,
		useDeferredValue: function(e, t) {
			var n = To();
			return ao === null ? hs(n, e, t) : gs(n, ao.memoizedState, e, t);
		},
		useTransition: function() {
			var e = No(Ao)[0], t = To().memoizedState;
			return [typeof e == "boolean" ? e : Do(e), t];
		},
		useSyncExternalStore: Po,
		useId: Cs,
		useHostTransitionStatus: Ss,
		useFormState: $o,
		useActionState: $o,
		useOptimistic: function(e, t) {
			var n = To();
			return ao === null ? (n.baseState = e, [e, n.queue.dispatch]) : Vo(n, ao, e, t);
		},
		useMemoCache: ko,
		useCacheRefresh: ws
	};
	Is.useEffectEvent = ss;
	function Ls(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Rs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = mu(), i = Fa(r);
			i.payload = t, n != null && (i.callback = n), t = Ia(e, i, r), t !== null && (gu(t, e, r), La(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = mu(), i = Fa(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ia(e, i, r), t !== null && (gu(t, e, r), La(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = mu(), r = Fa(n);
			r.tag = 2, t != null && (r.callback = t), t = Ia(e, r, n), t !== null && (gu(t, e, n), La(t, e, n));
		}
	};
	function zs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !mr(n, r) || !mr(i, a) : !0;
	}
	function Bs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Rs.enqueueReplaceState(t, t.state, null);
	}
	function Vs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Hs(e) {
		Vr(e);
	}
	function Us(e) {
		console.error(e);
	}
	function Ws(e) {
		Vr(e);
	}
	function Gs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ks(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function qs(e, t, n) {
		return n = Fa(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Gs(e, t);
		}, n;
	}
	function Js(e) {
		return e = Fa(e), e.tag = 3, e;
	}
	function Ys(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Ks(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Ks(t, n, r), typeof i != "function" && (iu === null ? iu = new Set([this]) : iu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Xs(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Wi(t, n, a, !0), n = Ya.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return Xa === null ? Ou() : n.alternate === null && Gl === 0 && (Gl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === _a ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), qu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === _a ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), qu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return qu(e, r, a), Ou(), !1;
		}
		if (Ei) return t = Ya.current, t === null ? (r !== ki && (t = Error(i(423), { cause: r }), Ii(li(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = li(r, n), a = qs(e.stateNode, r, a), Ra(e, a), Gl !== 4 && (Gl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== ki && (e = Error(i(422), { cause: r }), Ii(li(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = li(o, n), Zl === null ? Zl = [o] : Zl.push(o), Gl !== 4 && (Gl = 2), t === null) return !0;
		r = li(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = qs(n.stateNode, r, e), Ra(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (iu === null || !iu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Js(a), Ys(a, e, n, r), Ra(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Zs = Error(i(461)), Qs = !1;
	function $s(e, t, n, r) {
		t.child = e === null ? ja(t, null, n, r) : Aa(t, e.child, n, r);
	}
	function ec(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Ki(t), r = _o(e, t, n, o, a, i), s = xo(), e !== null && !Qs ? (So(e, t, i), wc(e, t, i)) : (Ei && s && xi(t), t.flags |= 1, $s(e, t, r, i), t.child);
	}
	function tc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ei(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, nc(e, t, a, r, i)) : (e = ri(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Tc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? mr : n, n(o, r) && e.ref === t.ref) return wc(e, t, i);
		}
		return t.flags |= 1, e = ti(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function nc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (mr(a, r) && e.ref === t.ref) if (Qs = !1, t.pendingProps = r = a, Tc(e, i)) e.flags & 131072 && (Qs = !0);
			else return t.lanes = e.lanes, wc(e, t, i);
		}
		return uc(e, t, n, r, i);
	}
	function rc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return ac(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && fa(t, a === null ? null : a.cachePool), a === null ? qa() : Ka(t, a), $a(t);
			else return r = t.lanes = 536870912, ac(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && fa(t, null), qa(), eo(t)) : (fa(t, a.cachePool), Ka(t, a), eo(t), t.memoizedState = null);
		return $s(e, t, i, n), t.child;
	}
	function ic(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function ac(e, t, n, r, i) {
		var a = da();
		return a = a === null ? null : {
			parent: $i._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && fa(t, null), qa(), $a(t), e !== null && Wi(e, t, r, !0), t.childLanes = i, null;
	}
	function oc(e, t) {
		return t = yc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function sc(e, t, n) {
		return Aa(t, e.child, null, n), e = oc(t, t.pendingProps), e.flags |= 2, to(t), t.memoizedState = null, e;
	}
	function cc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (Ei) {
				if (r.mode === "hidden") return e = oc(t, r), t.lanes = 536870912, ic(null, e);
				if (Qa(t), (e = Ti) ? (e = af(e, Oi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: gi === null ? null : {
						id: _i,
						overflow: vi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = oi(e), n.return = t, t.child = n, wi = t, Ti = null)) : e = null, e === null) throw Ai(t);
				return t.lanes = 536870912, null;
			}
			return oc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Qa(t), a) if (t.flags & 256) t.flags &= -257, t = sc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (Qs || Wi(e, t, n, !1), a = (n & e.childLanes) !== 0, Qs || a) {
				if (r = Ll, r !== null && (s = Ye(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Jr(e, s), gu(r, e, s), Zs;
				Ou(), t = sc(e, t, n);
			} else e = o.treeContext, Ti = lf(s.nextSibling), wi = t, Ei = !0, Di = null, Oi = !1, e !== null && Ci(t, e), t = oc(t, r), t.flags |= 4096;
			return t;
		}
		return e = ti(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function lc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function uc(e, t, n, r, i) {
		return Ki(t), n = _o(e, t, n, r, void 0, i), r = xo(), e !== null && !Qs ? (So(e, t, i), wc(e, t, i)) : (Ei && r && xi(t), t.flags |= 1, $s(e, t, n, i), t.child);
	}
	function dc(e, t, n, r, i, a) {
		return Ki(t), t.updateQueue = null, n = yo(t, r, n, i), vo(e), r = xo(), e !== null && !Qs ? (So(e, t, a), wc(e, t, a)) : (Ei && r && xi(t), t.flags |= 1, $s(e, t, n, a), t.child);
	}
	function fc(e, t, n, r, i) {
		if (Ki(t), t.stateNode === null) {
			var a = Zr, o = n.contextType;
			typeof o == "object" && o && (a = qi(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Rs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Na(t), o = n.contextType, a.context = typeof o == "object" && o ? qi(o) : Zr, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Ls(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Rs.enqueueReplaceState(a, a.state, null), Va(t, r, a, i), Ba(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Vs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Zr, typeof u == "object" && u && (o = qi(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Bs(t, a, r, o), Ma = !1;
			var f = t.memoizedState;
			a.state = f, Va(t, r, a, i), Ba(), l = t.memoizedState, s || f !== l || Ma ? (typeof d == "function" && (Ls(t, n, d, r), l = t.memoizedState), (c = Ma || zs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Pa(e, t), o = t.memoizedProps, u = Vs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Zr, typeof l == "object" && l && (c = qi(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Bs(t, a, r, c), Ma = !1, f = t.memoizedState, a.state = f, Va(t, r, a, i), Ba();
			var p = t.memoizedState;
			o !== d || f !== p || Ma || e !== null && e.dependencies !== null && Gi(e.dependencies) ? (typeof s == "function" && (Ls(t, n, s, r), p = t.memoizedState), (u = Ma || zs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Gi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, lc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Aa(t, e.child, null, i), t.child = Aa(t, null, n, i)) : $s(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = wc(e, t, i), e;
	}
	function pc(e, t, n, r) {
		return Pi(), t.flags |= 256, $s(e, t, n, r), t.child;
	}
	var mc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function hc(e) {
		return {
			baseLanes: e,
			cachePool: pa()
		};
	}
	function gc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Yl), e;
	}
	function _c(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (no.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (Ei) {
				if (a ? Za(t) : eo(t), (e = Ti) ? (e = af(e, Oi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: gi === null ? null : {
						id: _i,
						overflow: vi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = oi(e), n.return = t, t.child = n, wi = t, Ti = null)) : e = null, e === null) throw Ai(t);
				return sf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (eo(t), a = t.mode, c = yc({
				mode: "hidden",
				children: c
			}, a), r = ii(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = hc(n), r.childLanes = gc(e, s, n), t.memoizedState = mc, ic(null, r)) : (Za(t), vc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (Za(t), t.flags &= -257, t = bc(e, t, n)) : t.memoizedState === null ? (eo(t), c = r.fallback, a = t.mode, r = yc({
				mode: "visible",
				children: r.children
			}, a), c = ii(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Aa(t, e.child, null, n), r = t.child, r.memoizedState = hc(n), r.childLanes = gc(e, s, n), t.memoizedState = mc, t = ic(null, r)) : (eo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (Za(t), sf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Ii({
					value: r,
					source: null,
					stack: null
				}), t = bc(e, t, n);
			} else if (Qs || Wi(e, t, n, !1), s = (n & e.childLanes) !== 0, Qs || s) {
				if (s = Ll, s !== null && (r = Ye(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Jr(e, r), gu(s, e, r), Zs;
				of(c) || Ou(), t = bc(e, t, n);
			} else of(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Ti = lf(c.nextSibling), wi = t, Ei = !0, Di = null, Oi = !1, e !== null && Ci(t, e), t = vc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (eo(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = ti(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ii(c, a, n, null), c.flags |= 2) : c = ti(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, ic(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = hc(n) : (a = c.cachePool, a === null ? a = pa() : (l = $i._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = gc(e, s, n), t.memoizedState = mc, ic(e.child, r)) : (Za(t), n = e.child, e = n.sibling, n = ti(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function vc(e, t) {
		return t = yc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function yc(e, t) {
		return e = $r(22, e, null, t), e.lanes = 0, e;
	}
	function bc(e, t, n) {
		return Aa(t, e.child, null, n), e = vc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function xc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Hi(e.return, t, n);
	}
	function Sc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Cc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = no.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, I(no, o), $s(e, t, r, n), r = Ei ? pi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && xc(e, n, t);
			else if (e.tag === 19) xc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ro(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Sc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && ro(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Sc(t, !0, n, null, a, r);
				break;
			case "together":
				Sc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function wc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Kl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Wi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = ti(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ti(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Tc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Gi(e))) : !0;
	}
	function Ec(e, t, n) {
		switch (t.tag) {
			case 3:
				de(t, t.stateNode.containerInfo), Bi(t, $i, e.memoizedState.cache), Pi();
				break;
			case 27:
			case 5:
				pe(t);
				break;
			case 4:
				de(t, t.stateNode.containerInfo);
				break;
			case 10:
				Bi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Qa(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Za(t), e = wc(e, t, n), e === null ? null : e.sibling) : _c(e, t, n) : (Za(t), t.flags |= 128, null);
				Za(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Wi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Cc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), I(no, no.current), r) break;
				return null;
			case 22: return t.lanes = 0, rc(e, t, n, t.pendingProps);
			case 24: Bi(t, $i, e.memoizedState.cache);
		}
		return wc(e, t, n);
	}
	function Dc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) Qs = !0;
		else {
			if (!Tc(e, n) && !(t.flags & 128)) return Qs = !1, Ec(e, t, n);
			Qs = !!(e.flags & 131072);
		}
		else Qs = !1, Ei && t.flags & 1048576 && bi(t, pi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ba(t.elementType), t.type = e, typeof e == "function") ei(e) ? (r = Vs(e, r), t.tag = 1, t = fc(null, t, e, r, n)) : (t.tag = 0, t = uc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = ec(null, t, e, r, n);
								break a;
							} else if (a === D) {
								t.tag = 14, t = tc(null, t, e, r, n);
								break a;
							}
						}
						throw t = te(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return uc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Vs(r, t.pendingProps), fc(e, t, r, a, n);
			case 3:
				a: {
					if (de(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Pa(e, t), Va(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Bi(t, $i, r), r !== o.cache && Ui(t, [$i], n, !0), Ba(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = pc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = li(Error(i(424)), t), Ii(a), t = pc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Ti = lf(e.firstChild), wi = t, Ei = !0, Di = null, Oi = !0, n = ja(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Pi(), r === a) {
							t = wc(e, t, n);
							break a;
						}
						$s(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return lc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Ei || (n = t.type, e = t.pendingProps, r = Ud(le.current).createElement(n), r[tt] = t, r[nt] = e, X(r, n, e), ft(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return pe(t), e === null && Ei && (r = t.stateNode = pf(t.type, t.pendingProps, le.current), wi = t, Oi = !0, a = Ti, $d(t.type) ? (uf = a, Ti = lf(r.firstChild)) : Ti = a), $s(e, t, t.pendingProps.children, n), lc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && Ei && ((a = r = Ti) && (r = nf(r, t.type, t.pendingProps, Oi), r === null ? a = !1 : (t.stateNode = r, wi = t, Ti = lf(r.firstChild), Oi = !1, a = !0)), a || Ai(t)), pe(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Kd(a, o) ? r = null : s !== null && Kd(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = _o(e, t, bo, null, null, n), Qf._currentValue = a), lc(e, t), $s(e, t, r, n), t.child;
			case 6: return e === null && Ei && ((e = n = Ti) && (n = rf(n, t.pendingProps, Oi), n === null ? e = !1 : (t.stateNode = n, wi = t, Ti = null, e = !0)), e || Ai(t)), null;
			case 13: return _c(e, t, n);
			case 4: return de(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Aa(t, null, r, n) : $s(e, t, r, n), t.child;
			case 11: return ec(e, t, t.type, t.pendingProps, n);
			case 7: return $s(e, t, t.pendingProps, n), t.child;
			case 8: return $s(e, t, t.pendingProps.children, n), t.child;
			case 12: return $s(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Bi(t, t.type, r.value), $s(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Ki(t), a = qi(a), r = r(a), t.flags |= 1, $s(e, t, r, n), t.child;
			case 14: return tc(e, t, t.type, t.pendingProps, n);
			case 15: return nc(e, t, t.type, t.pendingProps, n);
			case 19: return Cc(e, t, n);
			case 31: return cc(e, t, n);
			case 22: return rc(e, t, n, t.pendingProps);
			case 24: return Ki(t), r = qi($i), e === null ? (a = da(), a === null && (a = Ll, o = ea(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Na(t), Bi(t, $i, a)) : ((e.lanes & n) !== 0 && (Pa(e, t), Va(t, null, null, n), Ba()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Bi(t, $i, r), r !== a.cache && Ui(t, [$i], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Bi(t, $i, r))), $s(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Oc(e) {
		e.flags |= 4;
	}
	function kc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Tu()) e.flags |= 8192;
			else throw xa = _a, ha;
		} else e.flags &= -16777217;
	}
	function Ac(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (Tu()) e.flags |= 8192;
		else throw xa = _a, ha;
	}
	function jc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Ke(), e.lanes |= t, Xl |= t);
	}
	function Mc(e, t) {
		if (!Ei) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Nc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Pc(e, t, n) {
		var r = t.pendingProps;
		switch (Si(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Nc(t), null;
			case 1: return Nc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Vi($i), fe(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ni(t) ? Oc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Fi())), Nc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Oc(t), o === null ? (Nc(t), kc(t, a, null, r, n)) : (Nc(t), Ac(t, o))) : o ? o === e.memoizedState ? (Nc(t), t.flags &= -16777217) : (Oc(t), Nc(t), Ac(t, o)) : (e = e.memoizedProps, e !== r && Oc(t), Nc(t), kc(t, a, e, r, n)), null;
			case 27:
				if (me(t), n = le.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Oc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Nc(t), null;
					}
					e = se.current, Ni(t) ? ji(t, e) : (e = pf(a, r, n), t.stateNode = e, Oc(t));
				}
				return Nc(t), null;
			case 5:
				if (me(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Oc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Nc(t), null;
					}
					if (o = se.current, Ni(t)) ji(t, o);
					else {
						var s = Ud(le.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[tt] = t, o[nt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (X(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Oc(t);
					}
				}
				return Nc(t), kc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Oc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = le.current, Ni(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = wi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[tt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Fd(e.nodeValue, n)), e || Ai(t, !0);
					} else e = Ud(e).createTextNode(r), e[tt] = t, t.stateNode = e;
				}
				return Nc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Ni(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[tt] = t;
						} else Pi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Nc(t), e = !1;
					} else n = Fi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (to(t), t) : (to(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Nc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Ni(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[tt] = t;
						} else Pi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Nc(t), a = !1;
					} else a = Fi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (to(t), t) : (to(t), null);
				}
				return to(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), jc(t, t.updateQueue), Nc(t), null);
			case 4: return fe(), e === null && Td(t.stateNode.containerInfo), Nc(t), null;
			case 10: return Vi(t.type), Nc(t), null;
			case 19:
				if (F(no), r = t.memoizedState, r === null) return Nc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Mc(r, !1);
				else {
					if (Gl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = ro(e), o !== null) {
							for (t.flags |= 128, Mc(r, !1), e = o.updateQueue, t.updateQueue = e, jc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ni(n, e), n = n.sibling;
							return I(no, no.current & 1 | 2), Ei && yi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && De() > nu && (t.flags |= 128, a = !0, Mc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = ro(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, jc(t, e), Mc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !Ei) return Nc(t), null;
					} else 2 * De() - r.renderingStartTime > nu && n !== 536870912 && (t.flags |= 128, a = !0, Mc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Nc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = De(), e.sibling = null, n = no.current, I(no, a ? n & 1 | 2 : n & 1), Ei && yi(t, r.treeForkCount), e);
			case 22:
			case 23: return to(t), Ja(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Nc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Nc(t), n = t.updateQueue, n !== null && jc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && F(ua), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Vi($i), Nc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Fc(e, t) {
		switch (Si(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Vi($i), fe(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return me(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (to(t), t.alternate === null) throw Error(i(340));
					Pi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (to(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Pi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return F(no), null;
			case 4: return fe(), null;
			case 10: return Vi(t.type), null;
			case 22:
			case 23: return to(t), Ja(), e !== null && F(ua), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Vi($i), null;
			case 25: return null;
			default: return null;
		}
	}
	function Ic(e, t) {
		switch (Si(t), t.tag) {
			case 3:
				Vi($i), fe();
				break;
			case 26:
			case 27:
			case 5:
				me(t);
				break;
			case 4:
				fe();
				break;
			case 31:
				t.memoizedState !== null && to(t);
				break;
			case 13:
				to(t);
				break;
			case 19:
				F(no);
				break;
			case 10:
				Vi(t.type);
				break;
			case 22:
			case 23:
				to(t), Ja(), e !== null && F(ua);
				break;
			case 24: Vi($i);
		}
	}
	function Lc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Ku(t, t.return, e);
		}
	}
	function Rc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Ku(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Ku(t, t.return, e);
		}
	}
	function zc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ua(t, n);
			} catch (t) {
				Ku(e, e.return, t);
			}
		}
	}
	function Bc(e, t, n) {
		n.props = Vs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Ku(e, t, n);
		}
	}
	function Vc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Ku(e, t, n);
		}
	}
	function Hc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Ku(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Ku(e, t, n);
		}
		else n.current = null;
	}
	function Uc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Ku(e, e.return, t);
		}
	}
	function Wc(e, t, n) {
		try {
			var r = e.stateNode;
			Rd(r, e.type, n, t), r[nt] = t;
		} catch (t) {
			Ku(e, e.return, t);
		}
	}
	function Gc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && $d(e.type) || e.tag === 4;
	}
	function Kc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Gc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && $d(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Gt));
		else if (r !== 4 && (r === 27 && $d(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (qc(e, t, n), e = e.sibling; e !== null;) qc(e, t, n), e = e.sibling;
	}
	function Jc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && $d(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Jc(e, t, n), e = e.sibling; e !== null;) Jc(e, t, n), e = e.sibling;
	}
	function Yc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			X(t, r, n), t[tt] = e, t[nt] = n;
		} catch (t) {
			Ku(e, e.return, t);
		}
	}
	var Xc = !1, Zc = !1, Qc = !1, $c = typeof WeakSet == "function" ? WeakSet : Set, el = null;
	function tl(e, t) {
		if (e = e.containerInfo, Vd = sp, e = vr(e), yr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (Hd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, el = t; el !== null;) if (t = el, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, el = e;
		else for (; el !== null;) {
			switch (t = el, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Vs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Ku(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) Q(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								Q(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, el = e;
				break;
			}
			el = t.return;
		}
	}
	function nl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				_l(e, n), r & 4 && Lc(5, n);
				break;
			case 1:
				if (_l(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Ku(n, n.return, e);
				}
				else {
					var i = Vs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Ku(n, n.return, e);
					}
				}
				r & 64 && zc(n), r & 512 && Vc(n, n.return);
				break;
			case 3:
				if (_l(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ua(e, t);
					} catch (e) {
						Ku(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Yc(n);
			case 26:
			case 5:
				_l(e, n), t === null && r & 4 && Uc(n), r & 512 && Vc(n, n.return);
				break;
			case 12:
				_l(e, n);
				break;
			case 31:
				_l(e, n), r & 4 && cl(e, n);
				break;
			case 13:
				_l(e, n), r & 4 && ll(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Xu.bind(null, n), cf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Xc, !r) {
					t = t !== null && t.memoizedState !== null || Zc, i = Xc;
					var a = Zc;
					Xc = r, (Zc = t) && !a ? yl(e, n, (n.subtreeFlags & 8772) != 0) : _l(e, n), Xc = i, Zc = a;
				}
				break;
			case 30: break;
			default: _l(e, n);
		}
	}
	function rl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, rl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && lt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var il = null, al = !1;
	function ol(e, t, n) {
		for (n = n.child; n !== null;) sl(e, t, n), n = n.sibling;
	}
	function sl(e, t, n) {
		if (Ie && typeof Ie.onCommitFiberUnmount == "function") try {
			Ie.onCommitFiberUnmount(Fe, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Zc || Hc(n, t), ol(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Zc || Hc(n, t);
				var r = il, i = al;
				$d(n.type) && (il = n.stateNode, al = !1), ol(e, t, n), mf(n.stateNode), il = r, al = i;
				break;
			case 5: Zc || Hc(n, t);
			case 6:
				if (r = il, i = al, il = null, ol(e, t, n), il = r, al = i, il !== null) if (al) try {
					(il.nodeType === 9 ? il.body : il.nodeName === "HTML" ? il.ownerDocument.body : il).removeChild(n.stateNode);
				} catch (e) {
					Ku(n, t, e);
				}
				else try {
					il.removeChild(n.stateNode);
				} catch (e) {
					Ku(n, t, e);
				}
				break;
			case 18:
				il !== null && (al ? (e = il, ef(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : ef(il, n.stateNode));
				break;
			case 4:
				r = il, i = al, il = n.stateNode.containerInfo, al = !0, ol(e, t, n), il = r, al = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Rc(2, n, t), Zc || Rc(4, n, t), ol(e, t, n);
				break;
			case 1:
				Zc || (Hc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Bc(n, t, r)), ol(e, t, n);
				break;
			case 21:
				ol(e, t, n);
				break;
			case 22:
				Zc = (r = Zc) || n.memoizedState !== null, ol(e, t, n), Zc = r;
				break;
			default: ol(e, t, n);
		}
	}
	function cl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Ku(t, t.return, e);
			}
		}
	}
	function ll(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Ku(t, t.return, e);
		}
	}
	function ul(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new $c()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new $c()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function dl(e, t) {
		var n = ul(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Zu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function fl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if ($d(c.type)) {
							il = c.stateNode, al = !1;
							break a;
						}
						break;
					case 5:
						il = c.stateNode, al = !1;
						break a;
					case 3:
					case 4:
						il = c.stateNode.containerInfo, al = !0;
						break a;
				}
				c = c.return;
			}
			if (il === null) throw Error(i(160));
			sl(o, s, a), il = null, al = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) ml(t, e), t = t.sibling;
	}
	var pl = null;
	function ml(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				fl(t, e), hl(e), r & 4 && (Rc(3, e, e.return), Lc(3, e), Rc(5, e, e.return));
				break;
			case 1:
				fl(t, e), hl(e), r & 512 && (Zc || n === null || Hc(n, n.return)), r & 64 && Xc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = pl;
				if (fl(t, e), hl(e), r & 512 && (Zc || n === null || Hc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[ct] || o[tt] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), X(o, r, n), o[tt] = e, ft(o), r = o;
									break a;
								case "link":
									var s = Vf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), X(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), X(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[tt] = e, ft(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Wc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				fl(t, e), hl(e), r & 512 && (Zc || n === null || Hc(n, n.return)), n !== null && r & 4 && Wc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (fl(t, e), hl(e), r & 512 && (Zc || n === null || Hc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Lt(a, "");
					} catch (t) {
						Ku(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Wc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (Qc = !0);
				break;
			case 6:
				if (fl(t, e), hl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Ku(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = pl, pl = _f(t.containerInfo), fl(t, e), pl = a, hl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Ku(e, e.return, t);
				}
				Qc && (Qc = !1, gl(e));
				break;
			case 4:
				r = pl, pl = _f(e.stateNode.containerInfo), fl(t, e), hl(e), pl = r;
				break;
			case 12:
				fl(t, e), hl(e);
				break;
			case 31:
				fl(t, e), hl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, dl(e, r)));
				break;
			case 13:
				fl(t, e), hl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (eu = De()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, dl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Xc, d = Zc;
				if (Xc = u || a, Zc = d || l, fl(t, e), Zc = d, Xc = u, hl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Xc || Zc || vl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Ku(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Ku(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? tf(m, !0) : tf(l.stateNode, !1);
							} catch (e) {
								Ku(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, dl(e, n))));
				break;
			case 19:
				fl(t, e), hl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, dl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: fl(t, e), hl(e);
		}
	}
	function hl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Gc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Jc(e, Kc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Lt(o, ""), n.flags &= -33), Jc(e, Kc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						qc(e, Kc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Ku(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function gl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			gl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function _l(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) nl(e, t.alternate, t), t = t.sibling;
	}
	function vl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Rc(4, t, t.return), vl(t);
					break;
				case 1:
					Hc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Bc(t, t.return, n), vl(t);
					break;
				case 27: mf(t.stateNode);
				case 26:
				case 5:
					Hc(t, t.return), vl(t);
					break;
				case 22:
					t.memoizedState === null && vl(t);
					break;
				case 30:
					vl(t);
					break;
				default: vl(t);
			}
			e = e.sibling;
		}
	}
	function yl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					yl(i, a, n), Lc(4, a);
					break;
				case 1:
					if (yl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Ku(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ha(c[i], s);
						} catch (e) {
							Ku(r, r.return, e);
						}
					}
					n && o & 64 && zc(a), Vc(a, a.return);
					break;
				case 27: Yc(a);
				case 26:
				case 5:
					yl(i, a, n), n && r === null && o & 4 && Uc(a), Vc(a, a.return);
					break;
				case 12:
					yl(i, a, n);
					break;
				case 31:
					yl(i, a, n), n && o & 4 && cl(i, a);
					break;
				case 13:
					yl(i, a, n), n && o & 4 && ll(i, a);
					break;
				case 22:
					a.memoizedState === null && yl(i, a, n), Vc(a, a.return);
					break;
				case 30: break;
				default: yl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function bl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ta(n));
	}
	function xl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ta(e));
	}
	function Sl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Cl(e, t, n, r), t = t.sibling;
	}
	function Cl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Sl(e, t, n, r), i & 2048 && Lc(9, t);
				break;
			case 1:
				Sl(e, t, n, r);
				break;
			case 3:
				Sl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ta(e)));
				break;
			case 12:
				if (i & 2048) {
					Sl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Ku(t, t.return, e);
					}
				} else Sl(e, t, n, r);
				break;
			case 31:
				Sl(e, t, n, r);
				break;
			case 13:
				Sl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Sl(e, t, n, r) : (a._visibility |= 2, wl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? Sl(e, t, n, r) : Tl(e, t), i & 2048 && bl(o, t);
				break;
			case 24:
				Sl(e, t, n, r), i & 2048 && xl(t.alternate, t);
				break;
			default: Sl(e, t, n, r);
		}
	}
	function wl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					wl(a, o, s, c, i), Lc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, wl(a, o, s, c, i)) : u._visibility & 2 ? wl(a, o, s, c, i) : Tl(a, o), i && l & 2048 && bl(o.alternate, o);
					break;
				case 24:
					wl(a, o, s, c, i), i && l & 2048 && xl(o.alternate, o);
					break;
				default: wl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Tl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Tl(n, r), i & 2048 && bl(r.alternate, r);
					break;
				case 24:
					Tl(n, r), i & 2048 && xl(r.alternate, r);
					break;
				default: Tl(n, r);
			}
			t = t.sibling;
		}
	}
	var El = 8192;
	function Dl(e, t, n) {
		if (e.subtreeFlags & El) for (e = e.child; e !== null;) Ol(e, t, n), e = e.sibling;
	}
	function Ol(e, t, n) {
		switch (e.tag) {
			case 26:
				Dl(e, t, n), e.flags & El && e.memoizedState !== null && Gf(n, pl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Dl(e, t, n);
				break;
			case 3:
			case 4:
				var r = pl;
				pl = _f(e.stateNode.containerInfo), Dl(e, t, n), pl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = El, El = 16777216, Dl(e, t, n), El = r) : Dl(e, t, n));
				break;
			default: Dl(e, t, n);
		}
	}
	function kl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Al(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				el = r, Nl(r, e);
			}
			kl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) jl(e), e = e.sibling;
	}
	function jl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Al(e), e.flags & 2048 && Rc(9, e, e.return);
				break;
			case 3:
				Al(e);
				break;
			case 12:
				Al(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ml(e)) : Al(e);
				break;
			default: Al(e);
		}
	}
	function Ml(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				el = r, Nl(r, e);
			}
			kl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Rc(8, t, t.return), Ml(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Ml(t));
					break;
				default: Ml(t);
			}
			e = e.sibling;
		}
	}
	function Nl(e, t) {
		for (; el !== null;) {
			var n = el;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Rc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ta(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, el = r;
			else a: for (n = e; el !== null;) {
				r = el;
				var i = r.sibling, a = r.return;
				if (rl(r), r === n) {
					el = null;
					break a;
				}
				if (i !== null) {
					i.return = a, el = i;
					break a;
				}
				el = a;
			}
		}
	}
	var Pl = {
		getCacheForType: function(e) {
			var t = qi($i), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return qi($i).controller.signal;
		}
	}, Fl = typeof WeakMap == "function" ? WeakMap : Map, Il = 0, Ll = null, Y = null, Rl = 0, zl = 0, Bl = null, Vl = !1, Hl = !1, Ul = !1, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = 0, Zl = null, Ql = null, $l = !1, eu = 0, tu = 0, nu = Infinity, ru = null, iu = null, au = 0, ou = null, su = null, cu = 0, lu = 0, uu = null, du = null, fu = 0, pu = null;
	function mu() {
		return Il & 2 && Rl !== 0 ? Rl & -Rl : N.T === null ? Qe() : pd();
	}
	function hu() {
		if (Yl === 0) if (!(Rl & 536870912) || Ei) {
			var e = R;
			R <<= 1, !(R & 3932160) && (R = 262144), Yl = e;
		} else Yl = 536870912;
		return e = Ya.current, e !== null && (e.flags |= 32), Yl;
	}
	function gu(e, t, n) {
		(e === Ll && (zl === 2 || zl === 9) || e.cancelPendingCommit !== null) && (Cu(e, 0), bu(e, Rl, Yl, !1)), Je(e, n), (!(Il & 2) || e !== Ll) && (e === Ll && (!(Il & 2) && (ql |= n), Gl === 4 && bu(e, Rl, Yl, !1)), ad(e));
	}
	function _u(e, t, n) {
		if (Il & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || We(e, t), a = r ? ju(e, t) : ku(e, t, !0), o = r;
		do {
			if (a === 0) {
				Hl && !r && bu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !yu(n)) {
					a = ku(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Zl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Cu(c, s).flags |= 256), s = ku(c, s, !1), s !== 2) {
								if (Ul && !l) {
									c.errorRecoveryDisabledLanes |= o, ql |= o, a = 4;
									break a;
								}
								o = Ql, Ql = a, o !== null && (Ql === null ? Ql = o : Ql.push.apply(Ql, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Cu(e, 0), bu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							bu(r, t, Yl, !Vl);
							break a;
						case 2:
							Ql = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = eu + 300 - De(), 10 < a)) {
						if (bu(r, t, Yl, !Vl), B(r, 0, !0) !== 0) break a;
						cu = t, r.timeoutHandle = Z(vu.bind(null, r, n, Ql, ru, $l, t, Yl, ql, Xl, Vl, o, "Throttled", -0, 0), a);
						break a;
					}
					vu(r, n, Ql, ru, $l, t, Yl, ql, Xl, Vl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		ad(e);
	}
	function vu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Gt
			}, Ol(t, a, d);
			var m = (a & 62914560) === a ? eu - De() : (a & 4194048) === a ? tu - De() : 0;
			if (m = qf(d, m), m !== null) {
				cu = a, e.cancelPendingCommit = m(Ru.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), bu(e, a, o, !l);
				return;
			}
		}
		Ru(e, t, a, n, r, i, o, s, c);
	}
	function yu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!pr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function bu(e, t, n, r) {
		t &= ~Jl, t &= ~ql, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Re(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && H(e, n, t);
	}
	function xu() {
		return Il & 6 ? !0 : (od(0, !1), !1);
	}
	function Su() {
		if (Y !== null) {
			if (zl === 0) var e = Y.return;
			else e = Y, zi = Ri = null, Co(e), wa = null, Ta = 0, e = Y;
			for (; e !== null;) Ic(e.alternate, e), e = e.return;
			Y = null;
		}
	}
	function Cu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, Yd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), cu = 0, Su(), Ll = e, Y = n = ti(e.current, null), Rl = t, zl = 0, Bl = null, Vl = !1, Hl = We(e, t), Ul = !1, Xl = Yl = Jl = ql = Kl = Gl = 0, Ql = Zl = null, $l = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Re(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Wl = t, Gr(), n;
	}
	function wu(e, t) {
		J = null, N.H = Ns, t === ma || t === ga ? (t = Sa(), zl = 3) : t === ha ? (t = Sa(), zl = 4) : zl = t === Zs ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Bl = t, Y === null && (Gl = 1, Gs(e, li(t, e.current)));
	}
	function Tu() {
		var e = Ya.current;
		return e === null ? !0 : (Rl & 4194048) === Rl ? Xa === null : (Rl & 62914560) === Rl || Rl & 536870912 ? e === Xa : !1;
	}
	function Eu() {
		var e = N.H;
		return N.H = Ns, e === null ? Ns : e;
	}
	function Du() {
		var e = N.A;
		return N.A = Pl, e;
	}
	function Ou() {
		Gl = 4, Vl || (Rl & 4194048) !== Rl && Ya.current !== null || (Hl = !0), !(Kl & 134217727) && !(ql & 134217727) || Ll === null || bu(Ll, Rl, Yl, !1);
	}
	function ku(e, t, n) {
		var r = Il;
		Il |= 2;
		var i = Eu(), a = Du();
		(Ll !== e || Rl !== t) && (ru = null, Cu(e, t)), t = !1;
		var o = Gl;
		a: do
			try {
				if (zl !== 0 && Y !== null) {
					var s = Y, c = Bl;
					switch (zl) {
						case 8:
							Su(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Ya.current === null && (t = !0);
							var l = zl;
							if (zl = 0, Bl = null, Fu(e, s, c, l), n && Hl) {
								o = 0;
								break a;
							}
							break;
						default: l = zl, zl = 0, Bl = null, Fu(e, s, c, l);
					}
				}
				Au(), o = Gl;
				break;
			} catch (t) {
				wu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, zi = Ri = null, Il = r, N.H = i, N.A = a, Y === null && (Ll = null, Rl = 0, Gr()), o;
	}
	function Au() {
		for (; Y !== null;) Nu(Y);
	}
	function ju(e, t) {
		var n = Il;
		Il |= 2;
		var r = Eu(), a = Du();
		Ll !== e || Rl !== t ? (ru = null, nu = De() + 500, Cu(e, t)) : Hl = We(e, t);
		a: do
			try {
				if (zl !== 0 && Y !== null) {
					t = Y;
					var o = Bl;
					b: switch (zl) {
						case 1:
							zl = 0, Bl = null, Fu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (va(o)) {
								zl = 0, Bl = null, Pu(t);
								break;
							}
							t = function() {
								zl !== 2 && zl !== 9 || Ll !== e || (zl = 7), ad(e);
							}, o.then(t, t);
							break a;
						case 3:
							zl = 7;
							break a;
						case 4:
							zl = 5;
							break a;
						case 7:
							va(o) ? (zl = 0, Bl = null, Pu(t)) : (zl = 0, Bl = null, Fu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Y.tag) {
								case 26: s = Y.memoizedState;
								case 5:
								case 27:
									var c = Y;
									if (s ? Wf(s) : c.stateNode.complete) {
										zl = 0, Bl = null;
										var l = c.sibling;
										if (l !== null) Y = l;
										else {
											var u = c.return;
											u === null ? Y = null : (Y = u, Iu(u));
										}
										break b;
									}
							}
							zl = 0, Bl = null, Fu(e, t, o, 5);
							break;
						case 6:
							zl = 0, Bl = null, Fu(e, t, o, 6);
							break;
						case 8:
							Su(), Gl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Mu();
				break;
			} catch (t) {
				wu(e, t);
			}
		while (1);
		return zi = Ri = null, N.H = r, N.A = a, Il = n, Y === null ? (Ll = null, Rl = 0, Gr(), Gl) : 0;
	}
	function Mu() {
		for (; Y !== null && !Te();) Nu(Y);
	}
	function Nu(e) {
		var t = Dc(e.alternate, e, Wl);
		e.memoizedProps = e.pendingProps, t === null ? Iu(e) : Y = t;
	}
	function Pu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = dc(n, t, t.pendingProps, t.type, void 0, Rl);
				break;
			case 11:
				t = dc(n, t, t.pendingProps, t.type.render, t.ref, Rl);
				break;
			case 5: Co(t);
			default: Ic(n, t), t = Y = ni(t, Wl), t = Dc(n, t, Wl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Iu(e) : Y = t;
	}
	function Fu(e, t, n, r) {
		zi = Ri = null, Co(t), wa = null, Ta = 0;
		var i = t.return;
		try {
			if (Xs(e, i, t, n, Rl)) {
				Gl = 1, Gs(e, li(n, e.current)), Y = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Y = i, t;
			Gl = 1, Gs(e, li(n, e.current)), Y = null;
			return;
		}
		t.flags & 32768 ? (Ei || r === 1 ? e = !0 : Hl || Rl & 536870912 ? e = !1 : (Vl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Ya.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Lu(t, e)) : Iu(t);
	}
	function Iu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Lu(t, Vl);
				return;
			}
			e = t.return;
			var n = Pc(t.alternate, t, Wl);
			if (n !== null) {
				Y = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Y = t;
				return;
			}
			Y = t = e;
		} while (t !== null);
		Gl === 0 && (Gl = 5);
	}
	function Lu(e, t) {
		do {
			var n = Fc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Y = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Y = e;
				return;
			}
			Y = e = n;
		} while (e !== null);
		Gl = 6, Y = null;
	}
	function Ru(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Uu();
		while (au !== 0);
		if (Il & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Wr, V(e, n, o, s, c, l), e === Ll && (Y = Ll = null, Rl = 0), su = t, ou = e, cu = n, lu = o, uu = a, du = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Qu(L, function() {
				return Wu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = N.T, N.T = null, a = P.p, P.p = 2, s = Il, Il |= 4;
				try {
					tl(e, t, n);
				} finally {
					Il = s, P.p = a, N.T = r;
				}
			}
			au = 1, zu(), Bu(), Vu();
		}
	}
	function zu() {
		if (au === 1) {
			au = 0;
			var e = ou, t = su, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = N.T, N.T = null;
				var r = P.p;
				P.p = 2;
				var i = Il;
				Il |= 4;
				try {
					ml(t, e);
					var a = Hd, o = vr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && _r(s.ownerDocument.documentElement, s)) {
						if (c !== null && yr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = gr(s, h), v = gr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Vd, Hd = Vd = null;
				} finally {
					Il = i, P.p = r, N.T = n;
				}
			}
			e.current = t, au = 2;
		}
	}
	function Bu() {
		if (au === 2) {
			au = 0;
			var e = ou, t = su, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = N.T, N.T = null;
				var r = P.p;
				P.p = 2;
				var i = Il;
				Il |= 4;
				try {
					nl(e, t.alternate, t);
				} finally {
					Il = i, P.p = r, N.T = n;
				}
			}
			au = 3;
		}
	}
	function Vu() {
		if (au === 4 || au === 3) {
			au = 0, Ee();
			var e = ou, t = su, n = cu, r = du;
			t.subtreeFlags & 10256 || t.flags & 10256 ? au = 5 : (au = 0, su = ou = null, Hu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (iu = null), Ze(n), t = t.stateNode, Ie && typeof Ie.onCommitFiberRoot == "function") try {
				Ie.onCommitFiberRoot(Fe, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = N.T, i = P.p, P.p = 2, N.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					N.T = t, P.p = i;
				}
			}
			cu & 3 && Uu(), ad(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === pu ? fu++ : (fu = 0, pu = e) : fu = 0, od(0, !1);
		}
	}
	function Hu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ta(t)));
	}
	function Uu() {
		return zu(), Bu(), Vu(), Wu();
	}
	function Wu() {
		if (au !== 5) return !1;
		var e = ou, t = lu;
		lu = 0;
		var n = Ze(cu), r = N.T, a = P.p;
		try {
			P.p = 32 > n ? 32 : n, N.T = null, n = uu, uu = null;
			var o = ou, s = cu;
			if (au = 0, su = ou = null, cu = 0, Il & 6) throw Error(i(331));
			var c = Il;
			if (Il |= 4, jl(o.current), Cl(o, o.current, s, n), Il = c, od(0, !1), Ie && typeof Ie.onPostCommitFiberRoot == "function") try {
				Ie.onPostCommitFiberRoot(Fe, o);
			} catch {}
			return !0;
		} finally {
			P.p = a, N.T = r, Hu(e, t);
		}
	}
	function Gu(e, t, n) {
		t = li(n, t), t = qs(e.stateNode, t, 2), e = Ia(e, t, 2), e !== null && (Je(e, 2), ad(e));
	}
	function Ku(e, t, n) {
		if (e.tag === 3) Gu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Gu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (iu === null || !iu.has(r))) {
					e = li(n, e), n = Js(2), r = Ia(t, n, 2), r !== null && (Ys(n, r, t, e), Je(r, 2), ad(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function qu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Fl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Ul = !0, i.add(n), e = Ju.bind(null, e, t, n), t.then(e, e));
	}
	function Ju(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Ll === e && (Rl & n) === n && (Gl === 4 || Gl === 3 && (Rl & 62914560) === Rl && 300 > De() - eu ? !(Il & 2) && Cu(e, 0) : Jl |= n, Xl === Rl && (Xl = 0)), ad(e);
	}
	function Yu(e, t) {
		t === 0 && (t = Ke()), e = Jr(e, t), e !== null && (Je(e, t), ad(e));
	}
	function Xu(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Yu(e, n);
	}
	function Zu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Yu(e, n);
	}
	function Qu(e, t) {
		return Ce(e, t);
	}
	var $u = null, ed = null, td = !1, nd = !1, rd = !1, id = 0;
	function ad(e) {
		e !== ed && e.next === null && (ed === null ? $u = ed = e : ed = ed.next = e), nd = !0, td || (td = !0, fd());
	}
	function od(e, t) {
		if (!rd && nd) {
			rd = !0;
			do
				for (var n = !1, r = $u; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Re(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, dd(r, a));
					} else a = Rl, a = B(r, r === Ll ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || We(r, a) || (n = !0, dd(r, a));
					r = r.next;
				}
			while (n);
			rd = !1;
		}
	}
	function sd() {
		cd();
	}
	function cd() {
		nd = td = !1;
		var e = 0;
		id !== 0 && Jd() && (e = id);
		for (var t = De(), n = null, r = $u; r !== null;) {
			var i = r.next, a = ld(r, t);
			a === 0 ? (r.next = null, n === null ? $u = i : n.next = i, i === null && (ed = n)) : (n = r, (e !== 0 || a & 3) && (nd = !0)), r = i;
		}
		au !== 0 && au !== 5 || od(e, !1), id !== 0 && (id = 0);
	}
	function ld(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Re(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ge(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Ll, n = Rl, n = B(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (zl === 2 || zl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && we(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || We(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && we(r), Ze(n)) {
				case 2:
				case 8:
					n = Ae;
					break;
				case 32:
					n = L;
					break;
				case 268435456:
					n = Me;
					break;
				default: n = L;
			}
			return r = ud.bind(null, e), n = Ce(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && we(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function ud(e, t) {
		if (au !== 0 && au !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Uu() && e.callbackNode !== n) return null;
		var r = Rl;
		return r = B(e, e === Ll ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (_u(e, r, t), ld(e, De()), e.callbackNode != null && e.callbackNode === n ? ud.bind(null, e) : null);
	}
	function dd(e, t) {
		if (Uu()) return null;
		_u(e, t, !0);
	}
	function fd() {
		Zd(function() {
			Il & 6 ? Ce(ke, sd) : cd();
		});
	}
	function pd() {
		if (id === 0) {
			var e = ia;
			e === 0 && (e = He, He <<= 1, !(He & 261888) && (He = 256)), id = e;
		}
		return id;
	}
	function md(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Wt("" + e);
	}
	function hd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function gd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = md((i[nt] || null).action), o = r.submitter;
			o && (t = (t = o[nt] || null) ? md(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new fn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (id !== 0) {
								var e = o ? hd(i, o) : new FormData(i);
								ys(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? hd(i, o) : new FormData(i), ys(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var _d = 0; _d < zr.length; _d++) {
		var vd = zr[_d];
		Br(vd.toLowerCase(), "on" + (vd[0].toUpperCase() + vd.slice(1)));
	}
	Br(jr, "onAnimationEnd"), Br(Mr, "onAnimationIteration"), Br(Nr, "onAnimationStart"), Br("dblclick", "onDoubleClick"), Br("focusin", "onFocus"), Br("focusout", "onBlur"), Br(Pr, "onTransitionRun"), Br(Fr, "onTransitionStart"), Br(Ir, "onTransitionCancel"), Br(Lr, "onTransitionEnd"), gt("onMouseEnter", ["mouseout", "mouseover"]), gt("onMouseLeave", ["mouseout", "mouseover"]), gt("onPointerEnter", ["pointerout", "pointerover"]), gt("onPointerLeave", ["pointerout", "pointerover"]), ht("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), ht("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), ht("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), ht("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), ht("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), ht("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var yd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), bd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yd));
	function xd(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Vr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Vr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Sd(e, t) {
		var n = t[it];
		n === void 0 && (n = t[it] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Ed(t, e, 2, !1), n.add(r));
	}
	function Cd(e, t, n) {
		var r = 0;
		t && (r |= 4), Ed(n, e, r, t);
	}
	var wd = "_reactListening" + Math.random().toString(36).slice(2);
	function Td(e) {
		if (!e[wd]) {
			e[wd] = !0, pt.forEach(function(t) {
				t !== "selectionchange" && (bd.has(t) || Cd(t, !1, e), Cd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[wd] || (t[wd] = !0, Cd("selectionchange", !1, t));
		}
	}
	function Ed(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !tn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Dd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = ut(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Qt(function() {
			var r = a, i = qt(n), s = [];
			a: {
				var c = Rr.get(e);
				if (c !== void 0) {
					var l = fn, u = e;
					switch (e) {
						case "keypress": if (sn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = An;
							break;
						case "focusin":
							u = "focus", l = xn;
							break;
						case "focusout":
							u = "blur", l = xn;
							break;
						case "beforeblur":
						case "afterblur":
							l = xn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = yn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = bn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Mn;
							break;
						case jr:
						case Mr:
						case Nr:
							l = Sn;
							break;
						case Lr:
							l = Nn;
							break;
						case "scroll":
						case "scrollend":
							l = mn;
							break;
						case "wheel":
							l = Pn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Cn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = jn;
							break;
						case "toggle":
						case "beforetoggle": l = Fn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = $t(m, p), g != null && d.push(Od(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Kt && (u = n.relatedTarget || n.fromElement) && (ut(u) || u[rt])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? ut(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = yn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = jn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : dt(l), h = u == null ? c : dt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, ut(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Ad, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && jd(s, c, l, d, !1), u !== null && f !== null && jd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? dt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = tr;
					else if (Yn(c)) if (nr) v = dr;
					else {
						v = lr;
						var y = cr;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Vt(r.elementType) && (v = tr) : v = ur;
					if (v &&= v(e, r)) {
						Xn(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Nt(c, "number", c.value);
				}
				switch (y = r ? dt(r) : window, e) {
					case "focusin":
						(Yn(y) || y.contentEditable === "true") && (xr = y, Sr = r, Cr = null);
						break;
					case "focusout":
						Cr = Sr = xr = null;
						break;
					case "mousedown":
						wr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						wr = !1, Tr(s, n, i);
						break;
					case "selectionchange": if (br) break;
					case "keydown":
					case "keyup": Tr(s, n, i);
				}
				var b;
				if (Ln) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else Gn ? Un(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Bn && n.locale !== "ko" && (Gn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Gn && (b = on()) : (nn = i, rn = "value" in nn ? nn.value : nn.textContent, Gn = !0)), y = kd(r, x), 0 < y.length && (x = new wn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Wn(n), b !== null && (x.data = b)))), (b = zn ? Kn(e, n) : qn(e, n)) && (x = kd(r, "onBeforeInput"), 0 < x.length && (y = new wn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), gd(s, e, r, n, i);
			}
			xd(s, t);
		});
	}
	function Od(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function kd(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = $t(e, n), i != null && r.unshift(Od(e, i, a)), i = $t(e, t), i != null && r.push(Od(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Ad(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function jd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = $t(n, a), l != null && o.unshift(Od(n, l, c))) : i || (l = $t(n, a), l != null && o.push(Od(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Md = /\r\n?/g, Nd = /\u0000|\uFFFD/g;
	function Pd(e) {
		return (typeof e == "string" ? e : "" + e).replace(Md, "\n").replace(Nd, "");
	}
	function Fd(e, t) {
		return t = Pd(t), Pd(e) === t;
	}
	function Id(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Lt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Lt(e, "" + r);
				break;
			case "className":
				St(e, "class", r);
				break;
			case "tabIndex":
				St(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				St(e, n, r);
				break;
			case "style":
				Bt(e, r, o);
				break;
			case "data": if (t !== "object") {
				St(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Wt("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && Id(e, t, "name", a.name, a, null), Id(e, t, "formEncType", a.formEncType, a, null), Id(e, t, "formMethod", a.formMethod, a, null), Id(e, t, "formTarget", a.formTarget, a, null)) : (Id(e, t, "encType", a.encType, a, null), Id(e, t, "method", a.method, a, null), Id(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Wt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Gt);
				break;
			case "onScroll":
				r != null && Sd("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Sd("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = Wt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Sd("beforetoggle", e), Sd("toggle", e), xt(e, "popover", r);
				break;
			case "xlinkActuate":
				Ct(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Ct(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Ct(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Ct(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Ct(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Ct(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Ct(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Ct(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Ct(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				xt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Ht.get(n) || n, xt(e, n, r));
		}
	}
	function Ld(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Bt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Lt(e, r) : (typeof r == "number" || typeof r == "bigint") && Lt(e, "" + r);
				break;
			case "onScroll":
				r != null && Sd("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Sd("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Gt);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!mt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[nt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : xt(e, n, r);
			}
		}
	}
	function X(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Sd("error", e), Sd("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Id(e, t, o, s, n, null);
					}
				}
				a && Id(e, t, "srcSet", n.srcSet, n, null), r && Id(e, t, "src", n.src, n, null);
				return;
			case "input":
				Sd("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Id(e, t, r, d, n, null);
					}
				}
				Mt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Sd("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Id(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Pt(e, !!r, n, !0) : Pt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Sd("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Id(e, t, s, c, n, null);
				}
				It(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Id(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Sd("beforetoggle", e), Sd("toggle", e), Sd("cancel", e), Sd("close", e);
				break;
			case "iframe":
			case "object":
				Sd("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < yd.length; r++) Sd(yd[r], e);
				break;
			case "image":
				Sd("error", e), Sd("load", e);
				break;
			case "details":
				Sd("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Sd("error", e), Sd("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Id(e, t, u, r, n, null);
				}
				return;
			default: if (Vt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Ld(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Id(e, t, c, r, n, null));
	}
	function Rd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Id(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Id(e, t, p, m, r, f);
					}
				}
				jt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Id(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Id(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Pt(e, !!n, n ? [] : "", !1) : Pt(e, !!n, t, !0)) : Pt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Id(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Id(e, t, s, a, r, o);
				}
				Ft(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Id(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Id(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Id(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Id(e, t, u, p, r, m);
				}
				return;
			default: if (Vt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Ld(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Ld(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Id(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Id(e, t, f, p, r, m);
	}
	function zd(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Bd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && zd(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && zd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Vd = null, Hd = null;
	function Ud(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Wd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Gd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Kd(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var qd = null;
	function Jd() {
		var e = window.event;
		return e && e.type === "popstate" ? e === qd ? !1 : (qd = e, !0) : (qd = null, !1);
	}
	var Z = typeof setTimeout == "function" ? setTimeout : void 0, Yd = typeof clearTimeout == "function" ? clearTimeout : void 0, Xd = typeof Promise == "function" ? Promise : void 0, Zd = typeof queueMicrotask == "function" ? queueMicrotask : Xd === void 0 ? Z : function(e) {
		return Xd.resolve(null).then(e).catch(Qd);
	};
	function Qd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function $d(e) {
		return e === "head";
	}
	function ef(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Np(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") mf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, mf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[ct] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && mf(e.ownerDocument.body);
			n = i;
		} while (n);
		Np(t);
	}
	function tf(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function Q(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					Q(n), lt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function nf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[ct]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = lf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function rf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = lf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = lf(e.nextSibling), e === null)) return null;
		return e;
	}
	function of(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function sf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function cf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function lf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var uf = null;
	function df(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return lf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function ff(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function pf(e, t, n) {
		switch (t = Ud(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function mf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		lt(e);
	}
	var hf = /* @__PURE__ */ new Map(), gf = /* @__PURE__ */ new Set();
	function _f(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var vf = P.d;
	P.d = {
		f: yf,
		r: bf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function yf() {
		var e = vf.f(), t = xu();
		return e || t;
	}
	function bf(e) {
		var t = W(e);
		t !== null && t.tag === 5 && t.type === "form" ? xs(t) : vf.r(e);
	}
	var $ = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = $;
		if (r && typeof t == "string" && t) {
			var i = At(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), gf.has(i) || (gf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), X(t, "link", e), ft(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		vf.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		vf.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		vf.L(e, t, n);
		var r = $;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + At(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + At(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + At(n.imageSizes) + "\"]")) : i += "[href=\"" + At(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			hf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), hf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), X(t, "link", e), ft(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		vf.m(e, t);
		var n = $;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + At(r) + "\"][href=\"" + At(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!hf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), hf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), X(r, "link", e), ft(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		vf.S(e, t, n);
		var r = $;
		if (r && e) {
			var i = G(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = hf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					ft(c), X(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		vf.X(e, t);
		var n = $;
		if (n && e) {
			var r = G(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = hf.get(i)) && zf(e, t), a = n.createElement("script"), ft(a), X(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		vf.M(e, t);
		var n = $;
		if (n && e) {
			var r = G(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = hf.get(i)) && zf(e, t), a = n.createElement("script"), ft(a), X(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = le.current) ? _f(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = G(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = G(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), hf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, hf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = G(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + At(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), X(t, "link", n), ft(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + At(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + At(n.href) + "\"]");
				if (r) return t.instance = r, ft(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), ft(r), X(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, ft(o), o;
				r = Mf(n), (a = hf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), ft(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), X(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, ft(a), a) : (r = n, (a = hf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), ft(a), X(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[ct] || a[tt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, ft(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = hf.get(i)) && Rf(r, i), a = a.createElement("link"), ft(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), X(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Bd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: re,
		_currentValue2: re,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = qe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qe(0), this.hiddenUpdates = qe(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = $r(3, null, null, t), e.current = a, a.stateNode = e, t = ea(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Na(a), e;
	}
	function tp(e) {
		return e ? (e = Zr, e) : Zr;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Fa(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ia(e, r, t), n !== null && (gu(n, e, t), La(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Jr(e, 67108864);
			t !== null && gu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = mu();
			t = Xe(t);
			var n = Jr(e, t);
			n !== null && gu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = N.T;
		N.T = null;
		var a = P.p;
		try {
			P.p = 2, up(e, t, n, r);
		} finally {
			P.p = a, N.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = N.T;
		N.T = null;
		var a = P.p;
		try {
			P.p = 8, up(e, t, n, r);
		} finally {
			P.p = a, N.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) Dd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = W(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ue(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Re(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									ad(a), !(Il & 6) && (nu = De() + 500, od(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Jr(a, 2), s !== null && gu(s, a, 2), xu(), ip(a, 2);
					}
					if (a = dp(r), a === null && Dd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Dd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = qt(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = ut(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Oe()) {
				case ke: return 2;
				case Ae: return 8;
				case L:
				case je: return 32;
				case Me: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = W(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = ut(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, $e(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, $e(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Kt = r, n.target.dispatchEvent(r), Kt = null;
			} else return t = W(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = W(n);
				a !== null && (e.splice(t, 3), t -= 3, ys(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[nt] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[nt] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, mu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), xu(), t[rt] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = Qe();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.6") throw Error(i(527, Lp, "19.2.6"));
	P.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.6",
		rendererPackageName: "react-dom",
		currentDispatcherRef: N,
		reconcilerVersion: "19.2.6"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Fe = zp.inject(Rp), Ie = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Hs, s = Us, c = Ws;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[rt] = t.current, Td(e), new Fp(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})), _ = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), v = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), y = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), b = (e) => {
	let t = y(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, x = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, S = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, C = /* @__PURE__ */ c(u(), 1), w = (0, C.createContext)({}), T = () => (0, C.useContext)(w), E = (0, C.forwardRef)(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => {
	let { size: l = 24, strokeWidth: u = 2, absoluteStrokeWidth: d = !1, color: f = "currentColor", className: p = "" } = T() ?? {}, m = r ?? d ? Number(n ?? u) * 24 / Number(t ?? l) : n ?? u;
	return (0, C.createElement)("svg", {
		ref: c,
		...x,
		width: t ?? l ?? x.width,
		height: t ?? l ?? x.height,
		stroke: e ?? f,
		strokeWidth: m,
		className: _("lucide", p, i),
		...!a && !S(s) && { "aria-hidden": "true" },
		...s
	}, [...o.map(([e, t]) => (0, C.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]);
}), D = (e, t) => {
	let n = (0, C.forwardRef)(({ className: n, ...r }, i) => (0, C.createElement)(E, {
		ref: i,
		iconNode: t,
		className: _(`lucide-${v(b(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = b(e), n;
}, O = D("book-open", [["path", {
	d: "M12 5v16",
	key: "1f6ucr"
}], ["path", {
	d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
	key: "1fyvmf"
}]]), k = D("calendar-days", [
	["path", {
		d: "M8 2v3",
		key: "1ioesn"
	}],
	["path", {
		d: "M16 2v3",
		key: "otl347"
	}],
	["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}],
	["path", {
		d: "M3 9h18",
		key: "1pudct"
	}],
	["path", {
		d: "M8 13h.01",
		key: "1sbv64"
	}],
	["path", {
		d: "M12 13h.01",
		key: "y0uutt"
	}],
	["path", {
		d: "M16 13h.01",
		key: "wip0gl"
	}],
	["path", {
		d: "M8 17h.01",
		key: "p3bg7i"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}],
	["path", {
		d: "M16 17h.01",
		key: "ql8jdd"
	}]
]), A = D("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), ee = D("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), j = D("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), M = D("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), te = D("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), ne = D("clipboard-check", [
	["rect", {
		width: "8",
		height: "4",
		x: "8",
		y: "2",
		rx: "1",
		ry: "1",
		key: "tgr4d6"
	}],
	["path", {
		d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
		key: "116196"
	}],
	["path", {
		d: "m9 14 2 2 4-4",
		key: "df797q"
	}]
]), N = D("clock", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M12 6v6l4 2",
	key: "mmk7yg"
}]]), P = D("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]), re = D("eye", [["path", {
	d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	key: "1nclc0"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), ie = D("file-text", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]), ae = D("flask-conical", [
	["path", {
		d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
		key: "18mbvz"
	}],
	["path", {
		d: "M6.453 15h11.094",
		key: "3shlmq"
	}],
	["path", {
		d: "M8.5 2h7",
		key: "csnxdl"
	}]
]), oe = D("globe", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
		key: "13o1zl"
	}],
	["path", {
		d: "M2 12h20",
		key: "9i4pu4"
	}]
]), F = D("hard-drive", [
	["path", {
		d: "M10 16h.01",
		key: "1bzywj"
	}],
	["path", {
		d: "M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
		key: "18tbho"
	}],
	["path", {
		d: "M21.946 12.013H2.054",
		key: "zqlbp7"
	}],
	["path", {
		d: "M6 16h.01",
		key: "1pmjb7"
	}]
]), I = D("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]), se = D("layout-dashboard", [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1",
		key: "10lvy0"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1",
		key: "16une8"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1",
		key: "1hutg5"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "ldoo1y"
	}]
]), ce = D("leaf", [["path", {
	d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
	key: "nnexq3"
}], ["path", {
	d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",
	key: "mt58a7"
}]]), le = D("lightbulb", [
	["path", {
		d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
		key: "1gvzjb"
	}],
	["path", {
		d: "M9 18h6",
		key: "x1upvd"
	}],
	["path", {
		d: "M10 22h4",
		key: "ceow96"
	}]
]), ue = D("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), de = D("lock-keyhole", [
	["circle", {
		cx: "12",
		cy: "16",
		r: "1",
		key: "1au0dj"
	}],
	["rect", {
		x: "3",
		y: "10",
		width: "18",
		height: "12",
		rx: "2",
		key: "6s8ecr"
	}],
	["path", {
		d: "M7 10V7a5 5 0 0 1 10 0v3",
		key: "1pqi11"
	}]
]), fe = D("map-pin", [["path", {
	d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
	key: "1r0f0z"
}], ["circle", {
	cx: "12",
	cy: "10",
	r: "3",
	key: "ilqhr7"
}]]), pe = D("menu", [
	["path", {
		d: "M4 5h16",
		key: "1tepv9"
	}],
	["path", {
		d: "M4 12h16",
		key: "1lakjw"
	}],
	["path", {
		d: "M4 19h16",
		key: "1djgab"
	}]
]), me = D("message-square", [["path", {
	d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	key: "18887p"
}]]), he = D("notebook-pen", [
	["path", {
		d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4",
		key: "re6nr2"
	}],
	["path", {
		d: "M2 6h4",
		key: "aawbzj"
	}],
	["path", {
		d: "M2 10h4",
		key: "l0bgd4"
	}],
	["path", {
		d: "M2 14h4",
		key: "1gsvsf"
	}],
	["path", {
		d: "M2 18h4",
		key: "1bu2t1"
	}],
	["path", {
		d: "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
		key: "pqwjuv"
	}]
]), ge = D("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]), _e = D("quote", [["path", {
	d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
	key: "rib7q0"
}], ["path", {
	d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
	key: "1ymkrd"
}]]), ve = D("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]), ye = D("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), be = D("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), xe = D("sprout", [
	["path", {
		d: "M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3",
		key: "139s4v"
	}],
	["path", {
		d: "M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4",
		key: "1dlkgp"
	}],
	["path", {
		d: "M5 21h14",
		key: "11awu3"
	}]
]), Se = D("star", [["path", {
	d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
	key: "r04s7s"
}]]), Ce = D("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]), we = D("upload", [
	["path", {
		d: "M12 3v12",
		key: "1x0j5s"
	}],
	["path", {
		d: "m17 8-5-5-5 5",
		key: "7q97r8"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}]
]), Te = D("users", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["path", {
		d: "M16 3.128a4 4 0 0 1 0 7.744",
		key: "16gr8j"
	}],
	["path", {
		d: "M22 21v-2a4 4 0 0 0-3-3.87",
		key: "kshegd"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]), Ee = D("wifi-off", [
	["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}],
	["path", {
		d: "M8.5 16.429a5 5 0 0 1 7 0",
		key: "1bycff"
	}],
	["path", {
		d: "M5 12.859a10 10 0 0 1 5.17-2.69",
		key: "1dl1wf"
	}],
	["path", {
		d: "M19 12.859a10 10 0 0 0-2.007-1.523",
		key: "4k23kn"
	}],
	["path", {
		d: "M2 8.82a15 15 0 0 1 4.177-2.643",
		key: "1grhjp"
	}],
	["path", {
		d: "M22 8.82a15 15 0 0 0-11.288-3.764",
		key: "z3jwby"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}]
]), De = D("wifi", [
	["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}],
	["path", {
		d: "M2 8.82a15 15 0 0 1 20 0",
		key: "dnpr2z"
	}],
	["path", {
		d: "M5 12.859a10 10 0 0 1 14 0",
		key: "1x1e6c"
	}],
	["path", {
		d: "M8.5 16.429a5 5 0 0 1 7 0",
		key: "1bycff"
	}]
]), Oe = D("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), ke = g(), Ae = /* @__PURE__ */ c(m(), 1);
function L(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var je = (e) => {
	switch (e) {
		case "success": return Pe;
		case "info": return Ie;
		case "warning": return Fe;
		case "error": return Le;
		default: return null;
	}
}, Me = Array(12).fill(0), Ne = ({ visible: e, className: t }) => /* @__PURE__ */ C.createElement("div", {
	className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
	"data-visible": e
}, /* @__PURE__ */ C.createElement("div", { className: "sonner-spinner" }, Me.map((e, t) => /* @__PURE__ */ C.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${t}`
})))), Pe = /* @__PURE__ */ C.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /* @__PURE__ */ C.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), Fe = /* @__PURE__ */ C.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /* @__PURE__ */ C.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), Ie = /* @__PURE__ */ C.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /* @__PURE__ */ C.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), Le = /* @__PURE__ */ C.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20",
	"aria-hidden": "true"
}, /* @__PURE__ */ C.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), Re = /* @__PURE__ */ C.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "12",
	height: "12",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.5",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true"
}, /* @__PURE__ */ C.createElement("line", {
	x1: "18",
	y1: "6",
	x2: "6",
	y2: "18"
}), /* @__PURE__ */ C.createElement("line", {
	x1: "6",
	y1: "6",
	x2: "18",
	y2: "18"
})), ze = () => {
	let [e, t] = C.useState(document.hidden);
	return C.useEffect(() => {
		let e = () => {
			t(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []), e;
}, Be = 1, Ve = 100, He = (e) => typeof e?.id == "number" || e?.id?.length > 0 ? e.id : Be++, R = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), this.getActiveToasts().forEach((t) => e(t)), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e], this.trimHistory();
		}, this.trimHistory = () => {
			let e = this.toasts.length - Ve;
			e <= 0 || (this.toasts = this.toasts.filter((t) => e > 0 && this.dismissedToasts.has(t.id) ? (this.dismissedToasts.delete(t.id), e--, !1) : !0));
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = He(e), i = this.pendingDismissals.get(r);
			i !== void 0 && (cancelAnimationFrame(i), this.pendingDismissals.delete(r), this.dismissedToasts.delete(r));
			let a = this.dismissedToasts.has(r), o = e.dismissible === void 0 ? !0 : e.dismissible;
			return a && (this.dismissedToasts.delete(r), this.toasts = this.toasts.filter((e) => e.id !== r)), !a && this.toasts.find((e) => e.id === r) ? this.toasts = this.toasts.map((n) => n.id === r ? (this.publish({
				...n,
				...e,
				id: r,
				title: t
			}), {
				...n,
				...e,
				id: r,
				dismissible: o,
				title: t
			}) : n) : this.addToast({
				title: t,
				...n,
				dismissible: o,
				id: r
			}), r;
		}, this.dismiss = (e) => {
			if (e == null) return this.getActiveToasts().forEach((e) => {
				this.dismissedToasts.add(e.id), this.subscribers.forEach((t) => t({
					id: e.id,
					dismiss: !0
				}));
			}), e;
			this.dismissedToasts.add(e);
			let t = this.pendingDismissals.get(e);
			return t !== void 0 && cancelAnimationFrame(t), this.pendingDismissals.set(e, requestAnimationFrame(() => {
				this.pendingDismissals.delete(e), this.subscribers.forEach((t) => t({
					id: e,
					dismiss: !0
				}));
			})), e;
		}, this.message = (e, t) => this.create({
			...t,
			message: e,
			type: void 0
		}), this.error = (e, t) => this.create({
			...t,
			message: e,
			type: "error"
		}), this.success = (e, t) => this.create({
			...t,
			type: "success",
			message: e
		}), this.info = (e, t) => this.create({
			...t,
			type: "info",
			message: e
		}), this.warning = (e, t) => this.create({
			...t,
			type: "warning",
			message: e
		}), this.loading = (e, t) => this.create({
			...t,
			type: "loading",
			message: e
		}), this.promise = (e, t) => {
			if (!t) return;
			let n;
			t.loading !== void 0 && (n = this.create({
				...t,
				promise: e,
				type: "loading",
				message: t.loading,
				description: typeof t.description == "function" ? void 0 : t.description
			}));
			let r = Promise.resolve(e instanceof Function ? e() : e), i = n !== void 0, a, o = r.then(async (e) => {
				if (a = ["resolve", e], C.isValidElement(e)) i = !1, this.create({
					id: n,
					type: "default",
					message: e
				});
				else if (Ue(e) && !e.ok) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(`HTTP error! status: ${e.status}`) : t.error, a = typeof t.description == "function" ? await t.description(`HTTP error! status: ${e.status}`) : t.description, o = typeof r == "object" && !C.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (e instanceof Error) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !C.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (t.success !== void 0) {
					i = !1;
					let r = typeof t.success == "function" ? await t.success(e) : t.success, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !C.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "success",
						description: a,
						...o
					});
				}
			}).catch(async (e) => {
				if (a = ["reject", e], t.error !== void 0) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !C.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				}
			}).finally(() => {
				i && (this.dismiss(n), n = void 0), t.finally == null || t.finally.call(t);
			}), s = () => new Promise((e, t) => o.then(() => a[0] === "reject" ? t(a[1]) : e(a[1])).catch(t));
			return typeof n != "string" && typeof n != "number" ? { unwrap: s } : Object.assign(n, { unwrap: s });
		}, this.custom = (e, t) => {
			let n = He(t);
			return this.create({
				...t,
				jsx: e(n),
				id: n,
				type: void 0
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set(), this.pendingDismissals = /* @__PURE__ */ new Map();
	}
}(), z = (e, t) => R.message(e, t), Ue = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", B = Object.assign(z, {
	success: R.success,
	info: R.info,
	warning: R.warning,
	error: R.error,
	custom: R.custom,
	message: R.message,
	promise: R.promise,
	dismiss: R.dismiss,
	loading: R.loading
}, {
	getHistory: () => R.toasts,
	getToasts: () => R.getActiveToasts()
});
L("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--normal-text);background:var(--normal-bg);border:1px solid var(--normal-border);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{-webkit-user-select:none;user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function We(e) {
	return e.label !== void 0;
}
var Ge = 3, Ke = "24px", qe = "16px", Je = 4e3, V = 356, H = 14, U = 45, Ye = 200;
function Xe(...e) {
	return e.filter(Boolean).join(" ");
}
function Ze(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var Qe = (e) => {
	let { invert: t, toast: n, unstyled: r, interacting: i, setHeights: a, visibleToasts: o, heights: s, index: c, toasts: l, expanded: u, removeToast: d, defaultRichColors: f, closeButton: p, style: m, cancelButtonStyle: h, actionButtonStyle: g, className: _ = "", descriptionClassName: v = "", duration: y, position: b, gap: x, expandByDefault: S, classNames: w, icons: T, closeButtonAriaLabel: E = "Close toast" } = e, [D, O] = C.useState(null), [k, A] = C.useState(null), [ee, j] = C.useState(!1), [M, te] = C.useState(!1), [ne, N] = C.useState(!1), [P, re] = C.useState(!1), [ie, ae] = C.useState(!1), [oe, F] = C.useState(0), [I, se] = C.useState(0), ce = C.useRef(n.duration || y || Je), le = C.useRef(null), ue = C.useRef(null), de = c === 0, fe = c + 1 <= o, pe = n.type, me = pe ?? "default", he = n.dismissible !== !1, ge = n.className || "", _e = n.descriptionClassName || "", ve = C.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]), ye = C.useMemo(() => n.closeButton ?? p, [n.closeButton, p]), be = C.useMemo(() => n.duration || y || Je, [n.duration, y]), xe = C.useRef(0), Se = C.useRef(0), Ce = C.useRef(0), we = C.useRef(null), [Te, Ee] = b.split("-"), De = C.useMemo(() => s.reduce((e, t, n) => n >= ve ? e : e + t.height, 0), [s, ve]), Oe = ze(), ke = C.useMemo(() => e.swipeDirections ?? Ze(b), [e.swipeDirections, b]), Ae = n.invert || t, L = pe === "loading";
	Se.current = C.useMemo(() => ve * x + De, [ve, De]), C.useEffect(() => {
		ce.current = be;
	}, [be]), C.useEffect(() => {
		j(!0);
	}, []), C.useEffect(() => {
		let e = ue.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return se(t), a((e) => [{
				toastId: n.id,
				height: t,
				position: n.position
			}, ...e]), () => a((e) => e.filter((e) => e.toastId !== n.id));
		}
	}, [a, n.id]), C.useLayoutEffect(() => {
		if (!ee) return;
		let e = ue.current, t = e.style.height;
		e.style.height = "auto";
		let r = e.getBoundingClientRect().height;
		e.style.height = t, se(r), a((e) => e.find((e) => e.toastId === n.id) ? e.map((e) => e.toastId === n.id ? {
			...e,
			height: r
		} : e) : [{
			toastId: n.id,
			height: r,
			position: n.position
		}, ...e]);
	}, [
		ee,
		n.title,
		n.description,
		a,
		n.id,
		n.jsx,
		n.action,
		n.cancel
	]);
	let Me = C.useCallback(() => {
		te(!0), F(Se.current), a((e) => e.filter((e) => e.toastId !== n.id)), setTimeout(() => {
			d(n);
		}, Ye);
	}, [
		n,
		d,
		a,
		Se
	]);
	C.useEffect(() => {
		if (n.promise && pe === "loading" || n.duration === Infinity || n.type === "loading") return;
		let e;
		return u || i || Oe ? (() => {
			if (Ce.current < xe.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - xe.current;
				ce.current -= e;
			}
			Ce.current = (/* @__PURE__ */ new Date()).getTime();
		})() : ce.current !== Infinity && (xe.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			n.onAutoClose == null || n.onAutoClose.call(n, n), Me();
		}, ce.current)), () => clearTimeout(e);
	}, [
		u,
		i,
		n,
		pe,
		Oe,
		Me
	]), C.useEffect(() => {
		n.delete && (Me(), n.onDismiss == null || n.onDismiss.call(n, n));
	}, [Me, n.delete]);
	function Pe() {
		return T?.loading ? /* @__PURE__ */ C.createElement("div", {
			className: Xe(w?.loader, n?.classNames?.loader, "sonner-loader"),
			"data-visible": pe === "loading"
		}, T.loading) : /* @__PURE__ */ C.createElement(Ne, {
			className: Xe(w?.loader, n?.classNames?.loader),
			visible: pe === "loading"
		});
	}
	let Fe = n.icon || T?.[pe] || je(pe);
	return /* @__PURE__ */ C.createElement("li", {
		tabIndex: 0,
		ref: ue,
		className: Xe(_, ge, w?.toast, n?.classNames?.toast, w?.[me], n?.classNames?.[me]),
		"data-sonner-toast": "",
		"data-rich-colors": n.richColors ?? f,
		"data-styled": !(n.jsx || n.unstyled || r),
		"data-mounted": ee,
		"data-promise": !!n.promise,
		"data-swiped": ie,
		"data-removed": M,
		"data-visible": fe,
		"data-y-position": Te,
		"data-x-position": Ee,
		"data-index": c,
		"data-front": de,
		"data-swiping": ne,
		"data-dismissible": he,
		"data-type": pe,
		"data-invert": Ae,
		"data-swipe-out": P,
		"data-swipe-direction": k,
		"data-expanded": !!(u || S && ee),
		"data-testid": n.testId,
		style: {
			"--index": c,
			"--toasts-before": c,
			"--z-index": l.length - c,
			"--offset": `${M ? oe : Se.current}px`,
			"--initial-height": S ? "auto" : `${I}px`,
			...m,
			...n.style
		},
		onDragEnd: () => {
			N(!1), O(null), we.current = null;
		},
		onPointerDown: (e) => {
			e.button !== 2 && (L || !he || (le.current = /* @__PURE__ */ new Date(), F(Se.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (N(!0), we.current = {
				x: e.clientX,
				y: e.clientY
			})));
		},
		onPointerUp: () => {
			if (P || !he) return;
			we.current = null;
			let e = Number(ue.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(ue.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), r = (/* @__PURE__ */ new Date()).getTime() - le.current?.getTime(), i = D === "x" ? e : t, a = Math.abs(i) / r;
			if ((D === "x" ? ke.includes(e > 0 ? "right" : "left") : ke.includes(t > 0 ? "bottom" : "top")) && (Math.abs(i) >= U || a > .11)) {
				F(Se.current), n.onDismiss == null || n.onDismiss.call(n, n), A(D === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), Me(), re(!0);
				return;
			} else {
				var o, s;
				(o = ue.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = ue.current) == null || s.style.setProperty("--swipe-amount-y", "0px");
			}
			ae(!1), N(!1), O(null);
		},
		onPointerMove: (e) => {
			var t, n;
			if (!we.current || !he || window.getSelection()?.toString().length > 0) return;
			let r = e.clientY - we.current.y, i = e.clientX - we.current.x;
			!D && (Math.abs(i) > 1 || Math.abs(r) > 1) && O(Math.abs(i) > Math.abs(r) ? "x" : "y");
			let a = {
				x: 0,
				y: 0
			}, o = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (D === "y") {
				if (ke.includes("top") || ke.includes("bottom")) if (ke.includes("top") && r < 0 || ke.includes("bottom") && r > 0) a.y = r;
				else {
					let e = r * o(r);
					a.y = Math.abs(e) < Math.abs(r) ? e : r;
				}
			} else if (D === "x" && (ke.includes("left") || ke.includes("right"))) if (ke.includes("left") && i < 0 || ke.includes("right") && i > 0) a.x = i;
			else {
				let e = i * o(i);
				a.x = Math.abs(e) < Math.abs(i) ? e : i;
			}
			(Math.abs(a.x) > 0 || Math.abs(a.y) > 0) && ae(!0), (t = ue.current) == null || t.style.setProperty("--swipe-amount-x", `${a.x}px`), (n = ue.current) == null || n.style.setProperty("--swipe-amount-y", `${a.y}px`);
		}
	}, ye && !n.jsx && pe !== "loading" ? /* @__PURE__ */ C.createElement("button", {
		"aria-label": E,
		"data-disabled": L,
		"data-close-button": !0,
		onClick: L || !he ? () => {} : () => {
			Me(), n.onDismiss == null || n.onDismiss.call(n, n);
		},
		className: Xe(w?.closeButton, n?.classNames?.closeButton)
	}, T?.close ?? Re) : null, (pe || n.icon || n.promise) && n.icon !== null && (T?.[pe] !== null || n.icon) ? /* @__PURE__ */ C.createElement("div", {
		"data-icon": "",
		className: Xe(w?.icon, n?.classNames?.icon)
	}, pe === "loading" ? n.icon || Pe() : n.promise ? Pe() : null, pe === "loading" ? null : Fe) : null, /* @__PURE__ */ C.createElement("div", {
		"data-content": "",
		className: Xe(w?.content, n?.classNames?.content)
	}, /* @__PURE__ */ C.createElement("div", {
		"data-title": "",
		className: Xe(w?.title, n?.classNames?.title)
	}, n.jsx ? n.jsx : typeof n.title == "function" ? n.title() : n.title), n.description ? /* @__PURE__ */ C.createElement("div", {
		"data-description": "",
		className: Xe(v, _e, w?.description, n?.classNames?.description)
	}, typeof n.description == "function" ? n.description() : n.description) : null), /* @__PURE__ */ C.isValidElement(n.cancel) ? n.cancel : n.cancel && We(n.cancel) ? /* @__PURE__ */ C.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: n.cancelButtonStyle || h,
		onClick: (e) => {
			We(n.cancel) && he && (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), Me());
		},
		className: Xe(w?.cancelButton, n?.classNames?.cancelButton)
	}, n.cancel.label) : null, /* @__PURE__ */ C.isValidElement(n.action) ? n.action : n.action && We(n.action) ? /* @__PURE__ */ C.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: n.actionButtonStyle || g,
		onClick: (e) => {
			We(n.action) && (n.action.onClick == null || n.action.onClick.call(n.action, e), !e.defaultPrevented && Me());
		},
		className: Xe(w?.actionButton, n?.classNames?.actionButton)
	}, n.action.label) : null);
};
function $e() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function et(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? qe : Ke;
		function o(e) {
			[
				"top",
				"right",
				"bottom",
				"left"
			].forEach((t) => {
				n[`${i}-${t}`] = typeof e == "number" ? `${e}px` : e;
			});
		}
		typeof e == "number" || typeof e == "string" ? o(e) : typeof e == "object" ? [
			"top",
			"right",
			"bottom",
			"left"
		].forEach((t) => {
			e[t] === void 0 ? n[`${i}-${t}`] = a : n[`${i}-${t}`] = typeof e[t] == "number" ? `${e[t]}px` : e[t];
		}) : o(a);
	}), n;
}
var tt = /* @__PURE__ */ C.forwardRef(function(e, t) {
	let { id: n, invert: r, position: i = "bottom-right", hotkey: a = ["altKey", "KeyT"], expand: o, closeButton: s, className: c, offset: l, mobileOffset: u, theme: d = "light", richColors: f, duration: p, style: m, visibleToasts: h = Ge, toastOptions: g, dir: _ = $e(), gap: v = H, icons: y, customAriaLabel: b, containerAriaLabel: x = "Notifications" } = e, [S, w] = C.useState([]), T = C.useMemo(() => n ? S.filter((e) => e.toasterId === n) : S.filter((e) => !e.toasterId), [S, n]), E = C.useMemo(() => Array.from(new Set([i].concat(T.filter((e) => e.position).map((e) => e.position)))), [T, i]), [D, O] = C.useState([]), [k, A] = C.useState(!1), [ee, j] = C.useState(!1), [M, te] = C.useState(d === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : d), ne = C.useRef(null), N = a.join("+").replace(/Key/g, "").replace(/Digit/g, ""), P = C.useRef(null), re = C.useRef(!1), ie = C.useCallback((e) => {
		w((t) => (t.find((t) => t.id === e.id)?.delete || R.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return C.useEffect(() => R.subscribe((e) => {
		if (e.dismiss) {
			requestAnimationFrame(() => {
				w((t) => t.map((t) => t.id === e.id ? {
					...t,
					delete: !0
				} : t));
			});
			return;
		}
		setTimeout(() => {
			Ae.flushSync(() => {
				w((t) => {
					let n = t.findIndex((t) => t.id === e.id);
					return n === -1 ? [e, ...t] : [
						...t.slice(0, n),
						{
							...t[n],
							...e
						},
						...t.slice(n + 1)
					];
				});
			});
		});
	}), []), C.useEffect(() => {
		if (d !== "system") {
			te(d);
			return;
		}
		if (d === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? te("dark") : te("light")), typeof window > "u") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)");
		try {
			e.addEventListener("change", ({ matches: e }) => {
				te(e ? "dark" : "light");
			});
		} catch {
			e.addListener(({ matches: e }) => {
				try {
					te(e ? "dark" : "light");
				} catch (e) {
					console.error(e);
				}
			});
		}
	}, [d]), C.useEffect(() => {
		S.length <= 1 && A(!1);
	}, [S]), C.useEffect(() => {
		let e = (e) => {
			if (a.length > 0 && a.every((t) => e[t] || e.code === t)) {
				var t;
				A(!0), (t = ne.current) == null || t.focus();
			}
			e.code === "Escape" && (document.activeElement === ne.current || ne.current?.contains(document.activeElement)) && A(!1);
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [a]), C.useEffect(() => {
		if (ne.current) return () => {
			P.current && (P.current.focus({ preventScroll: !0 }), P.current = null, re.current = !1);
		};
	}, [ne.current]), /* @__PURE__ */ C.createElement("section", {
		ref: t,
		"aria-label": b ?? `${x} ${N}`,
		tabIndex: -1,
		"aria-live": "polite",
		"aria-relevant": "additions text",
		"aria-atomic": "false",
		suppressHydrationWarning: !0,
		"data-react-aria-top-layer": !0
	}, E.map((t, n) => {
		let [i, a] = t.split("-");
		return T.length ? /* @__PURE__ */ C.createElement("ol", {
			key: t,
			dir: _ === "auto" ? $e() : _,
			tabIndex: -1,
			ref: ne,
			className: c,
			"data-sonner-toaster": !0,
			"data-sonner-theme": M,
			"data-y-position": i,
			"data-x-position": a,
			style: {
				"--front-toast-height": `${D[0]?.height || 0}px`,
				"--width": `${V}px`,
				"--gap": `${v}px`,
				...m,
				...et(l, u)
			},
			onBlur: (e) => {
				re.current && !e.currentTarget.contains(e.relatedTarget) && (re.current = !1, P.current &&= (P.current.focus({ preventScroll: !0 }), null));
			},
			onFocus: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || re.current || (re.current = !0, P.current = e.relatedTarget);
			},
			onMouseEnter: () => A(!0),
			onMouseMove: () => A(!0),
			onMouseLeave: () => {
				ee || A(!1);
			},
			onDragEnd: () => A(!1),
			onPointerDown: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || j(!0);
			},
			onPointerUp: () => j(!1)
		}, T.filter((e) => !e.position && n === 0 || e.position === t).map((n, i) => /* @__PURE__ */ C.createElement(Qe, {
			key: n.id,
			icons: y,
			index: i,
			toast: n,
			defaultRichColors: f,
			duration: g?.duration ?? p,
			className: g?.className,
			descriptionClassName: g?.descriptionClassName,
			invert: r,
			visibleToasts: h,
			closeButton: g?.closeButton ?? s,
			interacting: ee,
			position: t,
			style: g?.style,
			unstyled: g?.unstyled,
			classNames: g?.classNames,
			cancelButtonStyle: g?.cancelButtonStyle,
			actionButtonStyle: g?.actionButtonStyle,
			closeButtonAriaLabel: g?.closeButtonAriaLabel,
			removeToast: ie,
			toasts: T.filter((e) => e.position == n.position),
			heights: D.filter((e) => e.position == n.position),
			setHeights: O,
			expandByDefault: o,
			gap: v,
			expanded: k,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
});
//#endregion
//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function nt(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = nt(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function rt() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = nt(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
var it = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, at = rt, ot = (e, t) => (n) => {
	if (t?.variants == null) return at(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = it(t) || it(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return at(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, st = Object.defineProperty, ct = (e, t) => st(e, "name", {
	value: t,
	configurable: !0
});
function lt(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
ct(lt, "setRef");
function ut(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = lt(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : lt(e[t], null);
			}
		};
	};
}
ct(ut, "composeRefs");
function W(...e) {
	return C.useCallback(ut(...e), e);
}
ct(W, "useComposedRefs");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-slot@1.3.3_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-slot/dist/index.mjs
var dt = Object.defineProperty, G = (e, t) => dt(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function ft(e) {
	let t = C.forwardRef((t, n) => {
		let { children: r, ...i } = t, a = null, o = !1, s = [];
		xt(r) && typeof Tt == "function" && (r = Tt(r._payload)), C.Children.forEach(r, (e) => {
			if (yt(e)) {
				o = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				xt(n) && typeof Tt == "function" && (n = Tt(n._payload)), a = gt(t, n), s.push(a?.props?.children);
			} else s.push(e);
		}), a ? a = C.cloneElement(a, void 0, s) : !o && C.Children.count(r) === 1 && C.isValidElement(r) && (a = r);
		let c = a ? vt(a) : void 0, l = W(n, c);
		if (!a) {
			if (r || r === 0) throw Error(o ? wt(e) : Ct(e));
			return r;
		}
		let u = _t(i, a.props ?? {});
		return a.type !== C.Fragment && (u.ref = n ? l : c), C.cloneElement(a, u);
	});
	return t.displayName = `${e}.Slot`, t;
}
G(ft, "createSlot");
var pt = /* @__PURE__ */ ft("Slot"), mt = Symbol.for("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function ht(e) {
	let t = /* @__PURE__ */ G((e) => "child" in e ? e.children(e.child) : e.children, "Slottable");
	return t.displayName = `${e}.Slottable`, t.__radixId = mt, t;
}
G(ht, "createSlottable");
var gt = /* @__PURE__ */ G((e, t) => {
	if ("child" in e.props) {
		let t = e.props.child;
		return C.isValidElement(t) ? C.cloneElement(t, void 0, e.props.children(t.props.children)) : null;
	}
	return C.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function _t(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
G(_t, "mergeProps");
function vt(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
G(vt, "getElementRef");
function yt(e) {
	return C.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === mt;
}
G(yt, "isSlottable");
var bt = Symbol.for("react.lazy");
function xt(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === bt && "_payload" in e && St(e._payload);
}
G(xt, "isLazyComponent");
function St(e) {
	return typeof e == "object" && !!e && "then" in e;
}
G(St, "isPromiseLike");
var Ct = /* @__PURE__ */ G((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), wt = /* @__PURE__ */ G((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Tt = C.use, Et = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), K = (/* @__PURE__ */ o(((e, t) => {
	t.exports = Et();
})))(), Dt = Object.defineProperty, Ot = (e, t) => Dt(e, "name", {
	value: t,
	configurable: !0
}), kt = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ ft(`Primitive.${t}`), r = C.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, K.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {});
function At(e, t) {
	e && Ae.flushSync(() => e.dispatchEvent(t));
}
Ot(At, "dispatchDiscreteCustomEvent");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-visually-hidden@1.2.11_@types+react-dom@19.2.3_@types+react@19.2.14__@t_9dd925c72117cab446dfe9dd399ded80/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var jt = Object.defineProperty, Mt = (e, t) => jt(e, "name", {
	value: t,
	configurable: !0
}), Nt = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
}), Pt = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ Mt(function(e, t) {
	return /* @__PURE__ */ (0, K.jsx)(kt.span, {
		...e,
		ref: t,
		style: {
			...Nt,
			...e.style
		}
	});
}, "VisuallyHidden")), Ft = Object.defineProperty, It = (e, t) => Ft(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function Lt(e, t) {
	let n = C.createContext(t);
	n.displayName = e + "Context";
	let r = /* @__PURE__ */ It((e) => {
		let { children: t, ...r } = e, i = C.useMemo(() => r, Object.values(r));
		return /* @__PURE__ */ (0, K.jsx)(n.Provider, {
			value: i,
			children: t
		});
	}, "Provider");
	r.displayName = e + "Provider";
	function i(r, i = {}) {
		let { optional: a = !1 } = i, o = C.useContext(n);
		if (o) return o;
		if (t !== void 0) return t;
		if (!a) throw Error(`\`${r}\` must be used within \`${e}\``);
	}
	return It(i, "useContext"), [r, i];
}
It(Lt, "createContext");
/* @__NO_SIDE_EFFECTS__ */
function Rt(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = C.createContext(r);
		i.displayName = t + "Context";
		let a = n.length;
		n = [...n, r];
		let o = /* @__PURE__ */ It((t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = C.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ (0, K.jsx)(s.Provider, {
				value: c,
				children: r
			});
		}, "Provider");
		o.displayName = t + "Provider";
		function s(n, o, s = {}) {
			let { optional: c = !1 } = s, l = o?.[e]?.[a] || i, u = C.useContext(l);
			if (u) return u;
			if (r !== void 0) return r;
			if (!c) throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return It(s, "useContext"), [o, s];
	}
	It(r, "createContext");
	let i = /* @__PURE__ */ It(() => {
		let t = n.map((e) => C.createContext(e));
		return /* @__PURE__ */ It(function(n) {
			let r = n?.[e] || t;
			return C.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		}, "useScope");
	}, "createScope");
	return i.scopeName = e, [r, zt(i, ...t)];
}
It(Rt, "createContextScope");
function zt(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = /* @__PURE__ */ It(() => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return /* @__PURE__ */ It(function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return C.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		}, "useComposedScopes");
	}, "createScope");
	return n.scopeName = t.scopeName, n;
}
It(zt, "composeContextScopes");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-collection@1.1.15_@types+react-dom@19.2.3_@types+react@19.2.14__@types+_cd91dfc3494d322c5ab139167ff27ec6/node_modules/@radix-ui/react-collection/dist/index.mjs
var Bt = Object.defineProperty, Vt = (e, t) => Bt(e, "name", {
	value: t,
	configurable: !0
});
/* @__NO_SIDE_EFFECTS__ */
function Ht(e) {
	let t = e + "CollectionProvider", [n, r] = /* @__PURE__ */ Rt(t), [i, a] = n(t, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), o = /* @__PURE__ */ Vt((e) => {
		let { scope: t, children: n } = e, r = C.useRef(null), a = C.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ (0, K.jsx)(i, {
			scope: t,
			itemMap: a,
			collectionRef: r,
			children: n
		});
	}, "CollectionProvider");
	o.displayName = t;
	let s = e + "CollectionSlot", c = /* @__PURE__ */ ft(s), l = C.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ (0, K.jsx)(c, {
			ref: W(t, a(s, n).collectionRef),
			children: r
		});
	});
	l.displayName = s;
	let u = e + "CollectionItemSlot", d = "data-radix-collection-item", f = /* @__PURE__ */ ft(u), p = C.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = C.useRef(null), s = W(t, o), c = a(u, n);
		return C.useEffect(() => (c.itemMap.set(o, {
			ref: o,
			...i
		}), () => void c.itemMap.delete(o))), /* @__PURE__ */ (0, K.jsx)(f, {
			[d]: "",
			ref: s,
			children: r
		});
	});
	p.displayName = u;
	function m(t) {
		let n = a(e + "CollectionConsumer", t);
		return C.useCallback(() => {
			let e = n.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${d}]`));
			return Array.from(n.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [n.collectionRef, n.itemMap]);
	}
	return Vt(m, "useCollection"), [
		{
			Provider: o,
			Slot: l,
			ItemSlot: p
		},
		m,
		r
	];
}
Vt(Ht, "createCollection");
var Ut = /* @__PURE__ */ new WeakMap(), Wt = class e extends Map {
	static {
		Vt(this, "OrderedDict");
	}
	#e;
	constructor(e) {
		super(e), this.#e = [...super.keys()], Ut.set(this, !0);
	}
	set(e, t) {
		return Ut.get(this) && (this.has(e) ? this.#e[this.#e.indexOf(e)] = e : this.#e.push(e)), super.set(e, t), this;
	}
	insert(e, t, n) {
		let r = this.has(t), i = this.#e.length, a = qt(e), o = a >= 0 ? a : i + a, s = o < 0 || o >= i ? -1 : o;
		if (s === this.size || r && s === this.size - 1 || s === -1) return this.set(t, n), this;
		let c = this.size + +!r;
		a < 0 && o++;
		let l = [...this.#e], u, d = !1;
		for (let e = o; e < c; e++) if (o === e) {
			let i = l[e];
			l[e] === t && (i = l[e + 1]), r && this.delete(t), u = this.get(i), this.set(t, n);
		} else {
			!d && l[e - 1] === t && (d = !0);
			let n = l[d ? e : e - 1], r = u;
			u = this.get(n), this.delete(n), this.set(n, r);
		}
		return this;
	}
	with(t, n, r) {
		let i = new e(this);
		return i.insert(t, n, r), i;
	}
	before(e) {
		let t = this.#e.indexOf(e) - 1;
		if (!(t < 0)) return this.entryAt(t);
	}
	setBefore(e, t, n) {
		let r = this.#e.indexOf(e);
		return r === -1 ? this : this.insert(r, t, n);
	}
	after(e) {
		let t = this.#e.indexOf(e);
		if (t = t === -1 || t === this.size - 1 ? -1 : t + 1, t !== -1) return this.entryAt(t);
	}
	setAfter(e, t, n) {
		let r = this.#e.indexOf(e);
		return r === -1 ? this : this.insert(r + 1, t, n);
	}
	first() {
		return this.entryAt(0);
	}
	last() {
		return this.entryAt(-1);
	}
	clear() {
		return this.#e = [], super.clear();
	}
	delete(e) {
		let t = super.delete(e);
		return t && this.#e.splice(this.#e.indexOf(e), 1), t;
	}
	deleteAt(e) {
		let t = this.keyAt(e);
		return t === void 0 ? !1 : this.delete(t);
	}
	at(e) {
		let t = Gt(this.#e, e);
		if (t !== void 0) return this.get(t);
	}
	entryAt(e) {
		let t = Gt(this.#e, e);
		if (t !== void 0) return [t, this.get(t)];
	}
	indexOf(e) {
		return this.#e.indexOf(e);
	}
	keyAt(e) {
		return Gt(this.#e, e);
	}
	from(e, t) {
		let n = this.indexOf(e);
		if (n === -1) return;
		let r = n + t;
		return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.at(r);
	}
	keyFrom(e, t) {
		let n = this.indexOf(e);
		if (n === -1) return;
		let r = n + t;
		return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.keyAt(r);
	}
	find(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return r;
			n++;
		}
	}
	findIndex(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return n;
			n++;
		}
		return -1;
	}
	filter(t, n) {
		let r = [], i = 0;
		for (let e of this) Reflect.apply(t, n, [
			e,
			i,
			this
		]) && r.push(e), i++;
		return new e(r);
	}
	map(t, n) {
		let r = [], i = 0;
		for (let e of this) r.push([e[0], Reflect.apply(t, n, [
			e,
			i,
			this
		])]), i++;
		return new e(r);
	}
	reduce(...e) {
		let [t, n] = e, r = 0, i = n ?? this.at(0);
		for (let n of this) i = r === 0 && e.length === 1 ? n : Reflect.apply(t, this, [
			i,
			n,
			r,
			this
		]), r++;
		return i;
	}
	reduceRight(...e) {
		let [t, n] = e, r = n ?? this.at(-1);
		for (let n = this.size - 1; n >= 0; n--) {
			let i = this.at(n);
			r = n === this.size - 1 && e.length === 1 ? i : Reflect.apply(t, this, [
				r,
				i,
				n,
				this
			]);
		}
		return r;
	}
	toSorted(t) {
		return new e([...this.entries()].sort(t));
	}
	toReversed() {
		let t = new e();
		for (let e = this.size - 1; e >= 0; e--) {
			let n = this.keyAt(e), r = this.get(n);
			t.set(n, r);
		}
		return t;
	}
	toSpliced(...t) {
		let n = [...this.entries()];
		return n.splice(...t), new e(n);
	}
	slice(t, n) {
		let r = new e(), i = this.size - 1;
		if (t === void 0) return r;
		t < 0 && (t += this.size), n !== void 0 && n > 0 && (i = n - 1);
		for (let e = t; e <= i; e++) {
			let t = this.keyAt(e), n = this.get(t);
			r.set(t, n);
		}
		return r;
	}
	every(e, t) {
		let n = 0;
		for (let r of this) {
			if (!Reflect.apply(e, t, [
				r,
				n,
				this
			])) return !1;
			n++;
		}
		return !0;
	}
	some(e, t) {
		let n = 0;
		for (let r of this) {
			if (Reflect.apply(e, t, [
				r,
				n,
				this
			])) return !0;
			n++;
		}
		return !1;
	}
};
function Gt(e, t) {
	if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
	let n = Kt(e, t);
	return n === -1 ? void 0 : e[n];
}
Vt(Gt, "at");
function Kt(e, t) {
	let n = e.length, r = qt(t), i = r >= 0 ? r : n + r;
	return i < 0 || i >= n ? -1 : i;
}
Vt(Kt, "toSafeIndex");
function qt(e) {
	return e !== e || e === 0 ? 0 : Math.trunc(e);
}
Vt(qt, "toSafeInteger");
/* @__NO_SIDE_EFFECTS__ */
function Jt(e) {
	let t = e + "CollectionProvider", [n, r] = /* @__PURE__ */ Rt(t), [i, a] = n(t, {
		collectionElement: null,
		collectionRef: { current: null },
		collectionRefObject: { current: null },
		itemMap: new Wt(),
		setItemMap: /* @__PURE__ */ Vt(() => void 0, "setItemMap")
	}), o = /* @__PURE__ */ Vt(({ state: e, ...t }) => e ? /* @__PURE__ */ (0, K.jsx)(c, {
		...t,
		state: e
	}) : /* @__PURE__ */ (0, K.jsx)(s, { ...t }), "CollectionProvider");
	o.displayName = t;
	let s = /* @__PURE__ */ Vt((e) => {
		let t = h();
		return /* @__PURE__ */ (0, K.jsx)(c, {
			...e,
			state: t
		});
	}, "CollectionInit");
	s.displayName = t + "Init";
	let c = /* @__PURE__ */ Vt((e) => {
		let { scope: t, children: n, state: r } = e, a = C.useRef(null), [o, s] = C.useState(null), c = W(a, s), [l, u] = r;
		return C.useEffect(() => {
			if (!o) return;
			let e = Qt(() => {});
			return e.observe(o, {
				childList: !0,
				subtree: !0
			}), () => {
				e.disconnect();
			};
		}, [o]), /* @__PURE__ */ (0, K.jsx)(i, {
			scope: t,
			itemMap: l,
			setItemMap: u,
			collectionRef: c,
			collectionRefObject: a,
			collectionElement: o,
			children: n
		});
	}, "CollectionProviderImpl");
	c.displayName = t + "Impl";
	let l = e + "CollectionSlot", u = /* @__PURE__ */ ft(l), d = C.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ (0, K.jsx)(u, {
			ref: W(t, a(l, n).collectionRef),
			children: r
		});
	});
	d.displayName = l;
	let f = e + "CollectionItemSlot", p = /* @__PURE__ */ ft(f), m = C.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = C.useRef(null), [s, c] = C.useState(null), l = W(t, o, c), { setItemMap: u } = a(f, n), d = C.useRef(i);
		Yt(d.current, i) || (d.current = i);
		let m = d.current;
		return C.useEffect(() => {
			let e = m;
			return u((t) => s ? t.has(s) ? t.set(s, {
				...e,
				element: s
			}).toSorted(Zt) : (t.set(s, {
				...e,
				element: s
			}), t.toSorted(Zt)) : t), () => {
				u((e) => !s || !e.has(s) ? e : (e.delete(s), new Wt(e)));
			};
		}, [
			s,
			m,
			u
		]), /* @__PURE__ */ (0, K.jsx)(p, {
			"data-radix-collection-item": "",
			ref: l,
			children: r
		});
	});
	m.displayName = f;
	function h() {
		return C.useState(new Wt());
	}
	Vt(h, "useInitCollection");
	function g(t) {
		let { itemMap: n } = a(e + "CollectionConsumer", t);
		return n;
	}
	return Vt(g, "useCollection"), [{
		Provider: o,
		Slot: d,
		ItemSlot: m
	}, {
		createCollectionScope: r,
		useCollection: g,
		useInitCollection: h
	}];
}
Vt(Jt, "createCollection");
function Yt(e, t) {
	if (e === t) return !0;
	if (typeof e != "object" || typeof t != "object" || e == null || t == null) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return !1;
	return !0;
}
Vt(Yt, "shallowEqual");
function Xt(e, t) {
	return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
Vt(Xt, "isElementPreceding");
function Zt(e, t) {
	return !e[1].element || !t[1].element ? 0 : Xt(e[1].element, t[1].element) ? -1 : 1;
}
Vt(Zt, "sortByDocumentPosition");
function Qt(e) {
	return new MutationObserver((t) => {
		for (let n of t) if (n.type === "childList") {
			e();
			return;
		}
	});
}
Vt(Qt, "getChildListObserver");
//#endregion
//#region node_modules/.pnpm/@radix-ui+primitive@1.1.7/node_modules/@radix-ui/primitive/dist/index.mjs
var $t = Object.defineProperty, en = (e, t) => $t(e, "name", {
	value: t,
	configurable: !0
}), tn = !!(typeof window < "u" && window.document && window.document.createElement);
function q(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return /* @__PURE__ */ en(function(r) {
		if (e?.(r), n === !1 || !r || !r.defaultPrevented) return t?.(r);
	}, "handleEvent");
}
en(q, "composeEventHandlers");
function nn(e) {
	if (!tn) throw Error("Cannot access window outside of the DOM");
	return e?.ownerDocument?.defaultView ?? window;
}
en(nn, "getOwnerWindow");
function rn(e) {
	if (!tn) throw Error("Cannot access document outside of the DOM");
	return e?.ownerDocument ?? document;
}
en(rn, "getOwnerDocument");
function an(e, t = !1) {
	let { activeElement: n } = rn(e);
	if (!n?.nodeName) return null;
	if (on(n) && n.contentDocument) return an(n.contentDocument.body, t);
	if (t) {
		let e = n.getAttribute("aria-activedescendant");
		if (e) {
			let t = rn(n).getElementById(e);
			if (t) return t;
		}
	}
	return n;
}
en(an, "getActiveElement");
function on(e) {
	return e.tagName === "IFRAME";
}
en(on, "isFrame");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.1.4_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var sn = globalThis?.document ? C.useLayoutEffect : () => {}, cn = Object.defineProperty, ln = (e, t) => cn(e, "name", {
	value: t,
	configurable: !0
}), un = C.useEffectEvent, dn = C.useInsertionEffect;
function fn(e) {
	if (typeof un == "function") return un(e);
	let t = C.useRef(() => {
		throw Error("Cannot call an event handler while rendering.");
	});
	return typeof dn == "function" ? dn(() => {
		t.current = e;
	}) : sn(() => {
		t.current = e;
	}), C.useMemo(() => ((...e) => t.current?.(...e)), []);
}
ln(fn, "useEffectEvent");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.2.6_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var pn = Object.defineProperty, mn = (e, t) => pn(e, "name", {
	value: t,
	configurable: !0
}), hn = C.useInsertionEffect || sn;
function gn({ prop: e, defaultProp: t, onChange: n = /* @__PURE__ */ mn(() => {}, "onChange"), caller: r }) {
	let [i, a, o] = _n({
		defaultProp: t,
		onChange: n
	}), s = e !== void 0;
	return [s ? e : i, C.useCallback((t) => {
		if (s) {
			let n = vn(t) ? t(e) : t;
			n !== e && o.current?.(n);
		} else a(t);
	}, [
		s,
		e,
		a,
		o
	])];
}
mn(gn, "useControllableState");
function _n({ defaultProp: e, onChange: t }) {
	let [n, r] = C.useState(e), i = C.useRef(n), a = C.useRef(t);
	return hn(() => {
		a.current = t;
	}, [t]), C.useEffect(() => {
		i.current !== n && (a.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		a
	];
}
mn(_n, "useUncontrolledState");
function vn(e) {
	return typeof e == "function";
}
mn(vn, "isFunction");
var yn = Symbol("RADIX:SYNC_STATE");
function bn(e, t, n, r) {
	let { prop: i, defaultProp: a, onChange: o, caller: s } = t, c = i !== void 0, l = fn(o), u = [{
		...n,
		state: a
	}];
	r && u.push(r);
	let [d, f] = C.useReducer((t, n) => {
		if (n.type === yn) return {
			...t,
			state: n.state
		};
		let r = e(t, n);
		return c && !Object.is(r.state, t.state) && l(r.state), r;
	}, ...u), p = d.state, m = C.useRef(p);
	C.useEffect(() => {
		m.current !== p && (m.current = p, c || l(p));
	}, [
		p,
		m,
		c
	]);
	let h = C.useMemo(() => i === void 0 ? d : {
		...d,
		state: i
	}, [d, i]);
	return C.useEffect(() => {
		c && !Object.is(i, d.state) && f({
			type: yn,
			state: i
		});
	}, [
		i,
		d.state,
		c
	]), [h, f];
}
mn(bn, "useControllableStateReducer");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-presence@1.1.10_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_b749a9ebe1d4ae59943e055e03b8e8b4/node_modules/@radix-ui/react-presence/dist/index.mjs
var xn = Object.defineProperty, Sn = (e, t) => xn(e, "name", {
	value: t,
	configurable: !0
});
function Cn(e, t) {
	return C.useReducer((e, n) => t[e][n] ?? e, e);
}
Sn(Cn, "useStateMachine");
var wn = /* @__PURE__ */ Sn((e) => {
	let { present: t, children: n } = e, r = Tn(t), i = typeof n == "function" ? n({ present: r.isPresent }) : C.Children.only(n), a = Dn(r.ref, kn(i));
	return typeof n == "function" || r.isPresent ? C.cloneElement(i, { ref: a }) : null;
}, "Presence");
function Tn(e) {
	let [t, n] = C.useState(), r = C.useRef(null), i = C.useRef(e), a = C.useRef("none"), o = C.useRef(void 0), [s, c] = Cn(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return C.useEffect(() => {
		s === "mounted" ? (a.current = o.current ?? On(r.current), o.current = void 0) : a.current = "none";
	}, [s]), sn(() => {
		let t = r.current, n = i.current;
		if (n !== e) {
			let r = a.current, s = On(t);
			e ? (o.current = s, c("MOUNT")) : s === "none" || t?.display === "none" ? c("UNMOUNT") : c(n && r !== s ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
		}
	}, [e, c]), sn(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, o = /* @__PURE__ */ Sn((a) => {
				let o = On(r.current).includes(CSS.escape(a.animationName));
				if (a.target === t && o && (c("ANIMATION_END"), !i.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, "handleAnimationEnd"), s = /* @__PURE__ */ Sn((e) => {
				e.target === t && (a.current = On(r.current));
			}, "handleAnimationStart");
			return t.addEventListener("animationstart", s), t.addEventListener("animationcancel", o), t.addEventListener("animationend", o), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", s), t.removeEventListener("animationcancel", o), t.removeEventListener("animationend", o);
			};
		} else c("ANIMATION_END");
	}, [t, c]), {
		isPresent: ["mounted", "unmountSuspended"].includes(s),
		ref: C.useCallback((e) => {
			if (e) {
				let t = getComputedStyle(e);
				r.current = t, o.current = On(t);
			} else r.current = null;
			n(e);
		}, [])
	};
}
Sn(Tn, "usePresence");
function En(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
Sn(En, "setRef");
function Dn(...e) {
	let t = C.useRef(e);
	return t.current = e, C.useCallback((e) => {
		let n = t.current, r = !1, i = n.map((t) => {
			let n = En(t, e);
			return !r && typeof n == "function" && (r = !0), n;
		});
		if (r) return () => {
			for (let e = 0; e < i.length; e++) {
				let t = i[e];
				typeof t == "function" ? t() : En(n[e], null);
			}
		};
	}, []);
}
Sn(Dn, "useStableComposedRefs");
function On(e) {
	return e?.animationName || "none";
}
Sn(On, "getAnimationName");
function kn(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
Sn(kn, "getElementRef");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-id@1.1.4_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-id/dist/index.mjs
var An = Object.defineProperty, jn = (e, t) => An(e, "name", {
	value: t,
	configurable: !0
}), Mn = C.useId || (() => void 0), Nn = 0;
function Pn(e) {
	let [t, n] = C.useState(Mn());
	return sn(() => {
		e || n((e) => e ?? String(Nn++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
jn(Pn, "useId");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-direction@1.1.4_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-direction/dist/index.mjs
var Fn = Object.defineProperty, In = (e, t) => Fn(e, "name", {
	value: t,
	configurable: !0
}), Ln = C.createContext(void 0);
function Rn(e) {
	let t = C.useContext(Ln);
	return e || t || "ltr";
}
In(Rn, "useDirection");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.4_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var zn = Object.defineProperty, Bn = (e, t) => zn(e, "name", {
	value: t,
	configurable: !0
});
function Vn(e) {
	let t = C.useRef(e);
	return C.useEffect(() => {
		t.current = e;
	}), C.useMemo(() => ((...e) => t.current?.(...e)), []);
}
Bn(Vn, "useCallbackRef");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-dismissable-layer@1.1.19_@types+react-dom@19.2.3_@types+react@19.2.14___aef6053db4c6dbb8c0a45ae2dcd35fbe/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var Hn = Object.defineProperty, Un = (e, t) => Hn(e, "name", {
	value: t,
	configurable: !0
}), Wn = "dismissableLayer.update", Gn = "dismissableLayer.pointerDownOutside", Kn = "dismissableLayer.focusOutside", qn, Jn = C.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set(),
	dismissableSurfaces: /* @__PURE__ */ new Set()
}), Yn = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ Un(function(e, t) {
	let { disableOutsidePointerEvents: n = !1, deferPointerDownOutside: r = !1, onEscapeKeyDown: i, onPointerDownOutside: a, onFocusOutside: o, onInteractOutside: s, onDismiss: c, ...l } = e, u = C.useContext(Jn), [d, f] = C.useState(null), p = d?.ownerDocument ?? globalThis?.document, [, m] = C.useState({}), h = W(t, f), g = Array.from(u.layers), [_] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), v = _ ? g.indexOf(_) : -1, y = d ? g.indexOf(d) : -1, b = u.layersWithOutsidePointerEventsDisabled.size > 0, x = y >= v, S = C.useRef(!1), w = Qn((e) => {
		a?.(e), s?.(e), e.defaultPrevented || c?.();
	}, {
		ownerDocument: p,
		deferPointerDownOutside: r,
		isDeferredPointerDownOutsideRef: S,
		dismissableSurfaces: u.dismissableSurfaces,
		shouldHandlePointerDownOutside: C.useCallback((e) => {
			if (!(e instanceof Node)) return !1;
			let t = [...u.branches].some((t) => t.contains(e));
			return x && !t;
		}, [u.branches, x])
	}), T = $n((e) => {
		if (r && S.current) return;
		let t = e.target;
		[...u.branches].some((e) => e.contains(t)) || (o?.(e), s?.(e), e.defaultPrevented || c?.());
	}, p), E = d ? y === g.length - 1 : !1, D = Vn((e) => {
		e.key === "Escape" && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
	});
	return C.useEffect(() => {
		if (E) return p.addEventListener("keydown", D, { capture: !0 }), () => p.removeEventListener("keydown", D, { capture: !0 });
	}, [
		p,
		E,
		D
	]), C.useEffect(() => {
		if (d) return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (qn = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), er(), () => {
			n && (u.layersWithOutsidePointerEventsDisabled.delete(d), u.layersWithOutsidePointerEventsDisabled.size === 0 && (p.body.style.pointerEvents = qn));
		};
	}, [
		d,
		p,
		n,
		u
	]), C.useEffect(() => () => {
		d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), er());
	}, [d, u]), C.useEffect(() => {
		let e = /* @__PURE__ */ Un(() => m({}), "handleUpdate");
		return document.addEventListener(Wn, e), () => document.removeEventListener(Wn, e);
	}, []), /* @__PURE__ */ (0, K.jsx)(kt.div, {
		...l,
		ref: h,
		style: {
			pointerEvents: b ? x ? "auto" : "none" : void 0,
			...e.style
		},
		onFocusCapture: q(e.onFocusCapture, T.onFocusCapture),
		onBlurCapture: q(e.onBlurCapture, T.onBlurCapture),
		onPointerDownCapture: q(e.onPointerDownCapture, w.onPointerDownCapture)
	});
}, "DismissableLayer"));
function Xn() {
	let e = C.useContext(Jn), [t, n] = C.useState(null);
	return C.useEffect(() => {
		if (t) return e.dismissableSurfaces.add(t), () => {
			e.dismissableSurfaces.delete(t);
		};
	}, [t, e.dismissableSurfaces]), n;
}
Un(Xn, "useDismissableLayerSurface");
var Zn = /* @__PURE__ */ Un(() => !0, "IS_TRUE");
function Qn(e, t) {
	let { ownerDocument: n = globalThis?.document, deferPointerDownOutside: r = !1, isDeferredPointerDownOutsideRef: i, dismissableSurfaces: a, shouldHandlePointerDownOutside: o = Zn } = t, s = Vn(e), c = C.useRef(!1), l = C.useRef(!1), u = C.useRef(/* @__PURE__ */ new Map()), d = C.useRef(() => {});
	return C.useEffect(() => {
		function e() {
			l.current = !1, i.current = !1, u.current.clear();
		}
		Un(e, "resetOutsideInteraction");
		function t() {
			return Array.from(u.current.values()).some(Boolean);
		}
		Un(t, "isOutsideInteractionIntercepted");
		function f(e) {
			if (!l.current) return;
			let t = e.target;
			t instanceof Node && [...a].some((e) => e.contains(t)) || u.current.set(e.type, !0), e.type === "click" && window.setTimeout(() => {
				l.current && d.current();
			}, 0);
		}
		Un(f, "handleInteractionCapture");
		function p(e) {
			l.current && u.current.set(e.type, !1);
		}
		Un(p, "handleInteractionBubble");
		let m = /* @__PURE__ */ Un((a) => {
			if (a.target && !c.current) {
				let f = function() {
					n.removeEventListener("click", d.current);
					let r = t();
					e(), r || tr(Gn, s, p, { discrete: !0 });
				};
				if (Un(f, "handleAndDispatchPointerDownOutsideEvent"), !o(a.target)) {
					n.removeEventListener("click", d.current), e(), c.current = !1;
					return;
				}
				let p = { originalEvent: a };
				l.current = !0, i.current = r && a.button === 0, u.current.clear(), !r || a.button !== 0 ? f() : (n.removeEventListener("click", d.current), d.current = f, n.addEventListener("click", d.current, { once: !0 }));
			} else n.removeEventListener("click", d.current), e();
			c.current = !1;
		}, "handlePointerDown"), h = [
			"pointerup",
			"mousedown",
			"mouseup",
			"touchstart",
			"touchend",
			"click"
		];
		for (let e of h) n.addEventListener(e, f, !0), n.addEventListener(e, p);
		let g = window.setTimeout(() => {
			n.addEventListener("pointerdown", m);
		}, 0);
		return () => {
			window.clearTimeout(g), n.removeEventListener("pointerdown", m), n.removeEventListener("click", d.current);
			for (let e of h) n.removeEventListener(e, f, !0), n.removeEventListener(e, p);
		};
	}, [
		n,
		s,
		r,
		i,
		a,
		o
	]), { onPointerDownCapture: /* @__PURE__ */ Un(() => c.current = !0, "onPointerDownCapture") };
}
Un(Qn, "usePointerDownOutside");
function $n(e, t = globalThis?.document) {
	let n = Vn(e), r = C.useRef(!1);
	return C.useEffect(() => {
		let e = /* @__PURE__ */ Un((e) => {
			e.target && !r.current && tr(Kn, n, { originalEvent: e }, { discrete: !1 });
		}, "handleFocus");
		return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e);
	}, [t, n]), {
		onFocusCapture: /* @__PURE__ */ Un(() => r.current = !0, "onFocusCapture"),
		onBlurCapture: /* @__PURE__ */ Un(() => r.current = !1, "onBlurCapture")
	};
}
Un($n, "useFocusOutside");
function er() {
	let e = new CustomEvent(Wn);
	document.dispatchEvent(e);
}
Un(er, "dispatchUpdate");
function tr(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? At(i, a) : i.dispatchEvent(a);
}
Un(tr, "handleAndDispatchCustomEvent");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-focus-scope@1.1.16_@types+react-dom@19.2.3_@types+react@19.2.14__@types_81e264bd7e9c78fc68f9265e162603d7/node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var nr = Object.defineProperty, rr = (e, t) => nr(e, "name", {
	value: t,
	configurable: !0
}), ir = "focusScope.autoFocusOnMount", ar = "focusScope.autoFocusOnUnmount", or = {
	bubbles: !1,
	cancelable: !0
}, sr = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rr(function(e, t) {
	let { loop: n = !1, trapped: r = !1, onMountAutoFocus: i, onUnmountAutoFocus: a, ...o } = e, [s, c] = C.useState(null), l = Vn(i), u = Vn(a), d = C.useRef(null), f = W(t, c), p = C.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	C.useEffect(() => {
		if (r) {
			let e = function(e) {
				if (p.paused || !s) return;
				let t = e.target;
				s.contains(t) ? d.current = t : mr(d.current, { select: !0 });
			}, t = function(e) {
				if (p.paused || !s) return;
				let t = e.relatedTarget;
				t !== null && (s.contains(t) || mr(d.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && mr(s);
			};
			rr(e, "handleFocusIn"), rr(t, "handleFocusOut"), rr(n, "handleMutations"), document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let r = new MutationObserver(n);
			return s && r.observe(s, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect();
			};
		}
	}, [
		r,
		s,
		p.paused
	]), C.useEffect(() => {
		if (s) {
			hr.add(p);
			let e = document.activeElement;
			if (!s.contains(e)) {
				let t = new CustomEvent(ir, or);
				s.addEventListener(ir, l), s.dispatchEvent(t), t.defaultPrevented || (cr(vr(ur(s)), { select: !0 }), document.activeElement === e && mr(s));
			}
			return () => {
				s.removeEventListener(ir, l), setTimeout(() => {
					let t = new CustomEvent(ar, or);
					s.addEventListener(ar, u), s.dispatchEvent(t), t.defaultPrevented || mr(e ?? document.body, { select: !0 }), s.removeEventListener(ar, u), hr.remove(p);
				}, 0);
			};
		}
	}, [
		s,
		l,
		u,
		p
	]);
	let m = C.useCallback((e) => {
		if (!n && !r || p.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, i = document.activeElement;
		if (t && i) {
			let t = e.currentTarget, [r, a] = lr(t);
			r && a ? !e.shiftKey && i === a ? (e.preventDefault(), n && mr(r, { select: !0 })) : e.shiftKey && i === r && (e.preventDefault(), n && mr(a, { select: !0 })) : i === t && e.preventDefault();
		}
	}, [
		n,
		r,
		p.paused
	]);
	return /* @__PURE__ */ (0, K.jsx)(kt.div, {
		tabIndex: -1,
		...o,
		ref: f,
		onKeyDown: m
	});
}, "FocusScope"));
function cr(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (mr(r, { select: t }), document.activeElement !== n) return;
}
rr(cr, "focusFirst");
function lr(e) {
	let t = ur(e);
	return [dr(t, e), dr(t.reverse(), e)];
}
rr(lr, "getTabbableEdges");
function ur(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: /* @__PURE__ */ rr((e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	}, "acceptNode") });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
rr(ur, "getTabbableCandidates");
function dr(e, t) {
	let n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: !0 });
	for (let r of e) if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : fr(r, { upTo: t }))) return r;
}
rr(dr, "findVisible");
function fr(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
rr(fr, "isHidden");
function pr(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
rr(pr, "isSelectableInput");
function mr(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && pr(e) && t && e.select();
	}
}
rr(mr, "focus");
var hr = gr();
function gr() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = _r(e, t), e.unshift(t);
		},
		remove(t) {
			e = _r(e, t), e[0]?.resume();
		}
	};
}
rr(gr, "createFocusScopesStack");
function _r(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
rr(_r, "arrayRemove");
function vr(e) {
	return e.filter((e) => e.tagName !== "A");
}
rr(vr, "removeLinks");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-portal@1.1.17_@types+react-dom@19.2.3_@types+react@19.2.14__@types+reac_f7cbbc7df5ea253e16fa4e69f04c481a/node_modules/@radix-ui/react-portal/dist/index.mjs
var yr = Object.defineProperty, br = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ ((e, t) => yr(e, "name", {
	value: t,
	configurable: !0
}))(function(e, t) {
	let { container: n, ...r } = e, [i, a] = C.useState(!1);
	sn(() => a(!0), []);
	let o = n || i && globalThis?.document?.body;
	return o ? Ae.createPortal(/* @__PURE__ */ (0, K.jsx)(kt.div, {
		...r,
		ref: t
	}), o) : null;
}, "Portal")), xr = Object.defineProperty, Sr = (e, t) => xr(e, "name", {
	value: t,
	configurable: !0
}), Cr = 0, wr = null;
function Tr(e) {
	return Er(), e.children;
}
Sr(Tr, "FocusGuards");
function Er() {
	C.useEffect(() => {
		wr ||= {
			start: Dr(),
			end: Dr()
		};
		let { start: e, end: t } = wr;
		return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), Cr++, () => {
			Cr === 1 && (wr?.start.remove(), wr?.end.remove(), wr = null), Cr = Math.max(0, Cr - 1);
		};
	}, []);
}
Sr(Er, "useFocusGuards");
function Dr() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
Sr(Dr, "createFocusGuard");
//#endregion
//#region node_modules/.pnpm/tslib@2.8.1/node_modules/tslib/tslib.es6.mjs
var Or = function() {
	return Or = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Or.apply(this, arguments);
};
function kr(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function Ar(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/.pnpm/react-remove-scroll-bar@2.3.8_@types+react@19.2.14_react@19.2.6/node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var jr = "right-scroll-bar-position", Mr = "width-before-scroll-bar", Nr = "with-scroll-bars-hidden", Pr = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.6/node_modules/use-callback-ref/dist/es2015/assignRef.js
function Fr(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.6/node_modules/use-callback-ref/dist/es2015/useRef.js
function Ir(e, t) {
	var n = (0, C.useState)(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
//#endregion
//#region node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.6/node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var Lr = typeof window < "u" ? C.useLayoutEffect : C.useEffect, Rr = /* @__PURE__ */ new WeakMap();
function zr(e, t) {
	var n = Ir(t || null, function(t) {
		return e.forEach(function(e) {
			return Fr(e, t);
		});
	});
	return Lr(function() {
		var t = Rr.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || Fr(e, null);
			}), i.forEach(function(e) {
				r.has(e) || Fr(e, a);
			});
		}
		Rr.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/.pnpm/use-sidecar@1.1.3_@types+react@19.2.14_react@19.2.6/node_modules/use-sidecar/dist/es2015/medium.js
function Br(e) {
	return e;
}
function Vr(e, t) {
	t === void 0 && (t = Br);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function Hr(e) {
	e === void 0 && (e = {});
	var t = Vr(null);
	return t.options = Or({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/.pnpm/use-sidecar@1.1.3_@types+react@19.2.14_react@19.2.6/node_modules/use-sidecar/dist/es2015/exports.js
var Ur = function(e) {
	var t = e.sideCar, n = kr(e, ["sideCar"]);
	if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var r = t.read();
	if (!r) throw Error("Sidecar medium not found");
	return C.createElement(r, Or({}, n));
};
Ur.isSideCarExport = !0;
function Wr(e, t) {
	return e.useMedium(t), Ur;
}
//#endregion
//#region node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.6/node_modules/react-remove-scroll/dist/es2015/medium.js
var Gr = Hr(), Kr = function() {}, qr = C.forwardRef(function(e, t) {
	var n = C.useRef(null), r = C.useState({
		onScrollCapture: Kr,
		onWheelCapture: Kr,
		onTouchMoveCapture: Kr
	}), i = r[0], a = r[1], o = e.forwardProps, s = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, f = e.sideCar, p = e.noRelative, m = e.noIsolation, h = e.inert, g = e.allowPinchZoom, _ = e.as, v = _ === void 0 ? "div" : _, y = e.gapMode, b = kr(e, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), x = f, S = zr([n, t]), w = Or(Or({}, b), i);
	return C.createElement(C.Fragment, null, u && C.createElement(x, {
		sideCar: Gr,
		removeScrollBar: l,
		shards: d,
		noRelative: p,
		noIsolation: m,
		inert: h,
		setCallbacks: a,
		allowPinchZoom: !!g,
		lockRef: n,
		gapMode: y
	}), o ? C.cloneElement(C.Children.only(s), Or(Or({}, w), { ref: S })) : C.createElement(v, Or({}, w, {
		className: c,
		ref: S
	}), s));
});
qr.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, qr.classNames = {
	fullWidth: Mr,
	zeroRight: jr
};
//#endregion
//#region node_modules/.pnpm/get-nonce@1.0.1/node_modules/get-nonce/dist/es2015/index.js
var Jr, Yr = function() {
	if (Jr) return Jr;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@19.2.14_react@19.2.6/node_modules/react-style-singleton/dist/es2015/singleton.js
function Xr() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = Yr();
	return t && e.setAttribute("nonce", t), e;
}
function Zr(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Qr(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var $r = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = Xr()) && (Zr(t, n), Qr(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, ei = function() {
	var e = $r();
	return function(t, n) {
		C.useEffect(function() {
			return e.add(t), function() {
				e.remove();
			};
		}, [t && n]);
	};
}, ti = function() {
	var e = ei();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, ni = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, ri = function(e) {
	return parseInt(e || "", 10) || 0;
}, ii = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		ri(n),
		ri(r),
		ri(i)
	];
}, ai = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return ni;
	var t = ii(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, oi = ti(), si = "data-scroll-locked", ci = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${Nr} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${si}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${jr} {
    right: ${s}px ${r};
  }
  
  .${Mr} {
    margin-right: ${s}px ${r};
  }
  
  .${jr} .${jr} {
    right: 0 ${r};
  }
  
  .${Mr} .${Mr} {
    margin-right: 0 ${r};
  }
  
  body[${si}] {
    ${Pr}: ${s}px;
  }
`;
}, li = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, ui = function() {
	C.useEffect(function() {
		return document.body.setAttribute(si, (li() + 1).toString()), function() {
			var e = li() - 1;
			e <= 0 ? document.body.removeAttribute(si) : document.body.setAttribute(si, e.toString());
		};
	}, []);
}, di = function(e) {
	var t = e.noRelative, n = e.noImportant, r = e.gapMode, i = r === void 0 ? "margin" : r;
	ui();
	var a = C.useMemo(function() {
		return ai(i);
	}, [i]);
	return C.createElement(oi, { styles: ci(a, !t, i, n ? "" : "!important") });
}, fi = !1;
if (typeof window < "u") try {
	var pi = Object.defineProperty({}, "passive", { get: function() {
		return fi = !0, !0;
	} });
	window.addEventListener("test", pi, pi), window.removeEventListener("test", pi, pi);
} catch {
	fi = !1;
}
var mi = fi ? { passive: !1 } : !1, hi = function(e) {
	return e.tagName === "TEXTAREA";
}, gi = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !hi(e) && n[t] === "visible");
}, _i = function(e) {
	return gi(e, "overflowY");
}, vi = function(e) {
	return gi(e, "overflowX");
}, yi = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), Si(e, r)) {
			var i = Ci(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, bi = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, xi = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, Si = function(e, t) {
	return e === "v" ? _i(t) : vi(t);
}, Ci = function(e, t) {
	return e === "v" ? bi(t) : xi(t);
}, wi = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, Ti = function(e, t, n, r, i) {
	var a = wi(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = Ci(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && Si(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, Ei = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Di = function(e) {
	return [e.deltaX, e.deltaY];
}, Oi = function(e) {
	return e && "current" in e ? e.current : e;
}, ki = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, Ai = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, ji = 0, Mi = [];
function Ni(e) {
	var t = C.useRef([]), n = C.useRef([0, 0]), r = C.useRef(), i = C.useState(ji++)[0], a = C.useState(ti)[0], o = C.useRef(e);
	C.useEffect(function() {
		o.current = e;
	}, [e]), C.useEffect(function() {
		if (e.inert) {
			document.body.classList.add(`block-interactivity-${i}`);
			var t = Ar([e.lockRef.current], (e.shards || []).map(Oi), !0).filter(Boolean);
			return t.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${i}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${i}`), t.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${i}`);
				});
			};
		}
	}, [
		e.inert,
		e.lockRef.current,
		e.shards
	]);
	var s = C.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !o.current.allowPinchZoom;
		var i = Ei(e), a = n.current, s = "deltaX" in e ? e.deltaX : a[0] - i[0], c = "deltaY" in e ? e.deltaY : a[1] - i[1], l, u = e.target, d = Math.abs(s) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = yi(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = yi(d, u)), !m) return !1;
		if (!r.current && "changedTouches" in e && (s || c) && (r.current = l), !l) return !0;
		var h = r.current || l;
		return Ti(h, t, e, h === "h" ? s : c, !0);
	}, []), c = C.useCallback(function(e) {
		var n = e;
		if (!(!Mi.length || Mi[Mi.length - 1] !== a)) {
			var r = "deltaY" in n ? Di(n) : Ei(n), i = t.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && ki(e.delta, r);
			})[0];
			if (i && i.should) {
				n.cancelable && n.preventDefault();
				return;
			}
			if (!i) {
				var c = (o.current.shards || []).map(Oi).filter(Boolean).filter(function(e) {
					return e.contains(n.target);
				});
				(c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) && n.cancelable && n.preventDefault();
			}
		}
	}, []), l = C.useCallback(function(e, n, r, i) {
		var a = {
			name: e,
			delta: n,
			target: r,
			should: i,
			shadowParent: Pi(r)
		};
		t.current.push(a), setTimeout(function() {
			t.current = t.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), u = C.useCallback(function(e) {
		n.current = Ei(e), r.current = void 0;
	}, []), d = C.useCallback(function(t) {
		l(t.type, Di(t), t.target, s(t, e.lockRef.current));
	}, []), f = C.useCallback(function(t) {
		l(t.type, Ei(t), t.target, s(t, e.lockRef.current));
	}, []);
	C.useEffect(function() {
		return Mi.push(a), e.setCallbacks({
			onScrollCapture: d,
			onWheelCapture: d,
			onTouchMoveCapture: f
		}), document.addEventListener("wheel", c, mi), document.addEventListener("touchmove", c, mi), document.addEventListener("touchstart", u, mi), function() {
			Mi = Mi.filter(function(e) {
				return e !== a;
			}), document.removeEventListener("wheel", c, mi), document.removeEventListener("touchmove", c, mi), document.removeEventListener("touchstart", u, mi);
		};
	}, []);
	var p = e.removeScrollBar, m = e.inert;
	return C.createElement(C.Fragment, null, m ? C.createElement(a, { styles: Ai(i) }) : null, p ? C.createElement(di, {
		noRelative: e.noRelative,
		gapMode: e.gapMode
	}) : null);
}
function Pi(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.6/node_modules/react-remove-scroll/dist/es2015/sidecar.js
var Fi = Wr(Gr, Ni), Ii = C.forwardRef(function(e, t) {
	return C.createElement(qr, Or({}, e, {
		ref: t,
		sideCar: Fi
	}));
});
Ii.classNames = qr.classNames;
//#endregion
//#region node_modules/.pnpm/aria-hidden@1.2.6/node_modules/aria-hidden/dist/es2015/index.js
var Li = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, Ri = /* @__PURE__ */ new WeakMap(), zi = /* @__PURE__ */ new WeakMap(), Bi = {}, Vi = 0, Hi = function(e) {
	return e && (e.host || Hi(e.parentNode));
}, Ui = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = Hi(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, Wi = function(e, t, n, r) {
	var i = Ui(t, Array.isArray(e) ? e : [e]);
	Bi[n] || (Bi[n] = /* @__PURE__ */ new WeakMap());
	var a = Bi[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (Ri.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				Ri.set(e, c), a.set(e, l), o.push(e), c === 1 && i && zi.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), Vi++, function() {
		o.forEach(function(e) {
			var t = Ri.get(e) - 1, i = a.get(e) - 1;
			Ri.set(e, t), a.set(e, i), t || (zi.has(e) || e.removeAttribute(r), zi.delete(e)), i || e.removeAttribute(n);
		}), Vi--, Vi || (Ri = /* @__PURE__ */ new WeakMap(), Ri = /* @__PURE__ */ new WeakMap(), zi = /* @__PURE__ */ new WeakMap(), Bi = {});
	};
}, Gi = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || Li(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), Wi(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, Ki = Object.defineProperty, qi = (e, t) => Ki(e, "name", {
	value: t,
	configurable: !0
}), Ji = "Dialog", [Yi, Xi] = /* @__PURE__ */ Rt(Ji), [Zi, Qi] = Yi(Ji), $i = /* @__PURE__ */ qi((e) => {
	let { __scopeDialog: t, children: n, open: r, defaultOpen: i, onOpenChange: a, modal: o = !0 } = e, s = C.useRef(null), c = C.useRef(null), [l, u] = gn({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: Ji
	}), [d, f] = C.useState(0), [p, m] = C.useState(0);
	return /* @__PURE__ */ (0, K.jsx)(Zi, {
		scope: t,
		triggerRef: s,
		contentRef: c,
		contentId: Pn(),
		titleId: Pn(),
		descriptionId: Pn(),
		titlePresent: d > 0,
		descriptionPresent: p > 0,
		setTitleCount: f,
		setDescriptionCount: m,
		open: l,
		onOpenChange: u,
		onOpenToggle: C.useCallback(() => u((e) => !e), [u]),
		modal: o,
		children: n
	});
}, "Dialog"), ea = "DialogTrigger", ta = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ qi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Qi(ea, n), a = W(t, i.triggerRef);
	return /* @__PURE__ */ (0, K.jsx)(kt.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.open ? i.contentId : void 0,
		"data-state": xa(i.open),
		...r,
		ref: a,
		onClick: q(e.onClick, i.onOpenToggle)
	});
}, "DialogTrigger")), na = "DialogPortal", [ra, ia] = Yi(na, { forceMount: void 0 }), aa = /* @__PURE__ */ qi((e) => {
	let { __scopeDialog: t, forceMount: n, children: r, container: i } = e, a = Qi(na, t);
	return /* @__PURE__ */ (0, K.jsx)(ra, {
		scope: t,
		forceMount: n,
		children: C.Children.map(r, (e) => /* @__PURE__ */ (0, K.jsx)(wn, {
			present: n || a.open,
			children: /* @__PURE__ */ (0, K.jsx)(br, {
				asChild: !0,
				container: i,
				children: e
			})
		}))
	});
}, "DialogPortal"), oa = "DialogOverlay", sa = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ qi(function(e, t) {
	let n = ia(oa, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Qi(oa, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ (0, K.jsx)(wn, {
		present: r || a.open,
		children: /* @__PURE__ */ (0, K.jsx)(la, {
			...i,
			ref: t
		})
	}) : null;
}, "DialogOverlay")), ca = /* @__PURE__ */ ft("DialogOverlay.RemoveScroll"), la = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ qi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Qi(oa, n), a = W(t, Xn());
	return /* @__PURE__ */ (0, K.jsx)(Ii, {
		as: ca,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ (0, K.jsx)(kt.div, {
			"data-state": xa(i.open),
			...r,
			ref: a,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}, "DialogOverlayImpl")), ua = "DialogContent", da = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ qi(function(e, t) {
	let n = ia(ua, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = Qi(ua, e.__scopeDialog);
	return /* @__PURE__ */ (0, K.jsx)(wn, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ (0, K.jsx)(fa, {
			...i,
			ref: t
		}) : /* @__PURE__ */ (0, K.jsx)(pa, {
			...i,
			ref: t
		})
	});
}, "DialogContent")), fa = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ qi(function(e, t) {
	let n = Qi(ua, e.__scopeDialog), r = C.useRef(null), i = W(t, n.contentRef, r);
	return C.useEffect(() => {
		let e = r.current;
		if (e) return Gi(e);
	}, []), /* @__PURE__ */ (0, K.jsx)(ma, {
		...e,
		ref: i,
		trapFocus: n.open,
		disableOutsidePointerEvents: n.open,
		onCloseAutoFocus: q(e.onCloseAutoFocus, (e) => {
			e.preventDefault(), n.triggerRef.current?.focus();
		}),
		onPointerDownOutside: q(e.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: q(e.onFocusOutside, (e) => e.preventDefault())
	});
}, "DialogContentModal")), pa = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ qi(function(e, t) {
	let n = Qi(ua, e.__scopeDialog), r = C.useRef(!1), i = C.useRef(!1);
	return /* @__PURE__ */ (0, K.jsx)(ma, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (t) => {
			e.onCloseAutoFocus?.(t), t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()), r.current = !1, i.current = !1;
		},
		onInteractOutside: (t) => {
			e.onInteractOutside?.(t), t.defaultPrevented || (r.current = !0, t.detail.originalEvent.type === "pointerdown" && (i.current = !0));
			let a = t.target;
			n.triggerRef.current?.contains(a) && t.preventDefault(), t.detail.originalEvent.type === "focusin" && i.current && t.preventDefault();
		}
	});
}, "DialogContentNonModal")), ma = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ qi(function(e, t) {
	let { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, ...o } = e, s = Qi(ua, n);
	return Er(), /* @__PURE__ */ (0, K.jsx)(K.Fragment, { children: /* @__PURE__ */ (0, K.jsx)(sr, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ (0, K.jsx)(Yn, {
			role: "dialog",
			id: s.contentId,
			"aria-describedby": s.descriptionPresent ? s.descriptionId : void 0,
			"aria-labelledby": s.titlePresent ? s.titleId : void 0,
			"data-state": xa(s.open),
			...o,
			ref: t,
			deferPointerDownOutside: !0,
			onDismiss: () => s.onOpenChange(!1)
		})
	}) });
}, "DialogContentImpl")), ha = "DialogTitle", ga = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ qi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Qi(ha, n), { setTitleCount: a } = i;
	return sn(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ (0, K.jsx)(kt.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
}, "DialogTitle")), _a = "DialogDescription", va = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ qi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Qi(_a, n), { setDescriptionCount: a } = i;
	return sn(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]), /* @__PURE__ */ (0, K.jsx)(kt.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
}, "DialogDescription")), ya = "DialogClose", ba = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ qi(function(e, t) {
	let { __scopeDialog: n, ...r } = e, i = Qi(ya, n);
	return /* @__PURE__ */ (0, K.jsx)(kt.button, {
		type: "button",
		...r,
		ref: t,
		onClick: q(e.onClick, () => i.onOpenChange(!1))
	});
}, "DialogClose"));
function xa(e) {
	return e ? "open" : "closed";
}
qi(xa, "getState");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-alert-dialog@1.1.23_@types+react-dom@19.2.3_@types+react@19.2.14__@type_1bf2e65aa102eba0965a70dcf7b7cf1a/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs
var Sa = Object.defineProperty, Ca = (e, t) => Sa(e, "name", {
	value: t,
	configurable: !0
}), [wa, Ta] = /* @__PURE__ */ Rt("AlertDialog", [Xi]), Ea = Xi(), Da = /* @__PURE__ */ Ca((e) => {
	let { __scopeAlertDialog: t, ...n } = e, r = Ea(t);
	return /* @__PURE__ */ (0, K.jsx)($i, {
		...r,
		...n,
		modal: !0
	});
}, "AlertDialog");
C.forwardRef(/* @__PURE__ */ Ca(function(e, t) {
	let { __scopeAlertDialog: n, ...r } = e, i = Ea(n);
	return /* @__PURE__ */ (0, K.jsx)(ta, {
		...i,
		...r,
		ref: t
	});
}, "AlertDialogTrigger"));
var Oa = /* @__PURE__ */ Ca((e) => {
	let { __scopeAlertDialog: t, ...n } = e, r = Ea(t);
	return /* @__PURE__ */ (0, K.jsx)(aa, {
		...r,
		...n
	});
}, "AlertDialogPortal"), ka = C.forwardRef(/* @__PURE__ */ Ca(function(e, t) {
	let { __scopeAlertDialog: n, ...r } = e, i = Ea(n);
	return /* @__PURE__ */ (0, K.jsx)(sa, {
		...i,
		...r,
		ref: t
	});
}, "AlertDialogOverlay")), [Aa, ja] = wa("AlertDialogContent"), Ma = C.forwardRef(/* @__PURE__ */ Ca(function(e, t) {
	let { __scopeAlertDialog: n, children: r, ...i } = e, a = Ea(n), o = W(t, C.useRef(null)), s = C.useRef(null);
	return /* @__PURE__ */ (0, K.jsx)(Aa, {
		scope: n,
		cancelRef: s,
		children: /* @__PURE__ */ (0, K.jsx)(da, {
			role: "alertdialog",
			...a,
			...i,
			ref: o,
			onOpenAutoFocus: q(i.onOpenAutoFocus, (e) => {
				e.preventDefault(), s.current?.focus({ preventScroll: !0 });
			}),
			onPointerDownOutside: (e) => e.preventDefault(),
			onInteractOutside: (e) => e.preventDefault(),
			children: r
		})
	});
}, "AlertDialogContent")), Na = C.forwardRef(/* @__PURE__ */ Ca(function(e, t) {
	let { __scopeAlertDialog: n, ...r } = e, i = Ea(n);
	return /* @__PURE__ */ (0, K.jsx)(ga, {
		...i,
		...r,
		ref: t
	});
}, "AlertDialogTitle")), Pa = C.forwardRef(/* @__PURE__ */ Ca(function(e, t) {
	let { __scopeAlertDialog: n, ...r } = e, i = Ea(n);
	return /* @__PURE__ */ (0, K.jsx)(va, {
		...i,
		...r,
		ref: t
	});
}, "AlertDialogDescription")), Fa = C.forwardRef(/* @__PURE__ */ Ca(function(e, t) {
	let { __scopeAlertDialog: n, ...r } = e, i = Ea(n);
	return /* @__PURE__ */ (0, K.jsx)(ba, {
		...i,
		...r,
		ref: t
	});
}, "AlertDialogAction")), Ia = "AlertDialogCancel", La = C.forwardRef(/* @__PURE__ */ Ca(function(e, t) {
	let { __scopeAlertDialog: n, ...r } = e, { cancelRef: i } = ja(Ia, n), a = Ea(n), o = W(t, i);
	return /* @__PURE__ */ (0, K.jsx)(ba, {
		...a,
		...r,
		ref: o
	});
}, "AlertDialogCancel")), Ra = Da, za = Oa, Ba = ka, Va = Ma, Ha = Fa, Ua = La, Wa = Na, Ga = Pa, Ka = Object.defineProperty, qa = (e, t) => Ka(e, "name", {
	value: t,
	configurable: !0
});
function Ja(e) {
	let [t, n] = C.useState(void 0);
	return sn(() => {
		if (e) {
			n({
				width: e.offsetWidth,
				height: e.offsetHeight
			});
			let t = new ResizeObserver((t) => {
				if (!Array.isArray(t) || !t.length) return;
				let r = t[0], i, a;
				if ("borderBoxSize" in r) {
					let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					i = t.inlineSize, a = t.blockSize;
				} else i = e.offsetWidth, a = e.offsetHeight;
				n({
					width: i,
					height: a
				});
			});
			return t.observe(e, { box: "border-box" }), () => t.unobserve(e);
		} else n(void 0);
	}, [e]), t;
}
qa(Ja, "useSize");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-checkbox@1.3.11_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_10f4bbe0d32cb51b8f243241612dbabc/node_modules/@radix-ui/react-checkbox/dist/index.mjs
var Ya = Object.defineProperty, Xa = (e, t) => Ya(e, "name", {
	value: t,
	configurable: !0
}), Za = "Checkbox", [Qa, $a] = /* @__PURE__ */ Rt(Za), [eo, to] = Qa(Za);
function no(e) {
	let { __scopeCheckbox: t, checked: n, children: r, defaultChecked: i, disabled: a, form: o, name: s, onCheckedChange: c, required: l, value: u = "on", internal_do_not_use_render: d } = e, [f, p] = gn({
		prop: n,
		defaultProp: i ?? !1,
		onChange: c,
		caller: Za
	}), [m, h] = C.useState(null), [g, _] = C.useState(null), v = C.useRef(!1), [y, b] = C.useReducer((e) => e + 1, 0), x = m ? !!o || !!m.closest("form") : !0, S = {
		checked: f,
		disabled: a,
		setChecked: p,
		control: m,
		setControl: h,
		name: s,
		form: o,
		value: u,
		hasConsumerStoppedPropagationRef: v,
		userInteractionCount: y,
		onUserInteraction: b,
		required: l,
		defaultChecked: uo(i) ? !1 : i,
		isFormControl: x,
		bubbleInput: g,
		setBubbleInput: _
	};
	return /* @__PURE__ */ (0, K.jsx)(eo, {
		scope: t,
		...S,
		children: lo(d) ? d(S) : r
	});
}
Xa(no, "CheckboxProvider");
var ro = "CheckboxTrigger", io = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ Xa(function({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, i) {
	let { control: a, value: o, disabled: s, checked: c, required: l, setControl: u, setChecked: d, hasConsumerStoppedPropagationRef: f, onUserInteraction: p, isFormControl: m, bubbleInput: h } = to(ro, e), g = W(i, u), _ = C.useRef(c);
	return C.useEffect(() => {
		let e = a?.form;
		if (e) {
			let t = /* @__PURE__ */ Xa(() => d(_.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [a, d]), /* @__PURE__ */ (0, K.jsx)(kt.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": uo(c) ? "mixed" : c,
		"aria-required": l,
		"data-state": fo(c),
		"data-disabled": s ? "" : void 0,
		disabled: s,
		value: o,
		...r,
		ref: g,
		onKeyDown: q(t, (e) => {
			e.key === "Enter" && e.preventDefault();
		}),
		onClick: q(n, (e) => {
			p(), d((e) => uo(e) ? !0 : !e), h && m && (f.current = e.isPropagationStopped(), f.current || e.stopPropagation());
		})
	});
}, "CheckboxTrigger")), J = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ Xa(function(e, t) {
	let { __scopeCheckbox: n, name: r, checked: i, defaultChecked: a, required: o, disabled: s, value: c, onCheckedChange: l, form: u, ...d } = e;
	return /* @__PURE__ */ (0, K.jsx)(no, {
		__scopeCheckbox: n,
		checked: i,
		defaultChecked: a,
		disabled: s,
		required: o,
		onCheckedChange: l,
		name: r,
		form: u,
		value: c,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)(io, {
			...d,
			ref: t,
			__scopeCheckbox: n
		}), e && /* @__PURE__ */ (0, K.jsx)(co, { __scopeCheckbox: n })] })
	});
}, "Checkbox")), ao = "CheckboxIndicator", oo = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ Xa(function(e, t) {
	let { __scopeCheckbox: n, forceMount: r, ...i } = e, a = to(ao, n);
	return /* @__PURE__ */ (0, K.jsx)(wn, {
		present: r || uo(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ (0, K.jsx)(kt.span, {
			"data-state": fo(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t,
			style: {
				pointerEvents: "none",
				...e.style
			}
		})
	});
}, "CheckboxIndicator")), so = "CheckboxBubbleInput", co = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ Xa(function({ __scopeCheckbox: e, onClick: t, ...n }, r) {
	let { control: i, hasConsumerStoppedPropagationRef: a, userInteractionCount: o, checked: s, defaultChecked: c, required: l, disabled: u, name: d, value: f, form: p, bubbleInput: m, setBubbleInput: h } = to(so, e), g = W(r, h), _ = Ja(i), v = C.useRef(!1), y = C.useRef(s), b = C.useRef(o);
	C.useEffect(() => {
		let e = m;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set, r = o !== b.current;
		b.current = o;
		let i = y.current !== s;
		y.current = s;
		let c = !(r && a.current);
		if (i && n) {
			v.current = !r;
			let t = new Event("click", { bubbles: c });
			e.indeterminate = uo(s), n.call(e, uo(s) ? !1 : s), e.dispatchEvent(t), v.current = !1;
		}
	}, [
		m,
		s,
		a,
		o
	]);
	let x = C.useRef(uo(s) ? !1 : s);
	return /* @__PURE__ */ (0, K.jsx)(kt.input, {
		type: "checkbox",
		"aria-hidden": !0,
		defaultChecked: c ?? x.current,
		required: l,
		disabled: u,
		name: d,
		value: f,
		form: p,
		...n,
		tabIndex: -1,
		ref: g,
		onClick: q(t, (e) => {
			v.current && e.stopPropagation();
		}),
		style: {
			...n.style,
			..._,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
}, "CheckboxBubbleInput"));
function lo(e) {
	return typeof e == "function";
}
Xa(lo, "isFunction");
function uo(e) {
	return e === "indeterminate";
}
Xa(uo, "isIndeterminate");
function fo(e) {
	return uo(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
Xa(fo, "getState");
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var po = [
	"top",
	"right",
	"bottom",
	"left"
], mo = Math.min, ho = Math.max, go = Math.round, _o = Math.floor, vo = (e) => ({
	x: e,
	y: e
}), yo = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function bo(e, t, n) {
	return ho(e, mo(t, n));
}
function xo(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function So(e) {
	return e.split("-")[0];
}
function Co(e) {
	return e.split("-")[1];
}
function wo(e) {
	return e === "x" ? "y" : "x";
}
function To(e) {
	return e === "y" ? "height" : "width";
}
function Eo(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Do(e) {
	return wo(Eo(e));
}
function Oo(e, t, n) {
	n === void 0 && (n = !1);
	let r = Co(e), i = Do(e), a = To(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Lo(o)), [o, Lo(o)];
}
function ko(e) {
	let t = Lo(e);
	return [
		Ao(e),
		t,
		Ao(t)
	];
}
function Ao(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var jo = ["left", "right"], Mo = ["right", "left"], No = ["top", "bottom"], Po = ["bottom", "top"];
function Fo(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Mo : jo : t ? jo : Mo;
		case "left":
		case "right": return t ? No : Po;
		default: return [];
	}
}
function Io(e, t, n, r) {
	let i = Co(e), a = Fo(So(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Ao)))), a;
}
function Lo(e) {
	let t = So(e);
	return yo[t] + e.slice(t.length);
}
function Ro(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function zo(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Ro(e);
}
function Bo(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Vo(e, t, n) {
	let { reference: r, floating: i } = e, a = Eo(t), o = Do(t), s = To(o), c = So(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = Co(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Ho(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = xo(t, e), p = zo(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Bo(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = Bo(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Uo = 50, Wo = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Ho
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Vo(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Uo && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Vo(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Go = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = xo(e, t) || {};
		if (l == null) return {};
		let d = zo(u), f = {
			x: n,
			y: r
		}, p = Do(i), m = To(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = mo(d[_], T), D = mo(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, A = bo(E, k, O), ee = !c.arrow && Co(i) != null && k !== A && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, j = ee ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + j,
			data: {
				[p]: A,
				centerOffset: k - A - j,
				...ee && { alignmentOffset: j }
			},
			reset: ee
		};
	}
}), Ko = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = xo(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = So(r), _ = Eo(o), v = So(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Lo(o)] : ko(o)), x = p !== "none";
			!d && x && b.push(...Io(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Oo(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== Eo(t)) || T.every((e) => Eo(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = Eo(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement":
						n = o;
						break;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function qo(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Jo(e) {
	return po.some((t) => e[t] >= 0);
}
var Yo = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = xo(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = qo(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Jo(e)
					} };
				}
				case "escaped": {
					let e = qo(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Jo(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Xo = /* @__PURE__ */ new Set(["left", "top"]);
async function Zo(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = So(n), s = Co(n), c = Eo(n) === "y", l = Xo.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = xo(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Qo = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Zo(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, $o = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = xo(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = Eo(i), p = wo(f), m = u[p], h = u[f], g = (e, t) => bo(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, es = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = xo(e, t), u = {
				x: n,
				y: r
			}, d = Eo(i), f = wo(d), p = u[f], m = u[d], h = xo(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Xo.has(So(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, ts = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = xo(e, t), c = await i.detectOverflow(t, s), l = So(n), u = Co(n), d = Eo(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = mo(p - c[m], g), y = mo(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * ho(c.left, c.right) : S = p - 2 * ho(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function ns() {
	return typeof window < "u";
}
function rs(e) {
	return os(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function is(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function as(e) {
	return ((os(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function os(e) {
	return ns() ? e instanceof Node || e instanceof is(e).Node : !1;
}
function ss(e) {
	return ns() ? e instanceof Element || e instanceof is(e).Element : !1;
}
function cs(e) {
	return ns() ? e instanceof HTMLElement || e instanceof is(e).HTMLElement : !1;
}
function ls(e) {
	return !ns() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof is(e).ShadowRoot;
}
function us(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = xs(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function ds(e) {
	return /^(table|td|th)$/.test(rs(e));
}
function fs(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var ps = /transform|translate|scale|rotate|perspective|filter/, ms = /paint|layout|strict|content/, hs = (e) => !!e && e !== "none", gs;
function _s(e) {
	let t = ss(e) ? xs(e) : e;
	return hs(t.transform) || hs(t.translate) || hs(t.scale) || hs(t.rotate) || hs(t.perspective) || !ys() && (hs(t.backdropFilter) || hs(t.filter)) || ps.test(t.willChange || "") || ms.test(t.contain || "");
}
function vs(e) {
	let t = Cs(e);
	for (; cs(t) && !bs(t);) {
		if (_s(t)) return t;
		if (fs(t)) return null;
		t = Cs(t);
	}
	return null;
}
function ys() {
	return gs ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), gs;
}
function bs(e) {
	return /^(html|body|#document)$/.test(rs(e));
}
function xs(e) {
	return is(e).getComputedStyle(e);
}
function Ss(e) {
	return ss(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Cs(e) {
	if (rs(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || ls(e) && e.host || as(e);
	return ls(t) ? t.host : t;
}
function ws(e) {
	let t = Cs(e);
	return bs(t) ? (e.ownerDocument || e).body : cs(t) && us(t) ? t : ws(t);
}
function Ts(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = ws(e), i = r === e.ownerDocument?.body, a = is(r);
	if (i) {
		let e = Es(a);
		return t.concat(a, a.visualViewport || [], us(r) ? r : [], e && n ? Ts(e) : []);
	} else return t.concat(r, Ts(r, [], n));
}
function Es(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Ds(e) {
	let t = xs(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = cs(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = go(n) !== a || go(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Os(e) {
	return ss(e) ? e : e.contextElement;
}
function ks(e) {
	let t = Os(e);
	if (!cs(t)) return vo(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Ds(t), o = (a ? go(n.width) : n.width) / r, s = (a ? go(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var As = /* @__PURE__ */ vo(0);
function js(e) {
	let t = is(e);
	return !ys() || !t.visualViewport ? As : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Ms(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === is(e);
}
function Ns(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Os(e), o = vo(1);
	t && (r ? ss(r) && (o = ks(r)) : o = ks(e));
	let s = Ms(a, n, r) ? js(a) : vo(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = is(a), t = ss(r) ? is(r) : r, n = e, i = Es(n);
		for (; i && t !== n;) {
			let e = ks(i), t = i.getBoundingClientRect(), r = xs(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = is(i), i = Es(n);
		}
	}
	return Bo({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Ps(e, t) {
	let n = Ss(e).scrollLeft;
	return t ? t.left + n : Ns(as(e)).left + n;
}
function Fs(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Ps(e, n),
		y: n.top + t.scrollTop
	};
}
function Is(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = as(r), s = t ? fs(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = vo(1), u = vo(0), d = cs(r);
	if ((d || !a) && ((rs(r) !== "body" || us(o)) && (c = Ss(r)), d)) {
		let e = Ns(r);
		l = ks(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Fs(o, c) : vo(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Ls(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Rs(e) {
	let t = Ss(e), n = e.ownerDocument.body, r = ho(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = ho(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Ps(e), o = -t.scrollTop;
	return xs(n).direction === "rtl" && (a += ho(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var zs = 25;
function Bs(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = is(e), a = as(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !ys() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Ps(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= zs && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function Vs(e, t) {
	let n = Ns(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = ks(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Hs(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = Bs(e, n, t);
	else if (t === "document") r = Rs(as(e));
	else if (ss(t)) r = Vs(t, n);
	else {
		let n = js(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Bo(r);
}
function Us(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Ts(e, [], !1).filter((e) => ss(e) && rs(e) !== "body"), i = null, a = xs(e).position === "fixed", o = a ? Cs(e) : e;
	for (; ss(o) && !bs(o);) {
		let e = xs(o), t = _s(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Cs(o);
	}
	return t.set(e, r), r;
}
function Ws(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? fs(t) ? [] : Us(t, this._c) : [].concat(n), r], o = Hs(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Hs(t, a[e], i);
		s = ho(n.top, s), c = mo(n.right, c), l = mo(n.bottom, l), u = ho(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Gs(e) {
	let { width: t, height: n } = Ds(e);
	return {
		width: t,
		height: n
	};
}
function Ks(e, t, n) {
	let r = cs(t), i = as(t), a = n === "fixed", o = Ns(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = vo(0);
	if ((r || !a) && ((rs(t) !== "body" || us(i)) && (s = Ss(t)), r)) {
		let e = Ns(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Ps(i));
	let l = i && !r && !a ? Fs(i, s) : vo(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function qs(e) {
	return xs(e).position === "static";
}
function Js(e, t) {
	if (!cs(e) || xs(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return as(e) === n && (n = n.ownerDocument.body), n;
}
function Ys(e, t) {
	let n = is(e);
	if (fs(e)) return n;
	if (!cs(e)) {
		let t = Cs(e);
		for (; t && !bs(t);) {
			if (ss(t) && !qs(t)) return t;
			t = Cs(t);
		}
		return n;
	}
	let r = Js(e, t);
	for (; r && ds(r) && qs(r);) r = Js(r, t);
	return r && bs(r) && qs(r) && !_s(r) ? n : r || vs(e) || n;
}
var Xs = async function(e) {
	let t = this.getOffsetParent || Ys, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Ks(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Zs(e) {
	return xs(e).direction === "rtl";
}
var Qs = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Is,
	getDocumentElement: as,
	getClippingRect: Ws,
	getOffsetParent: Ys,
	getElementRects: Xs,
	getClientRects: Ls,
	getDimensions: Gs,
	getScale: ks,
	isElement: ss,
	isRTL: Zs
};
function $s(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function ec(e, t, n) {
	let r = null, i, a = as(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = _o(d), h = _o(a.clientWidth - (u + f)), g = _o(a.clientHeight - (d + p)), _ = _o(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: ho(0, mo(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!$s(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = is(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function tc(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Os(e), u = i || a ? [...l ? Ts(l) : [], ...t ? Ts(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? ec(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Ns(e) : null;
	c && g();
	function g() {
		let t = Ns(e);
		h && !$s(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var nc = Qo, rc = $o, ic = Ko, ac = ts, oc = Yo, sc = Go, cc = es, lc = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...Qs,
		...i.platform,
		_c: r
	};
	return Wo(e, t, {
		...i,
		platform: a
	});
}, uc = typeof document < "u" ? C.useLayoutEffect : function() {};
function dc(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!dc(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !dc(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function fc(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function pc(e, t) {
	let n = fc(e);
	return Math.round(t * n) / n;
}
function mc(e) {
	let t = C.useRef(e);
	return uc(() => {
		t.current = e;
	}), t;
}
function hc(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [u, d] = C.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [f, p] = C.useState(r);
	dc(f, r) || p(r);
	let [m, h] = C.useState(null), [g, _] = C.useState(null), v = C.useCallback((e) => {
		e !== S.current && (S.current = e, h(e));
	}, []), y = C.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), b = a || m, x = o || g, S = C.useRef(null), w = C.useRef(null), T = C.useRef(u), E = c != null, D = mc(c), O = mc(i), k = mc(l), A = C.useCallback(() => {
		if (!S.current || !w.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: f
		};
		O.current && (e.platform = O.current), lc(S.current, w.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: k.current !== !1
			};
			ee.current && !dc(T.current, t) && (T.current = t, Ae.flushSync(() => {
				d(t);
			}));
		});
	}, [
		f,
		t,
		n,
		O,
		k
	]);
	uc(() => {
		l === !1 && T.current.isPositioned && (T.current.isPositioned = !1, d((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let ee = C.useRef(!1);
	uc(() => (ee.current = !0, () => {
		ee.current = !1;
	}), []), uc(() => {
		if (b && (S.current = b), x && (w.current = x), b && x) {
			if (D.current) return D.current(b, x, A);
			A();
		}
	}, [
		b,
		x,
		A,
		D,
		E
	]);
	let j = C.useMemo(() => ({
		reference: S,
		floating: w,
		setReference: v,
		setFloating: y
	}), [v, y]), M = C.useMemo(() => ({
		reference: b,
		floating: x
	}), [b, x]), te = C.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!M.floating) return e;
		let t = pc(M.floating, u.x), r = pc(M.floating, u.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...fc(M.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		M.floating,
		u.x,
		u.y
	]);
	return C.useMemo(() => ({
		...u,
		update: A,
		refs: j,
		elements: M,
		floatingStyles: te
	}), [
		u,
		A,
		j,
		M,
		te
	]);
}
var gc = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : sc({
				element: r.current,
				padding: i
			}).fn(n) : r ? sc({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, _c = (e, t) => {
	let n = nc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, vc = (e, t) => {
	let n = rc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, yc = (e, t) => ({
	fn: cc(e).fn,
	options: [e, t]
}), bc = (e, t) => {
	let n = ic(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, xc = (e, t) => {
	let n = ac(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Sc = (e, t) => {
	let n = oc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Cc = (e, t) => {
	let n = gc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, wc = Object.defineProperty, Tc = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ ((e, t) => wc(e, "name", {
	value: t,
	configurable: !0
}))(function(e, t) {
	let { children: n, width: r = 10, height: i = 5, ...a } = e;
	return /* @__PURE__ */ (0, K.jsx)(kt.svg, {
		...a,
		ref: t,
		width: r,
		height: i,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? n : /* @__PURE__ */ (0, K.jsx)("polygon", { points: "0,0 30,0 15,10" })
	});
}, "Arrow")), Ec = Object.defineProperty, Dc = (e, t) => Ec(e, "name", {
	value: t,
	configurable: !0
}), Oc = "Popper", [kc, Ac] = /* @__PURE__ */ Rt(Oc), [jc, Mc] = kc(Oc), Nc = /* @__PURE__ */ Dc((e) => {
	let { __scopePopper: t, children: n } = e, [r, i] = C.useState(null), [a, o] = C.useState(void 0);
	return /* @__PURE__ */ (0, K.jsx)(jc, {
		scope: t,
		anchor: r,
		onAnchorChange: i,
		placementState: a,
		setPlacementState: o,
		children: n
	});
}, "Popper"), Pc = "PopperAnchor", Fc = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ Dc(function(e, t) {
	let { __scopePopper: n, virtualRef: r, ...i } = e, a = Mc(Pc, n), o = C.useRef(null), s = a.onAnchorChange, c = W(t, C.useCallback((e) => {
		o.current = e, e && s(e);
	}, [s])), l = C.useRef(null);
	C.useEffect(() => {
		if (!r) return;
		let e = l.current;
		l.current = r.current, e !== l.current && s(l.current);
	});
	let u = a.placementState && Gc(a.placementState), d = u?.[0], f = u?.[1];
	return r ? null : /* @__PURE__ */ (0, K.jsx)(kt.div, {
		"data-radix-popper-side": d,
		"data-radix-popper-align": f,
		...i,
		ref: c
	});
}, "PopperAnchor")), Ic = "PopperContent", [Lc, Rc] = kc(Ic), zc = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ Dc(function(e, t) {
	let { __scopePopper: n, side: r = "bottom", sideOffset: i = 0, align: a = "center", alignOffset: o = 0, arrowPadding: s = 0, avoidCollisions: c = !0, collisionBoundary: l = [], collisionPadding: u = 0, sticky: d = "partial", hideWhenDetached: f = !1, updatePositionStrategy: p = "optimized", onPlaced: m, ...h } = e, g = Mc(Ic, n), [_, v] = C.useState(null), y = W(t, v), [b, x] = C.useState(null), S = Ja(b), w = S?.width ?? 0, T = S?.height ?? 0, E = r + (a === "center" ? "" : "-" + a), D = typeof u == "number" ? u : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...u
	}, O = Array.isArray(l) ? l : [l], k = O.length > 0, A = {
		padding: D,
		boundary: O.filter(Uc),
		altBoundary: k
	}, { refs: ee, floatingStyles: j, placement: M, isPositioned: te, middlewareData: ne } = hc({
		strategy: "fixed",
		placement: E,
		whileElementsMounted: /* @__PURE__ */ Dc((...e) => tc(...e, { animationFrame: p === "always" }), "whileElementsMounted"),
		elements: { reference: g.anchor },
		middleware: [
			_c({
				mainAxis: i + T,
				alignmentAxis: o
			}),
			c && vc({
				mainAxis: !0,
				crossAxis: !1,
				limiter: d === "partial" ? yc() : void 0,
				...A
			}),
			c && bc({ ...A }),
			xc({
				...A,
				apply: /* @__PURE__ */ Dc(({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}, "apply")
			}),
			b && Cc({
				element: b,
				padding: s
			}),
			Wc({
				arrowWidth: w,
				arrowHeight: T
			}),
			f && Sc({
				strategy: "referenceHidden",
				...A,
				boundary: k ? A.boundary : void 0
			})
		]
	}), N = g.setPlacementState;
	sn(() => (N(M), () => {
		N(void 0);
	}), [M, N]);
	let [P, re] = Gc(M), ie = Vn(m);
	sn(() => {
		te && ie?.();
	}, [te, ie]);
	let ae = ne.arrow?.x, oe = ne.arrow?.y, F = ne.arrow?.centerOffset !== 0, [I, se] = C.useState();
	return sn(() => {
		_ && se(window.getComputedStyle(_).zIndex);
	}, [_]), /* @__PURE__ */ (0, K.jsx)("div", {
		ref: ee.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...j,
			transform: te ? j.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: I,
			"--radix-popper-transform-origin": [ne.transformOrigin?.x, ne.transformOrigin?.y].join(" "),
			...ne.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: e.dir,
		children: /* @__PURE__ */ (0, K.jsx)(Lc, {
			scope: n,
			placedSide: P,
			placedAlign: re,
			onArrowChange: x,
			arrowX: ae,
			arrowY: oe,
			shouldHideArrow: F,
			children: /* @__PURE__ */ (0, K.jsx)(kt.div, {
				"data-side": P,
				"data-align": re,
				...h,
				ref: y,
				style: {
					...h.style,
					animation: te ? h.style?.animation : "none"
				}
			})
		})
	});
}, "PopperContent")), Bc = "PopperArrow", Vc = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Hc = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ Dc(function(e, t) {
	let { __scopePopper: n, ...r } = e, i = Rc(Bc, n), a = Vc[i.placedSide];
	return /* @__PURE__ */ (0, K.jsx)("span", {
		ref: i.onArrowChange,
		style: {
			position: "absolute",
			left: i.arrowX,
			top: i.arrowY,
			[a]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[i.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: "rotate(180deg)",
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[i.placedSide],
			visibility: i.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ (0, K.jsx)(Tc, {
			...r,
			ref: t,
			style: {
				...r.style,
				display: "block"
			}
		})
	});
}, "PopperArrow"));
function Uc(e) {
	return e !== null;
}
Dc(Uc, "isNotNull");
var Wc = /* @__PURE__ */ Dc((e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Gc(n), u = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
		return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
			x: p,
			y: m
		} };
	}
}), "transformOrigin");
function Gc(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
Dc(Gc, "getSideAndAlignFromPlacement");
var Kc = Nc, qc = Fc, Jc = zc, Yc = Hc, Xc = Object.defineProperty, Zc = (e, t) => Xc(e, "name", {
	value: t,
	configurable: !0
});
function Qc(e) {
	let t = C.useRef({
		value: e,
		previous: e
	});
	return C.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
Zc(Qc, "usePrevious");
//#endregion
//#region node_modules/.pnpm/@radix-ui+number@1.1.3/node_modules/@radix-ui/number/dist/index.mjs
var $c = Object.defineProperty, el = (e, t) => $c(e, "name", {
	value: t,
	configurable: !0
});
function tl(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
el(tl, "clamp");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-select@2.3.7_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_bf9645fe15d12591feb024a88d90a0d4/node_modules/@radix-ui/react-select/dist/index.mjs
var nl = Object.defineProperty, rl = (e, t) => nl(e, "name", {
	value: t,
	configurable: !0
}), il = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], al = [" ", "Enter"], ol = "Select", [sl, cl, ll] = /* @__PURE__ */ Ht(ol), [ul, dl] = /* @__PURE__ */ Rt(ol, [ll, Ac]), fl = Ac(), [pl, ml] = ul(ol), [hl, gl] = ul(ol);
function _l(e) {
	let { __scopeSelect: t, children: n, open: r, defaultOpen: i, onOpenChange: a, value: o, defaultValue: s, onValueChange: c, dir: l, name: u, autoComplete: d, disabled: f, required: p, form: m, internal_do_not_use_render: h } = e, g = fl(t), [_, v] = C.useState(null), [y, b] = C.useState(null), [x, S] = C.useState(!1), w = Rn(l), [T, E] = gn({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: ol
	}), [D, O] = gn({
		prop: o,
		defaultProp: s,
		onChange: c,
		caller: ol
	}), k = C.useRef(null), A = C.useRef(D);
	C.useEffect(() => {
		let e = m ? _?.ownerDocument.getElementById(m) : _?.form;
		if (e instanceof HTMLFormElement) {
			let t = /* @__PURE__ */ rl(() => O(A.current), "reset");
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [
		m,
		_,
		O
	]);
	let ee = _ ? !!m || !!_.closest("form") : !0, [j, M] = C.useState(/* @__PURE__ */ new Set()), te = Pn(), ne = Array.from(j).map((e) => e.props.value).join(";"), N = C.useCallback((e) => {
		M((t) => new Set(t).add(e));
	}, []), P = C.useCallback((e) => {
		M((t) => {
			let n = new Set(t);
			return n.delete(e), n;
		});
	}, []), re = {
		required: p,
		trigger: _,
		onTriggerChange: v,
		valueNode: y,
		onValueNodeChange: b,
		valueNodeHasChildren: x,
		onValueNodeHasChildrenChange: S,
		contentId: te,
		value: D,
		onValueChange: O,
		open: T,
		onOpenChange: E,
		dir: w,
		triggerPointerDownPosRef: k,
		disabled: f,
		name: u,
		autoComplete: d,
		form: m,
		nativeOptions: j,
		nativeSelectKey: ne,
		isFormControl: ee
	};
	return /* @__PURE__ */ (0, K.jsx)(Kc, {
		...g,
		children: /* @__PURE__ */ (0, K.jsx)(pl, {
			scope: t,
			...re,
			children: /* @__PURE__ */ (0, K.jsx)(sl.Provider, {
				scope: t,
				children: /* @__PURE__ */ (0, K.jsx)(hl, {
					scope: t,
					onNativeOptionAdd: N,
					onNativeOptionRemove: P,
					children: ru(h) ? h(re) : n
				})
			})
		})
	});
}
rl(_l, "SelectProvider");
var vl = /* @__PURE__ */ rl((e) => {
	let { __scopeSelect: t, children: n, ...r } = e;
	return /* @__PURE__ */ (0, K.jsx)(_l, {
		__scopeSelect: t,
		...r,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [n, e ? /* @__PURE__ */ (0, K.jsx)(nu, { __scopeSelect: t }) : null] })
	});
}, "Select"), yl = "SelectTrigger", bl = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let { __scopeSelect: n, disabled: r = !1, ...i } = e, a = fl(n), o = ml(yl, n), s = o.disabled || r, c = W(t, o.onTriggerChange), l = cl(n), u = C.useRef("touch"), [d, f, p] = au((e) => {
		let t = l().filter((e) => !e.disabled), n = ou(t, e, t.find((e) => e.value === o.value));
		n !== void 0 && o.onValueChange(n.value);
	}), m = /* @__PURE__ */ rl((e) => {
		s || (o.onOpenChange(!0), p()), e && (o.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	}, "handleOpen");
	return /* @__PURE__ */ (0, K.jsx)(qc, {
		asChild: !0,
		...a,
		children: /* @__PURE__ */ (0, K.jsx)(kt.button, {
			type: "button",
			role: "combobox",
			"aria-controls": o.open ? o.contentId : void 0,
			"aria-expanded": o.open,
			"aria-required": o.required,
			"aria-autocomplete": "none",
			dir: o.dir,
			"data-state": o.open ? "open" : "closed",
			disabled: s,
			"data-disabled": s ? "" : void 0,
			"data-placeholder": iu(o.value) ? "" : void 0,
			...i,
			ref: c,
			onClick: q(i.onClick, (e) => {
				e.currentTarget.focus(), u.current !== "mouse" && m(e);
			}),
			onPointerDown: q(i.onPointerDown, (e) => {
				u.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (m(e), e.preventDefault());
			}),
			onKeyDown: q(i.onKeyDown, (e) => {
				let t = d.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && f(e.key), !(t && e.key === " ") && il.includes(e.key) && (m(), e.preventDefault());
			})
		})
	});
}, "SelectTrigger")), xl = "SelectValue", Sl = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = "", ...s } = e, c = ml(xl, n), { onValueNodeHasChildrenChange: l } = c, u = a !== void 0, d = W(t, c.onValueNodeChange);
	sn(() => {
		l(u);
	}, [l, u]);
	let f = iu(c.value);
	return /* @__PURE__ */ (0, K.jsx)(kt.span, {
		...s,
		asChild: f ? !1 : s.asChild,
		ref: d,
		style: { pointerEvents: "none" },
		children: /* @__PURE__ */ (0, K.jsx)(C.Fragment, { children: f ? o : a }, f ? "placeholder" : "value")
	});
}, "SelectValue")), Cl = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ (0, K.jsx)(kt.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
}, "SelectIcon")), [wl, Tl] = ul("SelectPortal", { forceMount: void 0 }), El = /* @__PURE__ */ rl((e) => {
	let { __scopeSelect: t, forceMount: n, ...r } = e;
	return /* @__PURE__ */ (0, K.jsx)(wl, {
		scope: e.__scopeSelect,
		forceMount: n,
		children: /* @__PURE__ */ (0, K.jsx)(br, {
			asChild: !0,
			...r
		})
	});
}, "SelectPortal"), Dl = "SelectContent", Ol = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let n = Tl(Dl, e.__scopeSelect), { forceMount: r = n.forceMount, ...i } = e, a = ml(Dl, e.__scopeSelect), [o, s] = C.useState();
	return sn(() => {
		s(new DocumentFragment());
	}, []), /* @__PURE__ */ (0, K.jsx)(wn, {
		present: r || a.open,
		children: ({ present: e }) => e ? /* @__PURE__ */ (0, K.jsx)(Pl, {
			...i,
			ref: t
		}) : /* @__PURE__ */ (0, K.jsx)(kl, {
			...i,
			fragment: o
		})
	});
}, "SelectContent")), kl = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let { __scopeSelect: n, children: r, fragment: i } = e;
	return i ? Ae.createPortal(/* @__PURE__ */ (0, K.jsx)(jl, {
		scope: n,
		children: /* @__PURE__ */ (0, K.jsx)(sl.Slot, {
			scope: n,
			children: /* @__PURE__ */ (0, K.jsx)("div", {
				ref: t,
				children: r
			})
		})
	}), i) : null;
}, "SelectContentFragment")), Al = 10, [jl, Ml] = ul(Dl), Nl = /* @__PURE__ */ ft("SelectContent.RemoveScroll"), Pl = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let { __scopeSelect: n } = e, { position: r = "item-aligned", onCloseAutoFocus: i, onEscapeKeyDown: a, onPointerDownOutside: o, side: s, sideOffset: c, align: l, alignOffset: u, arrowPadding: d, collisionBoundary: f, collisionPadding: p, sticky: m, hideWhenDetached: h, avoidCollisions: g, ..._ } = e, v = ml(Dl, n), [y, b] = C.useState(null), [x, S] = C.useState(null), w = W(t, b), [T, E] = C.useState(null), [D, O] = C.useState(null), k = cl(n), [A, ee] = C.useState(!1), j = C.useRef(!1);
	C.useEffect(() => {
		if (y) return Gi(y);
	}, [y]), Er();
	let M = C.useCallback((e) => {
		let [t, ...n] = k().map((e) => e.ref.current), [r] = n.slice(-1), i = document.activeElement;
		for (let n of e) if (n === i || (n?.scrollIntoView({ block: "nearest" }), n === t && x && (x.scrollTop = 0), n === r && x && (x.scrollTop = x.scrollHeight), n?.focus(), document.activeElement !== i)) return;
	}, [k, x]), te = C.useCallback(() => M([T, y]), [
		M,
		T,
		y
	]);
	C.useEffect(() => {
		A && te();
	}, [A, te]);
	let { onOpenChange: ne, triggerPointerDownPosRef: N } = v;
	C.useEffect(() => {
		if (y) {
			let e = {
				x: 0,
				y: 0
			}, t = /* @__PURE__ */ rl((t) => {
				e = {
					x: Math.abs(Math.round(t.pageX) - (N.current?.x ?? 0)),
					y: Math.abs(Math.round(t.pageY) - (N.current?.y ?? 0))
				};
			}, "handlePointerMove"), n = /* @__PURE__ */ rl((n) => {
				e.x <= 10 && e.y <= 10 ? n.preventDefault() : n.composedPath().includes(y) || ne(!1), document.removeEventListener("pointermove", t), N.current = null;
			}, "handlePointerUp");
			return N.current !== null && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, { capture: !0 });
			};
		}
	}, [
		y,
		ne,
		N
	]), C.useEffect(() => {
		let e = /* @__PURE__ */ rl(() => ne(!1), "close");
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [ne]);
	let [P, re] = au((e) => {
		let t = k().filter((e) => !e.disabled), n = ou(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current?.focus());
	}), ie = C.useCallback((e, t, n) => {
		let r = !j.current && !n;
		(v.value !== void 0 && v.value === t || r) && (E(e), r && (j.current = !0));
	}, [v.value]), ae = C.useCallback(() => y?.focus(), [y]), oe = C.useCallback((e, t, n) => {
		let r = !j.current && !n;
		(v.value !== void 0 && v.value === t || r) && O(e);
	}, [v.value]), F = r === "popper" ? Il : Fl, I = F === Il ? {
		side: s,
		sideOffset: c,
		align: l,
		alignOffset: u,
		arrowPadding: d,
		collisionBoundary: f,
		collisionPadding: p,
		sticky: m,
		hideWhenDetached: h,
		avoidCollisions: g
	} : {};
	return /* @__PURE__ */ (0, K.jsx)(jl, {
		scope: n,
		content: y,
		viewport: x,
		onViewportChange: S,
		itemRefCallback: ie,
		selectedItem: T,
		onItemLeave: ae,
		itemTextRefCallback: oe,
		focusSelectedItem: te,
		selectedItemText: D,
		position: r,
		isPositioned: A,
		searchRef: P,
		children: /* @__PURE__ */ (0, K.jsx)(Ii, {
			as: Nl,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ (0, K.jsx)(sr, {
				asChild: !0,
				trapped: v.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: q(i, (e) => {
					v.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ (0, K.jsx)(Yn, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: a,
					onPointerDownOutside: o,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => v.onOpenChange(!1),
					children: /* @__PURE__ */ (0, K.jsx)(F, {
						role: "listbox",
						id: v.contentId,
						"data-state": v.open ? "open" : "closed",
						dir: v.dir,
						onContextMenu: (e) => e.preventDefault(),
						..._,
						...I,
						onPlaced: () => ee(!0),
						ref: w,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							..._.style
						},
						onKeyDown: q(_.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && re(e.key), [
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(e.key)) {
								let t = k().filter((e) => !e.disabled).map((e) => e.ref.current);
								if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
									let n = e.target, r = t.indexOf(n);
									t = t.slice(r + 1);
								}
								setTimeout(() => M(t)), e.preventDefault();
							}
						})
					})
				})
			})
		})
	});
}, "SelectContentImpl")), Fl = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let { __scopeSelect: n, onPlaced: r, ...i } = e, a = ml(Dl, n), o = Ml(Dl, n), [s, c] = C.useState(null), [l, u] = C.useState(null), d = W(t, u), f = cl(n), p = C.useRef(!1), m = C.useRef(!0), { viewport: h, selectedItem: g, selectedItemText: _, focusSelectedItem: v } = o, y = C.useCallback(() => {
		if (a.trigger && a.valueNode && s && l && h && g && _) {
			let e = a.trigger.getBoundingClientRect(), t = l.getBoundingClientRect(), n = a.valueNode.getBoundingClientRect(), i = _.getBoundingClientRect();
			if (a.dir !== "rtl") {
				let r = i.left - t.left, a = n.left - r, o = e.left - a, c = e.width + o, l = Math.max(c, t.width), u = window.innerWidth - Al, d = tl(a, [Al, Math.max(Al, u - l)]);
				s.style.minWidth = c + "px", s.style.left = d + "px";
			} else {
				let r = t.right - i.right, a = window.innerWidth - n.right - r, o = window.innerWidth - e.right - a, c = e.width + o, l = Math.max(c, t.width), u = window.innerWidth - Al, d = tl(a, [Al, Math.max(Al, u - l)]);
				s.style.minWidth = c + "px", s.style.right = d + "px";
			}
			let o = f(), c = window.innerHeight - Al * 2, u = h.scrollHeight, d = window.getComputedStyle(l), m = parseInt(d.borderTopWidth, 10), v = parseInt(d.paddingTop, 10), y = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = m + v + u + b + y, S = Math.min(g.offsetHeight * 5, x), C = window.getComputedStyle(h), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - Al, D = c - E, O = g.offsetHeight / 2, k = g.offsetTop + O, A = m + v + k, ee = x - A;
			if (A <= E) {
				let e = o.length > 0 && g === o[o.length - 1].ref.current;
				s.style.bottom = "0px";
				let t = l.clientHeight - h.offsetTop - h.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + y);
				s.style.height = n + "px";
			} else {
				let e = o.length > 0 && g === o[0].ref.current;
				s.style.top = "0px";
				let t = Math.max(E, m + h.offsetTop + (e ? w : 0) + O) + ee;
				s.style.height = t + "px", h.scrollTop = A - E + h.offsetTop;
			}
			s.style.margin = `${Al}px 0`, s.style.minHeight = S + "px", s.style.maxHeight = c + "px", r?.(), requestAnimationFrame(() => p.current = !0);
		}
	}, [
		f,
		a.trigger,
		a.valueNode,
		s,
		l,
		h,
		g,
		_,
		a.dir,
		r
	]);
	sn(() => y(), [y]);
	let [b, x] = C.useState();
	return sn(() => {
		l && x(window.getComputedStyle(l).zIndex);
	}, [l]), /* @__PURE__ */ (0, K.jsx)(Ll, {
		scope: n,
		contentWrapper: s,
		shouldExpandOnScrollRef: p,
		onScrollButtonChange: C.useCallback((e) => {
			e && m.current === !0 && (y(), v?.(), m.current = !1);
		}, [y, v]),
		children: /* @__PURE__ */ (0, K.jsx)("div", {
			ref: c,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: b
			},
			children: /* @__PURE__ */ (0, K.jsx)(kt.div, {
				...i,
				ref: d,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...i.style
				}
			})
		})
	});
}, "SelectItemAlignedPosition")), Il = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = Al, ...a } = e, o = fl(n);
	return /* @__PURE__ */ (0, K.jsx)(Jc, {
		...o,
		...a,
		ref: t,
		align: r,
		collisionPadding: i,
		style: {
			boxSizing: "border-box",
			...a.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
}, "SelectPopperPosition")), [Ll, Y] = ul(Dl, {}), Rl = "SelectViewport", zl = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let { __scopeSelect: n, nonce: r, ...i } = e, a = Ml(Rl, n), o = Y(Rl, n), s = W(t, a.onViewportChange), c = C.useRef(0);
	return /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: r
	}), /* @__PURE__ */ (0, K.jsx)(sl.Slot, {
		scope: n,
		children: /* @__PURE__ */ (0, K.jsx)(kt.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...i,
			ref: s,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...i.style
			},
			onScroll: q(i.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: r } = o;
				if (r?.current && n) {
					let e = Math.abs(c.current - t.scrollTop);
					if (e > 0) {
						let r = window.innerHeight - Al * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
						if (o < r) {
							let i = o + e, a = Math.min(r, i), s = i - a;
							n.style.height = a + "px", n.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, n.style.justifyContent = "flex-end");
						}
					}
				}
				c.current = t.scrollTop;
			})
		})
	})] });
}, "SelectViewport")), [Bl, Vl] = ul("SelectGroup"), Hl = "SelectItem", [Ul, Wl] = ul(Hl), Gl = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let { __scopeSelect: n, value: r, disabled: i = !1, textValue: a, ...o } = e, s = ml(Hl, n), c = Ml(Hl, n), l = s.value === r, [u, d] = C.useState(a ?? ""), [f, p] = C.useState(!1), m = W(t, Vn((e) => c.itemRefCallback?.(e, r, i))), h = Pn(), g = C.useRef("touch"), _ = /* @__PURE__ */ rl(() => {
		i || (s.onValueChange(r), s.onOpenChange(!1));
	}, "handleSelect");
	return /* @__PURE__ */ (0, K.jsx)(Ul, {
		scope: n,
		value: r,
		disabled: i,
		textId: h,
		isSelected: l,
		onItemTextChange: C.useCallback((e) => {
			d((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ (0, K.jsx)(sl.ItemSlot, {
			scope: n,
			value: r,
			disabled: i,
			textValue: u,
			children: /* @__PURE__ */ (0, K.jsx)(kt.div, {
				role: "option",
				"aria-labelledby": h,
				"data-highlighted": f ? "" : void 0,
				"aria-selected": l && f,
				"data-state": l ? "checked" : "unchecked",
				"aria-disabled": i || void 0,
				"data-disabled": i ? "" : void 0,
				tabIndex: i ? void 0 : -1,
				...o,
				ref: m,
				onFocus: q(o.onFocus, () => p(!0)),
				onBlur: q(o.onBlur, () => p(!1)),
				onClick: q(o.onClick, () => {
					g.current !== "mouse" && _();
				}),
				onPointerUp: q(o.onPointerUp, () => {
					g.current === "mouse" && _();
				}),
				onPointerDown: q(o.onPointerDown, (e) => {
					g.current = e.pointerType;
				}),
				onPointerMove: q(o.onPointerMove, (e) => {
					g.current = e.pointerType, i ? c.onItemLeave?.() : g.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: q(o.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && c.onItemLeave?.();
				}),
				onKeyDown: q(o.onKeyDown, (e) => {
					i || e.target !== e.currentTarget || c.searchRef?.current !== "" && e.key === " " || (al.includes(e.key) && _(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
}, "SelectItem")), Kl = "SelectItemText", ql = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let { __scopeSelect: n, className: r, style: i, ...a } = e, o = ml(Kl, n), s = Ml(Kl, n), c = Wl(Kl, n), l = gl(Kl, n), [u, d] = C.useState(null), f = Vn((e) => s.itemTextRefCallback?.(e, c.value, c.disabled)), p = W(t, d, c.onItemTextChange, f), m = u?.textContent, h = C.useMemo(() => /* @__PURE__ */ (0, K.jsx)("option", {
		value: c.value,
		disabled: c.disabled,
		children: m
	}, c.value), [
		c.disabled,
		c.value,
		m
	]), { onNativeOptionAdd: g, onNativeOptionRemove: _ } = l;
	return sn(() => (g(h), () => _(h)), [
		g,
		_,
		h
	]), /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)(kt.span, {
		id: c.textId,
		...a,
		ref: p
	}), c.isSelected && o.valueNode && !o.valueNodeHasChildren && !iu(o.value) ? Ae.createPortal(a.children, o.valueNode) : null] });
}, "SelectItemText")), Jl = "SelectItemIndicator", Yl = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let { __scopeSelect: n, ...r } = e;
	return Wl(Jl, n).isSelected ? /* @__PURE__ */ (0, K.jsx)(kt.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
}, "SelectItemIndicator")), Xl = "SelectScrollUpButton", Zl = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let n = Ml(Xl, e.__scopeSelect), r = Y(Xl, e.__scopeSelect), [i, a] = C.useState(!1), o = W(t, r.onScrollButtonChange);
	return sn(() => {
		if (n.viewport && n.isPositioned) {
			let e = function() {
				a(t.scrollTop > 0);
			};
			rl(e, "handleScroll");
			let t = n.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [n.viewport, n.isPositioned]), i ? /* @__PURE__ */ (0, K.jsx)(eu, {
		...e,
		ref: o,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = n;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
}, "SelectScrollUpButton")), Ql = "SelectScrollDownButton", $l = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let n = Ml(Ql, e.__scopeSelect), r = Y(Ql, e.__scopeSelect), [i, a] = C.useState(!1), o = W(t, r.onScrollButtonChange);
	return sn(() => {
		if (n.viewport && n.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				a(Math.ceil(t.scrollTop) < e);
			};
			rl(e, "handleScroll");
			let t = n.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [n.viewport, n.isPositioned]), i ? /* @__PURE__ */ (0, K.jsx)(eu, {
		...e,
		ref: o,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = n;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
}, "SelectScrollDownButton")), eu = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function(e, t) {
	let { __scopeSelect: n, onAutoScroll: r, ...i } = e, a = Ml("SelectScrollButton", n), o = C.useRef(null), s = cl(n), c = C.useCallback(() => {
		o.current !== null && (window.clearInterval(o.current), o.current = null);
	}, []);
	return C.useEffect(() => () => c(), [c]), sn(() => {
		s().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [s]), /* @__PURE__ */ (0, K.jsx)(kt.div, {
		"aria-hidden": !0,
		...i,
		ref: t,
		style: {
			flexShrink: 0,
			...i.style
		},
		onPointerDown: q(i.onPointerDown, () => {
			o.current === null && (o.current = window.setInterval(r, 50));
		}),
		onPointerMove: q(i.onPointerMove, () => {
			a.onItemLeave?.(), o.current === null && (o.current = window.setInterval(r, 50));
		}),
		onPointerLeave: q(i.onPointerLeave, () => {
			c();
		})
	});
}, "SelectScrollButtonImpl")), tu = "SelectBubbleInput", nu = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ rl(function({ __scopeSelect: e, ...t }, n) {
	let r = ml(tu, e), { value: i, onValueChange: a, required: o, disabled: s, name: c, autoComplete: l, form: u } = r, { nativeOptions: d, nativeSelectKey: f } = r, p = C.useRef(null), m = W(n, p), h = i ?? "", g = Qc(h), _ = Array.from(d).some((e) => (e.props.value ?? "") === "");
	return C.useEffect(() => {
		let e = p.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, n = Object.getOwnPropertyDescriptor(t, "value").set;
		if (g !== h && n) {
			let t = new Event("change", { bubbles: !0 });
			n.call(e, h), e.dispatchEvent(t);
		}
	}, [g, h]), /* @__PURE__ */ (0, K.jsxs)(kt.select, {
		"aria-hidden": !0,
		required: o,
		tabIndex: -1,
		name: c,
		autoComplete: l,
		disabled: s,
		form: u,
		onChange: (e) => a(e.target.value),
		...t,
		style: {
			...Nt,
			...t.style
		},
		ref: m,
		defaultValue: h,
		children: [iu(i) && !_ ? /* @__PURE__ */ (0, K.jsx)("option", { value: "" }) : null, Array.from(d)]
	}, f);
}, "SelectBubbleInput"));
function ru(e) {
	return typeof e == "function";
}
rl(ru, "isFunction");
function iu(e) {
	return e === "" || e === void 0;
}
rl(iu, "shouldShowPlaceholder");
function au(e) {
	let t = Vn(e), n = C.useRef(""), r = C.useRef(0), i = C.useCallback((e) => {
		let i = n.current + e;
		t(i), (/* @__PURE__ */ rl((function e(t) {
			n.current = t, window.clearTimeout(r.current), t !== "" && (r.current = window.setTimeout(() => e(""), 1e3));
		}), "updateSearch"))(i);
	}, [t]), a = C.useCallback(() => {
		n.current = "", window.clearTimeout(r.current);
	}, []);
	return C.useEffect(() => () => window.clearTimeout(r.current), []), [
		n,
		i,
		a
	];
}
rl(au, "useTypeaheadSearch");
function ou(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = su(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
rl(ou, "findNextItem");
function su(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
rl(su, "wrapArray");
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-tooltip@1.2.16_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_76995137c9f1439fdec9e47c32e62493/node_modules/@radix-ui/react-tooltip/dist/index.mjs
var cu = Object.defineProperty, lu = (e, t) => cu(e, "name", {
	value: t,
	configurable: !0
}), [uu, du] = /* @__PURE__ */ Rt("Tooltip", [Ac]), fu = Ac(), pu = "TooltipProvider", mu = 700, hu = "tooltip.open", [gu, _u] = uu(pu), vu = /* @__PURE__ */ lu((e) => {
	let { __scopeTooltip: t, delayDuration: n = mu, skipDelayDuration: r = 300, disableHoverableContent: i = !1, children: a } = e, o = C.useRef(!0), s = C.useRef(!1), c = C.useRef(0);
	return C.useEffect(() => {
		let e = c.current;
		return () => window.clearTimeout(e);
	}, []), /* @__PURE__ */ (0, K.jsx)(gu, {
		scope: t,
		isOpenDelayedRef: o,
		delayDuration: n,
		onOpen: C.useCallback(() => {
			r <= 0 || (window.clearTimeout(c.current), o.current = !1);
		}, [r]),
		onClose: C.useCallback(() => {
			r <= 0 || (window.clearTimeout(c.current), c.current = window.setTimeout(() => o.current = !0, r));
		}, [r]),
		isPointerInTransitRef: s,
		onPointerInTransitChange: C.useCallback((e) => {
			s.current = e;
		}, []),
		disableHoverableContent: i,
		children: a
	});
}, "TooltipProvider"), yu = "Tooltip", [bu, xu] = uu(yu), Su = /* @__PURE__ */ lu((e) => {
	let { __scopeTooltip: t, children: n, open: r, defaultOpen: i, onOpenChange: a, disableHoverableContent: o, delayDuration: s } = e, c = _u(yu, e.__scopeTooltip), l = fu(t), [u, d] = C.useState(null), [f, p] = C.useState(void 0), m = Pn(), h = C.useRef(0), g = o ?? c.disableHoverableContent, _ = s ?? c.delayDuration, v = C.useRef(!1), [y, b] = gn({
		prop: r,
		defaultProp: i ?? !1,
		onChange: /* @__PURE__ */ lu((e) => {
			e ? (c.onOpen(), document.dispatchEvent(new CustomEvent(hu))) : c.onClose(), a?.(e);
		}, "onChange"),
		caller: yu
	}), x = C.useMemo(() => y ? v.current ? "delayed-open" : "instant-open" : "closed", [y]), S = C.useCallback(() => {
		window.clearTimeout(h.current), h.current = 0, v.current = !1, b(!0);
	}, [b]), w = C.useCallback(() => {
		window.clearTimeout(h.current), h.current = 0, b(!1);
	}, [b]), T = C.useCallback(() => {
		window.clearTimeout(h.current), h.current = window.setTimeout(() => {
			v.current = !0, b(!0), h.current = 0;
		}, _);
	}, [_, b]);
	C.useEffect(() => () => {
		h.current &&= (window.clearTimeout(h.current), 0);
	}, []);
	let E = f ?? m;
	return /* @__PURE__ */ (0, K.jsx)(Kc, {
		...l,
		children: /* @__PURE__ */ (0, K.jsx)(bu, {
			scope: t,
			contentId: E,
			setContentId: p,
			open: y,
			stateAttribute: x,
			trigger: u,
			onTriggerChange: d,
			onTriggerEnter: C.useCallback(() => {
				c.isOpenDelayedRef.current ? T() : S();
			}, [
				c.isOpenDelayedRef,
				T,
				S
			]),
			onTriggerLeave: C.useCallback(() => {
				g ? w() : (window.clearTimeout(h.current), h.current = 0);
			}, [w, g]),
			onOpen: S,
			onClose: w,
			disableHoverableContent: g,
			children: n
		})
	});
}, "Tooltip"), Cu = "TooltipTrigger", wu = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ lu(function(e, t) {
	let { __scopeTooltip: n, ...r } = e, i = xu(Cu, n), a = _u(Cu, n), o = fu(n), s = W(t, C.useRef(null), i.onTriggerChange), c = C.useRef(!1), l = C.useRef(!1), u = C.useCallback(() => c.current = !1, []);
	return C.useEffect(() => () => document.removeEventListener("pointerup", u), [u]), /* @__PURE__ */ (0, K.jsx)(qc, {
		asChild: !0,
		...o,
		children: /* @__PURE__ */ (0, K.jsx)(kt.button, {
			"aria-describedby": i.open ? i.contentId : void 0,
			"data-state": i.stateAttribute,
			...r,
			ref: s,
			onPointerMove: q(e.onPointerMove, (e) => {
				e.pointerType !== "touch" && !l.current && !a.isPointerInTransitRef.current && (i.onTriggerEnter(), l.current = !0);
			}),
			onPointerLeave: q(e.onPointerLeave, () => {
				i.onTriggerLeave(), l.current = !1;
			}),
			onPointerDown: q(e.onPointerDown, () => {
				i.open && i.onClose(), c.current = !0, document.addEventListener("pointerup", u, { once: !0 });
			}),
			onFocus: q(e.onFocus, () => {
				c.current || i.onOpen();
			}),
			onBlur: q(e.onBlur, i.onClose),
			onClick: q(e.onClick, i.onClose)
		})
	});
}, "TooltipTrigger")), Tu = "TooltipPortal", [Eu, Du] = uu(Tu, { forceMount: void 0 }), Ou = /* @__PURE__ */ lu((e) => {
	let { __scopeTooltip: t, forceMount: n, children: r, container: i } = e, a = xu(Tu, t);
	return /* @__PURE__ */ (0, K.jsx)(Eu, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ (0, K.jsx)(wn, {
			present: n || a.open,
			children: /* @__PURE__ */ (0, K.jsx)(br, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
}, "TooltipPortal"), ku = "TooltipContent", Au = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ lu(function(e, t) {
	let n = Du(ku, e.__scopeTooltip), { forceMount: r = n.forceMount, side: i = "top", ...a } = e, o = xu(ku, e.__scopeTooltip);
	return /* @__PURE__ */ (0, K.jsx)(wn, {
		present: r || o.open,
		children: o.disableHoverableContent ? /* @__PURE__ */ (0, K.jsx)(Nu, {
			side: i,
			...a,
			ref: t
		}) : /* @__PURE__ */ (0, K.jsx)(ju, {
			side: i,
			...a,
			ref: t
		})
	});
}, "TooltipContent")), ju = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ lu(function(e, t) {
	let n = xu(ku, e.__scopeTooltip), r = _u(ku, e.__scopeTooltip), i = C.useRef(null), a = W(t, i), [o, s] = C.useState(null), { trigger: c, onClose: l } = n, u = i.current, { onPointerInTransitChange: d } = r, f = C.useCallback(() => {
		s(null), d(!1);
	}, [d]), p = C.useCallback((e, t) => {
		let n = e.currentTarget, r = {
			x: e.clientX,
			y: e.clientY
		}, i = Iu(r, Fu(r, n.getBoundingClientRect())), a = Lu(t.getBoundingClientRect());
		s(zu([...i, ...a])), d(!0);
	}, [d]);
	return C.useEffect(() => () => f(), [f]), C.useEffect(() => {
		if (c && u) {
			let e = /* @__PURE__ */ lu((e) => p(e, u), "handleTriggerLeave"), t = /* @__PURE__ */ lu((e) => p(e, c), "handleContentLeave");
			return c.addEventListener("pointerleave", e), u.addEventListener("pointerleave", t), () => {
				c.removeEventListener("pointerleave", e), u.removeEventListener("pointerleave", t);
			};
		}
	}, [
		c,
		u,
		p,
		f
	]), C.useEffect(() => {
		if (o) {
			let e = /* @__PURE__ */ lu((e) => {
				let t = e.target, n = {
					x: e.clientX,
					y: e.clientY
				}, r = c?.contains(t) || u?.contains(t), i = !Ru(n, o);
				r ? f() : i && (f(), l());
			}, "handleTrackPointerGrace");
			return document.addEventListener("pointermove", e), () => document.removeEventListener("pointermove", e);
		}
	}, [
		c,
		u,
		o,
		l,
		f
	]), /* @__PURE__ */ (0, K.jsx)(Nu, {
		...e,
		ref: a
	});
}, "TooltipContentHoverable")), Mu = /* @__PURE__ */ ht("TooltipContent"), Nu = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ lu(function(e, t) {
	let { __scopeTooltip: n, children: r, "aria-label": i, id: a, onEscapeKeyDown: o, onPointerDownOutside: s, ...c } = e, l = xu(ku, n), u = fu(n), { onClose: d } = l;
	C.useEffect(() => (document.addEventListener(hu, d), () => document.removeEventListener(hu, d)), [d]), C.useEffect(() => {
		if (l.trigger) {
			let e = /* @__PURE__ */ lu((e) => {
				e.target instanceof Node && e.target.contains(l.trigger) && d();
			}, "handleScroll");
			return window.addEventListener("scroll", e, { capture: !0 }), () => window.removeEventListener("scroll", e, { capture: !0 });
		}
	}, [l.trigger, d]);
	let { setContentId: f } = l;
	return sn(() => (f(a), () => {
		f(void 0);
	}), [a, f]), /* @__PURE__ */ (0, K.jsx)(Yn, {
		asChild: !0,
		disableOutsidePointerEvents: !1,
		onEscapeKeyDown: o,
		onPointerDownOutside: s,
		onFocusOutside: (e) => e.preventDefault(),
		onDismiss: d,
		children: /* @__PURE__ */ (0, K.jsxs)(Jc, {
			"data-state": l.stateAttribute,
			role: i ? void 0 : "tooltip",
			id: i ? void 0 : l.contentId,
			...u,
			...c,
			ref: t,
			style: {
				...c.style,
				"--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
				"--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
				"--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
				"--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
				"--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
			},
			children: [/* @__PURE__ */ (0, K.jsx)(Mu, { children: r }), i ? /* @__PURE__ */ (0, K.jsx)(Pt, {
				id: l.contentId,
				role: "tooltip",
				children: i
			}) : null]
		})
	});
}, "TooltipContentImpl")), Pu = /* @__PURE__ */ C.forwardRef(/* @__PURE__ */ lu(function(e, t) {
	let { __scopeTooltip: n, ...r } = e, i = fu(n);
	return /* @__PURE__ */ (0, K.jsx)(Yc, {
		...i,
		...r,
		ref: t
	});
}, "TooltipArrow"));
function Fu(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
lu(Fu, "getExitSideFromRect");
function Iu(e, t, n = 5) {
	let r = [];
	switch (t) {
		case "top":
			r.push({
				x: e.x - n,
				y: e.y + n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "bottom":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y - n
			});
			break;
		case "left":
			r.push({
				x: e.x + n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "right":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x - n,
				y: e.y + n
			});
			break;
	}
	return r;
}
lu(Iu, "getPaddedExitPoints");
function Lu(e) {
	let { top: t, right: n, bottom: r, left: i } = e;
	return [
		{
			x: i,
			y: t
		},
		{
			x: n,
			y: t
		},
		{
			x: n,
			y: r
		},
		{
			x: i,
			y: r
		}
	];
}
lu(Lu, "getPointsFromRect");
function Ru(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
lu(Ru, "isPointInPolygon");
function zu(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : +(e.y > t.y)), Bu(t);
}
lu(zu, "getHull");
function Bu(e) {
	if (e.length <= 1) return e.slice();
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (; t.length >= 2;) {
			let e = t[t.length - 1], n = t[t.length - 2];
			if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) t.pop();
			else break;
		}
		t.push(r);
	}
	t.pop();
	let n = [];
	for (let t = e.length - 1; t >= 0; t--) {
		let r = e[t];
		for (; n.length >= 2;) {
			let e = n[n.length - 1], t = n[n.length - 2];
			if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop();
			else break;
		}
		n.push(r);
	}
	return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
lu(Bu, "getHullPresorted");
var Vu = vu, Hu = Su, Uu = wu, Wu = Ou, Gu = Au, Ku = Pu, qu = 768;
function Ju() {
	let [e, t] = C.useState(void 0);
	return C.useEffect(() => {
		let e = window.matchMedia(`(max-width: ${qu - 1}px)`), n = () => {
			t(window.innerWidth < qu);
		};
		return e.addEventListener("change", n), t(window.innerWidth < qu), () => e.removeEventListener("change", n);
	}, []), !!e;
}
//#endregion
//#region node_modules/.pnpm/tailwind-merge@3.6.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var Yu = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, Xu = (e, t) => ({
	classGroupId: e,
	validator: t
}), Zu = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), Qu = "-", $u = [], ed = "arbitrary..", td = (e) => {
	let t = id(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return rd(e);
			let n = e.split(Qu);
			return nd(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? Yu(i, t) : t : i || $u;
			}
			return n[e] || $u;
		}
	};
}, nd = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = nd(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(Qu) : e.slice(t).join(Qu), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, rd = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? ed + r : void 0;
})(), id = (e) => {
	let { theme: t, classGroups: n } = e;
	return ad(n, t);
}, ad = (e, t) => {
	let n = Zu();
	for (let r in e) {
		let i = e[r];
		od(i, n, r, t);
	}
	return n;
}, od = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		sd(i, t, n, r);
	}
}, sd = (e, t, n, r) => {
	if (typeof e == "string") {
		cd(e, t, n);
		return;
	}
	if (typeof e == "function") {
		ld(e, t, n, r);
		return;
	}
	ud(e, t, n, r);
}, cd = (e, t, n) => {
	let r = e === "" ? t : dd(t, e);
	r.classGroupId = n;
}, ld = (e, t, n, r) => {
	if (fd(e)) {
		od(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(Xu(n, e));
}, ud = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		od(o, dd(t, a), n, r);
	}
}, dd = (e, t) => {
	let n = e, r = t.split(Qu), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = Zu(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, fd = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, pd = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, md = "!", hd = ":", gd = [], _d = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), vd = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === hd) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(md) ? (c = s.slice(0, -1), l = !0) : s.startsWith(md) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return _d(t, l, c, u);
	};
	if (t) {
		let e = t + hd, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : _d(gd, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, yd = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, bd = (e) => ({
	cache: pd(e.cacheSize),
	parseClassName: vd(e),
	sortModifiers: yd(e),
	postfixLookupClassGroupIds: xd(e),
	...td(e)
}), xd = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, Sd = /\s+/, Cd = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(Sd), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			if (g = r(p), !g) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + md : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, wd = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = Td(n)) && (i && (i += " "), i += r);
	return i;
}, Td = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = Td(e[r])) && (n && (n += " "), n += t);
	return n;
}, Ed = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = bd(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = Cd(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(wd(...e));
}, Dd = [], Od = (e) => {
	let t = (t) => t[e] || Dd;
	return t.isThemeGetter = !0, t;
}, kd = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ad = /^\((?:(\w[\w-]*):)?(.+)\)$/i, jd = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Md = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Nd = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Pd = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Fd = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Id = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ld = (e) => jd.test(e), X = (e) => !!e && !Number.isNaN(Number(e)), Rd = (e) => !!e && Number.isInteger(Number(e)), zd = (e) => e.endsWith("%") && X(e.slice(0, -1)), Bd = (e) => Md.test(e), Vd = () => !0, Hd = (e) => Nd.test(e) && !Pd.test(e), Ud = () => !1, Wd = (e) => Fd.test(e), Gd = (e) => Id.test(e), Kd = (e) => !Z(e) && !Q(e), qd = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Jd = (e) => uf(e, mf, Ud), Z = (e) => kd.test(e), Yd = (e) => uf(e, hf, Hd), Xd = (e) => uf(e, gf, X), Zd = (e) => uf(e, vf, Vd), Qd = (e) => uf(e, _f, Ud), $d = (e) => uf(e, ff, Ud), ef = (e) => uf(e, pf, Gd), tf = (e) => uf(e, yf, Wd), Q = (e) => Ad.test(e), nf = (e) => df(e, hf), rf = (e) => df(e, _f), af = (e) => df(e, ff), of = (e) => df(e, mf), sf = (e) => df(e, pf), cf = (e) => df(e, yf, !0), lf = (e) => df(e, vf, !0), uf = (e, t, n) => {
	let r = kd.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, df = (e, t, n = !1) => {
	let r = Ad.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, ff = (e) => e === "position" || e === "percentage", pf = (e) => e === "image" || e === "url", mf = (e) => e === "length" || e === "size" || e === "bg-size", hf = (e) => e === "length", gf = (e) => e === "number", _f = (e) => e === "family-name", vf = (e) => e === "number" || e === "weight", yf = (e) => e === "shadow", bf = /* @__PURE__ */ Ed(() => {
	let e = Od("color"), t = Od("font"), n = Od("text"), r = Od("font-weight"), i = Od("tracking"), a = Od("leading"), o = Od("breakpoint"), s = Od("container"), c = Od("spacing"), l = Od("radius"), u = Od("shadow"), d = Od("inset-shadow"), f = Od("text-shadow"), p = Od("drop-shadow"), m = Od("blur"), h = Od("perspective"), g = Od("aspect"), _ = Od("ease"), v = Od("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		Q,
		Z
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		Q,
		Z,
		c
	], T = () => [
		Ld,
		"full",
		"auto",
		...w()
	], E = () => [
		Rd,
		"none",
		"subgrid",
		Q,
		Z
	], D = () => [
		"auto",
		{ span: [
			"full",
			Rd,
			Q,
			Z
		] },
		Rd,
		Q,
		Z
	], O = () => [
		Rd,
		"auto",
		Q,
		Z
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		Q,
		Z
	], A = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], ee = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], j = () => ["auto", ...w()], M = () => [
		Ld,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], te = () => [
		Ld,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], ne = () => [
		Ld,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], N = () => [
		e,
		Q,
		Z
	], P = () => [
		...b(),
		af,
		$d,
		{ position: [Q, Z] }
	], re = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], ie = () => [
		"auto",
		"cover",
		"contain",
		of,
		Jd,
		{ size: [Q, Z] }
	], ae = () => [
		zd,
		nf,
		Yd
	], oe = () => [
		"",
		"none",
		"full",
		l,
		Q,
		Z
	], F = () => [
		"",
		X,
		nf,
		Yd
	], I = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], se = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], ce = () => [
		X,
		zd,
		af,
		$d
	], le = () => [
		"",
		"none",
		m,
		Q,
		Z
	], ue = () => [
		"none",
		X,
		Q,
		Z
	], de = () => [
		"none",
		X,
		Q,
		Z
	], fe = () => [
		X,
		Q,
		Z
	], pe = () => [
		Ld,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [Bd],
			breakpoint: [Bd],
			color: [Vd],
			container: [Bd],
			"drop-shadow": [Bd],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Kd],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [Bd],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [Bd],
			shadow: [Bd],
			spacing: ["px", X],
			text: [Bd],
			"text-shadow": [Bd],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				Ld,
				Z,
				Q,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				Q,
				Z
			] }],
			"container-named": [qd],
			columns: [{ columns: [
				X,
				Z,
				Q,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				Rd,
				"auto",
				Q,
				Z
			] }],
			basis: [{ basis: [
				Ld,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				X,
				Ld,
				"auto",
				"initial",
				"none",
				Z
			] }],
			grow: [{ grow: [
				"",
				X,
				Q,
				Z
			] }],
			shrink: [{ shrink: [
				"",
				X,
				Q,
				Z
			] }],
			order: [{ order: [
				Rd,
				"first",
				"last",
				"none",
				Q,
				Z
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": O() }],
			"col-end": [{ "col-end": O() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": O() }],
			"row-end": [{ "row-end": O() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": k() }],
			"auto-rows": [{ "auto-rows": k() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...A(), "normal"] }],
			"justify-items": [{ "justify-items": [...ee(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...ee()] }],
			"align-content": [{ content: ["normal", ...A()] }],
			"align-items": [{ items: [...ee(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...ee(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": A() }],
			"place-items": [{ "place-items": [...ee(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...ee()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: j() }],
			mx: [{ mx: j() }],
			my: [{ my: j() }],
			ms: [{ ms: j() }],
			me: [{ me: j() }],
			mbs: [{ mbs: j() }],
			mbe: [{ mbe: j() }],
			mt: [{ mt: j() }],
			mr: [{ mr: j() }],
			mb: [{ mb: j() }],
			ml: [{ ml: j() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: M() }],
			"inline-size": [{ inline: ["auto", ...te()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...te()] }],
			"max-inline-size": [{ "max-inline": ["none", ...te()] }],
			"block-size": [{ block: ["auto", ...ne()] }],
			"min-block-size": [{ "min-block": ["auto", ...ne()] }],
			"max-block-size": [{ "max-block": ["none", ...ne()] }],
			w: [{ w: [
				s,
				"screen",
				...M()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...M()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...M()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...M()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...M()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...M()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				nf,
				Yd
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				lf,
				Zd
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				zd,
				Z
			] }],
			"font-family": [{ font: [
				rf,
				Qd,
				t
			] }],
			"font-features": [{ "font-features": [Z] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				Q,
				Z
			] }],
			"line-clamp": [{ "line-clamp": [
				X,
				"none",
				Q,
				Xd
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				Q,
				Z
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				Q,
				Z
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: N() }],
			"text-color": [{ text: N() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...I(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				X,
				"from-font",
				"auto",
				Q,
				Yd
			] }],
			"text-decoration-color": [{ decoration: N() }],
			"underline-offset": [{ "underline-offset": [
				X,
				"auto",
				Q,
				Z
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				Rd,
				Q,
				Z
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				Q,
				Z
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				Q,
				Z
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: P() }],
			"bg-repeat": [{ bg: re() }],
			"bg-size": [{ bg: ie() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						Rd,
						Q,
						Z
					],
					radial: [
						"",
						Q,
						Z
					],
					conic: [
						Rd,
						Q,
						Z
					]
				},
				sf,
				ef
			] }],
			"bg-color": [{ bg: N() }],
			"gradient-from-pos": [{ from: ae() }],
			"gradient-via-pos": [{ via: ae() }],
			"gradient-to-pos": [{ to: ae() }],
			"gradient-from": [{ from: N() }],
			"gradient-via": [{ via: N() }],
			"gradient-to": [{ to: N() }],
			rounded: [{ rounded: oe() }],
			"rounded-s": [{ "rounded-s": oe() }],
			"rounded-e": [{ "rounded-e": oe() }],
			"rounded-t": [{ "rounded-t": oe() }],
			"rounded-r": [{ "rounded-r": oe() }],
			"rounded-b": [{ "rounded-b": oe() }],
			"rounded-l": [{ "rounded-l": oe() }],
			"rounded-ss": [{ "rounded-ss": oe() }],
			"rounded-se": [{ "rounded-se": oe() }],
			"rounded-ee": [{ "rounded-ee": oe() }],
			"rounded-es": [{ "rounded-es": oe() }],
			"rounded-tl": [{ "rounded-tl": oe() }],
			"rounded-tr": [{ "rounded-tr": oe() }],
			"rounded-br": [{ "rounded-br": oe() }],
			"rounded-bl": [{ "rounded-bl": oe() }],
			"border-w": [{ border: F() }],
			"border-w-x": [{ "border-x": F() }],
			"border-w-y": [{ "border-y": F() }],
			"border-w-s": [{ "border-s": F() }],
			"border-w-e": [{ "border-e": F() }],
			"border-w-bs": [{ "border-bs": F() }],
			"border-w-be": [{ "border-be": F() }],
			"border-w-t": [{ "border-t": F() }],
			"border-w-r": [{ "border-r": F() }],
			"border-w-b": [{ "border-b": F() }],
			"border-w-l": [{ "border-l": F() }],
			"divide-x": [{ "divide-x": F() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": F() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...I(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...I(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: N() }],
			"border-color-x": [{ "border-x": N() }],
			"border-color-y": [{ "border-y": N() }],
			"border-color-s": [{ "border-s": N() }],
			"border-color-e": [{ "border-e": N() }],
			"border-color-bs": [{ "border-bs": N() }],
			"border-color-be": [{ "border-be": N() }],
			"border-color-t": [{ "border-t": N() }],
			"border-color-r": [{ "border-r": N() }],
			"border-color-b": [{ "border-b": N() }],
			"border-color-l": [{ "border-l": N() }],
			"divide-color": [{ divide: N() }],
			"outline-style": [{ outline: [
				...I(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				X,
				Q,
				Z
			] }],
			"outline-w": [{ outline: [
				"",
				X,
				nf,
				Yd
			] }],
			"outline-color": [{ outline: N() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				cf,
				tf
			] }],
			"shadow-color": [{ shadow: N() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				cf,
				tf
			] }],
			"inset-shadow-color": [{ "inset-shadow": N() }],
			"ring-w": [{ ring: F() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: N() }],
			"ring-offset-w": [{ "ring-offset": [X, Yd] }],
			"ring-offset-color": [{ "ring-offset": N() }],
			"inset-ring-w": [{ "inset-ring": F() }],
			"inset-ring-color": [{ "inset-ring": N() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				cf,
				tf
			] }],
			"text-shadow-color": [{ "text-shadow": N() }],
			opacity: [{ opacity: [
				X,
				Q,
				Z
			] }],
			"mix-blend": [{ "mix-blend": [
				...se(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": se() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [X] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": ce() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": ce() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": N() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": N() }],
			"mask-image-t-from-pos": [{ "mask-t-from": ce() }],
			"mask-image-t-to-pos": [{ "mask-t-to": ce() }],
			"mask-image-t-from-color": [{ "mask-t-from": N() }],
			"mask-image-t-to-color": [{ "mask-t-to": N() }],
			"mask-image-r-from-pos": [{ "mask-r-from": ce() }],
			"mask-image-r-to-pos": [{ "mask-r-to": ce() }],
			"mask-image-r-from-color": [{ "mask-r-from": N() }],
			"mask-image-r-to-color": [{ "mask-r-to": N() }],
			"mask-image-b-from-pos": [{ "mask-b-from": ce() }],
			"mask-image-b-to-pos": [{ "mask-b-to": ce() }],
			"mask-image-b-from-color": [{ "mask-b-from": N() }],
			"mask-image-b-to-color": [{ "mask-b-to": N() }],
			"mask-image-l-from-pos": [{ "mask-l-from": ce() }],
			"mask-image-l-to-pos": [{ "mask-l-to": ce() }],
			"mask-image-l-from-color": [{ "mask-l-from": N() }],
			"mask-image-l-to-color": [{ "mask-l-to": N() }],
			"mask-image-x-from-pos": [{ "mask-x-from": ce() }],
			"mask-image-x-to-pos": [{ "mask-x-to": ce() }],
			"mask-image-x-from-color": [{ "mask-x-from": N() }],
			"mask-image-x-to-color": [{ "mask-x-to": N() }],
			"mask-image-y-from-pos": [{ "mask-y-from": ce() }],
			"mask-image-y-to-pos": [{ "mask-y-to": ce() }],
			"mask-image-y-from-color": [{ "mask-y-from": N() }],
			"mask-image-y-to-color": [{ "mask-y-to": N() }],
			"mask-image-radial": [{ "mask-radial": [Q, Z] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": ce() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": ce() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": N() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": N() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [X] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": ce() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": ce() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": N() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": N() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: P() }],
			"mask-repeat": [{ mask: re() }],
			"mask-size": [{ mask: ie() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				Q,
				Z
			] }],
			filter: [{ filter: [
				"",
				"none",
				Q,
				Z
			] }],
			blur: [{ blur: le() }],
			brightness: [{ brightness: [
				X,
				Q,
				Z
			] }],
			contrast: [{ contrast: [
				X,
				Q,
				Z
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				cf,
				tf
			] }],
			"drop-shadow-color": [{ "drop-shadow": N() }],
			grayscale: [{ grayscale: [
				"",
				X,
				Q,
				Z
			] }],
			"hue-rotate": [{ "hue-rotate": [
				X,
				Q,
				Z
			] }],
			invert: [{ invert: [
				"",
				X,
				Q,
				Z
			] }],
			saturate: [{ saturate: [
				X,
				Q,
				Z
			] }],
			sepia: [{ sepia: [
				"",
				X,
				Q,
				Z
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				Q,
				Z
			] }],
			"backdrop-blur": [{ "backdrop-blur": le() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				X,
				Q,
				Z
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				X,
				Q,
				Z
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				X,
				Q,
				Z
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				X,
				Q,
				Z
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				X,
				Q,
				Z
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				X,
				Q,
				Z
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				X,
				Q,
				Z
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				X,
				Q,
				Z
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				Q,
				Z
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				X,
				"initial",
				Q,
				Z
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				Q,
				Z
			] }],
			delay: [{ delay: [
				X,
				Q,
				Z
			] }],
			animate: [{ animate: [
				"none",
				v,
				Q,
				Z
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				Q,
				Z
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: ue() }],
			"rotate-x": [{ "rotate-x": ue() }],
			"rotate-y": [{ "rotate-y": ue() }],
			"rotate-z": [{ "rotate-z": ue() }],
			scale: [{ scale: de() }],
			"scale-x": [{ "scale-x": de() }],
			"scale-y": [{ "scale-y": de() }],
			"scale-z": [{ "scale-z": de() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: fe() }],
			"skew-x": [{ "skew-x": fe() }],
			"skew-y": [{ "skew-y": fe() }],
			transform: [{ transform: [
				Q,
				Z,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: pe() }],
			"translate-x": [{ "translate-x": pe() }],
			"translate-y": [{ "translate-y": pe() }],
			"translate-z": [{ "translate-z": pe() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Rd,
				Q,
				Z
			] }],
			accent: [{ accent: N() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: N() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				Q,
				Z
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": N() }],
			"scrollbar-track-color": [{ "scrollbar-track": N() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				Q,
				Z
			] }],
			fill: [{ fill: ["none", ...N()] }],
			"stroke-w": [{ stroke: [
				X,
				nf,
				Yd,
				Xd
			] }],
			stroke: [{ stroke: ["none", ...N()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region lib/utils.ts
function $(...e) {
	return bf(rt(e));
}
//#endregion
//#region components/ui/button.tsx
var xf = ot("inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
			outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
			lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
			icon: "size-9",
			"icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-8",
			"icon-lg": "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Sf({ className: e, variant: t = "default", size: n = "default", asChild: r = !1, ...i }) {
	return /* @__PURE__ */ (0, K.jsx)(r ? pt : "button", {
		"data-slot": "button",
		"data-variant": t,
		"data-size": n,
		className: $(xf({
			variant: t,
			size: n,
			className: e
		})),
		...i
	});
}
//#endregion
//#region components/ui/sheet.tsx
function Cf({ ...e }) {
	return /* @__PURE__ */ (0, K.jsx)($i, {
		"data-slot": "sheet",
		...e
	});
}
function wf({ ...e }) {
	return /* @__PURE__ */ (0, K.jsx)(aa, {
		"data-slot": "sheet-portal",
		...e
	});
}
function Tf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)(sa, {
		"data-slot": "sheet-overlay",
		className: $("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", e),
		...t
	});
}
function Ef({ className: e, children: t, side: n = "right", showCloseButton: r = !0, ...i }) {
	return /* @__PURE__ */ (0, K.jsxs)(wf, { children: [/* @__PURE__ */ (0, K.jsx)(Tf, {}), /* @__PURE__ */ (0, K.jsxs)(da, {
		"data-slot": "sheet-content",
		className: $("fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500", n === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm", n === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm", n === "top" && "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top", n === "bottom" && "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", e),
		...i,
		children: [t, r && /* @__PURE__ */ (0, K.jsxs)(ba, {
			className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary",
			children: [/* @__PURE__ */ (0, K.jsx)(Oe, { className: "size-4" }), /* @__PURE__ */ (0, K.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function Df({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)("div", {
		"data-slot": "sheet-header",
		className: $("flex flex-col gap-1.5 p-4", e),
		...t
	});
}
function Of({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)(ga, {
		"data-slot": "sheet-title",
		className: $("font-semibold text-foreground", e),
		...t
	});
}
function kf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)(va, {
		"data-slot": "sheet-description",
		className: $("text-sm text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region components/ui/tooltip.tsx
function Af({ delayDuration: e = 0, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)(Vu, {
		"data-slot": "tooltip-provider",
		delayDuration: e,
		...t
	});
}
function jf({ ...e }) {
	return /* @__PURE__ */ (0, K.jsx)(Hu, {
		"data-slot": "tooltip",
		...e
	});
}
function Mf({ ...e }) {
	return /* @__PURE__ */ (0, K.jsx)(Uu, {
		"data-slot": "tooltip-trigger",
		...e
	});
}
function Nf({ className: e, sideOffset: t = 0, children: n, ...r }) {
	return /* @__PURE__ */ (0, K.jsx)(Wu, { children: /* @__PURE__ */ (0, K.jsxs)(Gu, {
		"data-slot": "tooltip-content",
		sideOffset: t,
		className: $("z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", e),
		...r,
		children: [n, /* @__PURE__ */ (0, K.jsx)(Ku, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })]
	}) });
}
//#endregion
//#region components/ui/sidebar.tsx
var Pf = "sidebar_state", Ff = 3600 * 24 * 7, If = "16rem", Lf = "18rem", Rf = "3rem", zf = "b", Bf = C.createContext(null);
function Vf() {
	let e = C.useContext(Bf);
	if (!e) throw Error("useSidebar must be used within a SidebarProvider.");
	return e;
}
function Hf({ defaultOpen: e = !0, open: t, onOpenChange: n, className: r, style: i, children: a, ...o }) {
	let s = Ju(), [c, l] = C.useState(!1), [u, d] = C.useState(e), f = t ?? u, p = C.useCallback((e) => {
		let t = typeof e == "function" ? e(f) : e;
		n ? n(t) : d(t), document.cookie = `${Pf}=${t}; path=/; max-age=${Ff}`;
	}, [n, f]), m = C.useCallback(() => s ? l((e) => !e) : p((e) => !e), [
		s,
		p,
		l
	]);
	C.useEffect(() => {
		let e = (e) => {
			e.key === zf && (e.metaKey || e.ctrlKey) && (e.preventDefault(), m());
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [m]);
	let h = f ? "expanded" : "collapsed", g = C.useMemo(() => ({
		state: h,
		open: f,
		setOpen: p,
		isMobile: s,
		openMobile: c,
		setOpenMobile: l,
		toggleSidebar: m
	}), [
		h,
		f,
		p,
		s,
		c,
		l,
		m
	]);
	return /* @__PURE__ */ (0, K.jsx)(Bf.Provider, {
		value: g,
		children: /* @__PURE__ */ (0, K.jsx)(Af, {
			delayDuration: 0,
			children: /* @__PURE__ */ (0, K.jsx)("div", {
				"data-slot": "sidebar-wrapper",
				style: {
					"--sidebar-width": If,
					"--sidebar-width-icon": Rf,
					...i
				},
				className: $("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", r),
				...o,
				children: a
			})
		})
	});
}
function Uf({ side: e = "left", variant: t = "sidebar", collapsible: n = "offcanvas", className: r, children: i, ...a }) {
	let { isMobile: o, state: s, openMobile: c, setOpenMobile: l } = Vf();
	return n === "none" ? /* @__PURE__ */ (0, K.jsx)("div", {
		"data-slot": "sidebar",
		className: $("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", r),
		...a,
		children: i
	}) : o ? /* @__PURE__ */ (0, K.jsx)(Cf, {
		open: c,
		onOpenChange: l,
		...a,
		children: /* @__PURE__ */ (0, K.jsxs)(Ef, {
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": Lf },
			side: e,
			children: [/* @__PURE__ */ (0, K.jsxs)(Df, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, K.jsx)(Of, { children: "Sidebar" }), /* @__PURE__ */ (0, K.jsx)(kf, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ (0, K.jsx)("div", {
				className: "flex h-full w-full flex-col",
				children: i
			})]
		})
	}) : /* @__PURE__ */ (0, K.jsxs)("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": s,
		"data-collapsible": s === "collapsed" ? n : "",
		"data-variant": t,
		"data-side": e,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ (0, K.jsx)("div", {
			"data-slot": "sidebar-gap",
			className: $("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
		}), /* @__PURE__ */ (0, K.jsx)("div", {
			"data-slot": "sidebar-container",
			className: $("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", e === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", t === "floating" || t === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", r),
			...a,
			children: /* @__PURE__ */ (0, K.jsx)("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm",
				children: i
			})
		})]
	});
}
function Wf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: $("flex flex-col gap-2 p-2", e),
		...t
	});
}
function Gf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: $("flex flex-col gap-2 p-2", e),
		...t
	});
}
function Kf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: $("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", e),
		...t
	});
}
function qf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: $("flex w-full min-w-0 flex-col gap-1", e),
		...t
	});
}
function Jf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: $("group/menu-item relative", e),
		...t
	});
}
var Yf = ot("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Xf({ asChild: e = !1, isActive: t = !1, variant: n = "default", size: r = "default", tooltip: i, className: a, ...o }) {
	let s = e ? pt : "button", { isMobile: c, state: l } = Vf(), u = /* @__PURE__ */ (0, K.jsx)(s, {
		"data-slot": "sidebar-menu-button",
		"data-sidebar": "menu-button",
		"data-size": r,
		"data-active": t,
		className: $(Yf({
			variant: n,
			size: r
		}), a),
		...o
	});
	return i ? (typeof i == "string" && (i = { children: i }), /* @__PURE__ */ (0, K.jsxs)(jf, { children: [/* @__PURE__ */ (0, K.jsx)(Mf, {
		asChild: !0,
		children: u
	}), /* @__PURE__ */ (0, K.jsx)(Nf, {
		side: "right",
		align: "center",
		hidden: l !== "collapsed" || c,
		...i
	})] })) : u;
}
//#endregion
//#region components/ui/dialog.tsx
function Zf({ ...e }) {
	return /* @__PURE__ */ (0, K.jsx)($i, {
		"data-slot": "dialog",
		...e
	});
}
function Qf({ ...e }) {
	return /* @__PURE__ */ (0, K.jsx)(aa, {
		"data-slot": "dialog-portal",
		...e
	});
}
function $f({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)(sa, {
		"data-slot": "dialog-overlay",
		className: $("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", e),
		...t
	});
}
function ep({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ (0, K.jsxs)(Qf, {
		"data-slot": "dialog-portal",
		children: [/* @__PURE__ */ (0, K.jsx)($f, {}), /* @__PURE__ */ (0, K.jsxs)(da, {
			"data-slot": "dialog-content",
			className: $("fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg", e),
			...r,
			children: [t, n && /* @__PURE__ */ (0, K.jsxs)(ba, {
				"data-slot": "dialog-close",
				className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				children: [/* @__PURE__ */ (0, K.jsx)(Oe, {}), /* @__PURE__ */ (0, K.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		})]
	});
}
function tp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)("div", {
		"data-slot": "dialog-header",
		className: $("flex flex-col gap-2 text-center sm:text-left", e),
		...t
	});
}
function np({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)(ga, {
		"data-slot": "dialog-title",
		className: $("text-lg leading-none font-semibold", e),
		...t
	});
}
function rp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)(va, {
		"data-slot": "dialog-description",
		className: $("text-sm text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region components/ui/alert-dialog.tsx
function ip({ ...e }) {
	return /* @__PURE__ */ (0, K.jsx)(Ra, {
		"data-slot": "alert-dialog",
		...e
	});
}
function ap({ ...e }) {
	return /* @__PURE__ */ (0, K.jsx)(za, {
		"data-slot": "alert-dialog-portal",
		...e
	});
}
function op({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)(Ba, {
		"data-slot": "alert-dialog-overlay",
		className: $("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", e),
		...t
	});
}
function sp({ className: e, size: t = "default", ...n }) {
	return /* @__PURE__ */ (0, K.jsxs)(ap, { children: [/* @__PURE__ */ (0, K.jsx)(op, {}), /* @__PURE__ */ (0, K.jsx)(Va, {
		"data-slot": "alert-dialog-content",
		"data-size": t,
		className: $("group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg", e),
		...n
	})] });
}
function cp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)("div", {
		"data-slot": "alert-dialog-header",
		className: $("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", e),
		...t
	});
}
function lp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)("div", {
		"data-slot": "alert-dialog-footer",
		className: $("flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", e),
		...t
	});
}
function up({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)(Wa, {
		"data-slot": "alert-dialog-title",
		className: $("text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", e),
		...t
	});
}
function dp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)(Ga, {
		"data-slot": "alert-dialog-description",
		className: $("text-sm text-muted-foreground", e),
		...t
	});
}
function fp({ className: e, variant: t = "default", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, K.jsx)(Sf, {
		variant: t,
		size: n,
		asChild: !0,
		children: /* @__PURE__ */ (0, K.jsx)(Ha, {
			"data-slot": "alert-dialog-action",
			className: $(e),
			...r
		})
	});
}
function pp({ className: e, variant: t = "outline", size: n = "default", ...r }) {
	return /* @__PURE__ */ (0, K.jsx)(Sf, {
		variant: t,
		size: n,
		asChild: !0,
		children: /* @__PURE__ */ (0, K.jsx)(Ua, {
			"data-slot": "alert-dialog-cancel",
			className: $(e),
			...r
		})
	});
}
//#endregion
//#region components/ui/select.tsx
function mp({ ...e }) {
	return /* @__PURE__ */ (0, K.jsx)(vl, {
		"data-slot": "select",
		...e
	});
}
function hp({ ...e }) {
	return /* @__PURE__ */ (0, K.jsx)(Sl, {
		"data-slot": "select-value",
		...e
	});
}
function gp({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, K.jsxs)(bl, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: $("flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", e),
		...r,
		children: [n, /* @__PURE__ */ (0, K.jsx)(Cl, {
			asChild: !0,
			children: /* @__PURE__ */ (0, K.jsx)(ee, { className: "size-4 opacity-50" })
		})]
	});
}
function _p({ className: e, children: t, position: n = "item-aligned", align: r = "center", ...i }) {
	return /* @__PURE__ */ (0, K.jsx)(El, { children: /* @__PURE__ */ (0, K.jsxs)(Ol, {
		"data-slot": "select-content",
		className: $("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", e),
		position: n,
		align: r,
		...i,
		children: [
			/* @__PURE__ */ (0, K.jsx)(yp, {}),
			/* @__PURE__ */ (0, K.jsx)(zl, {
				className: $("p-1", n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
				children: t
			}),
			/* @__PURE__ */ (0, K.jsx)(bp, {})
		]
	}) });
}
function vp({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, K.jsxs)(Gl, {
		"data-slot": "select-item",
		className: $("relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, K.jsx)("span", {
			"data-slot": "select-item-indicator",
			className: "absolute right-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ (0, K.jsx)(Yl, { children: /* @__PURE__ */ (0, K.jsx)(A, { className: "size-4" }) })
		}), /* @__PURE__ */ (0, K.jsx)(ql, { children: t })]
	});
}
function yp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)(Zl, {
		"data-slot": "select-scroll-up-button",
		className: $("flex cursor-default items-center justify-center py-1", e),
		...t,
		children: /* @__PURE__ */ (0, K.jsx)(M, { className: "size-4" })
	});
}
function bp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)($l, {
		"data-slot": "select-scroll-down-button",
		className: $("flex cursor-default items-center justify-center py-1", e),
		...t,
		children: /* @__PURE__ */ (0, K.jsx)(ee, { className: "size-4" })
	});
}
//#endregion
//#region components/ui/checkbox.tsx
function xp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, K.jsx)(J, {
		"data-slot": "checkbox",
		className: $("peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary", e),
		...t,
		children: /* @__PURE__ */ (0, K.jsx)(oo, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none",
			children: /* @__PURE__ */ (0, K.jsx)(A, { className: "size-3.5" })
		})
	});
}
//#endregion
//#region lib/i18n.ts
var Sp = {
	en: {
		overview: "Overview",
		feedback: "Guest feedback",
		actions: "My improvements",
		device: "My device",
		title: "Small insights. Better experiences.",
		subtitle: "Listen to your guests. Choose what to improve next.",
		add: "Add feedback",
		analyze: "Find insights",
		analyzing: "Reading feedback on your device…",
		guests: "Guest comments",
		themes: "Themes found",
		needs: "Need your review",
		improvements: "Improvements",
		recommended: "Your next improvement",
		evidence: "See guest comments",
		plan: "Plan this improvement",
		saved: "Saved on this device",
		offline: "No connection",
		online: "Connected",
		ready: "Ready for offline use",
		download: "Prepare for offline use",
		all: "All feedback",
		positive: "What worked",
		improve: "Could be better",
		uncertain: "Ask a person",
		source: "Original guest words",
		synthetic: "Example feedback",
		lang: "Language",
		delete: "Delete",
		cancel: "Cancel",
		save: "Save feedback",
		text: "What did the guest say?",
		rating: "Guest rating",
		consent: "I have permission to use this feedback and have removed identifying details.",
		sourceLabel: "Where did it come from?",
		date: "Visit date",
		filter: "Filter feedback",
		empty: "No feedback yet",
		emptyHint: "Add your first guest comment to begin.",
		local: "Your feedback stays on this device.",
		await: "Read the evidence before deciding.",
		demo: "You’re exploring example feedback. These are fictional comments, not research results.",
		own: "Use my own feedback",
		export: "Export my data",
		import: "Restore backup",
		start: "Start improvement",
		complete: "Record outcome",
		planned: "Planned",
		active: "In progress",
		completed: "Completed",
		noActions: "Your next small change starts here.",
		details: "Evidence & decision",
		note: "Your plan",
		unknown: "Not enough information",
		correction: "Correct this finding",
		privacy: "Privacy & shared phones",
		newBusiness: "Business name",
		supported: "English feedback · Swahili action cards",
		heldout: "Evaluation",
		batch: "Paste several comments",
		install: "Install on your phone",
		actionHelp: "A suggestion to consider. You decide whether it fits your farm.",
		ask: "Needs a human review",
		statHint: "Distinct comments, with duplicates removed",
		deleteAll: "Delete all my data",
		time: "Your progress",
		review: "Review suggestion"
	},
	sw: {
		overview: "Muhtasari",
		feedback: "Maoni ya wageni",
		actions: "Maboresho yangu",
		device: "Kifaa changu",
		title: "Maoni madogo. Ziara bora.",
		subtitle: "Sikiliza wageni wako. Chagua cha kuboresha.",
		add: "Ongeza maoni",
		analyze: "Chambua maoni",
		analyzing: "Maoni yanachambuliwa kwenye kifaa chako…",
		guests: "Maoni ya wageni",
		themes: "Mada zilizopatikana",
		needs: "Yanahitaji ukaguzi wako",
		improvements: "Maboresho",
		recommended: "Uboreshaji unaofuata",
		evidence: "Angalia maoni ya wageni",
		plan: "Panga uboreshaji huu",
		saved: "Yamehifadhiwa kwenye kifaa hiki",
		offline: "Hakuna mtandao",
		online: "Mtandao upo",
		ready: "Tayari kutumika bila mtandao",
		download: "Andaa matumizi bila mtandao",
		all: "Maoni yote",
		positive: "Kilichofanya vizuri",
		improve: "Kinachoweza kuboreshwa",
		uncertain: "Muulize mtu",
		source: "Maneno halisi ya mgeni",
		synthetic: "Maoni ya mfano",
		lang: "Lugha",
		delete: "Futa",
		cancel: "Ghairi",
		save: "Hifadhi maoni",
		text: "Mgeni alisema nini?",
		rating: "Tathmini ya mgeni",
		consent: "Nina ruhusa ya kutumia maoni haya na nimeondoa taarifa zinazomtambulisha mgeni.",
		sourceLabel: "Maoni yalitoka wapi?",
		date: "Tarehe ya ziara",
		filter: "Chuja maoni",
		empty: "Bado hakuna maoni",
		emptyHint: "Ongeza maoni ya kwanza ya mgeni.",
		local: "Maoni yako yanabaki kwenye kifaa hiki.",
		await: "Soma maoni kabla ya kuamua.",
		demo: "Unaangalia maoni ya mfano. Maoni haya ni ya kubuni, si matokeo ya utafiti.",
		own: "Tumia maoni yangu",
		export: "Pakua taarifa zangu",
		import: "Rejesha nakala",
		start: "Anza uboreshaji",
		complete: "Rekodi matokeo",
		planned: "Umepangwa",
		active: "Unaendelea",
		completed: "Umekamilika",
		noActions: "Mabadiliko madogo yanayofuata yanaanza hapa.",
		details: "Maoni na uamuzi",
		note: "Mpango wako",
		unknown: "Taarifa hazitoshi",
		correction: "Sahihisha matokeo haya",
		privacy: "Faragha na simu zinazoshirikiwa",
		newBusiness: "Jina la biashara",
		supported: "Maoni ya Kiingereza · Mapendekezo ya Kiswahili",
		heldout: "Tathmini",
		batch: "Bandika maoni kadhaa",
		install: "Sakinisha kwenye simu",
		actionHelp: "Pendekezo la kuzingatia. Unaamua kama linafaa shamba lako.",
		ask: "Yanahitaji ukaguzi wa mtu",
		statHint: "Maoni tofauti; nakala zimeondolewa",
		deleteAll: "Futa taarifa zangu zote",
		time: "Maendeleo yako",
		review: "Kagua pendekezo"
	}
}, Cp = [
	{
		id: "participation",
		en: "Hands-on experiences",
		sw: "Shughuli za kushiriki",
		description: "Picking, roasting, grinding, tasting and making things yourself.",
		actionEn: "Try a 15-minute roast-and-grind activity",
		actionSw: "Jaribu shughuli ya dakika 15 ya kuchoma na kusaga kahawa",
		effort: "Low effort",
		color: "#1b7564",
		examples: {
			positive: [
				"Roasting and grinding our own coffee beans was the best part.",
				"We loved picking ripe coffee berries and doing something ourselves.",
				"The hands-on coffee tasting and making our own cup was wonderful.",
				"My children really enjoyed trying the equipment and joining the activity."
			],
			improve: [
				"I wish we could roast the beans ourselves instead of just watching.",
				"Please let visitors take part in picking, grinding or brewing the coffee.",
				"There was too much watching and not enough doing things with our hands.",
				"We wanted to participate in the coffee activity but could only look."
			]
		}
	},
	{
		id: "learning",
		en: "Stories & explanations",
		sw: "Hadithi na maelezo",
		description: "Understanding coffee, local history, language and the guide’s explanation.",
		actionEn: "Add a simple picture guide to the coffee story",
		actionSw: "Ongeza mwongozo wa picha kueleza hadithi ya kahawa",
		effort: "Low effort",
		color: "#4361c4",
		examples: {
			positive: [
				"The guide explained how coffee grows clearly and told fascinating local stories.",
				"We learned so much about the farm history and the coffee process.",
				"The explanations were easy to understand and the guide answered our questions.",
				"Noor told us about her family and the history of the village beautifully."
			],
			improve: [
				"It was hard to understand the explanations and we needed a translation.",
				"I wanted more information about coffee growing and local history.",
				"The guide spoke too quickly and the explanation was confusing.",
				"Pictures or a translated explanation would help us understand the story."
			]
		}
	},
	{
		id: "directions",
		en: "Finding the farm",
		sw: "Kufika shambani",
		description: "Directions, signs, arrival, transport and finding the entrance.",
		actionEn: "Share a landmark-based arrival card before visits",
		actionSw: "Shiriki maelekezo yenye alama za eneo kabla ya ziara",
		effort: "Low effort",
		color: "#b45e20",
		examples: {
			positive: [
				"Clear directions made it easy to find the farm entrance.",
				"The signs at the road junction helped us arrive without getting lost.",
				"Transport was straightforward and the guide met us at the gate.",
				"The location instructions and landmarks were very helpful."
			],
			improve: [
				"We got lost on the way and could not find the entrance.",
				"There were no signs at the road junction and the map sent us the wrong way.",
				"Better directions before the visit would help people find the farm.",
				"Our driver could not locate the gate and we arrived late."
			]
		}
	},
	{
		id: "comfort",
		en: "Comfort & accessibility",
		sw: "Faraja na ufikivu",
		description: "Shade, seats, toilets, drinking water and accessibility.",
		actionEn: "Add a shaded rest stop with drinking water",
		actionSw: "Ongeza sehemu ya kupumzika yenye kivuli na maji ya kunywa",
		effort: "Medium effort",
		color: "#8a4caf",
		examples: {
			positive: [
				"The shaded seats and clean toilets made the visit comfortable.",
				"We appreciated the drinking water and somewhere to rest.",
				"The path was accessible and my older mother could enjoy the visit.",
				"There was a comfortable place to sit out of the hot sun."
			],
			improve: [
				"It was very hot and there was nowhere to sit in the shade.",
				"We needed drinking water and a clean toilet during the tour.",
				"The steep uneven path was difficult for my elderly father to walk.",
				"Please add benches and a resting place for visitors."
			]
		}
	},
	{
		id: "pacing",
		en: "Timing & pace",
		sw: "Muda na mwendo",
		description: "Duration, waiting, start time and speed of the tour.",
		actionEn: "Offer a clearly timed tour with a short rest break",
		actionSw: "Toa ziara yenye muda wazi na mapumziko mafupi",
		effort: "Low effort",
		color: "#a33e55",
		examples: {
			positive: [
				"The tour started on time and the pace felt relaxed.",
				"A ninety-minute visit was just the right length for us.",
				"We had enough time at each stop without rushing.",
				"There was no waiting and everything followed the planned schedule."
			],
			improve: [
				"We waited too long for the tour to start.",
				"The visit felt rushed and we wanted more time at each stop.",
				"The tour lasted much longer than we expected and we missed our bus.",
				"Please tell guests how long the visit takes and start at the agreed time."
			]
		}
	},
	{
		id: "value",
		en: "Price & expectations",
		sw: "Bei na matarajio",
		description: "Price clarity, inclusions, payment and value for money.",
		actionEn: "Show one clear price and what it includes",
		actionSw: "Onyesha bei moja wazi na huduma zinazojumuishwa",
		effort: "Low effort",
		color: "#897016",
		examples: {
			positive: [
				"The price was clear and the visit was good value for money.",
				"The tasting was included and payment was easy.",
				"We knew exactly what was included in the ticket price.",
				"The experience was worth what we paid and there were no hidden fees."
			],
			improve: [
				"We did not know the price until we arrived and the tasting cost extra.",
				"The extra charges were a surprise and payment was confusing.",
				"Please explain what is included in the ticket before people book.",
				"The cost was higher than expected and we did not feel it was good value."
			]
		}
	}
], wp = {
	version: 1,
	language: "en",
	business: "Ondera Coffee Farm",
	reviews: [
		[
			"Roasting a handful of beans ourselves was the highlight. I would happily come back for a longer workshop.",
			5,
			"2026-09-29"
		],
		[
			"We loved the farm, but we got lost after the bridge. A photo of the turning would have saved us half an hour.",
			3,
			"2026-09-28"
		],
		[
			"Noor explained the journey from berry to cup so clearly. Her family story made the visit feel personal.",
			5,
			"2026-09-28"
		],
		[
			"I wish we had been allowed to use the grinder instead of only watching the demonstration.",
			4,
			"2026-09-27"
		],
		[
			"There was nowhere to rest out of the sun. My mother needed a seat and some water.",
			3,
			"2026-09-26"
		],
		[
			"Our children loved picking the ripe berries. Making their own cup at the end was a lovely touch.",
			5,
			"2026-09-25"
		],
		[
			"The ticket price was clear and included the tasting. Very good value for an afternoon.",
			5,
			"2026-09-24"
		],
		[
			"It was difficult to find the gate. The directions mentioned a shop that had closed.",
			3,
			"2026-09-23"
		],
		[
			"The guide spoke so fast that I could not follow the explanation. Pictures would have helped.",
			3,
			"2026-09-22"
		],
		[
			"Watching the beans being roasted was interesting. Next time I would love to try it myself.",
			4,
			"2026-09-21"
		],
		[
			"The tour started forty minutes late and we had to leave before the tasting.",
			2,
			"2026-09-20"
		],
		[
			"The village history and the explanation about the coffee harvest were fascinating.",
			5,
			"2026-09-19"
		],
		[
			"A hands-on roasting class would be worth a second trip. We wanted to get involved rather than just look.",
			4,
			"2026-09-18"
		],
		[
			"The shaded bench at the tasting area was welcome after the walk. Clean drinking water was available.",
			5,
			"2026-09-17"
		],
		[
			"We enjoyed the experience but a sign at the fork in the road would make arrival easier.",
			4,
			"2026-09-16"
		],
		[
			"The visit took nearly three hours although we had been told one hour. We missed our transport.",
			2,
			"2026-09-15"
		],
		[
			"Picking and sorting the berries ourselves helped us appreciate the work behind a cup of coffee.",
			5,
			"2026-09-14"
		],
		[
			"I was surprised to pay extra for the tasting. Please show all the costs before booking.",
			2,
			"2026-09-13"
		],
		[
			"The walk was a little steep for my father. A place to sit halfway would make it more accessible.",
			3,
			"2026-09-12"
		],
		[
			"A perfect slow morning. The guide left enough time for questions and never rushed us.",
			5,
			"2026-09-11"
		],
		[
			"The taxi driver struggled to find the entrance. Please send landmark directions in advance.",
			3,
			"2026-09-10"
		],
		[
			"Coffee is now my favourite subject. Noor answered every question about how the farm works.",
			5,
			"2026-09-09"
		],
		[
			"Could we have a little more practical time grinding and brewing? That would make a great workshop.",
			4,
			"2026-09-08"
		],
		[
			"Great.",
			4,
			"2026-09-07"
		]
	].map(([e, t, n], r) => ({
		id: `demo-${r + 1}`,
		text: String(e),
		rating: Number(t),
		date: String(n),
		source: "Scenario demonstration",
		synthetic: !0,
		consent: !0,
		language: "en"
	})),
	experiments: [],
	modelReady: !1,
	mode: "demo"
};
function Tp(e) {
	return e.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email removed]").replace(/(?:\+?\d[\d\s().-]{7,}\d)/g, "[phone removed]").trim().slice(0, 5e3);
}
function Ep(e) {
	let t = [], n = /[^.!?\n]+[.!?]?/g, r;
	for (; r = n.exec(e);) {
		let e = r[0], n = e.trim();
		if (n) {
			let i = e.indexOf(n);
			t.push({
				quote: n,
				start: r.index + i,
				end: r.index + i + n.length
			});
		}
	}
	return t.length ? t : [{
		quote: e,
		start: 0,
		end: e.length
	}];
}
function Dp(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter((e) => {
		let n = e.text.toLowerCase().replace(/\W/g, "");
		return e.excluded || t.has(n) ? !1 : (t.add(n), !0);
	});
}
function Op(e) {
	let t = Dp(e);
	return Cp.map((e) => {
		let n = t.flatMap((t) => (t.analysis ?? []).filter((t) => t.theme === e.id).map((e) => ({
			...e,
			review: t
		}))), r = new Set(n.map((e) => e.review.id)).size, i = new Set(n.filter((e) => e.tone === "improve").map((e) => e.review.id)).size, a = new Set(n.filter((e) => e.tone === "positive").map((e) => e.review.id)).size;
		return {
			...e,
			evidence: n,
			mentions: r,
			issues: i,
			praise: a,
			priority: i * 2 + r
		};
	}).sort((e, t) => t.priority - e.priority);
}
function kp(e, t) {
	let n = new Map(t.map((e) => [e.id, e]));
	return e.map((e) => {
		let t = n.get(e.id);
		return !t || t.text !== e.text ? e : {
			...e,
			analysis: t.analysis?.map((t) => {
				let n = e.analysis?.find((e) => e.corrected && e.start === t.start && e.end === t.end && e.quote === t.quote);
				return n ? {
					...t,
					theme: n.theme,
					tone: n.tone,
					corrected: !0
				} : t;
			})
		};
	});
}
function Ap(e) {
	if (!e || typeof e != "object") throw Error("This is not a Fieldnotes backup.");
	let t = e;
	if (t.version !== 1 || !Array.isArray(t.reviews) || t.reviews.length > 1e3) throw Error("Unsupported backup or too many comments.");
	let n = /* @__PURE__ */ new Set(), r = t.reviews.map((e) => {
		if (!e || typeof e.text != "string" || typeof e.id != "string" || e.text.length > 5e3 || e.consent !== !0 || n.has(e.id)) throw Error("Invalid, duplicate or non-consented feedback.");
		n.add(e.id);
		let t = Tp(e.text), r = Array.isArray(e.analysis) ? e.analysis.filter((e) => e && e.corrected === !0 && Number.isInteger(e.start) && Number.isInteger(e.end) && e.start >= 0 && e.end <= t.length && e.end > e.start && t.slice(e.start, e.end) === e.quote && (e.theme === null || Cp.some((t) => t.id === e.theme)) && [
			"positive",
			"improve",
			"uncertain"
		].includes(e.tone)).map((e) => ({
			...e,
			score: 0,
			margin: 0
		})) : void 0;
		return {
			id: e.id,
			text: t,
			date: typeof e.date == "string" && /^\d{4}-\d{2}-\d{2}$/.test(e.date) ? e.date : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			rating: Number.isInteger(e.rating) && e.rating >= 1 && e.rating <= 5 ? e.rating : null,
			source: typeof e.source == "string" ? Tp(e.source).slice(0, 100) : "Restored feedback",
			synthetic: e.synthetic === !0,
			consent: !0,
			language: [
				"en",
				"sw",
				"other"
			].includes(e.language) ? e.language : "other",
			analysis: r,
			excluded: e.excluded === !0
		};
	}), i = Array.isArray(t.experiments) ? t.experiments.filter((e) => e && typeof e.id == "string" && Cp.some((t) => t.id === e.theme) && [
		"planned",
		"active",
		"complete"
	].includes(e.status)).slice(0, 100).map((e) => ({
		...e,
		title: typeof e.title == "string" ? e.title.slice(0, 300) : "",
		note: typeof e.note == "string" ? Tp(e.note) : "",
		result: typeof e.result == "string" ? Tp(e.result) : void 0,
		createdAt: typeof e.createdAt == "string" ? e.createdAt : (/* @__PURE__ */ new Date()).toISOString(),
		baselineCount: Number.isFinite(e.baselineCount) ? Math.max(0, e.baselineCount) : 0,
		baselineIssues: Number.isFinite(e.baselineIssues) ? Math.max(0, e.baselineIssues) : 0
	})) : [];
	return {
		...wp,
		language: t.language === "sw" ? "sw" : "en",
		business: typeof t.business == "string" ? Tp(t.business).slice(0, 100) : wp.business,
		mode: t.mode === "demo" ? "demo" : "own",
		reviews: r,
		experiments: i,
		modelReady: !1
	};
}
var jp = {
	version: 1,
	kind: "tfidf-linear",
	license: "MIT",
	training: "72 authored synthetic scenario examples; no local user data used for training",
	classes: [
		"comfort",
		"directions",
		"learning",
		"other",
		"pacing",
		"participation",
		"value"
	],
	vocabulary: /* @__PURE__ */ JSON.parse("{\"roasting\":517,\"and\":17,\"grinding\":229,\"our\":436,\"own\":447,\"coffee\":100,\"beans\":56,\"was\":713,\"the\":578,\"best\":67,\"part\":456,\"roasting and\":518,\"and grinding\":23,\"grinding our\":231,\"our own\":440,\"own coffee\":448,\"coffee beans\":102,\"beans was\":58,\"was the\":731,\"the best\":583,\"best part\":68,\"we\":742,\"loved\":350,\"picking\":469,\"ripe\":511,\"berries\":65,\"doing\":139,\"something\":537,\"ourselves\":442,\"we loved\":752,\"loved picking\":351,\"picking ripe\":471,\"ripe coffee\":512,\"coffee berries\":103,\"berries and\":66,\"and doing\":21,\"doing something\":140,\"something ourselves\":538,\"hands\":245,\"on\":427,\"tasting\":566,\"making\":355,\"cup\":122,\"wonderful\":779,\"the hands\":599,\"hands on\":246,\"on coffee\":428,\"coffee tasting\":107,\"tasting and\":567,\"and making\":27,\"making our\":356,\"own cup\":449,\"cup was\":123,\"was wonderful\":734,\"my\":384,\"children\":88,\"really\":495,\"enjoyed\":158,\"trying\":674,\"equipment\":164,\"joining\":306,\"activity\":8,\"my children\":386,\"children really\":89,\"really enjoyed\":496,\"enjoyed trying\":159,\"trying the\":675,\"the equipment\":590,\"equipment and\":165,\"and joining\":24,\"joining the\":307,\"the activity\":579,\"wish\":771,\"could\":114,\"roast\":515,\"instead\":291,\"of\":422,\"just\":312,\"watching\":736,\"wish we\":772,\"we could\":745,\"could roast\":118,\"roast the\":516,\"the beans\":582,\"beans ourselves\":57,\"ourselves instead\":443,\"instead of\":292,\"of just\":423,\"just watching\":314,\"please\":481,\"let\":329,\"visitors\":703,\"take\":562,\"in\":281,\"or\":433,\"brewing\":72,\"please let\":484,\"let visitors\":330,\"visitors take\":704,\"take part\":563,\"part in\":457,\"in picking\":284,\"picking grinding\":470,\"grinding or\":230,\"or brewing\":434,\"brewing the\":73,\"the coffee\":586,\"there\":626,\"too\":659,\"much\":380,\"not\":410,\"enough\":160,\"things\":629,\"with\":773,\"there was\":627,\"was too\":732,\"too much\":661,\"much watching\":383,\"watching and\":737,\"and not\":29,\"not enough\":412,\"enough doing\":161,\"doing things\":141,\"things with\":630,\"with our\":775,\"our hands\":439,\"wanted\":710,\"to\":640,\"participate\":458,\"but\":75,\"only\":431,\"look\":345,\"we wanted\":758,\"wanted to\":712,\"to participate\":643,\"participate in\":459,\"in the\":285,\"coffee activity\":101,\"activity but\":9,\"but could\":76,\"could only\":117,\"only look\":432,\"guide\":238,\"explained\":177,\"how\":274,\"grows\":234,\"clearly\":98,\"told\":655,\"fascinating\":193,\"local\":331,\"stories\":555,\"the guide\":598,\"guide explained\":240,\"explained how\":178,\"how coffee\":275,\"coffee grows\":105,\"grows clearly\":235,\"clearly and\":99,\"and told\":36,\"told fascinating\":656,\"fascinating local\":194,\"local stories\":333,\"learned\":325,\"so\":535,\"about\":0,\"farm\":189,\"history\":266,\"process\":491,\"we learned\":751,\"learned so\":326,\"so much\":536,\"much about\":381,\"about the\":4,\"the farm\":595,\"farm history\":191,\"history and\":267,\"and the\":34,\"coffee process\":106,\"explanations\":182,\"were\":761,\"easy\":150,\"understand\":676,\"answered\":40,\"questions\":492,\"the explanations\":593,\"explanations were\":184,\"were easy\":762,\"easy to\":151,\"to understand\":649,\"understand and\":677,\"guide answered\":239,\"answered our\":41,\"our questions\":441,\"noor\":408,\"us\":684,\"her\":260,\"family\":187,\"village\":695,\"beautifully\":59,\"noor told\":409,\"told us\":657,\"us about\":685,\"about her\":3,\"her family\":261,\"family and\":188,\"the history\":600,\"history of\":268,\"of the\":424,\"the village\":621,\"village beautifully\":696,\"it\":303,\"hard\":248,\"needed\":396,\"translation\":671,\"it was\":305,\"was hard\":724,\"hard to\":249,\"understand the\":678,\"explanations and\":183,\"and we\":37,\"we needed\":754,\"needed translation\":398,\"more\":375,\"information\":289,\"growing\":232,\"wanted more\":711,\"more information\":376,\"information about\":290,\"about coffee\":1,\"coffee growing\":104,\"growing and\":233,\"and local\":26,\"local history\":332,\"spoke\":541,\"quickly\":493,\"explanation\":179,\"confusing\":110,\"guide spoke\":242,\"spoke too\":542,\"too quickly\":662,\"quickly and\":494,\"the explanation\":592,\"explanation was\":180,\"was confusing\":719,\"pictures\":472,\"translated\":669,\"would\":783,\"help\":254,\"story\":556,\"pictures or\":473,\"or translated\":435,\"translated explanation\":670,\"explanation would\":181,\"would help\":784,\"help us\":256,\"us understand\":689,\"the story\":617,\"clear\":95,\"directions\":132,\"made\":352,\"find\":203,\"entrance\":163,\"clear directions\":97,\"directions made\":134,\"made it\":353,\"it easy\":304,\"to find\":641,\"find the\":204,\"farm entrance\":190,\"signs\":530,\"at\":49,\"road\":513,\"junction\":309,\"helped\":257,\"arrive\":44,\"without\":776,\"getting\":220,\"lost\":346,\"the signs\":615,\"signs at\":531,\"at the\":51,\"the road\":612,\"road junction\":514,\"junction helped\":311,\"helped us\":258,\"us arrive\":686,\"arrive without\":45,\"without getting\":777,\"getting lost\":221,\"transport\":672,\"straightforward\":557,\"met\":366,\"gate\":218,\"transport was\":673,\"was straightforward\":730,\"straightforward and\":558,\"guide met\":241,\"met us\":367,\"us at\":687,\"the gate\":597,\"location\":336,\"instructions\":293,\"landmarks\":319,\"very\":692,\"helpful\":259,\"the location\":603,\"location instructions\":337,\"instructions and\":294,\"and landmarks\":25,\"landmarks were\":320,\"were very\":765,\"very helpful\":693,\"got\":226,\"way\":740,\"we got\":748,\"got lost\":227,\"lost on\":347,\"on the\":429,\"the way\":623,\"way and\":741,\"and could\":19,\"could not\":116,\"not find\":414,\"the entrance\":589,\"no\":404,\"map\":357,\"sent\":525,\"wrong\":785,\"there were\":628,\"were no\":763,\"no signs\":406,\"junction and\":310,\"the map\":604,\"map sent\":358,\"sent us\":526,\"us the\":688,\"the wrong\":625,\"wrong way\":786,\"better\":69,\"before\":60,\"visit\":697,\"people\":466,\"better directions\":70,\"directions before\":133,\"before the\":62,\"the visit\":622,\"visit would\":702,\"help people\":255,\"people find\":468,\"driver\":144,\"locate\":334,\"arrived\":46,\"late\":324,\"our driver\":438,\"driver could\":145,\"not locate\":416,\"locate the\":335,\"gate and\":219,\"we arrived\":744,\"arrived late\":48,\"shaded\":528,\"seats\":523,\"clean\":92,\"toilets\":653,\"comfortable\":108,\"the shaded\":614,\"shaded seats\":529,\"seats and\":524,\"and clean\":18,\"clean toilets\":94,\"toilets made\":654,\"made the\":354,\"visit comfortable\":698,\"appreciated\":42,\"drinking\":142,\"water\":738,\"somewhere\":539,\"rest\":504,\"we appreciated\":743,\"appreciated the\":43,\"the drinking\":588,\"drinking water\":143,\"water and\":739,\"and somewhere\":32,\"somewhere to\":540,\"to rest\":645,\"path\":461,\"accessible\":5,\"older\":425,\"mother\":378,\"enjoy\":156,\"the path\":606,\"path was\":462,\"was accessible\":714,\"accessible and\":6,\"and my\":28,\"my older\":393,\"older mother\":426,\"mother could\":379,\"could enjoy\":115,\"enjoy the\":157,\"place\":476,\"sit\":532,\"out\":444,\"hot\":269,\"sun\":559,\"was comfortable\":718,\"comfortable place\":109,\"place to\":478,\"to sit\":646,\"sit out\":534,\"out of\":445,\"the hot\":601,\"hot sun\":271,\"nowhere\":420,\"shade\":527,\"was very\":733,\"very hot\":694,\"hot and\":270,\"and there\":35,\"was nowhere\":729,\"nowhere to\":421,\"sit in\":533,\"the shade\":613,\"toilet\":651,\"during\":146,\"tour\":663,\"needed drinking\":397,\"clean toilet\":93,\"toilet during\":652,\"during the\":147,\"the tour\":620,\"steep\":549,\"uneven\":679,\"difficult\":130,\"for\":211,\"elderly\":152,\"father\":195,\"walk\":709,\"the steep\":616,\"steep uneven\":550,\"uneven path\":680,\"was difficult\":720,\"difficult for\":131,\"for my\":214,\"my elderly\":388,\"elderly father\":153,\"father to\":196,\"to walk\":650,\"add\":10,\"benches\":63,\"resting\":507,\"please add\":482,\"add benches\":11,\"benches and\":64,\"and resting\":31,\"resting place\":508,\"place for\":477,\"for visitors\":217,\"started\":545,\"time\":637,\"pace\":450,\"felt\":200,\"relaxed\":498,\"tour started\":665,\"started on\":546,\"on time\":430,\"time and\":638,\"the pace\":605,\"pace felt\":451,\"felt relaxed\":201,\"ninety\":402,\"minute\":368,\"right\":509,\"length\":327,\"ninety minute\":403,\"minute visit\":369,\"visit was\":701,\"was just\":727,\"just the\":313,\"the right\":611,\"right length\":510,\"length for\":328,\"for us\":216,\"had\":243,\"each\":148,\"stop\":551,\"rushing\":521,\"we had\":749,\"had enough\":244,\"enough time\":162,\"time at\":639,\"at each\":50,\"each stop\":149,\"stop without\":552,\"without rushing\":778,\"waiting\":707,\"everything\":166,\"followed\":207,\"planned\":479,\"schedule\":522,\"was no\":728,\"no waiting\":407,\"waiting and\":708,\"and everything\":22,\"everything followed\":167,\"followed the\":208,\"the planned\":608,\"planned schedule\":480,\"waited\":705,\"long\":340,\"start\":543,\"we waited\":757,\"waited too\":706,\"too long\":660,\"long for\":341,\"for the\":215,\"tour to\":666,\"to start\":647,\"rushed\":519,\"visit felt\":699,\"felt rushed\":202,\"rushed and\":520,\"more time\":377,\"lasted\":322,\"longer\":343,\"than\":573,\"expected\":171,\"missed\":370,\"bus\":74,\"tour lasted\":664,\"lasted much\":323,\"much longer\":382,\"longer than\":344,\"than we\":575,\"we expected\":747,\"expected and\":172,\"we missed\":753,\"missed our\":371,\"our bus\":437,\"tell\":570,\"guests\":236,\"takes\":564,\"agreed\":13,\"please tell\":485,\"tell guests\":571,\"guests how\":237,\"how long\":277,\"long the\":342,\"visit takes\":700,\"takes and\":565,\"and start\":33,\"start at\":544,\"the agreed\":580,\"agreed time\":14,\"price\":486,\"good\":224,\"value\":690,\"money\":373,\"the price\":609,\"price was\":488,\"was clear\":717,\"clear and\":96,\"was good\":723,\"good value\":225,\"value for\":691,\"for money\":213,\"included\":286,\"payment\":463,\"the tasting\":618,\"tasting was\":569,\"was included\":726,\"included and\":287,\"and payment\":30,\"payment was\":465,\"was easy\":721,\"knew\":315,\"exactly\":168,\"what\":766,\"ticket\":634,\"we knew\":750,\"knew exactly\":316,\"exactly what\":169,\"what was\":769,\"included in\":288,\"the ticket\":619,\"ticket price\":636,\"experience\":173,\"worth\":781,\"paid\":452,\"hidden\":262,\"fees\":199,\"the experience\":591,\"experience was\":174,\"was worth\":735,\"worth what\":782,\"what we\":770,\"we paid\":755,\"paid and\":453,\"no hidden\":405,\"hidden fees\":263,\"did\":128,\"know\":317,\"until\":682,\"cost\":111,\"extra\":185,\"we did\":746,\"did not\":129,\"not know\":415,\"know the\":318,\"price until\":487,\"until we\":683,\"arrived and\":47,\"tasting cost\":568,\"cost extra\":112,\"charges\":86,\"surprise\":560,\"the extra\":594,\"extra charges\":186,\"charges were\":87,\"were surprise\":764,\"surprise and\":561,\"explain\":175,\"is\":297,\"book\":71,\"please explain\":483,\"explain what\":176,\"what is\":768,\"is included\":298,\"ticket before\":635,\"before people\":61,\"people book\":467,\"higher\":264,\"feel\":197,\"the cost\":587,\"cost was\":113,\"was higher\":725,\"higher than\":265,\"than expected\":574,\"not feel\":413,\"feel it\":198,\"great\":228,\"nice\":401,\"am\":15,\"unsure\":681,\"am unsure\":16,\"thanks\":576,\"thanks for\":577,\"for everything\":212,\"weather\":759,\"tomorrow\":658,\"is the\":302,\"the weather\":624,\"weather tomorrow\":760,\"transfer\":667,\"this\":631,\"account\":7,\"transfer money\":668,\"money to\":374,\"to this\":648,\"this account\":632,\"ignore\":278,\"delete\":124,\"records\":497,\"ignore the\":279,\"the instructions\":602,\"and delete\":20,\"delete the\":125,\"the records\":610,\"buy\":77,\"cryptocurrency\":120,\"now\":419,\"buy cryptocurrency\":78,\"cryptocurrency now\":121,\"can\":79,\"you\":787,\"give\":222,\"me\":361,\"medical\":364,\"advice\":12,\"can you\":80,\"you give\":788,\"give me\":223,\"me medical\":363,\"medical advice\":365,\"need\":394,\"doctor\":137,\"illness\":280,\"need doctor\":395,\"doctor for\":138,\"my illness\":391,\"football\":209,\"match\":359,\"excellent\":170,\"the football\":596,\"football match\":210,\"match was\":360,\"was excellent\":722,\"have\":252,\"problem\":489,\"bank\":53,\"have problem\":253,\"problem with\":490,\"with my\":774,\"my bank\":385,\"love\":348,\"new\":399,\"laptop\":321,\"love my\":349,\"my new\":392,\"new laptop\":400,\"flight\":205,\"london\":338,\"cancelled\":81,\"my flight\":390,\"flight to\":206,\"to london\":642,\"london was\":339,\"was cancelled\":716,\"battery\":54,\"has\":250,\"stopped\":553,\"working\":780,\"the battery\":581,\"battery has\":55,\"has stopped\":251,\"stopped working\":554,\"do\":135,\"reset\":502,\"email\":154,\"password\":460,\"how do\":276,\"do reset\":136,\"reset my\":503,\"my email\":389,\"email password\":155,\"joke\":308,\"tell me\":572,\"me joke\":362,\"cannot\":82,\"remember\":499,\"happened\":247,\"cannot remember\":83,\"remember what\":500,\"what happened\":767,\"nothing\":417,\"report\":501,\"nothing to\":418,\"to report\":644,\"car\":84,\"insurance\":295,\"overdue\":446,\"the car\":584,\"car insurance\":85,\"insurance payment\":296,\"payment is\":464,\"is overdue\":301,\"stayed\":547,\"hotel\":272,\"another\":38,\"country\":119,\"we stayed\":756,\"stayed in\":548,\"in hotel\":283,\"hotel in\":273,\"in another\":282,\"another country\":39,\"pizza\":474,\"restaurant\":505,\"city\":90,\"awful\":52,\"the pizza\":607,\"pizza restaurant\":475,\"restaurant in\":506,\"the city\":585,\"city was\":91,\"was awful\":715,\"delivery\":126,\"parcel\":454,\"missing\":372,\"my delivery\":387,\"delivery parcel\":127,\"parcel is\":455,\"is missing\":299,\"this is\":633,\"is not\":300,\"not about\":411,\"about farm\":2,\"farm visit\":192}"),
	idf: [
		3.681022,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		1.706941,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		2.987874,
		4.191847,
		4.597312,
		3.4987,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		3.344549,
		4.191847,
		3.681022,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.093235,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.191847,
		4.191847,
		4.597312,
		4.597312,
		3.4987,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.191847,
		3.904165,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		3.681022,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		3.904165,
		3.904165,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.211018,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.681022,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.904165,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.904165,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.211018,
		4.597312,
		4.597312,
		4.597312,
		3.4987,
		3.904165,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.191847,
		4.597312,
		4.597312,
		3.4987,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.681022,
		4.597312,
		3.904165,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.904165,
		4.597312,
		4.597312,
		4.597312,
		2.987874,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.904165,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.344549,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.904165,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		3.904165,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		3.344549,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.191847,
		3.904165,
		4.597312,
		4.191847,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.681022,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.904165,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.191847,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.904165,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		1.378436,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.904165,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		3.904165,
		4.597312,
		4.191847,
		3.681022,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.191847,
		3.681022,
		4.597312,
		3.344549,
		4.597312,
		4.597312,
		4.597312,
		3.344549,
		3.681022,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		3.681022,
		4.597312,
		4.191847,
		2.72551,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		3.904165,
		4.597312,
		4.597312,
		4.597312,
		3.681022,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.904165,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.344549,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.093235,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		3.904165,
		4.191847,
		4.597312,
		2.199417,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.191847,
		4.191847,
		4.191847,
		4.597312,
		2.34602,
		4.597312,
		4.191847,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		3.4987,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		3.4987,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.597312,
		4.191847,
		4.191847,
		4.597312,
		4.597312,
		4.597312,
		4.597312
	],
	weights: [
		[
			-.249559,
			-.086255,
			-.064214,
			-.08481,
			-.0764,
			.632394,
			.632394,
			-.080909,
			-.182458,
			-.097856,
			.767847,
			.767847,
			-.058691,
			-.089974,
			-.089974,
			-.118197,
			-.118197,
			.486736,
			1.165808,
			-.077437,
			-.075939,
			-.084594,
			-.13818,
			-.079564,
			-.102251,
			-.125878,
			-.086255,
			-.079843,
			.632394,
			-.094283,
			-.182583,
			.767847,
			.657333,
			-.089974,
			-.493424,
			.475475,
			-.075248,
			-.363609,
			-.065977,
			-.065977,
			-.072291,
			-.072291,
			.657333,
			.657333,
			-.067347,
			-.067347,
			-.140748,
			-.064912,
			-.08945,
			-.334185,
			-.140833,
			-.244134,
			-.078498,
			-.071985,
			-.076244,
			-.076244,
			-.157636,
			-.093319,
			-.079564,
			-.08481,
			-.166621,
			-.088265,
			-.094472,
			.767847,
			.767847,
			-.084594,
			-.084594,
			-.079564,
			-.079564,
			-.094472,
			-.094472,
			-.088265,
			-.08884,
			-.08884,
			-.088056,
			-.097856,
			-.097856,
			-.091555,
			-.091555,
			-.058691,
			-.058691,
			-.091844,
			-.07521,
			-.07521,
			-.062662,
			-.062662,
			-.099437,
			-.099437,
			-.102251,
			-.102251,
			-.078498,
			-.078498,
			1.165808,
			.620569,
			.658004,
			-.200948,
			-.117116,
			-.10327,
			-.075248,
			-.075248,
			-.449858,
			-.097856,
			-.079564,
			-.084594,
			-.086255,
			-.075248,
			-.0764,
			-.079843,
			1.100008,
			.548405,
			-.177407,
			-.129164,
			-.064912,
			-.076745,
			.208774,
			.632394,
			-.152169,
			-.097856,
			-.093319,
			-.065977,
			-.091555,
			-.091555,
			-.079843,
			-.079843,
			-.075939,
			-.075939,
			-.065663,
			-.065663,
			-.129164,
			-.129164,
			.596068,
			.596068,
			-.180302,
			-.094472,
			-.10327,
			-.064707,
			-.064707,
			-.100691,
			-.100691,
			-.163101,
			-.084594,
			-.094283,
			1.165196,
			1.165196,
			-.08945,
			-.08945,
			.620569,
			.620569,
			-.140833,
			-.140833,
			-.234698,
			-.160076,
			.596068,
			.596068,
			-.064707,
			-.064707,
			.632394,
			.632394,
			-.102251,
			-.102251,
			-.156564,
			-.094283,
			-.077425,
			-.164769,
			-.102251,
			-.102251,
			-.232392,
			-.13818,
			-.079789,
			-.079789,
			-.090631,
			-.150266,
			-.150266,
			-.102392,
			-.102392,
			-.088265,
			-.088265,
			-.075248,
			-.075248,
			-.160471,
			-.095129,
			-.080864,
			-.199497,
			-.146503,
			-.072291,
			-.149854,
			-.099437,
			-.08481,
			-.08481,
			-.270918,
			-.10327,
			-.0764,
			-.064214,
			-.075248,
			-.075248,
			.596068,
			.596068,
			-.076745,
			-.076745,
			-.102392,
			-.162301,
			-.10097,
			-.07703,
			-.23369,
			-.23369,
			-.091844,
			-.091844,
			-.13818,
			-.13818,
			-.090631,
			-.090631,
			.544251,
			-.116691,
			-.117116,
			.451687,
			-.131401,
			-.118796,
			.767847,
			-.159664,
			-.08945,
			-.067347,
			-.067347,
			-.058691,
			-.058691,
			-.176763,
			-.176763,
			-.077437,
			-.077437,
			-.204723,
			-.153552,
			-.08884,
			-.079564,
			-.086255,
			-.086255,
			-.075248,
			-.075248,
			-.089974,
			-.089974,
			-.262887,
			-.072291,
			-.075248,
			-.085657,
			-.095129,
			-.077425,
			-.077425,
			-.158768,
			-.079843,
			-.07521,
			-.146503,
			-.146503,
			-.076244,
			-.076244,
			-.071985,
			-.071985,
			-.159872,
			-.094472,
			-.080864,
			-.067347,
			-.067347,
			-.125878,
			-.08481,
			-.08481,
			-.102392,
			-.102392,
			-.076745,
			-.076745,
			-.210154,
			-.0764,
			-.08481,
			1.068874,
			.623858,
			.548405,
			-.065977,
			-.065977,
			-.195263,
			-.075248,
			-.064707,
			-.089974,
			-.075939,
			-.075939,
			-.100691,
			.055108,
			-.065977,
			-.065977,
			-.08884,
			.21267,
			-.228324,
			-.100806,
			-.153233,
			-.086255,
			-.086255,
			-.093319,
			-.093319,
			-.184018,
			-.184018,
			-.062662,
			-.062662,
			-.265765,
			-.088265,
			-.065663,
			-.064214,
			-.062662,
			-.068412,
			.238078,
			-.10327,
			.340209,
			-.102251,
			-.102251,
			-.088345,
			-.117872,
			-.061926,
			-.067347,
			-.193408,
			-.118796,
			-.093319,
			-.079789,
			-.079789,
			-.064912,
			-.064912,
			-.125878,
			-.125878,
			-.083007,
			-.088056,
			-.088056,
			-.08945,
			-.0764,
			-.0764,
			-.118796,
			-.118796,
			-.08884,
			-.08884,
			-.14726,
			-.086255,
			-.075248,
			-.08945,
			-.08945,
			-.125878,
			-.125878,
			-.091844,
			-.091844,
			-.20185,
			-.131401,
			-.089974,
			-.088056,
			-.088056,
			-.097856,
			-.132015,
			-.077437,
			-.083007,
			-.083007,
			-.084594,
			-.084594,
			.505809,
			-.10327,
			.658004,
			-.079843,
			-.079843,
			-.061926,
			-.061926,
			-.090631,
			-.090631,
			-.134068,
			-.088345,
			-.058691,
			-.058691,
			-.058691,
			-.085657,
			-.085657,
			-.118796,
			-.118796,
			-.088056,
			-.088056,
			-.065663,
			-.18056,
			-.080909,
			-.148884,
			-.086255,
			-.07703,
			.632394,
			.632394,
			-.219727,
			-.0764,
			-.088056,
			-.094283,
			.421351,
			-.071985,
			-.102251,
			-.065663,
			.596068,
			-.064707,
			-.091844,
			-.100691,
			-.083007,
			.632394,
			-.100691,
			-.100691,
			.432256,
			.620569,
			-.146503,
			-.083007,
			-.083007,
			-.204723,
			-.118796,
			-.118796,
			-.256889,
			-.102392,
			-.061926,
			-.13818,
			-.08481,
			-.08481,
			-.339774,
			-.064214,
			-.094283,
			-.076745,
			-.077437,
			-.064912,
			-.08945,
			-.126057,
			-.126057,
			-.091555,
			.623858,
			.623858,
			.314448,
			-.093319,
			.422708,
			.632394,
			.632394,
			-.219312,
			-.079843,
			-.077437,
			-.10097,
			-.097856,
			-.097856,
			-.154737,
			-.08884,
			-.080864,
			-.366287,
			-.088056,
			-.08945,
			-.094283,
			-.145348,
			-.072291,
			-.162222,
			-.093319,
			.548405,
			.548405,
			-.062662,
			-.145348,
			-.079564,
			-.079843,
			-.10097,
			-.10097,
			-.102392,
			-.102392,
			-.065663,
			-.065663,
			-.153552,
			-.08884,
			-.097856,
			-.097856,
			-.064707,
			1.120116,
			1.120116,
			-.223267,
			-.062662,
			-.182583,
			-.166621,
			-.088265,
			-.094472,
			-.158138,
			-.08884,
			-.084594,
			-.080864,
			-.080864,
			-.078498,
			-.078498,
			1.200163,
			.767847,
			.548405,
			-.13818,
			-.13818,
			.400959,
			.767847,
			-.088265,
			-.08884,
			-.089974,
			-.222342,
			-.064912,
			-.117116,
			-.071985,
			-.071985,
			-.0764,
			-.072291,
			-.095129,
			-.095129,
			-.102251,
			-.102251,
			-.075939,
			-.10097,
			-.07521,
			-.07521,
			-.126057,
			-.064707,
			-.064707,
			.657333,
			-.078498,
			-.078498,
			.767847,
			.767847,
			-.118796,
			-.118796,
			-.084594,
			-.084594,
			-.117872,
			-.117872,
			-.093319,
			-.093319,
			-.079564,
			-.079564,
			-.07703,
			-.07703,
			-.077425,
			-.13818,
			.658004,
			.658004,
			-.061926,
			-.061926,
			.623858,
			.658004,
			.658004,
			-.117872,
			-.117872,
			1.068874,
			.623858,
			.548405,
			-.0764,
			-.0764,
			-.084594,
			-.084594,
			.657333,
			.657333,
			-.095129,
			-.095129,
			-.20185,
			-.089974,
			-.10097,
			-.10097,
			-.065977,
			-.065977,
			.596068,
			.596068,
			-.140833,
			-.077425,
			-.076244,
			-.076244,
			-.075248,
			-.080864,
			-.085657,
			-.085657,
			.548405,
			-.099437,
			-.099437,
			-.08884,
			-.08884,
			-.089974,
			-.089974,
			-.208537,
			-.079843,
			-.064912,
			-.100806,
			-.162592,
			-.089974,
			-.088345,
			-.150266,
			-.076745,
			-.088056,
			-.116691,
			-.116691,
			.140615,
			-.102251,
			-.089974,
			-.076244,
			-.093319,
			-.079564,
			-.062662,
			-.078498,
			-.223428,
			-.076745,
			.657333,
			-.077437,
			-.102251,
			-.102392,
			-.095129,
			-.199497,
			-.099437,
			-.232809,
			-.090631,
			-.159664,
			-.262887,
			-.079843,
			-.08481,
			.548405,
			-.075939,
			-.125878,
			-.061926,
			-.10097,
			.632394,
			-.078498,
			-.13818,
			-.165974,
			-.075939,
			-.118796,
			-.117872,
			.623858,
			.658004,
			-.067347,
			.596068,
			-.080864,
			-.151103,
			-.153233,
			.240322,
			-.08481,
			.663339,
			-.077437,
			-.068412,
			-.061926,
			.564165,
			.752489,
			-.149826,
			-.094283,
			-.094283,
			-.132324,
			-.080909,
			-.064214,
			-.153233,
			-.088265,
			-.079789,
			-.276557,
			-.10097,
			-.140833,
			.934054,
			-.10327,
			-.091844,
			-.097856,
			-.126057,
			.657333,
			1.068874,
			-.131401,
			-.080909,
			-.199497,
			.596068,
			.620569,
			.620569,
			.658004,
			.658004,
			-.145942,
			-.075248,
			-.08481,
			-.068412,
			-.272443,
			-.131401,
			-.094283,
			-.095129,
			.240322,
			-.088056,
			-.10097,
			-.131401,
			-.080909,
			-.080909,
			-.080864,
			-.080864,
			-.146503,
			-.085657,
			-.085657,
			-.102251,
			-.102251,
			-.254477,
			-.072291,
			-.207314,
			.596068,
			.596068,
			-.118197,
			-.064912,
			-.064912,
			-.363314,
			-.08481,
			-.067347,
			-.085657,
			-.061926,
			-.080864,
			-.176763,
			-.117116,
			.45406,
			-.125878,
			.623858,
			-.08481,
			-.08481,
			.490359,
			.658004,
			-.07703,
			-.089974,
			-.215106,
			-.094472,
			.619121,
			-.08884,
			-.131401,
			-.131401,
			-.13818,
			-.13818,
			.596068,
			-.221768,
			-.148884,
			-.097856,
			.456258,
			.632394,
			-.078498,
			-.091844,
			-.117116,
			.548405,
			-.177407,
			.596068,
			-.100806,
			-.090631,
			-.176763,
			-.146503,
			-.076745,
			-.164668,
			-.118796,
			-.13818,
			.623858,
			-.085657,
			-.079564,
			-.094283,
			.623858,
			-.079843,
			-.102392,
			-.171056,
			-.094283,
			1.165196,
			1.165196,
			-.127072,
			-.077437,
			-.131359,
			.657333,
			-.140748,
			-.093319,
			-.129164,
			-.088056,
			-.077437,
			-.077425,
			-.079789,
			-.0764,
			-.084594,
			-.088056,
			.432256,
			-.102392,
			-.065977,
			-.131401,
			-.159462,
			-.068412,
			-.068412,
			-.351539,
			-.072291,
			-.149826,
			-.099437,
			-.125878,
			-.315119,
			-.07521,
			-.142859,
			-.079789,
			-.102392,
			-.093319,
			-.093319,
			-.151603,
			-.071985,
			-.094283,
			-.132004,
			-.067347,
			-.077425,
			-.079843,
			-.076244,
			-.102392,
			-.102392,
			-.159872,
			-.159872,
			-.061926,
			-.061926,
			-.058691,
			-.058691
		],
		[
			-.297969,
			-.080283,
			-.086911,
			-.089843,
			-.115102,
			-.098933,
			-.098933,
			-.064279,
			-.159824,
			-.082185,
			-.097154,
			-.097154,
			-.05638,
			-.101771,
			-.101771,
			-.113481,
			-.113481,
			.114327,
			-.175584,
			.523963,
			-.111776,
			-.079897,
			-.105937,
			-.075876,
			-.093099,
			.819811,
			-.080283,
			-.081623,
			-.098933,
			-.080344,
			-.174924,
			-.097154,
			-.095008,
			-.101771,
			.257063,
			-.177819,
			-.084253,
			.254182,
			-.055696,
			-.055696,
			-.125777,
			-.125777,
			-.095008,
			-.095008,
			.49823,
			.49823,
			.519203,
			-.094919,
			.664343,
			.978559,
			-.163771,
			1.220819,
			-.060666,
			-.059516,
			-.076969,
			-.076969,
			-.152729,
			-.091626,
			-.075876,
			-.089843,
			.48829,
			-.087373,
			.622894,
			-.097154,
			-.097154,
			-.079897,
			-.079897,
			-.075876,
			-.075876,
			.622894,
			.622894,
			-.087373,
			-.068368,
			-.068368,
			-.084991,
			-.082185,
			-.082185,
			-.087902,
			-.087902,
			-.05638,
			-.05638,
			-.055362,
			-.072282,
			-.072282,
			-.063017,
			-.063017,
			-.102098,
			-.102098,
			-.093099,
			-.093099,
			-.060666,
			-.060666,
			-.175584,
			-.079712,
			-.112856,
			.484778,
			-.093168,
			.624838,
			-.084253,
			-.084253,
			-.449176,
			-.082185,
			-.075876,
			-.079897,
			-.080283,
			-.084253,
			-.115102,
			-.081623,
			-.168258,
			-.071677,
			-.19545,
			-.152826,
			-.094919,
			-.07269,
			.696772,
			-.098933,
			1.083502,
			-.082185,
			-.091626,
			-.055696,
			-.087902,
			-.087902,
			-.081623,
			-.081623,
			-.111776,
			-.111776,
			-.053939,
			-.053939,
			-.152826,
			-.152826,
			-.071952,
			-.071952,
			1.137687,
			.622894,
			.624838,
			-.054038,
			-.054038,
			-.057624,
			-.057624,
			-.146108,
			-.079897,
			-.080344,
			-.159311,
			-.159311,
			.664343,
			.664343,
			-.079712,
			-.079712,
			-.163771,
			-.163771,
			.347602,
			.455046,
			-.071952,
			-.071952,
			-.054038,
			-.054038,
			-.098933,
			-.098933,
			-.093099,
			-.093099,
			-.161325,
			-.080344,
			-.096586,
			1.047481,
			-.093099,
			-.093099,
			-.175354,
			-.105937,
			-.063514,
			-.063514,
			-.078664,
			-.143774,
			-.143774,
			-.108684,
			-.108684,
			-.087373,
			-.087373,
			-.084253,
			-.084253,
			-.219611,
			-.112257,
			-.128596,
			-.196417,
			-.089639,
			-.125777,
			-.179641,
			-.102098,
			-.089843,
			-.089843,
			.837296,
			.624838,
			-.115102,
			-.086911,
			-.084253,
			-.084253,
			-.071952,
			-.071952,
			-.07269,
			-.07269,
			-.108684,
			-.168391,
			-.101652,
			-.083027,
			1.504573,
			1.504573,
			-.055362,
			-.055362,
			-.105937,
			-.105937,
			-.078664,
			-.078664,
			-.417097,
			-.086379,
			-.093168,
			-.118148,
			-.084133,
			-.106761,
			-.097154,
			1.218026,
			.664343,
			.49823,
			.49823,
			-.05638,
			-.05638,
			-.15123,
			-.15123,
			.523963,
			.523963,
			-.196554,
			-.131521,
			-.068368,
			-.075876,
			-.080283,
			-.080283,
			-.084253,
			-.084253,
			-.101771,
			-.101771,
			.279611,
			-.125777,
			-.084253,
			.671499,
			-.112257,
			-.096586,
			-.096586,
			-.147682,
			-.081623,
			-.072282,
			-.089639,
			-.089639,
			-.076969,
			-.076969,
			-.059516,
			-.059516,
			.450703,
			.622894,
			-.128596,
			.49823,
			.49823,
			.819811,
			-.089843,
			-.089843,
			-.108684,
			-.108684,
			-.07269,
			-.07269,
			-.242224,
			-.115102,
			-.089843,
			-.144076,
			-.086335,
			-.071677,
			-.055696,
			-.055696,
			-.203867,
			-.084253,
			-.054038,
			-.101771,
			-.111776,
			-.111776,
			-.057624,
			-.379082,
			-.055696,
			-.055696,
			-.068368,
			-.289247,
			-.204352,
			-.089746,
			-.137579,
			-.080283,
			-.080283,
			-.091626,
			-.091626,
			.645589,
			.645589,
			-.063017,
			-.063017,
			-.274403,
			-.087373,
			-.053939,
			-.086911,
			-.063017,
			-.069327,
			.301199,
			.624838,
			-.211172,
			-.093099,
			-.093099,
			-.084643,
			.870754,
			.45675,
			.49823,
			-.18089,
			-.106761,
			-.091626,
			-.063514,
			-.063514,
			-.094919,
			-.094919,
			.819811,
			.819811,
			-.06708,
			-.084991,
			-.084991,
			.664343,
			-.115102,
			-.115102,
			-.106761,
			-.106761,
			-.068368,
			-.068368,
			-.150024,
			-.080283,
			-.084253,
			.664343,
			.664343,
			.819811,
			.819811,
			-.055362,
			-.055362,
			-.169508,
			-.084133,
			-.101771,
			-.084991,
			-.084991,
			-.082185,
			.93204,
			.523963,
			-.06708,
			-.06708,
			-.079897,
			-.079897,
			.466827,
			.624838,
			-.112856,
			-.081623,
			-.081623,
			.45675,
			.45675,
			-.078664,
			-.078664,
			-.128585,
			-.084643,
			-.05638,
			-.05638,
			-.05638,
			.671499,
			.671499,
			-.106761,
			-.106761,
			-.084991,
			-.084991,
			-.053939,
			-.143561,
			-.064279,
			-.148906,
			-.080283,
			-.083027,
			-.098933,
			-.098933,
			-.238155,
			-.115102,
			-.084991,
			-.080344,
			-.397451,
			-.059516,
			-.093099,
			-.053939,
			-.071952,
			-.054038,
			-.055362,
			-.057624,
			-.06708,
			-.098933,
			-.057624,
			-.057624,
			-.154415,
			-.079712,
			-.089639,
			-.06708,
			-.06708,
			-.196554,
			-.106761,
			-.106761,
			.205623,
			-.108684,
			.45675,
			-.105937,
			-.089843,
			-.089843,
			.62088,
			-.086911,
			-.080344,
			-.07269,
			.523963,
			-.094919,
			.664343,
			-.093536,
			-.093536,
			-.087902,
			-.086335,
			-.086335,
			-.214979,
			-.091626,
			-.147275,
			-.098933,
			-.098933,
			.289322,
			-.081623,
			.523963,
			-.101652,
			-.082185,
			-.082185,
			-.179592,
			-.068368,
			-.128596,
			.156946,
			-.084991,
			.664343,
			-.080344,
			-.143608,
			-.125777,
			-.156395,
			-.091626,
			-.071677,
			-.071677,
			-.063017,
			-.143608,
			-.075876,
			-.081623,
			-.101652,
			-.101652,
			-.108684,
			-.108684,
			-.053939,
			-.053939,
			-.131521,
			-.068368,
			-.082185,
			-.082185,
			-.054038,
			-.155814,
			-.155814,
			-.216436,
			-.063017,
			-.174924,
			.48829,
			-.087373,
			.622894,
			-.135188,
			-.068368,
			-.079897,
			-.128596,
			-.128596,
			-.060666,
			-.060666,
			-.153941,
			-.097154,
			-.071677,
			-.105937,
			-.105937,
			-.283977,
			-.097154,
			-.087373,
			-.068368,
			-.101771,
			-.213666,
			-.094919,
			-.093168,
			-.059516,
			-.059516,
			-.115102,
			-.125777,
			-.112257,
			-.112257,
			-.093099,
			-.093099,
			-.111776,
			-.101652,
			-.072282,
			-.072282,
			-.093536,
			-.054038,
			-.054038,
			-.095008,
			-.060666,
			-.060666,
			-.097154,
			-.097154,
			-.106761,
			-.106761,
			-.079897,
			-.079897,
			.870754,
			.870754,
			-.091626,
			-.091626,
			-.075876,
			-.075876,
			-.083027,
			-.083027,
			-.096586,
			-.105937,
			-.112856,
			-.112856,
			.45675,
			.45675,
			-.086335,
			-.112856,
			-.112856,
			.870754,
			.870754,
			-.144076,
			-.086335,
			-.071677,
			-.115102,
			-.115102,
			-.079897,
			-.079897,
			-.095008,
			-.095008,
			-.112257,
			-.112257,
			-.169508,
			-.101771,
			-.101652,
			-.101652,
			-.055696,
			-.055696,
			-.071952,
			-.071952,
			-.163771,
			-.096586,
			-.076969,
			-.076969,
			-.084253,
			-.128596,
			.671499,
			.671499,
			-.071677,
			-.102098,
			-.102098,
			-.068368,
			-.068368,
			-.101771,
			-.101771,
			-.226139,
			-.081623,
			-.094919,
			-.089746,
			-.169973,
			-.101771,
			-.084643,
			-.143774,
			-.07269,
			-.084991,
			-.086379,
			-.086379,
			.715099,
			-.093099,
			-.101771,
			-.076969,
			-.091626,
			-.075876,
			-.063017,
			-.060666,
			-.225601,
			-.07269,
			-.095008,
			.523963,
			-.093099,
			-.108684,
			-.112257,
			-.196417,
			-.102098,
			.96186,
			-.078664,
			1.218026,
			.279611,
			-.081623,
			-.089843,
			-.071677,
			-.111776,
			.819811,
			.45675,
			-.101652,
			-.098933,
			-.060666,
			-.105937,
			-.171499,
			-.111776,
			-.106761,
			.870754,
			-.086335,
			-.112856,
			.49823,
			-.071952,
			-.128596,
			-.168378,
			-.137579,
			-.280632,
			-.089843,
			.096859,
			.523963,
			-.069327,
			.45675,
			.002745,
			-.275672,
			.317368,
			-.080344,
			-.080344,
			-.137856,
			-.064279,
			-.086911,
			-.137579,
			-.087373,
			-.063514,
			-.306692,
			-.101652,
			-.163771,
			-.174917,
			.624838,
			-.055362,
			-.082185,
			-.093536,
			-.095008,
			-.144076,
			-.084133,
			-.064279,
			-.196417,
			-.071952,
			-.079712,
			-.079712,
			-.112856,
			-.112856,
			-.158741,
			-.084253,
			-.089843,
			-.069327,
			-.23501,
			-.084133,
			-.080344,
			-.112257,
			-.280632,
			-.084991,
			-.101652,
			-.084133,
			-.064279,
			-.064279,
			-.128596,
			-.128596,
			-.089639,
			.671499,
			.671499,
			-.093099,
			-.093099,
			-.292144,
			-.125777,
			-.198988,
			-.071952,
			-.071952,
			-.113481,
			-.094919,
			-.094919,
			.946681,
			-.089843,
			.49823,
			.671499,
			.45675,
			-.128596,
			-.15123,
			-.093168,
			.668786,
			.819811,
			-.086335,
			-.089843,
			-.089843,
			-.040728,
			-.112856,
			-.083027,
			-.101771,
			-.182296,
			.622894,
			-.150923,
			-.068368,
			-.084133,
			-.084133,
			-.105937,
			-.105937,
			-.071952,
			-.208481,
			-.148906,
			-.082185,
			-.608274,
			-.098933,
			-.060666,
			-.055362,
			-.093168,
			-.071677,
			-.19545,
			-.071952,
			-.089746,
			-.078664,
			-.15123,
			-.089639,
			-.07269,
			-.139743,
			-.106761,
			-.105937,
			-.086335,
			.671499,
			-.075876,
			-.080344,
			-.086335,
			-.081623,
			-.108684,
			-.156803,
			-.080344,
			-.159311,
			-.159311,
			.894218,
			.523963,
			-.160136,
			-.095008,
			.519203,
			-.091626,
			-.152826,
			-.084991,
			.523963,
			-.096586,
			-.063514,
			-.115102,
			-.079897,
			-.084991,
			-.154415,
			-.108684,
			-.055696,
			-.084133,
			-.15064,
			-.069327,
			-.069327,
			.715371,
			-.125777,
			.317368,
			-.102098,
			.819811,
			-.30531,
			-.072282,
			-.14288,
			-.063514,
			-.108684,
			-.091626,
			-.091626,
			-.127525,
			-.059516,
			-.080344,
			.366221,
			.49823,
			-.096586,
			-.081623,
			-.076969,
			-.108684,
			-.108684,
			.450703,
			.450703,
			.45675,
			.45675,
			-.05638,
			-.05638
		],
		[
			1.379197,
			.650719,
			-.084122,
			.534341,
			.621574,
			-.079935,
			-.079935,
			-.068959,
			-.178719,
			-.102629,
			-.100949,
			-.100949,
			-.056794,
			-.070401,
			-.070401,
			-.11433,
			-.11433,
			.595298,
			-.17496,
			-.071224,
			-.076625,
			-.097312,
			-.098838,
			-.091315,
			-.093377,
			-.119601,
			.650719,
			-.090947,
			-.079935,
			-.085468,
			-.202149,
			-.100949,
			-.100491,
			-.070401,
			1.203788,
			-.155536,
			.545418,
			.240193,
			-.05623,
			-.05623,
			.535179,
			.535179,
			-.100491,
			-.100491,
			-.072607,
			-.072607,
			-.154829,
			-.077271,
			-.092534,
			-.403996,
			-.147411,
			-.315191,
			-.060508,
			-.059912,
			-.075161,
			-.075161,
			-.161493,
			-.085799,
			-.091315,
			.534341,
			-.170621,
			-.070241,
			-.116883,
			-.100949,
			-.100949,
			-.097312,
			-.097312,
			-.091315,
			-.091315,
			-.116883,
			-.116883,
			-.070241,
			-.093042,
			-.093042,
			-.092874,
			-.102629,
			-.102629,
			-.08856,
			-.08856,
			-.056794,
			-.056794,
			-.06171,
			-.073218,
			-.073218,
			-.061571,
			-.061571,
			-.126169,
			-.126169,
			-.093377,
			-.093377,
			-.060508,
			-.060508,
			-.17496,
			-.102366,
			-.089518,
			-.187543,
			-.087441,
			-.118243,
			.545418,
			.545418,
			.903259,
			-.102629,
			-.091315,
			-.097312,
			.650719,
			.545418,
			.621574,
			-.090947,
			-.159223,
			-.085107,
			.506326,
			-.139501,
			-.077271,
			-.075724,
			-.328858,
			-.079935,
			-.149315,
			-.102629,
			-.085799,
			-.05623,
			-.08856,
			-.08856,
			-.090947,
			-.090947,
			-.076625,
			-.076625,
			-.054477,
			-.054477,
			-.139501,
			-.139501,
			-.075794,
			-.075794,
			-.214389,
			-.116883,
			-.118243,
			-.061221,
			-.061221,
			-.057987,
			-.057987,
			-.166659,
			-.097312,
			-.085468,
			-.184966,
			-.184966,
			-.092534,
			-.092534,
			-.102366,
			-.102366,
			-.147411,
			-.147411,
			.272944,
			.380164,
			-.075794,
			-.075794,
			-.061221,
			-.061221,
			-.079935,
			-.079935,
			-.093377,
			-.093377,
			-.145767,
			-.085468,
			-.074399,
			-.172757,
			-.093377,
			-.093377,
			-.169559,
			-.098838,
			-.06537,
			-.06537,
			-.080387,
			-.153728,
			-.153728,
			-.083294,
			-.083294,
			-.070241,
			-.070241,
			.545418,
			.545418,
			1.196585,
			.68147,
			.630856,
			1.093431,
			.664016,
			.535179,
			-.185498,
			-.126169,
			.534341,
			.534341,
			.242069,
			-.118243,
			.621574,
			-.084122,
			.545418,
			.545418,
			-.075794,
			-.075794,
			-.075724,
			-.075724,
			-.083294,
			-.175308,
			-.104994,
			-.08727,
			-.260161,
			-.260161,
			-.06171,
			-.06171,
			-.098838,
			-.098838,
			-.080387,
			-.080387,
			-.421848,
			-.087122,
			-.087441,
			-.121982,
			-.097015,
			-.097666,
			-.100949,
			-.24362,
			-.092534,
			-.072607,
			-.072607,
			-.056794,
			-.056794,
			-.148774,
			-.148774,
			-.071224,
			-.071224,
			-.198026,
			-.168097,
			-.093042,
			-.091315,
			.650719,
			.650719,
			.545418,
			.545418,
			-.070401,
			-.070401,
			1.271029,
			.535179,
			.545418,
			-.17465,
			.68147,
			-.074399,
			-.074399,
			-.160855,
			-.090947,
			-.073218,
			.664016,
			.664016,
			-.075161,
			-.075161,
			-.059912,
			-.059912,
			.468643,
			-.116883,
			.630856,
			-.072607,
			-.072607,
			-.119601,
			.534341,
			.534341,
			-.083294,
			-.083294,
			-.075724,
			-.075724,
			1.534243,
			.621574,
			.534341,
			-.157189,
			-.087287,
			-.085107,
			-.05623,
			-.05623,
			.351407,
			.545418,
			-.061221,
			-.070401,
			-.076625,
			-.076625,
			-.057987,
			-.401111,
			-.05623,
			-.05623,
			-.093042,
			-.293784,
			-.196294,
			-.095533,
			-.123651,
			.650719,
			.650719,
			-.085799,
			-.085799,
			-.178919,
			-.178919,
			-.061571,
			-.061571,
			-.257731,
			-.070241,
			-.054477,
			-.084122,
			-.061571,
			-.068249,
			.306474,
			-.118243,
			.425468,
			-.093377,
			-.093377,
			-.085826,
			-.135492,
			-.075991,
			-.072607,
			-.167284,
			-.097666,
			-.085799,
			-.06537,
			-.06537,
			-.077271,
			-.077271,
			-.119601,
			-.119601,
			-.067581,
			-.092874,
			-.092874,
			-.092534,
			.621574,
			.621574,
			-.097666,
			-.097666,
			-.093042,
			-.093042,
			1.090642,
			.650719,
			.545418,
			-.092534,
			-.092534,
			-.119601,
			-.119601,
			-.06171,
			-.06171,
			-.152651,
			-.097015,
			-.070401,
			-.092874,
			-.092874,
			-.102629,
			-.131146,
			-.071224,
			-.067581,
			-.067581,
			-.097312,
			-.097312,
			-.189437,
			-.118243,
			-.089518,
			-.090947,
			-.090947,
			-.075991,
			-.075991,
			-.080387,
			-.080387,
			-.130042,
			-.085826,
			-.056794,
			-.056794,
			-.056794,
			-.17465,
			-.17465,
			-.097666,
			-.097666,
			-.092874,
			-.092874,
			-.054477,
			-.142605,
			-.068959,
			.513754,
			.650719,
			-.08727,
			-.079935,
			-.079935,
			.376405,
			.621574,
			-.092874,
			-.085468,
			-.397745,
			-.059912,
			-.093377,
			-.054477,
			-.075794,
			-.061221,
			-.06171,
			-.057987,
			-.067581,
			-.079935,
			-.057987,
			-.057987,
			.512115,
			-.102366,
			.664016,
			-.067581,
			-.067581,
			-.198026,
			-.097666,
			-.097666,
			-.219205,
			-.083294,
			-.075991,
			-.098838,
			.534341,
			.534341,
			-.353815,
			-.084122,
			-.085468,
			-.075724,
			-.071224,
			-.077271,
			-.092534,
			-.102464,
			-.102464,
			-.08856,
			-.087287,
			-.087287,
			.308639,
			-.085799,
			.409614,
			-.079935,
			-.079935,
			-.226884,
			-.090947,
			-.071224,
			-.104994,
			-.102629,
			-.102629,
			.490381,
			-.093042,
			.630856,
			.059686,
			-.092874,
			-.092534,
			-.085468,
			-.166187,
			.535179,
			-.166962,
			-.085799,
			-.085107,
			-.085107,
			-.061571,
			-.166187,
			-.091315,
			-.090947,
			-.104994,
			-.104994,
			-.083294,
			-.083294,
			-.054477,
			-.054477,
			-.168097,
			-.093042,
			-.102629,
			-.102629,
			-.061221,
			-.141994,
			-.141994,
			-.240564,
			-.061571,
			-.202149,
			-.170621,
			-.070241,
			-.116883,
			-.173566,
			-.093042,
			-.097312,
			.630856,
			.630856,
			-.060508,
			-.060508,
			-.169646,
			-.100949,
			-.085107,
			-.098838,
			-.098838,
			-.267938,
			-.100949,
			-.070241,
			-.093042,
			-.070401,
			-.195392,
			-.077271,
			-.087441,
			-.059912,
			-.059912,
			.621574,
			.535179,
			.68147,
			.68147,
			-.093377,
			-.093377,
			-.076625,
			-.104994,
			-.073218,
			-.073218,
			-.102464,
			-.061221,
			-.061221,
			-.100491,
			-.060508,
			-.060508,
			-.100949,
			-.100949,
			-.097666,
			-.097666,
			-.097312,
			-.097312,
			-.135492,
			-.135492,
			-.085799,
			-.085799,
			-.091315,
			-.091315,
			-.08727,
			-.08727,
			-.074399,
			-.098838,
			-.089518,
			-.089518,
			-.075991,
			-.075991,
			-.087287,
			-.089518,
			-.089518,
			-.135492,
			-.135492,
			-.157189,
			-.087287,
			-.085107,
			.621574,
			.621574,
			-.097312,
			-.097312,
			-.100491,
			-.100491,
			.68147,
			.68147,
			-.152651,
			-.070401,
			-.104994,
			-.104994,
			-.05623,
			-.05623,
			-.075794,
			-.075794,
			-.147411,
			-.074399,
			-.075161,
			-.075161,
			.545418,
			.630856,
			-.17465,
			-.17465,
			-.085107,
			-.126169,
			-.126169,
			-.093042,
			-.093042,
			-.070401,
			-.070401,
			-.223985,
			-.090947,
			-.077271,
			-.095533,
			-.142449,
			-.070401,
			-.085826,
			-.153728,
			-.075724,
			-.092874,
			-.087122,
			-.087122,
			.35597,
			-.093377,
			-.070401,
			-.075161,
			-.085799,
			-.091315,
			-.061571,
			-.060508,
			.361688,
			-.075724,
			-.100491,
			-.071224,
			-.093377,
			-.083294,
			.68147,
			1.093431,
			-.126169,
			.328182,
			-.080387,
			-.24362,
			1.271029,
			-.090947,
			.534341,
			-.085107,
			-.076625,
			-.119601,
			-.075991,
			-.104994,
			-.079935,
			-.060508,
			-.098838,
			-.150185,
			-.076625,
			-.097666,
			-.135492,
			-.087287,
			-.089518,
			-.072607,
			-.075794,
			.630856,
			-.157564,
			-.123651,
			-.318073,
			.534341,
			-.386629,
			-.071224,
			-.068249,
			-.075991,
			-.375379,
			-.285605,
			-.145236,
			-.085468,
			-.085468,
			-.139579,
			-.068959,
			-.084122,
			-.123651,
			-.070241,
			-.06537,
			-.269885,
			-.104994,
			-.147411,
			.177557,
			-.118243,
			-.06171,
			-.102629,
			-.102464,
			-.100491,
			-.157189,
			-.097015,
			-.068959,
			1.093431,
			-.075794,
			-.102366,
			-.102366,
			-.089518,
			-.089518,
			.984529,
			.545418,
			.534341,
			-.068249,
			.423754,
			-.097015,
			-.085468,
			.68147,
			-.318073,
			-.092874,
			-.104994,
			-.097015,
			-.068959,
			-.068959,
			.630856,
			.630856,
			.664016,
			-.17465,
			-.17465,
			-.093377,
			-.093377,
			1.554131,
			.535179,
			1.18067,
			-.075794,
			-.075794,
			-.11433,
			-.077271,
			-.077271,
			.541467,
			.534341,
			-.072607,
			-.17465,
			-.075991,
			.630856,
			-.148774,
			-.087441,
			-.188641,
			-.119601,
			-.087287,
			.534341,
			.534341,
			-.47989,
			-.089518,
			-.08727,
			-.070401,
			-.168781,
			-.116883,
			-.176882,
			-.093042,
			-.097015,
			-.097015,
			-.098838,
			-.098838,
			-.075794,
			.39134,
			.513754,
			-.102629,
			-.285838,
			-.079935,
			-.060508,
			-.06171,
			-.087441,
			-.085107,
			.506326,
			-.075794,
			-.095533,
			-.080387,
			-.148774,
			.664016,
			-.075724,
			-.146712,
			-.097666,
			-.098838,
			-.087287,
			-.17465,
			-.091315,
			-.085468,
			-.087287,
			-.090947,
			-.083294,
			-.156162,
			-.085468,
			-.184966,
			-.184966,
			-.134232,
			-.071224,
			-.099074,
			-.100491,
			-.154829,
			-.085799,
			-.139501,
			-.092874,
			-.071224,
			-.074399,
			-.06537,
			.621574,
			-.097312,
			-.092874,
			.512115,
			-.083294,
			-.05623,
			-.097015,
			-.173151,
			-.068249,
			-.068249,
			.099029,
			.535179,
			-.145236,
			-.126169,
			-.119601,
			-.274254,
			-.073218,
			-.126276,
			-.06537,
			-.083294,
			-.085799,
			-.085799,
			-.132558,
			-.059912,
			-.085468,
			-.134041,
			-.072607,
			-.074399,
			-.090947,
			-.075161,
			-.083294,
			-.083294,
			.468643,
			.468643,
			-.075991,
			-.075991,
			-.056794,
			-.056794
		],
		[
			-.005444,
			-.175325,
			.433047,
			-.133492,
			-.131029,
			-.16212,
			-.16212,
			.416719,
			-.324048,
			-.156579,
			-.214982,
			-.214982,
			.343607,
			-.132944,
			-.132944,
			.692082,
			.692082,
			-1.655402,
			-.268621,
			-.120541,
			.478266,
			-.157326,
			-.191408,
			-.131624,
			-.198812,
			-.235649,
			-.175325,
			-.134068,
			-.16212,
			-.142969,
			-.290038,
			-.214982,
			-.1721,
			-.132944,
			-.727527,
			-.256565,
			-.14604,
			-.462227,
			.394183,
			.394183,
			-.110301,
			-.110301,
			-.1721,
			-.1721,
			-.13371,
			-.13371,
			-.228246,
			-.105779,
			-.144545,
			-.540413,
			-.235852,
			-.38767,
			.432385,
			.39012,
			.449793,
			.449793,
			-.263934,
			-.157839,
			-.131624,
			-.133492,
			-.335772,
			-.221454,
			-.146797,
			-.214982,
			-.214982,
			-.157326,
			-.157326,
			-.131624,
			-.131624,
			-.146797,
			-.146797,
			-.221454,
			-.149928,
			-.149928,
			-.126934,
			-.156579,
			-.156579,
			.536085,
			.536085,
			.343607,
			.343607,
			.402527,
			.469363,
			.469363,
			.395452,
			.395452,
			-.170046,
			-.170046,
			-.198812,
			-.198812,
			.432385,
			.432385,
			-.268621,
			-.134068,
			-.160536,
			-.272388,
			-.133122,
			-.165613,
			-.14604,
			-.14604,
			-.795237,
			-.156579,
			-.131624,
			-.157326,
			-.175325,
			-.14604,
			-.131029,
			-.134068,
			-.275592,
			-.141713,
			-.284647,
			-.192295,
			-.105779,
			-.105116,
			-.564399,
			-.16212,
			-.241706,
			-.156579,
			-.157839,
			.394183,
			.536085,
			.536085,
			-.134068,
			-.134068,
			.478266,
			.478266,
			.349543,
			.349543,
			-.192295,
			-.192295,
			-.205748,
			-.205748,
			-.284857,
			-.146797,
			-.165613,
			.356435,
			.356435,
			.416195,
			.416195,
			-.27381,
			-.157326,
			-.142969,
			-.279165,
			-.279165,
			-.144545,
			-.144545,
			-.134068,
			-.134068,
			-.235852,
			-.235852,
			-.36004,
			-.25158,
			-.205748,
			-.205748,
			.356435,
			.356435,
			-.16212,
			-.16212,
			-.198812,
			-.198812,
			-.278995,
			-.142969,
			-.163011,
			-.260916,
			-.198812,
			-.198812,
			.400378,
			-.191408,
			-.145195,
			-.145195,
			.511103,
			-.211584,
			-.211584,
			-.144181,
			-.144181,
			-.221454,
			-.221454,
			-.14604,
			-.14604,
			-.282929,
			-.142134,
			-.168161,
			-.223776,
			-.13512,
			-.110301,
			-.251498,
			-.170046,
			-.133492,
			-.133492,
			-.008321,
			-.165613,
			-.131029,
			.433047,
			-.14604,
			-.14604,
			-.205748,
			-.205748,
			-.105116,
			-.105116,
			-.144181,
			-.220377,
			-.14604,
			-.095653,
			-.367674,
			-.367674,
			.402527,
			.402527,
			-.191408,
			-.191408,
			.511103,
			.511103,
			.083305,
			.630513,
			-.133122,
			.191886,
			-.180086,
			-.1935,
			-.214982,
			-.247134,
			-.144545,
			-.13371,
			-.13371,
			.343607,
			.343607,
			-.217226,
			-.217226,
			-.120541,
			-.120541,
			1.198722,
			-.25672,
			-.149928,
			-.131624,
			-.175325,
			-.175325,
			-.14604,
			-.14604,
			-.132944,
			-.132944,
			-.420338,
			-.110301,
			-.14604,
			-.126494,
			-.142134,
			-.163011,
			-.163011,
			-.252604,
			-.134068,
			.469363,
			-.13512,
			-.13512,
			.449793,
			.449793,
			.39012,
			.39012,
			-.28718,
			-.146797,
			-.168161,
			-.13371,
			-.13371,
			-.235649,
			-.133492,
			-.133492,
			-.144181,
			-.144181,
			-.105116,
			-.105116,
			-.373529,
			-.131029,
			-.133492,
			-.254315,
			-.137201,
			-.141713,
			.394183,
			.394183,
			.065774,
			-.14604,
			.356435,
			-.132944,
			.478266,
			.478266,
			.416195,
			.202159,
			.394183,
			.394183,
			-.149928,
			-.173549,
			-.437094,
			-.148047,
			-.334311,
			-.175325,
			-.175325,
			-.157839,
			-.157839,
			.221219,
			.221219,
			.395452,
			.395452,
			1.077675,
			-.221454,
			.349543,
			.433047,
			.395452,
			.459482,
			-.434815,
			-.165613,
			-.32053,
			-.198812,
			-.198812,
			.536578,
			-.204912,
			-.091022,
			-.13371,
			-.320352,
			-.1935,
			-.157839,
			-.145195,
			-.145195,
			-.105779,
			-.105779,
			-.235649,
			-.235649,
			.429286,
			-.126934,
			-.126934,
			-.144545,
			-.131029,
			-.131029,
			-.1935,
			-.1935,
			-.149928,
			-.149928,
			-.293022,
			-.175325,
			-.14604,
			-.144545,
			-.144545,
			-.235649,
			-.235649,
			.402527,
			.402527,
			-.285422,
			-.180086,
			-.132944,
			-.126934,
			-.126934,
			-.156579,
			-.231826,
			-.120541,
			.429286,
			.429286,
			-.157326,
			-.157326,
			-.297384,
			-.165613,
			-.160536,
			-.134068,
			-.134068,
			-.091022,
			-.091022,
			.511103,
			.511103,
			.802555,
			.536578,
			.343607,
			.343607,
			.343607,
			-.126494,
			-.126494,
			-.1935,
			-.1935,
			-.126934,
			-.126934,
			.349543,
			.258585,
			.416719,
			-.247079,
			-.175325,
			-.095653,
			-.16212,
			-.16212,
			-.340483,
			-.131029,
			-.126934,
			-.142969,
			1.15518,
			.39012,
			-.198812,
			.349543,
			-.205748,
			.356435,
			.402527,
			.416195,
			.429286,
			-.16212,
			.416195,
			.416195,
			-.245447,
			-.134068,
			-.13512,
			.429286,
			.429286,
			1.198722,
			-.1935,
			-.1935,
			-.36229,
			-.144181,
			-.091022,
			-.191408,
			-.133492,
			-.133492,
			-.135245,
			.433047,
			-.142969,
			-.105116,
			-.120541,
			-.105779,
			-.144545,
			.599717,
			.599717,
			.536085,
			-.137201,
			-.137201,
			-.367754,
			-.157839,
			-.250933,
			-.16212,
			-.16212,
			-.340242,
			-.134068,
			-.120541,
			-.14604,
			-.156579,
			-.156579,
			-.290035,
			-.149928,
			-.168161,
			-.575047,
			-.126934,
			-.144545,
			-.142969,
			-.242259,
			-.110301,
			-.287369,
			-.157839,
			-.141713,
			-.141713,
			.395452,
			-.242259,
			-.131624,
			-.134068,
			-.14604,
			-.14604,
			-.144181,
			-.144181,
			.349543,
			.349543,
			-.25672,
			-.149928,
			-.156579,
			-.156579,
			.356435,
			-.335423,
			-.335423,
			.065696,
			.395452,
			-.290038,
			-.335772,
			-.221454,
			-.146797,
			-.280156,
			-.149928,
			-.157326,
			-.168161,
			-.168161,
			.432385,
			.432385,
			-.325236,
			-.214982,
			-.141713,
			-.191408,
			-.191408,
			-.575942,
			-.214982,
			-.221454,
			-.149928,
			-.132944,
			-.326185,
			-.105779,
			-.133122,
			.39012,
			.39012,
			-.131029,
			-.110301,
			-.142134,
			-.142134,
			-.198812,
			-.198812,
			.478266,
			-.14604,
			.469363,
			.469363,
			.599717,
			.356435,
			.356435,
			-.1721,
			.432385,
			.432385,
			-.214982,
			-.214982,
			-.1935,
			-.1935,
			-.157326,
			-.157326,
			-.204912,
			-.204912,
			-.157839,
			-.157839,
			-.131624,
			-.131624,
			-.095653,
			-.095653,
			-.163011,
			-.191408,
			-.160536,
			-.160536,
			-.091022,
			-.091022,
			-.137201,
			-.160536,
			-.160536,
			-.204912,
			-.204912,
			-.254315,
			-.137201,
			-.141713,
			-.131029,
			-.131029,
			-.157326,
			-.157326,
			-.1721,
			-.1721,
			-.142134,
			-.142134,
			-.285422,
			-.132944,
			-.14604,
			-.14604,
			.394183,
			.394183,
			-.205748,
			-.205748,
			-.235852,
			-.163011,
			.449793,
			.449793,
			-.14604,
			-.168161,
			-.126494,
			-.126494,
			-.141713,
			-.170046,
			-.170046,
			-.149928,
			-.149928,
			-.132944,
			-.132944,
			-.32941,
			-.134068,
			-.105779,
			-.148047,
			.368035,
			-.132944,
			.536578,
			-.211584,
			-.105116,
			-.126934,
			.630513,
			.630513,
			-1.379005,
			-.198812,
			-.132944,
			.449793,
			-.157839,
			-.131624,
			.395452,
			.432385,
			-.371569,
			-.105116,
			-.1721,
			-.120541,
			-.198812,
			-.144181,
			-.142134,
			-.223776,
			-.170046,
			-.376581,
			.511103,
			-.247134,
			-.420338,
			-.134068,
			-.133492,
			-.141713,
			.478266,
			-.235649,
			-.091022,
			-.14604,
			-.16212,
			.432385,
			-.191408,
			-.217831,
			.478266,
			-.1935,
			-.204912,
			-.137201,
			-.160536,
			-.13371,
			-.205748,
			-.168161,
			-.23144,
			-.334311,
			-.470108,
			-.133492,
			-.604678,
			-.120541,
			.459482,
			-.091022,
			-.617281,
			-.491056,
			-.214459,
			-.142969,
			-.142969,
			.774819,
			.416719,
			.433047,
			-.334311,
			-.221454,
			-.145195,
			-.43049,
			-.14604,
			-.235852,
			.008596,
			-.165613,
			.402527,
			-.156579,
			.599717,
			-.1721,
			-.254315,
			-.180086,
			.416719,
			-.223776,
			-.205748,
			-.134068,
			-.134068,
			-.160536,
			-.160536,
			-.254878,
			-.14604,
			-.133492,
			.459482,
			-.395052,
			-.180086,
			-.142969,
			-.142134,
			-.470108,
			-.126934,
			-.14604,
			-.180086,
			.416719,
			.416719,
			-.168161,
			-.168161,
			-.13512,
			-.126494,
			-.126494,
			-.198812,
			-.198812,
			-.351226,
			-.110301,
			-.276533,
			-.205748,
			-.205748,
			.692082,
			-.105779,
			-.105779,
			-.615742,
			-.133492,
			-.13371,
			-.126494,
			-.091022,
			-.168161,
			-.217226,
			-.133122,
			-.339967,
			-.235649,
			-.137201,
			-.133492,
			-.133492,
			-.398066,
			-.160536,
			-.095653,
			-.132944,
			-.297815,
			-.146797,
			-.332727,
			-.149928,
			-.180086,
			-.180086,
			-.191408,
			-.191408,
			-.205748,
			-.363094,
			-.247079,
			-.156579,
			-.816482,
			-.16212,
			.432385,
			.402527,
			-.133122,
			-.141713,
			-.284647,
			-.205748,
			-.148047,
			.511103,
			-.217226,
			-.13512,
			-.105116,
			-.267379,
			-.1935,
			-.191408,
			-.137201,
			-.126494,
			-.131624,
			-.142969,
			-.137201,
			-.134068,
			-.144181,
			-.274279,
			-.142969,
			-.279165,
			-.279165,
			-.192904,
			-.120541,
			-1.093183,
			-.1721,
			-.228246,
			-.157839,
			-.192295,
			-.126934,
			-.120541,
			-.163011,
			-.145195,
			-.131029,
			-.157326,
			-.126934,
			-.245447,
			-.144181,
			.394183,
			-.180086,
			-.229987,
			.459482,
			.459482,
			-.571687,
			-.110301,
			-.214459,
			-.170046,
			-.235649,
			.318123,
			.469363,
			.217036,
			-.145195,
			-.144181,
			-.157839,
			-.157839,
			.225353,
			.39012,
			-.142969,
			-.270551,
			-.13371,
			-.163011,
			-.134068,
			.449793,
			-.144181,
			-.144181,
			-.28718,
			-.28718,
			-.091022,
			-.091022,
			.343607,
			.343607
		],
		[
			-.276045,
			-.107033,
			-.068283,
			-.078347,
			-.091096,
			-.10031,
			-.10031,
			-.067075,
			-.165383,
			-.090392,
			-.123865,
			-.123865,
			-.058439,
			.53828,
			.53828,
			-.118007,
			-.118007,
			.056247,
			-.232558,
			-.081809,
			-.073389,
			-.08837,
			.770793,
			-.077496,
			-.090988,
			-.108999,
			-.107033,
			-.084636,
			-.10031,
			-.108335,
			-.161378,
			-.123865,
			-.100475,
			.53828,
			-.069833,
			-.165628,
			-.077878,
			.599037,
			-.06429,
			-.06429,
			-.071242,
			-.071242,
			-.100475,
			-.100475,
			-.095633,
			-.095633,
			-.161516,
			-.073228,
			-.103912,
			.953961,
			.97248,
			.19596,
			-.061362,
			-.061367,
			-.076158,
			-.076158,
			-.158995,
			-.096878,
			-.077496,
			-.078347,
			-.157405,
			-.07626,
			-.096371,
			-.123865,
			-.123865,
			-.08837,
			-.08837,
			-.077496,
			-.077496,
			-.096371,
			-.096371,
			-.07626,
			-.072999,
			-.072999,
			.594462,
			-.090392,
			-.090392,
			-.091408,
			-.091408,
			-.058439,
			-.058439,
			-.06068,
			-.075312,
			-.075312,
			-.062873,
			-.062873,
			-.090479,
			-.090479,
			-.090988,
			-.090988,
			-.061362,
			-.061362,
			-.232558,
			-.141381,
			-.113673,
			-.182524,
			-.124955,
			-.075224,
			-.077878,
			-.077878,
			-.46419,
			-.090392,
			-.077496,
			-.08837,
			-.107033,
			-.077878,
			-.091096,
			-.084636,
			-.180374,
			-.084148,
			-.174858,
			-.150089,
			-.073228,
			-.091379,
			-.360196,
			-.10031,
			-.169341,
			-.090392,
			-.096878,
			-.06429,
			-.091408,
			-.091408,
			-.084636,
			-.084636,
			-.073389,
			-.073389,
			-.056031,
			-.056031,
			-.150089,
			-.150089,
			-.083514,
			-.083514,
			-.156461,
			-.096371,
			-.075224,
			-.062754,
			-.062754,
			-.07343,
			-.07343,
			-.179357,
			-.08837,
			-.108335,
			-.220525,
			-.220525,
			-.103912,
			-.103912,
			-.141381,
			-.141381,
			.97248,
			.97248,
			-.197849,
			-.133548,
			-.083514,
			-.083514,
			-.062754,
			-.062754,
			-.10031,
			-.10031,
			-.090988,
			-.090988,
			.429762,
			-.108335,
			.579667,
			-.143183,
			-.090988,
			-.090988,
			.559836,
			.770793,
			-.071596,
			-.071596,
			-.08216,
			.458713,
			.458713,
			-.09836,
			-.09836,
			-.07626,
			-.07626,
			-.077878,
			-.077878,
			-.172028,
			-.101293,
			-.087374,
			-.155147,
			-.098912,
			-.071242,
			-.149268,
			-.090479,
			-.078347,
			-.078347,
			-.265007,
			-.075224,
			-.091096,
			-.068283,
			-.077878,
			-.077878,
			-.083514,
			-.083514,
			-.091379,
			-.091379,
			-.09836,
			1.018939,
			.63062,
			.486878,
			-.215197,
			-.215197,
			-.06068,
			-.06068,
			.770793,
			.770793,
			-.08216,
			-.08216,
			.591744,
			-.156805,
			-.124955,
			-.143102,
			.674559,
			.735227,
			-.123865,
			-.197642,
			-.103912,
			-.095633,
			-.095633,
			-.058439,
			-.058439,
			-.197254,
			-.197254,
			-.081809,
			-.081809,
			-.204394,
			-.137222,
			-.072999,
			-.077496,
			-.107033,
			-.107033,
			-.077878,
			-.077878,
			.53828,
			.53828,
			-.29086,
			-.071242,
			-.077878,
			-.112848,
			-.101293,
			.579667,
			.579667,
			-.175952,
			-.084636,
			-.075312,
			-.098912,
			-.098912,
			-.076158,
			-.076158,
			-.061367,
			-.061367,
			-.167539,
			-.096371,
			-.087374,
			-.095633,
			-.095633,
			-.108999,
			-.078347,
			-.078347,
			-.09836,
			-.09836,
			-.091379,
			-.091379,
			-.234791,
			-.091096,
			-.078347,
			-.15267,
			-.083289,
			-.084148,
			-.06429,
			-.06429,
			.337694,
			-.077878,
			-.062754,
			.53828,
			-.073389,
			-.073389,
			-.07343,
			-.394454,
			-.06429,
			-.06429,
			-.072999,
			-.291399,
			-.19903,
			-.086509,
			-.134816,
			-.107033,
			-.107033,
			-.096878,
			-.096878,
			-.166302,
			-.166302,
			-.062873,
			-.062873,
			-.252846,
			-.07626,
			-.056031,
			-.068283,
			-.062873,
			-.068795,
			-.279284,
			-.075224,
			-.232332,
			-.090988,
			-.090988,
			-.106549,
			-.164757,
			-.08506,
			-.095633,
			.58205,
			.735227,
			-.096878,
			-.071596,
			-.071596,
			-.073228,
			-.073228,
			-.108999,
			-.108999,
			-.069437,
			.594462,
			.594462,
			-.103912,
			-.091096,
			-.091096,
			.735227,
			.735227,
			-.072999,
			-.072999,
			-.168603,
			-.107033,
			-.077878,
			-.103912,
			-.103912,
			-.108999,
			-.108999,
			-.06068,
			-.06068,
			1.105872,
			.674559,
			.53828,
			.594462,
			.594462,
			-.090392,
			-.161792,
			-.081809,
			-.069437,
			-.069437,
			-.08837,
			-.08837,
			-.172237,
			-.075224,
			-.113673,
			-.084636,
			-.084636,
			-.08506,
			-.08506,
			-.08216,
			-.08216,
			-.150437,
			-.106549,
			-.058439,
			-.058439,
			-.058439,
			-.112848,
			-.112848,
			.735227,
			.735227,
			.594462,
			.594462,
			-.056031,
			-.175093,
			-.067075,
			.346344,
			-.107033,
			.486878,
			-.10031,
			-.10031,
			.335471,
			-.091096,
			.594462,
			-.108335,
			-.427977,
			-.061367,
			-.090988,
			-.056031,
			-.083514,
			-.062754,
			-.06068,
			-.07343,
			-.069437,
			-.10031,
			-.07343,
			-.07343,
			-.2191,
			-.141381,
			-.098912,
			-.069437,
			-.069437,
			-.204394,
			.735227,
			.735227,
			.498813,
			-.09836,
			-.08506,
			.770793,
			-.078347,
			-.078347,
			-.383353,
			-.068283,
			-.108335,
			-.091379,
			-.081809,
			-.073228,
			-.103912,
			-.097997,
			-.097997,
			-.091408,
			-.083289,
			-.083289,
			-.220266,
			-.096878,
			-.148163,
			-.10031,
			-.10031,
			.39419,
			-.084636,
			-.081809,
			.63062,
			-.090392,
			-.090392,
			-.146229,
			-.072999,
			-.087374,
			.108282,
			.594462,
			-.103912,
			-.108335,
			-.147833,
			-.071242,
			-.16891,
			-.096878,
			-.084148,
			-.084148,
			-.062873,
			-.147833,
			-.077496,
			-.084636,
			.63062,
			.63062,
			-.09836,
			-.09836,
			-.056031,
			-.056031,
			-.137222,
			-.072999,
			-.090392,
			-.090392,
			-.062754,
			-.167611,
			-.167611,
			-.203696,
			-.062873,
			-.161378,
			-.157405,
			-.07626,
			-.096371,
			-.147137,
			-.072999,
			-.08837,
			-.087374,
			-.087374,
			-.061362,
			-.061362,
			-.189667,
			-.123865,
			-.084148,
			.770793,
			.770793,
			.212308,
			-.123865,
			-.07626,
			-.072999,
			.53828,
			-.229104,
			-.073228,
			-.124955,
			-.061367,
			-.061367,
			-.091096,
			-.071242,
			-.101293,
			-.101293,
			-.090988,
			-.090988,
			-.073389,
			.63062,
			-.075312,
			-.075312,
			-.097997,
			-.062754,
			-.062754,
			-.100475,
			-.061362,
			-.061362,
			-.123865,
			-.123865,
			.735227,
			.735227,
			-.08837,
			-.08837,
			-.164757,
			-.164757,
			-.096878,
			-.096878,
			-.077496,
			-.077496,
			.486878,
			.486878,
			.579667,
			.770793,
			-.113673,
			-.113673,
			-.08506,
			-.08506,
			-.083289,
			-.113673,
			-.113673,
			-.164757,
			-.164757,
			-.15267,
			-.083289,
			-.084148,
			-.091096,
			-.091096,
			-.08837,
			-.08837,
			-.100475,
			-.100475,
			-.101293,
			-.101293,
			1.105872,
			.53828,
			.63062,
			.63062,
			-.06429,
			-.06429,
			-.083514,
			-.083514,
			.97248,
			.579667,
			-.076158,
			-.076158,
			-.077878,
			-.087374,
			-.112848,
			-.112848,
			-.084148,
			-.090479,
			-.090479,
			-.072999,
			-.072999,
			.53828,
			.53828,
			-.207528,
			-.084636,
			-.073228,
			-.086509,
			.393654,
			.53828,
			-.106549,
			.458713,
			-.091379,
			.594462,
			-.156805,
			-.156805,
			.142931,
			-.090988,
			.53828,
			-.076158,
			-.096878,
			-.077496,
			-.062873,
			-.061362,
			-.216118,
			-.091379,
			-.100475,
			-.081809,
			-.090988,
			-.09836,
			-.101293,
			-.155147,
			-.090479,
			-.223085,
			-.08216,
			-.197642,
			-.29086,
			-.084636,
			-.078347,
			-.084148,
			-.073389,
			-.108999,
			-.08506,
			.63062,
			-.10031,
			-.061362,
			.770793,
			-.180704,
			-.073389,
			.735227,
			-.164757,
			-.083289,
			-.113673,
			-.095633,
			-.083514,
			-.087374,
			-.145649,
			-.134816,
			1.407822,
			-.078347,
			.429117,
			-.081809,
			-.068795,
			-.08506,
			.22669,
			.396358,
			-.167243,
			-.108335,
			-.108335,
			-.123419,
			-.067075,
			-.068283,
			-.134816,
			-.07626,
			-.071596,
			1.789899,
			.63062,
			.97248,
			-.141328,
			-.075224,
			-.06068,
			-.090392,
			-.097997,
			-.100475,
			-.15267,
			.674559,
			-.067075,
			-.155147,
			-.083514,
			-.141381,
			-.141381,
			-.113673,
			-.113673,
			-.142447,
			-.077878,
			-.078347,
			-.068795,
			.394832,
			.674559,
			-.108335,
			-.101293,
			1.407822,
			.594462,
			.63062,
			.674559,
			-.067075,
			-.067075,
			-.087374,
			-.087374,
			-.098912,
			-.112848,
			-.112848,
			-.090988,
			-.090988,
			-.2187,
			-.071242,
			-.169857,
			-.083514,
			-.083514,
			-.118007,
			-.073228,
			-.073228,
			.200765,
			-.078347,
			-.095633,
			-.112848,
			-.08506,
			-.087374,
			-.197254,
			-.124955,
			-.175329,
			-.108999,
			-.083289,
			-.078347,
			-.078347,
			.845617,
			-.113673,
			.486878,
			.53828,
			.556449,
			-.096371,
			-.179501,
			-.072999,
			.674559,
			.674559,
			.770793,
			.770793,
			-.083514,
			.245811,
			.346344,
			-.090392,
			-.22193,
			-.10031,
			-.061362,
			-.06068,
			-.124955,
			-.084148,
			-.174858,
			-.083514,
			-.086509,
			-.08216,
			-.197254,
			-.098912,
			-.091379,
			-.144161,
			.735227,
			.770793,
			-.083289,
			-.112848,
			-.077496,
			-.108335,
			-.083289,
			-.084636,
			-.09836,
			-.187114,
			-.108335,
			-.220525,
			-.220525,
			-.152152,
			-.081809,
			.716864,
			-.100475,
			-.161516,
			-.096878,
			-.150089,
			.594462,
			-.081809,
			.579667,
			-.071596,
			-.091096,
			-.08837,
			.594462,
			-.2191,
			-.09836,
			-.06429,
			.674559,
			.361517,
			-.068795,
			-.068795,
			-.345614,
			-.071242,
			-.167243,
			-.090479,
			-.108999,
			-.297048,
			-.075312,
			-.132262,
			-.071596,
			-.09836,
			-.096878,
			-.096878,
			-.154735,
			-.061367,
			-.108335,
			.441344,
			-.095633,
			.579667,
			-.084636,
			-.076158,
			-.09836,
			-.09836,
			-.167539,
			-.167539,
			-.08506,
			-.08506,
			-.058439,
			-.058439
		],
		[
			-.316143,
			-.126066,
			-.062882,
			-.077841,
			-.128049,
			-.098189,
			-.098189,
			-.071991,
			1.16132,
			.612377,
			-.126025,
			-.126025,
			-.062898,
			-.071999,
			-.071999,
			-.126782,
			-.126782,
			.045336,
			-.16029,
			-.097608,
			-.074711,
			.586723,
			-.117409,
			.532609,
			.661275,
			-.113237,
			-.126066,
			.560468,
			-.098189,
			.592886,
			-.179346,
			-.126025,
			-.101074,
			-.071999,
			-.498926,
			-.172582,
			-.095956,
			-.350183,
			-.08223,
			-.08223,
			-.078566,
			-.078566,
			-.101074,
			-.101074,
			-.069621,
			-.069621,
			-.18487,
			-.077205,
			-.125547,
			-.328498,
			-.154767,
			-.22564,
			-.080644,
			-.084092,
			-.079091,
			-.079091,
			1.034519,
			.601977,
			.532609,
			-.077841,
			-.155125,
			-.094207,
			-.075924,
			-.126025,
			-.126025,
			.586723,
			.586723,
			.532609,
			.532609,
			-.075924,
			-.075924,
			-.094207,
			.545869,
			.545869,
			-.102856,
			.612377,
			.612377,
			-.098205,
			-.098205,
			-.062898,
			-.062898,
			-.071364,
			-.080693,
			-.080693,
			-.065151,
			-.065151,
			-.095374,
			-.095374,
			.661275,
			.661275,
			-.080644,
			-.080644,
			-.16029,
			-.085266,
			-.090529,
			-.13938,
			-.074197,
			-.078665,
			-.095956,
			-.095956,
			1.673997,
			.612377,
			.532609,
			.586723,
			-.126066,
			-.095956,
			-.128049,
			.560468,
			-.16689,
			-.092504,
			-.176967,
			-.133795,
			-.077205,
			-.069532,
			.679608,
			-.098189,
			-.203474,
			.612377,
			.601977,
			-.08223,
			-.098205,
			-.098205,
			.560468,
			.560468,
			-.074711,
			-.074711,
			-.065454,
			-.065454,
			-.133795,
			-.133795,
			-.081978,
			-.081978,
			-.140954,
			-.075924,
			-.078665,
			-.065075,
			-.065075,
			-.069586,
			-.069586,
			1.075572,
			.586723,
			.592886,
			-.169905,
			-.169905,
			-.125547,
			-.125547,
			-.085266,
			-.085266,
			-.154767,
			-.154767,
			-.219568,
			-.143363,
			-.081978,
			-.081978,
			-.065075,
			-.065075,
			-.098189,
			-.098189,
			.661275,
			.661275,
			.454341,
			.592886,
			-.094598,
			-.160726,
			.661275,
			.661275,
			-.194357,
			-.117409,
			-.085795,
			-.085795,
			-.086868,
			-.157184,
			-.157184,
			-.088819,
			-.088819,
			-.094207,
			-.094207,
			-.095956,
			-.095956,
			-.175607,
			-.098711,
			-.093882,
			-.151026,
			-.087069,
			-.078566,
			-.157358,
			-.095374,
			-.077841,
			-.077841,
			-.276654,
			-.078665,
			-.128049,
			-.062882,
			-.095956,
			-.095956,
			-.081978,
			-.081978,
			-.069532,
			-.069532,
			-.088819,
			-.153238,
			-.092921,
			-.075139,
			-.214172,
			-.214172,
			-.071364,
			-.071364,
			-.117409,
			-.117409,
			-.086868,
			-.086868,
			-.454444,
			-.095748,
			-.074197,
			-.138197,
			-.09932,
			-.103788,
			-.126025,
			-.187937,
			-.125547,
			-.069621,
			-.069621,
			-.062898,
			-.062898,
			-.131053,
			-.131053,
			-.097608,
			-.097608,
			-.219593,
			.98336,
			.545869,
			.532609,
			-.126066,
			-.126066,
			-.095956,
			-.095956,
			-.071999,
			-.071999,
			-.283285,
			-.078566,
			-.095956,
			-.080568,
			-.098711,
			-.094598,
			-.094598,
			1.051633,
			.560468,
			-.080693,
			-.087069,
			-.087069,
			-.079091,
			-.079091,
			-.084092,
			-.084092,
			-.154829,
			-.075924,
			-.093882,
			-.069621,
			-.069621,
			-.113237,
			-.077841,
			-.077841,
			-.088819,
			-.088819,
			-.069532,
			-.069532,
			-.281906,
			-.128049,
			-.077841,
			-.175942,
			-.100456,
			-.092504,
			-.08223,
			-.08223,
			-.197896,
			-.095956,
			-.065075,
			-.071999,
			-.074711,
			-.074711,
			-.069586,
			.459525,
			-.08223,
			-.08223,
			.545869,
			.191227,
			-.238906,
			-.10132,
			-.164126,
			-.126066,
			-.126066,
			.601977,
			.601977,
			-.171371,
			-.171371,
			-.065151,
			-.065151,
			-.27272,
			-.094207,
			-.065454,
			-.062882,
			-.065151,
			-.070663,
			-.268809,
			-.078665,
			-.2183,
			.661275,
			.661275,
			-.095037,
			-.11784,
			-.059618,
			-.069621,
			.45425,
			-.103788,
			.601977,
			-.085795,
			-.085795,
			-.077205,
			-.077205,
			-.113237,
			-.113237,
			-.082137,
			-.102856,
			-.102856,
			-.125547,
			-.128049,
			-.128049,
			-.103788,
			-.103788,
			.545869,
			.545869,
			-.202441,
			-.126066,
			-.095956,
			-.125547,
			-.125547,
			-.113237,
			-.113237,
			-.071364,
			-.071364,
			-.15621,
			-.09932,
			-.071999,
			-.102856,
			-.102856,
			.612377,
			-.15248,
			-.097608,
			-.082137,
			-.082137,
			.586723,
			.586723,
			-.154271,
			-.078665,
			-.090529,
			.560468,
			.560468,
			-.059618,
			-.059618,
			-.086868,
			-.086868,
			-.144006,
			-.095037,
			-.062898,
			-.062898,
			-.062898,
			-.080568,
			-.080568,
			-.103788,
			-.103788,
			-.102856,
			-.102856,
			-.065454,
			-.133295,
			-.071991,
			-.18346,
			-.126066,
			-.075139,
			-.098189,
			-.098189,
			.307404,
			-.128049,
			-.102856,
			.592886,
			.028207,
			-.084092,
			.661275,
			-.065454,
			-.081978,
			-.065075,
			-.071364,
			-.069586,
			-.082137,
			-.098189,
			-.069586,
			-.069586,
			-.157136,
			-.085266,
			-.087069,
			-.082137,
			-.082137,
			-.219593,
			-.103788,
			-.103788,
			-.225763,
			-.088819,
			-.059618,
			-.117409,
			-.077841,
			-.077841,
			.116482,
			-.062882,
			.592886,
			-.069532,
			-.097608,
			-.077205,
			-.125547,
			-.103886,
			-.103886,
			-.098205,
			-.100456,
			-.100456,
			.366554,
			.601977,
			-.155321,
			-.098189,
			-.098189,
			.314163,
			.560468,
			-.097608,
			-.092921,
			.612377,
			.612377,
			.412124,
			.545869,
			-.093882,
			1.003219,
			-.102856,
			-.125547,
			.592886,
			.996672,
			-.078566,
			1.083861,
			.601977,
			-.092504,
			-.092504,
			-.065151,
			.996672,
			.532609,
			.560468,
			-.092921,
			-.092921,
			-.088819,
			-.088819,
			-.065454,
			-.065454,
			.98336,
			.545869,
			.612377,
			.612377,
			-.065075,
			-.164277,
			-.164277,
			-.222366,
			-.065151,
			-.179346,
			-.155125,
			-.094207,
			-.075924,
			1.032702,
			.545869,
			.586723,
			-.093882,
			-.093882,
			-.080644,
			-.080644,
			-.199255,
			-.126025,
			-.092504,
			-.117409,
			-.117409,
			.203086,
			-.126025,
			-.094207,
			.545869,
			-.071999,
			-.201435,
			-.077205,
			-.074197,
			-.084092,
			-.084092,
			-.128049,
			-.078566,
			-.098711,
			-.098711,
			.661275,
			.661275,
			-.074711,
			-.092921,
			-.080693,
			-.080693,
			-.103886,
			-.065075,
			-.065075,
			-.101074,
			-.080644,
			-.080644,
			-.126025,
			-.126025,
			-.103788,
			-.103788,
			.586723,
			.586723,
			-.11784,
			-.11784,
			.601977,
			.601977,
			.532609,
			.532609,
			-.075139,
			-.075139,
			-.094598,
			-.117409,
			-.090529,
			-.090529,
			-.059618,
			-.059618,
			-.100456,
			-.090529,
			-.090529,
			-.11784,
			-.11784,
			-.175942,
			-.100456,
			-.092504,
			-.128049,
			-.128049,
			.586723,
			.586723,
			-.101074,
			-.101074,
			-.098711,
			-.098711,
			-.15621,
			-.071999,
			-.092921,
			-.092921,
			-.08223,
			-.08223,
			-.081978,
			-.081978,
			-.154767,
			-.094598,
			-.079091,
			-.079091,
			-.095956,
			-.093882,
			-.080568,
			-.080568,
			-.092504,
			-.095374,
			-.095374,
			.545869,
			.545869,
			-.071999,
			-.071999,
			.324357,
			.560468,
			-.077205,
			-.10132,
			-.152305,
			-.071999,
			-.095037,
			-.157184,
			-.069532,
			-.102856,
			-.095748,
			-.095748,
			-.257306,
			.661275,
			-.071999,
			-.079091,
			.601977,
			.532609,
			-.065151,
			-.080644,
			.874872,
			-.069532,
			-.101074,
			-.097608,
			.661275,
			-.088819,
			-.098711,
			-.151026,
			-.095374,
			-.240023,
			-.086868,
			-.187937,
			-.283285,
			.560468,
			-.077841,
			-.092504,
			-.074711,
			-.113237,
			-.059618,
			-.092921,
			-.098189,
			-.080644,
			-.117409,
			-.138049,
			-.074711,
			-.103788,
			-.11784,
			-.100456,
			-.090529,
			-.069621,
			-.081978,
			-.093882,
			-.16278,
			-.164126,
			-.304553,
			-.077841,
			-.353549,
			-.097608,
			-.070663,
			-.059618,
			.097543,
			.226208,
			-.135345,
			.592886,
			.592886,
			-.122977,
			-.071991,
			-.062882,
			-.164126,
			-.094207,
			-.085795,
			-.267957,
			-.092921,
			-.154767,
			-.210162,
			-.078665,
			-.071364,
			.612377,
			-.103886,
			-.101074,
			-.175942,
			-.09932,
			-.071991,
			-.151026,
			-.081978,
			-.085266,
			-.085266,
			-.090529,
			-.090529,
			-.158469,
			-.095956,
			-.077841,
			-.070663,
			.335321,
			-.09932,
			.592886,
			-.098711,
			-.304553,
			-.102856,
			-.092921,
			-.09932,
			-.071991,
			-.071991,
			-.093882,
			-.093882,
			-.087069,
			-.080568,
			-.080568,
			.661275,
			.661275,
			-.220389,
			-.078566,
			-.164992,
			-.081978,
			-.081978,
			-.126782,
			-.077205,
			-.077205,
			-.353069,
			-.077841,
			-.069621,
			-.080568,
			-.059618,
			-.093882,
			-.131053,
			-.074197,
			-.194846,
			-.113237,
			-.100456,
			-.077841,
			-.077841,
			-.439124,
			-.090529,
			-.075139,
			-.071999,
			-.162288,
			-.075924,
			.382816,
			.545869,
			-.09932,
			-.09932,
			-.117409,
			-.117409,
			-.081978,
			.349178,
			-.18346,
			.612377,
			-.080426,
			-.098189,
			-.080644,
			-.071364,
			-.074197,
			-.092504,
			-.176967,
			-.081978,
			-.10132,
			-.086868,
			-.131053,
			-.087069,
			-.069532,
			-.170612,
			-.103788,
			-.117409,
			-.100456,
			-.080568,
			.532609,
			.592886,
			-.100456,
			.560468,
			-.088819,
			1.08948,
			.592886,
			-.169905,
			-.169905,
			-.143359,
			-.097608,
			.140925,
			-.101074,
			-.18487,
			.601977,
			-.133795,
			-.102856,
			-.097608,
			-.094598,
			-.085795,
			-.128049,
			.586723,
			-.102856,
			-.157136,
			-.088819,
			-.08223,
			-.09932,
			.489855,
			-.070663,
			-.070663,
			-.331515,
			-.078566,
			-.135345,
			-.095374,
			-.113237,
			-.319767,
			-.080693,
			-.150328,
			-.085795,
			-.088819,
			.601977,
			.601977,
			.463921,
			-.084092,
			.592886,
			-.149735,
			-.069621,
			-.094598,
			.560468,
			-.079091,
			-.088819,
			-.088819,
			-.154829,
			-.154829,
			-.059618,
			-.059618,
			-.062898,
			-.062898
		],
		[
			-.234038,
			-.075756,
			-.066634,
			-.070008,
			-.079897,
			-.092908,
			-.092908,
			-.063506,
			-.150888,
			-.082735,
			-.104872,
			-.104872,
			-.050405,
			-.071191,
			-.071191,
			-.101286,
			-.101286,
			.357458,
			-.153793,
			-.075344,
			-.065827,
			-.079223,
			-.119022,
			-.076734,
			-.082748,
			-.116447,
			-.075756,
			-.089352,
			-.092908,
			-.081487,
			1.190419,
			-.104872,
			-.088185,
			-.071191,
			.328859,
			.452655,
			-.066042,
			.082607,
			-.069759,
			-.069759,
			-.077003,
			-.077003,
			-.088185,
			-.088185,
			-.059313,
			-.059313,
			.351007,
			.493314,
			-.108355,
			-.325428,
			-.129847,
			-.244143,
			-.090707,
			-.053249,
			-.066171,
			-.066171,
			-.139733,
			-.076515,
			-.076734,
			-.070008,
			.497254,
			.6378,
			-.092448,
			-.104872,
			-.104872,
			-.079223,
			-.079223,
			-.076734,
			-.076734,
			-.092448,
			-.092448,
			.6378,
			-.072692,
			-.072692,
			-.098752,
			-.082735,
			-.082735,
			-.078456,
			-.078456,
			-.050405,
			-.050405,
			-.061568,
			-.092649,
			-.092649,
			-.080178,
			-.080178,
			.683603,
			.683603,
			-.082748,
			-.082748,
			-.090707,
			-.090707,
			-.153793,
			-.077777,
			-.090892,
			.498005,
			.629998,
			-.083823,
			-.066042,
			-.066042,
			-.418794,
			-.082735,
			-.076734,
			-.079223,
			-.075756,
			-.066042,
			-.079897,
			-.089352,
			-.149671,
			-.073256,
			.503004,
			.89767,
			.493314,
			.491186,
			-.331701,
			-.092908,
			-.167497,
			-.082735,
			-.076515,
			-.069759,
			-.078456,
			-.078456,
			-.089352,
			-.089352,
			-.065827,
			-.065827,
			-.05398,
			-.05398,
			.89767,
			.89767,
			-.077082,
			-.077082,
			-.160724,
			-.092448,
			-.083823,
			-.048641,
			-.048641,
			-.056878,
			-.056878,
			-.146537,
			-.079223,
			-.081487,
			-.151325,
			-.151325,
			-.108355,
			-.108355,
			-.077777,
			-.077777,
			-.129847,
			-.129847,
			.391609,
			-.146642,
			-.077082,
			-.077082,
			-.048641,
			-.048641,
			-.092908,
			-.092908,
			-.082748,
			-.082748,
			-.141452,
			-.081487,
			-.073647,
			-.145129,
			-.082748,
			-.082748,
			-.188552,
			-.119022,
			.511259,
			.511259,
			-.092392,
			.357823,
			.357823,
			.625729,
			.625729,
			.6378,
			.6378,
			-.066042,
			-.066042,
			-.185939,
			-.131946,
			-.071978,
			-.167568,
			-.106773,
			-.077003,
			1.073118,
			.683603,
			-.070008,
			-.070008,
			-.258465,
			-.083823,
			-.079897,
			-.066634,
			-.066042,
			-.066042,
			-.077082,
			-.077082,
			.491186,
			.491186,
			.625729,
			-.139326,
			-.084043,
			-.068759,
			-.213678,
			-.213678,
			-.061568,
			-.061568,
			-.119022,
			-.119022,
			-.092392,
			-.092392,
			.07409,
			-.087768,
			.629998,
			-.122145,
			-.082605,
			-.114716,
			-.104872,
			-.182028,
			-.108355,
			-.059313,
			-.059313,
			-.050405,
			-.050405,
			1.0223,
			1.0223,
			-.075344,
			-.075344,
			-.175432,
			-.136247,
			-.072692,
			-.076734,
			-.075756,
			-.075756,
			-.066042,
			-.066042,
			-.071191,
			-.071191,
			-.29327,
			-.077003,
			-.066042,
			-.091281,
			-.131946,
			-.073647,
			-.073647,
			-.155772,
			-.089352,
			-.092649,
			-.106773,
			-.106773,
			-.066171,
			-.066171,
			-.053249,
			-.053249,
			-.149924,
			-.092448,
			-.071978,
			-.059313,
			-.059313,
			-.116447,
			-.070008,
			-.070008,
			.625729,
			.625729,
			.491186,
			.491186,
			-.191638,
			-.079897,
			-.070008,
			-.184682,
			-.12929,
			-.073256,
			-.069759,
			-.069759,
			-.157849,
			-.066042,
			-.048641,
			-.071191,
			-.065827,
			-.065827,
			-.056878,
			.457853,
			-.069759,
			-.069759,
			-.072692,
			.644082,
			1.504,
			.621962,
			1.047717,
			-.075756,
			-.075756,
			-.076515,
			-.076515,
			-.166198,
			-.166198,
			-.080178,
			-.080178,
			.24579,
			.6378,
			-.05398,
			-.066634,
			-.080178,
			-.114037,
			.137158,
			-.083823,
			.216657,
			-.082748,
			-.082748,
			-.076177,
			-.129882,
			-.083132,
			-.059313,
			-.174366,
			-.114716,
			-.076515,
			.511259,
			.511259,
			.493314,
			.493314,
			-.116447,
			-.116447,
			-.060043,
			-.098752,
			-.098752,
			-.108355,
			-.079897,
			-.079897,
			-.114716,
			-.114716,
			-.072692,
			-.072692,
			-.129292,
			-.075756,
			-.066042,
			-.108355,
			-.108355,
			-.116447,
			-.116447,
			-.061568,
			-.061568,
			-.140231,
			-.082605,
			-.071191,
			-.098752,
			-.098752,
			-.082735,
			-.122781,
			-.075344,
			-.060043,
			-.060043,
			-.079223,
			-.079223,
			-.159306,
			-.083823,
			-.090892,
			-.089352,
			-.089352,
			-.083132,
			-.083132,
			-.092392,
			-.092392,
			-.115418,
			-.076177,
			-.050405,
			-.050405,
			-.050405,
			-.091281,
			-.091281,
			-.114716,
			-.114716,
			-.098752,
			-.098752,
			-.05398,
			.51653,
			-.063506,
			-.131769,
			-.075756,
			-.068759,
			-.092908,
			-.092908,
			-.220915,
			-.079897,
			-.098752,
			-.081487,
			-.381564,
			-.053249,
			-.082748,
			-.05398,
			-.077082,
			-.048641,
			-.061568,
			-.056878,
			-.060043,
			-.092908,
			-.056878,
			-.056878,
			-.168273,
			-.077777,
			-.106773,
			-.060043,
			-.060043,
			-.175432,
			-.114716,
			-.114716,
			.359711,
			.625729,
			-.083132,
			-.119022,
			-.070008,
			-.070008,
			.474824,
			-.066634,
			-.081487,
			.491186,
			-.075344,
			.493314,
			-.108355,
			-.075778,
			-.075778,
			-.078456,
			-.12929,
			-.12929,
			-.186643,
			-.076515,
			-.130629,
			-.092908,
			-.092908,
			-.211237,
			-.089352,
			-.075344,
			-.084043,
			-.082735,
			-.082735,
			-.131911,
			-.072692,
			-.071978,
			-.3868,
			-.098752,
			-.108355,
			-.081487,
			-.151438,
			-.077003,
			-.142003,
			-.076515,
			-.073256,
			-.073256,
			-.080178,
			-.151438,
			-.076734,
			-.089352,
			-.084043,
			-.084043,
			.625729,
			.625729,
			-.05398,
			-.05398,
			-.136247,
			-.072692,
			-.082735,
			-.082735,
			-.048641,
			-.154997,
			-.154997,
			1.040632,
			-.080178,
			1.190419,
			.497254,
			.6378,
			-.092448,
			-.138517,
			-.072692,
			-.079223,
			-.071978,
			-.071978,
			-.090707,
			-.090707,
			-.162417,
			-.104872,
			-.073256,
			-.119022,
			-.119022,
			.311504,
			-.104872,
			.6378,
			-.072692,
			-.071191,
			1.388123,
			.493314,
			.629998,
			-.053249,
			-.053249,
			-.079897,
			-.077003,
			-.131946,
			-.131946,
			-.082748,
			-.082748,
			-.065827,
			-.084043,
			-.092649,
			-.092649,
			-.075778,
			-.048641,
			-.048641,
			-.088185,
			-.090707,
			-.090707,
			-.104872,
			-.104872,
			-.114716,
			-.114716,
			-.079223,
			-.079223,
			-.129882,
			-.129882,
			-.076515,
			-.076515,
			-.076734,
			-.076734,
			-.068759,
			-.068759,
			-.073647,
			-.119022,
			-.090892,
			-.090892,
			-.083132,
			-.083132,
			-.12929,
			-.090892,
			-.090892,
			-.129882,
			-.129882,
			-.184682,
			-.12929,
			-.073256,
			-.079897,
			-.079897,
			-.079223,
			-.079223,
			-.088185,
			-.088185,
			-.131946,
			-.131946,
			-.140231,
			-.071191,
			-.084043,
			-.084043,
			-.069759,
			-.069759,
			-.077082,
			-.077082,
			-.129847,
			-.073647,
			-.066171,
			-.066171,
			-.066042,
			-.071978,
			-.091281,
			-.091281,
			-.073256,
			.683603,
			.683603,
			-.072692,
			-.072692,
			-.071191,
			-.071191,
			.871242,
			-.089352,
			.493314,
			.621962,
			-.134371,
			-.071191,
			-.076177,
			.357823,
			.491186,
			-.098752,
			-.087768,
			-.087768,
			.281695,
			-.082748,
			-.071191,
			-.066171,
			-.076515,
			-.076734,
			-.080178,
			-.090707,
			-.199844,
			.491186,
			-.088185,
			-.075344,
			-.082748,
			.625729,
			-.131946,
			-.167568,
			.683603,
			-.217545,
			-.092392,
			-.182028,
			-.29327,
			-.089352,
			-.070008,
			-.073256,
			-.065827,
			-.116447,
			-.083132,
			-.084043,
			-.092908,
			-.090707,
			-.119022,
			1.02424,
			-.065827,
			-.114716,
			-.129882,
			-.12929,
			-.090892,
			-.059313,
			-.077082,
			-.071978,
			1.016913,
			1.047717,
			-.274778,
			-.070008,
			.15554,
			-.075344,
			-.114037,
			-.083132,
			.101517,
			-.322722,
			.494742,
			-.081487,
			-.081487,
			-.118662,
			-.063506,
			-.066634,
			1.047717,
			.6378,
			.511259,
			-.238318,
			-.084043,
			-.129847,
			-.593799,
			-.083823,
			-.061568,
			-.082735,
			-.075778,
			-.088185,
			-.184682,
			-.082605,
			-.063506,
			-.167568,
			-.077082,
			-.077777,
			-.077777,
			-.090892,
			-.090892,
			-.124052,
			-.066042,
			-.070008,
			-.114037,
			-.251403,
			-.082605,
			-.081487,
			-.131946,
			-.274778,
			-.098752,
			-.084043,
			-.082605,
			-.063506,
			-.063506,
			-.071978,
			-.071978,
			-.106773,
			-.091281,
			-.091281,
			-.082748,
			-.082748,
			-.217194,
			-.077003,
			-.162986,
			-.077082,
			-.077082,
			-.101286,
			.493314,
			.493314,
			-.356787,
			-.070008,
			-.059313,
			-.091281,
			-.083132,
			-.071978,
			1.0223,
			.629998,
			-.224064,
			-.116447,
			-.12929,
			-.070008,
			-.070008,
			.021833,
			-.090892,
			-.068759,
			-.071191,
			.469836,
			-.092448,
			-.161904,
			-.072692,
			-.082605,
			-.082605,
			-.119022,
			-.119022,
			-.077082,
			-.192987,
			-.131769,
			-.082735,
			1.556693,
			-.092908,
			-.090707,
			-.061568,
			.629998,
			-.073256,
			.503004,
			-.077082,
			.621962,
			-.092392,
			1.0223,
			-.106773,
			.491186,
			1.033275,
			-.114716,
			-.119022,
			-.12929,
			-.091281,
			-.076734,
			-.081487,
			-.12929,
			-.089352,
			.625729,
			-.144067,
			-.081487,
			-.151325,
			-.151325,
			-.144499,
			-.075344,
			.625962,
			-.088185,
			.351007,
			-.076515,
			.89767,
			-.098752,
			-.075344,
			-.073647,
			.511259,
			-.079897,
			-.079223,
			-.098752,
			-.168273,
			.625729,
			-.069759,
			-.082605,
			-.138133,
			-.114037,
			-.114037,
			.785955,
			-.077003,
			.494742,
			.683603,
			-.116447,
			1.193375,
			-.092649,
			.477569,
			.511259,
			.625729,
			-.076515,
			-.076515,
			-.122853,
			-.053249,
			-.081487,
			-.121234,
			-.059313,
			-.073647,
			-.089352,
			-.066171,
			.625729,
			.625729,
			-.149924,
			-.149924,
			-.083132,
			-.083132,
			-.050405,
			-.050405
		]
	],
	intercept: [
		-.163277,
		-.209946,
		-.201152,
		1.156198,
		-.167547,
		-.070435,
		-.343842
	],
	threshold: .4,
	margin: .07,
	featureCoverage: .28
}, Mp = JSON.stringify(jp).length;
function Np(e) {
	return e.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").match(/\b\w\w+\b/g) ?? [];
}
function Pp(e) {
	return /\b(bank|accounts?|password|medical|medication|doctor|fever|football|cryptocurrency|laptop|computer|game|forecast)\b/i.test(e);
}
function Fp(e) {
	let t = Np(e), n = [...t, ...t.slice(0, -1).map((e, n) => `${e} ${t[n + 1]}`)], r = {}, i = jp.vocabulary;
	for (let e of n) i[e] !== void 0 && (r[i[e]] = (r[i[e]] ?? 0) + 1);
	let a = Object.entries(r).map(([e, t]) => [Number(e), (1 + Math.log(t)) * jp.idf[Number(e)]]), o = Math.sqrt(a.reduce((e, [, t]) => e + t * t, 0)) || 1, s = jp.weights.map((e, t) => a.reduce((t, [n, r]) => t + e[n] * r / o, jp.intercept[t])), c = Math.max(...s), l = s.map((e) => Math.exp(e - c)), u = l.reduce((e, t) => e + t, 0), d = l.map((e, t) => ({
		label: jp.classes[t],
		score: e / u
	})).sort((e, t) => t.score - e.score), f = d[0], p = f.score - d[1].score, m = t.filter((e) => i[e] !== void 0).length / Math.max(t.length, 1);
	return {
		theme: Pp(e) || f.label === "other" || f.score < jp.threshold || p < jp.margin || m < jp.featureCoverage || t.length < 4 ? null : f.label,
		score: f.score,
		margin: p,
		coverage: m
	};
}
function Ip(e) {
	let t = e.toLowerCase(), n = t.replace(/\b(?:never|not) rushed\b|\bno (?:waiting|hidden fees|extra (?:charges|fees))\b/g, ""), r = /\b(wish|needed|need|please|could not|couldn't|cannot|can't|difficult|confus\w*|hard to|not enough|too (?:long|fast|quickly|much|hot)|nowhere|no signs|no shade|no seats|no water|no toilet|got lost|struggled|rushed|late|missed|surpris\w*|extra|disappoint\w*|wanted more|would help|would make|next time|longer than|better directions|not (?:clear|good|easy)|little more|only watch|only look)\b/.test(n), i = /\b(loved?|enjoy\w*|wonderful|perfect|highlight|helpful|fascinat\w*|appreciat\w*|comfortable|easy|clear(?:ly)?|excellent|lovely|worth|good value|best|right length|on time|relaxed|no waiting|no hidden|never rushed)\b/.test(t);
	return r ? "improve" : i ? "positive" : "uncertain";
}
function Lp(e) {
	return e.language === "en" ? Ep(e.text).map((e) => ({
		...e,
		...Fp(e.quote),
		tone: Ip(e.quote)
	})) : [{
		theme: null,
		tone: "uncertain",
		score: 0,
		margin: 0,
		quote: e.text,
		start: 0,
		end: e.text.length
	}];
}
var Rp, zp = [];
function Bp(e, t) {
	let n = 0, r = 0, i = 0;
	for (let a = 0; a < e.length; a++) n += e[a] * t[a], r += e[a] * e[a], i += t[a] * t[a];
	return n / Math.sqrt(r * i || 1);
}
var Vp;
function Hp(e) {
	return Rp ? Promise.resolve() : (Vp ||= Up(e).finally(() => {
		Vp = void 0;
	}), Vp);
}
async function Up(e) {
	if (Rp) return;
	let t = window, { env: n, pipeline: r } = t.noorRuntime ?? await new Promise((e, n) => {
		let r = document.createElement("script");
		r.type = "module", r.src = "/runtime/loader.js", r.onload = () => t.noorRuntime ? e(t.noorRuntime) : n(/* @__PURE__ */ Error("Model runtime did not initialize.")), r.onerror = () => n(/* @__PURE__ */ Error("Model runtime could not load.")), document.head.appendChild(r);
	});
	n.allowRemoteModels = !1, n.allowLocalModels = !0, n.localModelPath = "/models/", n.useBrowserCache = !1, n.backends.onnx.wasm.wasmPaths = "/runtime/", n.backends.onnx.wasm.numThreads = 1;
	let i = await r("feature-extraction", "minilm", {
		dtype: "q8",
		device: "wasm",
		progress_callback: (t) => e?.(t.progress ? `${Math.round(t.progress)}%` : t.status)
	});
	await Wp(async (e) => (await i(e, {
		pooling: "mean",
		normalize: !0
	})).tolist());
}
async function Wp(e) {
	let t = await e(Cp.flatMap((e) => [...e.examples.positive, ...e.examples.improve]));
	zp = [];
	let n = 0;
	for (let e of Cp) for (let r = 0; r < e.examples.positive.length + e.examples.improve.length; r++) zp.push({
		theme: e.id,
		vector: t[n++]
	});
	Rp = e;
}
async function Gp(e, t) {
	if (!Rp) throw Error("The local model is not loaded.");
	let n = await Rp([e, ...t.map((e) => e.text)]), r = /* @__PURE__ */ new Map();
	t.forEach((e, t) => r.set(e.id, Math.max(r.get(e.id) ?? -1, Bp(n[0], n[t + 1]))));
	let i = [...r].sort((e, t) => t[1] - e[1]);
	return {
		id: i[0][0],
		score: i[0][1],
		margin: i[0][1] - (i[1]?.[1] ?? 0)
	};
}
async function Kp(e) {
	if (!Rp) throw Error("Semantic model is not loaded.");
	if (e.language !== "en") return Lp(e);
	let t = Ep(e.text), n = await Rp(t.map((e) => e.quote));
	return t.map((e, t) => {
		let r = Cp.map((e) => ({
			theme: e.id,
			score: Math.max(...zp.filter((t) => t.theme === e.id).map((e) => Bp(e.vector, n[t])))
		})).sort((e, t) => t.score - e.score), i = r[0].score, a = i - r[1].score, o = Fp(e.quote), s = Pp(e.quote) || i < .37 || a < .045 || Np(e.quote).length < 4 || o.theme === null && o.coverage < .2;
		return {
			...e,
			theme: s ? null : r[0].theme,
			score: i,
			margin: a,
			tone: Ip(e.quote)
		};
	});
}
//#endregion
//#region app/fieldnotes.tsx
var qp = "noor-fieldnotes-v1", Jp = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`, Yp = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), Xp = [
	se,
	me,
	xe,
	F
], Zp = [
	"overview",
	"feedback",
	"actions",
	"device"
];
function Qp(e, t) {
	let n = URL.createObjectURL(new Blob([t], { type: "application/json" })), r = document.createElement("a");
	r.href = n, r.download = e, r.click(), setTimeout(() => URL.revokeObjectURL(n), 1e3);
}
function $p(e) {
	return (/* @__PURE__ */ new Date(`${e.slice(0, 10)}T12:00:00`)).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short"
	});
}
function em({ initialView: e = "overview", initialLanguage: t } = {}) {
	let [n, r] = (0, C.useState)(wp), [i, a] = (0, C.useState)(!1), [o, s] = (0, C.useState)(e), [c, l] = (0, C.useState)(!0), [u, d] = (0, C.useState)(!1), [f, p] = (0, C.useState)(!1), [m, h] = (0, C.useState)(null), [g, _] = (0, C.useState)(!1), [v, y] = (0, C.useState)(!1), [b, x] = (0, C.useState)(""), [S, w] = (0, C.useState)(!1), [T, E] = (0, C.useState)("core"), [D, k] = (0, C.useState)(null), [ee, M] = (0, C.useState)(!1), [ne, re] = (0, C.useState)(!1), [ie, F] = (0, C.useState)("all"), [se, fe] = (0, C.useState)(""), [pe, ye] = (0, C.useState)(!1), [Te, ke] = (0, C.useState)(null), [Ae, L] = (0, C.useState)(null), [je, Me] = (0, C.useState)(""), [Ne, Pe] = (0, C.useState)(""), [Fe, Ie] = (0, C.useState)(Yp()), [Le, Re] = (0, C.useState)("none"), [ze, Be] = (0, C.useState)("Guest conversation"), [Ve, He] = (0, C.useState)("en"), [R, z] = (0, C.useState)(!1), [Ue, We] = (0, C.useState)(!1), [Ge, Ke] = (0, C.useState)(""), [qe, Je] = (0, C.useState)(!1), V = (0, C.useRef)(null), H = Sp[n.language], U = n.language === "sw", Ye = (e) => r((t) => ({
		...t,
		...e
	}));
	(0, C.useEffect)(() => {
		try {
			let e = localStorage.getItem(qp);
			e ? r({
				...Ap(JSON.parse(e)),
				...t ? { language: t } : {}
			}) : t && r((e) => ({
				...e,
				language: t
			}));
		} catch {
			Je(!0);
		}
		a(!0), l(navigator.onLine);
		let e = () => l(navigator.onLine);
		window.addEventListener("online", e), window.addEventListener("offline", e);
		let n = (e) => {
			e.preventDefault(), k(e);
		};
		return window.addEventListener("beforeinstallprompt", n), window.noorDesktop?.offlineIncluded ? (d(!0), w(!0), E("full"), Hp().then(() => y(!0)).catch(() => x("The semantic model could not load. Compact analysis remains available."))) : "serviceWorker" in navigator && "caches" in window && (navigator.serviceWorker.register("/sw.js").catch(() => {}), caches.open("noor-offline-v1").then(async (e) => {
			let t = await e.match("/offline-ready.json");
			if (t) {
				let e = await t.json();
				w(!!await (await caches.open(e.cacheName)).match("/offline/index.html")), E(e.profile === "full" ? "full" : "core"), e.profile === "full" && Hp().then(() => y(!0)).catch(() => {});
			}
		}).catch(() => {})), fetch("/evaluation.json").then((e) => e.ok ? e.json() : null).then((e) => ke(e)).catch(() => {}), () => {
			window.removeEventListener("online", e), window.removeEventListener("offline", e), window.removeEventListener("beforeinstallprompt", n);
		};
	}, [t]), (0, C.useEffect)(() => {
		if (i) try {
			localStorage.setItem(qp, JSON.stringify(n)), window.dispatchEvent(new Event("noor-feedback-updated"));
		} catch {
			Je(!0);
		}
		document.documentElement.lang = n.language;
	}, [n, i]), (0, C.useEffect)(() => {
		i && r((e) => ({
			...e,
			reviews: kp(e.reviews, e.reviews.map((e) => ({
				...e,
				analysis: Lp(e)
			})))
		}));
	}, [i]);
	let Xe = (0, C.useRef)(n.reviews);
	(0, C.useEffect)(() => {
		Xe.current = n.reviews;
	}, [n.reviews]), (0, C.useEffect)(() => {
		let e = !1;
		return i && v && (async () => {
			_(!0);
			try {
				let t = [];
				for (let e of Xe.current) t.push({
					...e,
					analysis: await Kp(e)
				});
				e || r((e) => ({
					...e,
					reviews: kp(e.reviews, t)
				}));
			} catch {
				e || (y(!1), x("Richer analysis is unavailable. Compact analysis and human review remain available."));
			} finally {
				e || _(!1);
			}
		})(), () => {
			e = !0;
		};
	}, [i, v]);
	let Ze = (0, C.useMemo)(() => Dp(n.reviews), [n.reviews]), Qe = (0, C.useMemo)(() => Op(n.reviews), [n.reviews]), $e = Qe.find((e) => e.issues >= 2) ?? Qe.find((e) => e.mentions >= 2), et = Ze.filter((e) => e.analysis?.some((e) => !e.theme)).length, nt = Qe.find((e) => e.id === m), rt = Ze.filter((e) => e.text.toLowerCase().includes(se.toLowerCase()) && (ie === "all" || (ie === "uncertain" ? e.analysis?.some((e) => !e.theme) : e.analysis?.some((e) => e.theme === ie))));
	async function it(e = v) {
		_(!0);
		try {
			let t = [];
			for (let r of n.reviews) t.push({
				...r,
				analysis: e ? await Kp(r) : Lp(r)
			});
			r((e) => ({
				...e,
				reviews: kp(e.reviews, t)
			})), B.success(U ? "Maoni yamechambuliwa." : "Feedback analyzed on this device.");
		} catch {
			B.error("Analysis could not complete. Your comments are safe.");
		} finally {
			_(!1);
		}
	}
	async function at(e = "core") {
		if (u) {
			await ot();
			return;
		}
		_(!0), x("Preparing the offline package…");
		try {
			if (!("serviceWorker" in navigator)) throw Error("Offline installation needs HTTPS or localhost. Use the deployed app or the supplied localhost package.");
			let t = await navigator.serviceWorker.ready, n = new MessageChannel(), r, i = new Promise((e, t) => {
				r = setTimeout(() => t(/* @__PURE__ */ Error("Offline setup timed out. Try again while connected.")), 18e4), n.port1.onmessage = (n) => {
					n.data.status === "progress" && x(`Saving offline files: ${n.data.done}/${n.data.total}`), n.data.status === "ready" && (clearTimeout(r), e()), n.data.status === "error" && (clearTimeout(r), t(Error(n.data.error)));
				};
			});
			if (!t.active) throw n.port1.close(), Error("Offline installation is still starting. Try again.");
			t.active.postMessage({
				type: "PREPARE_OFFLINE",
				profile: e
			}, [n.port2]), await i, n.port1.close(), w(!0), E(e), e === "full" && (x("Loading the semantic model…"), await Hp(x), y(!0), Ye({ modelReady: !0 })), x(e === "full" ? "Ready. Richer AI is saved for offline use." : "Ready. Compact AI and the notebook are saved for offline use."), B.success("Offline package is ready. Reopen it in airplane mode to check.");
		} catch (e) {
			x(e instanceof Error ? e.message : "Offline setup failed."), B.error("Setup did not finish. Your feedback is unchanged.");
		} finally {
			_(!1);
		}
	}
	async function ot() {
		_(!0), x("Loading richer analysis on this device…");
		try {
			await Hp(x), v ? await it(!0) : y(!0), Ye({ modelReady: !0 }), x(u ? "Semantic analysis is ready. All assets are included on this computer." : "Semantic analysis is ready. Save the full package for offline use."), B.success("Richer analysis loaded on this device.");
		} catch (e) {
			x(e instanceof Error ? e.message : "Model unavailable."), B.error("The semantic model could not load. Compact analysis remains available.");
		} finally {
			_(!1);
		}
	}
	async function st() {
		let e = (Ue ? Ne.split(/\n\s*\n/) : [Ne]).map(Tp).filter((e) => e.length > 2);
		if (!R || !e.length) {
			B.error("Add a comment and confirm permission.");
			return;
		}
		if (n.reviews.length + e.length > 1e3) {
			B.error("This device supports up to 1,000 comments.");
			return;
		}
		let t = e.slice(0, 100).map((e) => ({
			id: `review-${Jp()}`,
			text: e,
			date: Fe,
			rating: Le === "none" ? null : Number(Le),
			source: Tp(ze).slice(0, 100),
			synthetic: n.mode === "demo",
			consent: !0,
			language: Ve
		}));
		_(!0);
		try {
			for (let e of t) e.analysis = v ? await Kp(e) : Lp(e);
			r((e) => ({
				...e,
				reviews: [...t, ...e.reviews]
			})), Pe(""), z(!1), p(!1), B.success(`${t.length} ${U ? "maoni yamehifadhiwa" : "comment(s) saved on this device"}`);
		} catch {
			B.error("Feedback could not be analyzed. Your draft remains in the form.");
		} finally {
			_(!1);
		}
	}
	function ct(e) {
		let t = Qe.find((t) => t.id === e);
		if (n.experiments.some((t) => t.theme === e && t.status !== "complete")) {
			B.info("You already have an improvement planned for this theme.");
			return;
		}
		let i = {
			id: Jp(),
			theme: e,
			title: U ? t.actionSw : t.actionEn,
			status: "planned",
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			baselineCount: t.mentions,
			baselineIssues: t.issues,
			note: Tp(Ge)
		};
		r((e) => ({
			...e,
			experiments: [i, ...e.experiments]
		})), Ke(""), h(null), s("actions"), B.success(U ? "Mpango umehifadhiwa." : "Your decision is saved. Nothing is sent to guests.");
	}
	function lt(e, t, n, i) {
		r((r) => ({
			...r,
			reviews: r.reviews.map((r) => r.id === e ? {
				...r,
				analysis: r.analysis?.map((e, r) => r === t ? {
					...e,
					theme: n === "unknown" ? null : n,
					tone: i,
					corrected: !0
				} : e)
			} : r)
		}));
	}
	async function ut(e) {
		try {
			if (e.size > 1e7) throw Error("Backup is too large.");
			let t = Ap(JSON.parse(await e.text()));
			t.reviews = kp(t.reviews, t.reviews.map((e) => ({
				...e,
				analysis: Lp(e)
			}))), r(t), B.success("Backup restored on this device.");
		} catch (e) {
			B.error(e instanceof Error ? e.message : "Cannot restore this backup.");
		}
	}
	(0, C.useEffect)(() => {
		let e = document.modelContext;
		if (!e?.registerTool) return;
		let t = new AbortController(), n = [{
			name: "read_guest_insights",
			description: "Read current guest themes and their evidence. Does not modify feedback.",
			inputSchema: {
				type: "object",
				properties: {},
				additionalProperties: !1
			},
			annotations: {
				readOnlyHint: !0,
				untrustedContentHint: !0
			},
			execute: () => ({
				comments: Ze.length,
				themes: Qe.map((e) => ({
					theme: e.id,
					mentions: e.mentions,
					issues: e.issues,
					quotes: e.evidence.slice(0, 3).map((e) => e.quote)
				}))
			})
		}, {
			name: "stage_feedback_entry",
			description: "Open the feedback form for the operator. Does not save feedback or grant consent.",
			inputSchema: {
				type: "object",
				properties: { text: {
					type: "string",
					maxLength: 5e3
				} },
				required: ["text"],
				additionalProperties: !1
			},
			annotations: { readOnlyHint: !1 },
			execute: (e) => {
				let t = e;
				if (!t || typeof t.text != "string" || t.text.length > 5e3) throw Error("Invalid text.");
				return Pe(Tp(t.text)), z(!1), p(!0), {
					status: "staged",
					requiresHumanConsent: !0
				};
			}
		}];
		for (let r of n) try {
			Promise.resolve(e.registerTool(r, { signal: t.signal })).catch(() => {});
		} catch {}
		return () => t.abort();
	}, [Ze, Qe]);
	let W = Zp.map((e, t) => ({
		view: e,
		label: H[e],
		Icon: Xp[t]
	}));
	return /* @__PURE__ */ (0, K.jsxs)(Hf, {
		className: "noor-shell",
		style: { "--sidebar-width": "238px" },
		children: [
			/* @__PURE__ */ (0, K.jsxs)(Uf, {
				collapsible: "none",
				className: "noor-sidebar",
				children: [
					/* @__PURE__ */ (0, K.jsxs)(Wf, {
						className: "brand",
						children: [/* @__PURE__ */ (0, K.jsx)("span", {
							className: "brand-mark",
							children: "n"
						}), /* @__PURE__ */ (0, K.jsxs)("div", { children: ["FarmPilot", /* @__PURE__ */ (0, K.jsx)("span", { children: "FEEDBACK" })] })]
					}),
					/* @__PURE__ */ (0, K.jsxs)(Kf, { children: [
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "farm-label",
							children: [/* @__PURE__ */ (0, K.jsx)("span", {
								className: "farm-avatar",
								children: /* @__PURE__ */ (0, K.jsx)(ce, { size: 19 })
							}), /* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("strong", { children: n.business }), /* @__PURE__ */ (0, K.jsx)("span", { children: U ? "Daftari la wageni" : "Your guest notebook" })] })]
						}),
						/* @__PURE__ */ (0, K.jsx)("div", {
							className: "nav-caption",
							children: U ? "NAFASI YAKO" : "YOUR WORKSPACE"
						}),
						/* @__PURE__ */ (0, K.jsx)(qf, {
							className: "nav-menu",
							children: W.map(({ view: e, label: t, Icon: n }) => /* @__PURE__ */ (0, K.jsx)(Jf, { children: /* @__PURE__ */ (0, K.jsxs)(Xf, {
								isActive: o === e,
								onClick: () => s(e),
								className: "nav-button",
								children: [
									/* @__PURE__ */ (0, K.jsx)(n, { size: 19 }),
									/* @__PURE__ */ (0, K.jsx)("span", { children: t }),
									e === "feedback" && /* @__PURE__ */ (0, K.jsx)("b", { children: Ze.length })
								]
							}) }, e))
						}),
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "sidebar-note",
							children: [/* @__PURE__ */ (0, K.jsx)(he, { size: 24 }), /* @__PURE__ */ (0, K.jsx)("p", { children: U ? "Kila maoni yanaweza kuanzisha kitu kizuri." : "Every guest’s words can be the start of something good." })]
						})
					] }),
					/* @__PURE__ */ (0, K.jsxs)(Gf, {
						className: "side-bottom",
						children: [/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "device-badge",
							children: [/* @__PURE__ */ (0, K.jsx)(be, { size: 17 }), /* @__PURE__ */ (0, K.jsx)("span", { children: U ? "AI kwenye kifaa chako" : "AI on your device" })]
						}), /* @__PURE__ */ (0, K.jsxs)("button", {
							onClick: () => s("device"),
							children: [
								/* @__PURE__ */ (0, K.jsx)("span", {
									className: "avatar",
									children: "N"
								}),
								/* @__PURE__ */ (0, K.jsxs)("span", { children: ["Noor", /* @__PURE__ */ (0, K.jsx)("small", { children: U ? "Mmiliki wa shamba" : "Farm owner" })] }),
								/* @__PURE__ */ (0, K.jsx)(j, { size: 17 })
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, K.jsxs)("div", {
				className: "main-area",
				children: [
					/* @__PURE__ */ (0, K.jsxs)("header", {
						className: "topbar",
						children: [/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "breadcrumb",
							children: [
								"Fieldnotes ",
								/* @__PURE__ */ (0, K.jsx)("span", { children: "/" }),
								" ",
								/* @__PURE__ */ (0, K.jsx)("strong", { children: H[o] })
							]
						}), /* @__PURE__ */ (0, K.jsxs)("div", {
							className: "top-controls",
							children: [
								/* @__PURE__ */ (0, K.jsxs)("span", {
									className: `network ${c ? "" : "offline"}`,
									children: [c ? /* @__PURE__ */ (0, K.jsx)(De, { size: 15 }) : /* @__PURE__ */ (0, K.jsx)(Ee, { size: 15 }), /* @__PURE__ */ (0, K.jsx)("span", { children: u ? U ? "Programu ya ndani" : "Local app" : c ? H.online : H.offline })]
								}),
								/* @__PURE__ */ (0, K.jsxs)("button", {
									className: "language-button",
									onClick: () => Ye({ language: U ? "en" : "sw" }),
									"aria-label": U ? "Switch to English" : "Badilisha lugha kuwa Kiswahili",
									children: [/* @__PURE__ */ (0, K.jsx)(oe, { size: 16 }), U ? "Kiswahili" : "English"]
								}),
								/* @__PURE__ */ (0, K.jsx)("span", {
									className: "avatar small",
									children: "N"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, K.jsx)("nav", {
						className: "mobile-nav",
						"aria-label": "Main navigation",
						children: W.map(({ view: e, label: t, Icon: n }) => /* @__PURE__ */ (0, K.jsxs)("button", {
							className: o === e ? "active" : "",
							onClick: () => s(e),
							children: [/* @__PURE__ */ (0, K.jsx)(n, { size: 19 }), /* @__PURE__ */ (0, K.jsx)("span", { children: t })]
						}, e))
					}),
					/* @__PURE__ */ (0, K.jsxs)("main", {
						className: "workspace",
						children: [
							qe && /* @__PURE__ */ (0, K.jsx)("div", {
								className: "notice error",
								children: "Storage is unavailable or full. Export a backup before closing this page."
							}),
							n.mode === "demo" && /* @__PURE__ */ (0, K.jsxs)("div", {
								className: "demo-notice",
								children: [
									/* @__PURE__ */ (0, K.jsx)(ae, { size: 16 }),
									/* @__PURE__ */ (0, K.jsx)("span", { children: H.demo }),
									/* @__PURE__ */ (0, K.jsxs)("button", {
										onClick: () => re(!0),
										children: [H.own, /* @__PURE__ */ (0, K.jsx)(j, { size: 14 })]
									})
								]
							}),
							/* @__PURE__ */ (0, K.jsxs)("div", {
								className: "page-heading",
								children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [
									/* @__PURE__ */ (0, K.jsx)("div", {
										className: "eyebrow",
										children: o === "overview" ? U ? "DAFTARI LA WIKI" : "YOUR WEEKLY FIELDNOTES" : H[o].toUpperCase()
									}),
									/* @__PURE__ */ (0, K.jsx)("h1", { children: o === "overview" ? H.title : H[o] }),
									/* @__PURE__ */ (0, K.jsx)("p", { children: o === "overview" ? H.subtitle : o === "feedback" ? H.local : o === "actions" ? H.actionHelp : U ? "Andaa matumizi bila mtandao na linda maoni yako." : "Keep your notebook available, even without a connection." })
								] }), /* @__PURE__ */ (0, K.jsx)("div", {
									className: "heading-actions",
									children: o !== "device" && /* @__PURE__ */ (0, K.jsxs)("button", {
										className: "primary",
										onClick: () => p(!0),
										children: [/* @__PURE__ */ (0, K.jsx)(ge, { size: 18 }), H.add]
									})
								})]
							}),
							o === "overview" && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
								/* @__PURE__ */ (0, K.jsx)("div", {
									className: "stats-row",
									children: [
										[
											H.guests,
											Ze.length,
											me
										],
										[
											H.themes,
											Qe.filter((e) => e.mentions).length,
											O
										],
										[
											H.needs,
											et,
											I
										],
										[
											H.improvements,
											n.experiments.length,
											xe
										]
									].map(([e, t, r], i) => /* @__PURE__ */ (0, K.jsxs)("div", {
										className: "stat",
										children: [
											/* @__PURE__ */ (0, K.jsx)("span", {
												className: `stat-icon color-${i}`,
												children: /* @__PURE__ */ (0, K.jsx)(r, { size: 19 })
											}),
											/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("span", { children: e }), /* @__PURE__ */ (0, K.jsx)("strong", { children: t })] }),
											i === 0 && /* @__PURE__ */ (0, K.jsx)("span", {
												className: "stat-tag",
												children: n.mode === "demo" ? "DEMO" : "LOCAL"
											})
										]
									}, e))
								}),
								/* @__PURE__ */ (0, K.jsxs)("div", {
									className: "overview-grid",
									children: [/* @__PURE__ */ (0, K.jsxs)("section", {
										className: "recommendation",
										children: [/* @__PURE__ */ (0, K.jsxs)("div", {
											className: "card-top",
											children: [/* @__PURE__ */ (0, K.jsxs)("span", {
												className: "label",
												children: [/* @__PURE__ */ (0, K.jsx)(le, { size: 16 }), H.recommended]
											}), /* @__PURE__ */ (0, K.jsx)("span", {
												className: "pill light",
												children: U ? "Wewe unaamua" : "Your decision"
											})]
										}), $e ? /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
											/* @__PURE__ */ (0, K.jsx)("div", {
												className: "recommend-icon",
												children: /* @__PURE__ */ (0, K.jsx)(xe, { size: 30 })
											}),
											/* @__PURE__ */ (0, K.jsx)("h2", { children: U ? $e.actionSw : $e.actionEn }),
											/* @__PURE__ */ (0, K.jsx)("p", { children: U ? `Maoni ${$e.mentions} yanahusu mada hii. ${$e.issues} yanaomba mabadiliko.` : `${$e.mentions} distinct comments mention ${$e.en.toLowerCase()}. ${$e.issues} comments suggest something could be better.` }),
											/* @__PURE__ */ (0, K.jsx)("div", {
												className: "recommend-quotes",
												children: $e.evidence.filter((e) => e.tone === "improve").slice(0, 2).map((e, t) => /* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)(_e, { size: 16 }), /* @__PURE__ */ (0, K.jsxs)("p", { children: [
													"“",
													e.quote,
													"”"
												] })] }, t))
											}),
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "recommend-bottom",
												children: [/* @__PURE__ */ (0, K.jsxs)("span", { children: [/* @__PURE__ */ (0, K.jsx)(N, { size: 15 }), $e.effort] }), /* @__PURE__ */ (0, K.jsxs)("button", {
													className: "lime",
													onClick: () => {
														h($e.id), Ke("");
													},
													children: [H.review, /* @__PURE__ */ (0, K.jsx)(j, { size: 16 })]
												})]
											})
										] }) : /* @__PURE__ */ (0, K.jsxs)("div", {
											className: "empty-inline",
											children: [
												/* @__PURE__ */ (0, K.jsx)("h2", { children: H.empty }),
												/* @__PURE__ */ (0, K.jsx)("p", { children: H.emptyHint }),
												/* @__PURE__ */ (0, K.jsx)("button", {
													className: "lime",
													onClick: () => p(!0),
													children: H.add
												})
											]
										})]
									}), /* @__PURE__ */ (0, K.jsxs)("section", {
										className: "panel theme-panel",
										children: [
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "panel-heading",
												children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("h2", { children: U ? "Wageni wanataja nini?" : "What guests are talking about" }), /* @__PURE__ */ (0, K.jsx)("p", { children: H.statHint })] }), /* @__PURE__ */ (0, K.jsx)("span", {
													className: "icon-outline",
													children: /* @__PURE__ */ (0, K.jsx)(O, { size: 18 })
												})]
											}),
											/* @__PURE__ */ (0, K.jsx)("div", {
												className: "theme-bars",
												children: Qe.map((e) => /* @__PURE__ */ (0, K.jsxs)("button", {
													className: "theme-row",
													onClick: () => h(e.id),
													children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [
														/* @__PURE__ */ (0, K.jsx)("span", {
															className: "theme-dot",
															style: { background: e.color }
														}),
														/* @__PURE__ */ (0, K.jsx)("span", { children: U ? e.sw : e.en }),
														/* @__PURE__ */ (0, K.jsx)("strong", { children: e.mentions })
													] }), /* @__PURE__ */ (0, K.jsx)("div", {
														className: "bar-track",
														children: /* @__PURE__ */ (0, K.jsx)("div", { style: {
															width: `${Ze.length ? e.mentions / Ze.length * 100 : 0}%`,
															background: e.color
														} })
													})]
												}, e.id))
											}),
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "legend",
												children: [/* @__PURE__ */ (0, K.jsxs)("span", { children: [/* @__PURE__ */ (0, K.jsx)("i", { className: "legend-dot" }), U ? "Idadi ya maoni tofauti" : "Number of distinct comments"] }), /* @__PURE__ */ (0, K.jsxs)("button", {
													onClick: () => it(),
													disabled: g,
													children: [
														g ? /* @__PURE__ */ (0, K.jsx)(ue, {
															className: "spin",
															size: 14
														}) : /* @__PURE__ */ (0, K.jsx)(ae, { size: 14 }),
														" ",
														g ? H.analyzing : H.analyze
													]
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, K.jsxs)("div", {
									className: "section-heading",
									children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("h2", { children: U ? "Sikiliza kwa karibu" : "A closer listen" }), /* @__PURE__ */ (0, K.jsx)("p", { children: U ? "Maneno ya wageni, pamoja na muktadha." : "Guest words, with the context that matters." })] }), /* @__PURE__ */ (0, K.jsxs)("button", {
										className: "text-button",
										onClick: () => s("feedback"),
										children: [U ? "Maoni yote" : "View all feedback", /* @__PURE__ */ (0, K.jsx)(j, { size: 15 })]
									})]
								}),
								/* @__PURE__ */ (0, K.jsx)("div", {
									className: "feedback-preview",
									children: Ze.slice(0, 3).map((e) => /* @__PURE__ */ (0, K.jsx)(tm, {
										review: e,
										c: H,
										sw: U,
										onOpen: () => {
											s("feedback"), fe(e.text.slice(0, 30));
										}
									}, e.id))
								}),
								/* @__PURE__ */ (0, K.jsxs)("div", {
									className: "bottom-note",
									children: [
										/* @__PURE__ */ (0, K.jsx)(be, { size: 16 }),
										/* @__PURE__ */ (0, K.jsxs)("span", { children: [
											H.local,
											" ",
											U ? "Hakuna kinachotumwa kiotomatiki." : "Nothing is sent automatically."
										] }),
										/* @__PURE__ */ (0, K.jsxs)("span", { children: [
											v ? "Semantic AI" : "Compact AI",
											" · ",
											(Mp / 1024).toFixed(0),
											" KB compact model"
										] })
									]
								})
							] }),
							o === "feedback" && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
								/* @__PURE__ */ (0, K.jsxs)("div", {
									className: "feedback-toolbar",
									children: [
										/* @__PURE__ */ (0, K.jsxs)("div", {
											className: "search-box",
											children: [
												/* @__PURE__ */ (0, K.jsx)(ve, { size: 17 }),
												/* @__PURE__ */ (0, K.jsx)("input", {
													"aria-label": "Search comments",
													placeholder: U ? "Tafuta maoni…" : "Search guest words…",
													value: se,
													onChange: (e) => fe(e.target.value)
												}),
												se && /* @__PURE__ */ (0, K.jsx)("button", {
													"aria-label": "Clear search",
													onClick: () => fe(""),
													children: /* @__PURE__ */ (0, K.jsx)(Oe, { size: 15 })
												})
											]
										}),
										/* @__PURE__ */ (0, K.jsxs)(mp, {
											value: ie,
											onValueChange: F,
											children: [/* @__PURE__ */ (0, K.jsx)(gp, {
												className: "filter-select",
												children: /* @__PURE__ */ (0, K.jsx)(hp, {})
											}), /* @__PURE__ */ (0, K.jsxs)(_p, { children: [
												/* @__PURE__ */ (0, K.jsx)(vp, {
													value: "all",
													children: H.all
												}),
												/* @__PURE__ */ (0, K.jsx)(vp, {
													value: "uncertain",
													children: H.ask
												}),
												Cp.map((e) => /* @__PURE__ */ (0, K.jsx)(vp, {
													value: e.id,
													children: U ? e.sw : e.en
												}, e.id))
											] })]
										}),
										/* @__PURE__ */ (0, K.jsxs)("button", {
											className: "secondary",
											disabled: g,
											onClick: () => it(),
											children: [
												g ? /* @__PURE__ */ (0, K.jsx)(ue, {
													className: "spin",
													size: 17
												}) : /* @__PURE__ */ (0, K.jsx)(ae, { size: 17 }),
												" ",
												H.analyze
											]
										})
									]
								}),
								/* @__PURE__ */ (0, K.jsxs)("p", {
									className: "count-line",
									children: [
										rt.length,
										" ",
										U ? "maoni" : "comments",
										" · ",
										n.reviews.length - Ze.length,
										" ",
										U ? "nakala au yaliyofichwa" : "duplicates or excluded comments"
									]
								}),
								/* @__PURE__ */ (0, K.jsxs)("div", {
									className: "review-list",
									children: [rt.map((e) => /* @__PURE__ */ (0, K.jsxs)("article", {
										className: "panel full-review",
										children: [
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "review-meta",
												children: [
													/* @__PURE__ */ (0, K.jsx)("span", {
														className: "guest-avatar",
														children: /* @__PURE__ */ (0, K.jsx)(me, { size: 17 })
													}),
													/* @__PURE__ */ (0, K.jsxs)("span", { children: [e.synthetic ? H.synthetic : e.source, /* @__PURE__ */ (0, K.jsxs)("small", { children: [
														$p(e.date),
														" · ",
														e.language === "en" ? "English" : e.language === "sw" ? "Kiswahili" : "Other language"
													] })] }),
													/* @__PURE__ */ (0, K.jsx)("span", {
														className: "stars",
														children: e.rating ? Array.from({ length: e.rating }, (e, t) => /* @__PURE__ */ (0, K.jsx)(Se, {
															size: 13,
															fill: "currentColor"
														}, t)) : null
													}),
													/* @__PURE__ */ (0, K.jsx)("button", {
														className: "icon-button",
														"aria-label": "Delete comment",
														onClick: () => r((t) => ({
															...t,
															reviews: t.reviews.filter((t) => t.id !== e.id)
														})),
														children: /* @__PURE__ */ (0, K.jsx)(Ce, { size: 16 })
													})
												]
											}),
											/* @__PURE__ */ (0, K.jsx)("p", {
												className: "original",
												children: e.text
											}),
											e.analysis?.map((t, n) => /* @__PURE__ */ (0, K.jsxs)("div", {
												className: "analysis-row",
												children: [
													/* @__PURE__ */ (0, K.jsx)("span", {
														className: `tone-pill ${t.theme ? t.tone : "uncertain"}`,
														children: t.theme ? U ? Cp.find((e) => e.id === t.theme).sw : Cp.find((e) => e.id === t.theme).en : H.ask
													}),
													/* @__PURE__ */ (0, K.jsxs)("span", {
														className: "analysis-tone",
														children: [H[t.tone], t.corrected ? " · Human corrected" : ""]
													}),
													/* @__PURE__ */ (0, K.jsxs)(mp, {
														value: t.theme ?? "unknown",
														onValueChange: (r) => lt(e.id, n, r, t.tone),
														children: [/* @__PURE__ */ (0, K.jsx)(gp, {
															className: "correction-select",
															"aria-label": H.correction,
															children: /* @__PURE__ */ (0, K.jsx)(hp, {})
														}), /* @__PURE__ */ (0, K.jsxs)(_p, { children: [/* @__PURE__ */ (0, K.jsx)(vp, {
															value: "unknown",
															children: H.unknown
														}), Cp.map((e) => /* @__PURE__ */ (0, K.jsx)(vp, {
															value: e.id,
															children: U ? e.sw : e.en
														}, e.id))] })]
													}),
													/* @__PURE__ */ (0, K.jsxs)(mp, {
														value: t.tone,
														onValueChange: (r) => lt(e.id, n, t.theme ?? "unknown", r),
														children: [/* @__PURE__ */ (0, K.jsx)(gp, {
															className: "tone-select",
															"aria-label": "Correct feedback tone",
															children: /* @__PURE__ */ (0, K.jsx)(hp, {})
														}), /* @__PURE__ */ (0, K.jsx)(_p, { children: [
															"positive",
															"improve",
															"uncertain"
														].map((e) => /* @__PURE__ */ (0, K.jsx)(vp, {
															value: e,
															children: H[e]
														}, e)) })]
													})
												]
											}, n))
										]
									}, e.id)), !rt.length && /* @__PURE__ */ (0, K.jsx)(nm, {
										title: H.empty,
										text: H.emptyHint,
										onAdd: () => p(!0),
										label: H.add
									})]
								})
							] }),
							o === "actions" && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [n.experiments.length ? /* @__PURE__ */ (0, K.jsx)("div", {
								className: "experiment-list",
								children: n.experiments.map((e) => {
									let t = Cp.find((t) => t.id === e.theme), n = Qe.find((t) => t.id === e.theme);
									return /* @__PURE__ */ (0, K.jsxs)("section", {
										className: "panel experiment",
										children: [
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "experiment-heading",
												children: [/* @__PURE__ */ (0, K.jsx)("span", {
													className: "experiment-icon",
													children: /* @__PURE__ */ (0, K.jsx)(xe, { size: 24 })
												}), /* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("span", {
													className: `status-pill ${e.status}`,
													children: e.status === "complete" ? H.completed : e.status === "active" ? H.active : H.planned
												}), /* @__PURE__ */ (0, K.jsx)("h2", { children: U ? t.actionSw : t.actionEn })] })]
											}),
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "experiment-evidence",
												children: [
													/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("span", { children: U ? "Maoni kabla ya mpango" : "Comments when planned" }), /* @__PURE__ */ (0, K.jsx)("strong", { children: e.baselineCount })] }),
													/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("span", { children: U ? "Maombi ya mabadiliko kabla" : "Requests for change then" }), /* @__PURE__ */ (0, K.jsx)("strong", { children: e.baselineIssues })] }),
													/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("span", { children: U ? "Maoni ya mada hii sasa" : "Theme comments now" }), /* @__PURE__ */ (0, K.jsx)("strong", { children: n.mentions })] })
												]
											}),
											/* @__PURE__ */ (0, K.jsx)("p", { children: e.note || H.actionHelp }),
											e.result && /* @__PURE__ */ (0, K.jsxs)("div", {
												className: "outcome-note",
												children: [/* @__PURE__ */ (0, K.jsx)(te, { size: 19 }), /* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("strong", { children: U ? "Matokeo uliyorekodi" : "Your recorded outcome" }), /* @__PURE__ */ (0, K.jsx)("p", { children: e.result })] })]
											}),
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "experiment-footer",
												children: [
													/* @__PURE__ */ (0, K.jsxs)("span", { children: [
														$p(e.createdAt),
														" · ",
														U ? "Uamuzi wako" : "Approved by you"
													] }),
													e.status === "planned" && /* @__PURE__ */ (0, K.jsx)("button", {
														className: "primary",
														onClick: () => r((t) => ({
															...t,
															experiments: t.experiments.map((t) => t.id === e.id ? {
																...t,
																status: "active",
																startedAt: (/* @__PURE__ */ new Date()).toISOString()
															} : t)
														})),
														children: H.start
													}),
													e.status === "active" && /* @__PURE__ */ (0, K.jsx)("button", {
														className: "primary",
														onClick: () => {
															Me(""), L(e);
														},
														children: H.complete
													}),
													/* @__PURE__ */ (0, K.jsx)("button", {
														className: "text-button",
														onClick: () => h(e.theme),
														children: H.evidence
													})
												]
											})
										]
									}, e.id);
								})
							}) : /* @__PURE__ */ (0, K.jsx)(nm, {
								title: H.noActions,
								text: H.await,
								onAdd: () => {
									s("overview");
								},
								label: H.overview
							}), /* @__PURE__ */ (0, K.jsx)("p", {
								className: "honest-note",
								children: U ? "Mabadiliko ya maoni hayaonyeshi kwamba uboreshaji ndio sababu pekee. Rekodi ulichoona." : "Changes in feedback do not establish that an improvement caused the change. Record what you actually observed."
							})] }),
							o === "device" && /* @__PURE__ */ (0, K.jsxs)("div", {
								className: "device-grid",
								children: [
									/* @__PURE__ */ (0, K.jsxs)("section", {
										className: "panel offline-panel",
										children: [
											/* @__PURE__ */ (0, K.jsx)("span", {
												className: "large-device-icon",
												children: /* @__PURE__ */ (0, K.jsx)(Ee, { size: 30 })
											}),
											/* @__PURE__ */ (0, K.jsx)("h2", { children: u ? U ? "Yote yamehifadhiwa kwenye kompyuta hii" : "Everything is included on this computer" : S ? H.ready : H.download }),
											/* @__PURE__ */ (0, K.jsx)("p", { children: u ? U ? "Programu na AI zote zipo hapa. Maoni na mipango vinafanya kazi bila mtandao." : "The app and both AI models are bundled. Analyze comments and make decisions without an internet connection." : U ? "Hifadhi programu na AI kwenye simu wakati mtandao upo. Baada ya hapo, uchambuzi na mipango vinafanya kazi bila mtandao." : "Save the app and AI while you have a connection. After setup, analyze new comments and make decisions without internet." }),
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "package-details",
												children: [
													/* @__PURE__ */ (0, K.jsxs)("span", { children: ["Core offline notebook", /* @__PURE__ */ (0, K.jsx)("strong", { children: "~2.4 MB · compact AI" })] }),
													/* @__PURE__ */ (0, K.jsxs)("span", { children: ["Compact model", /* @__PURE__ */ (0, K.jsxs)("strong", { children: [(Mp / 1024).toFixed(1), " KB · included"] })] }),
													/* @__PURE__ */ (0, K.jsxs)("span", { children: ["Semantic model", /* @__PURE__ */ (0, K.jsx)("strong", { children: "48 MB full offline package" })] }),
													/* @__PURE__ */ (0, K.jsxs)("span", { children: ["Guest feedback", /* @__PURE__ */ (0, K.jsx)("strong", { children: U ? "Kifaa hiki pekee" : "This device only" })] })
												]
											}),
											!u && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsxs)("button", {
												className: "primary wide",
												onClick: () => at("core"),
												disabled: g,
												children: [
													g ? /* @__PURE__ */ (0, K.jsx)(ue, {
														className: "spin",
														size: 18
													}) : /* @__PURE__ */ (0, K.jsx)(P, { size: 18 }),
													" ",
													g ? "Preparing…" : S ? `Offline ready (${T}) · refresh core` : H.download
												]
											}), /* @__PURE__ */ (0, K.jsxs)("button", {
												className: "secondary wide",
												disabled: g,
												onClick: () => at("full"),
												children: [/* @__PURE__ */ (0, K.jsx)(P, { size: 17 }), U ? "Hifadhi AI yenye uwezo zaidi · MB 48" : "Save richer AI offline · 48 MB"]
											})] }),
											b && /* @__PURE__ */ (0, K.jsx)("p", {
												role: "status",
												className: "setup-progress",
												children: b
											}),
											/* @__PURE__ */ (0, K.jsxs)("button", {
												className: "secondary wide",
												disabled: g,
												onClick: ot,
												children: [/* @__PURE__ */ (0, K.jsx)(ae, { size: 17 }), v ? "Refresh semantic analysis" : "Use richer on-device analysis"]
											}),
											!u && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsxs)("button", {
												className: "secondary wide",
												onClick: () => D ? D.prompt() : B.info("On Android: browser menu → Install app. On iPhone: Share → Add to Home Screen. Install after offline preparation."),
												children: [/* @__PURE__ */ (0, K.jsx)(ge, { size: 17 }), H.install]
											}), /* @__PURE__ */ (0, K.jsx)("p", {
												className: "small-note",
												children: "Initial setup needs a connection or the supplied offline package. A basic call-only phone cannot run this app. Use the household smartphone."
											})] }),
											/* @__PURE__ */ (0, K.jsx)("p", {
												className: "small-note",
												children: u ? "This desktop edition is for demonstration and operator use. The mobile web edition supports the challenge’s household smartphone workflow." : "Export a backup regularly. Browser storage can be cleared by your device."
											})
										]
									}),
									/* @__PURE__ */ (0, K.jsxs)("section", {
										className: "panel",
										children: [
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "panel-heading",
												children: [/* @__PURE__ */ (0, K.jsx)("h2", { children: H.privacy }), /* @__PURE__ */ (0, K.jsx)(de, { size: 20 })]
											}),
											/* @__PURE__ */ (0, K.jsx)("p", {
												className: "device-copy",
												children: U ? "Hakuna akaunti, hakuna kupakia maoni, hakuna matangazo. Maoni yanahifadhiwa kwenye kivinjari hiki. Mtu anayetumia simu iliyofunguliwa anaweza kuyasoma." : "No account, no feedback uploads, no advertising. Comments stay in this browser. Anyone with access to the unlocked phone can read them."
											}),
											/* @__PURE__ */ (0, K.jsxs)("ul", {
												className: "privacy-list",
												children: [
													/* @__PURE__ */ (0, K.jsxs)("li", { children: [/* @__PURE__ */ (0, K.jsx)(A, { size: 15 }), "Consent is required before saving feedback."] }),
													/* @__PURE__ */ (0, K.jsxs)("li", { children: [/* @__PURE__ */ (0, K.jsx)(A, { size: 15 }), "Email addresses and phone numbers are removed automatically."] }),
													/* @__PURE__ */ (0, K.jsxs)("li", { children: [/* @__PURE__ */ (0, K.jsx)(I, { size: 15 }), "Names and other identifiers still need manual removal."] }),
													/* @__PURE__ */ (0, K.jsxs)("li", { children: [/* @__PURE__ */ (0, K.jsx)(I, { size: 15 }), "Use the phone’s screen lock; this notebook is not encrypted."] })
												]
											}),
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "backup-buttons",
												children: [/* @__PURE__ */ (0, K.jsxs)("button", {
													className: "secondary",
													onClick: () => Qp(`fieldnotes-${Yp()}.json`, JSON.stringify(n, null, 2)),
													children: [/* @__PURE__ */ (0, K.jsx)(P, { size: 17 }), H.export]
												}), /* @__PURE__ */ (0, K.jsxs)("button", {
													className: "secondary",
													onClick: () => V.current?.click(),
													children: [/* @__PURE__ */ (0, K.jsx)(we, { size: 17 }), H.import]
												})]
											}),
											/* @__PURE__ */ (0, K.jsx)("input", {
												ref: V,
												type: "file",
												accept: "application/json,.json",
												className: "sr-only",
												onChange: (e) => {
													let t = e.target.files?.[0];
													t && ut(t), e.target.value = "";
												}
											}),
											/* @__PURE__ */ (0, K.jsxs)("button", {
												className: "danger-link",
												onClick: () => M(!0),
												children: [/* @__PURE__ */ (0, K.jsx)(Ce, { size: 15 }), H.deleteAll]
											}),
											/* @__PURE__ */ (0, K.jsxs)("label", {
												className: "field-label",
												children: [H.newBusiness, /* @__PURE__ */ (0, K.jsx)("input", {
													className: "text-input",
													maxLength: 70,
													value: n.business,
													onChange: (e) => Ye({ business: e.target.value })
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, K.jsxs)("section", {
										className: "panel provenance",
										children: [
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "panel-heading",
												children: [/* @__PURE__ */ (0, K.jsx)("h2", { children: U ? "Lugha na mipaka" : "Languages & limitations" }), /* @__PURE__ */ (0, K.jsx)(oe, { size: 20 })]
											}),
											/* @__PURE__ */ (0, K.jsx)("p", { children: "English comments are analyzed. Kiswahili operator instructions and action cards work offline. Non-English feedback is preserved for human review. Optional message translation is available in visitor requests; it does not automatically classify translated reviews." }),
											/* @__PURE__ */ (0, K.jsx)("p", { children: "The Kiswahili copy is a draft and requires native-speaker validation before field deployment. Original English evidence remains visible; a bilingual guide may be needed." }),
											/* @__PURE__ */ (0, K.jsx)("p", { children: "Demo and training comments are authored synthetic examples. They are not a customer survey. Very short, sarcastic, mixed or unrelated feedback can be misclassified." }),
											/* @__PURE__ */ (0, K.jsxs)("button", {
												className: "text-button",
												onClick: () => ye(!0),
												children: [
													/* @__PURE__ */ (0, K.jsx)(ae, { size: 16 }),
													H.heldout,
													/* @__PURE__ */ (0, K.jsx)(j, { size: 14 })
												]
											})
										]
									}),
									/* @__PURE__ */ (0, K.jsxs)("section", {
										className: "panel provenance",
										children: [
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "panel-heading",
												children: [/* @__PURE__ */ (0, K.jsx)("h2", { children: "Data & model sources" }), /* @__PURE__ */ (0, K.jsx)(O, { size: 20 })]
											}),
											/* @__PURE__ */ (0, K.jsx)("p", { children: "World Bank Small AI challenge: Noor’s tourism workflow and device constraints. Ondera is fictional; no real farm is represented." }),
											/* @__PURE__ */ (0, K.jsx)("p", { children: "Compact model: 72 authored examples, MIT. Semantic model: all-MiniLM-L6-v2, Apache 2.0. No guest comments are used to train either model." }),
											/* @__PURE__ */ (0, K.jsx)("p", { children: "Theme suggestions are fixed, editable starting points. A similarity score is not a probability of correctness. Nothing is booked, posted, or sent automatically." })
										]
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, K.jsx)(Zf, {
				open: f,
				onOpenChange: p,
				children: /* @__PURE__ */ (0, K.jsxs)(ep, {
					className: "noor-dialog",
					children: [
						/* @__PURE__ */ (0, K.jsxs)(tp, { children: [/* @__PURE__ */ (0, K.jsx)(np, { children: H.add }), /* @__PURE__ */ (0, K.jsxs)(rp, { children: [H.local, " Remove names and identifying details."] })] }),
						/* @__PURE__ */ (0, K.jsxs)("label", {
							className: "field-label",
							children: [H.text, /* @__PURE__ */ (0, K.jsx)("textarea", {
								value: Ne,
								onChange: (e) => Pe(e.target.value),
								maxLength: 5e3,
								rows: 5,
								placeholder: "The guest’s original words…"
							})]
						}),
						/* @__PURE__ */ (0, K.jsxs)("label", {
							className: "checkbox-label",
							children: [
								/* @__PURE__ */ (0, K.jsx)(xp, {
									checked: Ue,
									onCheckedChange: (e) => We(e === !0)
								}),
								H.batch,
								" ",
								/* @__PURE__ */ (0, K.jsx)("small", { children: "(separate with a blank line)" })
							]
						}),
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "form-grid",
							children: [
								/* @__PURE__ */ (0, K.jsxs)("label", {
									className: "field-label",
									children: [H.date, /* @__PURE__ */ (0, K.jsx)("input", {
										className: "text-input",
										type: "date",
										value: Fe,
										onChange: (e) => Ie(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, K.jsxs)("div", {
									className: "field-label",
									children: [H.rating, /* @__PURE__ */ (0, K.jsxs)(mp, {
										value: Le,
										onValueChange: Re,
										children: [/* @__PURE__ */ (0, K.jsx)(gp, { children: /* @__PURE__ */ (0, K.jsx)(hp, {}) }), /* @__PURE__ */ (0, K.jsxs)(_p, { children: [/* @__PURE__ */ (0, K.jsx)(vp, {
											value: "none",
											children: "Not provided"
										}), [
											1,
											2,
											3,
											4,
											5
										].map((e) => /* @__PURE__ */ (0, K.jsxs)(vp, {
											value: String(e),
											children: [e, " / 5"]
										}, e))] })]
									})]
								}),
								/* @__PURE__ */ (0, K.jsxs)("label", {
									className: "field-label",
									children: [H.sourceLabel, /* @__PURE__ */ (0, K.jsx)("input", {
										className: "text-input",
										value: ze,
										onChange: (e) => Be(e.target.value),
										maxLength: 100
									})]
								}),
								/* @__PURE__ */ (0, K.jsxs)("div", {
									className: "field-label",
									children: ["Feedback language", /* @__PURE__ */ (0, K.jsxs)(mp, {
										value: Ve,
										onValueChange: He,
										children: [/* @__PURE__ */ (0, K.jsx)(gp, { children: /* @__PURE__ */ (0, K.jsx)(hp, {}) }), /* @__PURE__ */ (0, K.jsxs)(_p, { children: [
											/* @__PURE__ */ (0, K.jsx)(vp, {
												value: "en",
												children: "English"
											}),
											/* @__PURE__ */ (0, K.jsx)(vp, {
												value: "sw",
												children: "Kiswahili · human review"
											}),
											/* @__PURE__ */ (0, K.jsx)(vp, {
												value: "other",
												children: "Other · human review"
											})
										] })]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, K.jsxs)("label", {
							className: "checkbox-label consent-label",
							children: [/* @__PURE__ */ (0, K.jsx)(xp, {
								checked: R,
								onCheckedChange: (e) => z(e === !0)
							}), /* @__PURE__ */ (0, K.jsx)("span", { children: H.consent })]
						}),
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "dialog-actions",
							children: [/* @__PURE__ */ (0, K.jsx)("button", {
								className: "secondary",
								onClick: () => p(!1),
								children: H.cancel
							}), /* @__PURE__ */ (0, K.jsxs)("button", {
								className: "primary",
								disabled: !R || !Ne.trim() || g,
								onClick: st,
								children: [
									g ? /* @__PURE__ */ (0, K.jsx)(ue, {
										size: 17,
										className: "spin"
									}) : /* @__PURE__ */ (0, K.jsx)(A, { size: 17 }),
									" ",
									H.save
								]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, K.jsx)(Zf, {
				open: !!m,
				onOpenChange: (e) => !e && h(null),
				children: /* @__PURE__ */ (0, K.jsxs)(ep, {
					className: "noor-dialog evidence-dialog",
					children: [/* @__PURE__ */ (0, K.jsxs)(tp, { children: [/* @__PURE__ */ (0, K.jsx)(np, { children: nt ? U ? nt.sw : nt.en : H.details }), /* @__PURE__ */ (0, K.jsxs)(rp, { children: [
						H.await,
						" ",
						H.actionHelp
					] })] }), nt && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "evidence-summary",
							children: [
								/* @__PURE__ */ (0, K.jsx)("strong", { children: nt.mentions }),
								/* @__PURE__ */ (0, K.jsx)("span", { children: U ? "maoni yanataja mada hii" : "distinct comments mention this theme" }),
								/* @__PURE__ */ (0, K.jsxs)("span", {
									className: "tone-pill improve",
									children: [
										nt.issues,
										" ",
										U ? "mabadiliko" : "requests for change"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, K.jsx)("div", {
							className: "evidence-scroll",
							children: nt.evidence.map((e, t) => /* @__PURE__ */ (0, K.jsxs)("div", {
								className: "evidence-quote",
								children: [/* @__PURE__ */ (0, K.jsxs)("p", { children: [
									"“",
									e.quote,
									"”"
								] }), /* @__PURE__ */ (0, K.jsxs)("span", { children: [
									$p(e.review.date),
									" · ",
									e.review.synthetic ? H.synthetic : e.review.source,
									" · ",
									H[e.tone]
								] })]
							}, t))
						}),
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "suggestion-box",
							children: [/* @__PURE__ */ (0, K.jsx)(le, { size: 20 }), /* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("span", { children: U ? "Pendekezo" : "A suggestion to consider" }), /* @__PURE__ */ (0, K.jsx)("strong", { children: U ? nt.actionSw : nt.actionEn })] })]
						}),
						/* @__PURE__ */ (0, K.jsxs)("label", {
							className: "field-label",
							children: [H.note, /* @__PURE__ */ (0, K.jsx)("textarea", {
								rows: 2,
								value: Ge,
								onChange: (e) => Ke(e.target.value),
								placeholder: U ? "Utafanya nini, na lini?" : "What would you change, and when?",
								maxLength: 1e3
							})]
						}),
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "dialog-actions",
							children: [/* @__PURE__ */ (0, K.jsx)("button", {
								className: "secondary",
								onClick: () => h(null),
								children: H.cancel
							}), /* @__PURE__ */ (0, K.jsxs)("button", {
								className: "primary",
								disabled: !nt.mentions,
								onClick: () => ct(nt.id),
								children: [/* @__PURE__ */ (0, K.jsx)(A, { size: 17 }), H.plan]
							})]
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, K.jsx)(Zf, {
				open: !!Ae,
				onOpenChange: (e) => !e && L(null),
				children: /* @__PURE__ */ (0, K.jsxs)(ep, {
					className: "noor-dialog",
					children: [
						/* @__PURE__ */ (0, K.jsxs)(tp, { children: [/* @__PURE__ */ (0, K.jsx)(np, { children: H.complete }), /* @__PURE__ */ (0, K.jsx)(rp, { children: "Describe what you changed and what you observed. Avoid assuming that the change caused an outcome." })] }),
						/* @__PURE__ */ (0, K.jsx)("textarea", {
							"aria-label": "Observed outcome",
							rows: 5,
							value: je,
							onChange: (e) => Me(e.target.value),
							maxLength: 2e3
						}),
						/* @__PURE__ */ (0, K.jsx)("button", {
							className: "primary",
							disabled: !je.trim(),
							onClick: () => {
								r((e) => ({
									...e,
									experiments: e.experiments.map((e) => e.id === Ae?.id ? {
										...e,
										status: "complete",
										result: Tp(je)
									} : e)
								})), L(null);
							},
							children: U ? "Hifadhi matokeo" : "Save observed outcome"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, K.jsx)(Zf, {
				open: pe,
				onOpenChange: ye,
				children: /* @__PURE__ */ (0, K.jsxs)(ep, {
					className: "noor-dialog",
					children: [/* @__PURE__ */ (0, K.jsxs)(tp, { children: [/* @__PURE__ */ (0, K.jsx)(np, { children: "Evaluation & evidence" }), /* @__PURE__ */ (0, K.jsx)(rp, { children: "Small authored test suite. This is a prototype check, not field validation." })] }), Te ? /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "evaluation-stats",
							children: [
								/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("strong", { children: Te.total }), /* @__PURE__ */ (0, K.jsx)("span", { children: "test comments" })] }),
								/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsxs)("strong", { children: [Math.round(Te.semanticAccuracy * 100), "%"] }), /* @__PURE__ */ (0, K.jsx)("span", { children: "semantic exact accuracy" })] }),
								/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsxs)("strong", { children: [Math.round(Te.baselineAccuracy * 100), "%"] }), /* @__PURE__ */ (0, K.jsx)("span", { children: "keyword baseline" })] })
							]
						}),
						/* @__PURE__ */ (0, K.jsx)("p", { children: "Cases include paraphrases, unknown topics, terse comments and unsupported languages. Uncertain cases must abstain. Tone uses explicit cues and is not a validated sentiment model." }),
						/* @__PURE__ */ (0, K.jsxs)("p", { children: [
							"Compact fallback exact accuracy: ",
							Math.round(Te.compactAccuracy * 100),
							"%. It favors abstention; accepted-case accuracy is measured separately. Test labels and results are provided in the source package. Real visitor data, device tests and native-language review remain necessary."
						] }),
						/* @__PURE__ */ (0, K.jsx)("a", {
							className: "text-button",
							href: "/evaluation.json",
							download: !0,
							children: "Download complete evaluation"
						})
					] }) : /* @__PURE__ */ (0, K.jsx)("p", { children: "Evaluation results will be available after the build checks finish." })]
				})
			}),
			/* @__PURE__ */ (0, K.jsx)(ip, {
				open: ee,
				onOpenChange: M,
				children: /* @__PURE__ */ (0, K.jsxs)(sp, { children: [/* @__PURE__ */ (0, K.jsxs)(cp, { children: [/* @__PURE__ */ (0, K.jsx)(up, { children: H.deleteAll }), /* @__PURE__ */ (0, K.jsx)(dp, { children: "This removes feedback and plans from this browser. Exported backups remain wherever you saved them. Offline app files remain installed." })] }), /* @__PURE__ */ (0, K.jsxs)(lp, { children: [/* @__PURE__ */ (0, K.jsx)(pp, { children: H.cancel }), /* @__PURE__ */ (0, K.jsx)(fp, {
					onClick: () => {
						r({
							...wp,
							reviews: [],
							experiments: [],
							mode: "own",
							language: n.language,
							business: n.business
						}), B.success("Feedback and plans deleted.");
					},
					children: H.delete
				})] })] })
			}),
			/* @__PURE__ */ (0, K.jsx)(ip, {
				open: ne,
				onOpenChange: re,
				children: /* @__PURE__ */ (0, K.jsxs)(sp, { children: [/* @__PURE__ */ (0, K.jsxs)(cp, { children: [/* @__PURE__ */ (0, K.jsx)(up, { children: H.own }), /* @__PURE__ */ (0, K.jsx)(dp, { children: "Start an empty notebook. This removes the example comments and existing plans from this device. Export anything you want to keep first." })] }), /* @__PURE__ */ (0, K.jsxs)(lp, { children: [/* @__PURE__ */ (0, K.jsx)(pp, { children: H.cancel }), /* @__PURE__ */ (0, K.jsx)(fp, {
					onClick: () => {
						r({
							...wp,
							reviews: [],
							experiments: [],
							mode: "own",
							language: n.language,
							business: n.business
						}), p(!0);
					},
					children: "Start my notebook"
				})] })] })
			}),
			/* @__PURE__ */ (0, K.jsx)(tt, {
				position: "bottom-right",
				richColors: !0
			})
		]
	});
}
function tm({ review: e, c: t, sw: n, onOpen: r }) {
	let i = e.analysis?.find((e) => e.theme);
	return /* @__PURE__ */ (0, K.jsxs)("button", {
		className: "panel preview-card",
		onClick: r,
		children: [
			/* @__PURE__ */ (0, K.jsxs)("div", {
				className: "preview-meta",
				children: [
					/* @__PURE__ */ (0, K.jsx)("span", {
						className: "guest-avatar",
						children: /* @__PURE__ */ (0, K.jsx)(me, { size: 16 })
					}),
					/* @__PURE__ */ (0, K.jsxs)("span", { children: [e.synthetic ? t.synthetic : e.source, /* @__PURE__ */ (0, K.jsx)("small", { children: $p(e.date) })] }),
					/* @__PURE__ */ (0, K.jsxs)("span", {
						className: "stars",
						children: [/* @__PURE__ */ (0, K.jsx)(Se, {
							size: 12,
							fill: "currentColor"
						}), e.rating ?? "—"]
					})
				]
			}),
			/* @__PURE__ */ (0, K.jsxs)("p", { children: [
				"“",
				e.text,
				"”"
			] }),
			/* @__PURE__ */ (0, K.jsxs)("div", {
				className: "preview-footer",
				children: [/* @__PURE__ */ (0, K.jsx)("span", {
					className: `tone-pill ${i?.tone ?? "uncertain"}`,
					children: i ? n ? Cp.find((e) => e.id === i.theme).sw : Cp.find((e) => e.id === i.theme).en : t.ask
				}), /* @__PURE__ */ (0, K.jsx)(j, { size: 15 })]
			})
		]
	});
}
function nm({ title: e, text: t, onAdd: n, label: r }) {
	return /* @__PURE__ */ (0, K.jsxs)("div", {
		className: "panel empty-state",
		children: [
			/* @__PURE__ */ (0, K.jsx)(he, { size: 38 }),
			/* @__PURE__ */ (0, K.jsx)("h2", { children: e }),
			/* @__PURE__ */ (0, K.jsx)("p", { children: t }),
			/* @__PURE__ */ (0, K.jsx)("button", {
				className: "primary",
				onClick: n,
				children: r
			})
		]
	});
}
//#endregion
//#region lib/workflow.ts
var rm = {
	en: "English",
	sw: "Kiswahili",
	fr: "Français",
	es: "Español"
};
function im(e) {
	return typeof e == "string" && Object.hasOwn(rm, e);
}
function am(e, t, n) {
	let r = e;
	if (!r || typeof r.original != "string" || !r.original.trim() || r.original.length > 1e3 || !im(r.source) || !im(r.target) || r.target !== n || r.text !== t || !Array.isArray(r.models) || r.models.length > 2 || r.models.some((e) => typeof e != "string" || e.length > 150) || typeof r.reviewedAt != "string" || !Number.isFinite(Date.parse(r.reviewedAt))) throw Error("Review the translated reply again before saving.");
	return {
		original: r.original,
		source: r.source,
		target: r.target,
		text: r.text,
		models: r.models,
		reviewedAt: r.reviewedAt
	};
}
var om = () => globalThis.crypto.randomUUID(), sm = () => (/* @__PURE__ */ new Date()).toISOString(), cm = (e, t = 2e3) => typeof e == "string" ? e.trim().slice(0, t) : "";
function lm(e) {
	return e.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email removed]").replace(/(?:\+?\d[\d\s().-]{7,}\d)/g, "[phone removed]");
}
var um = {
	revision: 0,
	name: "Ondera Coffee Farm",
	intro: "Walk the coffee slopes, hear the story behind the harvest, and share a freshly prepared cup. Choose a small-group visit built around the activities you enjoy.",
	introSw: "Tembea shambani, sikiliza hadithi ya mavuno na uonje kahawa. Chagua shughuli unazopenda kwa ziara ya kikundi kidogo.",
	country: "Demonstration location",
	location: "Ondera highlands · fictional location",
	directions: "Demonstration only. An actual meeting point, transport information and landmark directions must be approved before accepting real visits.",
	directionsSw: "Mfano tu. Mahali pa kukutana na maelekezo halisi lazima yaidhinishwe kabla ya kupokea wageni.",
	accessibility: "Sloped farm paths. Access arrangements and facilities need operator confirmation.",
	accessibilitySw: "Njia za shamba zina mteremko. Thibitisha mahitaji ya ufikivu na mwenye shamba.",
	phone: "",
	email: "",
	currency: "KES",
	capacity: 8,
	days: [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	startTimes: [
		"09:00",
		"11:00",
		"14:00"
	],
	languages: ["English", "Kiswahili"],
	activities: [
		{
			id: "walk",
			name: "Coffee farm walk",
			nameSw: "Matembezi shambani",
			minutes: 45,
			price: 600,
			enabled: !0
		},
		{
			id: "story",
			name: "From berry to cup",
			nameSw: "Kutoka tunda hadi kikombe",
			minutes: 20,
			price: 250,
			enabled: !0
		},
		{
			id: "tasting",
			name: "Coffee tasting",
			nameSw: "Kuonja kahawa",
			minutes: 25,
			price: 350,
			enabled: !0
		}
	],
	publishedAt: null,
	demo: !0
}, dm = (e, t) => new Intl.NumberFormat("en", {
	style: "currency",
	currency: t,
	maximumFractionDigits: 0
}).format(e);
function fm(e) {
	if (!e || typeof e != "object") throw Error("Invalid experience details.");
	let t = e;
	if (!cm(t.name, 100) || !Array.isArray(t.activities) || t.activities.length > 20) throw Error("Add a business name and up to 20 activities.");
	if (!Number.isInteger(t.capacity) || t.capacity < 1 || t.capacity > 100) throw Error("Capacity must be between 1 and 100.");
	if (!/^[A-Z]{3}$/.test(t.currency) || !Array.isArray(t.days) || !t.days.length || t.days.some((e) => !Number.isInteger(e) || e < 0 || e > 6)) throw Error("Check the currency and visiting days.");
	try {
		dm(0, t.currency);
	} catch {
		throw Error("Choose a valid currency.");
	}
	if (!Array.isArray(t.startTimes) || !t.startTimes.length || t.startTimes.length > 12 || t.startTimes.some((e) => !/^([01]\d|2[0-3]):[0-5]\d$/.test(e))) throw Error("Add valid visiting times.");
	let n = /* @__PURE__ */ new Set(), r = t.activities.map((e) => {
		if (!e || !/^[-\w]{1,60}$/.test(e.id) || n.has(e.id) || !cm(e.name, 100) || !Number.isInteger(e.minutes) || e.minutes < 5 || e.minutes > 480 || !Number.isInteger(e.price) || e.price < 0 || e.price > 1e6) throw Error("Check each activity name, duration and whole-unit price.");
		return n.add(e.id), {
			id: e.id,
			name: cm(e.name, 100),
			nameSw: cm(e.nameSw, 100),
			minutes: e.minutes,
			price: e.price,
			enabled: e.enabled === !0
		};
	});
	return {
		...t,
		revision: Number.isInteger(t.revision) && t.revision >= 0 ? t.revision : 0,
		name: cm(t.name, 100),
		intro: cm(t.intro),
		introSw: cm(t.introSw),
		country: cm(t.country, 100),
		location: cm(t.location, 300),
		directions: cm(t.directions),
		directionsSw: cm(t.directionsSw),
		accessibility: cm(t.accessibility),
		accessibilitySw: cm(t.accessibilitySw),
		phone: cm(t.phone, 40),
		email: cm(t.email, 150),
		languages: Array.isArray(t.languages) ? t.languages.map((e) => cm(e, 40)).filter(Boolean).slice(0, 10) : ["English"],
		activities: r,
		days: [...new Set(t.days)],
		startTimes: [...new Set(t.startTimes)],
		publishedAt: typeof t.publishedAt == "string" ? t.publishedAt : null,
		demo: t.demo === !0
	};
}
function pm(e, t, n) {
	if (!Number.isInteger(n) || n < 1 || n > e.capacity) throw Error(`Choose 1–${e.capacity} visitors.`);
	let r = e.activities.filter((e) => e.enabled && t.includes(e.id));
	if (!r.length || new Set(t).size !== t.length || r.length !== t.length) throw Error("Choose available activities.");
	return {
		total: r.reduce((e, t) => e + t.price, 0) * n,
		minutes: r.reduce((e, t) => e + t.minutes, 0),
		selected: r
	};
}
function mm(e, t, n) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) throw Error("Choose a date.");
	let r = /* @__PURE__ */ new Date(`${t}T12:00:00Z`);
	if (!Number.isFinite(r.getTime()) || r.toISOString().slice(0, 10) !== t || t < (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)) throw Error("Choose a current or future date.");
	if (!e.days.includes(r.getUTCDay()) || !e.startTimes.includes(n)) throw Error("Choose an available visiting day and time.");
}
function hm(e, t, n) {
	let r = e ?? {};
	if (r.language !== void 0 && !im(r.language)) throw Error("Choose a supported message language.");
	let i = r.kind === "question" ? "question" : "visit", a = r.channel === "sms" ? "sms" : r.channel === "email" ? "email" : "website", o = cm(r.name, 100), s = cm(r.contact, 150), c = cm(r.question), l = cm(r.date, 10), u = cm(r.time, 5), d = Number(r.guests), f = Array.isArray(r.activityIds) ? r.activityIds.map((e) => cm(e, 60)) : [];
	if (!o || r.consent !== !0) throw Error("Add a name and permission to use your details for this request.");
	if (a === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) throw Error("Enter a valid email address.");
	if (a === "sms" && !/^\+?[\d ()-]{7,30}$/.test(s)) throw Error("Enter a valid phone number.");
	if (i === "question" && !c) throw Error("Enter your question.");
	let p = {
		total: 0,
		minutes: 0
	};
	i === "visit" && (mm(t, l, u), p = pm(t, f, d));
	let m = om();
	return {
		id: m,
		token: om(),
		code: m.replaceAll("-", "").slice(0, 8).toUpperCase(),
		revision: 0,
		kind: i,
		name: o,
		contact: s,
		channel: a,
		language: im(r.language) ? r.language : "en",
		question: c,
		date: i === "visit" ? l : "",
		time: i === "visit" ? u : "",
		guests: i === "visit" ? d : 0,
		activityIds: i === "visit" ? f : [],
		special: cm(r.special),
		source: cm(r.source, 80) || "Website",
		status: "requested",
		...p,
		currency: t.currency,
		reply: "",
		createdAt: sm(),
		quoteExpiresAt: null,
		consent: !0,
		demo: n
	};
}
var gm = (e) => Number(e.slice(0, 2)) * 60 + Number(e.slice(3, 5));
function _m(e, t, n, r = "", i = 1) {
	let a = gm(n), o = a + i;
	return e.filter((e) => e.id !== r && e.date === t && e.status === "confirmed" && gm(e.time) < o && gm(e.time) + e.minutes > a).reduce((e, t) => e + t.guests, 0);
}
function vm(e, t, n, r, i = {}) {
	let a = {
		...e,
		revision: e.revision + 1
	};
	if ([
		"quote",
		"answer",
		"details",
		"decline",
		"cancel"
	].includes(t) && (delete a.replyTranslation, i.replyTranslation && (a.replyTranslation = am(i.replyTranslation, cm(i.reply), e.language))), [
		"declined",
		"cancelled",
		"expired",
		"completed"
	].includes(e.status)) throw Error("This request is closed.");
	if (t === "quote") {
		if (e.kind !== "visit" || ![
			"requested",
			"needs_details",
			"quoted"
		].includes(e.status)) throw Error("Only an open visit request can be quoted.");
		mm(n, e.date, e.time);
		let t = pm(n, e.activityIds, e.guests);
		if (a.minutes = t.minutes, gm(e.time) + t.minutes > 1440) throw Error("These activities do not fit within the visiting day.");
		if (_m(r, e.date, e.time, e.id, t.minutes) + e.guests > n.capacity) throw Error("This visiting time has insufficient capacity.");
		let o = i.total ?? e.total;
		if (!Number.isInteger(o) || o < 0 || o > 1e8) throw Error("Enter a valid whole-unit total.");
		a = {
			...a,
			status: "quoted",
			total: o,
			reply: cm(i.reply) || "Your visit request and total have been approved. Please accept this quote to confirm.",
			quoteExpiresAt: new Date(Date.now() + 48 * 36e5).toISOString()
		};
	} else if (t === "accept") {
		if (e.status !== "quoted" || !e.quoteExpiresAt || Date.parse(e.quoteExpiresAt) < Date.now()) throw Error("This quote is unavailable or expired. Request a new quote.");
		if (mm(n, e.date, e.time), _m(r, e.date, e.time, e.id, e.minutes) + e.guests > n.capacity) throw Error("This visiting time is now full. Contact the operator for another time.");
		a.status = "confirmed";
	} else if (t === "details") {
		if (![
			"requested",
			"needs_details",
			"quoted"
		].includes(e.status) || !cm(i.reply)) throw Error("Add the information you need from the visitor.");
		a = {
			...a,
			status: "needs_details",
			reply: cm(i.reply),
			quoteExpiresAt: null
		};
	} else if (t === "answer") {
		if (e.kind !== "question" || !cm(i.reply)) throw Error("Add an approved answer.");
		a = {
			...a,
			status: "completed",
			reply: cm(i.reply)
		};
	} else if (t === "decline") {
		if (e.status === "confirmed") throw Error("Use Cancel for a confirmed visit.");
		a = {
			...a,
			status: "declined",
			reply: cm(i.reply) || "The operator cannot accommodate this request."
		};
	} else if (t === "cancel") {
		if (e.status !== "confirmed" && e.status !== "quoted") throw Error("Only an agreed visit or quote can be cancelled.");
		a = {
			...a,
			status: "cancelled",
			reply: cm(i.reply) || "The visit has been cancelled."
		};
	} else if (t === "complete") {
		if (e.status !== "confirmed") throw Error("Only a confirmed visit can be completed.");
		a.status = "completed";
	} else throw Error("Unknown request action.");
	return a;
}
function ym(e, t) {
	let n = e ?? {}, r = lm(cm(n.memorable)), i = lm(cm(n.change));
	if (n.analysisConsent !== !0 || !r && !i) throw Error("Add feedback and permission for analysis.");
	return {
		id: om(),
		requestId: typeof n.requestId == "string" ? n.requestId : null,
		text: [r, i].filter(Boolean).join("\n"),
		memorable: r,
		change: i,
		source: cm(n.source, 80) || "Visitor form",
		recommend: n.recommend === "no" ? "no" : n.recommend === "maybe" ? "maybe" : "yes",
		language: n.language === "sw" ? "sw" : "en",
		analysisConsent: !0,
		testimonialConsent: n.testimonialConsent === !0,
		marketingConsent: n.marketingConsent === !0,
		createdAt: sm(),
		demo: t
	};
}
function bm(e, t, n, r) {
	return [{
		id: om(),
		at: sm(),
		action: t,
		recordId: n,
		detail: cm(r, 500)
	}, ...e.audit].slice(0, 500);
}
function xm() {
	let e = structuredClone(um), t = hm({
		name: "Example visitor",
		kind: "visit",
		channel: "website",
		date: new Date(Date.now() + 864e5 * 3).toISOString().slice(0, 10),
		time: "09:00",
		guests: 2,
		activityIds: ["walk", "tasting"],
		special: "Could we try grinding the coffee ourselves?",
		consent: !0,
		source: "Local guesthouse"
	}, e, !0);
	return {
		version: 2,
		language: "en",
		business: e,
		draft: structuredClone(e),
		requests: [t],
		feedback: [],
		subscribers: [],
		audit: [],
		reviewStep: 0,
		lastSync: null,
		mode: "demo"
	};
}
function Sm(e) {
	if (!e || typeof e != "object") throw Error("Invalid workspace backup.");
	let t = e;
	if (t.version !== 2 || !Array.isArray(t.requests) || t.requests.length > 1e3 || !Array.isArray(t.feedback) || t.feedback.length > 1e3 || !Array.isArray(t.subscribers) || t.subscribers.length > 2e3) throw Error("Unsupported or oversized workspace backup.");
	let n = (e, t = 5e3) => typeof e == "string" && e.length <= t, r = (e) => n(e, 40) && Number.isFinite(Date.parse(e)), i = /* @__PURE__ */ new Set();
	for (let e of t.requests) {
		if (e.replyTranslation !== void 0 && am(e.replyTranslation, e.reply, e.language), !e || !n(e.id, 60) || !e.id || i.has(e.id) || !n(e.token, 60) || e.token.length < 20 || !/^[A-Z0-9]{8}$/.test(e.code) || e.consent !== !0 || ![
			"requested",
			"needs_details",
			"quoted",
			"confirmed",
			"declined",
			"cancelled",
			"expired",
			"completed"
		].includes(e.status) || !["visit", "question"].includes(e.kind) || ![
			"email",
			"sms",
			"website"
		].includes(e.channel) || !im(e.language) || !Number.isInteger(e.revision) || e.revision < 0 || !Number.isInteger(e.guests) || e.guests < 0 || e.guests > 100 || !Number.isInteger(e.total) || e.total < 0 || e.total > 1e8 || !Number.isInteger(e.minutes) || e.minutes < 0 || e.minutes > 9600 || !Array.isArray(e.activityIds) || e.activityIds.length > 20 || e.activityIds.some((e) => !n(e, 60)) || !n(e.name, 100) || !n(e.contact, 150) || !n(e.reply) || !n(e.special) || !n(e.question) || !n(e.source, 80) || !n(e.date, 10) || !n(e.time, 5) || !/^[A-Z]{3}$/.test(e.currency) || !r(e.createdAt) || e.quoteExpiresAt !== null && !r(e.quoteExpiresAt) || typeof e.demo != "boolean" || e.hosted !== void 0 && typeof e.hosted != "boolean") throw Error("Invalid request in backup.");
		if (e.kind === "visit" && (!/^\d{4}-\d{2}-\d{2}$/.test(e.date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(e.time) || e.guests < 1)) throw Error("Invalid visit in backup.");
		i.add(e.id);
	}
	i.clear();
	for (let e of t.feedback) {
		if (!e || !n(e.id, 60) || !e.id || i.has(e.id) || e.requestId !== null && !n(e.requestId, 60) || e.analysisConsent !== !0 || !n(e.text) || !n(e.memorable, 2e3) || !n(e.change, 2e3) || !n(e.source, 80) || ![
			"yes",
			"maybe",
			"no"
		].includes(e.recommend) || !["en", "sw"].includes(e.language) || !r(e.createdAt) || typeof e.testimonialConsent != "boolean" || typeof e.marketingConsent != "boolean" || typeof e.demo != "boolean") throw Error("Invalid feedback in backup.");
		i.add(e.id);
	}
	i.clear();
	for (let e of t.subscribers) {
		if (!e || !n(e.id, 60) || !e.id || i.has(e.id) || !n(e.email, 150) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email) || !r(e.consentAt) || typeof e.demo != "boolean") throw Error("Invalid newsletter permission in backup.");
		i.add(e.id);
	}
	let a = Array.isArray(t.audit) ? t.audit.slice(0, 500) : [];
	if (a.some((e) => !e || !n(e.id, 60) || !r(e.at) || !n(e.action, 60) || !n(e.recordId, 60) || !n(e.detail, 500))) throw Error("Invalid decision history in backup.");
	return {
		...t,
		business: fm(t.business),
		draft: fm(t.draft),
		language: t.language === "sw" ? "sw" : "en",
		mode: t.mode === "own" ? "own" : "demo",
		audit: a,
		reviewStep: 0,
		lastSync: r(t.lastSync) ? t.lastSync : null
	};
}
function Cm(e, t) {
	let n = t === "sw";
	return `${e.name}\n\n${n ? e.introSw : e.intro}\n\n${e.location}\n\n${e.activities.filter((e) => e.enabled).map((t) => `${n ? t.nameSw : t.name}: ${t.minutes} min · ${dm(t.price, e.currency)} ${n ? "kwa mtu" : "per person"}`).join("\n")}\n\n${n ? "Wageni wengi zaidi" : "Maximum group"}: ${e.capacity}\n${n ? "Lugha" : "Languages"}: ${e.languages.join(", ")}\n${n ? "Nyakati za kuanza" : "Start times"}: ${e.startTimes.join(", ")}\n\n${n ? e.directionsSw : e.directions}\n\n${n ? e.accessibilitySw : e.accessibility}\n\n${e.phone ? `Phone: ${e.phone}\n` : ""}${e.email ? `Email: ${e.email}\n` : ""}${e.demo ? "DEMONSTRATION ONLY — fictional location and illustrative prices." : "Visits require operator confirmation."}`;
}
//#endregion
//#region lib/translation.ts
function wm(e, t) {
	return e === t ? [] : e === "en" || t === "en" ? [`${e}-${t}`] : [`${e}-en`, `en-${t}`];
}
function Tm(e, t) {
	let n = (e) => (e.match(/\d+(?:[.,:/-]\d+)*/g) ?? []).sort(), r = [];
	JSON.stringify(n(e)) !== JSON.stringify(n(t)) && r.push("Numbers, dates or times changed. Correct the translation before applying it.");
	for (let n of [
		"KES",
		"USD",
		"EUR",
		"GBP",
		"TZS",
		"UGX"
	]) {
		let i = (e) => (e.match(RegExp(`\\b${n}\\b`, "g")) ?? []).length;
		i(e) !== i(t) && r.push(`Check the currency ${n}.`);
	}
	return t.trim() || r.push("The translation is empty."), r;
}
var Em, Dm = 0, Om = /* @__PURE__ */ new Map();
function km(e, t = {}, n) {
	return Em || (Em = new Worker("/translation/worker.js", { type: "module" }), Em.onmessage = ({ data: e }) => {
		let t = Om.get(e.id);
		if (t) {
			if (e.progress) {
				t.progress?.(e.progress);
				return;
			}
			Om.delete(e.id), e.error ? t.reject(Error(e.error)) : t.resolve(e.result);
		}
	}, Em.onerror = () => {
		for (let e of Om.values()) e.reject(/* @__PURE__ */ Error("Translation could not start on this device. Your original message is unchanged."));
		Om.clear(), Em?.terminate(), Em = void 0;
	}), new Promise((r, i) => {
		let a = ++Dm;
		Om.set(a, {
			resolve: (e) => r(e),
			reject: i,
			progress: n
		}), Em.postMessage({
			id: a,
			op: e,
			...t
		});
	});
}
var Am = () => km("status"), jm = (e, t) => km("install", { pairs: e }, t), Mm = (e, t) => km("import", { archive: e }, t), Nm = () => km("remove"), Pm = (e, t, n, r) => km("translate", {
	input: e,
	source: t,
	target: n
}, r);
//#endregion
//#region app/translation-panel.tsx
function Fm({ incoming: e, language: t, sw: n, onApply: r }) {
	let [i, a] = (0, C.useState)(t), [o, s] = (0, C.useState)(n ? "sw" : "en"), [c, l] = (0, C.useState)(""), [u, d] = (0, C.useState)(""), [f, p] = (0, C.useState)(""), [m, h] = (0, C.useState)([]), [g, _] = (0, C.useState)(""), [v, y] = (0, C.useState)(""), [b, x] = (0, C.useState)(!1), [S, w] = (0, C.useState)(!1), [T, E] = (0, C.useState)(""), [D, O] = (0, C.useState)([]), k = (0, C.useRef)(0);
	(0, C.useEffect)(() => (Am().then(O).catch((e) => E(e.message)), () => {
		k.current++;
	}), []);
	function A() {
		k.current++, l(""), p(""), y(""), _(""), x(!1);
	}
	let ee = [...new Set([
		...wm(i, o),
		...wm(o, t),
		...wm(t, o)
	])], j = D.filter((e) => ee.includes(e.pair) && !e.installed);
	async function M() {
		w(!0), E("");
		try {
			await jm(j.map((e) => e.pair), E), O(await Am()), E(n ? "Lugha zimehifadhiwa kwa matumizi bila intaneti." : "Language packs saved for offline use.");
		} catch (e) {
			E(e.message);
		} finally {
			w(!1);
		}
	}
	async function te(e) {
		w(!0), E("");
		try {
			await Mm(e, E), E(n ? "Lugha zimehifadhiwa bila kutuma ujumbe wako." : "Verified languages saved on this device. Your messages were not uploaded.");
		} catch (e) {
			E(e.message);
		} finally {
			O(await Am().catch(() => [])), w(!1);
		}
	}
	async function ne(r) {
		let a = ++k.current;
		w(!0), E(""), x(!1);
		try {
			let s = r ? u : e, c = await Pm(s, r ? o : i, r ? t : o, (e) => {
				k.current === a && E(e);
			});
			if (a !== k.current) return;
			r ? (y(s), h(c.models), p(c.text), _("")) : l(c.text), E(n ? "Kagua maana, bei, tarehe na saa." : "Check meaning, prices, dates and times before using the draft.");
		} catch (e) {
			a === k.current && E(e.message);
		} finally {
			w(!1);
		}
	}
	let N = Tm(v, f), P = Object.entries(rm).map(([e, t]) => /* @__PURE__ */ (0, K.jsx)("option", {
		value: e,
		children: t
	}, e));
	return /* @__PURE__ */ (0, K.jsxs)("details", {
		className: "translation-panel",
		children: [/* @__PURE__ */ (0, K.jsx)("summary", { children: n ? "Tafsiri ujumbe na jibu" : "Translate message and reply" }), /* @__PURE__ */ (0, K.jsxs)("div", {
			className: "translation-content",
			children: [
				/* @__PURE__ */ (0, K.jsxs)("div", {
					className: "t-form-grid",
					children: [/* @__PURE__ */ (0, K.jsxs)("label", {
						className: "t-field",
						children: [/* @__PURE__ */ (0, K.jsx)("span", { children: n ? "Lugha ya ujumbe" : "Message language" }), /* @__PURE__ */ (0, K.jsx)("select", {
							value: i,
							disabled: S,
							onChange: (e) => {
								a(e.target.value), A();
							},
							children: P
						})]
					}), /* @__PURE__ */ (0, K.jsxs)("label", {
						className: "t-field",
						children: [/* @__PURE__ */ (0, K.jsx)("span", { children: n ? "Lugha yangu" : "My language" }), /* @__PURE__ */ (0, K.jsx)("select", {
							value: o,
							disabled: S,
							onChange: (e) => {
								s(e.target.value), A();
							},
							children: P
						})]
					})]
				}),
				j.length > 0 && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
					j.every((e) => e.downloadAvailable !== !1) && /* @__PURE__ */ (0, K.jsxs)("button", {
						type: "button",
						className: "t-button",
						disabled: S,
						onClick: M,
						children: [
							n ? "Hifadhi lugha zilizopo" : "Install available languages",
							" · ",
							Math.ceil(j.reduce((e, t) => e + t.bytes, 0) / 1048576),
							" MB"
						]
					}),
					/* @__PURE__ */ (0, K.jsxs)("label", {
						className: "t-field",
						children: [/* @__PURE__ */ (0, K.jsx)("span", { children: n ? "Pakia faili ya lugha" : "Load a language file" }), /* @__PURE__ */ (0, K.jsx)("input", {
							type: "file",
							accept: ".zip,application/zip",
							disabled: S,
							onChange: (e) => {
								let t = e.target.files?.[0];
								e.target.value = "", t && te(t);
							}
						})]
					}),
					/* @__PURE__ */ (0, K.jsx)("p", {
						className: "t-muted",
						children: n ? "Chagua FarmPilot_Models_Swahili.zip, French.zip au Spanish.zip. Faili hubaki kwenye kifaa hiki." : "Choose a provided FarmPilot_Models_Swahili.zip, French.zip or Spanish.zip. You can load each file separately; it stays on this device."
					})
				] }),
				/* @__PURE__ */ (0, K.jsx)("p", {
					className: "t-muted",
					children: n ? "Tafsiri hufanywa kwenye kifaa hiki baada ya kuhifadhi lugha mara moja. Lugha zingine hupitia Kiingereza; tafsiri inaweza kukosea." : "Translation runs on this device after installing languages once. A language file can be copied from another device. Some pairs go through English. Machine drafts may contain errors."
				}),
				e && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)("button", {
					type: "button",
					className: "t-button",
					disabled: S || j.length > 0,
					onClick: () => ne(!1),
					children: n ? "Tafsiri ujumbe uliopokelewa" : "Translate received message"
				}), c && /* @__PURE__ */ (0, K.jsxs)("div", {
					className: "translation-result",
					children: [
						/* @__PURE__ */ (0, K.jsx)("strong", { children: n ? "Tafsiri ya kusaidia kusoma" : "Reading translation" }),
						/* @__PURE__ */ (0, K.jsx)("p", { children: c }),
						Tm(e, c).map((e) => /* @__PURE__ */ (0, K.jsx)("p", {
							className: "translation-warning",
							role: "alert",
							children: e
						}, e))
					]
				})] }),
				/* @__PURE__ */ (0, K.jsxs)("label", {
					className: "t-field",
					children: [/* @__PURE__ */ (0, K.jsx)("span", { children: n ? "Andika jibu kwa lugha yako" : "Write a reply in your language" }), /* @__PURE__ */ (0, K.jsx)("textarea", {
						value: u,
						maxLength: 1e3,
						disabled: S,
						onChange: (e) => {
							d(e.target.value), k.current++, p(""), x(!1);
						}
					})]
				}),
				/* @__PURE__ */ (0, K.jsxs)("button", {
					type: "button",
					className: "t-button",
					disabled: S || !u.trim() || j.length > 0,
					onClick: () => ne(!0),
					children: [
						n ? "Tafsiri jibu" : "Translate reply",
						" · ",
						rm[t]
					]
				}),
				f && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
					/* @__PURE__ */ (0, K.jsxs)("label", {
						className: "t-field",
						children: [/* @__PURE__ */ (0, K.jsx)("span", { children: n ? "Kagua na urekebishe tafsiri" : "Review and edit the translated reply" }), /* @__PURE__ */ (0, K.jsx)("textarea", {
							value: f,
							maxLength: 2e3,
							disabled: S,
							onChange: (e) => {
								p(e.target.value), _(""), x(!1);
							}
						})]
					}),
					/* @__PURE__ */ (0, K.jsx)("button", {
						type: "button",
						className: "t-button",
						disabled: S,
						onClick: async () => {
							let e = ++k.current;
							w(!0);
							try {
								let n = await Pm(f, t, o, E);
								e === k.current && _(n.text);
							} catch (e) {
								E(e.message);
							} finally {
								w(!1);
							}
						},
						children: n ? "Tafsiri kurudi kwa ukaguzi" : "Translate back to check meaning"
					}),
					g && /* @__PURE__ */ (0, K.jsxs)("div", {
						className: "translation-result",
						children: [/* @__PURE__ */ (0, K.jsx)("strong", { children: n ? "Ukaguzi wa tafsiri" : "Back translation · a second machine draft" }), /* @__PURE__ */ (0, K.jsx)("p", { children: g })]
					}),
					N.map((e) => /* @__PURE__ */ (0, K.jsx)("p", {
						role: "alert",
						className: "translation-warning",
						children: e
					}, e)),
					/* @__PURE__ */ (0, K.jsxs)("label", {
						className: "t-check",
						children: [/* @__PURE__ */ (0, K.jsx)("input", {
							type: "checkbox",
							checked: b,
							onChange: (e) => x(e.target.checked)
						}), n ? "Nimekagua maana na maelezo ya jibu." : "I have checked the meaning and booking details."]
					}),
					/* @__PURE__ */ (0, K.jsx)("button", {
						type: "button",
						className: "t-button primary",
						disabled: S || !b || N.length > 0,
						onClick: () => {
							r(f, {
								original: v,
								source: o,
								target: t,
								text: f,
								models: m,
								reviewedAt: (/* @__PURE__ */ new Date()).toISOString()
							}), E(n ? "Jibu limewekwa. Idhinisha ombi ili kulihifadhi." : "Reply applied. Approve the request to save your decision.");
						},
						children: n ? "Tumia jibu hili" : "Use reviewed reply"
					})
				] }),
				/* @__PURE__ */ (0, K.jsx)("p", {
					role: "status",
					"aria-live": "polite",
					children: S ? T || (n ? "Inaendelea…" : "Working…") : T
				})
			]
		})]
	});
}
//#endregion
//#region app/translation-storage.tsx
function Im({ sw: e }) {
	let [t, n] = (0, C.useState)([]), [r, i] = (0, C.useState)("");
	return (0, C.useEffect)(() => {
		Am().then(n).catch((e) => i(e.message));
	}, []), /* @__PURE__ */ (0, K.jsxs)("div", {
		className: "t-card",
		children: [
			/* @__PURE__ */ (0, K.jsx)("h3", { children: e ? "Lugha za tafsiri" : "Translation languages" }),
			/* @__PURE__ */ (0, K.jsx)("p", { children: e ? "Pakia faili za lugha kwenye ombi unapozihitaji." : "Load language files from a request when you need them. Desktop installers include the models. Each direction stays on this device." }),
			/* @__PURE__ */ (0, K.jsx)("div", {
				className: "device-lines",
				children: t.map((t) => /* @__PURE__ */ (0, K.jsxs)("span", { children: [t.label, /* @__PURE__ */ (0, K.jsx)("strong", { children: t.installed ? e ? "Imehifadhiwa" : "Installed" : `${Math.ceil(t.bytes / 1048576)} MB` })] }, t.pair))
			}),
			/* @__PURE__ */ (0, K.jsx)("button", {
				className: "t-button secondary",
				type: "button",
				disabled: !t.some((e) => e.installed),
				onClick: async () => {
					try {
						await Nm(), n(await Am()), i(e ? "Lugha zimeondolewa. Ujumbe wako umehifadhiwa." : "Language downloads removed. Your messages remain saved.");
					} catch (e) {
						i(e.message);
					}
				},
				children: e ? "Ondoa lugha zilizopakuliwa" : "Remove downloaded languages"
			}),
			/* @__PURE__ */ (0, K.jsx)("p", {
				role: "status",
				children: r
			})
		]
	});
}
//#endregion
//#region lib/faq.ts
var Lm = [
	{
		id: "activities",
		en: [
			"What can we do on the farm?",
			"Which activities do you offer?",
			"Tell me about the coffee experience."
		],
		sw: /\bshughuli\b/
	},
	{
		id: "price",
		en: [
			"How much does the visit cost?",
			"What is the price per person?",
			"Is tasting included in the ticket?"
		],
		sw: /bei|gharama|malipo/
	},
	{
		id: "duration",
		en: [
			"How long does the experience take?",
			"What is the duration of the tour?",
			"How much time should we allow?"
		],
		sw: /muda|dakika/
	},
	{
		id: "directions",
		en: [
			"How do we get to the farm?",
			"Where is the meeting point?",
			"Can you send directions and transport information?"
		],
		sw: /wapi|maelekezo|kufika/
	},
	{
		id: "access",
		en: [
			"Is the farm accessible for wheelchair users?",
			"Are there steep paths or places to rest?",
			"What access arrangements are available?"
		],
		sw: /ufikivu|mteremko|kiti/
	},
	{
		id: "languages",
		en: [
			"What languages are spoken?",
			"Can the guide speak Swahili?",
			"Do you offer an English visit?"
		],
		sw: /lugha|kiswahili|kiingereza/
	}
];
async function Rm(e, t, n, r) {
	let i = e.trim();
	if (i.length < 5 || i.length > 500 || /[\u0370-\u1fff\u2e80-\uffff]/.test(i) || /\b(available|availability|tomorrow|today|saturday|sunday|book|discount|refund|allerg\w*|safe|safety|medical|sick|children|kids|pets|dogs|lunch|food|vegan|vegetarian|insurance|parking|toilets?)\b|kesho|leo|nafasi|punguzo/i.test(i)) return {
		answer: null,
		method: "human"
	};
	let a, o = "reviewed phrase";
	if (n === "sw") {
		let e = Lm.filter((e) => e.sw.test(i.toLowerCase()));
		e.length === 1 && (a = e[0].id);
	} else if (r) {
		let e = await Gp(i, Lm.flatMap((e) => e.en.map((t) => ({
			id: e.id,
			text: t
		}))));
		e.score >= .52 && e.margin >= .045 && (a = e.id, o = "local semantic match");
	} else {
		let e = Object.entries({
			activities: /\b(activities|offer|do on|experience)\b/i,
			price: /\b(price|cost|much|ticket)\b/i,
			duration: /\b(long|duration|minutes|time.*allow)\b/i,
			directions: /\b(where|directions|meeting|transport|get to)\b/i,
			access: /\b(accessible|wheelchair|steep|rest)\b/i,
			languages: /\b(language|swahili|english)\b/i
		}).filter(([, e]) => e.test(i));
		e.length === 1 && (a = e[0][0]);
	}
	let s = n === "sw", c = t.activities.filter((e) => e.enabled), l = {
		activities: c.map((e) => s ? e.nameSw : e.name).join(", "),
		price: c.map((e) => `${s ? e.nameSw : e.name}: ${dm(e.price, t.currency)} ${s ? "kwa mtu" : "per person"}`).join("\n") + (s ? "\nBei ya jumla na nafasi zinahitaji idhini ya Noor." : "\nThe total and availability require Noor’s approval."),
		duration: c.map((e) => `${s ? e.nameSw : e.name}: ${e.minutes} ${s ? "dakika" : "minutes"}`).join("\n"),
		directions: s ? t.directionsSw : t.directions,
		access: s ? t.accessibilitySw : t.accessibility,
		languages: t.languages.join(", ")
	};
	return {
		answer: a && l[a] || null,
		method: o
	};
}
//#endregion
//#region app/tourism.tsx
var zm = "noor-tourism-v2", Bm = "noor-fieldnotes-v1", Vm = [
	[
		"today",
		"Today",
		"Leo",
		se
	],
	[
		"experience",
		"My experience",
		"Ziara yangu",
		ce
	],
	[
		"requests",
		"Enquiries & visits",
		"Maswali na ziara",
		k
	],
	[
		"feedback",
		"Visitor feedback",
		"Maoni ya wageni",
		me
	],
	[
		"improvements",
		"Improvements",
		"Maboresho",
		xe
	],
	[
		"publish",
		"Publish & share",
		"Chapisha na shiriki",
		oe
	],
	[
		"settings",
		"My device",
		"Kifaa changu",
		ye
	]
];
function Hm(e, t, n = "text/plain") {
	let r = document.createElement("a"), i = URL.createObjectURL(new Blob([t], { type: n }));
	r.href = i, r.download = e, r.click(), setTimeout(() => URL.revokeObjectURL(i), 1e3);
}
function Um() {
	try {
		let e = localStorage.getItem(Bm);
		return e ? Ap(JSON.parse(e)) : structuredClone(wp);
	} catch {
		return structuredClone(wp);
	}
}
function Wm() {
	return window.noorDesktop?.offlineIncluded === !0;
}
async function Gm(e, t) {
	let n = await fetch(`/api/noor/${e}`, {
		method: t ? "POST" : "GET",
		headers: t ? { "Content-Type": "application/json" } : void 0,
		body: t ? JSON.stringify(t) : void 0,
		cache: "no-store"
	}), r = await n.json();
	if (!n.ok) throw Error(r.error || "The connected service is unavailable.");
	return r;
}
var Km = (e, t) => ({
	requested: t ? "Ombi jipya" : "Requested",
	needs_details: t ? "Maelezo yanahitajika" : "Needs details",
	quoted: t ? "Bei imeidhinishwa" : "Quote ready",
	confirmed: t ? "Imethibitishwa" : "Confirmed",
	declined: t ? "Imekataliwa" : "Declined",
	cancelled: t ? "Imeghairiwa" : "Cancelled",
	expired: t ? "Imeisha muda" : "Expired",
	completed: t ? "Imekamilika" : "Completed"
})[e] || e;
function qm({ label: e, children: t }) {
	return /* @__PURE__ */ (0, K.jsxs)("label", {
		className: "t-field",
		children: [/* @__PURE__ */ (0, K.jsx)("span", { children: e }), t]
	});
}
function Jm({ visitorInitially: e = !1 }) {
	let [t, n] = (0, C.useState)(() => xm()), [r, i] = (0, C.useState)(!1), [a, o] = (0, C.useState)("today"), [s, c] = (0, C.useState)("overview"), [l, u] = (0, C.useState)(e), [d, f] = (0, C.useState)(!0), [p, m] = (0, C.useState)(!0), [h, g] = (0, C.useState)(!1), [_, v] = (0, C.useState)(!1), [y, b] = (0, C.useState)(!1), [x, S] = (0, C.useState)([]), [w, T] = (0, C.useState)(null), [E, D] = (0, C.useState)(""), [ee, j] = (0, C.useState)(""), [M, ae] = (0, C.useState)(wp), [F, I] = (0, C.useState)(!1), [le, de] = (0, C.useState)(null), [he, _e] = (0, C.useState)(""), [ve, ye] = (0, C.useState)(!1), [Se, we] = (0, C.useState)(""), [ke, Ae] = (0, C.useState)(null), [L, je] = (0, C.useState)(null), [Me, Ne] = (0, C.useState)(!1), [Pe, Fe] = (0, C.useState)(""), [Ie, Le] = (0, C.useState)(!1), [Re, ze] = (0, C.useState)(""), [Be, Ve] = (0, C.useState)([]), He = (0, C.useRef)(null), R = t.language === "sw", z = (e, t) => R ? t : e;
	(0, C.useEffect)(() => {
		try {
			let e = localStorage.getItem(zm);
			e && n(Sm(JSON.parse(e)));
			let t = localStorage.getItem("noor-visitor-receipt");
			t && je(JSON.parse(t));
		} catch {
			B.error("A saved workspace could not be read. Import a valid backup if needed.");
		}
		ae(Um()), i(!0), m(location.pathname.startsWith("/offline/") || !!Wm()), f(navigator.onLine);
		let e = () => f(navigator.onLine), t = () => ae(Um());
		return window.addEventListener("online", e), window.addEventListener("offline", e), window.addEventListener("noor-feedback-updated", t), Wm() ? (I(!0), de("full"), Hp().then(() => ye(!0)).catch(() => {})) : "serviceWorker" in navigator && (navigator.serviceWorker.register("/sw.js").catch(() => {}), caches.open("noor-offline-v1").then(async (e) => {
			let t = await e.match("/offline-ready.json");
			if (t) {
				let e = await t.json();
				I(!!await (await caches.open(e.cacheName)).match("/offline/index.html")), de(e.profile === "full" ? "full" : "core"), e.profile === "full" && Hp().then(() => ye(!0)).catch(() => {});
			}
		}).catch(() => {})), () => {
			window.removeEventListener("online", e), window.removeEventListener("offline", e), window.removeEventListener("noor-feedback-updated", t);
		};
	}, []), (0, C.useEffect)(() => {
		if (r) {
			try {
				localStorage.setItem(zm, JSON.stringify(t));
			} catch {
				B.error("Storage is full or unavailable. Export a backup before closing.");
			}
			document.documentElement.lang = t.language;
		}
	}, [r, t]);
	let Ue = (0, C.useCallback)(async () => {
		try {
			let t = await Gm("business");
			if (Ve(t.testimonials), n((e) => ({
				...e,
				business: t.business,
				...!(e.mode === "own" && t.business.demo) && e.draft.revision === e.business.revision && JSON.stringify(e.draft) === JSON.stringify(e.business) ? { draft: structuredClone(t.business) } : {}
			})), !e) {
				let e = await Gm("owner");
				Le(e.smsConfigured === !0), S(e.requests.map((e) => e.id)), n((t) => ({
					...t,
					requests: [...e.requests, ...t.requests.filter((t) => t.demo && !e.requests.some((e) => e.id === t.id))],
					feedback: [...e.feedback.map((e) => ({
						...e,
						imported: t.feedback.find((t) => t.id === e.id)?.imported === !0
					})), ...t.feedback.filter((t) => t.demo && !e.feedback.some((e) => e.id === t.id))],
					subscribers: [...e.subscribers, ...t.subscribers.filter((t) => t.demo && !e.subscribers.some((e) => e.id === t.id))],
					lastSync: sm()
				}));
			}
			g(!0), Fe("");
		} catch (e) {
			g(!1), Fe(e instanceof Error ? e.message : "Sync unavailable. Saved work remains available.");
		}
	}, [e]);
	(0, C.useEffect)(() => {
		r && !p && d && Ue();
	}, [
		r,
		p,
		d,
		Ue
	]), (0, C.useEffect)(() => {
		if (!w) return;
		let e = document.activeElement;
		return document.getElementById("request-dialog")?.focus(), () => e?.focus();
	}, [w]);
	async function We(e) {
		if (window.confirm("Delete this request and linked form feedback? This removes current records here and, for an online request, on the service. Exported backups and historic improvement notes remain separate.")) {
			v(!0);
			try {
				if (e.hosted || x.includes(e.id)) {
					if (p || !h || !d) throw Error("Connect to delete an online request.");
					await Gm("owner/delete", {
						kind: "request",
						id: e.id
					});
				}
				let r = t.feedback.filter((t) => t.requestId === e.id).map((e) => `form-${e.id}`), i = Um(), a = {
					...i,
					reviews: i.reviews.filter((e) => !r.includes(e.id))
				};
				localStorage.setItem(Bm, JSON.stringify(a)), ae(a), n((t) => ({
					...t,
					requests: t.requests.filter((t) => t.id !== e.id),
					feedback: t.feedback.filter((t) => t.requestId !== e.id),
					audit: bm(t, "delete", e.id, "Request and linked form feedback removed")
				})), S((t) => t.filter((t) => t !== e.id)), L?.id === e.id && (je(null), localStorage.removeItem("noor-visitor-receipt")), T(null), B.success("Request and linked form feedback removed.");
			} catch (e) {
				B.error(e.message);
			} finally {
				v(!1);
			}
		}
	}
	function Ge(e) {
		n((t) => ({
			...t,
			...e
		}));
	}
	function Ke(e, t, r) {
		n((n) => ({
			...n,
			audit: bm(n, e, t, r)
		}));
	}
	let qe = (0, C.useMemo)(() => Op(M.reviews), [M]), Je = t.requests.filter((e) => [
		"requested",
		"needs_details",
		"quoted"
	].includes(e.status)), V = t.requests.find((e) => e.id === w), H = qe.find((e) => e.issues >= 2) ?? qe.find((e) => e.mentions >= 2), U = (0, C.useMemo)(() => {
		let e = {};
		for (let n of t.requests) {
			let t = e[n.source] ??= {
				requests: 0,
				visits: 0
			};
			t.requests++, (n.status === "confirmed" || n.status === "completed" && n.kind === "visit") && t.visits++;
		}
		return Object.entries(e);
	}, [t.requests]), [Ye, Xe] = (0, C.useState)();
	async function Ze(e, r) {
		v(!0);
		try {
			let i, a = {
				reply: E,
				replyTranslation: Ye,
				total: ee === "" ? e.total : Number(ee)
			};
			if (e.hosted || x.includes(e.id)) {
				if (p || !h || !d) throw Error("Connect to the hosted workspace to decide on this online request. Your cached copy has not changed.");
				i = (await Gm("owner/request", {
					id: e.id,
					revision: e.revision,
					action: r,
					...a
				})).request;
			} else i = vm(e, r, t.business, t.requests, a);
			n((t) => ({
				...t,
				requests: t.requests.map((t) => t.id === e.id ? i : t),
				audit: bm(t, r, e.id, `${Km(i.status, !1)} · revision ${i.revision}`)
			})), T(null), B.success(z("Your decision is saved. The visitor can check their request status.", "Uamuzi wako umehifadhiwa."));
		} catch (e) {
			B.error(e.message);
		} finally {
			v(!1);
		}
	}
	function Qe(e) {
		T(e.id), D(e.reply), Xe(e.replyTranslation), j(String(e.total));
	}
	async function $e() {
		v(!0);
		try {
			let e = fm(t.draft);
			if (!e.activities.some((e) => e.enabled)) throw Error("Enable at least one activity.");
			if (!e.demo && (!e.phone && !e.email || !e.directions || !e.introSw || !e.directionsSw)) throw Error("Add a contact method, real directions and reviewed Swahili details before publishing your business.");
			let r = {
				...e,
				revision: t.business.revision + 1,
				publishedAt: sm()
			};
			if (h) r = (await Gm("owner/publish", {
				business: e,
				expectedRevision: t.business.revision
			})).business;
			else if (!p) throw Error("Connect to publish the website. Your draft is saved locally.");
			n((e) => ({
				...e,
				business: r,
				draft: structuredClone(r),
				audit: bm(e, "publish", String(r.revision), "Operator approved business facts and listing text")
			})), B.success(z(p ? "Approved locally. This does not publish a public website." : "Website information published.", "Maelezo yameidhinishwa."));
		} catch (e) {
			B.error(e.message);
		} finally {
			v(!1);
		}
	}
	async function et(e) {
		e.preventDefault();
		let n = new FormData(e.currentTarget), r = {
			kind: n.get("kind"),
			name: n.get("name"),
			contact: n.get("contact"),
			channel: n.get("channel"),
			language: n.get("messageLanguage") || t.language,
			date: n.get("date"),
			time: n.get("time"),
			guests: Number(n.get("guests")),
			activityIds: n.getAll("activity"),
			question: n.get("question"),
			special: n.get("special"),
			source: n.get("source"),
			consent: n.get("consent") === "on"
		};
		v(!0);
		try {
			let n = p ? hm(r, t.business, !0) : (await Gm("request", r)).request;
			Ge({ requests: [n, ...t.requests] }), je(n), localStorage.setItem("noor-visitor-receipt", JSON.stringify(n)), B.success(z("Request saved. It is awaiting Noor’s decision.", "Ombi limehifadhiwa. Linasubiri uamuzi wa Noor.")), e.target.reset();
		} catch (e) {
			B.error(e.message);
		} finally {
			v(!1);
		}
	}
	async function nt() {
		if (L) try {
			if (p && L.hosted) throw Error("Open the connected website to check this online request.");
			let e = p ? t.requests.find((e) => e.id === L.id) : (await Gm("status", {
				id: L.id,
				token: L.token
			})).request;
			if (!e) throw Error("Request not found on this device.");
			je(e), localStorage.setItem("noor-visitor-receipt", JSON.stringify(e));
		} catch (e) {
			B.error(e.message);
		}
	}
	async function rt() {
		if (L) {
			v(!0);
			try {
				if (p && L.hosted) throw Error("Open the connected website to accept this online quote.");
				let e = p ? vm(t.requests.find((e) => e.id === L.id) ?? L, "accept", t.business, t.requests) : (await Gm("accept", {
					id: L.id,
					token: L.token,
					revision: L.revision
				})).request;
				je(e), localStorage.setItem("noor-visitor-receipt", JSON.stringify(e)), n((t) => ({
					...t,
					requests: t.requests.map((t) => t.id === e.id ? e : t)
				})), B.success(z("Visit confirmed. Save your confirmation.", "Ziara imethibitishwa."));
			} catch (e) {
				B.error(e.message);
			} finally {
				v(!1);
			}
		}
	}
	async function it(e) {
		e.preventDefault();
		let n = e.currentTarget, r = new FormData(n), i = {
			memorable: r.get("memorable"),
			change: r.get("change"),
			source: r.get("source"),
			recommend: r.get("recommend"),
			language: t.language,
			requestId: L?.id,
			token: L?.token,
			analysisConsent: r.get("analysisConsent") === "on",
			testimonialConsent: r.get("testimonialConsent") === "on",
			marketingConsent: !1
		};
		v(!0);
		try {
			Ge({ feedback: [p ? ym(i, !0) : (await Gm("feedback", i)).feedback, ...t.feedback] }), n.reset(), B.success(z("Thank you. Your feedback is saved with your permissions.", "Asante. Maoni yako yamehifadhiwa."));
		} catch (e) {
			B.error(e.message);
		} finally {
			v(!1);
		}
	}
	async function at() {
		v(!0);
		try {
			let e = t.feedback.filter((e) => !e.imported), n = Um(), r = [];
			for (let t of e) {
				if (!t.analysisConsent) continue;
				let e = {
					id: `form-${t.id}`,
					text: t.text,
					date: t.createdAt.slice(0, 10),
					rating: null,
					source: `Visitor form · ${t.source}`,
					synthetic: t.demo,
					consent: !0,
					language: t.language
				};
				e.analysis = ve ? await Kp(e) : Lp(e), n.reviews.some((t) => t.id === e.id) || r.push(e);
			}
			if (n.reviews.length + r.length > 1e3) throw Error("The notebook supports up to 1,000 comments.");
			n = {
				...n,
				reviews: [...r, ...n.reviews]
			}, localStorage.setItem(Bm, JSON.stringify(n)), ae(n), Ge({ feedback: t.feedback.map((e) => ({
				...e,
				imported: !0
			})) }), window.dispatchEvent(new Event("noor-feedback-updated")), B.success(`${r.length} ${z("comments imported for local analysis.", "maoni yameingizwa.")}`), o("feedback");
		} catch (e) {
			B.error(e.message);
		} finally {
			v(!1);
		}
	}
	async function ot() {
		v(!0);
		try {
			Ae(await Rm(Se, t.business, t.language, ve));
		} catch {
			Ae({
				answer: null,
				method: "human"
			});
		} finally {
			v(!1);
		}
	}
	async function st(e = "full") {
		if (Wm()) {
			v(!0);
			try {
				await Hp(_e), ye(!0), I(!0), de("full"), _e("The bundled model is ready.");
			} catch (e) {
				_e(e.message);
			} finally {
				v(!1);
			}
			return;
		}
		v(!0), _e(e === "full" ? "Saving the app and richer local model…" : "Saving the lighter app and compact model…");
		try {
			if (!("serviceWorker" in navigator)) throw Error("Use HTTPS or localhost to install offline files.");
			let t = await new Promise((e, t) => {
				let n = setTimeout(() => t(/* @__PURE__ */ Error("Offline installation could not start. Reopen the app on HTTPS or localhost and try again.")), 15e3);
				navigator.serviceWorker.ready.then((t) => {
					clearTimeout(n), e(t);
				}, (e) => {
					clearTimeout(n), t(e);
				});
			});
			if (!t.active) throw Error("The offline installer is not active. Reopen and try again.");
			let n = new MessageChannel();
			await new Promise((r, i) => {
				let a = setTimeout(() => {
					n.port1.close(), i(/* @__PURE__ */ Error("Installation timed out. Your saved data is unchanged."));
				}, 18e4);
				n.port1.onmessage = (e) => {
					e.data.status === "progress" && _e(`Saving files ${e.data.done}/${e.data.total}`), e.data.status === "ready" && (clearTimeout(a), r()), e.data.status === "error" && (clearTimeout(a), i(Error(e.data.error)));
				}, t.active?.postMessage({
					type: "PREPARE_OFFLINE",
					profile: e
				}, [n.port2]);
			}), n.port1.close(), I(!0), de(e), e === "full" && await Hp(_e), ye(e === "full"), _e("Ready. Reopen this app in airplane mode to verify."), B.success(z("Offline package installed.", "Programu ya kutumia bila mtandao imehifadhiwa."));
		} catch (e) {
			_e(e.message);
		} finally {
			v(!1);
		}
	}
	function ct() {
		Hm("FarmPilot-backup.json", JSON.stringify({
			tourism: t,
			notebook: Um()
		}, null, 2), "application/json");
	}
	async function lt(e) {
		try {
			if (e.size > 15e6) throw Error("This backup is too large.");
			let t = JSON.parse(await e.text()), r = Sm(t.tourism), i = Ap(t.notebook);
			if (!window.confirm("Replace this device’s workspace and feedback with the backup?")) return;
			localStorage.setItem(Bm, JSON.stringify(i)), ae(i), n(r), B.success("Backup restored locally. Server records are unchanged.");
		} catch (e) {
			B.error(e.message);
		}
	}
	function ut() {
		if (!window.confirm("Start a new empty business workspace on this device? Export your current backup first.")) return;
		let e = xm();
		e.mode = "own", e.business = {
			...e.business,
			name: "My tourism experience",
			intro: "",
			introSw: "",
			country: "",
			location: "",
			phone: "",
			email: "",
			accessibility: "",
			accessibilitySw: "",
			activities: e.business.activities.map((e) => ({
				...e,
				price: 0,
				enabled: !1
			})),
			directions: "",
			directionsSw: "",
			demo: !1,
			publishedAt: null
		}, e.draft = structuredClone(e.business), e.requests = [], e.feedback = [], e.subscribers = [], e.audit = [], localStorage.setItem(Bm, JSON.stringify({
			...wp,
			business: e.business.name,
			mode: "own",
			reviews: [],
			experiments: []
		})), n(e), ae(Um()), o("experience");
	}
	async function W(e) {
		e.preventDefault();
		let n = e.currentTarget, r = new FormData(n), i = cm(r.get("email"), 150);
		try {
			if (r.get("newsletterConsent") !== "on" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)) throw Error("Add a valid email and newsletter permission.");
			let e = p ? {
				id: om(),
				email: i,
				consentAt: sm(),
				demo: !0
			} : (await Gm("subscribe", {
				email: i,
				consent: !0
			})).subscriber;
			t.subscribers.some((e) => e.email.toLowerCase() === i.toLowerCase()) || Ge({ subscribers: [e, ...t.subscribers] }), n.reset(), B.success("Signup saved. No campaign is sent automatically.");
		} catch (e) {
			B.error(e.message);
		}
	}
	let dt = (e) => {
		o(e), e === "feedback" && c("overview"), b(!1), ae(Um());
	}, G = t.business;
	async function ft(e, n) {
		try {
			if (t.feedback.find((t) => t.id === e)?.hosted) {
				if (p || !h || !d) throw Error("Connect to the hosted workspace to change this public testimonial.");
				await Gm("owner/testimonial", {
					id: e,
					published: n
				});
			}
			Ge({ feedback: t.feedback.map((t) => t.id === e ? {
				...t,
				published: n
			} : t) }), Ke("testimonial", e, n ? "Operator approved a consented public quotation" : "Public quotation removed");
		} catch (e) {
			B.error(e.message);
		}
	}
	async function pt() {
		if (!(!L || !Re.trim())) try {
			if (p && L.hosted) throw Error("Open the connected website to add details to this online request.");
			let e;
			if (p) {
				let n = t.requests.find((e) => e.id === L.id && e.token === L.token);
				if (!n || n.status !== "needs_details") throw Error("Check the current request first.");
				e = {
					...n,
					special: [n.special, Re.trim()].filter(Boolean).join("\n"),
					status: "requested",
					revision: n.revision + 1
				}, Ge({ requests: t.requests.map((t) => t.id === e.id ? e : t) });
			} else e = (await Gm("clarify", {
				id: L.id,
				token: L.token,
				revision: L.revision,
				message: Re
			})).request;
			je(e), localStorage.setItem("noor-visitor-receipt", JSON.stringify(e)), ze(""), B.success("Your additional details are saved for review.");
		} catch (e) {
			B.error(e.message);
		}
	}
	async function mt(e) {
		try {
			if (e.size > 3e3) throw Error("Invalid request key.");
			let n = JSON.parse(await e.text());
			if (typeof n.id != "string" || typeof n.token != "string") throw Error("Invalid request key.");
			let r = p ? t.requests.find((e) => e.id === n.id && e.token === n.token) : (await Gm("status", n)).request;
			if (!r) throw Error("Request not found.");
			je(r), localStorage.setItem("noor-visitor-receipt", JSON.stringify(r));
		} catch (e) {
			B.error(e.message);
		}
	}
	return r ? l ? /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsxs)("div", {
		className: "visitor-page",
		children: [
			/* @__PURE__ */ (0, K.jsxs)("header", {
				className: "visitor-header",
				children: [
					/* @__PURE__ */ (0, K.jsxs)("a", {
						href: "#experience",
						className: "t-brand",
						children: [/* @__PURE__ */ (0, K.jsx)("span", { children: "n" }), /* @__PURE__ */ (0, K.jsx)("strong", { children: G.name })]
					}),
					/* @__PURE__ */ (0, K.jsxs)("nav", { children: [
						/* @__PURE__ */ (0, K.jsx)("a", {
							href: "#experience",
							children: z("The experience", "Ziara")
						}),
						/* @__PURE__ */ (0, K.jsx)("a", {
							href: "#questions",
							children: z("Questions", "Maswali")
						}),
						/* @__PURE__ */ (0, K.jsx)("a", {
							href: "#visit",
							children: z("Request a visit", "Omba ziara")
						})
					] }),
					/* @__PURE__ */ (0, K.jsxs)("button", {
						className: "t-button subtle",
						onClick: () => Ge({ language: R ? "en" : "sw" }),
						children: [/* @__PURE__ */ (0, K.jsx)(oe, { size: 17 }), R ? "English" : "Kiswahili"]
					}),
					!e && /* @__PURE__ */ (0, K.jsxs)("button", {
						className: "t-button subtle",
						onClick: () => u(!1),
						children: [/* @__PURE__ */ (0, K.jsx)(se, { size: 17 }), z("Workspace", "Daftari")]
					})
				]
			}),
			(G.demo || p) && /* @__PURE__ */ (0, K.jsx)("div", {
				className: "visitor-demo",
				children: z("Demonstration experience · fictional location and illustrative prices. Requests here are for testing.", "Mfano wa ziara · mahali na bei ni za mfano. Maombi ni ya majaribio.")
			}),
			/* @__PURE__ */ (0, K.jsxs)("section", {
				className: "visitor-hero",
				id: "experience",
				children: [/* @__PURE__ */ (0, K.jsxs)("div", {
					className: "visitor-hero-copy",
					children: [
						/* @__PURE__ */ (0, K.jsx)("div", {
							className: "t-eyebrow",
							children: z("A SMALL FARM. A PERSONAL EXPERIENCE.", "SHAMBA DOGO. ZIARA YA KIPEKEE.")
						}),
						/* @__PURE__ */ (0, K.jsx)("h1", { children: z("Follow the coffee.\nStay for the story.", "Fuata kahawa.\nSikiliza hadithi.") }),
						/* @__PURE__ */ (0, K.jsx)("p", { children: R ? G.introSw : G.intro }),
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "visitor-facts",
							children: [/* @__PURE__ */ (0, K.jsxs)("span", { children: [/* @__PURE__ */ (0, K.jsx)(fe, { size: 17 }), G.location || z("Location awaiting approval", "Mahali panahitaji idhini")] }), /* @__PURE__ */ (0, K.jsxs)("span", { children: [/* @__PURE__ */ (0, K.jsx)(Te, { size: 17 }), z(`Up to ${G.capacity} visitors`, `${G.capacity} wageni au chini`)] })]
						}),
						/* @__PURE__ */ (0, K.jsx)("a", {
							className: "t-button primary",
							href: "#visit",
							children: z("Plan your visit", "Panga ziara yako")
						})
					]
				}), /* @__PURE__ */ (0, K.jsxs)("figure", { children: [/* @__PURE__ */ (0, K.jsx)("img", {
					width: 1672,
					height: 941,
					src: "/farm-illustration.jpg",
					alt: z("Illustrative highland coffee farm with a tasting table", "Picha ya mfano ya shamba la kahawa na meza ya kuonja")
				}), /* @__PURE__ */ (0, K.jsx)("figcaption", { children: z("Illustrative concept image · not a photograph of Noor’s farm", "Picha ya mfano · si picha ya shamba la Noor") })] })]
			}),
			/* @__PURE__ */ (0, K.jsxs)("section", {
				className: "visitor-section",
				children: [/* @__PURE__ */ (0, K.jsxs)("div", {
					className: "t-section-title",
					children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("span", {
						className: "t-eyebrow",
						children: z("MAKE IT YOUR MORNING", "CHAGUA SHUGHULI")
					}), /* @__PURE__ */ (0, K.jsx)("h2", { children: z("Choose what you would like to explore.", "Chagua unachotaka kujifunza.") })] }), /* @__PURE__ */ (0, K.jsx)("p", { children: z("Each activity is priced per visitor. Noor confirms your visit and final quote.", "Bei ni kwa kila mgeni. Noor anathibitisha ziara na bei ya jumla.") })]
				}), /* @__PURE__ */ (0, K.jsx)("div", {
					className: "activity-grid",
					children: G.activities.filter((e) => e.enabled).map((e, t) => /* @__PURE__ */ (0, K.jsxs)("article", {
						className: "t-card activity-card",
						children: [
							/* @__PURE__ */ (0, K.jsxs)("span", {
								className: "activity-number",
								children: ["0", t + 1]
							}),
							/* @__PURE__ */ (0, K.jsx)("h3", { children: R ? e.nameSw : e.name }),
							/* @__PURE__ */ (0, K.jsxs)("p", { children: [
								/* @__PURE__ */ (0, K.jsx)(N, { size: 16 }),
								e.minutes,
								" ",
								z("minutes", "dakika")
							] }),
							/* @__PURE__ */ (0, K.jsx)("strong", { children: dm(e.price, G.currency) }),
							/* @__PURE__ */ (0, K.jsx)("span", { children: z("per visitor", "kwa mgeni") })
						]
					}, e.id))
				})]
			}),
			/* @__PURE__ */ (0, K.jsx)("section", {
				className: "visitor-section testimonials",
				children: (e && !p ? Be : t.feedback.filter((e) => e.testimonialConsent && e.published)).slice(0, 3).map((e) => /* @__PURE__ */ (0, K.jsxs)("blockquote", { children: [
					"“",
					e.text,
					"”",
					/* @__PURE__ */ (0, K.jsxs)("cite", { children: [
						z("Published with visitor permission", "Imechapishwa kwa ruhusa"),
						" ",
						"· ",
						e.createdAt.slice(0, 10)
					] })
				] }, e.id))
			}),
			/* @__PURE__ */ (0, K.jsxs)("section", {
				className: "visitor-section split",
				id: "questions",
				children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [
					/* @__PURE__ */ (0, K.jsx)("span", {
						className: "t-eyebrow",
						children: z("BEFORE YOU COME", "KABLA YA KUJA")
					}),
					/* @__PURE__ */ (0, K.jsx)("h2", { children: z("A few things to know.", "Mambo ya kujua.") }),
					/* @__PURE__ */ (0, K.jsxs)("div", {
						className: "faq-fixed",
						children: [
							/* @__PURE__ */ (0, K.jsxs)("details", { children: [/* @__PURE__ */ (0, K.jsx)("summary", { children: z("Where do we meet?", "Tunakutana wapi?") }), /* @__PURE__ */ (0, K.jsx)("p", { children: R ? G.directionsSw : G.directions })] }),
							/* @__PURE__ */ (0, K.jsxs)("details", { children: [/* @__PURE__ */ (0, K.jsx)("summary", { children: z("What access arrangements are available?", "Ufikivu ukoje?") }), /* @__PURE__ */ (0, K.jsx)("p", { children: R ? G.accessibilitySw : G.accessibility })] }),
							/* @__PURE__ */ (0, K.jsxs)("details", { children: [/* @__PURE__ */ (0, K.jsx)("summary", { children: z("Which languages are available?", "Lugha zipi zinapatikana?") }), /* @__PURE__ */ (0, K.jsx)("p", { children: G.languages.join(", ") })] })
						]
					})
				] }), /* @__PURE__ */ (0, K.jsxs)("div", {
					className: "t-card faq-box",
					children: [
						/* @__PURE__ */ (0, K.jsx)("span", {
							className: "t-icon",
							children: /* @__PURE__ */ (0, K.jsx)(me, { size: 22 })
						}),
						/* @__PURE__ */ (0, K.jsx)("h3", { children: z("Ask about the experience", "Uliza kuhusu ziara") }),
						/* @__PURE__ */ (0, K.jsx)("p", { children: z("Answers come from operator-approved information. Availability and special arrangements need Noor’s decision.", "Majibu yanatokana na maelezo yaliyoidhinishwa. Nafasi na maombi maalum yanahitaji uamuzi wa Noor.") }),
						/* @__PURE__ */ (0, K.jsx)(qm, {
							label: z("Your question", "Swali lako"),
							children: /* @__PURE__ */ (0, K.jsx)("input", {
								value: Se,
								onChange: (e) => we(e.target.value),
								maxLength: 500,
								placeholder: R ? "Ziara inachukua muda gani?" : "How long does the tour take?"
							})
						}),
						/* @__PURE__ */ (0, K.jsx)("button", {
							className: "t-button primary",
							disabled: _ || !Se.trim(),
							onClick: ot,
							children: z("Ask", "Uliza")
						}),
						ke && /* @__PURE__ */ (0, K.jsx)("div", {
							className: "faq-answer",
							role: "status",
							children: ke.answer ? /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)("span", { children: z("From approved information", "Kutoka maelezo yaliyoidhinishwa") }), /* @__PURE__ */ (0, K.jsx)("p", { children: ke.answer })] }) : /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)("p", { children: z("I cannot confirm that from the available information. Please send your question to Noor.", "Siwezi kuthibitisha hilo. Tafadhali tuma swali lako kwa Noor.") }), /* @__PURE__ */ (0, K.jsx)("a", {
								href: "#enquiry",
								children: z("Send an enquiry", "Tuma swali")
							})] })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, K.jsxs)("section", {
				className: "visitor-section split",
				id: "visit",
				children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [
					/* @__PURE__ */ (0, K.jsx)("span", {
						className: "t-eyebrow",
						children: z("A VISIT MADE FOR YOUR GROUP", "ZIARA YA KIKUNDI CHAKO")
					}),
					/* @__PURE__ */ (0, K.jsx)("h2", { children: z("Request a visit.", "Omba ziara.") }),
					/* @__PURE__ */ (0, K.jsx)("p", { children: z("Choose activities and a preferred time. Your request becomes a booking only after Noor approves a quote and you accept it.", "Chagua shughuli na muda. Ziara itathibitishwa baada ya Noor kuidhinisha bei na wewe kuikubali.") }),
					/* @__PURE__ */ (0, K.jsxs)("div", {
						className: "visitor-note",
						children: [/* @__PURE__ */ (0, K.jsx)(be, { size: 20 }), /* @__PURE__ */ (0, K.jsx)("p", { children: z("No payment is collected here. Replies may take time while Noor is working on the farm.", "Hakuna malipo yanayokusanywa hapa. Majibu yanaweza kuchelewa wakati Noor anafanya kazi shambani.") })]
					}),
					G.phone && /* @__PURE__ */ (0, K.jsxs)("p", { children: [
						/* @__PURE__ */ (0, K.jsxs)("a", {
							href: `tel:${G.phone}`,
							children: [
								z("Call", "Piga simu"),
								": ",
								G.phone
							]
						}),
						" ",
						"· ",
						/* @__PURE__ */ (0, K.jsx)("a", {
							href: `sms:${G.phone}`,
							children: "SMS"
						})
					] })
				] }), /* @__PURE__ */ (0, K.jsx)(Qm, {
					business: G,
					sw: R,
					submit: et,
					busy: _
				})]
			}),
			L && /* @__PURE__ */ (0, K.jsx)("section", {
				className: "visitor-section",
				children: /* @__PURE__ */ (0, K.jsxs)("div", {
					className: "t-card receipt",
					children: [
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "t-section-title",
							children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsxs)("span", {
								className: "t-eyebrow",
								children: [
									z("YOUR REQUEST", "OMBI LAKO"),
									" ",
									L.code
								]
							}), /* @__PURE__ */ (0, K.jsx)("h2", { children: Km(L.status, R) })] }), /* @__PURE__ */ (0, K.jsx)("button", {
								className: "t-button secondary",
								onClick: nt,
								children: z("Check status", "Angalia hali")
							})]
						}),
						/* @__PURE__ */ (0, K.jsx)("p", { children: L.kind === "visit" ? `${L.date} · ${L.time} · ${L.guests} ${z("visitors", "wageni")} · ${dm(L.total, L.currency)}` : L.question }),
						L.reply && /* @__PURE__ */ (0, K.jsx)("p", {
							className: "receipt-reply",
							children: L.reply
						}),
						L.status === "needs_details" && /* @__PURE__ */ (0, K.jsxs)("div", {
							className: "t-form",
							children: [/* @__PURE__ */ (0, K.jsx)(qm, {
								label: z("Additional details for Noor", "Maelezo zaidi kwa Noor"),
								children: /* @__PURE__ */ (0, K.jsx)("textarea", {
									value: Re,
									onChange: (e) => ze(e.target.value),
									maxLength: 2e3
								})
							}), /* @__PURE__ */ (0, K.jsx)("button", {
								className: "t-button primary",
								onClick: pt,
								children: z("Send details", "Tuma maelezo")
							})]
						}),
						L.status === "quoted" && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)("p", { children: z("Review the approved total before accepting.", "Angalia bei iliyoidhinishwa kabla ya kukubali.") }), /* @__PURE__ */ (0, K.jsx)("button", {
							className: "t-button primary",
							disabled: _,
							onClick: rt,
							children: z("Accept quote and confirm visit", "Kubali bei na thibitisha ziara")
						})] }),
						/* @__PURE__ */ (0, K.jsxs)("button", {
							className: "t-button subtle",
							onClick: () => Hm(`Visit-request-${L.code}.json`, JSON.stringify({
								id: L.id,
								token: L.token
							}, null, 2), "application/json"),
							children: [/* @__PURE__ */ (0, K.jsx)(P, { size: 16 }), z("Save private request key", "Hifadhi ufunguo wa ombi")]
						}),
						/* @__PURE__ */ (0, K.jsx)("small", { children: z("Keep the request key private. This browser also saves it so you can check updates.", "Hifadhi ufunguo huu kwa siri. Kivinjari hiki pia kinauhifadhi.") })
					]
				})
			}),
			/* @__PURE__ */ (0, K.jsx)("section", {
				className: "visitor-section",
				children: /* @__PURE__ */ (0, K.jsxs)("label", {
					className: "request-key-import",
					children: [z("Have a saved request key? Restore it to check your request.", "Una ufunguo wa ombi? Urejeshe kuona hali."), /* @__PURE__ */ (0, K.jsx)("input", {
						type: "file",
						accept: "application/json",
						onChange: (e) => {
							let t = e.target.files?.[0];
							t && mt(t), e.target.value = "";
						}
					})]
				})
			}),
			/* @__PURE__ */ (0, K.jsxs)("section", {
				className: "visitor-section split",
				id: "enquiry",
				children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [
					/* @__PURE__ */ (0, K.jsx)("span", {
						className: "t-eyebrow",
						children: z("SOMETHING ELSE IN MIND?", "UNA OMBI LINGINE?")
					}),
					/* @__PURE__ */ (0, K.jsx)("h2", { children: z("Ask Noor directly.", "Muulize Noor.") }),
					/* @__PURE__ */ (0, K.jsx)("p", { children: z("For an unusual activity, access arrangement, or a question we could not answer.", "Kwa shughuli maalum, mahitaji ya ufikivu au swali lingine.") })
				] }), /* @__PURE__ */ (0, K.jsxs)("form", {
					className: "t-card t-form",
					onSubmit: et,
					children: [
						/* @__PURE__ */ (0, K.jsx)("input", {
							type: "hidden",
							name: "kind",
							value: "question"
						}),
						/* @__PURE__ */ (0, K.jsx)(Zm, { sw: R }),
						/* @__PURE__ */ (0, K.jsx)(qm, {
							label: z("Question or special request", "Swali au ombi maalum"),
							children: /* @__PURE__ */ (0, K.jsx)("textarea", {
								name: "question",
								required: !0,
								maxLength: 2e3,
								defaultValue: ke?.answer === null ? Se : ""
							})
						}),
						/* @__PURE__ */ (0, K.jsx)(Ym, {
							name: "consent",
							required: !0,
							label: z("Use my details to handle this enquiry.", "Tumia maelezo yangu kushughulikia swali hili.")
						}),
						/* @__PURE__ */ (0, K.jsx)("button", {
							className: "t-button primary",
							disabled: _,
							children: z("Send enquiry", "Tuma swali")
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, K.jsxs)("section", {
				className: "visitor-section split",
				id: "feedback",
				children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [
					/* @__PURE__ */ (0, K.jsx)("span", {
						className: "t-eyebrow",
						children: z("AFTER YOUR VISIT", "BAADA YA ZIARA")
					}),
					/* @__PURE__ */ (0, K.jsx)("h2", { children: z("What stayed with you?", "Unakumbuka nini?") }),
					/* @__PURE__ */ (0, K.jsx)("p", { children: z("Your words help Noor decide what to keep and what to improve.", "Maoni yako yanamsaidia Noor kuboresha ziara.") })
				] }), /* @__PURE__ */ (0, K.jsxs)("form", {
					className: "t-card t-form",
					onSubmit: it,
					children: [
						/* @__PURE__ */ (0, K.jsx)(qm, {
							label: z("Most memorable part", "Sehemu unayokumbuka zaidi"),
							children: /* @__PURE__ */ (0, K.jsx)("textarea", {
								name: "memorable",
								maxLength: 2e3
							})
						}),
						/* @__PURE__ */ (0, K.jsx)(qm, {
							label: z("What would you change?", "Ungebadilisha nini?"),
							children: /* @__PURE__ */ (0, K.jsx)("textarea", {
								name: "change",
								maxLength: 2e3
							})
						}),
						/* @__PURE__ */ (0, K.jsx)(Xm, { sw: R }),
						/* @__PURE__ */ (0, K.jsx)(qm, {
							label: z("Would you recommend the experience?", "Ungependekeza ziara hii?"),
							children: /* @__PURE__ */ (0, K.jsxs)("select", {
								name: "recommend",
								children: [
									/* @__PURE__ */ (0, K.jsx)("option", {
										value: "yes",
										children: z("Yes", "Ndiyo")
									}),
									/* @__PURE__ */ (0, K.jsx)("option", {
										value: "maybe",
										children: z("Maybe", "Labda")
									}),
									/* @__PURE__ */ (0, K.jsx)("option", {
										value: "no",
										children: z("No", "Hapana")
									})
								]
							})
						}),
						/* @__PURE__ */ (0, K.jsx)(Ym, {
							name: "analysisConsent",
							required: !0,
							label: z("Allow Noor to analyze this feedback.", "Ruhusu Noor kuchambua maoni haya.")
						}),
						/* @__PURE__ */ (0, K.jsx)(Ym, {
							name: "testimonialConsent",
							label: z("Allow this comment to appear as a public testimonial after review.", "Ruhusu maoni haya kuchapishwa baada ya ukaguzi.")
						}),
						/* @__PURE__ */ (0, K.jsx)("button", {
							className: "t-button primary",
							disabled: _,
							children: z("Share feedback", "Shiriki maoni")
						}),
						!p && /* @__PURE__ */ (0, K.jsx)("small", { children: z("Connected feedback requires a completed visit and its private request key.", "Maoni yanahitaji ziara iliyokamilika na ufunguo wake.") })
					]
				})]
			}),
			/* @__PURE__ */ (0, K.jsxs)("section", {
				className: "visitor-section newsletter",
				children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("h2", { children: z("An occasional note from the farm.", "Habari kutoka shambani.") }), /* @__PURE__ */ (0, K.jsx)("p", { children: z("A separate, optional signup for future news.", "Jisajili kwa hiari kwa habari za baadaye.") })] }), /* @__PURE__ */ (0, K.jsxs)("form", {
					onSubmit: W,
					children: [
						/* @__PURE__ */ (0, K.jsx)(qm, {
							label: z("Email address", "Barua pepe"),
							children: /* @__PURE__ */ (0, K.jsx)("input", {
								name: "email",
								type: "email",
								required: !0,
								maxLength: 150
							})
						}),
						/* @__PURE__ */ (0, K.jsx)(Ym, {
							name: "newsletterConsent",
							required: !0,
							label: z("I would like to receive farm news.", "Ningependa kupokea habari za shamba.")
						}),
						/* @__PURE__ */ (0, K.jsx)("button", {
							className: "t-button primary",
							children: z("Sign up", "Jisajili")
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, K.jsxs)("footer", {
				className: "visitor-footer",
				children: [
					/* @__PURE__ */ (0, K.jsx)("strong", { children: G.name }),
					/* @__PURE__ */ (0, K.jsx)("p", { children: z("Visits by request. Every arrangement needs operator confirmation.", "Ziara kwa maombi. Kila mpango unahitaji idhini.") }),
					/* @__PURE__ */ (0, K.jsx)("small", { children: z("Independent prototype. Not affiliated with or endorsed by the World Bank.", "Mfano huru. Haujaidhinishwa na Benki ya Dunia.") })
				]
			})
		]
	}), /* @__PURE__ */ (0, K.jsx)(tt, {
		richColors: !0,
		position: "bottom-right"
	})] }) : /* @__PURE__ */ (0, K.jsxs)("div", {
		className: "tourism-shell",
		children: [
			/* @__PURE__ */ (0, K.jsxs)("aside", {
				className: `t-sidebar ${y ? "mobile-open" : ""}`,
				children: [
					/* @__PURE__ */ (0, K.jsxs)("div", {
						className: "t-brand",
						children: [/* @__PURE__ */ (0, K.jsx)("span", { children: "f" }), /* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("strong", { children: "FarmPilot" }), /* @__PURE__ */ (0, K.jsx)("small", { children: "PRODUCER WORKSPACE" })] })]
					}),
					/* @__PURE__ */ (0, K.jsx)("p", {
						className: "producer-slogan",
						children: "You grow the coffee. We help brew the ideas."
					}),
					/* @__PURE__ */ (0, K.jsxs)("div", {
						className: "t-business",
						children: [/* @__PURE__ */ (0, K.jsx)(ce, { size: 20 }), /* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("strong", { children: G.name }), /* @__PURE__ */ (0, K.jsx)("small", { children: z("Your tourism workspace", "Daftari lako la utalii") })] })]
					}),
					/* @__PURE__ */ (0, K.jsx)("nav", {
						"aria-label": "Workspace",
						children: Vm.map(([e, t, n, r]) => /* @__PURE__ */ (0, K.jsxs)("button", {
							className: a === e ? "active" : "",
							onClick: () => dt(e),
							children: [
								/* @__PURE__ */ (0, K.jsx)(r, { size: 19 }),
								/* @__PURE__ */ (0, K.jsx)("span", { children: z(t, n) }),
								e === "requests" && Je.length > 0 && /* @__PURE__ */ (0, K.jsx)("b", { children: Je.length })
							]
						}, e))
					}),
					/* @__PURE__ */ (0, K.jsxs)("div", {
						className: "t-sidebar-bottom",
						children: [/* @__PURE__ */ (0, K.jsxs)("span", { children: [/* @__PURE__ */ (0, K.jsx)(be, { size: 17 }), z("Your evidence. Your decision.", "Ushahidi wako. Uamuzi wako.")] }), /* @__PURE__ */ (0, K.jsxs)("button", {
							onClick: () => u(!0),
							children: [/* @__PURE__ */ (0, K.jsx)(re, { size: 18 }), z("Visitor preview", "Mwonekano wa mgeni")]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, K.jsxs)("div", {
				className: "t-main",
				children: [/* @__PURE__ */ (0, K.jsxs)("header", {
					className: "t-topbar",
					children: [
						/* @__PURE__ */ (0, K.jsx)("button", {
							className: "t-menu",
							onClick: () => b(!y),
							"aria-label": "Toggle navigation",
							children: y ? /* @__PURE__ */ (0, K.jsx)(Oe, {}) : /* @__PURE__ */ (0, K.jsx)(pe, {})
						}),
						/* @__PURE__ */ (0, K.jsxs)("span", { children: [
							"Fieldnotes ",
							/* @__PURE__ */ (0, K.jsx)("span", {
								className: "t-slash",
								children: "/"
							}),
							" ",
							/* @__PURE__ */ (0, K.jsx)("strong", { children: z(Vm.find((e) => e[0] === a)[1], Vm.find((e) => e[0] === a)[2]) })
						] }),
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "t-top-actions",
							children: [
								/* @__PURE__ */ (0, K.jsxs)("span", {
									className: "t-connection",
									children: [d ? /* @__PURE__ */ (0, K.jsx)(De, { size: 16 }) : /* @__PURE__ */ (0, K.jsx)(Ee, { size: 16 }), /* @__PURE__ */ (0, K.jsx)("span", { children: z(d ? "Connected" : "Offline", d ? "Mtandaoni" : "Bila mtandao") })]
								}),
								/* @__PURE__ */ (0, K.jsxs)("button", {
									className: "t-button subtle",
									onClick: () => Ge({ language: R ? "en" : "sw" }),
									children: [/* @__PURE__ */ (0, K.jsx)(oe, { size: 16 }), R ? "English" : "Kiswahili"]
								}),
								/* @__PURE__ */ (0, K.jsxs)("button", {
									className: "t-button secondary",
									onClick: () => u(!0),
									children: [/* @__PURE__ */ (0, K.jsx)(re, { size: 16 }), z("Visitor view", "Mwonekano wa mgeni")]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, K.jsxs)("main", {
					className: "t-workspace",
					children: [
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "t-mode",
							children: [/* @__PURE__ */ (0, K.jsxs)("span", { children: [/* @__PURE__ */ (0, K.jsx)(O, { size: 16 }), z(t.mode === "demo" ? "Example workspace · all initial records and prices are synthetic." : "Your business workspace · keep a backup of device-local data.", t.mode === "demo" ? "Daftari la mfano · rekodi na bei ni za mfano." : "Daftari lako · hifadhi nakala ya taarifa.")] }), t.mode === "demo" && /* @__PURE__ */ (0, K.jsx)("button", {
								onClick: ut,
								children: z("Start my business", "Anza biashara yangu")
							})]
						}),
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "t-heading",
							children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [
								/* @__PURE__ */ (0, K.jsx)("span", {
									className: "t-eyebrow",
									children: z(a === "today" ? "YOUR NEXT DECISIONS" : "YOUR WORKSPACE", a === "today" ? "MAAMUZI YAKO" : "DAFTARI LAKO")
								}),
								/* @__PURE__ */ (0, K.jsx)("h1", { children: a === "today" ? z("A little attention. A better visit.", "Maoni madogo. Ziara bora.") : z(Vm.find((e) => e[0] === a)[1], Vm.find((e) => e[0] === a)[2]) }),
								/* @__PURE__ */ (0, K.jsx)("p", { children: z(a === "today" ? "Review what needs you, learn from guests, and choose one useful next step." : "Saved work stays on this device. Review changes before sharing.", a === "today" ? "Kagua maombi, jifunze kutoka kwa wageni na chagua hatua inayofuata." : "Kagua mabadiliko kabla ya kushiriki.") })
							] }), a === "today" && /* @__PURE__ */ (0, K.jsxs)("button", {
								className: "t-button primary",
								onClick: () => {
									Ne(!Me), Ge({ reviewStep: 0 });
								},
								children: [/* @__PURE__ */ (0, K.jsx)(ne, { size: 17 }), z("Weekend review", "Ukaguzi wa wikendi")]
							})]
						}),
						Me && /* @__PURE__ */ (0, K.jsxs)("section", {
							className: "t-card weekend-card",
							children: [
								/* @__PURE__ */ (0, K.jsxs)("div", {
									className: "t-section-title",
									children: [/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("span", {
										className: "t-eyebrow",
										children: z("A SHORT REVIEW SESSION", "UKAGUZI MFUPI")
									}), /* @__PURE__ */ (0, K.jsx)("h2", { children: z("One decision at a time.", "Uamuzi mmoja kwa wakati.") })] }), /* @__PURE__ */ (0, K.jsxs)("button", {
										className: "t-button subtle",
										onClick: () => Ne(!1),
										children: [/* @__PURE__ */ (0, K.jsx)(Oe, { size: 17 }), z("Close", "Funga")]
									})]
								}),
								/* @__PURE__ */ (0, K.jsx)("div", {
									className: "weekend-steps",
									children: [
										[z("Requests", "Maombi"), "requests"],
										[z("Guest wishes", "Matakwa"), "feedback"],
										[z("Improvement", "Maboresho"), "improvements"],
										[z("Listing update", "Chapisha"), "publish"]
									].map(([e, n], r) => /* @__PURE__ */ (0, K.jsxs)("button", {
										className: t.reviewStep === r ? "current" : "",
										onClick: () => {
											Ge({ reviewStep: r }), dt(n);
										},
										children: [/* @__PURE__ */ (0, K.jsx)("span", { children: r + 1 }), e]
									}, n))
								}),
								/* @__PURE__ */ (0, K.jsx)("p", { children: z("Read the evidence, approve or correct it, and finish when you are ready. Nothing is published automatically.", "Soma ushahidi, idhinisha au sahihisha. Hakuna kinachochapishwa kiotomatiki.") })
							]
						}),
						a === "today" && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
							/* @__PURE__ */ (0, K.jsx)("div", {
								className: "t-stats",
								children: [
									[
										z("Needs your decision", "Yanahitaji uamuzi"),
										Je.length,
										k
									],
									[
										z("Confirmed visits", "Ziara zilizothibitishwa"),
										t.requests.filter((e) => e.status === "confirmed").length,
										te
									],
									[
										z("Feedback comments", "Maoni ya wageni"),
										M.reviews.length,
										me
									],
									[
										z("Approved improvements", "Maboresho"),
										M.experiments.length,
										xe
									]
								].map(([e, t, n]) => /* @__PURE__ */ (0, K.jsxs)("div", {
									className: "t-card t-stat",
									children: [
										/* @__PURE__ */ (0, K.jsx)(n, { size: 21 }),
										/* @__PURE__ */ (0, K.jsx)("span", { children: e }),
										/* @__PURE__ */ (0, K.jsx)("strong", { children: t })
									]
								}, e))
							}),
							/* @__PURE__ */ (0, K.jsxs)("div", {
								className: "t-dashboard-grid",
								children: [/* @__PURE__ */ (0, K.jsxs)("section", {
									className: "opportunity-card",
									children: [/* @__PURE__ */ (0, K.jsxs)("div", {
										className: "t-card-label",
										children: [
											/* @__PURE__ */ (0, K.jsx)(xe, { size: 18 }),
											z("An opportunity worth reviewing", "Fursa ya kukagua"),
											/* @__PURE__ */ (0, K.jsx)("span", { children: z("You decide", "Wewe unaamua") })
										]
									}), H ? /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
										/* @__PURE__ */ (0, K.jsx)("h2", { children: R ? H.actionSw : H.actionEn }),
										/* @__PURE__ */ (0, K.jsx)("p", { children: z(`${H.mentions} distinct comments mention ${H.en.toLowerCase()}; ${H.issues} suggest a change.`, `${H.mentions} maoni yanahusu mada hii; ${H.issues} yanaomba mabadiliko.`) }),
										H.evidence.filter((e) => e.tone === "improve").slice(0, 2).map((e, t) => /* @__PURE__ */ (0, K.jsxs)("blockquote", { children: [
											"“",
											e.quote,
											"”",
											/* @__PURE__ */ (0, K.jsxs)("cite", { children: [
												e.review.source,
												" · ",
												e.review.date
											] })
										] }, t)),
										/* @__PURE__ */ (0, K.jsx)("button", {
											className: "t-button lime",
											onClick: () => dt("feedback"),
											children: z("Review evidence and choose a step", "Kagua ushahidi na chagua hatua")
										})
									] }) : /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
										/* @__PURE__ */ (0, K.jsx)("h2", { children: z("Start with a few guest comments.", "Anza na maoni ya wageni.") }),
										/* @__PURE__ */ (0, K.jsx)("p", { children: z("Patterns appear only when there is enough relevant evidence.", "Ushahidi wa kutosha unahitajika.") }),
										/* @__PURE__ */ (0, K.jsx)("button", {
											className: "t-button lime",
											onClick: () => dt("feedback"),
											children: z("Open feedback", "Fungua maoni")
										})
									] })]
								}), /* @__PURE__ */ (0, K.jsxs)("section", {
									className: "t-card",
									children: [
										/* @__PURE__ */ (0, K.jsxs)("div", {
											className: "t-section-title",
											children: [/* @__PURE__ */ (0, K.jsx)("h2", { children: z("Waiting for Noor", "Yanasubiri Noor") }), /* @__PURE__ */ (0, K.jsx)("button", {
												className: "t-button subtle",
												onClick: () => dt("requests"),
												children: z("View all", "Angalia yote")
											})]
										}),
										Je.slice(0, 3).map((e) => /* @__PURE__ */ (0, K.jsxs)("button", {
											className: "request-preview",
											onClick: () => {
												dt("requests"), Qe(e);
											},
											children: [
												/* @__PURE__ */ (0, K.jsx)("span", {
													className: "t-icon",
													children: /* @__PURE__ */ (0, K.jsx)(k, { size: 20 })
												}),
												/* @__PURE__ */ (0, K.jsxs)("span", { children: [/* @__PURE__ */ (0, K.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, K.jsx)("small", { children: e.kind === "visit" ? `${e.date} · ${e.guests} ${z("visitors", "wageni")}` : e.question.slice(0, 70) })] }),
												/* @__PURE__ */ (0, K.jsx)("span", {
													className: `t-status ${e.status}`,
													children: Km(e.status, R)
												})
											]
										}, e.id)),
										!Je.length && /* @__PURE__ */ (0, K.jsx)("div", {
											className: "t-empty",
											children: z("No requests need your decision.", "Hakuna maombi yanayosubiri.")
										}),
										/* @__PURE__ */ (0, K.jsxs)("div", {
											className: "t-readiness",
											children: [
												/* @__PURE__ */ (0, K.jsx)(be, { size: 20 }),
												/* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("strong", { children: z(F ? "Offline files are installed" : "Prepare for a day without data", F ? "Faili zimehifadhiwa" : "Jiandae kutumia bila mtandao") }), /* @__PURE__ */ (0, K.jsx)("p", { children: z(F ? "Check the app in airplane mode before you need it." : "Install the local model while connected, then keep a backup.", "Kagua programu bila mtandao na hifadhi nakala.") })] }),
												/* @__PURE__ */ (0, K.jsx)("button", {
													className: "t-button subtle",
													onClick: () => dt("settings"),
													children: z("Check", "Kagua")
												})
											]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, K.jsxs)("div", {
								className: "t-dashboard-grid",
								children: [/* @__PURE__ */ (0, K.jsxs)("section", {
									className: "t-card",
									children: [
										/* @__PURE__ */ (0, K.jsx)("h2", { children: z("How visitors find you", "Wageni wanakupataje") }),
										/* @__PURE__ */ (0, K.jsx)("p", {
											className: "t-muted",
											children: z("Observed requests and visits. These are not proven revenue gains.", "Maombi na ziara zilizoonekana. Si uthibitisho wa ongezeko la mapato.")
										}),
										U.length ? /* @__PURE__ */ (0, K.jsxs)("table", {
											className: "t-table",
											children: [/* @__PURE__ */ (0, K.jsx)("thead", { children: /* @__PURE__ */ (0, K.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, K.jsx)("th", { children: z("Source", "Chanzo") }),
												/* @__PURE__ */ (0, K.jsx)("th", { children: z("Requests", "Maombi") }),
												/* @__PURE__ */ (0, K.jsx)("th", { children: z("Visits", "Ziara") })
											] }) }), /* @__PURE__ */ (0, K.jsx)("tbody", { children: U.map(([e, t]) => /* @__PURE__ */ (0, K.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, K.jsx)("td", { children: e }),
												/* @__PURE__ */ (0, K.jsx)("td", { children: t.requests }),
												/* @__PURE__ */ (0, K.jsx)("td", { children: t.visits })
											] }, e)) })]
										}) : /* @__PURE__ */ (0, K.jsx)("p", {
											className: "t-empty",
											children: z("Discovery sources will appear with new requests.", "Vyanzo vitaonekana maombi yanapofika.")
										})
									]
								}), /* @__PURE__ */ (0, K.jsxs)("section", {
									className: "t-card",
									children: [
										/* @__PURE__ */ (0, K.jsx)("h2", { children: z("A useful next step", "Hatua inayofuata") }),
										/* @__PURE__ */ (0, K.jsxs)("div", {
											className: "next-step",
											children: [/* @__PURE__ */ (0, K.jsx)(ie, { size: 22 }), /* @__PURE__ */ (0, K.jsxs)("div", { children: [/* @__PURE__ */ (0, K.jsx)("strong", { children: z("Turn an approved improvement into clear information.", "Badilisha maboresho kuwa maelezo wazi.") }), /* @__PURE__ */ (0, K.jsx)("p", { children: z("Update the experience facts, review the listing, then share it with a guide or guesthouse.", "Sasisha maelezo, kagua na shiriki na mwongoza watalii.") })] })]
										}),
										/* @__PURE__ */ (0, K.jsx)("button", {
											className: "t-button secondary",
											onClick: () => dt("publish"),
											children: z("Prepare a listing", "Andaa tangazo")
										})
									]
								})]
							})
						] }),
						a === "experience" && /* @__PURE__ */ (0, K.jsx)($m, {
							business: t.draft,
							sw: R,
							change: (e) => Ge({ draft: e }),
							approve: () => dt("publish")
						}),
						a === "requests" && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "t-toolbar",
							children: [
								/* @__PURE__ */ (0, K.jsx)("p", { children: z("Visitor acceptance is required after you approve a quote.", "Mgeni lazima akubali bei baada ya idhini yako.") }),
								/* @__PURE__ */ (0, K.jsxs)("button", {
									className: "t-button secondary",
									onClick: () => u(!0),
									children: [/* @__PURE__ */ (0, K.jsx)(ge, { size: 17 }), z("Try a visitor request", "Jaribu ombi")]
								}),
								!p && /* @__PURE__ */ (0, K.jsx)("button", {
									className: "t-button secondary",
									onClick: Ue,
									disabled: !d,
									children: z("Refresh", "Sasisha")
								})
							]
						}), /* @__PURE__ */ (0, K.jsxs)("div", {
							className: "request-list",
							children: [t.requests.map((e) => /* @__PURE__ */ (0, K.jsxs)("article", {
								className: "t-card request-card",
								children: [
									/* @__PURE__ */ (0, K.jsxs)("div", {
										className: "request-card-top",
										children: [/* @__PURE__ */ (0, K.jsx)("span", {
											className: `t-status ${e.status}`,
											children: Km(e.status, R)
										}), /* @__PURE__ */ (0, K.jsxs)("span", {
											className: "t-muted",
											children: [
												e.demo ? z("Example", "Mfano") : z("Visitor request", "Ombi la mgeni"),
												" ",
												"· ",
												e.code
											]
										})]
									}),
									/* @__PURE__ */ (0, K.jsx)("h2", { children: e.name }),
									/* @__PURE__ */ (0, K.jsx)("p", { children: e.kind === "visit" ? `${e.date} · ${e.time} · ${e.guests} ${z("visitors", "wageni")} · ${dm(e.total, e.currency)}` : e.question }),
									/* @__PURE__ */ (0, K.jsx)("p", {
										className: "t-muted",
										children: e.activityIds.map((e) => G.activities.find((t) => t.id === e)?.name).filter(Boolean).join(" + ")
									}),
									e.special && /* @__PURE__ */ (0, K.jsx)("blockquote", { children: e.special }),
									e.reply && /* @__PURE__ */ (0, K.jsxs)("div", {
										className: "saved-reply",
										children: [/* @__PURE__ */ (0, K.jsx)("strong", { children: z("Approved response", "Jibu lililoidhinishwa") }), /* @__PURE__ */ (0, K.jsx)("p", { children: e.reply })]
									}),
									/* @__PURE__ */ (0, K.jsxs)("div", {
										className: "request-card-bottom",
										children: [/* @__PURE__ */ (0, K.jsxs)("span", { children: [
											z("Found through", "Chanzo"),
											": ",
											e.source
										] }), /* @__PURE__ */ (0, K.jsx)("button", {
											className: "t-button secondary",
											onClick: () => Qe(e),
											children: z("Review request", "Kagua ombi")
										})]
									})
								]
							}, e.id)), !t.requests.length && /* @__PURE__ */ (0, K.jsx)("div", {
								className: "t-card t-empty",
								children: z("No requests yet. Open the visitor view to try the workflow.", "Hakuna maombi. Fungua mwonekano wa mgeni kujaribu.")
							})]
						})] }),
						(a === "feedback" || a === "improvements") && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "t-toolbar",
							children: [/* @__PURE__ */ (0, K.jsx)("p", { children: z(`${t.feedback.filter((e) => !e.imported).length} visitor-form comments are ready for local analysis.`, `${t.feedback.filter((e) => !e.imported).length} maoni yako tayari kuchambuliwa.`) }), /* @__PURE__ */ (0, K.jsxs)("button", {
								className: "t-button secondary",
								disabled: _ || !t.feedback.some((e) => !e.imported),
								onClick: at,
								children: [/* @__PURE__ */ (0, K.jsx)(P, { size: 16 }), z("Import visitor feedback", "Ingiza maoni")]
							})]
						}), /* @__PURE__ */ (0, K.jsxs)("div", {
							className: "legacy-embed",
							children: [a === "feedback" && /* @__PURE__ */ (0, K.jsxs)("div", {
								className: "t-toolbar",
								"aria-label": "Feedback views",
								children: [/* @__PURE__ */ (0, K.jsx)("button", {
									className: `t-button ${s === "overview" ? "primary" : "secondary"}`,
									onClick: () => c("overview"),
									children: z("Insights and evidence", "Mada na ushahidi")
								}), /* @__PURE__ */ (0, K.jsx)("button", {
									className: `t-button ${s === "feedback" ? "primary" : "secondary"}`,
									onClick: () => c("feedback"),
									children: z("All comments and corrections", "Maoni yote na marekebisho")
								})]
							}), /* @__PURE__ */ (0, K.jsx)(em, {
								initialView: a === "feedback" ? s : "actions",
								initialLanguage: t.language
							}, `${a}-${t.language}-${s}`)]
						})] }),
						a === "publish" && /* @__PURE__ */ (0, K.jsxs)("div", {
							className: "t-publish-grid",
							children: [/* @__PURE__ */ (0, K.jsxs)("section", {
								className: "t-card",
								children: [
									/* @__PURE__ */ (0, K.jsx)("span", {
										className: "t-eyebrow",
										children: z("YOUR APPROVED FACTS", "MAELEZO YAKO")
									}),
									/* @__PURE__ */ (0, K.jsx)("h2", { children: z("Preview before you share.", "Kagua kabla ya kushiriki.") }),
									/* @__PURE__ */ (0, K.jsx)("p", {
										className: "t-muted",
										children: z("This draft uses only the business details and activity prices you entered.", "Rasimu hii inatumia maelezo na bei ulizoweka.")
									}),
									/* @__PURE__ */ (0, K.jsx)("pre", {
										className: "listing-preview",
										children: Cm(t.draft, t.language)
									}),
									/* @__PURE__ */ (0, K.jsxs)("label", {
										className: "t-check",
										children: [/* @__PURE__ */ (0, K.jsx)("input", {
											type: "checkbox",
											id: "publish-approval"
										}), /* @__PURE__ */ (0, K.jsx)("span", { children: z("I have reviewed the facts, prices, language and directions.", "Nimekagua maelezo, bei, lugha na maelekezo.") })]
									}),
									/* @__PURE__ */ (0, K.jsxs)("button", {
										className: "t-button primary",
										disabled: _,
										onClick: () => {
											if (!document.getElementById("publish-approval")?.checked) {
												B.error(z("Review the draft and check approval first.", "Kagua rasimu na idhinisha kwanza."));
												return;
											}
											$e();
										},
										children: [/* @__PURE__ */ (0, K.jsx)(A, { size: 17 }), z(p ? "Approve local listing" : "Approve and publish website", "Idhinisha maelezo")]
									})
								]
							}), /* @__PURE__ */ (0, K.jsxs)("div", {
								className: "t-stack",
								children: [
									/* @__PURE__ */ (0, K.jsxs)("section", {
										className: "t-card",
										children: [
											/* @__PURE__ */ (0, K.jsx)("h2", { children: z("Share an approved listing", "Shiriki maelezo yaliyoidhinishwa") }),
											/* @__PURE__ */ (0, K.jsx)("p", { children: z("Use the same facts on your website, with a guide, or in a marketplace application.", "Tumia maelezo haya kwenye tovuti au kwa mwongoza watalii.") }),
											/* @__PURE__ */ (0, K.jsxs)("div", {
												className: "t-stack-buttons",
												children: [
													/* @__PURE__ */ (0, K.jsxs)("button", {
														className: "t-button secondary",
														onClick: () => Hm("Noor-approved-listing.txt", Cm(G, t.language)),
														children: [/* @__PURE__ */ (0, K.jsx)(P, { size: 17 }), z("Download listing pack", "Pakua maelezo")]
													}),
													/* @__PURE__ */ (0, K.jsxs)("button", {
														className: "t-button secondary",
														onClick: () => Hm("Noor-approved-experience.json", JSON.stringify(G, null, 2), "application/json"),
														children: [/* @__PURE__ */ (0, K.jsx)(ie, { size: 17 }), z("Export approved facts", "Hamisha maelezo")]
													}),
													/* @__PURE__ */ (0, K.jsxs)("button", {
														className: "t-button secondary",
														onClick: () => {
															u(!0), setTimeout(() => window.print(), 250);
														},
														children: [/* @__PURE__ */ (0, K.jsx)(re, { size: 17 }), z("Print visitor / referral page", "Chapisha ukurasa wa mgeni")]
													})
												]
											}),
											/* @__PURE__ */ (0, K.jsx)("small", { children: z("Exports use the approved version, not an unapproved draft. Platform applications still need your review and verification.", "Taarifa zilizoidhinishwa tu ndizo zinazohamishwa.") })
										]
									}),
									/* @__PURE__ */ (0, K.jsxs)("section", {
										className: "t-card",
										children: [/* @__PURE__ */ (0, K.jsx)("h2", { children: z("Build on an improvement", "Tumia maboresho") }), M.experiments.length ? M.experiments.map((e) => /* @__PURE__ */ (0, K.jsxs)("div", {
											className: "approved-improvement",
											children: [
												/* @__PURE__ */ (0, K.jsx)("strong", { children: e.title }),
												/* @__PURE__ */ (0, K.jsx)("p", { children: e.note || z("Record what changed before adding it to the experience description.", "Andika kilichobadilika kabla ya kusasisha maelezo.") }),
												/* @__PURE__ */ (0, K.jsx)("button", {
													className: "t-button subtle",
													onClick: () => dt("experience"),
													children: z("Update the facts", "Sasisha maelezo")
												})
											]
										}, e.id)) : /* @__PURE__ */ (0, K.jsx)("p", { children: z("Review a guest theme and approve an improvement in Visitor feedback.", "Kagua mada na idhinisha maboresho kwenye maoni.") })]
									}),
									/* @__PURE__ */ (0, K.jsxs)("section", {
										className: "t-card",
										children: [
											/* @__PURE__ */ (0, K.jsx)("h2", { children: z("Consented testimonials", "Maoni yenye ruhusa") }),
											t.feedback.filter((e) => e.testimonialConsent).map((e) => /* @__PURE__ */ (0, K.jsxs)("div", {
												className: "approved-improvement",
												children: [/* @__PURE__ */ (0, K.jsx)("p", { children: e.text }), /* @__PURE__ */ (0, K.jsxs)("label", {
													className: "t-check",
													children: [/* @__PURE__ */ (0, K.jsx)("input", {
														type: "checkbox",
														checked: e.published === !0,
														onChange: (t) => ft(e.id, t.target.checked)
													}), /* @__PURE__ */ (0, K.jsx)("span", { children: z("Approve this quote for the visitor page", "Idhinisha maoni haya kuchapishwa") })]
												})]
											}, e.id)),
											!t.feedback.some((e) => e.testimonialConsent) && /* @__PURE__ */ (0, K.jsx)("p", { children: z("No visitors have granted publication permission yet.", "Hakuna ruhusa ya kuchapisha bado.") })
										]
									}),
									/* @__PURE__ */ (0, K.jsxs)("section", {
										className: "t-card",
										children: [
											/* @__PURE__ */ (0, K.jsx)("h2", { children: z("Newsletter permissions", "Ruhusa za habari") }),
											/* @__PURE__ */ (0, K.jsxs)("p", { children: [
												t.subscribers.length,
												" ",
												z("opt-in signups. Campaign sending is not enabled.", "watu wamejisajili. Kutuma habari hakujawashwa.")
											] }),
											/* @__PURE__ */ (0, K.jsx)("button", {
												className: "t-button secondary",
												onClick: () => Hm("Noor-newsletter-permissions.json", JSON.stringify(t.subscribers, null, 2), "application/json"),
												children: z("Export consented signups", "Hamisha ruhusa")
											})
										]
									})
								]
							})]
						}),
						a === "settings" && /* @__PURE__ */ (0, K.jsxs)("div", {
							className: "t-settings-grid",
							children: [
								/* @__PURE__ */ (0, K.jsx)(Im, { sw: R }),
								/* @__PURE__ */ (0, K.jsxs)("section", {
									className: "t-card",
									children: [
										/* @__PURE__ */ (0, K.jsx)("span", {
											className: "t-icon",
											children: /* @__PURE__ */ (0, K.jsx)(Ee, { size: 24 })
										}),
										/* @__PURE__ */ (0, K.jsx)("h2", { children: z("Ready without mobile data.", "Tayari bila data.") }),
										/* @__PURE__ */ (0, K.jsx)("p", { children: z("The app, feedback model and reviewed language text can be saved on this device. Live requests, SMS and publishing still need their connected service.", "Programu, modeli na maandishi yanaweza kuhifadhiwa kwenye kifaa. Maombi mapya, SMS na kuchapisha vinahitaji huduma ya mtandao.") }),
										/* @__PURE__ */ (0, K.jsxs)("div", {
											className: "device-lines",
											children: [
												/* @__PURE__ */ (0, K.jsxs)("span", { children: [z("Offline files", "Faili za ndani"), /* @__PURE__ */ (0, K.jsx)("strong", { children: F ? z(le === "full" ? "Full package installed" : "Lighter core installed", "Zimehifadhiwa") : z("Not installed", "Hazijahifadhiwa") })] }),
												/* @__PURE__ */ (0, K.jsxs)("span", { children: [z("Richer local model", "Modeli ya ndani"), /* @__PURE__ */ (0, K.jsx)("strong", { children: ve ? z("Ready", "Tayari") : z("Not loaded", "Haijapakiwa") })] }),
												/* @__PURE__ */ (0, K.jsxs)("span", { children: [z("Request service", "Huduma ya maombi"), /* @__PURE__ */ (0, K.jsx)("strong", { children: p ? z("Local demonstration", "Mfano wa ndani") : h ? z("Connected", "Imeunganishwa") : z("Unavailable", "Haipatikani") })] }),
												/* @__PURE__ */ (0, K.jsxs)("span", { children: [z("Last request sync", "Usawazishaji wa mwisho"), /* @__PURE__ */ (0, K.jsx)("strong", { children: t.lastSync ? new Date(t.lastSync).toLocaleString() : z("None yet", "Bado") })] })
											]
										}),
										/* @__PURE__ */ (0, K.jsxs)("button", {
											className: "t-button primary",
											disabled: _,
											onClick: () => st("full"),
											children: [
												_ ? /* @__PURE__ */ (0, K.jsx)(ue, {
													size: 17,
													className: "spin"
												}) : /* @__PURE__ */ (0, K.jsx)(P, { size: 17 }),
												" ",
												z("Install / check full AI · ~48 MB", "Andaa AI kamili · ~48 MB")
											]
										}),
										!Wm() && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)("button", {
											className: "t-button secondary",
											disabled: _,
											onClick: () => st("core"),
											children: z("Install lighter core · ~2.4 MB", "Hifadhi toleo dogo · ~2.4 MB")
										}), /* @__PURE__ */ (0, K.jsx)("p", {
											className: "t-muted",
											children: z("The compact model often asks for human review. Install the full model once for richer English analysis.", "Modeli ndogo mara nyingi inahitaji ukaguzi wa binadamu. Toleo kamili linasaidia zaidi kwa maoni ya Kiingereza.")
										})] }),
										he && /* @__PURE__ */ (0, K.jsx)("p", {
											className: "t-progress",
											role: "status",
											children: he
										}),
										Pe && !p && /* @__PURE__ */ (0, K.jsx)("p", {
											className: "t-error",
											children: Pe
										}),
										/* @__PURE__ */ (0, K.jsx)("small", { children: z("Check on the actual phone in airplane mode. Browser storage can be cleared or evicted; keep a backup.", "Kagua kwenye simu bila mtandao. Hifadhi nakala.") })
									]
								}),
								/* @__PURE__ */ (0, K.jsxs)("section", {
									className: "t-card",
									children: [
										/* @__PURE__ */ (0, K.jsx)("span", {
											className: "t-icon",
											children: /* @__PURE__ */ (0, K.jsx)(be, { size: 24 })
										}),
										/* @__PURE__ */ (0, K.jsx)("h2", { children: z("Your data and permissions", "Taarifa na ruhusa zako") }),
										/* @__PURE__ */ (0, K.jsx)("p", { children: z("AI analysis stays on this device. Connected visitor requests are stored by the website service. Backups include contact details; keep them private.", "Uchambuzi wa AI unabaki kwenye kifaa. Maombi ya tovuti yanahifadhiwa kwenye huduma. Nakala zina maelezo ya mawasiliano; zihifadhi kwa siri.") }),
										/* @__PURE__ */ (0, K.jsxs)("div", {
											className: "t-stack-buttons",
											children: [
												/* @__PURE__ */ (0, K.jsxs)("button", {
													className: "t-button secondary",
													onClick: ct,
													children: [/* @__PURE__ */ (0, K.jsx)(P, { size: 17 }), z("Export complete backup", "Hifadhi nakala kamili")]
												}),
												/* @__PURE__ */ (0, K.jsx)("button", {
													className: "t-button secondary",
													onClick: () => He.current?.click(),
													children: z("Restore a backup", "Rejesha nakala")
												}),
												/* @__PURE__ */ (0, K.jsx)("input", {
													ref: He,
													hidden: !0,
													type: "file",
													accept: "application/json",
													onChange: (e) => {
														let t = e.target.files?.[0];
														t && lt(t), e.target.value = "";
													}
												}),
												/* @__PURE__ */ (0, K.jsxs)("button", {
													className: "t-button danger",
													onClick: () => {
														window.confirm("Delete this device’s workspace, contacts and feedback? This does not delete server records.") && (localStorage.removeItem(zm), localStorage.removeItem(Bm), localStorage.removeItem("noor-visitor-receipt"), location.reload());
													},
													children: [/* @__PURE__ */ (0, K.jsx)(Ce, { size: 17 }), z("Delete device data", "Futa taarifa za kifaa")]
												})
											]
										}),
										/* @__PURE__ */ (0, K.jsx)("p", {
											className: "t-muted",
											children: z("Local storage is not encrypted. Names need manual review. Sending campaigns, SMS and public reviews requires separate configuration and appropriate permissions.", "Hifadhi ya ndani haijasimbwa. Kagua majina mwenyewe.")
										})
									]
								}),
								/* @__PURE__ */ (0, K.jsxs)("section", {
									className: "t-card",
									children: [/* @__PURE__ */ (0, K.jsx)("h2", { children: z("Decision history", "Historia ya maamuzi") }), t.audit.length ? /* @__PURE__ */ (0, K.jsx)("div", {
										className: "audit-list",
										children: t.audit.slice(0, 12).map((e) => /* @__PURE__ */ (0, K.jsxs)("div", { children: [
											/* @__PURE__ */ (0, K.jsx)("strong", { children: e.action }),
											/* @__PURE__ */ (0, K.jsx)("p", { children: e.detail }),
											/* @__PURE__ */ (0, K.jsx)("small", { children: new Date(e.at).toLocaleString() })
										] }, e.id))
									}) : /* @__PURE__ */ (0, K.jsx)("p", { children: z("Approvals and request decisions will appear here.", "Idhini na maamuzi yataonekana hapa.") })]
								}),
								/* @__PURE__ */ (0, K.jsxs)("section", {
									className: "t-card",
									children: [
										/* @__PURE__ */ (0, K.jsx)("h2", { children: z("SMS approval demonstration", "Mfano wa idhini kwa SMS") }),
										/* @__PURE__ */ (0, K.jsx)("p", { children: z("A gateway can forward a request to Noor’s phone. This release includes a provider adapter; live messages are disabled until configured.", "Huduma ya SMS inaweza kutuma ombi kwa Noor. SMS halisi hazijawashwa.") }),
										/* @__PURE__ */ (0, K.jsx)(eh, {
											state: t,
											sw: R,
											change: (e) => {
												Ge({ requests: t.requests.map((t) => t.id === e.id ? e : t) }), Ke("sms-demo", e.id, "Simulated reply; no message sent");
											}
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, K.jsxs)("footer", {
							className: "t-footer",
							children: [/* @__PURE__ */ (0, K.jsxs)("span", { children: [/* @__PURE__ */ (0, K.jsx)(be, { size: 14 }), z("Small AI. Clear evidence. Human decisions.", "AI ndogo. Ushahidi wazi. Uamuzi wa binadamu.")] }), /* @__PURE__ */ (0, K.jsx)("span", { children: "FarmPilot 3.0" })]
						})
					]
				})]
			}),
			V && /* @__PURE__ */ (0, K.jsx)("div", {
				className: "t-modal-backdrop",
				onClick: () => T(null),
				children: /* @__PURE__ */ (0, K.jsxs)("section", {
					className: "t-modal",
					id: "request-dialog",
					tabIndex: -1,
					onKeyDown: (e) => {
						if (e.key === "Escape" && (e.stopPropagation(), T(null)), e.key === "Tab") {
							let t = Array.from(e.currentTarget.querySelectorAll("button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href]")), n = t[0], r = t[t.length - 1];
							e.shiftKey && (document.activeElement === n || document.activeElement === e.currentTarget) ? (e.preventDefault(), r?.focus()) : !e.shiftKey && (document.activeElement === r || document.activeElement === e.currentTarget) && (e.preventDefault(), n?.focus());
						}
					},
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "request-title",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "t-section-title",
							children: [/* @__PURE__ */ (0, K.jsxs)("h2", {
								id: "request-title",
								children: [
									z("Review request", "Kagua ombi"),
									" ",
									V.code
								]
							}), /* @__PURE__ */ (0, K.jsx)("button", {
								className: "t-button subtle",
								onClick: () => T(null),
								"aria-label": "Close",
								children: /* @__PURE__ */ (0, K.jsx)(Oe, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, K.jsxs)("p", { children: [
							/* @__PURE__ */ (0, K.jsx)("strong", { children: V.name }),
							" ·",
							" ",
							/* @__PURE__ */ (0, K.jsx)("span", {
								className: `t-status ${V.status}`,
								children: Km(V.status, R)
							})
						] }),
						V.kind === "visit" && /* @__PURE__ */ (0, K.jsxs)("div", {
							className: "request-summary",
							children: [
								/* @__PURE__ */ (0, K.jsxs)("span", { children: [
									V.date,
									" · ",
									V.time
								] }),
								/* @__PURE__ */ (0, K.jsxs)("span", { children: [
									V.guests,
									" ",
									z("visitors", "wageni"),
									" · ",
									V.minutes,
									" ",
									"min"
								] }),
								/* @__PURE__ */ (0, K.jsxs)("span", { children: [
									z("Already reserved", "Waliothibitishwa"),
									":",
									" ",
									_m(t.requests, V.date, V.time, V.id, V.minutes),
									" ",
									"/ ",
									G.capacity
								] })
							]
						}),
						/* @__PURE__ */ (0, K.jsx)("p", { children: V.question || V.special }),
						/* @__PURE__ */ (0, K.jsxs)("p", {
							className: "t-muted",
							children: [
								V.channel,
								":",
								" ",
								V.contact || z("Website status page", "Ukurasa wa hali")
							]
						}),
						/* @__PURE__ */ (0, K.jsx)(Fm, {
							incoming: [V.question, V.special].filter(Boolean).join("\n"),
							language: V.language,
							sw: R,
							onApply: (e, t) => {
								D(e), Xe(t);
							}
						}, V.id),
						/* @__PURE__ */ (0, K.jsx)(qm, {
							label: z("Your approved reply", "Jibu lako"),
							children: /* @__PURE__ */ (0, K.jsx)("textarea", {
								value: E,
								onChange: (e) => {
									D(e.target.value), Xe(void 0);
								},
								maxLength: 2e3
							})
						}),
						V.kind === "visit" && /* @__PURE__ */ (0, K.jsx)(qm, {
							label: `${z("Total quote", "Bei ya jumla")} (${V.currency})`,
							children: /* @__PURE__ */ (0, K.jsx)("input", {
								type: "number",
								min: "0",
								step: "1",
								value: ee,
								onChange: (e) => j(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "t-modal-actions",
							children: [
								[
									"requested",
									"needs_details",
									"quoted"
								].includes(V.status) && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
									/* @__PURE__ */ (0, K.jsxs)("button", {
										className: "t-button primary",
										disabled: _,
										onClick: () => Ze(V, V.kind === "visit" ? "quote" : "answer"),
										children: [/* @__PURE__ */ (0, K.jsx)(A, { size: 17 }), z(V.kind === "visit" ? "Approve quote" : "Approve answer", V.kind === "visit" ? "Idhinisha bei" : "Idhinisha jibu")]
									}),
									/* @__PURE__ */ (0, K.jsx)("button", {
										className: "t-button secondary",
										disabled: _,
										onClick: () => Ze(V, "details"),
										children: z("Ask for details", "Omba maelezo")
									}),
									/* @__PURE__ */ (0, K.jsx)("button", {
										className: "t-button danger",
										disabled: _,
										onClick: () => Ze(V, "decline"),
										children: z("Decline", "Kataa")
									})
								] }),
								Ie && x.includes(V.id) && V.kind === "visit" && ["requested", "needs_details"].includes(V.status) && /* @__PURE__ */ (0, K.jsx)("button", {
									className: "t-button secondary",
									disabled: _,
									onClick: async () => {
										try {
											await Gm("owner/send-sms", {
												id: V.id,
												revision: V.revision
											}), B.success("Submitted to the SMS provider. Approval is still pending.");
										} catch (e) {
											B.error(e.message);
										}
									},
									children: z("Send to my phone", "Tuma kwa simu yangu")
								}),
								V.status === "confirmed" && /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [/* @__PURE__ */ (0, K.jsx)("button", {
									className: "t-button primary",
									disabled: _,
									onClick: () => Ze(V, "complete"),
									children: z("Mark visit completed", "Ziara imekamilika")
								}), /* @__PURE__ */ (0, K.jsx)("button", {
									className: "t-button danger",
									disabled: _,
									onClick: () => Ze(V, "cancel"),
									children: z("Cancel visit", "Ghairi ziara")
								})] })
							]
						}),
						/* @__PURE__ */ (0, K.jsxs)("button", {
							className: "t-button danger",
							disabled: _,
							onClick: () => We(V),
							children: [/* @__PURE__ */ (0, K.jsx)(Ce, { size: 16 }), z("Delete request and linked form feedback", "Futa ombi na maoni yake")]
						}),
						/* @__PURE__ */ (0, K.jsx)("small", { children: z("Approving a quote does not confirm a visit. The visitor must accept it. Website status is available even when email/SMS delivery is not configured.", "Idhini ya bei haithibitishi ziara. Mgeni lazima akubali.") })
					]
				})
			}),
			/* @__PURE__ */ (0, K.jsx)(tt, {
				richColors: !0,
				position: "bottom-right"
			})
		]
	}) : /* @__PURE__ */ (0, K.jsxs)("div", {
		className: "t-loading",
		children: [/* @__PURE__ */ (0, K.jsx)(ue, { className: "spin" }), /* @__PURE__ */ (0, K.jsx)("p", { children: "Opening your saved workspace…" })]
	});
}
function Ym({ name: e, label: t, required: n = !1 }) {
	return /* @__PURE__ */ (0, K.jsxs)("label", {
		className: "t-check",
		children: [/* @__PURE__ */ (0, K.jsx)("input", {
			type: "checkbox",
			name: e,
			required: n
		}), /* @__PURE__ */ (0, K.jsx)("span", { children: t })]
	});
}
function Xm({ sw: e }) {
	return /* @__PURE__ */ (0, K.jsx)(qm, {
		label: e ? "Ulipataje taarifa?" : "How did you find us?",
		children: /* @__PURE__ */ (0, K.jsx)("select", {
			name: "source",
			children: [
				"Website",
				"Google Maps",
				"Local guesthouse",
				"Local guide",
				"Cooperative",
				"Social media",
				"Friend or family",
				"Other"
			].map((e) => /* @__PURE__ */ (0, K.jsx)("option", { children: e }, e))
		})
	});
}
function Zm({ sw: e }) {
	return /* @__PURE__ */ (0, K.jsxs)(K.Fragment, { children: [
		/* @__PURE__ */ (0, K.jsx)(qm, {
			label: e ? "Jina lako" : "Your name",
			children: /* @__PURE__ */ (0, K.jsx)("input", {
				name: "name",
				required: !0,
				maxLength: 100,
				autoComplete: "name"
			})
		}),
		/* @__PURE__ */ (0, K.jsxs)("div", {
			className: "t-form-grid",
			children: [/* @__PURE__ */ (0, K.jsx)(qm, {
				label: e ? "Njia ya mawasiliano" : "Preferred contact",
				children: /* @__PURE__ */ (0, K.jsxs)("select", {
					name: "channel",
					children: [
						/* @__PURE__ */ (0, K.jsx)("option", {
							value: "website",
							children: e ? "Hali kwenye tovuti" : "Website status"
						}),
						/* @__PURE__ */ (0, K.jsx)("option", {
							value: "email",
							children: "Email"
						}),
						/* @__PURE__ */ (0, K.jsx)("option", {
							value: "sms",
							children: "SMS"
						})
					]
				})
			}), /* @__PURE__ */ (0, K.jsx)(qm, {
				label: e ? "Barua pepe au simu" : "Email or phone (if selected)",
				children: /* @__PURE__ */ (0, K.jsx)("input", {
					name: "contact",
					maxLength: 150
				})
			})]
		}),
		/* @__PURE__ */ (0, K.jsx)(qm, {
			label: e ? "Lugha ya ujumbe na jibu" : "Message and reply language",
			children: /* @__PURE__ */ (0, K.jsxs)("select", {
				name: "messageLanguage",
				defaultValue: e ? "sw" : "en",
				children: [
					/* @__PURE__ */ (0, K.jsx)("option", {
						value: "en",
						children: "English"
					}),
					/* @__PURE__ */ (0, K.jsx)("option", {
						value: "sw",
						children: "Kiswahili"
					}),
					/* @__PURE__ */ (0, K.jsx)("option", {
						value: "fr",
						children: "Français"
					}),
					/* @__PURE__ */ (0, K.jsx)("option", {
						value: "es",
						children: "Español"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, K.jsx)("small", { children: e ? "Tovuti inaonyesha majibu. Barua pepe/SMS zinahitaji huduma iliyoandaliwa." : "Replies appear on your request status page. Email/SMS delivery requires the operator’s configured service." })
	] });
}
function Qm({ business: e, sw: t, submit: n, busy: r }) {
	let [i, a] = (0, C.useState)(e.activities.filter((e) => e.enabled).map((e) => e.id)), [o, s] = (0, C.useState)(2), c = null;
	try {
		c = pm(e, i, o);
	} catch {}
	return /* @__PURE__ */ (0, K.jsxs)("form", {
		className: "t-card t-form",
		onSubmit: n,
		children: [
			/* @__PURE__ */ (0, K.jsx)("input", {
				type: "hidden",
				name: "kind",
				value: "visit"
			}),
			/* @__PURE__ */ (0, K.jsx)(Zm, { sw: t }),
			/* @__PURE__ */ (0, K.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, K.jsx)("legend", { children: t ? "Shughuli" : "Activities" }), e.activities.filter((e) => e.enabled).map((n) => /* @__PURE__ */ (0, K.jsxs)("label", {
				className: "activity-choice",
				children: [
					/* @__PURE__ */ (0, K.jsx)("input", {
						type: "checkbox",
						name: "activity",
						value: n.id,
						checked: i.includes(n.id),
						onChange: (e) => a(e.target.checked ? [...i, n.id] : i.filter((e) => e !== n.id))
					}),
					/* @__PURE__ */ (0, K.jsxs)("span", { children: [t ? n.nameSw : n.name, /* @__PURE__ */ (0, K.jsxs)("small", { children: [n.minutes, " min"] })] }),
					/* @__PURE__ */ (0, K.jsx)("strong", { children: dm(n.price, e.currency) })
				]
			}, n.id))] }),
			/* @__PURE__ */ (0, K.jsxs)("div", {
				className: "t-form-grid",
				children: [/* @__PURE__ */ (0, K.jsx)(qm, {
					label: t ? "Tarehe unayopendelea" : "Preferred date",
					children: /* @__PURE__ */ (0, K.jsx)("input", {
						name: "date",
						type: "date",
						required: !0,
						min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
					})
				}), /* @__PURE__ */ (0, K.jsx)(qm, {
					label: t ? "Muda" : "Start time",
					children: /* @__PURE__ */ (0, K.jsx)("select", {
						name: "time",
						children: e.startTimes.map((e) => /* @__PURE__ */ (0, K.jsx)("option", { children: e }, e))
					})
				})]
			}),
			/* @__PURE__ */ (0, K.jsx)(qm, {
				label: t ? "Idadi ya wageni" : "Number of visitors",
				children: /* @__PURE__ */ (0, K.jsx)("input", {
					name: "guests",
					type: "number",
					required: !0,
					min: "1",
					max: e.capacity,
					value: o,
					onChange: (e) => s(Number(e.target.value))
				})
			}),
			c && /* @__PURE__ */ (0, K.jsxs)("div", {
				className: "quote-estimate",
				children: [
					/* @__PURE__ */ (0, K.jsx)("span", { children: t ? "Makadirio kabla ya idhini" : "Estimate before operator approval" }),
					/* @__PURE__ */ (0, K.jsx)("strong", { children: dm(c.total, e.currency) }),
					/* @__PURE__ */ (0, K.jsxs)("small", { children: [
						c.minutes,
						" min · ",
						o,
						" ",
						t ? "wageni" : "visitors"
					] })
				]
			}),
			/* @__PURE__ */ (0, K.jsx)(qm, {
				label: t ? "Ombi maalum" : "Special request (optional)",
				children: /* @__PURE__ */ (0, K.jsx)("textarea", {
					name: "special",
					maxLength: 2e3
				})
			}),
			/* @__PURE__ */ (0, K.jsx)(Xm, { sw: t }),
			/* @__PURE__ */ (0, K.jsx)(Ym, {
				name: "consent",
				required: !0,
				label: t ? "Ruhusu Noor kutumia maelezo haya kupanga ziara." : "Allow Noor to use these details to handle my visit request."
			}),
			/* @__PURE__ */ (0, K.jsx)("button", {
				className: "t-button primary",
				disabled: r || !c,
				children: t ? "Tuma ombi la ziara" : "Send visit request"
			})
		]
	});
}
function $m({ business: e, sw: t, change: n, approve: r }) {
	let i = (t, r) => n({
		...e,
		[t]: r
	});
	return /* @__PURE__ */ (0, K.jsxs)("div", {
		className: "t-editor-grid",
		children: [/* @__PURE__ */ (0, K.jsxs)("section", {
			className: "t-card t-form",
			children: [
				/* @__PURE__ */ (0, K.jsx)("h2", { children: t ? "Maelezo ya biashara" : "Your business facts" }),
				/* @__PURE__ */ (0, K.jsx)(qm, {
					label: t ? "Jina" : "Business name",
					children: /* @__PURE__ */ (0, K.jsx)("input", {
						value: e.name,
						onChange: (e) => i("name", e.target.value),
						maxLength: 100
					})
				}),
				/* @__PURE__ */ (0, K.jsx)(qm, {
					label: "Description · English",
					children: /* @__PURE__ */ (0, K.jsx)("textarea", {
						value: e.intro,
						onChange: (e) => i("intro", e.target.value),
						maxLength: 2e3
					})
				}),
				/* @__PURE__ */ (0, K.jsx)(qm, {
					label: "Maelezo · Kiswahili",
					children: /* @__PURE__ */ (0, K.jsx)("textarea", {
						value: e.introSw,
						onChange: (e) => i("introSw", e.target.value),
						maxLength: 2e3
					})
				}),
				/* @__PURE__ */ (0, K.jsx)(qm, {
					label: t ? "Mahali" : "Location",
					children: /* @__PURE__ */ (0, K.jsx)("input", {
						value: e.location,
						onChange: (e) => i("location", e.target.value),
						maxLength: 300
					})
				}),
				/* @__PURE__ */ (0, K.jsx)(qm, {
					label: t ? "Nchi" : "Country",
					children: /* @__PURE__ */ (0, K.jsx)("input", {
						value: e.country,
						onChange: (e) => i("country", e.target.value),
						maxLength: 100
					})
				}),
				/* @__PURE__ */ (0, K.jsxs)("div", {
					className: "t-form-grid",
					children: [/* @__PURE__ */ (0, K.jsx)(qm, {
						label: "Phone / SMS",
						children: /* @__PURE__ */ (0, K.jsx)("input", {
							value: e.phone,
							onChange: (e) => i("phone", e.target.value),
							maxLength: 40
						})
					}), /* @__PURE__ */ (0, K.jsx)(qm, {
						label: "Email",
						children: /* @__PURE__ */ (0, K.jsx)("input", {
							type: "email",
							value: e.email,
							onChange: (e) => i("email", e.target.value),
							maxLength: 150
						})
					})]
				}),
				/* @__PURE__ */ (0, K.jsx)(qm, {
					label: "Directions · English",
					children: /* @__PURE__ */ (0, K.jsx)("textarea", {
						value: e.directions,
						onChange: (e) => i("directions", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, K.jsx)(qm, {
					label: "Maelekezo · Kiswahili",
					children: /* @__PURE__ */ (0, K.jsx)("textarea", {
						value: e.directionsSw,
						onChange: (e) => i("directionsSw", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, K.jsx)(qm, {
					label: "Access arrangements · English",
					children: /* @__PURE__ */ (0, K.jsx)("textarea", {
						value: e.accessibility,
						onChange: (e) => i("accessibility", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, K.jsx)(qm, {
					label: "Ufikivu · Kiswahili",
					children: /* @__PURE__ */ (0, K.jsx)("textarea", {
						value: e.accessibilitySw,
						onChange: (e) => i("accessibilitySw", e.target.value)
					})
				})
			]
		}), /* @__PURE__ */ (0, K.jsxs)("div", {
			className: "t-stack",
			children: [/* @__PURE__ */ (0, K.jsxs)("section", {
				className: "t-card t-form",
				children: [
					/* @__PURE__ */ (0, K.jsx)("h2", { children: t ? "Shughuli na bei" : "Activities and prices" }),
					/* @__PURE__ */ (0, K.jsxs)("div", {
						className: "t-form-grid",
						children: [/* @__PURE__ */ (0, K.jsx)(qm, {
							label: t ? "Sarafu" : "Currency",
							children: /* @__PURE__ */ (0, K.jsx)("select", {
								value: e.currency,
								onChange: (e) => i("currency", e.target.value),
								children: [
									"KES",
									"TZS",
									"UGX",
									"GMD",
									"USD",
									"EUR"
								].map((e) => /* @__PURE__ */ (0, K.jsx)("option", { children: e }, e))
							})
						}), /* @__PURE__ */ (0, K.jsx)(qm, {
							label: t ? "Wageni wengi zaidi" : "Maximum group size",
							children: /* @__PURE__ */ (0, K.jsx)("input", {
								type: "number",
								min: "1",
								max: "100",
								value: e.capacity,
								onChange: (e) => i("capacity", Number(e.target.value))
							})
						})]
					}),
					e.activities.map((n, r) => /* @__PURE__ */ (0, K.jsxs)("div", {
						className: "activity-editor",
						children: [/* @__PURE__ */ (0, K.jsxs)("div", {
							className: "t-form-grid",
							children: [
								/* @__PURE__ */ (0, K.jsx)(qm, {
									label: "Activity · English",
									children: /* @__PURE__ */ (0, K.jsx)("input", {
										value: n.name,
										onChange: (t) => i("activities", e.activities.map((e, n) => n === r ? {
											...e,
											name: t.target.value
										} : e))
									})
								}),
								/* @__PURE__ */ (0, K.jsx)(qm, {
									label: "Shughuli · Kiswahili",
									children: /* @__PURE__ */ (0, K.jsx)("input", {
										value: n.nameSw,
										onChange: (t) => i("activities", e.activities.map((e, n) => n === r ? {
											...e,
											nameSw: t.target.value
										} : e))
									})
								}),
								/* @__PURE__ */ (0, K.jsx)(qm, {
									label: t ? "Dakika" : "Minutes",
									children: /* @__PURE__ */ (0, K.jsx)("input", {
										type: "number",
										min: "5",
										max: "480",
										value: n.minutes,
										onChange: (t) => i("activities", e.activities.map((e, n) => n === r ? {
											...e,
											minutes: Number(t.target.value)
										} : e))
									})
								}),
								/* @__PURE__ */ (0, K.jsx)(qm, {
									label: t ? "Bei kwa mtu" : "Price per visitor",
									children: /* @__PURE__ */ (0, K.jsx)("input", {
										type: "number",
										min: "0",
										step: "1",
										value: n.price,
										onChange: (t) => i("activities", e.activities.map((e, n) => n === r ? {
											...e,
											price: Number(t.target.value)
										} : e))
									})
								})
							]
						}), /* @__PURE__ */ (0, K.jsxs)("label", {
							className: "t-check",
							children: [/* @__PURE__ */ (0, K.jsx)("input", {
								type: "checkbox",
								checked: n.enabled,
								onChange: (t) => i("activities", e.activities.map((e, n) => n === r ? {
									...e,
									enabled: t.target.checked
								} : e))
							}), t ? "Inapatikana" : "Available to request"]
						})]
					}, n.id)),
					/* @__PURE__ */ (0, K.jsxs)("button", {
						className: "t-button secondary",
						disabled: e.activities.length >= 20,
						onClick: () => i("activities", [...e.activities, {
							id: om().slice(0, 12),
							name: "New activity",
							nameSw: "Shughuli mpya",
							minutes: 30,
							price: 0,
							enabled: !1
						}]),
						children: [/* @__PURE__ */ (0, K.jsx)(ge, { size: 16 }), t ? "Ongeza shughuli" : "Add activity"]
					})
				]
			}), /* @__PURE__ */ (0, K.jsxs)("section", {
				className: "t-card t-form",
				children: [
					/* @__PURE__ */ (0, K.jsx)("h2", { children: t ? "Siku na nyakati" : "Visiting days and times" }),
					/* @__PURE__ */ (0, K.jsx)("div", {
						className: "day-choices",
						children: [
							"Sun",
							"Mon",
							"Tue",
							"Wed",
							"Thu",
							"Fri",
							"Sat"
						].map((t, n) => /* @__PURE__ */ (0, K.jsxs)("label", { children: [/* @__PURE__ */ (0, K.jsx)("input", {
							type: "checkbox",
							checked: e.days.includes(n),
							onChange: (t) => i("days", t.target.checked ? [...e.days, n] : e.days.filter((e) => e !== n))
						}), t] }, t))
					}),
					/* @__PURE__ */ (0, K.jsx)(qm, {
						label: t ? "Nyakati za kuanza" : "Start times",
						children: /* @__PURE__ */ (0, K.jsx)("input", {
							value: e.startTimes.join(", "),
							onChange: (e) => i("startTimes", e.target.value.split(",").map((e) => e.trim()))
						})
					}),
					/* @__PURE__ */ (0, K.jsx)("small", { children: "HH:MM, separated by commas. Times are local to the experience." }),
					/* @__PURE__ */ (0, K.jsx)("button", {
						className: "t-button primary",
						onClick: r,
						children: t ? "Kagua rasimu" : "Review draft before publishing"
					}),
					/* @__PURE__ */ (0, K.jsx)("p", {
						className: "t-muted",
						children: t ? "Mabadiliko yanahifadhiwa kama rasimu." : "Changes are saved as a local draft. The approved website stays unchanged until you publish."
					})
				]
			})]
		})]
	});
}
function eh({ state: e, sw: t, change: n }) {
	let [r, i] = (0, C.useState)(""), [a, o] = (0, C.useState)(""), s = e.requests.find((e) => !e.hosted && e.demo && e.kind === "visit" && [
		"requested",
		"needs_details",
		"quoted"
	].includes(e.status));
	function c() {
		try {
			let t = /^(APPROVE|DECLINE)\s+([A-Z0-9]{8})\s+(\d+)$/i.exec(r.trim());
			if (!t) throw Error("Use APPROVE CODE REVISION or DECLINE CODE REVISION.");
			let i = e.requests.find((e) => e.code === t[2].toUpperCase());
			if (i?.hosted || i && !i.demo) throw Error("This simulation accepts only local example requests. Online requests need the connected service.");
			if (!i || i.revision !== Number(t[3])) throw Error("Unknown request or old revision. Check the current request.");
			n(vm(i, t[1].toUpperCase() === "APPROVE" ? "quote" : "decline", e.business, e.requests)), o("Simulated decision saved. No SMS was sent. Visitor acceptance is still required.");
		} catch (e) {
			o(e.message);
		}
	}
	return /* @__PURE__ */ (0, K.jsxs)("div", {
		className: "sms-demo",
		children: [
			s && /* @__PURE__ */ (0, K.jsx)("pre", { children: `${t ? "Ombi" : "Request"} ${s.code}: ${s.guests} visitors, ${s.date} ${s.time}. ${dm(s.total, s.currency)}.\nAPPROVE ${s.code} ${s.revision}\nDECLINE ${s.code} ${s.revision}` }),
			/* @__PURE__ */ (0, K.jsx)(qm, {
				label: t ? "Jibu la mfano" : "Simulated reply",
				children: /* @__PURE__ */ (0, K.jsx)("input", {
					value: r,
					onChange: (e) => i(e.target.value),
					placeholder: "APPROVE CODE REVISION"
				})
			}),
			/* @__PURE__ */ (0, K.jsx)("button", {
				className: "t-button secondary",
				onClick: c,
				children: t ? "Jaribu jibu" : "Test reply locally"
			}),
			a && /* @__PURE__ */ (0, K.jsx)("p", {
				role: "status",
				children: a
			})
		]
	});
}
//#endregion
//#region app/offline-entry.tsx
(0, ke.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, K.jsx)(Jm, {}));
//#endregion
