const express = require('express');
const router = express.Router();
const { Services } = require('../models');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Services.findAll();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get a service by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Services.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service Not Found' });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new service
router.post('/', async (req, res) => {
  const { name, quantity, price, phoneNumber, imageUrl } = req.body;

  try {
    const newService = await Services.create({
      name,
      quantity,
      price,
      phoneNumber,
      imageUrl,
    });
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: 'Failed to Create Service' });
  }
});

// Update a service by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, phoneNumber, imageUrl } = req.body;

  try {
    const service = await Services.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: 'Service Not Found' });
    }

    await service.update({ name, quantity, price, phoneNumber, imageUrl });
    res.json({ message: 'Service Updated Successfully', service });
  } catch (err) {
    res.status(500).json({ error: 'Failed to Update Service' });
  }
});

// Delete a service by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Services.destroy({ where: { id } });

    if (result === 0) {
      return res.status(404).json({ error: 'Service Not Found' });
    }

    res.json({ message: 'Service Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to Delete Service' });
  }
});

module.exports = router;
