import styled from 'styled-components';

export const StyledInputRadiusFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  & h2 {
    font-weight: 600;
    font-size: 17px;
  }
`;

export const StyledInput = styled.input`
  border-radius: 10px;
  color: #000;
  border: 3px solid #c4c4c4;
  padding: 5px 30px 5px 10px; // reduced the right padding to make space for the "км" text
  opacity: 50%;
  width: 40%;
`;

export const StyledInputRadiusText = styled.span`
  margin-left: 15px;
  color: #000;
  font-weight: bold;
  font-size: 14px;
`;
