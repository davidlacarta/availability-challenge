import React from 'react';
import { Tag, Card, Avatar, Spin, Empty } from 'antd';

import styles from './Results.module.css';

const { Meta } = Card;

function Results({ rates, loading }) {
  if (loading) {
    return (
      <section className={styles.section}>
        <Spin />
      </section>
    );
  }

  if (!rates) {
    return null;
  }

  if (rates.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Lo sentimos, no hay tarifas disponibles"
      />
    );
  }

  const [firstRateSorted] = sort(rates);

  return (
    <section className={styles.section}>
      <Rate rate={firstRateSorted} />
    </section>
  );
}

function Rate({ rate }) {
  return (
    <Card
      className={styles.card}
      title={rate.roomNem}
      extra={`${rate.netPrice} euros`}
      actions={[
        `${rate.occupancy.numAdults} adultos`,
        `${rate.occupancy.numChilds} niños`,
        `${rate.occupancy.numBabies} bebes`
      ]}
    >
      <Meta
        avatar={<Avatar shape="square" icon="home" />}
        title={rate.roomName}
        description={rate.boardName}
      />
      {rate.offerName && (
        <Tag className={styles.tag} color="blue">
          {rate.offerName}
        </Tag>
      )}
    </Card>
  );
}

function sort(rates) {
  return rates.sort((rateA, rateB) =>
    Number(rateA.netPrice) > Number(rateB.netPrice) ? 1 : -1
  );
}

export default Results;
