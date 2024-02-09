import React, { FC, useState } from 'react';
import { Button, IconButton, InputBase, Paper, Tab, Tabs } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { TodoFormCreate } from '../todo-form/todo-form-create.component';
import { TodoActionToolsContainer } from './todo-action-tools.styled';
import { ITodoFilters } from '../../../types/todo.types';

const stylesTab = {
  minWidth: '20px',
  fontSize: '14px',
  padding: '10px',
  flexShrink: 1,
  minHeight: '30px',
  height: '30px'
};

const stylesTabs = {
  minHeight: '30px',
  height: '30px',
  marginBlock: '10px',
  '@media (max-width: 569px)': {
    marginBlock: '20px'
  }
};

interface TodoActionToolsProps {
  setFilter: React.Dispatch<React.SetStateAction<ITodoFilters>>;
}

export const TodoActionTools: FC<TodoActionToolsProps> = ({ setFilter }) => {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const closeForm = () => {
    setShowForm(false);
  };

  const handleSearch = (value: string) => {
    setFilter((prev) => ({ ...prev, search: value }));
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(search);
    }
  };

  const handleClearSearch = () => {
    setSearch('');
    handleSearch('');
  };

  const handleTabs = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    if (newValue === 'all') setFilter({ search });
    if (newValue === 'public') setFilter({ search, isPrivate: false });
    if (newValue === 'private') setFilter({ search, isPrivate: true });
    if (newValue === 'completed') setFilter({ search, done: true });
  };

  return (
    <>
      <TodoFormCreate onClose={closeForm} isOpen={showForm} />
      <Button
        sx={{ mb: 3 }}
        color="success"
        variant="contained"
        onClick={() => setShowForm(!showForm)}
      >
        add todo
      </Button>
      <TodoActionToolsContainer>
        <Paper
          component="form"
          sx={{ p: '2px 4px', mb: 1, display: 'flex', alignItems: 'center', width: 200 }}
        >
          <InputBase
            value={search}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyPress}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
          />
          {search && (
            <IconButton
              color="default"
              onClick={handleClearSearch}
              sx={{ p: 0, pr: 1 }}
              aria-label="clear-search"
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
          <IconButton
            color="primary"
            onClick={() => handleSearch(search)}
            type="button"
            sx={{ p: 0 }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Tabs value={tab} onChange={handleTabs} sx={stylesTabs}>
          <Tab value="all" sx={stylesTab} label="All" />
          <Tab value="public" sx={stylesTab} label="Public" />
          <Tab value="private" sx={stylesTab} label="Private" />
          <Tab value="completed" sx={stylesTab} label="Completed" />
        </Tabs>
      </TodoActionToolsContainer>
    </>
  );
};
