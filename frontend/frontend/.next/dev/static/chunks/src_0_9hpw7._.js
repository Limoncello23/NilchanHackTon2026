(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/board/contract-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContractCard",
    ()=>ContractCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.2_@babel+core@7.29.7_@types+node@20.19.43_babel-plugin-react-compiler@1.0.0_r_cf72f6ebbbe0af12967a11c131e80bc3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.2_@babel+core@7.29.7_@types+node@20.19.43_babel-plugin-react-compiler@1.0.0_r_cf72f6ebbbe0af12967a11c131e80bc3/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.2_@babel+core@7.29.7_@types+node@20.19.43_babel-plugin-react-compiler@1.0.0_r_cf72f6ebbbe0af12967a11c131e80bc3/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.2_@babel+core@7.29.7_@types+node@20.19.43_babel-plugin-react-compiler@1.0.0_r_cf72f6ebbbe0af12967a11c131e80bc3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routine$2d$stats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/routine-stats.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const REPEAT_LABEL = {
    daily: "ежедневно",
    weekly: "еженедельно"
};
function ContractCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "1d7f73e0b96609eed8e151e72c29b016ac17f3c50ce4de8b8af9f6647f5bb8d6") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1d7f73e0b96609eed8e151e72c29b016ac17f3c50ce4de8b8af9f6647f5bb8d6";
    }
    const { routine } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let t1;
    if ($[1] !== routine) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routine$2d$stats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sumTaskDamage"])(routine);
        $[1] = routine;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const total = t1;
    const [pending, setPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t2;
    if ($[3] !== pending || $[4] !== router || $[5] !== routine.id) {
        t2 = async function takeContract() {
            if (pending) {
                return;
            }
            setPending(true);
            setError(null);
            ;
            try {
                const dungeon = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].createDungeon(routine.id);
                router.push(`/dungeon?id=${dungeon.id}`);
            } catch (t3) {
                const err = t3;
                const message = err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? err.message : "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u0437\u044F\u0442\u044C \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442";
                setError(message);
                setPending(false);
            }
        };
        $[3] = pending;
        $[4] = router;
        $[5] = routine.id;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    const takeContract = t2;
    let t3;
    if ($[7] !== routine.name) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "font-display text-xl leading-tight text-tavern-parchment",
            children: routine.name
        }, void 0, false, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 68,
            columnNumber: 10
        }, this);
        $[7] = routine.name;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    const t4 = REPEAT_LABEL[routine.repeat];
    let t5;
    if ($[9] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "shrink-0 rounded border border-tavern-border px-2 py-0.5 text-xs uppercase tracking-wide text-tavern-muted",
            children: t4
        }, void 0, false, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 77,
            columnNumber: 10
        }, this);
        $[9] = t4;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] !== t3 || $[12] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between gap-2",
            children: [
                t3,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 85,
            columnNumber: 10
        }, this);
        $[11] = t3;
        $[12] = t5;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    let t7;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
            className: "text-xs text-tavern-muted",
            children: "Таски"
        }, void 0, false, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 94,
            columnNumber: 10
        }, this);
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== routine.tasks.length) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded bg-tavern-wood/80 px-2 py-2",
            children: [
                t7,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                    className: "font-medium text-tavern-parchment",
                    children: routine.tasks.length
                }, void 0, false, {
                    fileName: "[project]/src/components/board/contract-card.tsx",
                    lineNumber: 101,
                    columnNumber: 67
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 101,
            columnNumber: 10
        }, this);
        $[15] = routine.tasks.length;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
            className: "text-xs text-tavern-muted",
            children: "HP"
        }, void 0, false, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 109,
            columnNumber: 10
        }, this);
        $[17] = t9;
    } else {
        t9 = $[17];
    }
    let t10;
    if ($[18] !== total) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded bg-tavern-wood/80 px-2 py-2",
            children: [
                t9,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                    className: "font-medium text-tavern-parchment",
                    children: total
                }, void 0, false, {
                    fileName: "[project]/src/components/board/contract-card.tsx",
                    lineNumber: 116,
                    columnNumber: 68
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 116,
            columnNumber: 11
        }, this);
        $[18] = total;
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    let t11;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
            className: "text-xs text-tavern-muted",
            children: "XP"
        }, void 0, false, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 124,
            columnNumber: 11
        }, this);
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    let t12;
    if ($[21] !== total) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded bg-tavern-wood/80 px-2 py-2",
            children: [
                t11,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                    className: "font-medium text-tavern-gold",
                    children: [
                        "+",
                        total
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/board/contract-card.tsx",
                    lineNumber: 131,
                    columnNumber: 69
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 131,
            columnNumber: 11
        }, this);
        $[21] = total;
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    let t13;
    if ($[23] !== t10 || $[24] !== t12 || $[25] !== t8) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
            className: "grid grid-cols-3 gap-2 text-center text-sm",
            children: [
                t8,
                t10,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 139,
            columnNumber: 11
        }, this);
        $[23] = t10;
        $[24] = t12;
        $[25] = t8;
        $[26] = t13;
    } else {
        t13 = $[26];
    }
    let t14;
    if ($[27] !== error) {
        t14 = error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-center text-sm text-red-400",
            role: "alert",
            children: error
        }, void 0, false, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 149,
            columnNumber: 19
        }, this) : null;
        $[27] = error;
        $[28] = t14;
    } else {
        t14 = $[28];
    }
    const t15 = pending ? "\u041F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u043C\u2026" : "\u0412\u0437\u044F\u0442\u044C \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442";
    let t16;
    if ($[29] !== pending || $[30] !== t15 || $[31] !== takeContract) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: takeContract,
            disabled: pending,
            className: "mt-auto block w-full rounded-md border border-tavern-gold/40 bg-tavern-gold/15 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-tavern-gold transition hover:bg-tavern-gold/25 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60",
            children: t15
        }, void 0, false, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 158,
            columnNumber: 11
        }, this);
        $[29] = pending;
        $[30] = t15;
        $[31] = takeContract;
        $[32] = t16;
    } else {
        t16 = $[32];
    }
    let t17;
    if ($[33] !== t13 || $[34] !== t14 || $[35] !== t16 || $[36] !== t6) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "flex flex-col gap-3 rounded-lg border border-tavern-border bg-tavern-panel p-4 shadow-lg shadow-black/40 transition hover:border-tavern-gold/60 hover:shadow-tavern-gold/10",
            children: [
                t6,
                t13,
                t14,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/board/contract-card.tsx",
            lineNumber: 168,
            columnNumber: 11
        }, this);
        $[33] = t13;
        $[34] = t14;
        $[35] = t16;
        $[36] = t6;
        $[37] = t17;
    } else {
        t17 = $[37];
    }
    return t17;
}
_s(ContractCard, "HIOMv5ttKkA1qbYSpPVMXjMtbmo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ContractCard;
var _c;
__turbopack_context__.k.register(_c, "ContractCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "liveClient",
    ()=>liveClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/types.ts [app-client] (ecmascript)");
;
;
async function request(path, init) {
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["env"].apiUrl}${path}`, {
        ...init,
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            ...init?.headers
        }
    });
    if (!res.ok) {
        const text = await res.text().catch(()=>"");
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"](text || res.statusText || "Request failed", res.status);
    }
    if (res.status === 204) return undefined;
    return res.json();
}
const liveClient = {
    getHealth: ()=>request("/health"),
    getRoutines: ()=>request("/routines"),
    createRoutine: (body)=>request("/routines", {
            method: "POST",
            body: JSON.stringify(body)
        }),
    createDungeon: (routineId)=>request(`/routines/${routineId}/dungeons`, {
            method: "POST"
        }),
    getDungeon: (id)=>request(`/dungeons/${id}`),
    completeTask: (taskId)=>request(`/tasks/${taskId}/complete`, {
            method: "POST"
        })
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/types.ts [app-client] (ecmascript)");
;
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["liveClient"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError
]);
class ApiError extends Error {
    status;
    constructor(message, status){
        super(message), this.status = status;
        this.name = "ApiError";
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/env.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "env",
    ()=>env
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.2_@babel+core@7.29.7_@types+node@20.19.43_babel-plugin-react-compiler@1.0.0_r_cf72f6ebbbe0af12967a11c131e80bc3/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/* eslint-disable node/no-process-env -- single place for env reads */ const DEFAULT_API_URL = "http://localhost:8080";
const env = {
    // API_URL: server-side (e.g. Docker SSR → http://app:8080)
    // NEXT_PUBLIC_API_URL: browser / build-time public URL
    apiUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_URL || ("TURBOPACK compile-time value", "http://localhost:8080") || DEFAULT_API_URL
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/routine-stats.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sumTaskDamage",
    ()=>sumTaskDamage
]);
function sumTaskDamage(routine) {
    return routine.tasks.reduce((sum, task)=>sum + task.damage, 0);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0_9hpw7._.js.map