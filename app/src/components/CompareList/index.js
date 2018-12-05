import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository, Action } from './styles';

const CompareList = ({ repositories, removeItem, updateItem }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>
        <ul>
          <li>
            {repository.stargazers_count}
            <small>stars</small>
          </li>
          <li>
            {repository.forks_count}
            <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count}
            <small>issues</small>
          </li>
          <li>
            {repository.lastCommit}
            <small>last commit</small>
          </li>
        </ul>
        <Action>
          <button type="button" onClick={updateItem.bind(this, repository)}>
            <i className="fa fa-edit" />
            Atualizar
          </button>
          <button type="button" onClick={removeItem.bind(this, repository)}>
            <i className="fa fa-trash" />
            Deletar
          </button>
        </Action>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      owner: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
      stargazers_count: PropTypes.number.isRequired,
      forks_count: PropTypes.number.isRequired,
      open_issues_count: PropTypes.number.isRequired,
    }),
  ).isRequired,
  removeItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
};

export default CompareList;
