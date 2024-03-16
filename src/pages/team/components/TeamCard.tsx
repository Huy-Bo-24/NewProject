import { Dropdown } from 'react-bootstrap';

const TeamCard = () => {
  return (
    <div className='team-card'>
      <div className='team-card-icon'>
        <i className='fa-solid fa-people-group'></i>
      </div>
      <div className='team-card-content'>
        <h3 className='team-card-name'>Team 1 asdcas asda sda ád</h3>
        <Dropdown className='team-card-option'>
          <Dropdown.Toggle variant='light' id='profile-dropdown' className='p-2 pe-auto' as='div'>
            <i className='fa-solid fa-gear'></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>
              <i className='fa-regular fa-eye-slash'></i>
              <span className='ms-2'>Hide</span>
            </Dropdown.Item>
            <Dropdown.Item href='#/action-3'>
              <i className='fa-regular fa-user-plus'></i>
              <span className='ms-2'>Add member</span>
            </Dropdown.Item>
            <Dropdown.Item href='#/action-2'>
              <i className='fa-regular fa-circle-info'></i>
              <span className='ms-2'>Manage Team</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
export default TeamCard;
