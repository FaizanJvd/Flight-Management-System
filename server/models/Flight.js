const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  scheduledDepartureTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Delayed', 'Cancelled', 'In-flight', 'Scheduled/En Route'],
    default: 'Scheduled/En Route',
  },
  airline: { type: String, required: true },
  flightType: {
    type: String,
    enum: ['Commercial', 'Military', 'Private'],
    required: true,
  },
}, { 
  timestamps: true, 
  indexes: [
    { fields: { flightNumber: 1 } },
    { fields: { status: 1 } },
    { fields: { airline: 1 } }, 
    { fields: { flightType: 1 } }
  ] 
});

flightSchema.index({ flightNumber: 1 });
flightSchema.index({ status: 1 });
flightSchema.index({ airline: 1 });
flightSchema.index({ flightType: 1 });

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
