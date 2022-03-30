import styled from 'styled-components';
import { Navlink } from 'react-router-dom';
// images
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';

function Sidebar() {
  return (
    <StyledSidebar>
      <div className='sidebar-content'>
        <div className='user'>
          {/* avatar and username */}
          <p>Hey user</p>
        </div>
        <nav className='links'>
          <ul>
            <li>
              <Navlink to='/'>
                <img src={DashboardIcon} alt='dashboard icon' />
                <span>Dashboard</span>
              </Navlink>
            </li>
            <li>
              <Navlink to='/'>
                <img src={AddIcon} alt='add project icon' />
                <span>New Project</span>
              </Navlink>
            </li>
          </ul>
        </nav>
      </div>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.div``;

export default Sidebar;
