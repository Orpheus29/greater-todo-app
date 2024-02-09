import styled from 'styled-components';

export const TodoTitle = styled('div')`
  font-weight: ${(props) => props.theme.FONTS.WEIGHTS.bold};
  font-size: ${(props) => props.theme.FONTS.SIZES.l};
  margin-bottom: 10px;
`;

export const TodoDescription = styled('div')`
  font-size: ${(props) => props.theme.FONTS.SIZES.m};
  color: gray;
  white-space: pre-line;
  overflow-wrap: break-word;
`;

export const TodoControls = styled('div')`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
