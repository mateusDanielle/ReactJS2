import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository } from './styles';

const CompareList = ({ repositories, teste }) => (
  <Container>
    {repositories.map(repository => (
      <Repository>
        <header>
          <img src={repository.owner.avatar_url} alt="facebook" />
          <strong>{teste}</strong>
          <small>facebook</small>
        </header>
        <ul>
          <li>
            95,019
            <small>stars</small>
          </li>
          <li>
            95,019
            <small>stars</small>
          </li>
          <li>
            95,019
            <small>stars</small>
          </li>
          <li>
            3 days ago
            <small>last commit</small>
          </li>
        </ul>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  teste: PropTypes.string.isRequired,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
};

export default CompareList;
