import styled from 'styled-components';

export const Scrollable = styled('div')`
  overflow: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.COLORS.white};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.COLORS.secondaryDarker};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.COLORS.secondaryDarkest};
  }
`;
