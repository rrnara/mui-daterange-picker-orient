/* eslint-disable object-curly-newline */
import React from 'react';
import {Divider, Grid, Paper, Typography} from '@mui/material';
import {differenceInCalendarMonths, format} from 'date-fns';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Month from './Month';
import DefinedRanges from './DefinedRanges';
import {DateRange, DefinedRange, NavigationAction, Setter,} from '../types';
import {MARKERS} from './Markers';

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    // eslint-disable-next-line no-unused-vars
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    // eslint-disable-next-line no-unused-vars
    onDayClick: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onDayHover: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
  locale?: Locale;
  verticalOrientation: boolean;
}

const verticalSideTextSx = {
  writingMode: 'vertical-lr',
  transform: 'rotate(180deg)'
}

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    locale,
    verticalOrientation
  } = props;

  const {startDate, endDate} = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange, minDate, maxDate, helpers, handlers,
  };

  const sxText = {
    flex: 1,
    textAlign: 'center',
    ...(verticalOrientation ? verticalSideTextSx : {})
  }
  return (
    <Paper elevation={5} square>
      <Grid container direction={verticalOrientation ? "column" : "row"} wrap="nowrap">
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
            verticalOrientation={verticalOrientation}
          />
        </Grid>
        <Divider orientation={verticalOrientation ? "horizontal" : "vertical"} flexItem/>
        <Grid display="flex" flexDirection={verticalOrientation ? "row" : "column"}>
          <Grid container direction={verticalOrientation ? "column" : "row"} sx={verticalOrientation ? {} : {padding: '20px 70px'}} alignItems="center">
            <Grid item sx={sxText}>
              <Typography variant="subtitle1">
                {startDate ? format(startDate, 'dd MMMM yyyy', {locale}) : 'Start Date'}
              </Typography>
            </Grid>
            <Grid item sx={{flex: verticalOrientation ? 0.5 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {verticalOrientation ? <ArrowDownward color="action"/> : <ArrowRightAltIcon color="action"/>}
            </Grid>
            <Grid item sx={sxText}>
              <Typography variant="subtitle1">
                {endDate ? format(endDate, 'dd MMMM yyyy', {locale}) : 'End Date'}
              </Typography>
            </Grid>
          </Grid>
          <Divider/>
          <Grid container direction={verticalOrientation ? "column" : "row"} justifyContent="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              locale={locale}
            />
            <Divider orientation={verticalOrientation ? "horizontal" : "vertical"} flexItem/>
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              locale={locale}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Menu;
