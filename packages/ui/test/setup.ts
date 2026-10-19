import { Window } from "happy-dom";
const win = new Window();
(globalThis as any).window = win;
(globalThis as any).document = win.document;
(globalThis as any).navigator = win.navigator;
