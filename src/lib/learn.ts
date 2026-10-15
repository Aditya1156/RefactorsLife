import type { LearningPath, Video } from "@/content/types";
import { durationSeconds, formatTotal } from "./utils";

/** Joins a learning path's steps with video titles and durations. */
export function resolvePath(path: LearningPath, videos: Video[]) {
  const byId = new Map(videos.map((v) => [v.id, v]));
  const steps = path.steps.map((s) => {
    const v = byId.get(s.video);
    return { id: s.video, title: v?.title ?? "Video", duration: v?.duration, note: s.note };
  });
  const seconds = steps.reduce((sum, s) => sum + durationSeconds(s.duration), 0);
  return { steps, totalLabel: seconds ? formatTotal(seconds) : `${steps.length} videos` };
}
