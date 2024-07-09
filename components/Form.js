import styled from "styled-components";

const FormWrapper = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SingleInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const InputLabel = styled.label``;
const InputField = styled.input``;

const SubmitButton = styled.button``;

export function Form() {
  return (
    <FormWrapper>
      <SingleInputSection>
        <InputLabel>Name</InputLabel>
        <InputField></InputField>
      </SingleInputSection>
      <SingleInputSection>
        <InputLabel>Flavor Tag</InputLabel>
        <InputField></InputField>
      </SingleInputSection>
      <SingleInputSection>
        <InputLabel>Image-URL</InputLabel>
        <InputField></InputField>
      </SingleInputSection>
      <SubmitButton>Submit</SubmitButton>
    </FormWrapper>
  );
}
