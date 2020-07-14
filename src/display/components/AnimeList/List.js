import PropTypes from "prop-types";
import React from "react";
import Grid from '@material-ui/core/Grid';

import { AnimeItem, AnimeItemSceleton } from "./AnimeItem";

const List = ({data}) => {
	return (
		<Grid container spacing={2}>
			{
				data.map(anime => 
					<Grid item md={2} key={anime.slug} sm={3} xs={6}>
			          	<AnimeItem
			          		anime={anime}
			          	/>
				    </Grid>
				)
			}
		</Grid>
	);
}

const ListSceleton = () => {
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

export { List, ListSceleton };