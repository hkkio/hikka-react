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

const useStyles = makeStyles({
    card: {
        border: "none",
    },
    media: {
        paddingTop: "150%",
        background: "lightgray",
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

const AnimeItem = ({anime}) => {
    const classes = useStyles();
    let history = useHistory();

    const openAnime = () => {
        history.push('/admin/anime/' + anime.slug);
    }
 
    return (
        <Card className={classes.card} onClick={() => openAnime()} style={{width: "auto"}} variant="outlined">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={anime.poster != null ? anime.poster : "/"}
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
