import React from "react";
import Grid from '@material-ui/core/Grid';

import { EpisodeItem, EpisodeItemSceleton, NewEpisodeItem } from "./EpisodeItem";


const EpisodeList = ({data, anime, handleClickOpenSettings}) => {
	return (
		<Grid container spacing={2}>
			<Grid item md={4} sm={6} xs={12}>
				<label htmlFor="episode">
					<NewEpisodeItem />
				</label>
			</Grid>
			{
				data.map(episode => 
					<Grid key={episode.position} item md={4} sm={6} xs={12}>
			          	<EpisodeItem
			          		episode={episode}
			          		handleClickOpenSettings={() => handleClickOpenSettings(anime, episode)}
			          	/>
				    </Grid>
				)
			}
		</Grid>
	);
}

const EpisodeListSceleton = () => {
	return (
		<Grid container spacing={2}>
            <EpisodeItemSceleton />
            <EpisodeItemSceleton />
            <EpisodeItemSceleton />
            <EpisodeItemSceleton />
            <EpisodeItemSceleton />
        </Grid>
	);
}

export { EpisodeList, EpisodeListSceleton, NewEpisodeItem };
