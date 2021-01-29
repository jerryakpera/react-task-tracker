import PropTypes from 'prop-types';

import Button from './Button';

import { useLocation } from 'react-router-dom';

const Header = ({ title, onClick, open }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={open ? 'darkred' : 'green'}
          text={open ? 'Close' : 'Add'}
          onClick={onClick}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: 'Task Tracker',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// };

export default Header;
