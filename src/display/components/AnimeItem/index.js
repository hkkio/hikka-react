import React from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { AnimeActionCreators } from "../../../state/action";
import config from "../../application/config";
import { getGenres, getState, cutDescription } from "../../../utils/AnimeUtils";


const useStyles = makeStyles({
    card: {
        border: "none",
    },
    media: {
        paddingTop: "150%"
    },
    content: {
        padding: 5,
        textAlign: 'center'
    },
    overlay: {
        position: 'absolute',
        top: '0',
        left: '0',
        color: 'black',
        padding: 5,
        backgroundColor: '#0172C7'
    },
    episodes: {
        fontSize: 12,
        fontWeight: 600,
        color: 'white'
    },
    title: {
        fontSize: 14,
    },
});

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'black',
    boxShadow: "0 0 20px 2px rgba(0,0,0,0.20)",
    width: 280,
    minHeight: 250,
    padding: 20,
  },
}))(Tooltip);

const InfoTooltip = ({anime}) => {
    const maxLenDesc = 200;

    const makeGenres = () => {
        return anime.genres.map(function(genre){
                return genre.name;
            }).join(",");
    }

    const makeDescription = () => {
        if (anime.description.length <= maxLenDesc) return anime.description;
        return anime.description.substr(0, anime.description.lastIndexOf(" ", maxLenDesc)) + "...";
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

const AnimeItem = ({anime, width, setDrawerState}) => {
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();

    const openAnime = () => {
        dispatch(AnimeActionCreators.setAnime(null));
        dispatch(AnimeActionCreators.getAnime({slug: anime.slug}));
        setDrawerState({status: true});
        history.push('/anime/' + anime.slug);
    }
 
    return (
        <HtmlTooltip title={<InfoTooltip anime={anime} />} placement="right">
            <Card className={classes.card} onClick={() => openAnime()} style={{width: "auto"}} variant="outlined">
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={anime.poster != null ? anime.poster : config.noPosterURL}
                />
                {"episodes" in anime && <div className={classes.overlay}>
                  <Typography component="span" className={classes.episodes}>
                    {anime.episodes.released ? anime.episodes.released : "0"}/{anime.episodes.total ? anime.episodes.total : "?"}
                  </Typography>
               </div>}
                <CardContent className={classes.content}>
                  <Typography component="span" className={classes.title}>
                    {anime.title.ua}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
        </HtmlTooltip>
    );
}

const AnimeItemSceleton = () => {
    const classes = useStyles();

    return (
        <Grid item md={2} sm={3} xs={6}>
            <Skeleton variant="rect" className={classes.media} />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
        </Grid>
    );
}

export { AnimeItem, AnimeItemSceleton };
