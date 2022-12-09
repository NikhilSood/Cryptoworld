import React,{useState, useEffect} from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import axios from 'axios';

import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/exchanges`);
        setExchanges(data)
        //sending array to exchanges
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);
  if((loading)) return <Loader />
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Trust Score</Col>
        <Col span={6}>Establish Year</Col>
      </Row>
      <Row>

        {exchanges.map((exchange) => (
          <Col span={24} onClick={() => window.open(exchange.url)} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      {/* <Text><strong>{exchange.name}.</strong></Text> */}
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.trade_volume_24h_btc_normalized)}</Col>
                    <Col span={6}>{millify(exchange.trust_score)}%</Col>
                    <Col span={6}>{exchange.year_established}</Col>
                  </Row>
                  )}
              >
                {/* {HTMLReactParser(exchange.discription || '')} */}
              </Panel>
            </Collapse>
          </Col>
        ))} 
      </Row>
    </>
  );
};

export default Exchanges;


