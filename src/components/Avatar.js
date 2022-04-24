import styled from 'styled-components';

function Avatar({ src }) {
  return (
    <StyledAvatar className='avatar'>
      <img src={src} alt='user avatar' />
    </StyledAvatar>
  );
}

const StyledAvatar = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default Avatar;
