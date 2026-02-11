import { describe, it, expect } from "vitest";
import { formatTime } from "./time";

describe("formatTime", () => {
  it("should format seconds into HH:MM:SS when hours > 0", () => {
    expect(formatTime(3661)).toBe("01:01:01");
  });

  it("should format seconds into MM:SS when hours == 0 but minutes > 0", () => {
    expect(formatTime(65)).toBe("01:05");
  });

  it("should format seconds into 00:SS when minutes == 0", () => {
    expect(formatTime(45)).toBe("00:45");
  });

  it("should handle 0 seconds correctly", () => {
    expect(formatTime(0)).toBe("00:00");
  });

  it("should round decimal seconds", () => {
    expect(formatTime(65.7)).toBe("01:06");
    expect(formatTime(65.2)).toBe("01:05");
  });

  it("should handle negative seconds by treating them as absolute", () => {
    expect(formatTime(-65)).toBe("01:05");
  });
});
