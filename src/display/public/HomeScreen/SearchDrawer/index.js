import React from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Slider from '@material-ui/core/Slider';

import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AnimeActionCreators } from "../../../../state/action";

import { categories, states, genres, minYear } from "../../../../utils/AnimeUtils";

const Tag = withStyles(theme => ({
  root: {
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10
  },
}))(Button);

const DrawerComponent = ({drawerState, setDrawerState, defaultState, setPageNumber}) => {
	const dispatch = useDispatch();

	const search = () => {
		setPageNumber(0);
        dispatch(AnimeActionCreators.setDefaultAnimeList());
        dispatch(AnimeActionCreators.getAnimeList(drawerState));
        setDrawerState({...drawerState, status: false, hasSearchQuery: true});
    }

    const clearFilters = () => {
    	setPageNumber(0);
    	dispatch(AnimeActionCreators.setDefaultAnimeList());
    	dispatch(AnimeActionCreators.getAnimeList(defaultState));
    	setDrawerState({...defaultState, status: true});
    }

    const changeTag = (service, item) => {
    	if (drawerState[service].includes(item.slug)) {
    		setDrawerState({...drawerState, [service]: drawerState[service].filter((serviceItem) => serviceItem !== item.slug)});
    	} else {
    		setDrawerState({...drawerState, [service]: drawerState[service].concat([item.slug])});
    	}
    }

	return (
		<Drawer anchor="top" open={drawerState.status} onClose={() => setDrawerState({...drawerState, status: false})}>
			<Container style={{paddingTop: 20, paddingBottom: 40}}>
		    	<Grid container spacing={4}>
		    		<Grid item md xs>
		    			<TextField autoFocus={true} value={drawerState.query} type="search" onChange={(event) => setDrawerState({...drawerState, query: event.target.value}) } variant="filled" fullWidth margin='normal' label="Фраза для пошуку"/>
		    		</Grid>
		    	</Grid>
		    	<Grid container spacing={4}>
		    		<Grid item md xs={12} sm={6}>
		    			<Typography variant="subtitle2" component="p" gutterBottom>
							Рік виходу
						</Typography>
						<Slider
						  min={minYear}
						  max={new Date().getFullYear()}
						  defaultValue={[minYear, new Date().getFullYear()]}
						  onChange={(event, newValue) => setDrawerState({...drawerState, year: {min: newValue[0], max: newValue[1]}})}
						  value={[drawerState.year.min, drawerState.year.max]}
						  step={1}
        				  marks
						  valueLabelDisplay="auto"
						  aria-labelledby="range-slider"
						/>
		    		</Grid>
		    		<Grid item md xs xs={12} sm={6}>
		    			<Typography variant="subtitle2" component="p" gutterBottom>
							Статус
						</Typography>
						{
							states.map((state, index) => {
								return <Tag size="small" key={index} disableElevation color={drawerState.states.includes(state.slug) ? "primary" : "default"} variant="contained" onClick={() => changeTag("states", state)}>{state.name}</Tag>
							})
						}
		    		</Grid>
		    		<Grid item md xs xs={12} sm={6}>
		    			<Typography variant="subtitle2" component="p" gutterBottom>
							Тип
						</Typography>
						{
							categories.map((category, index) => {
								return <Tag size="small" key={index} disableElevation color={drawerState.categories.includes(category.slug) ? "primary" : "default"} variant="contained" onClick={() => changeTag("categories", category)}>{category.name}</Tag>
							})
						}
		    		</Grid>
		    		<Grid item md={12} xs={12} sm={12}>
		    			<Typography variant="subtitle2" component="p" gutterBottom>
							Жанри
						</Typography>
						{
							genres.map((genre, index) => {
								return <Tag size="small" key={index} disableElevation color={drawerState.genres.includes(genre.slug) ? "primary" : "default"} variant="contained" onClick={() => changeTag("genres", genre)}>{genre.name}</Tag>
							})
						}
		    		</Grid>
		    	</Grid>
		    </Container>
		    <Hidden smUp>
			    <Paper square elevation={3} style={{position: "fixed", right: 0, left: 0, top: "auto", bottom: 0}}>
					<Container>
						<Grid container spacing={2} align="center" alignItems="center" justify="center">
							<Grid item xs>
					        	<IconButton color="primary" edge="start" onClick={() => clearFilters()}>
							      	<ClearAllIcon />
							    </IconButton>
				        	</Grid>
				        	<Grid item xs>
								<Button color="primary" variant="contained" edge="start" onClick={() => search()}>
					        		Пошук
					        	</Button>
				        	</Grid>
				        	<Grid item xs>
					        	<IconButton edge="start" color="primary" onClick={() => setDrawerState({...drawerState, status: false})}>
							      	<CloseIcon />
							    </IconButton>
				        	</Grid>
				        </Grid>
					</Container>
				</Paper>
			</Hidden>

			<Hidden only="xs">
			    <Paper square elevation={3}>
					<Container>
						<Grid container align="right" alignItems="center" justify="center"  style={{paddingTop: 10, paddingBottom: 10}}>
							<Grid item md>
								<Button color="primary" variant="outlined" style={{marginLeft: 10}} onClick={() => clearFilters()}>
					        		Очистити
					        	</Button>
								<Button color="primary" variant="contained" style={{marginLeft: 10}} onClick={() => search()}>
					        		Пошук
					        	</Button>
							</Grid>
						</Grid>
					</Container>
				</Paper>
			</Hidden>
	    </Drawer>
	);
}

export { DrawerComponent as SearchDrawer };