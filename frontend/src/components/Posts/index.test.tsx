import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';

import Posts from "./index";
import { initISettings } from "../../interfaces/settings.interface";
import { initIPost } from "../../interfaces/post.interface";
beforeEach(() => {
  // Mock the auth_token in localStorage
  localStorage.setItem('auth_token', 'your_mock_token');
});

describe("Posts", () => {
  const posts = [
    {
      id: 1,
      title: "Post 1",
      content: "Content 1",
    },
    {
      id: 2,
      title: "Post 2",
      content: "Content 2",
    },
  ];

  const currentPage = 1;
  const totalPages = 2;
  const totalItems = 2;
  const itemsPerPage = 10;
  const setCurrentPage = jest.fn();
  const loading = false;
  const errorMessage = "";
  const currentUser = undefined;
  const settings = initISettings;
  const searchTerm = "";

  it("renders the posts correctly with authenticated user", () => {
    // Mock the auth_token in localStorage
    localStorage.setItem('auth_token', 'your_mock_token');

    render(
      <Posts
        posts={posts}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        loading={loading}
        errorMessage={errorMessage}
        currentUser={currentUser}
        settings={settings}
        searchTerm={searchTerm}
      />,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  it("displays 'No posts found!' when there are no posts", () => {
    render(
      <Posts
        posts={initIPost}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        loading={loading}
        errorMessage={errorMessage}
        currentUser={currentUser}
        settings={initISettings}
        searchTerm={searchTerm}
      />,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByText("No posts found!")).toBeInTheDocument();
  });
});
