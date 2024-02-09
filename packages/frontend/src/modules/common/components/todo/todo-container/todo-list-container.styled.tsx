import styled from 'styled-components';

export const TodoListLayout = styled('div')`
  @media screen and (min-width: 769px) {
    width: 95%;
    height: 60vh;
    overflow: visible;
    margin: 20px auto;
  }
  @media screen and (max-width: 768px) and (min-width: 426px) {
    height: 350px;
    overflow: visible;
    width: 100%;
    margin-top: 30px;
  }
`;

export const TodoActionToolsLayout = styled('div')`
  width: 100%;
  padding: 0 40px;
  @media screen and (max-width: 425px) {
    padding: 0 15px;
  }
`;
