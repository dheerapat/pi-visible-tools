import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

const BUILTIN_TOOLS = new Set(["read", "bash", "edit", "write", "grep", "find", "ls"]);

export default function (pi: ExtensionAPI) {
	let prevKey = "";

	function updateWidget(ctx: ExtensionContext) {
		const active = pi.getActiveTools().filter((t) => BUILTIN_TOOLS.has(t));
		const key = active.join(",");
		if (key === prevKey) return;
		prevKey = key;

		if (active.length === 0) {
			ctx.ui.setWidget("visible-tools", undefined);
			return;
		}

		ctx.ui.setWidget("visible-tools", (_tui, theme) => ({
			render: () => [theme.fg("dim", `tools: ${active.join(", ")}`)],
			invalidate: () => {},
		}), { placement: "belowEditor" });
	}

	pi.on("session_start", async (_event, ctx) => {
		updateWidget(ctx);
	});

	pi.on("turn_start", async (_event, ctx) => {
		updateWidget(ctx);
	});
}
