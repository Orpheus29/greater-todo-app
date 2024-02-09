import styled from 'styled-components';
import { Scrollable } from '../../../../scroll/scroll.styled';

export const TodoListTableContainer = styled(Scrollable)`
  max-height: 100%;
  width: 100%;
  border: ${(props) => props.theme.COLORS.secondaryDarker} 1px solid;
`;
