import styled from 'styled-components';
import { TodoControl } from '../../todo-control.component';
import { Scrollable } from '../../../../scroll/scroll.styled';
import { COLORS } from '../../../../../../theme';

interface CardContainerProps {
  done: boolean;
}
export const CardContainer = styled('div')<CardContainerProps>`
  display: flex;
  padding: 20px;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ done }) => (done ? COLORS.done : COLORS.secondary)};
`;

export const CardText = styled(Scrollable)`
  flex-grow: 1;
  padding-right: 5px;
`;

export const CardControls = styled(TodoControl)`
  flex-shrink: 0;
`;
