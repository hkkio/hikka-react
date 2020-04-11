import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const ErrorScreen = () => {
	return (
		<Container style={{height: "100vh"}}>
			<Grid container justify="center" alignItems="center" align="center" style={{height: "100%"}}>
				<Grid item>
					<Typography variant="h1" component="h2">404</Typography>
					<Typography gutterBottom>Думаю, тобі варто повернутись назад</Typography>
					<Button variant="outlined" href="/" color="primary">На головну</Button>
				</Grid>
			</Grid>
		</Container>
	)
   
}

export { ErrorScreen };
