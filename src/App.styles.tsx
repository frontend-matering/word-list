import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  height: 100%;

  aside {
    grid-column: 1 / 3;
    background-color: #ddd;
  }

  main {
    grid-column: 3 / 13;
  }
`;
