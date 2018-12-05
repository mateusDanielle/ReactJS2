import React, { Component } from 'react';
import moment from 'moment';

import logo from '../../assets/logo.png';
import api from '../../services/api';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentDidMount() {
    this.loadStorage();
  }

  getApi = search => api.get(`repos/${search}`);

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { repositories, repositoryInput } = this.state;

    try {
      const { data: repository } = await this.getApi(repositoryInput);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });
      const { repositories: storages } = this.state;
      this.saveToStorage(storages);
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  loadStorage = () => {
    this.setState({
      repositories: JSON.parse(localStorage.getItem('@GitCompare:repositories')) || [],
    });
  };

  saveToStorage = (storages) => {
    localStorage.setItem('@GitCompare:repositories', JSON.stringify(storages));
  };

  removeItem = ({ id }) => {
    const { repositories: currentRepositories } = this.state;
    const removedRepositories = currentRepositories.filter(r => r.id !== id);
    this.saveToStorage(removedRepositories);
    this.loadStorage();
  };

  updateItem = async ({ id, full_name: newSearch }) => {
    const { repositories: currentRepositories } = this.state;
    const { data: repository } = await this.getApi(newSearch);
    repository.lastCommit = moment(repository.pushed_at).fromNow();
    const upReposotories = currentRepositories.map(r => (r.id === id ? repository : r));
    this.saveToStorage(upReposotories);
    this.loadStorage();
  };

  render() {
    const {
      repositories, repositoryInput, repositoryError, loading,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            value={repositoryInput}
            placeholder="usuário/repositório"
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
        <CompareList
          repositories={repositories}
          removeItem={this.removeItem}
          updateItem={this.updateItem}
        />
      </Container>
    );
  }
}
