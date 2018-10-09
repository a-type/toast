import styled from 'styled-components';
import skip from './illustrations/undraw_airport_2581.svg';
import none from './illustrations/undraw_businessman_97x4.svg';
import eatOut from './illustrations/undraw_hang_out_h9ud.svg';
import short from './illustrations/undraw_Jogging_t14q.svg';
import medium from './illustrations/undraw_eating_together_tjhx.svg';
import long from './illustrations/undraw_chef_lbjx.svg';

const images = {
  SKIP: skip,
  NONE: none,
  EAT_OUT: eatOut,
  SHORT: short,
  MEDIUM: medium,
  LONG: long,
};

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 10vh;
  min-height: 100px;

  background-size: cover;

  border-radius: var(--border-radius-md);
  border: 2px solid var(--color-gray);
`;
