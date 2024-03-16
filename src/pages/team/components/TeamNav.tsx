import { Nav } from 'react-bootstrap';
import CreateTeamModal from './CreateTeamModal';
import JoinTeamModal from './JoinTeamModal';

const UserNav = () => {
  return (
    <Nav className='team-nav'>
      <Nav.Item>
        <h2>Your Team</h2>
      </Nav.Item>
      <Nav.Item className='team-nav-action '>
        <CreateTeamModal />
        <JoinTeamModal />
      </Nav.Item>
    </Nav>
  );
};
export default UserNav;
