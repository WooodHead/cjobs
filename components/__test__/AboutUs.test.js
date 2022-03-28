import AboutUs from "../AboutUs";
import { render, screen } from "@testing-library/react";

describe("About us test", () => {
  it("header has correct title", () => {
    render(<AboutUs />);
    const headerEl = screen.getByText(/cassandra jobs/i);
    expect(headerEl).toBeInTheDocument();
  });

  it("paragraph 1 has correct text", () => {
    render(<AboutUs />);
    const paragraphEl = screen.getByText(
      /Welcome to Cassandra.Jobs, a curated job board dedicated solely to Cassandra to help Apache Cassandra developers, administrators, and architects find their dream job./i
    );
    expect(paragraphEl).toBeInTheDocument();
  });

  it("number of headings", () => {
    render(<AboutUs />);
    const headingEl = screen.getAllByRole("heading");
    expect(headingEl.length).toBe(2);
  });

  it("number of list items", () => {
    render(<AboutUs />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(6);
  });

  it("list item text is correct", () => {
    render(<AboutUs />);
    const listItemEl = screen.getByText(
      /Software: Ryan Quey, Arpan Patel, Stefan Nikolovski/i
    );
    expect(listItemEl).toBeInTheDocument();
  });
});
