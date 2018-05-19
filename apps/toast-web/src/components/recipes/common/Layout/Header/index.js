import styled from 'styled-components';
import Controls from './Controls';
import CoverImage from './CoverImage';

const Header = styled.div`
  grid-area: header;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

Header.Controls = Controls;
Header.CoverImage = CoverImage;

export default Header;
