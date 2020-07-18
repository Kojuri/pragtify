<template>
  <div class="calendar">
    Calendar

    <div
      v-if="isMonthMode"
      class="month-container"
    >
      <div
        v-for="(d,i) in weekDays"
        :key="'wd_' + i"
        class="dm-weekday"
      >
        {{d}}
      </div>
      <div
        v-for="(d,i) in days"
        :key="'dm_' + i"
        class="dm-tile"
      >
        <div
          class="dm-day-number"
          :class="{'is-today' : (d.sql == today)}"
        >{{d.day}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'PCalendar',
  props: {
    mode: {
      type: String,
      default: 'month'
    },
    date: {
      type: String,
      default: moment().format('YYYY-MM-DD')
    }
  },
  data () {
    return {
      days: [],
      start: '',
      end: '',
      today: moment().format('YYYY-MM-DD')
    }
  },
  computed: {
    isMonthMode () {
      return this.mode === 'month'
    },
    weekDays () {
      return moment.weekdays(true)
    }
  },
  beforeCreate () {
    // ISO-8601, Europe
    moment.updateLocale('en', {      week: {
        dow: 1, // First day of week is Monday
        doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
      }    })
  },
  mounted () {
    this.loadDays()
  },
  methods: {
    loadDays () {
      if (this.isMonthMode) {
        let start = moment().set('year', moment(this.date).format('YYYY')).set('month', parseInt(moment(this.date).format('M')) - 1).set('date', 1)
        start = start.startOf('week')
        let end = moment(this.date).endOf('month')
        end = end.endOf('week')

        this.start = start.format('LL')
        this.end = end.format('LL')
        this.days = this.getDays(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
      }
    },
    getDays (startDate, endDate) {
      var dates = []

      var currDate = moment(startDate).startOf('day')
      var lastDate = moment(endDate).startOf('day')

      dates.push(this.getDayObject(currDate))

      while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(this.getDayObject(currDate.clone()))
      }

      dates.push(this.getDayObject(lastDate))

      return dates
    },
    getDayObject (d) {
      return {
        day: d.format('D'),
        locale: d.format('L'),
        sql: d.format('YYYY-MM-DD'),
        moment: d
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.calendar {
  width: 100%;
}
.month-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.dm-weekday {
  width: calc(100% / 7);
  display: flex;
  flex-direction: column;
  padding: 2px 2px 2px 2px;
}
.dm-tile {
  width: calc(100% / 7);
  min-height: 50px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
}
.dm-day-number {
  margin: 2px 2px 2px 2px;
}
.dm-day-number.is-today {
  background-color: var(--v-primary-base);
  border-radius: 50% 50%;
}
</style>