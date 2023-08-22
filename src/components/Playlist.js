import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css'


const SidebarItem = styled.div`
  width: 250px;
  height: 150px;
`;

const SidebarLink = styled.a`
  width: 100%;
	height: 100%;
`;

const SidebarImg = styled.img`
  width: 100%;
	height: auto;
`;


function Playlist({ imageSrcPath }) {
  const [isLoaded, setLoadedState] = useState(false);

  useEffect(() => {
      setTimeout(() => {
          setLoadedState(true);
        }, 5000);

      return () => {}
    }, []);

	return (
      <SidebarItem>
        <SidebarLink href="#">
        {isLoaded ? (
          <SidebarImg
            src={ imageSrcPath }
            alt="day's playlist"
          />
        ) : (
          <SkeletonTheme baseColor="#313131" highlightColor="#444">
            <Skeleton variant="rectangular" width={250} height={150}/>
          </SkeletonTheme>
        )}
        </SidebarLink>
      </SidebarItem>
	);
}
	
export default Playlist;