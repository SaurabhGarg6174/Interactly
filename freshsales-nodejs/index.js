const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/db');
const crm = require('./src/crm');

const app = express();
app.use(bodyParser.json());

// Create Contact
app.post('/createContact', async (req, res) => {
    const { first_name, last_name, email, mobile_number, data_store } = req.body;
    if (data_store === 'CRM') {
        try {
            const contact = await crm.createContact({ first_name, last_name, email, mobile_number });
            res.json(contact);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (data_store === 'DATABASE') {
        try {
            const [result] = await db.query(
                'INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)',
                [first_name, last_name, email, mobile_number]
            );
            res.json({ id: result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: 'Invalid data_store value' });
    }
});

// Get Contact
app.post('/getContact', async (req, res) => {
    const { contact_id, data_store } = req.body;
    if (data_store === 'CRM') {
        try {
            const contact = await crm.getContact(contact_id);
            res.json(contact);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (data_store === 'DATABASE') {
        try {
            const [rows] = await db.query('SELECT * FROM contacts WHERE id = ?', [contact_id]);
            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: 'Invalid data_store value' });
    }
});

// Update Contact
app.post('/updateContact', async (req, res) => {
    const { contact_id, new_email, new_mobile_number, data_store } = req.body;
    if (data_store === 'CRM') {
        try {
            const contact = await crm.updateContact(contact_id, { email: new_email, mobile_number: new_mobile_number });
            res.json(contact);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (data_store === 'DATABASE') {
        try {
            await db.query(
                'UPDATE contacts SET email = ?, mobile_number = ? WHERE id = ?',
                [new_email, new_mobile_number, contact_id]
            );
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: 'Invalid data_store value' });
    }
});

// Delete Contact
app.post('/deleteContact', async (req, res) => {
    const { contact_id, data_store } = req.body;
    if (data_store === 'CRM') {
        try {
            await crm.deleteContact(contact_id);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (data_store === 'DATABASE') {
        try {
            await db.query('DELETE FROM contacts WHERE id = ?', [contact_id]);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: 'Invalid data_store value' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
