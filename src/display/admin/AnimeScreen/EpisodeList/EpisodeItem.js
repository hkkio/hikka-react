import React from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from "react-router-dom";

import AddIcon from '@material-ui/icons/Add';

import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles({
	card: {
		border: "none",
	},
	media: {
		paddingTop: "50%",
		background: "lightgray",
		width: "100%"
	},
	content: {
		padding: 5,
		textAlign: 'center'
	},
	overlay: {
		position: 'absolute',
		top: 'calc(50% - 50px)',
		left: 'calc(50% - 50px)',
		color: 'lightgray'
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

const EpisodeItem = ({episode, handleClickOpenSettings}) => {
	const classes = useStyles();

	return (
		<Card className={classes.card} variant="outlined">
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={episode.poster != null ? episode.poster : "/"}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Епізод #{episode.position}
					</Typography>
					{episode.title != null && <Typography variant="body2" color="textSecondary" component="p">
						{episode.title}
					</Typography>}
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary" onClick={handleClickOpenSettings}>
					Налаштувати
				</Button>
				<Button size="small" color="primary">
					Видалити
				</Button>
			</CardActions>
		</Card>
	);
}

const NewEpisodeItem = () => {
	const classes = useStyles();

	return (
		<ButtonBase className={classes.media} component="span" style={{background: "none", border: "1px solid lightgray"}}>
			<div className={classes.overlay}>
				<AddIcon style={{fontSize: 100}} />
			</div>
		</ButtonBase>
	);
}

const EpisodeItemSceleton = () => {
	const classes = useStyles();

	return (
		<Grid item md={2} sm={3} xs={6}>
			<Skeleton variant="rect" className={classes.media} />
			<Skeleton variant="text" />
			<Skeleton variant="text" width="60%" />
		</Grid>
	);
}

export { EpisodeItem, NewEpisodeItem, EpisodeItemSceleton };
