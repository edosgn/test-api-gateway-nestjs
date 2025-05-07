import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // virtual users simultaneous
  duration: '30s',
};

export default function () {
  const res = http.get('http://localhost:3000/api/v1/warehouse/ingredient/findOneBy/tomato');

  check(res, {
    'status es 200': (r) => r.status === 200,
  });

  sleep(1);
}
