import React, { FC, useEffect, useState } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ISwiper from 'swiper';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { CardsContainer, SliderContainer, StyledSwiper } from './todo-list-slider.styled';
import { ITodo, ITodoFilters } from '../../../../../types/todo.types';
import { TodoComponent } from '../../../todo-element';
import { NoTodos } from '../../todo-list.styled';
import { APP_KEYS } from '../../../../../consts';
import { useGetTodosInfinite } from '../../../../../hooks/todo/get-todos.hook';

interface ITodoListProps {
  filter: ITodoFilters;
}

export const TodoListSliderComponent: FC<ITodoListProps> = ({ filter }) => {
  const { data, isLoading, error, hasNextPage, fetchNextPage } = useGetTodosInfinite({
    ...filter,
    take: APP_KEYS.PAGE_SIZE
  });
  const [todos, setTodos] = useState<ITodo[]>(data?.pages.map((page) => page.rows).flat() || []);

  useEffect(() => {
    setTodos(data?.pages.map((page) => page.rows).flat() || []);
  }, [data]);

  const handleChange = (swiper: ISwiper) => {
    if (swiper.activeIndex === todos.length - 1) {
      if (hasNextPage) fetchNextPage();
    }
  };

  return (
    <>
      {error && (
        <Alert sx={{ width: '80%', margin: '0 auto' }} severity="error">
          {error instanceof Error ? error.message : 'Unexpected Error'}
        </Alert>
      )}
      {!error && (
        <SliderContainer>
          {isLoading && (
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress color="primary" />
            </Box>
          )}
          {!isLoading && todos.length === 0 && <NoTodos>No Todos</NoTodos>}
          {!isLoading && todos.length !== 0 && (
            <CardsContainer>
              <StyledSwiper
                modules={[Pagination, EffectCoverflow]}
                spaceBetween={20}
                navigation
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet',
                  bulletActiveClass: 'swiper-pagination-bullet-active'
                }}
                effect="coverflow"
                coverflowEffect={{
                  depth: 100,
                  modifier: 1,
                  rotate: 50,
                  slideShadows: false,
                  stretch: 0
                }}
                grabCursor
                style={{ width: '80%', left: '0' }}
                onSlideChange={handleChange}
              >
                {todos.map((todo) => (
                  <SwiperSlide key={todo.id}>
                    <TodoComponent variant="card" todo={todo} />
                  </SwiperSlide>
                ))}
              </StyledSwiper>
            </CardsContainer>
          )}
        </SliderContainer>
      )}
    </>
  );
};
