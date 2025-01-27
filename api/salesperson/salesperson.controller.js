const mongoose = require('mongoose');

exports.salespersonDataByPeriod = async (req, res, next) => {
  try {
    const { period } = req.params;

    // Fetch the salesperson data matching the period
    const salespersonData = await mongoose.connection
      .collection('salesperson') // Ensure the collection name is correct
      .findOne({ 'salesperson.periods.period': period });

    if (!salespersonData) {
      return res
        .status(404)
        .json({ message: 'No data found for the given period' });
    }

    // Filter the periods array to only include the specified period
    const filteredPeriods = salespersonData.salesperson.periods.filter(
      (p) => p.period === period,
    );

    // Construct the result object
    const result = {
      ...salespersonData.salesperson,
      periods: filteredPeriods, // Include only the filtered period
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching salesperson data:', error);
    next(error);
  }
};
