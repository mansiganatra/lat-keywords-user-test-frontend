import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const marks = [
  {
    value: 5,
    label: '5'
  },
  {
    value: 10,
    label: '10'
  },
  {
    value: 15,
    label: '15'
  },
  {
    value: 20,
    label: '20'
  },
  {
    value: 25,
    label: '25'
  }
];

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider({ handleResize }) {
  const classes = useStyles();

  const handleChange = (e, val) => {
    handleResize(val);
  };

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider">Keyword List Size</Typography>
      <Slider
        defaultValue={10}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={handleChange}
        step={5}
        marks={marks}
        min={5}
        max={25}
      />
      <div className={classes.margin} />
    </div>
  );
}
