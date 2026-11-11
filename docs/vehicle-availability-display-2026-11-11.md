# Vehicle Availability Display

Date: 2026-11-11

## Availability rules

- Show a vehicle as available only when no confirmed booking overlaps the selected rental period.
- Treat booking start and end dates consistently when checking overlaps.
- Refresh availability after a booking is created, changed, or cancelled.
- Distinguish unavailable vehicles from vehicles with incomplete information.

## Verification checklist

- [ ] Non-overlapping dates show available vehicles.
- [ ] Overlapping confirmed bookings prevent double booking.
- [ ] Cancelled bookings release availability.
