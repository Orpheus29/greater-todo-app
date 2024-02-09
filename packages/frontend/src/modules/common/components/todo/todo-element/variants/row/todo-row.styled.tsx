import { TableRow } from '@mui/material';
import styled from 'styled-components';
import { COLORS } from '../../../../../../theme';

interface TableRowStyledProps {
  done: boolean;
}

export const TableRowStyled = styled(TableRow)<TableRowStyledProps>`
  font-size: 14px;
  &:nth-child(even) {
    background-color: ${({ done }) => (done ? COLORS.done : COLORS.white)};
  }
  &:nth-child(odd) {
    background-color: ${({ done }) => (done ? COLORS.doneDarker : COLORS.secondary)};
  }
`;
