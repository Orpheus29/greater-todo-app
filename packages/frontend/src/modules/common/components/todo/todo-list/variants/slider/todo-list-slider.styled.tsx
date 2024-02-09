import { Swiper } from 'swiper/react';
import styled from 'styled-components';
import { COLORS } from '../../../../../../theme';

export const SliderContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 80%;
  flex-grow: 1;
  overflow: hidden;
  flex-direction: column;
`;

export const CardsContainer = styled('div')`
  width: 100%;
  height: 20%;
  display: flex;
  flex-grow: 1;
`;

export const StyledSwiper = styled(Swiper)`
  padding-bottom: 30px;
  margin-bottom: -15px;

  .swiper-pagination-bullet {
    padding-inline: 8px;
    height: 3px;
    border-radius: 0;
    background-color: ${COLORS.primary};
    cursor: pointer;
  }

  .swiper-pagination-bullet-active {
    background-color: ${COLORS.primary};
  }
`;
