import TeamMainHide from './components/TeamMainHide';
import TeamMainShow from './components/TeamMainShow';
import UserNav from './components/TeamNav';

const Team = () => {
  return (
    <div className='team'>
      <UserNav />
      <div className='team-main'>
        <TeamMainShow />
        <TeamMainHide />
      </div>
    </div>
  );
};

export default Team;
