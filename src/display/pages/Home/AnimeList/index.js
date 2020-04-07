import React from "react";
import Grid from '@material-ui/core/Grid';

import { AnimeItem, AnimeItemSceleton } from "../../../components/AnimeItem";


const AnimeList = ({data, setDrawerState}) => {
	return (
		<Grid container spacing={2} style={{marginTop: 10}}>
			{
				data.map(anime => 
					<Grid item md={2} key={anime.slug} sm={3} xs={6}>
			          	<AnimeItem
			          		setDrawerState={setDrawerState}
			          		anime={anime}
			          	/>
				    </Grid>
				)
			}
		</Grid>
	);
}

const AnimeListSceleton = () => {
	return (
		<Grid container spacing={2}>
            <AnimeItemSceleton />
            <AnimeItemSceleton />
            <AnimeItemSceleton />
            <AnimeItemSceleton />
            <AnimeItemSceleton />
            <AnimeItemSceleton />
            <AnimeItemSceleton />
            <AnimeItemSceleton />
            <AnimeItemSceleton />
            <AnimeItemSceleton />
            <AnimeItemSceleton />
            <AnimeItemSceleton />
        </Grid>
	);
}

export { AnimeList, AnimeListSceleton };
