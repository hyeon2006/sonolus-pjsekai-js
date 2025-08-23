import { DatabaseEngineItem } from "@sonolus/core";

export { susToUSC } from "./sus/convert.js";
export { uscToLevelData } from "./usc/convert.js";
export * from "./usc/index.js";
export { uscToUSC } from "./usc/revert.js";

export const version = "1.4.14";

export const databaseEngineItem = {
    name: "prosekaR",
    version: 13,
    title: {
        en: "ProSeka R",
        ja: "プロセカ R",
        ko: "프로세카 R",
        zhs: "世界计划 R",
        zht: "世界計劃 R",
    },
    subtitle: {
        en: "ProSeka Rush",
        ja: "プロセカ ラッシュ",
        ko: "프로세카 러쉬",
        zhs: "世界计划 匆忙",
        zht: "世界計劃 匆忙",
    },
    author: {
        en: "prosekaR",
    },
    description: {
        en: [
            "A recreation of Project Sekai: Colorful Stage! engine in Sonolus.",
            `Version: ${version}`,
            "",
            "Forked from the pjsekai engine by Burrito#1000.",
            "https://github.com/NonSpicyBurrito/sonolus-pjsekai-engine",
            "",
            "Github:",
            "https://github.com/hyeon2006/sonolus-pjsekai-js",
        ].join("\n"),
        ko: [
            "A recreation of Project Sekai: Colorful Stage! engine in Sonolus.",
            `버전: ${version}`,
            "",
            "Burrito#1000의 pjsekai 엔진에서 포크되었습니다.",
            "https://github.com/NonSpicyBurrito/sonolus-pjsekai-engine",
            "",
            "깃허브:",
            "https://github.com/hyeon2006/sonolus-pjsekai-js",
        ].join("\n"),
    },
} as const satisfies Partial<DatabaseEngineItem>;
