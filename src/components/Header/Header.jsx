import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { Row, Col } from 'react-flexbox-grid';
// import FlatButton from 'material-ui/FlatButton';
// import IconButton from 'material-ui/IconButton/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/MenuItem';
// import IconMenu from 'material-ui/IconMenu';
// import AppBar from 'material-ui/AppBar';
import Bug from 'material-ui/svg-icons/action/bug-report';
import strings from 'lang';
import AccountWidget from '../AccountWidget';
import styles from './Header.css';
import SearchForm from '../Search/SearchForm';
import AppLogo from '../App/AppLogo';
import BurgerMenu from '../BurgerMenu';

const tablet = 864;
const mobile = 425;

const navbarPages = [
// TODO Explorer
// TODO Matches
  {
    name: strings.header_heroes,
    path: '/heroes',
  }, {
    name: strings.header_distributions,
    path: '/distributions',
  }, {
    name: strings.header_ingame,
    sponsored: true,
    external: true,
    path: 'https://dota2.becomethegamer.com/yasp',
  }];

const LogoGroup = ({ width }) => {
  if (width <= mobile) {
    navbarPages.push({
      name: strings.app_report_bug,
      external: true,
      path: 'https://github.com/odota/ui/issues',
    });
  }

  return (
    <ToolbarGroup className={styles.verticalAlign}>
      {width < tablet && <BurgerMenu links={navbarPages} top={<AccountWidget />} />}
      <AppLogo style={{ marginRight: 18 }} size={width < mobile && '14px'} />
    </ToolbarGroup>
  );
};

const LinkGroup = () => (
  <ToolbarGroup className={styles.verticalAlign}>
    {navbarPages.map(page => (
      <div key={page.name} className={styles.tabContainer}>
        {page.external ?
          <a href={page.path} className={styles.tab} rel="noopener noreferrer" target="_blank">{page.name}</a>
          : <Link to={page.path} className={styles.tab}>{page.name}</Link>
        }
      </div>
    ))}
  </ToolbarGroup>
);

const SearchGroup = ({ location }) => (
  <ToolbarGroup style={{ marginLeft: 20 }} className={styles.verticalAlign}>
    <ActionSearch style={{ marginRight: 6, opacity: '.6' }} />
    <SearchForm location={location} />
  </ToolbarGroup>
);

const AccountGroup = () => (
  <ToolbarGroup className={styles.verticalAlign}>
    <AccountWidget />
  </ToolbarGroup>
);

const ReportBug = () => (
  <a
    className={styles.bug}
    href="https://github.com/odota/ui/issues"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Bug />
    <span>
      {strings.app_report_bug}
    </span>
  </a>
);

const Header = ({ location, width }) => (
  <div>
    <Toolbar style={{ padding: width < mobile ? '8px' : '20px' }} className={styles.header}>
      <LogoGroup width={width} />
      {width > tablet && <LinkGroup />}
      <SearchGroup location={location} />
      {width > mobile && <ReportBug />}
      {width > tablet && <AccountGroup />}
    </Toolbar>
    <Row center="xs">
      <Col xs>
        { location.pathname !== '/' &&
          <a href="http://www.vpgame.com/?lang=en_us">
            <img src="/assets/images/vp-banner.jpg" role="presentation" style={{ marginTop: 10, maxWidth: '100%' }} />
          </a>
        }
      </Col>
    </Row>
  </div>
);

const mapStateToProps = state => ({
  width: state.browser.width,
});
export default connect(mapStateToProps, null)(Header);
