import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Backdrop from '@material-ui/core/Backdrop';

import { First, Second, Third, Fourth } from './Steps';
import { AnimeActionCreators } from "../../../state/action";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CreateAnimeScreen = () => {
	const classes = useStyles();

	const [activeStep, setActiveStep] = useState(1);
	const steps = ['Загальна інформація', 'Зображення', 'Епізоди'];
	const currentAnime = useSelector((state) => state.anime.currentAnime);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<Box>
			<Backdrop className={classes.backdrop} open={currentAnime.loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Container>
				<Typography variant="h4" component="p" gutterBottom align="left">
					Створення релізу
				</Typography>
				<Stepper activeStep={activeStep} alternativeLabel>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				{activeStep == 0 && <First setActiveStep={setActiveStep} />}
				{activeStep == 1 && <Second setActiveStep={setActiveStep} anime={currentAnime} />}
				{activeStep == 2 && <Third setActiveStep={setActiveStep} />}
				{activeStep == 3 && <Fourth setActiveStep={setActiveStep} />}
			</Container>
			
		</Box>
  	);
}

export {CreateAnimeScreen};