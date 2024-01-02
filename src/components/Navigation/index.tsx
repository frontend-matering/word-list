import { Wrapper } from "./styles";

export const Navigation = ({ routes }) => {
  console.warn("routes", routes);
  return (
    <Wrapper>
      <ul>
        {routes.map((route) => (
          <li>
            <a href={route.path}>{route.label}</a>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};
