import { expect, it } from "vitest";

import { render, screen } from "@/utils/test";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

it("renders card component with proper a11y", () => {
  render(
    <Card aria-labelledby="titleId" aria-describedby="descriptionId">
      <CardHeader>
        <CardTitle id="titleId">Title</CardTitle>
        <CardDescription id="descriptionId">Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is card content</p>
      </CardContent>
    </Card>,
  );

  expect(
    screen.getByRole("region", { name: "Title", description: "Description" }),
  ).toBeInTheDocument();

  expect(screen.getByText("This is card content")).toBeInTheDocument();
});

it("renders card component with incorrect a11y when no titleId or descriptionId is passed", () => {
  render(
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is card content</p>
      </CardContent>
    </Card>,
  );

  expect(
    screen.queryByRole("region", { name: "Title", description: "Description" }),
  ).not.toBeInTheDocument();
});
