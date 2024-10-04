import styled from "styled-components";

export const StyledForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 15px;
`;
export const SingleInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const InputLabel = styled.label``;
export const InputField = styled.input`
  background-color: white;
`;

export const LabelAndMessage = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
`;
export const Message = styled.p`
  color: red;
  margin: 0;
  padding: 0;
`;

export const FieldAndDropDown = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
`;

export const DropDown = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: absolute;
  padding: 0;
  margin: 0;
  top: 29px;
  border: 1px solid black;
  border-top: none;
`;

export const DropDownItem = styled.button`
  text-align: left;
  font-family: var(--general-font);
  font-size: 15px;
  border: none;
  padding: 5px;
  background-color: white;
  width: 100%;
`;

export const FlavorTag = styled.p`
  border-radius: 1rem;
  padding: 10px;
  width: 50%;
`;
export const DeleteFlavorButton = styled.button`
  border-style: none;
  font-weight: 10rem;
`;

export const ButtonContainer = styled.a`
  display: flex;
  justify-content: space-around;
  font-size: 0.8rem;
`;

export const Button = styled.button`
  width: 30%;
  padding: 4px 0 4px 0;
  font: var(--general-font);
`;

export const DeleteButton = styled.button`
  border-radius: 1rem;
  padding: 10px;
  text-decoration: none;
  background-color: lightgrey;
  color: inherit;
`;
