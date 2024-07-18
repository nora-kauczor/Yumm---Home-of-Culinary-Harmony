import styled from "styled-components";
import PairingCard from "./PairingCard";

const PairingsList = styled.ul`
  list-style: none;
  width: 80%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const WhiteSpace = styled.div`
  height: 40px;
`;

export default function PairingsOverview({
  pairings,
  ingredients,
  // handleClickFlavor,
}) {
  if (!ingredients || !pairings) return <>Loading...</>;
  return (
    <PairingsList>
      {pairings.map((pairing) => (
        <PairingCard
          pairing={pairing}
          ingredients={ingredients}
          key={pairing._id}
          // handleClickFlavor={handleClickFlavor}
        ></PairingCard>
      ))}
      <WhiteSpace />
    </PairingsList>
  );
}
