import React from 'react';
import { Layout } from 'antd';

import hotels from './hotels.json';
import Search from './Search';
import Results from './Results';
import useSearch from './userSearch';

import styles from './App.module.css';

const { Header, Content } = Layout;

function App() {
  const { handle: handleSubmit, rates, loading } = useSearch();
  return (
    <>
      <Header className={styles.header}>
        <h1 className={styles.title}>Hoteles</h1>
      </Header>
      <Content className={styles.content}>
        <Search hotels={hotels} onSubmit={handleSubmit} loading={loading} />
        <Results rates={rates} loading={loading} />
      </Content>
    </>
  );
}

export default App;
