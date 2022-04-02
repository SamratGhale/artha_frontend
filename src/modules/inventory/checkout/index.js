import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#e0bd4c',
        width:500,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 9px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function CheckOut() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Grid
            display="flex"
            container
            alignItems="center"
            justifyContent="center"
        >
                <Card className={classes.root}  variant="outlined">
                    <CardContent>
                        <Typography  variant="h3">
                            Artha Mart
                        </Typography>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Sales Invoice
                        </Typography>
                        <br/>
                        <br/>
                        <br/>
                        <Typography variant="h5" component="h2">
                            be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography  color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
    );
}