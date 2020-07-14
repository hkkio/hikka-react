import React from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

import { AnimeActionCreators } from "../../../state/action";
import { getGenres, getState, cutDescription } from "../../../utils/AnimeUtils";

const InfoTooltip = ({anime}) => {
    const MAX_LEN_DESC = 200;

    const makeGenres = () => {
        return anime.genres.map(function(genre){
                return genre.name;
            }).join(",");
    }

    const makeDescription = () => {
        if (anime.description.length <= MAX_LEN_DESC) return anime.description;
        return anime.description.substr(0, anime.description.lastIndexOf(" ", MAX_LEN_DESC)) + "...";
    }
 
    return (
        <div>
            <Box textAlign="center" mb={2}>
                <Typography component="h2" variant="subtitle1">
                    {anime.title.ua}
                </Typography>
                 <Typography component="h3" variant="caption" gutterBottom={true}>
                    {anime.title.jp}
                </Typography>
                <Rating value={parseInt(anime.rating)/2} precision={0.5} readOnly />
            </Box>
            <Typography component="p" variant="body2" gutterBottom={true}>
               <Typography component="span" variant="body2" style={{fontWeight: 600}}>Опис: </Typography> {cutDescription(anime.description)}
            </Typography>
            <Typography component="p" variant="body2" gutterBottom={true}>
               <Typography component="span" variant="body2" style={{fontWeight: 600}}>Жанр: </Typography> {getGenres(anime.genres).join(", ")}
            </Typography>
            <Typography component="p" variant="body2" gutterBottom={true}>
               <Typography component="span" variant="body2" style={{fontWeight: 600}}>Статус: </Typography> {getState(anime.state)}
            </Typography>
            <Typography component="p" variant="body2">
               <Typography component="span" variant="body2" style={{fontWeight: 600}}>Рік випуску: </Typography> {anime.year}
            </Typography>
        </div>
    )
}

export default InfoTooltip;