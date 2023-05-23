import { FaHome } from 'react-icons/fa';
import { MdClass } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
const links = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/',
    icon: <FaHome />,
  },
  {
    id: 2,
    name: 'Classes',
    path: 'classes',
    icon: <MdClass />,
  },
  {
    id: 3,
    name: 'Profile',
    path: 'profile',
    icon: <BiUserCircle />,
  },
];

export default links;
