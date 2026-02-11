import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ScriptListPage from "./ScriptListPage";
import { useLoaderData, useParams } from "react-router";
import type { ScriptOverview } from "../types/script";

// Mock react-router
vi.mock("react-router", () => ({
  useLoaderData: vi.fn(),
  useParams: vi.fn(),
}));

// Mock CSS and assets
vi.mock("../index.css", () => ({}));

// Mock ScriptCard component
vi.mock("../components/ScriptCard", () => ({
  ScriptCard: ({ script }: { script: ScriptOverview }) => (
    <div data-testid="script-card">{script.title}</div>
  ),
}));

describe("ScriptListPage Sorting", () => {
  it("should sort scripts by updatedAt in descending order", () => {
    // Mock data with different updatedAt values
    const mockScripts: ScriptOverview[] = [
      {
        id: "1",
        title: "Oldest Script",
        updatedAt: { seconds: 1000 },
      },
      {
        id: "2",
        title: "Newest Script",
        updatedAt: { seconds: 3000 },
      },
      {
        id: "3",
        title: "Middle Script",
        updatedAt: { seconds: 2000 },
      },
    ];

    (useParams as any).mockReturnValue({ categoryId: "test-category" });
    (useLoaderData as any).mockReturnValue({ scripts: mockScripts });

    render(<ScriptListPage />);

    const scriptCards = screen.getAllByTestId("script-card");

    // Check if titles are in the expected sorted order: Newest -> Middle -> Oldest
    expect(scriptCards[0].textContent).toBe("Newest Script");
    expect(scriptCards[1].textContent).toBe("Middle Script");
    expect(scriptCards[2].textContent).toBe("Oldest Script");
  });

  it("should handle scripts without updatedAt by treating them as oldest", () => {
    const mockScripts: ScriptOverview[] = [
      {
        id: "1",
        title: "No Date Script",
      },
      {
        id: "2",
        title: "With Date Script",
        updatedAt: { seconds: 1000 },
      },
    ];

    (useParams as any).mockReturnValue({ categoryId: "test-category" });
    (useLoaderData as any).mockReturnValue({ scripts: mockScripts });

    render(<ScriptListPage />);

    const scriptCards = screen.getAllByTestId("script-card");

    expect(scriptCards[0].textContent).toBe("With Date Script");
    expect(scriptCards[1].textContent).toBe("No Date Script");
  });

  it("should show empty state message when no scripts are available", () => {
    (useParams as any).mockReturnValue({ categoryId: "test-category" });
    (useLoaderData as any).mockReturnValue({ scripts: [] });

    render(<ScriptListPage />);

    expect(
      screen.getByText(/No scripts available in this category/i),
    ).toBeDefined();
  });
});
