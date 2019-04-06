# toast-planning

Planning services for Toast

## Functions

The common `weekOffset` parameter allows you to 'pretend' you're in a different week currently. It basically adds or subtracts weeks from this week for all calculations.

### Initialize Weeks

`POST /initializeWeeks`

```json
{
  "groupId": "group-id",
  "weekOffset": 0
}
```

Initializes plan days and meals for the default planning timespan (this and next week) for the given group.

### Create Upcoming Week

`POST /createUpcomingWeek`

```json
{
  "groupId": "group-id",
  "weeksFromNow": 1,
  "weekOffset": 0
}
```

Clones the week at (weeksFromNow - 1) into a new week at (weeksFromNow). So, if you use the default `weeksFromNow: 1`, you'll clone this week into next week.

### Clean Old Weeks

`POST /cleanOldWeeks`

```json
{
  "weekOffset": 0
}
```

WARNING: this applies to ALL groups. Cleans all weeks older than the current week. Meant to be used as a recurring job.
