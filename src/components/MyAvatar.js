// hooks
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';
import { getUser } from '../utils/sessionManager';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const user = getUser();

  return (
    <MAvatar
      src={user.photoURL}
      alt={user.displayName}
      color={user.photoURL ? 'default' : createAvatar(user.displayName).color}
      {...other}
    >
      {createAvatar(user.displayName).name}
    </MAvatar>
  );
}
