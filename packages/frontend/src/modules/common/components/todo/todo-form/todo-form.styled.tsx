import styled from 'styled-components';

interface TodoFormContainerProps {
  done: boolean;
}

export const TodoFormContainer = styled('form')<TodoFormContainerProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ done }) => (done ? '#dcedc8' : 'white')};
  border-radius: 8px;
  overflow: auto;
  padding: 10px 20px 20px 20px;
  width: 300px;
  max-height: 80vh;
  @media screen and (min-width: 426px) {
    width: 400px;
  }
  @media screen and (min-width: 769px) {
    width: 600px;
  }
`;

export const TodoFormTitle = styled('div')`
  color: ${(props) => props.theme.COLORS.primary};
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: bold;
  align-self: center;
`;
