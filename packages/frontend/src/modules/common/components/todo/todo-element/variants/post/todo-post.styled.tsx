import styled from 'styled-components';
import { TodoControl } from '../../todo-control.component';
import { COLORS } from '../../../../../../theme';

interface PostContainerProps {
  done: boolean;
}

export const PostContainer = styled('div')<PostContainerProps>`
  padding: 25px;
  background-color: ${({ done }) => (done ? COLORS.done : COLORS.white)};
`;

export const PostControls = styled(TodoControl)`
  margin-top: 10px;
`;
