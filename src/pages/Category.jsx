import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import TracklistCategory from "../components/TracklistCategory";
import SidebarReduced from "../components/SidebarReduced";


export const Category = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const pageParams = useParams();


	return (
		<React.Fragment>
			<TracklistCategory categoryId={ pageParams.id } categoryLabel={ searchParams.get("categoryLabel") }/>
			<SidebarReduced/>
		</React.Fragment>
	);
};