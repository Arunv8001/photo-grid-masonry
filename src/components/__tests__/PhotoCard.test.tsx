import React from "react";
import { render, screen } from "@testing-library/react";
import PhotoCard from "../PhotoCard";

describe("PhotoCard", () => {
  it("renders a photo and photographer", () => {
    const mockPhoto = {
      src: { medium: "https://via.placeholder.com/300" },
      photographer: "Photographer Name",
    };

    render(<PhotoCard photo={mockPhoto} />);
    expect(screen.getByRole("img")).toHaveAttribute("src", mockPhoto.src.medium);
    expect(screen.getByText("📷 Photographer Name")).toBeInTheDocument();
  });
});
