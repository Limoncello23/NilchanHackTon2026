(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/contracts/contract-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContractForm",
    ()=>ContractForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.2_@babel+core@7.29.7_@types+node@20.19.43_babel-plugin-react-compiler@1.0.0_r_cf72f6ebbbe0af12967a11c131e80bc3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.2_@babel+core@7.29.7_@types+node@20.19.43_babel-plugin-react-compiler@1.0.0_r_cf72f6ebbbe0af12967a11c131e80bc3/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.2_@babel+core@7.29.7_@types+node@20.19.43_babel-plugin-react-compiler@1.0.0_r_cf72f6ebbbe0af12967a11c131e80bc3/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.2_@babel+core@7.29.7_@types+node@20.19.43_babel-plugin-react-compiler@1.0.0_r_cf72f6ebbbe0af12967a11c131e80bc3/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.3.2_@babel+core@7.29.7_@types+node@20.19.43_babel-plugin-react-compiler@1.0.0_r_cf72f6ebbbe0af12967a11c131e80bc3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$routine$2d$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/routine-errors.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function newTaskDraft() {
    return {
        key: crypto.randomUUID(),
        title: "",
        damage: "20"
    };
}
function validateClient(name, repeat, tasks) {
    const errors = {};
    if (!name.trim()) errors.name = "Укажи название босса";
    if (repeat !== "daily" && repeat !== "weekly") errors.submit = "Повтор: только ежедневно или еженедельно";
    if (tasks.length === 0) {
        errors.tasks = "Добавь хотя бы один таск";
        return errors;
    }
    for (const task of tasks){
        if (!task.title.trim()) {
            errors.tasks = "У каждого таска должно быть название";
            return errors;
        }
        const damage = Number(task.damage);
        if (!Number.isFinite(damage) || damage <= 0) {
            errors.tasks = "Урон таска должен быть больше 0";
            return errors;
        }
    }
    return errors;
}
function ContractForm() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(59);
    if ($[0] !== "a6b31311c19e84f9d55c8737be087f06a6add95e6998a45e90e74cd638a61530") {
        for(let $i = 0; $i < 59; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a6b31311c19e84f9d55c8737be087f06a6add95e6998a45e90e74cd638a61530";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [repeat, setRepeat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("weekly");
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [
            newTaskDraft()
        ];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {};
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    const [pending, setPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = function updateTask(key, patch) {
            setTasks({
                "ContractForm[updateTask > setTasks()]": (prev)=>prev.map({
                        "ContractForm[updateTask > setTasks() > prev.map()]": (task)=>task.key === key ? {
                                ...task,
                                ...patch
                            } : task
                    }["ContractForm[updateTask > setTasks() > prev.map()]"])
            }["ContractForm[updateTask > setTasks()]"]);
        };
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const updateTask = t2;
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = function addTask() {
            setTasks(_ContractFormAddTaskSetTasks);
        };
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const addTask = t3;
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = function removeTask(key_0) {
            setTasks({
                "ContractForm[removeTask > setTasks()]": (prev_1)=>{
                    if (prev_1.length <= 1) {
                        return prev_1;
                    }
                    return prev_1.filter({
                        "ContractForm[removeTask > setTasks() > prev_1.filter()]": (task_0)=>task_0.key !== key_0
                    }["ContractForm[removeTask > setTasks() > prev_1.filter()]"]);
                }
            }["ContractForm[removeTask > setTasks()]"]);
        };
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const removeTask = t4;
    let t5;
    if ($[6] !== name || $[7] !== pending || $[8] !== repeat || $[9] !== router || $[10] !== tasks) {
        t5 = async function onSubmit(event) {
            event.preventDefault();
            if (pending) {
                return;
            }
            const clientErrors = validateClient(name, repeat, tasks);
            if (clientErrors.name || clientErrors.tasks || clientErrors.submit) {
                setErrors(clientErrors);
                return;
            }
            setPending(true);
            setErrors({});
            ;
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].createRoutine({
                    name: name.trim(),
                    repeat,
                    tasks: tasks.map(_ContractFormOnSubmitTasksMap)
                });
                router.push("/");
                router.refresh();
            } catch (t6) {
                const err = t6;
                setErrors({
                    submit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$routine$2d$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapRoutineApiError"])(err)
                });
                setPending(false);
            }
        };
        $[6] = name;
        $[7] = pending;
        $[8] = repeat;
        $[9] = router;
        $[10] = tasks;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    const onSubmit = t5;
    let t6;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            htmlFor: "boss-name",
            className: "block text-xs uppercase tracking-[0.15em] text-tavern-muted",
            children: "Название босса"
        }, void 0, false, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 166,
            columnNumber: 10
        }, this);
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    let t7;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "ContractForm[<input>.onChange]": (e)=>setName(e.target.value)
        })["ContractForm[<input>.onChange]"];
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] !== name || $[15] !== pending) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            id: "boss-name",
            type: "text",
            value: name,
            onChange: t7,
            disabled: pending,
            placeholder: "\u0418\u043C\u044F \u0431\u043E\u0441\u0441\u0430",
            className: "w-full rounded-md border border-tavern-border bg-tavern-wood px-3 py-3 text-tavern-parchment placeholder:text-tavern-muted/60 focus:border-tavern-gold/50 focus:outline-none"
        }, void 0, false, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 182,
            columnNumber: 10
        }, this);
        $[14] = name;
        $[15] = pending;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== errors.name) {
        t9 = errors.name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-red-400",
            role: "alert",
            children: errors.name
        }, void 0, false, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 191,
            columnNumber: 24
        }, this) : null;
        $[17] = errors.name;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] !== t8 || $[20] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t6,
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 199,
            columnNumber: 11
        }, this);
        $[19] = t8;
        $[20] = t9;
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    let t11;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
            className: "text-xs uppercase tracking-[0.15em] text-tavern-muted",
            children: "Повтор"
        }, void 0, false, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 208,
            columnNumber: 11
        }, this);
        $[22] = t11;
    } else {
        t11 = $[22];
    }
    let t12;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = [
            {
                value: "daily",
                label: "\u0415\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E"
            },
            {
                value: "weekly",
                label: "\u0415\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E"
            }
        ];
        $[23] = t12;
    } else {
        t12 = $[23];
    }
    let t13;
    if ($[24] !== repeat) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-3",
            children: t12.map({
                "ContractForm[(anonymous)()]": (option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: `inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm transition ${repeat === option.value ? "border-tavern-gold/60 bg-tavern-gold/15 text-tavern-gold" : "border-tavern-border text-tavern-parchment hover:border-tavern-gold/40"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "radio",
                                name: "repeat",
                                value: option.value,
                                checked: repeat === option.value,
                                onChange: {
                                    "ContractForm[(anonymous)() > <input>.onChange]": ()=>setRepeat(option.value)
                                }["ContractForm[(anonymous)() > <input>.onChange]"],
                                className: "sr-only"
                            }, void 0, false, {
                                fileName: "[project]/src/components/contracts/contract-form.tsx",
                                lineNumber: 229,
                                columnNumber: 355
                            }, this),
                            option.label
                        ]
                    }, option.value, true, {
                        fileName: "[project]/src/components/contracts/contract-form.tsx",
                        lineNumber: 229,
                        columnNumber: 50
                    }, this)
            }["ContractForm[(anonymous)()]"])
        }, void 0, false, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 228,
            columnNumber: 11
        }, this);
        $[24] = repeat;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] !== pending || $[27] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
            className: "space-y-2",
            disabled: pending,
            children: [
                t11,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 240,
            columnNumber: 11
        }, this);
        $[26] = pending;
        $[27] = t13;
        $[28] = t14;
    } else {
        t14 = $[28];
    }
    let t15;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs uppercase tracking-[0.15em] text-tavern-muted",
            children: "Таски"
        }, void 0, false, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 249,
            columnNumber: 11
        }, this);
        $[29] = t15;
    } else {
        t15 = $[29];
    }
    let t16;
    if ($[30] !== pending) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-end justify-between gap-3",
            children: [
                t15,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: addTask,
                    disabled: pending,
                    className: "text-sm font-semibold uppercase tracking-wider text-tavern-gold transition hover:text-tavern-parchment disabled:opacity-60",
                    children: "+ Таск"
                }, void 0, false, {
                    fileName: "[project]/src/components/contracts/contract-form.tsx",
                    lineNumber: 256,
                    columnNumber: 70
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 256,
            columnNumber: 11
        }, this);
        $[30] = pending;
        $[31] = t16;
    } else {
        t16 = $[31];
    }
    let t17;
    if ($[32] !== pending || $[33] !== tasks) {
        let t18;
        if ($[35] !== pending || $[36] !== tasks.length) {
            t18 = ({
                "ContractForm[tasks.map()]": (task_2, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex flex-col gap-2 rounded-md border border-tavern-border bg-tavern-wood/60 p-3 sm:flex-row sm:items-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1 space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: `task-title-${task_2.key}`,
                                        className: "block text-xs text-tavern-muted",
                                        children: [
                                            "Таск",
                                            " ",
                                            index + 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/contracts/contract-form.tsx",
                                        lineNumber: 267,
                                        columnNumber: 238
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: `task-title-${task_2.key}`,
                                        type: "text",
                                        value: task_2.title,
                                        onChange: {
                                            "ContractForm[tasks.map() > <input>.onChange]": (e_0)=>updateTask(task_2.key, {
                                                    title: e_0.target.value
                                                })
                                        }["ContractForm[tasks.map() > <input>.onChange]"],
                                        disabled: pending,
                                        placeholder: "\u0421\u0434\u0435\u043B\u0430\u043B \u0434\u0435\u043B\u043E",
                                        className: "w-full rounded-md border border-tavern-border bg-tavern-wood px-3 py-2.5 text-sm text-tavern-parchment placeholder:text-tavern-muted/60 focus:border-tavern-gold/50 focus:outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/contracts/contract-form.tsx",
                                        lineNumber: 267,
                                        columnNumber: 354
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/contracts/contract-form.tsx",
                                lineNumber: 267,
                                columnNumber: 196
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full space-y-1 sm:w-28",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: `task-damage-${task_2.key}`,
                                        className: "block text-xs text-tavern-muted",
                                        children: "Урон"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/contracts/contract-form.tsx",
                                        lineNumber: 271,
                                        columnNumber: 406
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: `task-damage-${task_2.key}`,
                                        type: "number",
                                        min: 1,
                                        step: 1,
                                        value: task_2.damage,
                                        onChange: {
                                            "ContractForm[tasks.map() > <input>.onChange]": (e_1)=>updateTask(task_2.key, {
                                                    damage: e_1.target.value
                                                })
                                        }["ContractForm[tasks.map() > <input>.onChange]"],
                                        disabled: pending,
                                        className: "w-full rounded-md border border-tavern-border bg-tavern-wood px-3 py-2.5 text-sm text-tavern-parchment focus:border-tavern-gold/50 focus:outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/contracts/contract-form.tsx",
                                        lineNumber: 271,
                                        columnNumber: 507
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/contracts/contract-form.tsx",
                                lineNumber: 271,
                                columnNumber: 364
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: {
                                    "ContractForm[tasks.map() > <button>.onClick]": ()=>removeTask(task_2.key)
                                }["ContractForm[tasks.map() > <button>.onClick]"],
                                disabled: pending || tasks.length <= 1,
                                className: "min-h-11 rounded-md border border-tavern-border px-3 text-sm text-tavern-muted transition hover:border-red-400/50 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40",
                                "aria-label": `Убрать таск ${index + 1}`,
                                children: "Убрать"
                            }, void 0, false, {
                                fileName: "[project]/src/components/contracts/contract-form.tsx",
                                lineNumber: 275,
                                columnNumber: 253
                            }, this)
                        ]
                    }, task_2.key, true, {
                        fileName: "[project]/src/components/contracts/contract-form.tsx",
                        lineNumber: 267,
                        columnNumber: 57
                    }, this)
            })["ContractForm[tasks.map()]"];
            $[35] = pending;
            $[36] = tasks.length;
            $[37] = t18;
        } else {
            t18 = $[37];
        }
        t17 = tasks.map(t18);
        $[32] = pending;
        $[33] = tasks;
        $[34] = t17;
    } else {
        t17 = $[34];
    }
    let t18;
    if ($[38] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "flex flex-col gap-3",
            children: t17
        }, void 0, false, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 294,
            columnNumber: 11
        }, this);
        $[38] = t17;
        $[39] = t18;
    } else {
        t18 = $[39];
    }
    let t19;
    if ($[40] !== errors.tasks) {
        t19 = errors.tasks ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-red-400",
            role: "alert",
            children: errors.tasks
        }, void 0, false, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 302,
            columnNumber: 26
        }, this) : null;
        $[40] = errors.tasks;
        $[41] = t19;
    } else {
        t19 = $[41];
    }
    let t20;
    if ($[42] !== t16 || $[43] !== t18 || $[44] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                t16,
                t18,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 310,
            columnNumber: 11
        }, this);
        $[42] = t16;
        $[43] = t18;
        $[44] = t19;
        $[45] = t20;
    } else {
        t20 = $[45];
    }
    let t21;
    if ($[46] !== errors.submit) {
        t21 = errors.submit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-center text-sm text-red-400",
            role: "alert",
            children: errors.submit
        }, void 0, false, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 320,
            columnNumber: 27
        }, this) : null;
        $[46] = errors.submit;
        $[47] = t21;
    } else {
        t21 = $[47];
    }
    let t22;
    if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/",
            className: "inline-flex min-h-12 items-center justify-center rounded-md border border-tavern-border px-5 py-3 text-sm font-semibold uppercase tracking-wider text-tavern-parchment transition hover:border-tavern-gold/50 hover:text-tavern-gold",
            children: "Отмена"
        }, void 0, false, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 328,
            columnNumber: 11
        }, this);
        $[48] = t22;
    } else {
        t22 = $[48];
    }
    const t23 = pending ? "\u0421\u043E\u0437\u0434\u0430\u0451\u043C\u2026" : "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442";
    let t24;
    if ($[49] !== pending || $[50] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3 sm:flex-row sm:justify-end",
            children: [
                t22,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    disabled: pending,
                    className: "inline-flex min-h-12 items-center justify-center rounded-md border border-tavern-gold/50 bg-tavern-gold/15 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-tavern-gold transition hover:bg-tavern-gold/25 disabled:cursor-wait disabled:opacity-60",
                    children: t23
                }, void 0, false, {
                    fileName: "[project]/src/components/contracts/contract-form.tsx",
                    lineNumber: 336,
                    columnNumber: 80
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 336,
            columnNumber: 11
        }, this);
        $[49] = pending;
        $[50] = t23;
        $[51] = t24;
    } else {
        t24 = $[51];
    }
    let t25;
    if ($[52] !== onSubmit || $[53] !== t10 || $[54] !== t14 || $[55] !== t20 || $[56] !== t21 || $[57] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: onSubmit,
            className: "flex w-full flex-col gap-6 rounded-lg border border-tavern-border bg-tavern-panel p-5 shadow-lg shadow-black/40 sm:p-6",
            noValidate: true,
            children: [
                t10,
                t14,
                t20,
                t21,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/contracts/contract-form.tsx",
            lineNumber: 345,
            columnNumber: 11
        }, this);
        $[52] = onSubmit;
        $[53] = t10;
        $[54] = t14;
        $[55] = t20;
        $[56] = t21;
        $[57] = t24;
        $[58] = t25;
    } else {
        t25 = $[58];
    }
    return t25;
}
_s(ContractForm, "EzhUJb9UYjZYC1mZnBv2YtlhlYk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$3$2e$2_$40$babel$2b$core$40$7$2e$29$2e$7_$40$types$2b$node$40$20$2e$19$2e$43_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_r_cf72f6ebbbe0af12967a11c131e80bc3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ContractForm;
function _ContractFormOnSubmitTasksMap(task_1) {
    return {
        title: task_1.title.trim(),
        damage: Number(task_1.damage)
    };
}
function _ContractFormAddTaskSetTasks(prev_0) {
    return [
        ...prev_0,
        newTaskDraft()
    ];
}
var _c;
__turbopack_context__.k.register(_c, "ContractForm");
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
"[project]/src/lib/api/routine-errors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapRoutineApiError",
    ()=>mapRoutineApiError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/types.ts [app-client] (ecmascript)");
;
const SERVER_ERROR_MAP = [
    {
        match: "invalid routine name",
        message: "Укажи название босса"
    },
    {
        match: "invalid repeat",
        message: "Повтор: только ежедневно или еженедельно"
    },
    {
        match: "no tasks",
        message: "Добавь хотя бы один таск"
    },
    {
        match: "invalid task title",
        message: "У каждого таска должно быть название"
    },
    {
        match: "invalid task damage",
        message: "Урон таска должен быть больше 0"
    }
];
function mapRoutineApiError(err) {
    if (!(err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"])) return "Не удалось создать контракт";
    const lower = err.message.toLowerCase();
    for (const entry of SERVER_ERROR_MAP){
        if (lower.includes(entry.match)) return entry.message;
    }
    return err.message.trim() || "Не удалось создать контракт";
}
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
]);

//# sourceMappingURL=src_1iz0gx4._.js.map