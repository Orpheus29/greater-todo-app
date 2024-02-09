import styled from 'styled-components';

export const NoTodos = styled('div')`
  width: 100%;
  text-align: center;
  font-weight: ${(props) => props.theme.FONTS.WEIGHTS.bold};
  font-size: ${(props) => props.theme.FONTS.SIZES.l};
`;
