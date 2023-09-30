import React from "react";
import SidebarReduced from "../components/SidebarReduced";
import TracklistFavourites from "../components/TracklistFavourites";


export const Favorites = () => {
	return (
		<React.Fragment>
			<TracklistFavourites/>
			<SidebarReduced/>
		</React.Fragment>
	);
};