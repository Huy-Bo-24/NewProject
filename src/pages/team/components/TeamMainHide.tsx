import { useState } from 'react';
import { Button } from 'react-bootstrap';
import TeamCard from './TeamCard';

const TeamMainHide = () => {
  const teamListShowed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [showState, setShowState] = useState<number[]>([]);
  const [iconState, setIconState] = useState('right');
  const teamHidden = showState.map((teamId) => <TeamCard key={teamId} />);
  const handleClick = () => {
    setShowState((prev) => (prev.length > 0 ? [] : teamListShowed));
    setIconState((prev) => (prev === 'down' ? 'right' : 'down'));
  };
  return (
    <div>
      <Button variant='light' onClick={handleClick}>
        Hidden <i className={`fa-solid fa-caret-${iconState}`}></i>
      </Button>
      <div className='team-main-show my-2'>{teamHidden}</div>
    </div>
  );
};
export default TeamMainHide;
