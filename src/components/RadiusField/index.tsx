import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { StyledInput, StyledInputRadiusFieldWrapper, StyledInputRadiusText } from './styled';
import { useAppDispatch } from '../../hooks/redux';
import { setRadius } from '../../store/reducers/geoObjectsSlice';

const RadiusField = () => {
  const [radiusValue, setRadiusValue] = useState<number>(100);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRadius(radiusValue));
  }, [radiusValue]);

  const handleRadiusChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setRadiusValue(Number(event.target.value));
  };
  return (
    <>
      <StyledInputRadiusFieldWrapper>
        <h2>В радиусе:</h2>
        <div>
          <StyledInput
            type="number"
            min={1}
            max={2000}
            onChange={handleRadiusChange}
            value={radiusValue}
          />
          <StyledInputRadiusText>м</StyledInputRadiusText>
        </div>
      </StyledInputRadiusFieldWrapper>
    </>
  );
};

export default RadiusField;
