import { render, screen } from "@testing-library/react";
import ArticleCard from "../components/ArticleCard";

const article = {
  title: "Test Article",
  description: "This is a description",
  link: "https://example.com",
};

describe("ArticleCard", () => {
  it("renders title and description", () => {
    render(<ArticleCard article={article} summary="Résumé test" />);

    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("This is a description")).toBeInTheDocument();
    expect(screen.getByText(/Résumé test/)).toBeInTheDocument();
  });
});
