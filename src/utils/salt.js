const O = [2277735313, 289559509]
    , F = [1291169091, 658871167]
    , A = [0, 5]
    , I = [0, 1390208809]
    , T = [0, 944331445];

const M = [4283543511, 3981806797]
    , H = [3301882366, 444984403];

function pn(e) {
    return N(cn(e))
}

function cn(e) {
    for (var t = "", n = 0, r = Object.keys(e).sort(); n < r.length; n++) {
        var l = r[n]
            , o = e[l]
            , a = "error" in o ? "error" : JSON.stringify(o.value);
        t += "".concat(t ? "|" : "").concat(l.replace(/([:|\\])/g, "\\$1"), ":").concat(a)
    }
    return t
}

function N(e, t) {
    var n = x(e);
    t = t || 0;
    var r, l = [0, n.length], o = l[1] % 16, a = l[1] - o, i = [0, t], s = [0, t], u = [0, 0], c = [0, 0];
    for (r = 0; r < a; r += 16)
        u[0] = n[r + 4] | n[r + 5] << 8 | n[r + 6] << 16 | n[r + 7] << 24,
            u[1] = n[r] | n[r + 1] << 8 | n[r + 2] << 16 | n[r + 3] << 24,
            c[0] = n[r + 12] | n[r + 13] << 8 | n[r + 14] << 16 | n[r + 15] << 24,
            c[1] = n[r + 8] | n[r + 9] << 8 | n[r + 10] << 16 | n[r + 11] << 24,
            _(u, O),
            U(u, 31),
            _(u, F),
            z(i, u),
            U(i, 27),
            k(i, s),
            _(i, A),
            k(i, I),
            _(c, F),
            U(c, 33),
            _(c, O),
            z(s, c),
            U(s, 31),
            k(s, i),
            _(s, A),
            k(s, T);
    u[0] = 0,
        u[1] = 0,
        c[0] = 0,
        c[1] = 0;
    var d = [0, 0];
    switch (o) {
        case 15:
            d[1] = n[r + 14],
                E(d, 48),
                z(c, d);
        case 14:
            d[1] = n[r + 13],
                E(d, 40),
                z(c, d);
        case 13:
            d[1] = n[r + 12],
                E(d, 32),
                z(c, d);
        case 12:
            d[1] = n[r + 11],
                E(d, 24),
                z(c, d);
        case 11:
            d[1] = n[r + 10],
                E(d, 16),
                z(c, d);
        case 10:
            d[1] = n[r + 9],
                E(d, 8),
                z(c, d);
        case 9:
            d[1] = n[r + 8],
                z(c, d),
                _(c, F),
                U(c, 33),
                _(c, O),
                z(s, c);
        case 8:
            d[1] = n[r + 7],
                E(d, 56),
                z(u, d);
        case 7:
            d[1] = n[r + 6],
                E(d, 48),
                z(u, d);
        case 6:
            d[1] = n[r + 5],
                E(d, 40),
                z(u, d);
        case 5:
            d[1] = n[r + 4],
                E(d, 32),
                z(u, d);
        case 4:
            d[1] = n[r + 3],
                E(d, 24),
                z(u, d);
        case 3:
            d[1] = n[r + 2],
                E(d, 16),
                z(u, d);
        case 2:
            d[1] = n[r + 1],
                E(d, 8),
                z(u, d);
        case 1:
            d[1] = n[r],
                z(u, d),
                _(u, O),
                U(u, 31),
                _(u, F),
                z(i, u)
    }
    return z(i, l),
        z(s, l),
        k(i, s),
        k(s, i),
        D(i),
        D(s),
        k(i, s),
        k(s, i),
    ("00000000" + (i[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (s[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (s[1] >>> 0).toString(16)).slice(-8)
}

function x(e) {
    for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r > 127)
            return (new TextEncoder).encode(e);
        t[n] = r
    }
    return t
}

function _(e, t) {
    var n = e[0] >>> 16
        , r = 65535 & e[0]
        , l = e[1] >>> 16
        , o = 65535 & e[1]
        , a = t[0] >>> 16
        , i = 65535 & t[0]
        , s = t[1] >>> 16
        , u = 65535 & t[1]
        , c = 0
        , d = 0
        , p = 0
        , f = 0;
    f += o * u,
        p += f >>> 16,
        f &= 65535,
        p += l * u,
        d += p >>> 16,
        p &= 65535,
        p += o * s,
        d += p >>> 16,
        p &= 65535,
        d += r * u,
        c += d >>> 16,
        d &= 65535,
        d += l * s,
        c += d >>> 16,
        d &= 65535,
        d += o * i,
        c += d >>> 16,
        d &= 65535,
        c += n * u + r * s + l * i + o * a,
        c &= 65535,
        e[0] = c << 16 | d,
        e[1] = p << 16 | f
}

function U(e, t) {
    var n = e[0];
    t %= 64,
        32 === t ? (e[0] = e[1],
            e[1] = n) : t < 32 ? (e[0] = n << t | e[1] >>> 32 - t,
            e[1] = e[1] << t | n >>> 32 - t) : (t -= 32,
            e[0] = e[1] << t | n >>> 32 - t,
            e[1] = n << t | e[1] >>> 32 - t)
}

function k(e, t) {
    var n = e[0] >>> 16
        , r = 65535 & e[0]
        , l = e[1] >>> 16
        , o = 65535 & e[1]
        , a = t[0] >>> 16
        , i = 65535 & t[0]
        , s = t[1] >>> 16
        , u = 65535 & t[1]
        , c = 0
        , d = 0
        , p = 0
        , f = 0;
    f += o + u,
        p += f >>> 16,
        f &= 65535,
        p += l + s,
        d += p >>> 16,
        p &= 65535,
        d += r + i,
        c += d >>> 16,
        d &= 65535,
        c += n + a,
        c &= 65535,
        e[0] = c << 16 | d,
        e[1] = p << 16 | f
}


function E(e, t) {
    t %= 64,
    0 !== t && (t < 32 ? (e[0] = e[1] >>> 32 - t,
        e[1] = e[1] << t) : (e[0] = e[1] << t - 32,
        e[1] = 0))
}

function z(e, t) {
    e[0] ^= t[0],
        e[1] ^= t[1]
}

function D(e) {
    var t = [0, e[0] >>> 1];
    z(e, t),
        _(e, M),
        t[1] = e[0] >>> 1,
        z(e, t),
        _(e, H),
        t[1] = e[0] >>> 1,
        z(e, t)
}




function get_salt() {
    const e = {
        deviceMemory: {
            value: window.navigator.deviceMemory
        },
        hardwareConcurrency: {
            value: window.navigator.hardwareConcurrency
        },
        languages: {
            value: window.navigator.languages
        },
        platform: {
            value: window.navigator.platform
        },
        screenResolution: {
            value: {
                height: screen.height,
                pixelDepth: screen.pixelDepth,
                width: screen.width
            }
        },
        timezone: {
            value: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        ua: {
            value: window.navigator.userAgent
        }
    }
    return pn(e)
}

export default get_salt;