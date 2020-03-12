import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
    value: 5
  },
  {
    value: 10
  },
  {
    value: 15
  },
  {
    value: 20
  },
  {
    value: 25
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

  const SliderWithtyle = withStyles({
    root: {
      color: '#A5256D',
      height: 2,
      padding: '15px 0',
      maxWidth: 178
    },
    thumb: {
      height: 12,
      width: 12,
      marginTop: -5,
      marginLeft: -6,
      '&:focus,&:hover,&$active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)'
        // Reset on touch devices, it doesn't add specificity
      }
    },
    mark: {
      height: 9,
      width: 9,
      marginTop: -3,
      borderRadius: 21,
      backgroundColor: '#9FA7AE',
      marginLeft: -4
    },
    markActive: {
      height: 9,
      width: 9,
      marginTop: -3,
      borderRadius: 21,
      backgroundColor: '#A5256D',
      marginLeft: -4
    },
    track: {
      height: 3,
      borderRadius: 1
    },
    rail: {
      height: 3,
      borderRadius: 1,
      color: '#9FA7AE'
    }
  })(Slider);

  return (
    <div className={classes.root}>
      <SliderWithtyle
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
