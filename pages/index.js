import styled from "styled-components";

const Box = styled.div`
  height: 3000px;
  width: 3000px;
  background-color: green;
`;

export default function HomePage() {
  return (
    <div>
      <h1>Hello from Next.js</h1>
      <Box />
    </div>
  );
}
