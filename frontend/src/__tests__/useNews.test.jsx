import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import useNews from "../hooks/useNews";
import { vi } from "vitest";

beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { title: "Test Article", description: "Description" },
        ]),
    })
  );
});

test("fetches articles", async () => {
  const { result } = renderHook(() => useNews());

  await waitFor(() =>
    expect(result.current.articles.length).toBeGreaterThan(0)
  );

  expect(result.current.articles[0].title).toBe("Test Article");
});
