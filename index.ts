import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

const BUILTIN_TOOLS = new Set(["read", "bash", "edit", "write", "grep", "find", "ls"]);

export default function (pi: ExtensionAPI) {
	let prevKey = "";

	function updateStatus(ctx: ExtensionContext) {
		const active = pi.getActiveTools().filter((t) => BUILTIN_TOOLS.has(t));
		const key = active.join(",");
		if (key === prevKey) return;
		prevKey = key;

		if (active.length === 0) {
			ctx.ui.setStatus("visible-tools", undefined);
			return;
		}

		ctx.ui.setStatus("visible-tools", ctx.ui.theme.fg("dim", `tools: ${active.join(", ")}`));
	}

	pi.on("session_start", async (_event, ctx) => {
		updateStatus(ctx);
	});

	pi.on("turn_start", async (_event, ctx) => {
		updateStatus(ctx);
	});
}
